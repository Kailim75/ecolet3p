import { hasTrackingConsent, readCookieConsent, type CookiePreferences } from "@/lib/cookieConsent";

// Google Tag Manager + GA4 Configuration
// GTM is only loaded after consent so the cookie banner matches the real behavior.
const GTM_ID = "GTM-KRJWD5VH";
const GTM_SCRIPT_ID = "t3p-gtm-script";

const ensureDataLayer = (): void => {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
};

const isGTMLoaded = (): boolean => {
  if (typeof window === "undefined") return false;
  return Boolean(document.getElementById(GTM_SCRIPT_ID));
};

const loadGTM = (): void => {
  if (typeof window === "undefined" || isGTMLoaded()) return;

  ensureDataLayer();
  window.dataLayer.push({
    "gtm.start": Date.now(),
    event: "gtm.js",
  });

  const script = document.createElement("script");
  script.id = GTM_SCRIPT_ID;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(script);
};

// Check if GTM dataLayer is available
export const isGAEnabled = (): boolean => {
  return typeof window !== "undefined" && Array.isArray(window.dataLayer);
};

export const syncAnalyticsConsent = (prefs?: CookiePreferences | null): void => {
  if (typeof window === "undefined") return;

  const consent = prefs ?? readCookieConsent();
  ensureDataLayer();

  window.dataLayer.push({
    event: "consent_update",
    analytics_storage: consent?.analytics ? "granted" : "denied",
    ad_storage: consent?.marketing ? "granted" : "denied",
    ad_user_data: consent?.marketing ? "granted" : "denied",
    ad_personalization: consent?.marketing ? "granted" : "denied",
    functionality_storage: "granted",
    security_storage: "granted",
  });

  if (hasTrackingConsent(consent)) {
    loadGTM();
  }
};

// Initialize dataLayer and load GTM only if consent has already been granted.
export const initGA = (): void => {
  ensureDataLayer();
  syncAnalyticsConsent();
};

// Track page views via dataLayer
export const trackPageView = (path: string, title?: string): void => {
  if (!isGAEnabled() || !hasTrackingConsent()) return;

  window.dataLayer.push({
    event: "page_view",
    page_path: path,
    page_title: title,
  });
};

// Track custom events via dataLayer
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
): void => {
  if (!isGAEnabled() || !hasTrackingConsent()) return;

  window.dataLayer.push({
    event: action,
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Pre-defined event trackers for T3P Campus
export const analytics = {
  // Form submissions
  trackFormSubmission: (formName: string) => {
    trackEvent('form_submit', 'Forms', formName);
  },

  // CTA clicks
  trackCTAClick: (ctaName: string, location: string) => {
    trackEvent('cta_click', 'CTA', `${ctaName} - ${location}`);
  },

  // Appointment booking
  trackAppointmentStart: () => {
    trackEvent('appointment_start', 'Appointments', 'Started booking');
  },

  trackAppointmentComplete: (formationType: string) => {
    trackEvent('appointment_complete', 'Appointments', formationType);
  },

  // Formation interest
  trackFormationView: (formationName: string) => {
    trackEvent('formation_view', 'Formations', formationName);
  },

  trackFormationCTAClick: (formationName: string) => {
    trackEvent('formation_cta_click', 'Formations', formationName);
  },

  // Pre-registration
  trackPreRegistrationStart: (formationName: string) => {
    trackEvent('preregistration_start', 'Pre-Registration', formationName);
  },

  trackPreRegistrationComplete: (formationName: string) => {
    trackEvent('preregistration_complete', 'Pre-Registration', formationName);
  },

  // Newsletter
  trackNewsletterSignup: () => {
    trackEvent('newsletter_signup', 'Newsletter', 'Subscribed');
  },

  // Contact
  trackPhoneClick: () => {
    trackEvent('phone_click', 'Contact', 'Phone number clicked');
  },

  trackEmailClick: () => {
    trackEvent('email_click', 'Contact', 'Email clicked');
  },

  // Navigation
  trackNavClick: (pageName: string) => {
    trackEvent('nav_click', 'Navigation', pageName);
  },

  // Scroll depth
  trackScrollDepth: (depth: number) => {
    trackEvent('scroll_depth', 'Engagement', `${depth}%`, depth);
  },
};

// Type declarations for window
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    gtag: (...args: unknown[]) => void;
  }
}
