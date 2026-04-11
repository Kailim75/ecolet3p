// App.tsx - Main application component
import React, { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import RedirectHandler from "./components/seo/RedirectHandler";
import AnalyticsProvider from "./components/analytics/AnalyticsProvider";
import { AuthProvider } from "./hooks/useAuth";
import { QuoteModalProvider } from "./components/quote/QuoteModalContext";
import DeferredRender from "./components/performance/DeferredRender";

// Lazy load non-critical global components
const CookieConsent = lazy(() => import("./components/CookieConsent"));
const PWAStatus = lazy(() => import("./components/pwa/PWAStatus"));

// Critical pages loaded immediately
import Index from "./pages/Index";

// Lazy load non-critical pages
const Formations = lazy(() => import("./pages/Formations"));
const FormationTaxi = lazy(() => import("./pages/FormationTaxi"));
const FormationVTC = lazy(() => import("./pages/FormationVTC"));
const FormationVMDTR = lazy(() => import("./pages/FormationVMDTR"));
const FormationContinueTaxi = lazy(() => import("./pages/FormationContinueTaxi"));
const FormationContinueVTC = lazy(() => import("./pages/FormationContinueVTC"));
const FormationContinueVMDTR = lazy(() => import("./pages/FormationContinueVMDTR"));
const LocationVehiculeExamen = lazy(() => import("./pages/LocationVehiculeExamen"));
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
const LogoPreview = lazy(() => import("./pages/LogoPreview"));
const LogoExport = lazy(() => import("./pages/LogoExport"));
const LogoInstitutional = lazy(() => import("./pages/LogoInstitutional"));
const LogoShowcase = lazy(() => import("./pages/LogoShowcase"));
const LogoDownload = lazy(() => import("./pages/LogoDownload"));
const RecuperationPoints = lazy(() => import("./pages/RecuperationPoints"));
const RenouvellementCarteProfessionnelle = lazy(() => import("./pages/RenouvellementCarteProfessionnelle"));
const Templates = lazy(() => import("./pages/Templates"));
const FormationVille = lazy(() => import("./pages/FormationVille"));
const FormationsVilles = lazy(() => import("./pages/FormationsVilles"));
const GuideFormation = lazy(() => import("./pages/GuideFormation"));
const GuideFormationPDF = lazy(() => import("./pages/GuideFormationPDF"));
const Paiement = lazy(() => import("./pages/Paiement"));
const CalendrierExamens = lazy(() => import("./pages/CalendrierExamens"));
const PasserelleVtcTaxi = lazy(() => import("./pages/PasserelleVtcTaxi"));
const FormationAccessibilitePMR = lazy(() => import("./pages/FormationAccessibilitePMR"));
const AccompagnementGestionActivite = lazy(() => import("./pages/AccompagnementGestionActivite"));
const AideAdministrativeCreationEntreprise = lazy(() => import("./pages/AideAdministrativeCreationEntreprise"));
const FormationAnglais = lazy(() => import("./pages/FormationAnglais"));
const FormationMontrouge = lazy(() => import("./pages/FormationMontrouge"));

const FormuleSoiree = lazy(() => import("./pages/FormuleSoiree"));
const FormationRenouvellement = lazy(() => import("./pages/FormationRenouvellement"));
const AuditRentabilite = lazy(() => import("./pages/SimulateurRevenus"));
const AuditRentabiliteChauffeur = lazy(() => import("./pages/AuditRentabiliteChauffeur"));

const queryClient = new QueryClient();

// Fallback component for lazy loading
const PageFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      <p className="text-muted-foreground text-sm">Chargement...</p>
    </div>
  </div>
);

