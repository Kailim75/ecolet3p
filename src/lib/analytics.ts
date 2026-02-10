// Google Tag Manager + GA4 Configuration
// GTM (GTM-KRJWD5VH) is loaded via index.html and handles GA4 (G-132135YEV7) internally

// Check if GTM dataLayer is available
export const isGAEnabled = (): boolean => {
  return typeof window !== 'undefined' && Array.isArray(window.dataLayer);
};

// Initialize dataLayer (GTM script is already in index.html)
export const initGA = (): void => {
  window.dataLayer = window.dataLayer || [];
  console.log('Google Tag Manager initialized (GTM-KRJWD5VH)');
};

// Track page views via dataLayer
export const trackPageView = (path: string, title?: string): void => {
  if (!isGAEnabled()) return;

  window.dataLayer.push({
    event: 'page_view',
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
  if (!isGAEnabled()) return;

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
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}
