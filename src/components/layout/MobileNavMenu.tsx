import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { User, LogOut } from 'lucide-react';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import { LanguageSelector } from '@/components/ui/language-selector';
import { ThemeToggle } from '@/components/ui/theme-toggle';

interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

interface MobileNavMenuProps {
  navItems: NavItem[];
  user: SupabaseUser | null;
  onSignOut: () => Promise<void>;
  onLinkClick: () => void;
}

export function MobileNavMenu({ navItems, user, onSignOut, onLinkClick }: MobileNavMenuProps) {
  const { t } = useTranslation();
  const location = useLocation();
  
  const isActive = (href: string) => location.pathname === href || location.pathname.startsWith(href + '/');
  const displayName = user?.user_metadata?.display_name || user?.email;

  const handleSignOut = async () => {
    await onSignOut();
    onLinkClick();
  };

  // Conditionally add dashboard link for authenticated users only
  const translatedNavItems = [
    ...(user ? [{ label: t('dashboard.title'), href: '/dashboard' }] : []),
    ...navItems.flatMap(item => 
      item.children ? item.children : [item]
    )
  ];

  return (
    <div className="md:hidden border-t border-border">
      <div className="py-4 space-y-2">
        {translatedNavItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={`block px-3 py-2 text-sm rounded-md ${
              isActive(item.href)
                ? 'text-primary bg-primary-light'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent/10'
            }`}
            onClick={onLinkClick}
          >
            {item.label}
          </Link>
        ))}
        
        <div className="pt-4 border-t border-border space-y-2">
          {user ? (
            <>
              <div className="px-3 py-2">
                <p className="text-sm font-medium text-foreground">{displayName}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
              <Button
                variant="ghost"
                onClick={handleSignOut}
                className="w-full justify-start text-destructive"
              >
                <LogOut className="h-4 w-4 mr-2" />
                {t('common.logout')}
              </Button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-md"
                onClick={onLinkClick}
              >
                {t('common.login')}
              </Link>
              <Link
                to="/signup"
                className="block mx-3"
                onClick={onLinkClick}
              >
                <Button className="w-full bg-gradient-primary hover:bg-primary-hover">
                  {t('hero.cta_primary')}
                </Button>
              </Link>
            </>
          )}
        </div>
        {/* Mobile Theme & Language Controls */}
        <div className="flex items-center justify-center space-x-4 py-4 border-t border-border/20 sm:hidden">
          <LanguageSelector />
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}