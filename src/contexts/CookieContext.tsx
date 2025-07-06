import React, { createContext, useContext, useState, useEffect } from 'react';
import { logger } from '@/utils/logger';

export interface CookiePreferences {
  strictly_necessary: boolean;
  performance: boolean;
  functional: boolean;
  targeting: boolean;
}

interface CookieContextType {
  showBanner: boolean;
  showPreferenceCenter: boolean;
  preferences: CookiePreferences;
  setShowBanner: (show: boolean) => void;
  setShowPreferenceCenter: (show: boolean) => void;
  acceptAll: () => void;
  rejectAll: () => void;
  updatePreference: (category: keyof CookiePreferences, value: boolean) => void;
  savePreferences: () => void;
  hasConsent: () => boolean;
}

const CookieContext = createContext<CookieContextType | undefined>(undefined);

const COOKIE_CONSENT_KEY = 'syncRivo_cookie_consent';
const COOKIE_PREFERENCES_KEY = 'syncRivo_cookie_preferences';

const defaultPreferences: CookiePreferences = {
  strictly_necessary: true, // Always true
  performance: false,
  functional: false,
  targeting: false,
};

export function CookieProvider({ children }: { children: React.ReactNode }) {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferenceCenter, setShowPreferenceCenter] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);

  useEffect(() => {
    // Check if user has already given consent
    const hasConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    const savedPreferences = localStorage.getItem(COOKIE_PREFERENCES_KEY);
    
    if (hasConsent && savedPreferences) {
      try {
        const parsedPreferences = JSON.parse(savedPreferences);
        setPreferences({ ...parsedPreferences, strictly_necessary: true });
        logger.info('CookieProvider', 'Loaded saved preferences', { preferences: parsedPreferences });
      } catch (error) {
        logger.error('CookieProvider', 'Failed to parse saved preferences', { error });
        setShowBanner(true);
      }
    } else {
      setShowBanner(true);
      logger.info('CookieProvider', 'No consent found, showing banner');
    }
  }, []);

  const saveConsentToStorage = (prefs: CookiePreferences) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(prefs));
    logger.info('CookieProvider', 'Saved consent and preferences', { preferences: prefs });
  };

  const acceptAll = () => {
    const allAccepted: CookiePreferences = {
      strictly_necessary: true,
      performance: true,
      functional: true,
      targeting: true,
    };
    setPreferences(allAccepted);
    saveConsentToStorage(allAccepted);
    setShowBanner(false);
    setShowPreferenceCenter(false);
    logger.info('CookieProvider', 'User accepted all cookies');
  };

  const rejectAll = () => {
    const onlyNecessary: CookiePreferences = {
      strictly_necessary: true,
      performance: false,
      functional: false,
      targeting: false,
    };
    setPreferences(onlyNecessary);
    saveConsentToStorage(onlyNecessary);
    setShowBanner(false);
    setShowPreferenceCenter(false);
    logger.info('CookieProvider', 'User rejected optional cookies');
  };

  const updatePreference = (category: keyof CookiePreferences, value: boolean) => {
    if (category === 'strictly_necessary') return; // Cannot be changed
    
    setPreferences(prev => ({
      ...prev,
      [category]: value
    }));
    logger.debug('CookieProvider', 'Updated preference', { category, value });
  };

  const savePreferences = () => {
    saveConsentToStorage(preferences);
    setShowBanner(false);
    setShowPreferenceCenter(false);
    logger.info('CookieProvider', 'User confirmed custom preferences', { preferences });
  };

  const hasConsent = () => {
    return !!localStorage.getItem(COOKIE_CONSENT_KEY);
  };

  return (
    <CookieContext.Provider
      value={{
        showBanner,
        showPreferenceCenter,
        preferences,
        setShowBanner,
        setShowPreferenceCenter,
        acceptAll,
        rejectAll,
        updatePreference,
        savePreferences,
        hasConsent,
      }}
    >
      {children}
    </CookieContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieContext);
  if (context === undefined) {
    throw new Error('useCookieConsent must be used within a CookieProvider');
  }
  return context;
}