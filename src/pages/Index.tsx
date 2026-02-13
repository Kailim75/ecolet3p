import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import TrustBar from "@/components/home/TrustBar";

// Import critical images for preload
import formationSession from "@/assets/center/formation-session.jpg";

// Lazy load below-the-fold sections
const FormationsOverviewSection = lazy(() => import("@/components/home/FormationsOverviewSection"));
const JourneyStepsSection = lazy(() => import("@/components/home/JourneyStepsSection"));
const WhyChooseUsSection = lazy(() => import("@/components/home/WhyChooseUsSection"));
const FinancingSection = lazy(() => import("@/components/home/FinancingSection"));
const TestimonialsCarousel = lazy(() => import("@/components/home/TestimonialsCarousel"));
const ProcessSection = lazy(() => import("@/components/home/ProcessSection"));
const FAQSection = lazy(() => import("@/components/home/FAQSection"));
const BeforeAfterSection = lazy(() => import("@/components/home/BeforeAfterSection"));
const CTASection = lazy(() => import("@/components/home/CTASection"));

// Simple skeleton for lazy sections
const SectionSkeleton = () => (
  <div className="py-20">
    <div className="container-custom">
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-muted rounded w-1/3 mx-auto" />
        <div className="h-4 bg-muted/60 rounded w-2/3 mx-auto" />
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 bg-muted/40 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  </div>
);

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "EducationalOrganization"],
  "@id": "https://www.ecolet3p.fr/#organization",
  "name": "ECOLE T3P",
  "alternateName": ["T3P Campus", "ECOLE T3P Montrouge", "Formation Taxi VTC Sud Paris", "Centre Formation 92"],
  "description": "Centre de formation agréé Préfecture pour chauffeurs Taxi, VTC et VMDTR à Montrouge (92). 94% de taux de réussite, +2000 chauffeurs formés depuis 2014.",
  "url": "https://www.ecolet3p.fr",
  "telephone": "+33188750555",
  "email": "montrouge@ecolet3p.fr",
  "image": "https://www.ecolet3p.fr/og-image.jpg",
  "logo": "https://www.ecolet3p.fr/logo/ecole-t3p-favicon.svg",
  "foundingDate": "2014",
  "slogan": "Devenez chauffeur Taxi, VTC ou VMDTR",
  "currenciesAccepted": "EUR",
  "paymentAccepted": "Cash, Credit Card, Bank Transfer",
  "priceRange": "€€",
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
    "latitude": 48.8184,
    "longitude": 2.3196
  },
  "areaServed": [
    { "@type": "City", "name": "Montrouge", "containedInPlace": { "@type": "AdministrativeArea", "name": "Hauts-de-Seine" } },
    { "@type": "City", "name": "Bagneux", "containedInPlace": { "@type": "AdministrativeArea", "name": "Hauts-de-Seine" } },
    { "@type": "City", "name": "Vanves", "containedInPlace": { "@type": "AdministrativeArea", "name": "Hauts-de-Seine" } },
    { "@type": "City", "name": "Malakoff", "containedInPlace": { "@type": "AdministrativeArea", "name": "Hauts-de-Seine" } },
    { "@type": "City", "name": "Châtillon", "containedInPlace": { "@type": "AdministrativeArea", "name": "Hauts-de-Seine" } },
    { "@type": "City", "name": "Clamart", "containedInPlace": { "@type": "AdministrativeArea", "name": "Hauts-de-Seine" } },
    { "@type": "City", "name": "Issy-les-Moulineaux", "containedInPlace": { "@type": "AdministrativeArea", "name": "Hauts-de-Seine" } },
    { "@type": "City", "name": "Fontenay-aux-Roses", "containedInPlace": { "@type": "AdministrativeArea", "name": "Hauts-de-Seine" } },
    { "@type": "City", "name": "Le Plessis-Robinson", "containedInPlace": { "@type": "AdministrativeArea", "name": "Hauts-de-Seine" } },
    { "@type": "City", "name": "Sceaux", "containedInPlace": { "@type": "AdministrativeArea", "name": "Hauts-de-Seine" } },
    { "@type": "City", "name": "Bourg-la-Reine", "containedInPlace": { "@type": "AdministrativeArea", "name": "Hauts-de-Seine" } },
    { "@type": "City", "name": "Antony", "containedInPlace": { "@type": "AdministrativeArea", "name": "Hauts-de-Seine" } },
    { "@type": "City", "name": "Meudon", "containedInPlace": { "@type": "AdministrativeArea", "name": "Hauts-de-Seine" } },
    { "@type": "City", "name": "Boulogne-Billancourt", "containedInPlace": { "@type": "AdministrativeArea", "name": "Hauts-de-Seine" } },
    { "@type": "City", "name": "Paris 13e arrondissement" },
    { "@type": "City", "name": "Paris 14e arrondissement" },
    { "@type": "City", "name": "Paris 15e arrondissement" }
  ],
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:30",
      "closes": "12:30"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "13:30",
      "closes": "18:00"
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "bestRating": "5",
    "worstRating": "1",
    "ratingCount": "359",
    "reviewCount": "359"
  },
  "sameAs": [
    "https://www.google.com/maps/place/ECOLE+T3P"
  ],
  "keywords": "formation taxi Montrouge, formation VTC Bagneux, formation taxi Vanves, formation VTC Malakoff, formation taxi Châtillon, centre formation 92, sud Paris",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Formations T3P",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Course",
          "@id": "https://www.ecolet3p.fr/formations/taxi#course",
          "name": "Formation Taxi",
          "description": "Formation complète de 63 heures pour obtenir votre carte professionnelle de chauffeur de taxi. Préparation à l'examen CMA théorique et pratique.",
          "url": "https://www.ecolet3p.fr/formations/taxi",
          "provider": { "@id": "https://www.ecolet3p.fr/#organization" },
          "timeRequired": "PT63H",
          "educationalLevel": "Débutant",
          "inLanguage": "fr",
          "offers": {
            "@type": "Offer",
            "price": "990",
            "priceCurrency": "EUR",
            "availability": "https://schema.org/LimitedAvailability",
            "validFrom": "2026-01-01"
          }
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Course",
          "@id": "https://www.ecolet3p.fr/formations/vtc#course",
          "name": "Formation VTC",
          "description": "Formation de 63 heures pour devenir chauffeur VTC professionnel. Préparation complète à l'examen et accompagnement jusqu'à la carte professionnelle.",
          "url": "https://www.ecolet3p.fr/formations/vtc",
          "provider": { "@id": "https://www.ecolet3p.fr/#organization" },
          "timeRequired": "PT63H",
          "educationalLevel": "Débutant",
          "inLanguage": "fr",
          "offers": {
            "@type": "Offer",
            "price": "990",
            "priceCurrency": "EUR",
            "availability": "https://schema.org/LimitedAvailability",
            "validFrom": "2026-01-01"
          }
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Course",
          "@id": "https://www.ecolet3p.fr/formations/vmdtr#course",
          "name": "Formation VMDTR",
          "description": "Formation moto-taxi de 33 heures pour le transport de passagers sur deux roues. Préparation à l'examen VMDTR de la CMA.",
          "url": "https://www.ecolet3p.fr/formations/vmdtr",
          "provider": { "@id": "https://www.ecolet3p.fr/#organization" },
          "timeRequired": "PT33H",
          "educationalLevel": "Débutant",
          "inLanguage": "fr",
          "offers": {
            "@type": "Offer",
            "price": "990",
            "priceCurrency": "EUR",
            "availability": "https://schema.org/LimitedAvailability",
            "validFrom": "2026-01-01"
          }
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Course",
          "@id": "https://www.ecolet3p.fr/formations/continue-taxi#course",
          "name": "Formation Continue Taxi",
          "description": "Renouvellement obligatoire de 14 heures pour maintenir votre carte professionnelle de chauffeur de taxi.",
          "url": "https://www.ecolet3p.fr/formations/continue-taxi",
          "provider": { "@id": "https://www.ecolet3p.fr/#organization" },
          "timeRequired": "PT14H",
          "inLanguage": "fr",
          "offers": {
            "@type": "Offer",
            "price": "250",
            "priceCurrency": "EUR",
            "availability": "https://schema.org/InStock"
          }
        }
      }
    ]
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Qu'est-ce que la carte professionnelle T3P ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La carte professionnelle T3P (Transport Public Particulier de Personnes) est un document obligatoire délivré par la préfecture pour exercer en tant que chauffeur de taxi, VTC ou VMDTR (moto-taxi). Elle s'obtient après réussite de l'examen organisé par la Chambre des Métiers et de l'Artisanat (CMA)."
      }
    },
    {
      "@type": "Question",
      "name": "Combien de temps dure la formation ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La formation initiale Taxi et VTC dure 63 heures, réparties sur environ 2 semaines. La formation VMDTR (moto-taxi) dure 33 heures. La formation continue de renouvellement dure 14 heures. ECOLE T3P propose des formats en journée et en soirée pour s'adapter à votre emploi du temps."
      }
    },
    {
      "@type": "Question",
      "name": "Quelles sont les options de financement disponibles ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ECOLE T3P propose un paiement en 4 fois sans frais (par exemple 248€/mois pour la formation à 990€). D'autres solutions de financement existent selon votre situation : autofinancement, aide de Pôle Emploi, ou prise en charge par votre employeur."
      }
    },
    {
      "@type": "Question",
      "name": "Quel est le taux de réussite de vos formations ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Notre taux de réussite est de 94%, bien supérieur à la moyenne nationale. Ce résultat s'explique par notre méthode pédagogique éprouvée, nos formateurs expérimentés, et notre préparation intensive aux examens de la CMA. Plus de 2000 chauffeurs ont été formés chez ECOLE T3P depuis 2014."
      }
    },
    {
      "@type": "Question",
      "name": "Comment se déroule l'inscription ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "L'inscription se fait en 3 étapes simples : 1) Contactez-nous par téléphone au 01 88 75 05 55 ou via le formulaire en ligne. 2) Choisissez votre formation (Taxi, VTC ou VMDTR) et votre format (journée ou soirée). 3) Validez votre inscription avec un premier versement ou en 4x sans frais. Nous vous répondons sous 24 heures."
      }
    },
    {
      "@type": "Question",
      "name": "Proposez-vous un accompagnement après la formation ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, ECOLE T3P assure un suivi complet après la formation : aide aux démarches administratives pour l'examen CMA, accompagnement pour la demande de carte professionnelle en préfecture, et conseils pour la création de votre entreprise de transport. Notre objectif est votre réussite professionnelle complète."
      }
    }
  ]
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "ECOLE T3P",
  "alternateName": "T3P Campus",
  "url": "https://www.ecolet3p.fr"
};

