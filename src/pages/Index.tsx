import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home-v2/HeroSection";
import ReassuranceBar from "@/components/home-v2/ReassuranceBar";
import FormationsCards from "@/components/home-v2/FormationsCards";
import FormatsTable from "@/components/home-v2/FormatsTable";
import UpcomingSessionsSection from "@/components/home-v2/UpcomingSessionsSection";
import EcosystemSection from "@/components/home-v2/EcosystemSection";
import TestimonialsSection from "@/components/home-v2/TestimonialsSection";
import NoCPFSection from "@/components/home-v2/NoCPFSection";
import CTAFinalSection from "@/components/home-v2/CTAFinalSection";
import AuditRentabiliteModule from "@/components/home-v2/AuditRentabiliteModule";
import MobileQuickBar from "@/components/home-v2/MobileQuickBar";

// Organization + FAQ schemas are in index.html (static, no duplication)

const Index = () => {
  return (
    <Layout>
      <Helmet>
        <title>ECOLE T3P — Formation Taxi VTC VMDTR Montrouge | 990€</title>
        <meta name="description" content="Centre de formation agréé Taxi, VTC et VMDTR à Montrouge (92). 94% de réussite, +2000 formés, paiement en 4x sans frais. Inscription ouverte." />
        <link rel="canonical" href="https://www.ecolet3p.fr/" />
        <meta property="og:title" content="ECOLE T3P — Formation Taxi VTC VMDTR à Montrouge" />
        <meta property="og:description" content="Devenez chauffeur professionnel à 990€ tout compris. 94% de réussite. 3 formats au choix." />
        <meta property="og:url" content="https://www.ecolet3p.fr/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.ecolet3p.fr/og-image.jpg" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <MobileQuickBar />
      <HeroSection />
      <ReassuranceBar />
      <AuditRentabiliteModule />
      <FormationsCards />
      <FormatsTable />
      <UpcomingSessionsSection />
      <EcosystemSection />
      <TestimonialsSection />
      <NoCPFSection />
      <CTAFinalSection />
    </Layout>
  );
};

export default Index;
