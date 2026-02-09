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
      '/': 'Accueil - ECOLE T3P',
      '/formations': 'Nos Formations - ECOLE T3P',
      '/formations/taxi': 'Formation TAXI - ECOLE T3P',
      '/formations/vtc': 'Formation VTC - ECOLE T3P',
      '/formations/vmdtr': 'Formation VMDTR - ECOLE T3P',
      '/formations/mobilite': 'Formation Mobilité - ECOLE T3P',
      '/formations/bagneux': 'Formation Taxi VTC Bagneux - ECOLE T3P',
      '/formations/vanves': 'Formation Taxi VTC Vanves - ECOLE T3P',
      '/formations/malakoff': 'Formation Taxi VTC Malakoff - ECOLE T3P',
      '/formations/chatillon': 'Formation Taxi VTC Châtillon - ECOLE T3P',
      '/formations/clamart': 'Formation Taxi VTC Clamart - ECOLE T3P',
      '/formations/issy-les-moulineaux': 'Formation Taxi VTC Issy - ECOLE T3P',
      '/formations/paris-13': 'Formation Taxi VTC Paris 13e - ECOLE T3P',
      '/formations/paris-14': 'Formation Taxi VTC Paris 14e - ECOLE T3P',
      '/formations/paris-15': 'Formation Taxi VTC Paris 15e - ECOLE T3P',
      '/a-propos': 'À Propos - ECOLE T3P',
      '/contact': 'Contact - ECOLE T3P',
      '/blog': 'Blog - ECOLE T3P',
    };

    const title = pageTitles[location.pathname] || document.title;
    trackPageView(location.pathname, title);
  }, [location.pathname]);

  return <>{children}</>;
};

export default AnalyticsProvider;
