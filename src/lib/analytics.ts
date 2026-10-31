import { readCookieConsent, type CookiePreferences } from "@/lib/cookieConsent";

/*
 * Balises Google, chargées seulement après accord, catégorie par catégorie :
 * - « mesure d'audience » (analytics) → Google Tag Manager GTM-KRJWD5VH. Ce conteneur ne
 *   contient que GA4 (G-132135YEV7) : balise Google + événements phone_click, cta_click, form_submit ;
 * - « marketing » → balise Google Ads AW-18546542995 (remarketing et conversions).
 * Le mode de consentement Google est posé à « refusé » avant tout chargement de balise
 * (gtag('consent', 'default', …)), puis mis à jour selon le choix (gtag('consent', 'update', …)).
 * Refus total : aucune balise n'est chargée, rien n'est envoyé.
 */
const GTM_ID = "GTM-KRJWD5VH";
const GTM_SCRIPT_ID = "t3p-gtm-script";
const GOOGLE_ADS_ID = "AW-18546542995";
const GTAG_SCRIPT_ID = "t3p-gtag-script";

// Cookies de chaque catégorie, effacés quand l'accord est refusé ou retiré.
const ANALYTICS_COOKIES = ["_ga", "_gid", "_gat"]; // _ga, _ga_<id>, _gid, _gat…
const MARKETING_COOKIES = ["_gcl_"]; // _gcl_au, _gcl_aw…

const etat = (accord: boolean) => (accord ? "granted" : "denied");

const ensureDataLayer = (): void => {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
};

// gtag() pousse ses commandes dans dataLayer sous forme d'objet arguments : c'est la seule forme
// que lisent gtag.js et GTM (un objet { event: "consent_update" } n'est pas une commande de consentement).
const ensureGtag = (): void => {
  ensureDataLayer();
  if (typeof window.gtag !== "function") {
    window.gtag = function gtag(..._args: unknown[]) {
      // eslint-disable-next-line prefer-rest-params -- gtag.js needs the Arguments object
      window.dataLayer.push(arguments as unknown as Record<string, unknown>);
    };
  }
};

const isConsentCommand = (entry: unknown, type: "default" | "update"): boolean => {
  if (!entry || typeof entry !== "object") return false;
  const commande = entry as ArrayLike<unknown>;
  return commande[0] === "consent" && commande[1] === type;
};

// État par défaut : tout est refusé tant que le visiteur n'a rien choisi. Posé une seule fois,
// avant toute balise.
const ensureConsentDefault = (): void => {
  ensureGtag();
  if (window.dataLayer.some((entry) => isConsentCommand(entry, "default"))) return;
  window.gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
    functionality_storage: "granted",
    security_storage: "granted",
    wait_for_update: 500,
  });
};

const isScriptLoaded = (id: string): boolean =>
  typeof document !== "undefined" && Boolean(document.getElementById(id));