const App = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <QuoteModalProvider>
          <TooltipProvider>
            <div>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <AnalyticsProvider>
                  <RedirectHandler />
                  <Suspense fallback={<PageFallback />}>
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/formations" element={<Formations />} />
                      <Route path="/formations/taxi" element={<FormationTaxi />} />
                      <Route path="/formations/vtc" element={<FormationVTC />} />
                      <Route path="/formations/vmdtr" element={<FormationVMDTR />} />
                      <Route path="/formations/mobilite" element={<Navigate to="/passerelle-vtc-taxi" replace />} />
                      <Route path="/formations/continue-taxi" element={<FormationContinueTaxi />} />
                      <Route path="/formations/continue-vtc" element={<FormationContinueVTC />} />
                      <Route path="/formations/continue-vmdtr" element={<FormationContinueVMDTR />} />
                      <Route path="/formations/renouvellement" element={<FormationRenouvellement />} />
                      <Route path="/stage-recuperation-points" element={<RecuperationPoints />} />
                      <Route path="/renouvellement-carte-professionnelle" element={<RenouvellementCarteProfessionnelle />} />
                      <Route path="/formations/villes" element={<FormationsVilles />} />
                      <Route path="/formations/montrouge" element={<FormationMontrouge />} />
                      <Route path="/formations/:ville" element={<FormationVille />} />
                      <Route path="/guide-formation" element={<GuideFormation />} />
                      <Route path="/guide-formation/pdf" element={<GuideFormationPDF />} />
                      <Route path="/paiement" element={<Paiement />} />
                      <Route path="/calendrier-examens" element={<CalendrierExamens />} />
                      <Route path="/services/location-vehicule-examen" element={<LocationVehiculeExamen />} />
                      <Route path="/passerelle-vtc-taxi" element={<PasserelleVtcTaxi />} />
                      <Route path="/formation-accessibilite-pmr" element={<FormationAccessibilitePMR />} />
                      <Route path="/accompagnement-gestion-activite" element={<AccompagnementGestionActivite />} />
                      <Route path="/aide-administrative-creation-entreprise" element={<AideAdministrativeCreationEntreprise />} />
                      <Route path="/formations/anglais-professionnel" element={<FormationAnglais />} />
                      <Route path="/formations/formule-soiree" element={<FormuleSoiree />} />
                      <Route path="/audit-rentabilite" element={<AuditRentabilite />} />
                      <Route path="/audit-rentabilite-chauffeur" element={<AuditRentabiliteChauffeur />} />
                      <Route path="/simulateur-revenus" element={<Navigate to="/audit-rentabilite" replace />} />
                      <Route path="/formation-vtc" element={<Navigate to="/formations/vtc" replace />} />
                      <Route path="/formation-taxi" element={<Navigate to="/formations/taxi" replace />} />
                      <Route path="/formation-vmdtr" element={<Navigate to="/formations/vmdtr" replace />} />
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
                      <Route path="/logo-preview" element={<LogoPreview />} />
                      <Route path="/logo-export" element={<LogoExport />} />
                      <Route path="/logo-institutionnel" element={<LogoInstitutional />} />
                      <Route path="/logo-showcase" element={<LogoShowcase />} />
                      <Route path="/logo-download" element={<LogoDownload />} />
                      <Route path="/templates" element={<Templates />} />
                      <Route path="/formations/recuperation-points" element={<Navigate to="/stage-recuperation-points" replace />} />
                      <Route path="/formations/accessibilite-pmr" element={<Navigate to="/formation-accessibilite-pmr" replace />} />
                      <Route path="/formations/gestion-entreprise" element={<Navigate to="/accompagnement-gestion-activite" replace />} />
                      <Route path="/formations/accompagnement-administratif" element={<Navigate to="/aide-administrative-creation-entreprise" replace />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
                  <DeferredRender strategy="idle" timeoutMs={1400}>
                    <Suspense fallback={null}>
                      <CookieConsent />
                      <PWAStatus />
                    </Suspense>
                  </DeferredRender>
                </AnalyticsProvider>
              </BrowserRouter>
            </div>
          </TooltipProvider>
        </QuoteModalProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
