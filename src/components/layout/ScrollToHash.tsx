import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Fait défiler jusqu'à l'ancre après une navigation interne (/formations#tarifs) : React Router
 * ne le fait pas, et la page visée est chargée à la demande, d'où l'attente de l'élément
 * (4 s au plus). Le décalage sous l'en-tête fixe vient de scroll-padding-top et scroll-mt-*.
 */
const ScrollToHash = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = decodeURIComponent(hash.slice(1));
    let essais = 0;
    let timer = 0;
    const tenter = () => {
      const cible = document.getElementById(id);
      if (cible) {
        cible.scrollIntoView({ block: "start" });
        return;
      }
      if (++essais < 40) timer = window.setTimeout(tenter, 100);
    };
    tenter();
    return () => window.clearTimeout(timer);
  }, [pathname, hash]);

  return null;
};

export default ScrollToHash;
