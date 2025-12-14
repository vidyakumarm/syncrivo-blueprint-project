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
    {
      label: t('nav.solutions', 'Solutions'),
      href: '/solutions',
      children: [
        { label: t('solutions.frontline.badge', 'Frontline Workforce'), href: '/solutions/frontline-workforce' },
        { label: t('solutions.ma.badge', 'Mergers & Acquisitions'), href: '/solutions/mergers-acquisitions' },
        { label: t('solutions.multiplatform.badge', 'Multi-Platform'), href: '/solutions/multi-platform' },
        { label: t('solutions.vendor.badge', 'Vendor Flexibility'), href: '/solutions/vendor-flexibility' },
        { label: t('solutions.partner.badge', 'External Partners'), href: '/solutions/external-partners' },
        { label: t('solutions.regulated.badge', 'Regulated Industries'), href: '/solutions/regulated-industries' },
        { label: t('solutions.developer.badge', 'Developer Platform'), href: '/solutions/developer-platform' },
        { label: t('nav.all_solutions', 'View All Solutions'), href: '/solutions' },
      ]
    },
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
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-[var(--header-height)]">
            {/* Logo */}
            <NavigationHeader />

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <DesktopNavMenu navItems={navItems} />

              {/* Language Selector, Theme Toggle & Auth Buttons */}
              <div className="flex items-center space-x-4 xl:space-x-6 pl-4 xl:pl-6 border-l border-border/30">
                <LanguageSelector />
                <ThemeToggle />

                {user ? (
                  <UserAccountMenu user={user} onSignOut={handleSignOut} />
                ) : (
                  <AuthenticationButtons />
                )}
              </div>
            </div>

            {/* Mobile: Theme & Language before hamburger */}
            <div className="flex items-center space-x-2 lg:hidden">
              <div className="hidden sm:flex items-center space-x-2">
                <LanguageSelector />
                <ThemeToggle />
              </div>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                className="h-10 w-10 p-0"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
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
      {/* Layout Spacer to prevent content overlap with fixed header */}
      <div style={{ height: 'var(--header-height)' }} className="w-full shrink-0" aria-hidden="true" />
    </>
  );
}
