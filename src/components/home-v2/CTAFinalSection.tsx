import { Link } from "react-router-dom";
import { ArrowRight, Phone, GraduationCap } from "lucide-react";
import PlacesProgressBar from "@/components/home/PlacesProgressBar";

const CTAFinalSection = () => {
  return (
    <section className="py-12 md:py-20 bg-primary relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }} />

      <div className="container-custom text-center px-5 relative z-10">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 mb-4 md:mb-5">
          <GraduationCap className="w-6 h-6 md:w-7 md:h-7 text-white" />
        </div>

        <h2 className="text-[22px] md:text-3xl lg:text-4xl font-bold text-white mb-2 md:mb-3 leading-tight">
          Prêt à lancer votre carrière ?
        </h2>
        <p className="text-white/70 text-[13px] md:text-lg mb-6 md:mb-8 max-w-lg mx-auto leading-relaxed">
          Inscription ouverte toute l'année. Rejoignez +2 000 chauffeurs formés avec succès.
        </p>

        {/* Places counter with better contrast */}
        <div className="max-w-xs sm:max-w-sm md:max-w-md mx-auto mb-6 md:mb-8">
          <PlacesProgressBar className="!bg-white/10 !border-white/15 [&_span]:!text-white/90 [&_p]:!text-white/50" />
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-3 md:gap-4 max-w-sm mx-auto sm:max-w-none sm:flex-row sm:items-center sm:justify-center">
          <Link
            to="/contact"
            className="btn-cta-orange w-full sm:w-auto px-7 md:px-8 py-3.5 md:py-4 text-[15px] md:text-base font-bold rounded-xl inline-flex items-center justify-center gap-2 shadow-lg shadow-accent/30"
          >
            Je m'inscris maintenant
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
          </Link>
          <a
            href="tel:0188750555"
            className="inline-flex items-center justify-center gap-2 text-white/75 hover:text-white text-[13px] md:text-base font-semibold transition-colors py-2.5 rounded-xl border border-white/15 sm:border-0 sm:py-2"
          >
            <Phone className="w-4 h-4 md:w-5 md:h-5" />
            Ou appelez le 01 88 75 05 55
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTAFinalSection;
