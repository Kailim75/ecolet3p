import React, { ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import Header from "./Header";
import Footer from "./Footer";
import FloatingAppointmentButton from "./FloatingAppointmentButton";

interface LayoutProps {
  children: ReactNode;
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://t3pcampus.fr/#organization",
  "name": "T3P Campus",
  "alternateName": "T3P Campus - Centre de Formation Taxi VTC",
  "description": "Centre de formation spécialisé dans les formations de chauffeurs professionnels (TAXI, VTC, VMDTR). Taux de réussite 94%, 10 ans d'expertise.",
  "url": "https://t3pcampus.fr",
  "logo": {
    "@type": "ImageObject",
    "url": "https://t3pcampus.fr/logo.png"
  },
  "image": "https://t3pcampus.fr/og-image.jpg",
  "telephone": "+33 1 88 75 05 55",
  "email": "montrouge@t3pcampus.fr",
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
    "latitude": "48.8186",
    "longitude": "2.3196"
  },
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
  "paymentAccepted": "Cash, Credit Card, Bank Transfer, 4x Payment",
  "areaServed": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": "48.8566",
      "longitude": "2.3522"
    },
    "geoRadius": "50000"
  },
  "sameAs": [
    "https://www.facebook.com/dropacademymontrouge",
    "https://www.instagram.com/t3pcampus"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Formations professionnelles",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Course",
          "name": "Formation Taxi",
          "description": "Formation complète de 63h pour obtenir la carte professionnelle Taxi"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Course",
          "name": "Formation VTC",
          "description": "Formation complète pour obtenir la carte professionnelle VTC"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Course",
          "name": "Formation VMDTR",
          "description": "Formation moto-taxi pour obtenir la carte professionnelle VMDTR"
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
  "isAccessibleForFree": false
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
    </div>
  );
};

export default Layout;
