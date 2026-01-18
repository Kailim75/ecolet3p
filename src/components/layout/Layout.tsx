import { ReactNode } from "react";
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
  "description": "Centre de formation leader spécialisé dans les certifications de chauffeurs professionnels (TAXI, VTC, VMDTR). Taux de réussite 96%, 10 ans d'expertise.",
  "url": "https://t3pcampus.fr",
  "logo": {
    "@type": "ImageObject",
    "url": "https://t3pcampus.fr/logo.png"
  },
  "image": "https://t3pcampus.fr/og-image.jpg",
  "telephone": "+33 1 XX XX XX XX",
  "email": "contact@t3pcampus.fr",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Adresse du centre",
    "addressLocality": "Montrouge",
    "postalCode": "92120",
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
      "opens": "09:00",
      "closes": "18:00"
    }
  ],
  "priceRange": "€€",
  "currenciesAccepted": "EUR",
  "paymentAccepted": "Cash, Credit Card, Bank Transfer",
  "areaServed": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": "48.8186",
      "longitude": "2.3196"
    },
    "geoRadius": "50000"
  },
  "sameAs": [
    "https://www.facebook.com/t3pcampus",
    "https://www.instagram.com/t3pcampus",
    "https://www.linkedin.com/company/t3pcampus"
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
          "description": "Formation complète pour obtenir la carte professionnelle Taxi"
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
          "name": "Formation Mobilité",
          "description": "Formation passerelle Taxi ↔ VTC"
        }
      }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "250",
    "bestRating": "5",
    "worstRating": "1"
  }
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
