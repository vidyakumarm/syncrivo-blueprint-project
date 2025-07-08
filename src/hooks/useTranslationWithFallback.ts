import { useTranslation as useI18nTranslation } from 'react-i18next';

export function useTranslationWithFallback() {
  const { t: originalT, i18n } = useI18nTranslation();
  
  const t = (key: string, fallback?: string): string => {
    try {
      const translation = originalT(key);
      
      // Check if translation is missing (react-i18next returns the key if no translation is found)
      if (translation === key) {
        console.warn(`🌐 Missing translation for key "${key}" in language "${i18n.language}"`);
        
        // Try to get English fallback
        if (i18n.language !== 'en') {
          const englishTranslation = originalT(key, { lng: 'en' });
          if (englishTranslation !== key) {
            return englishTranslation;
          }
        }
        
        // Return custom fallback or the key as last resort
        return fallback || key;
      }
      
      return translation;
    } catch (error) {
      console.error(`🌐 Error translating key "${key}":`, error);
      return fallback || key;
    }
  };
  
  return { t, i18n };
}