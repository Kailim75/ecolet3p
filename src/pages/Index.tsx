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

const Index = () => {
  return (
    <Layout>
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
