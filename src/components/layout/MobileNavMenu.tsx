import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
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
  const location = useLocation();
  
  const isActive = (href: string) => location.pathname === href || location.pathname.startsWith(href + '/');
  const displayName = user?.user_metadata?.display_name || user?.email;

  const handleSignOut = async () => {
    await onSignOut();
    onLinkClick();
  };

  return (
    <div className="md:hidden border-t border-border">
      <div className="py-4 space-y-2">
        {navItems.map((item) => (
          <div key={item.label}>
            {item.children ? (
              <div className="space-y-1">
                <div className="px-3 py-2 text-sm font-medium text-muted-foreground">
                  {item.label}
                </div>
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    to={child.href}
                    className={`block px-6 py-2 text-sm rounded-md ml-3 ${
                      isActive(child.href)
                        ? 'text-primary bg-primary-light'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent/10'
                    }`}
                    onClick={onLinkClick}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
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
            )}
          </div>
        ))}
        
        <div className="pt-4 border-t border-border space-y-2">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-md"
                onClick={onLinkClick}
              >
                Dashboard
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
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-md"
                onClick={onLinkClick}
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="block mx-3"
                onClick={onLinkClick}
              >
                <Button className="w-full bg-gradient-primary hover:bg-primary-hover">
                  Get Started Free
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}