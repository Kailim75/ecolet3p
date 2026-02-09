import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import FormationsOverviewSection from "@/components/home/FormationsOverviewSection";
import ServicesSection from "@/components/home/ServicesSection";

// Import critical images for preload
import formationSession from "@/assets/center/formation-session.jpg";

// Lazy load below-the-fold sections
const WhyChooseUsSection = lazy(() => import("@/components/home/WhyChooseUsSection"));
const FAQSection = lazy(() => import("@/components/home/FAQSection"));
const AppointmentSection = lazy(() => import("@/components/home/AppointmentSection"));
const CTASection = lazy(() => import("@/components/home/CTASection"));

// Simple skeleton for lazy sections
const SectionSkeleton = () => (
  <div className="py-20 bg-cream">
    <div className="container-custom">
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-forest/10 rounded w-1/3 mx-auto" />
        <div className="h-4 bg-forest/5 rounded w-2/3 mx-auto" />
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 bg-forest/5 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  </div>
);

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "ECOLE T3P",
  "alternateName": ["ECOLE T3P Montrouge", "Formation Taxi VTC Sud Paris", "Centre Formation 92"],
  "url": "https://ecolet3p.fr",
  "logo": "https://ecolet3p.fr/logo/ecole-t3p-favicon.svg",
  "image": "https://ecolet3p.fr/og-image.jpg",
  "description": "Centre de formation Taxi, VTC et VMDTR à Montrouge (92). Accessible depuis Bagneux, Vanves, Malakoff, Châtillon, Clamart, Issy-les-Moulineaux et les arrondissements sud de Paris (13e, 14e, 15e). Taux de réussite 94%.",
  "telephone": "+33188750555",
  "email": "montrouge@ecolet3p.fr",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "3 rue Corneille",
    "addressLocality": "Montrouge",
    "postalCode": "92120",
    "addressRegion": "Hauts-de-Seine",
    "addressCountry": "FR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 48.8155,
    "longitude": 2.3137
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
    { "@type": "City", "name": "Neuilly-sur-Seine", "containedInPlace": { "@type": "AdministrativeArea", "name": "Hauts-de-Seine" } },
    { "@type": "City", "name": "Levallois-Perret", "containedInPlace": { "@type": "AdministrativeArea", "name": "Hauts-de-Seine" } },
    { "@type": "City", "name": "Clichy", "containedInPlace": { "@type": "AdministrativeArea", "name": "Hauts-de-Seine" } },
    { "@type": "City", "name": "Asnières-sur-Seine", "containedInPlace": { "@type": "AdministrativeArea", "name": "Hauts-de-Seine" } },
    { "@type": "City", "name": "Courbevoie", "containedInPlace": { "@type": "AdministrativeArea", "name": "Hauts-de-Seine" } },
    { "@type": "City", "name": "La Défense", "containedInPlace": { "@type": "AdministrativeArea", "name": "Hauts-de-Seine" } },
    { "@type": "City", "name": "Paris 13e arrondissement" },
    { "@type": "City", "name": "Paris 14e arrondissement" },
    { "@type": "City", "name": "Paris 15e arrondissement" }
  ],
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:30",
      "closes": "18:00"
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "359",
    "bestRating": "5",
    "worstRating": "1"
  },
  "sameAs": [
    "https://www.google.com/maps/place/ECOLE+T3P"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Formations ECOLE T3P - Taxi VTC Montrouge Hauts-de-Seine",
    "itemListElement": [
      {
        "@type": "Course",
        "name": "Formation Taxi Initiale Montrouge",
        "description": "Formation complète pour obtenir votre carte professionnelle Taxi. Accessible depuis Bagneux, Vanves, Malakoff et le sud de Paris.",
        "provider": { "@type": "Organization", "name": "ECOLE T3P" }
      },
      {
        "@type": "Course",
        "name": "Formation VTC Sud Paris",
        "description": "Formation pour devenir chauffeur VTC professionnel. Centre à Montrouge, proche Paris 14e et 15e.",
        "provider": { "@type": "Organization", "name": "ECOLE T3P" }
      },
      {
        "@type": "Course",
        "name": "Formation VMDTR Hauts-de-Seine",
        "description": "Formation moto-taxi pour obtenir votre certification. À 5 min du métro Mairie de Montrouge.",
        "provider": { "@type": "Organization", "name": "ECOLE T3P" }
      }
    ]
  }
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://ecolet3p.fr/#localbusiness",
  "name": "ECOLE T3P - Formation Taxi VTC Montrouge Bagneux Vanves",
  "image": "https://ecolet3p.fr/og-image.jpg",
  "telephone": "+33188750555",
  "email": "montrouge@ecolet3p.fr",
  "url": "https://ecolet3p.fr",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "3 rue Corneille",
    "addressLocality": "Montrouge",
    "postalCode": "92120",
    "addressRegion": "Hauts-de-Seine",
    "addressCountry": "FR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 48.8155,
    "longitude": 2.3137
  },
  "areaServed": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": 48.8155,
      "longitude": 2.3137
    },
    "geoRadius": "15000"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:30",
      "closes": "18:00"
    }
  ],
  "priceRange": "€€",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "359"
  },
  "keywords": "formation taxi Montrouge, formation VTC Bagneux, formation taxi Vanves, formation VTC Malakoff, formation taxi Châtillon, centre formation 92, sud Paris"
};

