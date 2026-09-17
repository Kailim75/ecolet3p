import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { motion, useReducedMotion, type Easing } from "framer-motion";

const ease: Easing = [0.22, 1, 0.36, 1];

interface PageTransitionProps {
  children: ReactNode;
}

/**
 * Wraps route content with a subtle fade + scale-in on every navigation.
 * Re-keyed by pathname so each new page replays the entrance.
 * Respects prefers-reduced-motion (no animation in that case).
 *
 * Ne pas ajouter will-change: transform ici : l'élément deviendrait le bloc conteneur des
 * éléments position:fixed (en-tête, barre d'appel mobile), qui défileraient avec la page.
 */
const PageTransition = ({ children }: PageTransitionProps) => {
  const { pathname } = useLocation();
  const prefersReduced = useReducedMotion();

  if (prefersReduced) return <>{children}</>;

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 8, scale: 0.995 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, ease }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
