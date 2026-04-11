export const COOKIE_CONSENT_KEY = "t3p_cookie_consent";
export const COOKIE_CONSENT_EVENT = "t3p-cookie-consent-changed";

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp?: string;
}

export const defaultCookiePreferences: CookiePreferences = {
  essential: true,
  analytics: false,
  marketing: false,
};

export const readCookieConsent = (): CookiePreferences | null => {
  if (typeof window === "undefined") return null;

  const raw = window.localStorage.getItem(COOKIE_CONSENT_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as Partial<CookiePreferences>;
    return {
      ...defaultCookiePreferences,
      ...parsed,
      essential: true,
    };
  } catch {
    return null;
  }
};

export const persistCookieConsent = (prefs: CookiePreferences): CookiePreferences => {
  const stored: CookiePreferences = {
    ...defaultCookiePreferences,
    ...prefs,
    essential: true,
    timestamp: new Date().toISOString(),
  };

  if (typeof window !== "undefined") {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(stored));
    window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT, { detail: stored }));
  }

  return stored;
};

export const hasTrackingConsent = (prefs?: CookiePreferences | null): boolean => {
  const consent = prefs ?? readCookieConsent();
  return Boolean(consent?.analytics || consent?.marketing);
};
