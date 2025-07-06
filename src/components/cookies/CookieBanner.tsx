import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCookieConsent } from '@/contexts/CookieContext';
import { logger } from '@/utils/logger';

export function CookieBanner() {
  const { showBanner, setShowBanner, setShowPreferenceCenter, acceptAll } = useCookieConsent();
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showBanner && bannerRef.current) {
      // Announce to screen readers
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', 'polite');
      announcement.setAttribute('aria-atomic', 'true');
      announcement.className = 'sr-only';
      announcement.textContent = 'Cookie consent banner is now visible. This site uses cookies to create a better experience for you.';
      document.body.appendChild(announcement);
      
      setTimeout(() => document.body.removeChild(announcement), 1000);
      
      logger.info('CookieBanner', 'Banner displayed to user');
    }
  }, [showBanner]);

  const handleCookieSettings = () => {
    setShowPreferenceCenter(true);
    logger.userAction('CookieBanner', 'User opened cookie settings');
  };

  const handleAcceptAll = () => {
    acceptAll();
    logger.userAction('CookieBanner', 'User accepted all cookies');
  };

  const handleDismiss = () => {
    setShowBanner(false);
    logger.userAction('CookieBanner', 'User dismissed banner without action');
  };

  if (!showBanner) return null;

  return (
    <div 
      ref={bannerRef}
      className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-brand-xl animate-slide-up"
      role="banner"
      aria-label="Cookie consent banner"
    >
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Message */}
          <div className="flex-1 max-w-4xl">
            <p className="text-sm text-foreground leading-relaxed">
              This site uses cookies to create a better experience for you. Some of these cookies are necessary for site functionality. Others enhance performance, enable features, and power personalized content and ads.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 lg:ml-6">
            <Button
              variant="outline"
              onClick={handleCookieSettings}
              className="w-full sm:w-auto font-medium"
              aria-describedby="cookie-settings-description"
            >
              Cookie Settings
            </Button>
            <Button
              onClick={handleAcceptAll}
              className="w-full sm:w-auto font-medium bg-gradient-primary hover:opacity-90 transition-opacity"
              aria-describedby="accept-all-description"
            >
              I Accept
            </Button>
          </div>

          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDismiss}
            className="absolute top-4 right-4 lg:relative lg:top-auto lg:right-auto h-8 w-8 text-muted-foreground hover:text-foreground"
            aria-label="Dismiss cookie banner"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Hidden descriptions for screen readers */}
        <div className="sr-only">
          <div id="cookie-settings-description">
            Opens cookie preference center to customize your settings
          </div>
          <div id="accept-all-description">
            Accepts all cookies and closes this banner
          </div>
        </div>
      </div>
    </div>
  );
}