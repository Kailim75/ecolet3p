import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { initGA, trackPageView } from "@/lib/analytics";

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

// Component that initializes GA and tracks page views
export const AnalyticsProvider = ({ children }: AnalyticsProviderProps) => {
  const location = useLocation();

  // Initialize GA on mount
  useEffect(() => {
    initGA();
  }, []);

  // Track page views on route changes
  useEffect(() => {
    const pageTitles: Record<string, string> = {
      '/': 'Accueil - T3P Campus',
      '/formations': 'Nos Formations - T3P Campus',
      '/formations/taxi': 'Formation Taxi - T3P Campus',
      '/formations/vtc': 'Formation VTC - T3P Campus',
      '/formations/vmdtr': 'Formation VMDTR - T3P Campus',
      '/formations/mobilite': 'Formation Mobilité - T3P Campus',
      '/a-propos': 'À Propos - T3P Campus',
      '/contact': 'Contact - T3P Campus',
      '/blog': 'Blog - T3P Campus',
    };

    const title = pageTitles[location.pathname] || document.title;
    trackPageView(location.pathname, title);
  }, [location.pathname]);

  return <>{children}</>;
};

export default AnalyticsProvider;
