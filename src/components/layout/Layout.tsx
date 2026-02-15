import React, { ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTopButton from "./ScrollToTopButton";


interface LayoutProps {
  children: ReactNode;
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.ecolet3p.fr/#organization",
  "name": "ECOLE T3P",
  "alternateName": ["ECOLE T3P Montrouge", "Formation Taxi VTC Sud Paris", "Centre Formation 92", "École de formation T3P"],
  "description": "Centre de formation Taxi, VTC et VMDTR à Montrouge (92). Accessible depuis Bagneux, Vanves, Malakoff, Châtillon, Clamart, Issy-les-Moulineaux et les arrondissements sud de Paris (13e, 14e, 15e). Taux de réussite 94%.",
  "url": "https://www.ecolet3p.fr",
  "logo": {
    "@type": "ImageObject",
    "url": "https://www.ecolet3p.fr/logo.png"
  },
  "image": "https://www.ecolet3p.fr/og-image.jpg",
  "telephone": "+33 1 88 75 05 55",
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
    "latitude": "48.8155",
    "longitude": "2.3137"
  },
  "areaServed": [
    { "@type": "City", "name": "Montrouge" },
    { "@type": "City", "name": "Bagneux" },
    { "@type": "City", "name": "Vanves" },
    { "@type": "City", "name": "Malakoff" },
    { "@type": "City", "name": "Châtillon" },
    { "@type": "City", "name": "Clamart" },
    { "@type": "City", "name": "Issy-les-Moulineaux" },
    { "@type": "City", "name": "Fontenay-aux-Roses" },
    { "@type": "City", "name": "Le Plessis-Robinson" },
    { "@type": "City", "name": "Sceaux" },
    { "@type": "City", "name": "Bourg-la-Reine" },
    { "@type": "City", "name": "Antony" },
    { "@type": "City", "name": "Meudon" },
    { "@type": "City", "name": "Boulogne-Billancourt" },
    { "@type": "City", "name": "Neuilly-sur-Seine" },
    { "@type": "City", "name": "Levallois-Perret" },
    { "@type": "City", "name": "Clichy" },
    { "@type": "City", "name": "Asnières-sur-Seine" },
    { "@type": "City", "name": "Courbevoie" },
    { "@type": "City", "name": "La Défense" },
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
  "priceRange": "€€",
  "currenciesAccepted": "EUR",
  "paymentAccepted": "Cash, Credit Card, Bank Transfer",
  "sameAs": [
    "https://www.facebook.com/dropacademymontrouge",
    "https://www.instagram.com/ecolet3p"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Formations professionnelles Taxi VTC Montrouge Hauts-de-Seine",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Course",
          "name": "Formation Taxi Montrouge",
          "description": "Formation complète de 63h pour obtenir la carte professionnelle Taxi. Accessible depuis Bagneux, Vanves, Malakoff et Paris 14e."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Course",
          "name": "Formation VTC Sud Paris",
          "description": "Formation complète pour obtenir la carte professionnelle VTC. Proche métro Mairie de Montrouge."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Course",
          "name": "Formation VMDTR Hauts-de-Seine",
          "description": "Formation moto-taxi pour obtenir la carte professionnelle VMDTR. Centre à Montrouge (92)."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Course",
          "name": "Formation Mobilité",
          "description": "Formation passerelle de 14h Taxi ↔ VTC"
        }
      }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "359",
    "bestRating": "5",
    "worstRating": "1"
  },
  "foundingDate": "2014",
  "publicAccess": true,
  "isAccessibleForFree": false,
  "keywords": "formation taxi Montrouge, formation VTC Bagneux, formation taxi Vanves, formation VTC Malakoff, formation taxi Châtillon, centre formation 92, sud Paris",
  "knowsAbout": [
    "Formation professionnelle Taxi",
    "Formation VTC",
    "Formation VMDTR moto-taxi",
    "Carte professionnelle T3P",
    "Examen Taxi VTC",
    "Récupération de points permis",
    "Formation continue obligatoire"
  ],
  "slogan": "94% de réussite aux examens Taxi et VTC",
  "numberOfEmployees": {
    "@type": "QuantitativeValue",
    "value": 2000,
    "unitText": "chauffeurs formés depuis 2014"
  },
  "hasCredential": {
    "@type": "EducationalOccupationalCredential",
    "credentialCategory": "Agrément Préfectoral",
    "name": "Agrément n° 23/007 — Préfecture des Hauts-de-Seine",
    "recognizedBy": {
      "@type": "GovernmentOrganization",
      "name": "Préfecture des Hauts-de-Seine"
    }
  }
};

// WebSite schema for AI search engines (Speakable, SearchAction)
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.ecolet3p.fr/#website",
  "name": "ECOLE T3P - Formation Taxi VTC VMDTR",
  "alternateName": "ECOLE T3P",
  "url": "https://www.ecolet3p.fr",
  "description": "Centre de formation professionnelle agréé pour les métiers du Transport Public Particulier de Personnes (T3P) : Taxi, VTC et VMDTR à Montrouge (92).",
  "inLanguage": "fr-FR",
  "publisher": {
    "@id": "https://www.ecolet3p.fr/#organization"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://www.ecolet3p.fr/formations/{search_term_string}"
    },
    "query-input": "required name=search_term_string"
  },
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": ["h1", "h2", ".section-title", ".hero-description"]
  }
};

// AI-optimized WebPage schema with mainEntity
const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://www.ecolet3p.fr/#webpage",
  "name": "Formation Taxi VTC Montrouge - ECOLE T3P",
  "url": "https://www.ecolet3p.fr",
  "description": "Centre de formation Taxi, VTC et VMDTR à Montrouge. Centre agréé Préfecture des Hauts-de-Seine.",
  "inLanguage": "fr-FR",
  "isPartOf": {
    "@id": "https://www.ecolet3p.fr/#website"
  },
  "about": {
    "@id": "https://www.ecolet3p.fr/#organization"
  },
  "mainEntity": {
    "@type": "EducationalOrganization",
    "@id": "https://www.ecolet3p.fr/#organization"
  },
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": ["h1", ".hero-description", ".section-title"]
  },
  "specialty": [
    "Formation Taxi professionnelle",
    "Formation VTC avec plateforme Uber Bolt",
    "Formation VMDTR moto-taxi",
    "Formation Mobilité passerelle Taxi VTC",
    "Récupération de points de permis"
  ]
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(websiteSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(webPageSchema)}
        </script>
      </Helmet>
      <Header />
      <main className="flex-1 pb-[60px] lg:pb-0">{children}</main>
      <Footer />
      
      <ScrollToTopButton />
    </div>
  );
};

export default Layout;