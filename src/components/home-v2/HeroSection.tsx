import { Link } from "react-router-dom";
import { ArrowRight, Eye } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen lg:min-h-[70vh] flex items-center bg-primary pt-20 lg:pt-16">
      {/* Overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-forest-dark/95" />
      
      <div className="container-custom relative z-10 py-12 lg:py-20">
        <div className="max-w-3xl">
          <h1 className="text-[28px] md:text-[40px] lg:text-[52px] font-bold text-white leading-tight mb-6">
            Devenez chauffeur professionnel à 990€ tout compris.
          </h1>
          <p className="text-white/80 text-base md:text-lg lg:text-xl mb-8 max-w-2xl leading-relaxed">
            Formation VTC, Taxi ou VMDTR. 3 formats au choix : Journée, Soir ou E-learning. 
            Accompagnement de A à Z.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/contact"
              className="btn-cta-orange px-8 py-4 text-base font-bold rounded-lg inline-flex items-center justify-center gap-2"
            >
              Je m'inscris
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="#formations"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border-2 border-white text-white font-bold text-base hover:bg-white hover:text-primary transition-all duration-300"
            >
              <Eye className="w-5 h-5" />
              Voir les formations
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
