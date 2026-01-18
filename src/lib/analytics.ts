// Google Analytics 4 Configuration
// Replace GA_MEASUREMENT_ID with your actual GA4 measurement ID (format: G-XXXXXXXXXX)

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || '';

// Check if GA is enabled
export const isGAEnabled = (): boolean => {
  return !!GA_MEASUREMENT_ID && typeof window !== 'undefined' && 'gtag' in window;
};

// Initialize Google Analytics
export const initGA = (): void => {
  if (!GA_MEASUREMENT_ID) {
    console.log('Google Analytics: No measurement ID configured');
    return;
  }

  // Add gtag script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(args);
  }
  (window as any).gtag = gtag;
  
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID, {
    page_path: window.location.pathname,
    anonymize_ip: true, // GDPR compliance
  });

  console.log('Google Analytics initialized');
};

// Track page views
export const trackPageView = (path: string, title?: string): void => {
  if (!isGAEnabled()) return;

  (window as any).gtag('config', GA_MEASUREMENT_ID, {
    page_path: path,
    page_title: title,
  });
};

// Track custom events
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
): void => {
  if (!isGAEnabled()) return;

  (window as any).gtag('event', action, {
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
