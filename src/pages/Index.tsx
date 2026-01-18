import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import FormationsSection from "@/components/home/FormationsSection";

// Import critical images for preload
import formationSession from "@/assets/center/formation-session.jpg";

// Lazy load below-the-fold sections
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

const Index = () => {
  return (
    <Layout>
      <Helmet>
        <title>T3P Campus - Formation Taxi VTC Montrouge | 94% de Réussite</title>
        <meta name="description" content="Centre de formation Taxi, VTC et VMDTR à Montrouge. Taux de réussite 94%, paiement en 4x sans frais, formateurs experts. Obtenez votre carte professionnelle !" />
        <meta name="keywords" content="formation taxi, formation VTC, centre formation Montrouge, carte professionnelle taxi, carte VTC, T3P Campus, formation chauffeur" />
        <link rel="canonical" href="https://t3pcampus.fr/" />
        
        {/* Preload critical hero image */}
        <link 
          rel="preload" 
          as="image" 
          href={formationSession}
          type="image/jpeg"
        />
        
        <meta property="og:title" content="T3P Campus - Formation Taxi VTC à Montrouge" />
        <meta property="og:description" content="Centre de formation avec 94% de réussite. Formations Taxi, VTC et VMDTR. Paiement en 4x sans frais." />
        <meta property="og:url" content="https://t3pcampus.fr/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="T3P Campus" />
        <meta property="og:locale" content="fr_FR" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="T3P Campus - Formation Taxi VTC Montrouge" />
        <meta name="twitter:description" content="Centre de formation avec 94% de réussite. Obtenez votre carte professionnelle Taxi ou VTC." />
        
        <meta name="robots" content="index, follow" />
        <meta name="author" content="T3P Campus" />
      </Helmet>
      
      {/* Critical above-the-fold content */}
      <HeroSection />
      <FormationsSection />
      
      {/* Lazy loaded below-the-fold sections */}
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
