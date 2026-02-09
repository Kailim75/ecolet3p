import React, { ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import Header from "./Header";
import Footer from "./Footer";
import FloatingAppointmentButton from "./FloatingAppointmentButton";
import FloatingWhatsAppButton from "./FloatingWhatsAppButton";


interface LayoutProps {
  children: ReactNode;
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://ecolet3p.fr/#organization",
  "name": "ECOLE T3P",
  "alternateName": ["ECOLE T3P Montrouge", "Formation Taxi VTC Sud Paris", "Centre Formation 92"],
  "description": "Centre de formation Taxi, VTC et VMDTR à Montrouge (92). Accessible depuis Bagneux, Vanves, Malakoff, Châtillon, Clamart, Issy-les-Moulineaux et les arrondissements sud de Paris (13e, 14e, 15e). Taux de réussite 94%.",
  "url": "https://ecolet3p.fr",
  "logo": {
    "@type": "ImageObject",
    "url": "https://ecolet3p.fr/logo.png"
  },
  "image": "https://ecolet3p.fr/og-image.jpg",
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
  "keywords": "formation taxi Montrouge, formation VTC Bagneux, formation taxi Vanves, formation VTC Malakoff, formation taxi Châtillon, centre formation 92, sud Paris"
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
      </Helmet>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingAppointmentButton />
      <FloatingWhatsAppButton />
      
    </div>
  );
};

export default Layout;