// GTM (donc GA4) : seulement avec l'accord « mesure d'audience ».
const loadGTM = (): void => {
  if (typeof window === "undefined" || isScriptLoaded(GTM_SCRIPT_ID)) return;

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

// Google Ads : seulement avec l'accord « marketing ». gtag.js relit dans l'ordre les commandes
// déjà présentes dans dataLayer (consentement par défaut, mise à jour, puis config).
const loadGoogleAds = (): void => {
  if (typeof window === "undefined" || isScriptLoaded(GTAG_SCRIPT_ID)) return;

  const script = document.createElement("script");
  script.id = GTAG_SCRIPT_ID;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`;
  document.head.appendChild(script);

  window.gtag("js", new Date());
  window.gtag("config", GOOGLE_ADS_ID);
};

const clearCookies = (prefixes: string[]): void => {
  if (typeof document === "undefined") return;
  const noms = document.cookie
    .split(";")
    .map((cookie) => cookie.split("=")[0].trim())
    .filter((nom) => prefixes.some((prefix) => nom.startsWith(prefix)));
  if (noms.length === 0) return;
  // Google pose ses cookies sur le domaine racine (.ecolet3p.fr) : on essaie chaque niveau.
  const parties = window.location.hostname.split(".");
  const domaines = [""];
  for (let i = 0; i < parties.length - 1; i++) domaines.push(`; domain=.${parties.slice(i).join(".")}`);
  for (const nom of noms) {
    for (const domaine of domaines) {
      document.cookie = `${nom}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domaine}`;
    }
  }
};

let envoiBrutBloque = false;

/**
 * La mesure améliorée de GA4 (« Interactions avec les formulaires », activée sur la propriété)
 * écoute l'événement submit au niveau du document et envoie form_submit à chaque envoi, même
 * vide, invalide ou en échec, sans tenir compte de la validation (audit du 31/10/2026 : 1 envoi
 * compté pour un formulaire vide, 2 pour un contact réussi). Les formulaires de prospects
 * envoient eux-mêmes form_submit, une seule fois, après un enregistrement réussi
 * (analytics.trackFormSubmission). On arrête donc la remontée de l'événement natif juste avant
 * le document : React l'a déjà traité (ses écouteurs sont posés sur #root et sur les portails,
 * plus bas dans l'arbre), le fonctionnement des formulaires ne change pas.
 */
export const blockAutoFormSubmitTracking = (): void => {
  if (typeof document === "undefined" || envoiBrutBloque) return;
  document.documentElement.addEventListener("submit", (event) => event.stopPropagation());
  envoiBrutBloque = true;
};

// Check if GTM dataLayer is available
export const isGAEnabled = (): boolean => {
  return typeof window !== "undefined" && Array.isArray(window.dataLayer);
};

const hasAnalyticsConsent = (): boolean => Boolean(readCookieConsent()?.analytics);

/**
 * Applique le choix enregistré (ou celui passé en paramètre). Renvoie true quand un accord déjà
 * appliqué vient d'être retiré : une balise chargée ne se décharge pas, la page doit être
 * rechargée (AnalyticsProvider s'en charge).
 */
export const syncAnalyticsConsent = (prefs?: CookiePreferences | null): boolean => {
  if (typeof window === "undefined") return false;

  const consent = prefs ?? readCookieConsent();
  const analyticsAccepte = Boolean(consent?.analytics);
  const marketingAccepte = Boolean(consent?.marketing);

  ensureConsentDefault();
  if (consent) {
    window.gtag("consent", "update", {
      analytics_storage: etat(analyticsAccepte),
      ad_storage: etat(marketingAccepte),
      ad_user_data: etat(marketingAccepte),
      ad_personalization: etat(marketingAccepte),
    });
  }

  const retrait =
    (!analyticsAccepte && isScriptLoaded(GTM_SCRIPT_ID)) ||
    (!marketingAccepte && isScriptLoaded(GTAG_SCRIPT_ID));

  if (!analyticsAccepte) clearCookies(ANALYTICS_COOKIES);
  if (!marketingAccepte) clearCookies(MARKETING_COOKIES);

  if (analyticsAccepte) loadGTM();
  if (marketingAccepte) loadGoogleAds();

  return retrait;
};

// Pose le consentement par défaut et charge les balises déjà acceptées.
export const initGA = (): void => {
  blockAutoFormSubmitTracking();
  syncAnalyticsConsent();
};

// Track page views via dataLayer (lu par GTM, donc réservé à l'accord « mesure d'audience »)
export const trackPageView = (path: string, title?: string): void => {
  if (!isGAEnabled() || !hasAnalyticsConsent()) return;

  window.dataLayer.push({
    event: "page_view",
    page_path: path,
    page_title: title,
  });
};

// Track custom events via dataLayer (lu par GTM, donc réservé à l'accord « mesure d'audience »)
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
): void => {
  if (!isGAEnabled() || !hasAnalyticsConsent()) return;

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
