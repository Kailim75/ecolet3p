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
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pb-[60px] lg:pb-0">{children}</main>
      <Footer />
      <DeferredRender strategy="idle" timeoutMs={1000}>
        <Suspense fallback={null}>
          <ScrollToTopButton />
          <MobileStickyBar />
          <FloatingWhatsAppButton />
        </Suspense>
      </DeferredRender>
    </div>
  );
};

export default Layout;
