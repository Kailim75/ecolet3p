import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import TrustBar from "@/components/home/TrustBar";

// Import critical images for preload
import formationSession from "@/assets/center/formation-session.jpg";

// Lazy load below-the-fold sections
const AlmaBanner = lazy(() => import("@/components/home/AlmaBanner"));
const OffersSection = lazy(() => import("@/components/home/OffersSection"));
const BeforeAfterSection = lazy(() => import("@/components/home/BeforeAfterSection"));
const WhyChooseUsSection = lazy(() => import("@/components/home/WhyChooseUsSection"));
const GuaranteeSection = lazy(() => import("@/components/home/GuaranteeSection"));
const FAQSection = lazy(() => import("@/components/home/FAQSection"));


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
  "@type": "EducationalOrganization",
  "name": "ÉCOLE T3P",
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
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 48.8184,
    "longitude": 2.3196
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
    "bestRating": "5",
    "worstRating": "1",
    "ratingCount": "359",
    "reviewCount": "359"
  },
  "sameAs": [
    "https://www.google.com/maps/place/ECOLE+T3P"
  ],
  "areaServed": {
    "@type": "City",
    "name": "Montrouge"
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
        "text": "La carte professionnelle T3P est un document obligatoire pour exercer le métier de chauffeur de taxi, VTC ou VMDTR. Elle est délivrée par la préfecture après réussite de l'examen organisé par la Chambre des Métiers et de l'Artisanat."
      }
    },
    {
      "@type": "Question",
      "name": "Combien de temps dure la formation ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La formation initiale dure 63 heures pour les formations Taxi et VTC, et 33 heures pour la formation VMDTR (moto-taxi). Plusieurs formats sont disponibles : journée, soirée ou e-learning."
      }
    },
    {
      "@type": "Question",
      "name": "Quelles sont les options de financement disponibles ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ÉCOLE T3P propose le paiement en 4 fois sans frais via Alma, soit 247,50€ par mensualité pour la formation à 990€. Aucun justificatif n'est nécessaire et la mise en place se fait à l'inscription."
      }
    },
    {
      "@type": "Question",
      "name": "Quel est le taux de réussite de vos formations ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Notre taux de réussite est de 94%, significativement supérieur à la moyenne nationale. Nous proposons également une garantie de réaccompagnement pour les candidats assidus qui n'obtiendraient pas l'examen du premier coup."
      }
    },
    {
      "@type": "Question",
      "name": "Proposez-vous un accompagnement après la formation ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, nous accompagnons nos élèves après la formation pour les démarches administratives, la demande de carte professionnelle en préfecture et les conseils pour la création d'entreprise."
      }
    }
  ]
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "ECOLE T3P",
  "alternateName": "École T3P",
  "url": "https://www.ecolet3p.fr"
};

const Index = () => {
  return (
    <Layout>
      <Helmet>
        <title>ÉCOLE T3P — Formation Taxi VTC VMDTR à Montrouge (92) | 94% de réussite | 990€ en 4×</title>
        <meta name="description" content="Centre de formation agréé Taxi, VTC et VMDTR à Montrouge. 94% de réussite, +2000 formés, paiement en 4× sans frais via Alma. Prochaine session : mars 2026." />
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
        <meta name="geo.placename" content="Montrouge" />
        <meta name="geo.position" content="48.8155;2.3137" />
        <meta name="ICBM" content="48.8155, 2.3137" />
        
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
      </Helmet>
      
      {/* 1. Hero + Trust Bar */}
      <HeroSection />
      <TrustBar />
      
      {/* 2. Alma Banner */}
      <Suspense fallback={<SectionSkeleton />}>
        <AlmaBanner />
      </Suspense>
      
      {/* 3. Offre (Formule Complète + complémentaires) */}
      <Suspense fallback={<SectionSkeleton />}>
        <OffersSection />
      </Suspense>
      
      {/* 4. Témoignages Avant/Après (preuve sociale — remonté) */}
      <Suspense fallback={<SectionSkeleton />}>
        <BeforeAfterSection />
      </Suspense>
      
      {/* 5. Pourquoi nous choisir (4 différenciateurs) */}
      <Suspense fallback={<SectionSkeleton />}>
        <WhyChooseUsSection />
      </Suspense>
      
      {/* 6. Garantie Réussite (bloc visuel vert foncé) */}
      <Suspense fallback={<SectionSkeleton />}>
        <GuaranteeSection />
      </Suspense>
      
      {/* 7. FAQ (5 questions stratégiques) */}
      <Suspense fallback={<SectionSkeleton />}>
        <FAQSection />
      </Suspense>
      
    </Layout>
  );
};

export default Index;
