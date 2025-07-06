import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { LanguageSelector } from '@/components/ui/language-selector';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import { NavigationHeader } from './NavigationHeader';
import { DesktopNavMenu } from './DesktopNavMenu';
import { UserAccountMenu } from './UserAccountMenu';
import { AuthenticationButtons } from './AuthenticationButtons';
import { MobileNavMenu } from './MobileNavMenu';

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { t } = useTranslation();

  console.log('🧭 [Navigation] Component rendered', {
    timestamp: new Date().toISOString(),
    hasUser: !!user,
    userEmail: user?.email || null,
    mobileMenuOpen,
    currentPath: window.location.pathname
  });

  const handleSignOut = async () => {
    console.log('🧭 [Navigation] Sign out initiated', {
      timestamp: new Date().toISOString(),
      userId: user?.id || null
    });
    await signOut();
  };

  const navItems = [
    { label: t('common.features'), href: '/features' },
    { label: t('common.integrations'), href: '/integrations' },
    { label: t('common.pricing'), href: '/pricing' },
    { 
      label: t('nav.resources'), 
      href: '/docs',
      children: [
        { label: t('common.documentation'), href: '/docs' },
        { label: t('common.support'), href: '/support' },
        { label: t('common.about'), href: '/about' },
      ]
    },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <NavigationHeader />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            <DesktopNavMenu navItems={navItems} />

            {/* Language Selector, Theme Toggle & Auth Buttons */}
            <div className="flex items-center space-x-6 pl-6 border-l border-border/30">
              <LanguageSelector />
              <ThemeToggle />
              
              {user ? (
                <UserAccountMenu user={user} onSignOut={handleSignOut} />
              ) : (
                <AuthenticationButtons />
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <MobileNavMenu 
            navItems={navItems} 
            user={user} 
            onSignOut={handleSignOut}
            onLinkClick={() => setMobileMenuOpen(false)}
          />
        )}
      </div>
    </nav>
  );
}
