import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { LanguageSelector } from '@/components/ui/language-selector';
import { useAuth } from '@/contexts/AuthContext';
import { Menu, X } from 'lucide-react';
import { NavigationHeader } from './NavigationHeader';
import { DesktopNavMenu } from './DesktopNavMenu';
import { UserAccountMenu } from './UserAccountMenu';
import { AuthenticationButtons } from './AuthenticationButtons';
import { MobileNavMenu } from './MobileNavMenu';

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  const navItems = [
    { label: 'Features', href: '/features' },
    { label: 'Integrations', href: '/integrations' },
    { label: 'Pricing', href: '/pricing' },
    { 
      label: 'Resources', 
      href: '/docs',
      children: [
        { label: 'Documentation', href: '/docs' },
        { label: 'Support', href: '/support' },
        { label: 'About', href: '/about' },
      ]
    },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <NavigationHeader />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <DesktopNavMenu navItems={navItems} />

            {/* Language Selector, Theme Toggle & Auth Buttons */}
            <div className="flex items-center space-x-4">
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
