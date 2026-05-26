import { lazy, Suspense } from "react";
import Layout from "@/components/layout/Layout";
import DynamicSEOHead, { useDynamicH1 } from "@/components/seo/DynamicSEOHead";
import HeroSection from "@/components/home-v2/HeroSection";
import ReassuranceBar from "@/components/home-v2/ReassuranceBar";
import FormationsCards from "@/components/home-v2/FormationsCards";
import MobileQuickBar from "@/components/home-v2/MobileQuickBar";
import DeferredRender from "@/components/performance/DeferredRender";

// Lazy-load below-fold heavy sections
const FormatsTable = lazy(() => import("@/components/home-v2/FormatsTable"));
const UpcomingSessionsSection = lazy(() => import("@/components/home-v2/UpcomingSessionsSection"));

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
    },
    {
      "@type": "Question",
      "name": "Combien coûte le renouvellement de carte professionnelle Taxi ou VTC ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le renouvellement de la carte professionnelle se fait via la formation continue obligatoire de 14h (FCO) tous les 5 ans. Tarifs ECOLE T3P : Renouvellement VTC 170€, Renouvellement Taxi 239€, Renouvellement VMDTR (taxi moto) 239€. Attestation remise le jour même."
      }
    },
    {
      "@type": "Question",
      "name": "Existe-t-il une passerelle entre Taxi et VTC ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui. La Passerelle T3P permet d'obtenir une seconde carte professionnelle (VTC ou Taxi) en seulement 14h de formation pour 665€, à condition d'avoir réussi l'examen T3P depuis moins de 3 ans."
      }
    }
  ]
};

const educationalOrganizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "ECOLE T3P",
  "alternateName": "École T3P Montrouge",
  "url": "https://ecolet3p.fr",
  "logo": "https://ecolet3p.fr/images/ecole-t3p-logo-color.svg",
  "description": "Centre de formation agréé Préfecture pour les métiers Taxi, VTC et VMDTR (taxi moto) à Montrouge (92). 94% de réussite à l'examen T3P.",
  "telephone": "+33188750555",
  "email": "montrouge@ecolet3p.fr",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "3 rue Corneille",
    "addressLocality": "Montrouge",
    "postalCode": "92120",
    "addressRegion": "Île-de-France",
    "addressCountry": "FR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 48.8155,
    "longitude": 2.3137
  },
  "areaServed": [
    { "@type": "AdministrativeArea", "name": "Paris" },
    { "@type": "AdministrativeArea", "name": "Hauts-de-Seine" },
    { "@type": "AdministrativeArea", "name": "Val-de-Marne" },
    { "@type": "AdministrativeArea", "name": "Seine-Saint-Denis" },
    { "@type": "AdministrativeArea", "name": "Île-de-France" }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "359",
    "bestRating": "5"
  }
};

const coursesItemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "Course",
        "name": "Formation Taxi initiale",
        "description": "Formation pour obtenir la carte professionnelle Taxi. 94% de réussite à l'examen T3P.",
        "url": "https://ecolet3p.fr/formations/taxi",
        "provider": { "@type": "EducationalOrganization", "name": "ECOLE T3P", "url": "https://ecolet3p.fr" },
        "offers": { "@type": "Offer", "price": "990", "priceCurrency": "EUR", "category": "Formation professionnelle", "availability": "https://schema.org/InStock" }
      }
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "Course",
        "name": "Formation VTC initiale",
        "description": "Formation VTC pour Uber, Bolt, Heetch. Carte pro en 1 semaine. 94% de réussite.",
        "url": "https://ecolet3p.fr/formations/vtc",
        "provider": { "@type": "EducationalOrganization", "name": "ECOLE T3P", "url": "https://ecolet3p.fr" },
        "offers": { "@type": "Offer", "price": "990", "priceCurrency": "EUR", "category": "Formation professionnelle", "availability": "https://schema.org/InStock" }
      }
    },
    {
      "@type": "ListItem",
      "position": 3,
      "item": {
        "@type": "Course",
        "name": "Formation VMDTR (taxi moto)",
        "description": "Formation conducteur moto-taxi. Carte professionnelle VMDTR en 1 semaine.",
        "url": "https://ecolet3p.fr/formations/vmdtr",
        "provider": { "@type": "EducationalOrganization", "name": "ECOLE T3P", "url": "https://ecolet3p.fr" },
        "offers": { "@type": "Offer", "price": "990", "priceCurrency": "EUR", "category": "Formation professionnelle", "availability": "https://schema.org/InStock" }
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
        defaultTitle="Formation Taxi VTC VMDTR Montrouge - 94% Réussite, dès 990€"
        defaultDescription="Centre agréé Préfecture à Montrouge (92). Carte Pro Taxi, VTC ou VMDTR en 1 semaine. 94% de réussite, +2000 chauffeurs formés, paiement 4x sans frais."
        canonicalUrl="https://ecolet3p.fr/"
        ogImage="https://ecolet3p.fr/og-image.jpg"
      >
        <script type="application/ld+json">{JSON.stringify(homeFaqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(educationalOrganizationSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(coursesItemListSchema)}</script>
      </DynamicSEOHead>

      <MobileQuickBar />
      <HeroSection h1Override={h1} />
      <ReassuranceBar />


      <FormationsCards />

      <DeferredRender fallback={<SectionFallback />} rootMargin="220px 0px">
        <Suspense fallback={<SectionFallback />}>
          <FormatsTable />
        </Suspense>
      </DeferredRender>

      <DeferredRender fallback={<SectionFallback />} rootMargin="280px 0px">
        <Suspense fallback={<SectionFallback />}>
          <UpcomingSessionsSection />
        </Suspense>
      </DeferredRender>

      <DeferredRender fallback={<SectionFallback />} rootMargin="320px 0px">
        <Suspense fallback={<SectionFallback />}>
          <EcosystemSection />
        </Suspense>
      </DeferredRender>

      <DeferredRender fallback={<SectionFallback />} rootMargin="320px 0px">
        <Suspense fallback={<SectionFallback />}>
          <TestimonialsSection />
        </Suspense>
      </DeferredRender>

      <DeferredRender fallback={<SectionFallback />} rootMargin="360px 0px">
        <Suspense fallback={<SectionFallback />}>
          <NoCPFSection />
        </Suspense>
      </DeferredRender>

      <DeferredRender fallback={<SectionFallback />} rootMargin="420px 0px">
        <Suspense fallback={<SectionFallback />}>
          <CTAFinalSection />
        </Suspense>
      </DeferredRender>
    </Layout>
  );
};

export default Index;
