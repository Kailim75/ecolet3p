import React, { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTopButton from "./ScrollToTopButton";

interface LayoutProps {
  children: ReactNode;
}

// JSON-LD schemas (LocalBusiness, FAQPage) are defined statically in index.html
// to ensure visibility for crawlers without JS.
// Per-page schemas (BreadcrumbList, Course, etc.) are injected via react-helmet-async in each page component.

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pb-[60px] lg:pb-0">{children}</main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default Layout;
