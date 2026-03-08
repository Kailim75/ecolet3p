import React, { ReactNode, lazy, Suspense } from "react";
import Header from "./Header";
import Footer from "./Footer";

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
      <Suspense fallback={null}>
        <ScrollToTopButton />
        <MobileStickyBar />
        <FloatingWhatsAppButton />
      </Suspense>
    </div>
  );
};

export default Layout;
