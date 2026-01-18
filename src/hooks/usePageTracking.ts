import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '@/lib/analytics';

// Hook to track page views on route changes
export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view when location changes
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
  }, [location]);
};

export default usePageTracking;