const Index = () => {
  return (
    <Layout>
      <Helmet>
        <title>Formation Taxi VTC Montrouge Bagneux Vanves | ECOLE T3P - Sud Paris 92</title>
        <meta name="description" content="Centre de formation Taxi, VTC et VMDTR à Montrouge (92). Formations initiales et continues pour Bagneux, Vanves, Malakoff, Châtillon, Clamart, Issy-les-Moulineaux et les arrondissements sud de Paris (13e, 14e, 15e). Centre agréé Préfecture." />
        <meta name="keywords" content="formation taxi Montrouge, formation VTC Bagneux, formation taxi Vanves, formation VTC Malakoff, formation taxi Châtillon, formation VTC Clamart, formation taxi Issy-les-Moulineaux, formation taxi Paris 14, formation VTC Paris 15, formation taxi Paris 13, centre formation 92, carte professionnelle taxi Hauts-de-Seine, formation VTC sud Paris, ECOLE T3P, récupération points 92" />
        <link rel="canonical" href="https://ecolet3p.fr/" />
        
        {/* Preload critical hero image */}
        <link 
          rel="preload" 
          as="image" 
          href={formationSession}
          type="image/jpeg"
        />
        
        <meta property="og:title" content="Formation Taxi VTC Montrouge Bagneux Vanves | ECOLE T3P - Sud Paris 92" />
        <meta property="og:description" content="Centre de formation agréé Taxi, VTC et VMDTR à Montrouge. Accessible depuis Bagneux, Vanves, Malakoff, Châtillon, Paris 13e, 14e, 15e et tout le 92." />
        <meta property="og:url" content="https://ecolet3p.fr/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="ECOLE T3P" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:image" content="https://ecolet3p.fr/og-image.jpg" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Formation Taxi VTC Montrouge Bagneux | Sud Paris 92" />
        <meta name="twitter:description" content="Centre de formation agréé Taxi VTC à Montrouge. Accessible depuis tout le sud de Paris et le 92." />
        <meta name="twitter:image" content="https://ecolet3p.fr/og-image.jpg" />
        
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="author" content="ECOLE T3P" />
        <meta name="geo.region" content="FR-92" />
        <meta name="geo.placename" content="Montrouge, Bagneux, Vanves, Malakoff, Châtillon" />
        <meta name="geo.position" content="48.8155;2.3137" />
        <meta name="ICBM" content="48.8155, 2.3137" />
        
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      </Helmet>
      
      {/* Critical above-the-fold content */}
      <HeroSection />
      <FormationsOverviewSection />
      <ServicesSection />
      
      {/* Lazy loaded below-the-fold sections */}
      <Suspense fallback={<SectionSkeleton />}>
        <WhyChooseUsSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <FAQSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <AppointmentSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <CTASection />
      </Suspense>
    </Layout>
  );
};

export default Index;
