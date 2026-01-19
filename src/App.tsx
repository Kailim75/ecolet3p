// App.tsx - Main application component
import React, { useState, useEffect, lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageLoader from "./components/ui/PageLoader";
import CookieConsent from "./components/CookieConsent";
import PWAStatus from "./components/pwa/PWAStatus";
import PWAInstallPrompt from "./components/pwa/PWAInstallPrompt";
import AnalyticsProvider from "./components/analytics/AnalyticsProvider";
import { AuthProvider } from "./hooks/useAuth";

// Critical pages loaded immediately
import Index from "./pages/Index";

// Lazy load non-critical pages
const Formations = lazy(() => import("./pages/Formations"));
const FormationTaxi = lazy(() => import("./pages/FormationTaxi"));
const FormationVTC = lazy(() => import("./pages/FormationVTC"));
const FormationVMDTR = lazy(() => import("./pages/FormationVMDTR"));
const FormationMobilite = lazy(() => import("./pages/FormationMobilite"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogArticle = lazy(() => import("./pages/BlogArticle"));
const LegalMentions = lazy(() => import("./pages/LegalMentions"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Unsubscribe = lazy(() => import("./pages/Unsubscribe"));
const Admin = lazy(() => import("./pages/Admin"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminSignup = lazy(() => import("./pages/AdminSignup"));
const CharteGraphique = lazy(() => import("./pages/CharteGraphique"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

// Fallback component for lazy loading
const PageFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-cream">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-forest/20 border-t-forest rounded-full animate-spin" />
      <p className="text-forest/60 text-sm">Chargement...</p>
    </div>
  </div>
);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Quick initial page load animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleLoadingComplete = () => {
    setShowContent(true);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <PageLoader isLoading={isLoading} onLoadingComplete={handleLoadingComplete} />
          <div style={{ opacity: showContent ? 1 : 0, transition: 'opacity 0.3s ease' }}>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AnalyticsProvider>
                <Suspense fallback={<PageFallback />}>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/formations" element={<Formations />} />
                    <Route path="/formations/taxi" element={<FormationTaxi />} />
                    <Route path="/formations/vtc" element={<FormationVTC />} />
                    <Route path="/formations/vmdtr" element={<FormationVMDTR />} />
                    <Route path="/formations/mobilite" element={<FormationMobilite />} />
                    <Route path="/a-propos" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:slug" element={<BlogArticle />} />
                    <Route path="/mentions-legales" element={<LegalMentions />} />
                    <Route path="/politique-de-confidentialite" element={<PrivacyPolicy />} />
                    <Route path="/unsubscribe" element={<Unsubscribe />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/admin-login" element={<AdminLogin />} />
                    <Route path="/admin-signup" element={<AdminSignup />} />
                    <Route path="/charte-graphique" element={<CharteGraphique />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
                <CookieConsent />
                <PWAStatus />
                <PWAInstallPrompt />
              </AnalyticsProvider>
            </BrowserRouter>
          </div>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
