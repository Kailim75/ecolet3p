import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Formations from "./pages/Formations";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle";
import LegalMentions from "./pages/LegalMentions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Unsubscribe from "./pages/Unsubscribe";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import AdminSignup from "./pages/AdminSignup";
import NotFound from "./pages/NotFound";
import PageLoader from "./components/ui/PageLoader";
import CookieConsent from "./components/CookieConsent";
import { AuthProvider } from "./hooks/useAuth";

const queryClient = new QueryClient();

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
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/formations" element={<Formations />} />
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
                <Route path="*" element={<NotFound />} />
              </Routes>
              <CookieConsent />
            </BrowserRouter>
          </div>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
