import { lazy, Suspense } from "react";
import Layout from "@/components/layout/Layout";
import DynamicSEOHead, { useDynamicH1 } from "@/components/seo/DynamicSEOHead";
import HeroSection from "@/components/home-v2/HeroSection";
import ReassuranceBar from "@/components/home-v2/ReassuranceBar";
import FormationsCards from "@/components/home-v2/FormationsCards";
import MobileQuickBar from "@/components/home-v2/MobileQuickBar";

// Lazy-load below-fold heavy sections
const FormatsTable = lazy(() => import("@/components/home-v2/FormatsTable"));
const UpcomingSessionsSection = lazy(() => import("@/components/home-v2/UpcomingSessionsSection"));
const AuditRentabiliteModule = lazy(() => import("@/components/home-v2/AuditRentabiliteModule"));
const EcosystemSection = lazy(() => import("@/components/home-v2/EcosystemSection"));
const TestimonialsSection = lazy(() => import("@/components/home-v2/TestimonialsSection"));
const NoCPFSection = lazy(() => import("@/components/home-v2/NoCPFSection"));
const CTAFinalSection = lazy(() => import("@/components/home-v2/CTAFinalSection"));

const SectionFallback = () => (
  <div className="py-16 flex justify-center">
    <div className="w-8 h-8 border-3 border-primary/20 border-t-primary rounded-full animate-spin" />
  </div>
);

const homeFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Combien coûte la formation Taxi ou VTC à Montrouge ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La formation Taxi ou VTC chez ECOLE T3P est à partir de 990€ (formule Essentiel) ou 1 190€ (formule Premium). Frais d'examen CMA de 241€ inclus. Paiement en 4x sans frais possible avec Alma."
      }
    },
    {
      "@type": "Question",
      "name": "Quel est le taux de réussite d'ECOLE T3P ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ECOLE T3P affiche un taux de réussite de 94% à l'examen T3P de la CMA, bien supérieur à la moyenne nationale. Plus de 2000 chauffeurs formés depuis 2014."
      }
    },
    {
      "@type": "Question",
      "name": "Quels formats de formation proposez-vous ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "3 formats au même tarif : Formation Journée (1 semaine, 9h30-16h30), Formation Soir (2 semaines, 18h-21h30) et E-learning (accès illimité jusqu'à l'examen, 24h/24 7j/7). Formule Essentiel à 990€ ou Premium à 1 190€."
      }
    },
    {
      "@type": "Question",
      "name": "Où se trouve le centre de formation ECOLE T3P ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ECOLE T3P est situé au 3 rue Corneille, 92120 Montrouge, à 2 minutes à pied de la station Mairie de Montrouge (ligne 4 du métro). Accessible facilement depuis Paris et toute l'Île-de-France."
      }
    }
  ]
};

const Index = () => {
  const h1 = useDynamicH1("/", "Devenez chauffeur professionnel à partir de 990€.");

  return (
    <Layout>
      <DynamicSEOHead
        pageUrl="/"
        defaultTitle="ECOLE T3P — Formation Taxi VTC VMDTR Montrouge | 990€"
        defaultDescription="Centre de formation agréé Taxi, VTC et VMDTR à Montrouge (92). 94% de réussite, +2000 formés, paiement en 4x sans frais. Inscription ouverte."
        canonicalUrl="https://www.ecolet3p.fr/"
        ogImage="https://www.ecolet3p.fr/og-image.jpg"
      >
        <script type="application/ld+json">{JSON.stringify(homeFaqSchema)}</script>
      </DynamicSEOHead>

      <MobileQuickBar />
      <HeroSection h1Override={h1} />
      <ReassuranceBar />

      <Suspense fallback={<SectionFallback />}>
        <AuditRentabiliteModule />
      </Suspense>

      <FormationsCards />

      <Suspense fallback={<SectionFallback />}>
        <FormatsTable />
        <UpcomingSessionsSection />
        <EcosystemSection />
        <TestimonialsSection />
        <NoCPFSection />
        <CTAFinalSection />
      </Suspense>
    </Layout>
  );
};

export default Index;