import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home-v2/HeroSection";
import ReassuranceBar from "@/components/home-v2/ReassuranceBar";
import FormationsCards from "@/components/home-v2/FormationsCards";
import FormatsTable from "@/components/home-v2/FormatsTable";
import UpcomingSessionsSection from "@/components/home-v2/UpcomingSessionsSection";
import EcosystemSection from "@/components/home-v2/EcosystemSection";
import TestimonialsSection from "@/components/home-v2/TestimonialsSection";
import NoCPFSection from "@/components/home-v2/NoCPFSection";
import CTAFinalSection from "@/components/home-v2/CTAFinalSection";
import SimulatorWidget from "@/components/home-v2/SimulatorWidget";
import MobileQuickBar from "@/components/home-v2/MobileQuickBar";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "ECOLE T3P",
  "description": "Centre de formation professionnelle agréé pour chauffeurs Taxi, VTC et VMDTR à Montrouge. 94% de taux de réussite, +2000 chauffeurs formés depuis 2014.",
  "url": "https://www.ecolet3p.fr",
  "telephone": "+33188750555",
  "email": "montrouge@ecolet3p.fr",
  "image": "https://www.ecolet3p.fr/og-image.jpg",
  "logo": "https://www.ecolet3p.fr/logo/ecole-t3p-favicon.svg",
  "foundingDate": "2014",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "3 rue Corneille",
    "addressLocality": "Montrouge",
    "postalCode": "92120",
    "addressRegion": "Île-de-France",
    "addressCountry": "FR"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "bestRating": "5",
    "worstRating": "1",
    "ratingCount": "359"
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Combien coûte la formation Taxi ou VTC ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La formation coûte 990€ tout compris, incluant les frais d'examen CMA de 241€. Paiement en 4x sans frais avec Alma possible."
      }
    },
    {
      "@type": "Question",
      "name": "Quel est le taux de réussite ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Notre taux de réussite est de 94%, supérieur à la moyenne nationale."
      }
    },
    {
      "@type": "Question",
      "name": "Quels formats de formation proposez-vous ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "3 formats au même tarif : Journée (1 semaine), Soir (2 semaines) et E-learning (illimité jusqu'à l'examen)."
      }
    }
  ]
};

const Index = () => {
  return (
    <Layout>
      <Helmet>
        <title>ECOLE T3P — Formation Taxi VTC VMDTR Montrouge | 990€</title>
        <meta name="description" content="Centre de formation agréé Taxi, VTC et VMDTR à Montrouge (92). 94% de réussite, +2000 formés, paiement en 4x sans frais. Inscription ouverte." />
        <link rel="canonical" href="https://www.ecolet3p.fr/" />
        <meta property="og:title" content="ECOLE T3P — Formation Taxi VTC VMDTR à Montrouge" />
        <meta property="og:description" content="Devenez chauffeur professionnel à 990€ tout compris. 94% de réussite. 3 formats au choix." />
        <meta property="og:url" content="https://www.ecolet3p.fr/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.ecolet3p.fr/og-image.jpg" />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <MobileQuickBar />
      <HeroSection />
      <ReassuranceBar />
      <FormationsCards />
      <FormatsTable />
      <UpcomingSessionsSection />
      <SimulatorWidget />
      <EcosystemSection />
      <TestimonialsSection />
      <NoCPFSection />
      <CTAFinalSection />
    </Layout>
  );
};

export default Index;
