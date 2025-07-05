import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { User, LogOut } from 'lucide-react';
import type { User as SupabaseUser } from '@supabase/supabase-js';

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

  // Use translated nav items
  const translatedNavItems = [
    { label: t('common.features'), href: '/features' },
    { label: t('common.integrations'), href: '/integrations' },
    { label: t('common.pricing'), href: '/pricing' },
    { label: t('common.documentation'), href: '/docs' },
    { label: t('common.support'), href: '/support' },
    { label: t('common.about'), href: '/about' },
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
              <Link
                to="/dashboard"
                className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-md"
                onClick={onLinkClick}
              >
                {t('dashboard.title')}
              </Link>
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
      </div>
    </div>
  );
}