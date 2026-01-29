import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import OffersSection from "@/components/home/OffersSection";

// Import critical images for preload
import formationSession from "@/assets/center/formation-session.jpg";

// Lazy load below-the-fold sections
const WhyChooseUsSection = lazy(() => import("@/components/home/WhyChooseUsSection"));
const AdvantagesSection = lazy(() => import("@/components/home/AdvantagesSection"));
const ProcessSection = lazy(() => import("@/components/home/ProcessSection"));
const LocalsSection = lazy(() => import("@/components/home/LocalsSection"));
const GoogleReviewsSection = lazy(() => import("@/components/home/GoogleReviewsSection"));
const TestimonialsSection = lazy(() => import("@/components/home/TestimonialsSection"));
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
  "alternateName": "ECOLE T3P Montrouge",
  "url": "https://ecolet3p.fr",
  "logo": "https://ecolet3p.fr/logo/ecole-t3p-favicon.svg",
  "image": "https://ecolet3p.fr/og-image.jpg",
  "description": "École de formation professionnelle pour chauffeurs Taxi, VTC et VMDTR à Montrouge. Taux de réussite 94%, formateurs experts du métier.",
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
    "name": "Formations ECOLE T3P",
    "itemListElement": [
      {
        "@type": "Course",
        "name": "Formation Taxi Initiale",
        "description": "Formation complète pour obtenir votre carte professionnelle Taxi",
        "provider": { "@type": "Organization", "name": "ECOLE T3P" }
      },
      {
        "@type": "Course",
        "name": "Formation VTC",
        "description": "Formation pour devenir chauffeur VTC professionnel",
        "provider": { "@type": "Organization", "name": "ECOLE T3P" }
      },
      {
        "@type": "Course",
        "name": "Formation VMDTR",
        "description": "Formation moto-taxi pour obtenir votre certification",
        "provider": { "@type": "Organization", "name": "ECOLE T3P" }
      }
    ]
  }
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://ecolet3p.fr/#localbusiness",
  "name": "ECOLE T3P - Formation Taxi VTC Montrouge",
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
  "priceRange": "€€",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "359"
  }
};

const Index = () => {
  return (
    <Layout>
      <Helmet>
        <title>ECOLE T3P - Formation Taxi, VTC & VMDTR | 94% Réussite Montrouge Paris</title>
        <meta name="description" content="Devenez chauffeur professionnel avec ECOLE T3P à Montrouge. Formation Taxi, VTC et VMDTR agréée. 94% de réussite, paiement 4x sans frais. Obtenez votre devis gratuit en 2 min !" />
        <meta name="keywords" content="formation taxi Paris, formation VTC Paris, formation VMDTR, taxi moto, récupération de points permis, centre formation Montrouge, carte professionnelle taxi, carte VTC, ECOLE T3P, reconversion professionnelle chauffeur" />
        <link rel="canonical" href="https://ecolet3p.fr/" />
        
        {/* Preload critical hero image */}
        <link 
          rel="preload" 
          as="image" 
          href={formationSession}
          type="image/jpeg"
        />
        
        <meta property="og:title" content="ECOLE T3P - Formation Taxi, VTC & VMDTR | 94% Réussite à Montrouge" />
        <meta property="og:description" content="Devenez chauffeur professionnel avec une formation agréée. 94% de réussite, paiement en 4x sans frais. Devis gratuit !" />
        <meta property="og:url" content="https://ecolet3p.fr/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="ECOLE T3P" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:image" content="https://ecolet3p.fr/og-image.jpg" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ECOLE T3P - Formation Taxi, VTC & VMDTR Montrouge" />
        <meta name="twitter:description" content="Devenez Taxi, VTC ou VMDTR (taxi moto). 94% de réussite aux examens." />
        <meta name="twitter:image" content="https://ecolet3p.fr/og-image.jpg" />
        
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="author" content="ECOLE T3P" />
        <meta name="geo.region" content="FR-92" />
        <meta name="geo.placename" content="Montrouge" />
        
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      </Helmet>
      
      {/* Critical above-the-fold content */}
      <HeroSection />
      <OffersSection />
      
      {/* Lazy loaded below-the-fold sections */}
      <Suspense fallback={<SectionSkeleton />}>
        <WhyChooseUsSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <AdvantagesSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <ProcessSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <LocalsSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <GoogleReviewsSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <TestimonialsSection />
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
