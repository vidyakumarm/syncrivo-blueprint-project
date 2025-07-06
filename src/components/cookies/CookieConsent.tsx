import React from 'react';
import { CookieBanner } from './CookieBanner';
import { PreferenceCenter } from './PreferenceCenter';

export function CookieConsent() {
  return (
    <>
      <CookieBanner />
      <PreferenceCenter />
    </>
  );
}