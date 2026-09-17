import React, { ReactNode, lazy, Suspense } from "react";
import Header from "./Header";
import Footer from "./Footer";
import DeferredRender from "@/components/performance/DeferredRender";

// Lazy-load all non-critical layout components
const ScrollToTopButton = lazy(() => import("./ScrollToTopButton"));
const MobileStickyBar = lazy(() => import("./MobileStickyBar"));
const FloatingWhatsAppButton = lazy(() => import("./FloatingWhatsAppButton"));

interface LayoutProps {
  children: ReactNode;
  /** La page affiche sa propre barre fixe en bas d'écran mobile : ne pas superposer la barre commune. */
  hideMobileStickyBar?: boolean;
}

const Layout = ({ children, hideMobileStickyBar = false }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pb-[60px] lg:pb-0">{children}</main>
      <Footer />
      {/* Réserve la hauteur de la barre propre à la page sous le pied de page (sinon elle en cache le bas) */}
      {hideMobileStickyBar && <div className="h-[60px] md:hidden" aria-hidden="true" />}
      <DeferredRender strategy="idle" timeoutMs={1000}>
        <Suspense fallback={null}>
          <ScrollToTopButton />
          {!hideMobileStickyBar && <MobileStickyBar />}
          <FloatingWhatsAppButton />
        </Suspense>
      </DeferredRender>
    </div>
  );
};

export default Layout;
