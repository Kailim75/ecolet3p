import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import FormationsSection from "@/components/home/FormationsSection";
import AdvantagesSection from "@/components/home/AdvantagesSection";
import ProcessSection from "@/components/home/ProcessSection";
import LocalsSection from "@/components/home/LocalsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FAQSection from "@/components/home/FAQSection";
import AppointmentSection from "@/components/home/AppointmentSection";
import CTASection from "@/components/home/CTASection";

// Import critical images for preload
import formationSession from "@/assets/center/formation-session.jpg";

const Index = () => {
  return (
    <Layout>
      <Helmet>
        <title>T3P Campus - Formation Taxi VTC Montrouge | 96% de Réussite</title>
        <meta name="description" content="Centre de formation Taxi, VTC et VMDTR à Montrouge. Taux de réussite 96%, paiement en 4x sans frais, formateurs experts. Obtenez votre carte professionnelle !" />
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
        <meta property="og:description" content="Centre de formation leader avec 96% de réussite. Formations Taxi, VTC et VMDTR. Paiement en 4x sans frais." />
        <meta property="og:url" content="https://t3pcampus.fr/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="T3P Campus" />
        <meta property="og:locale" content="fr_FR" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="T3P Campus - Formation Taxi VTC Montrouge" />
        <meta name="twitter:description" content="Centre de formation avec 96% de réussite. Obtenez votre carte professionnelle Taxi ou VTC." />
        
        <meta name="robots" content="index, follow" />
        <meta name="author" content="T3P Campus" />
      </Helmet>
      
      <HeroSection />
      <FormationsSection />
      <AdvantagesSection />
      <ProcessSection />
      <LocalsSection />
      <TestimonialsSection />
      <FAQSection />
      <AppointmentSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
