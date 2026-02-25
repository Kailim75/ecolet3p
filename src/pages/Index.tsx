import Layout from "@/components/layout/Layout";
import DynamicSEOHead, { useDynamicH1 } from "@/components/seo/DynamicSEOHead";
import HeroSection from "@/components/home-v2/HeroSection";
import ReassuranceBar from "@/components/home-v2/ReassuranceBar";
import FormationsCards from "@/components/home-v2/FormationsCards";
import FormatsTable from "@/components/home-v2/FormatsTable";
import UpcomingSessionsSection from "@/components/home-v2/UpcomingSessionsSection";
import EcosystemSection from "@/components/home-v2/EcosystemSection";
import TestimonialsSection from "@/components/home-v2/TestimonialsSection";
import NoCPFSection from "@/components/home-v2/NoCPFSection";
import CTAFinalSection from "@/components/home-v2/CTAFinalSection";
import AuditRentabiliteModule from "@/components/home-v2/AuditRentabiliteModule";
import MobileQuickBar from "@/components/home-v2/MobileQuickBar";

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
      <AuditRentabiliteModule />
      <FormationsCards />
      <FormatsTable />
      <UpcomingSessionsSection />
      <EcosystemSection />
      <TestimonialsSection />
      <NoCPFSection />
      <CTAFinalSection />
    </Layout>
  );
};

export default Index;