const Index = () => {
  return (
    <Layout>
      <Helmet>
        <title>ECOLE T3P — Formation Taxi VTC VMDTR Montrouge 92</title>
        <meta name="description" content="Centre de formation agréé Taxi, VTC et VMDTR à Montrouge (92). Taux de réussite 94%. Formations initiales, continues et récupération de points. Métro ligne 4." />
        <meta name="keywords" content="formation taxi Montrouge, formation VTC Bagneux, formation taxi Vanves, formation VTC Malakoff, formation taxi Châtillon, formation VTC Clamart, formation taxi Issy-les-Moulineaux, formation taxi Paris 14, formation VTC Paris 15, formation taxi Paris 13, centre formation 92, carte professionnelle taxi Hauts-de-Seine, formation VTC sud Paris, ECOLE T3P, récupération points 92" />
        <link rel="canonical" href="https://www.ecolet3p.fr/" />
        
        <link 
          rel="preload" 
          as="image" 
          href={formationSession}
          type="image/jpeg"
        />
        
        <meta property="og:title" content="ECOLE T3P — Formation Taxi VTC VMDTR à Montrouge | Sud Paris 92" />
        <meta property="og:description" content="Centre de formation agréé Taxi, VTC et VMDTR à Montrouge. Taux de réussite 94%. Formations initiales, continues et récupération de points. Proche métro Mairie de Montrouge ligne 4." />
        <meta property="og:url" content="https://www.ecolet3p.fr/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="ECOLE T3P" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:image" content="https://www.ecolet3p.fr/og-image.jpg" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ECOLE T3P — Formation Taxi VTC Montrouge | Sud Paris 92" />
        <meta name="twitter:description" content="Centre de formation agréé Taxi VTC à Montrouge. Accessible depuis tout le sud de Paris et le 92." />
        <meta name="twitter:image" content="https://www.ecolet3p.fr/og-image.jpg" />
        
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="author" content="ECOLE T3P" />
        <meta name="geo.region" content="FR-92" />
        <meta name="geo.placename" content="Montrouge, Bagneux, Vanves, Malakoff, Châtillon" />
        <meta name="geo.position" content="48.8155;2.3137" />
        <meta name="ICBM" content="48.8155, 2.3137" />
        
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
      </Helmet>
      
      {/* Hero + Trust Bar - Critical above-the-fold */}
      <HeroSection />
      <TrustBar />
      
      {/* Lazy loaded sections */}
      <Suspense fallback={<SectionSkeleton />}>
        <FormationsOverviewSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <JourneyStepsSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <WhyChooseUsSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <FinancingSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <TestimonialsCarousel />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <BeforeAfterSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <ProcessSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <FAQSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <CTASection />
      </Suspense>
    </Layout>
  );
};

export default Index;
