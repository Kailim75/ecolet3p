import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import FormationsChoiceSection from "@/components/home/FormationsChoiceSection";

// Lazy load below-the-fold sections
const LocalsSection = lazy(() => import("@/components/home/LocalsSection"));
const FAQSection = lazy(() => import("@/components/home/FAQSection"));
const AppointmentSection = lazy(() => import("@/components/home/AppointmentSection"));

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
  "alternateName": "ECOLE T3P Montrouge",
  "url": "https://ecolet3p.fr",
  "logo": "https://ecolet3p.fr/logo/ecole-t3p-favicon.svg",
  "image": "https://ecolet3p.fr/og-image.jpg",
  "description": "Centre de formation agréé pour chauffeurs Taxi, VTC et VMDTR. Formation continue obligatoire pour le renouvellement de la carte professionnelle.",
  "telephone": "+33188750555",
  "email": "montrouge@ecolet3p.fr",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "3 rue Corneille",
    "addressLocality": "Montrouge",
    "postalCode": "92120",
    "addressCountry": "FR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 48.8155,
    "longitude": 2.3137
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:30",
      "closes": "18:00"
    }
  ],
  "sameAs": [
    "https://www.google.com/maps/place/ECOLE+T3P"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Formations ECOLE T3P",
    "itemListElement": [
      {
        "@type": "Course",
        "name": "Formation Continue TAXI",
        "description": "Formation continue obligatoire pour le renouvellement de la carte professionnelle TAXI",
        "provider": { "@type": "Organization", "name": "ECOLE T3P" }
      },
      {
        "@type": "Course",
        "name": "Formation Continue VTC",
        "description": "Formation continue obligatoire pour le renouvellement de la carte professionnelle VTC",
        "provider": { "@type": "Organization", "name": "ECOLE T3P" }
      },
      {
        "@type": "Course",
        "name": "Formation Continue VMDTR",
        "description": "Formation continue obligatoire pour le renouvellement de la carte professionnelle VMDTR",
        "provider": { "@type": "Organization", "name": "ECOLE T3P" }
      }
    ]
  }
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://ecolet3p.fr/#localbusiness",
  "name": "ECOLE T3P - Centre de formation agréé",
  "image": "https://ecolet3p.fr/og-image.jpg",
  "telephone": "+33188750555",
  "email": "montrouge@ecolet3p.fr",
  "url": "https://ecolet3p.fr",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "3 rue Corneille",
    "addressLocality": "Montrouge",
    "postalCode": "92120",
    "addressCountry": "FR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 48.8155,
    "longitude": 2.3137
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:30",
      "closes": "18:00"
    }
  ],
  "priceRange": "€€"
};

const Index = () => {
  return (
    <Layout>
      <Helmet>
        <title>ECOLE T3P - Formation Continue Obligatoire | Taxi, VTC, VMDTR</title>
        <meta name="description" content="Centre de formation agréé pour chauffeurs TAXI, VTC et VMDTR. Formation continue obligatoire pour le renouvellement de la carte professionnelle. Conformément à la réglementation en vigueur." />
        <meta name="keywords" content="formation continue taxi, formation continue VTC, formation continue VMDTR, renouvellement carte professionnelle, centre formation agréé, ECOLE T3P, Montrouge" />
        <link rel="canonical" href="https://ecolet3p.fr/" />
        
        <meta property="og:title" content="ECOLE T3P - Formation Continue Obligatoire | Taxi, VTC, VMDTR" />
        <meta property="og:description" content="Centre de formation agréé. Formation continue obligatoire pour le renouvellement de la carte professionnelle." />
        <meta property="og:url" content="https://ecolet3p.fr/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="ECOLE T3P" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:image" content="https://ecolet3p.fr/og-image.jpg" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ECOLE T3P - Formation Continue Obligatoire" />
        <meta name="twitter:description" content="Centre de formation agréé pour chauffeurs TAXI, VTC et VMDTR." />
        <meta name="twitter:image" content="https://ecolet3p.fr/og-image.jpg" />
        
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="author" content="ECOLE T3P" />
        <meta name="geo.region" content="FR-92" />
        <meta name="geo.placename" content="Montrouge" />
        
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      </Helmet>
      
      {/* Above-the-fold: Institutional Hero + Formation Choice */}
      <HeroSection />
      <FormationsChoiceSection />
      
      {/* Below-the-fold: Simplified sections */}
      <Suspense fallback={<SectionSkeleton />}>
        <LocalsSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <FAQSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <AppointmentSection />
      </Suspense>
    </Layout>
  );
};

export default Index;
