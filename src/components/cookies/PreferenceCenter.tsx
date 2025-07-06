import React, { useEffect, useRef } from 'react';
import { X, Shield, TrendingUp, Settings, Target, ExternalLink } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useCookieConsent } from '@/contexts/CookieContext';
import { logger } from '@/utils/logger';

const cookieCategories = [
  {
    id: 'strictly_necessary' as const,
    icon: Shield,
    title: 'Strictly Necessary Cookies',
    description: 'These cookies are essential for the website to function and cannot be switched off. They are usually set in response to actions made by you which amount to a request for services.',
    examples: 'Authentication, security, form submissions',
    alwaysActive: true,
  },
  {
    id: 'performance' as const,
    icon: TrendingUp,
    title: 'Performance Cookies',
    description: 'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our site performance.',
    examples: 'Google Analytics, page load times, user interactions',
    alwaysActive: false,
  },
  {
    id: 'functional' as const,
    icon: Settings,
    title: 'Functional Cookies',
    description: 'These cookies enable the website to provide enhanced functionality and personalisation. They may be set by us or by third party providers whose services we have added to our pages.',
    examples: 'Language preferences, theme settings, chat widgets',
    alwaysActive: false,
  },
  {
    id: 'targeting' as const,
    icon: Target,
    title: 'Targeting Cookies',
    description: 'These cookies may be set through our site by our advertising partners. They may be used to build a profile of your interests and show you relevant adverts on other sites.',
    examples: 'Facebook Pixel, Google Ads, retargeting pixels',
    alwaysActive: false,
  },
];

export function PreferenceCenter() {
  const {
    showPreferenceCenter,
    setShowPreferenceCenter,
    preferences,
    updatePreference,
    acceptAll,
    rejectAll,
    savePreferences,
  } = useCookieConsent();
  
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (showPreferenceCenter) {
      logger.info('PreferenceCenter', 'Modal opened');
    }
  }, [showPreferenceCenter]);

  const handleClose = () => {
    setShowPreferenceCenter(false);
    logger.userAction('PreferenceCenter', 'Modal closed');
  };

  const handleAcceptAll = () => {
    acceptAll();
    logger.userAction('PreferenceCenter', 'User accepted all from modal');
  };

  const handleRejectAll = () => {
    rejectAll();
    logger.userAction('PreferenceCenter', 'User rejected all optional cookies');
  };

  const handleSavePreferences = () => {
    savePreferences();
    logger.userAction('PreferenceCenter', 'User saved custom preferences', { preferences });
  };

  const handleToggle = (categoryId: keyof typeof preferences, enabled: boolean) => {
    updatePreference(categoryId, enabled);
    logger.userAction('PreferenceCenter', 'User toggled category', { category: categoryId, enabled });
  };

  return (
    <Dialog open={showPreferenceCenter} onOpenChange={setShowPreferenceCenter}>
      <DialogContent 
        className="max-w-4xl max-h-[90vh] overflow-y-auto"
        onOpenAutoFocus={(e) => {
          e.preventDefault();
          firstFocusableRef.current?.focus();
        }}
      >
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-2xl font-bold text-foreground">
            Preference Center
          </DialogTitle>
          <DialogDescription className="text-base text-muted-foreground leading-relaxed">
            We use cookies to enhance your browsing experience, provide personalized content, 
            and analyze our traffic. You can choose which categories of cookies to allow. 
            Your choices will be remembered for future visits.{' '}
            <button 
              className="text-primary hover:text-primary-hover underline underline-offset-2 inline-flex items-center gap-1"
              onClick={() => logger.userAction('PreferenceCenter', 'Privacy policy link clicked')}
            >
              Read our full Privacy Policy
              <ExternalLink className="h-3 w-3" />
            </button>
          </DialogDescription>
        </DialogHeader>

        <Separator className="my-6" />

        {/* Cookie Categories */}
        <div className="space-y-6">
          {cookieCategories.map((category) => (
            <div key={category.id} className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className="p-2 rounded-lg bg-primary-light dark:bg-primary-light/10">
                    <category.icon className="h-5 w-5 text-primary" />
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-foreground text-lg">
                        {category.title}
                      </h3>
                      {category.alwaysActive && (
                        <Badge variant="secondary" className="text-xs">
                          Always Active
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {category.description}
                    </p>
                    
                    <div className="text-xs text-muted-foreground">
                      <span className="font-medium">Examples: </span>
                      {category.examples}
                    </div>

                    <Button
                      variant="link"
                      size="sm"
                      className="h-auto p-0 text-xs text-primary hover:text-primary-hover"
                      onClick={() => logger.userAction('PreferenceCenter', 'Cookie details clicked', { category: category.id })}
                    >
                      Cookie Details <ExternalLink className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>

                {/* Toggle Switch */}
                <div className="flex items-center">
                  <Switch
                    checked={preferences[category.id]}
                    onCheckedChange={(checked) => handleToggle(category.id, checked)}
                    disabled={category.alwaysActive}
                    aria-label={`${category.alwaysActive ? 'Always enabled' : 'Toggle'} ${category.title}`}
                  />
                </div>
              </div>
              
              {category.id !== 'targeting' && <Separator className="opacity-50" />}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-border">
          <Button
            ref={firstFocusableRef}
            variant="outline"
            onClick={handleRejectAll}
            className="w-full sm:w-auto font-medium"
          >
            Reject All
          </Button>
          <Button
            variant="outline"
            onClick={handleAcceptAll}
            className="w-full sm:w-auto font-medium"
          >
            Allow All
          </Button>
          <Button
            onClick={handleSavePreferences}
            className="w-full sm:w-auto font-medium bg-gradient-primary hover:opacity-90 transition-opacity"
          >
            Confirm My Choices
          </Button>
        </div>

        {/* Accessible close button */}
        <Button
          ref={closeButtonRef}
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 h-8 w-8 text-muted-foreground hover:text-foreground"
          onClick={handleClose}
          aria-label="Close preference center"
        >
          <X className="h-4 w-4" />
        </Button>
      </DialogContent>
    </Dialog>
  );
}