import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { initGA, syncAnalyticsConsent, trackPageView } from "@/lib/analytics";
import { COOKIE_CONSENT_EVENT } from "@/lib/cookieConsent";

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

// Component that initializes GA and tracks page views
export const AnalyticsProvider = ({ children }: AnalyticsProviderProps) => {
  const location = useLocation();

  // Initialize GA on mount
  useEffect(() => {
    initGA();
    const handleConsentChange = () => syncAnalyticsConsent();
    window.addEventListener(COOKIE_CONSENT_EVENT, handleConsentChange);

    return () => {
      window.removeEventListener(COOKIE_CONSENT_EVENT, handleConsentChange);
    };
  }, []);

  // Track page views after the route and document title have settled.
  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      const path = `${location.pathname}${location.search}${location.hash}`;
      trackPageView(path, document.title);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [location.pathname, location.search, location.hash]);

  return <>{children}</>;
};

export default AnalyticsProvider;
