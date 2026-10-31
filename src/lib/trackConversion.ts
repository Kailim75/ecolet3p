import { readCookieConsent } from "@/lib/cookieConsent";

/** Report a successfully saved lead, never personal form data. */
export function trackLeadConversion() {
  if (typeof window === "undefined") return;
  // gtag may remain present after withdrawal, or load for analytics alone.
  if (!readCookieConsent()?.marketing) return;
  if (typeof window.gtag !== "function") return;

  window.gtag("event", "conversion", {
    send_to: "AW-18546542995/etILCIrlgq8dEJOT14tF",
    value: 1.0,
    currency: "EUR",
  });
}