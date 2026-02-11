import React, { useCallback, useState } from "react";
import { Link, LinkProps } from "react-router-dom";

// Map routes to their lazy import functions
const routeImports: Record<string, () => Promise<unknown>> = {
  "/formations": () => import("@/pages/Formations"),
  "/formations/taxi": () => import("@/pages/FormationTaxi"),
  "/formations/vtc": () => import("@/pages/FormationVTC"),
  "/formations/vmdtr": () => import("@/pages/FormationVMDTR"),
  "/formations/mobilite": () => import("@/pages/FormationMobilite"),
  "/a-propos": () => import("@/pages/About"),
  "/contact": () => import("@/pages/Contact"),
  "/blog": () => import("@/pages/Blog"),
  "/mentions-legales": () => import("@/pages/LegalMentions"),
  "/politique-de-confidentialite": () => import("@/pages/PrivacyPolicy"),
};

interface PrefetchLinkProps extends LinkProps {
  prefetchOnHover?: boolean;
  prefetchDelay?: number;
}

const PrefetchLink = ({ 
  to, 
  prefetchOnHover = true, 
  prefetchDelay = 100,
  onMouseEnter,
  onTouchStart,
  ...props 
}: PrefetchLinkProps) => {
  const [prefetched, setPrefetched] = useState(false);

  const prefetch = useCallback(() => {
    if (prefetched || !prefetchOnHover) return;
    
    const path = typeof to === "string" ? to : to.pathname;
    if (!path) return;

    // Find matching route import
    const importFn = routeImports[path];
    if (importFn) {
      // Start loading the module
      importFn().then(() => {
        setPrefetched(true);
      }).catch(() => {
        // Silently fail - the page will load normally
      });
    }
  }, [to, prefetched, prefetchOnHover]);

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = e.currentTarget;
    // Delay prefetch slightly to avoid loading on accidental hovers
    const timer = setTimeout(prefetch, prefetchDelay);
    
    // Clean up if mouse leaves before delay
    const cleanup = () => {
      clearTimeout(timer);
      target.removeEventListener("mouseleave", cleanup);
    };
    target.addEventListener("mouseleave", cleanup);
    
    onMouseEnter?.(e);
  }, [prefetch, prefetchDelay, onMouseEnter]);

  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLAnchorElement>) => {
    prefetch();
    onTouchStart?.(e);
  }, [prefetch, onTouchStart]);

  return (
    <Link
      to={to}
      onMouseEnter={handleMouseEnter}
      onTouchStart={handleTouchStart}
      {...props}
    />
  );
};

export default PrefetchLink;
