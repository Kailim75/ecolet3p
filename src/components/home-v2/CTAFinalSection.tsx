import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import PlacesProgressBar from "@/components/home/PlacesProgressBar";

const CTAFinalSection = () => {
  return (
    <section className="py-10 md:py-20 bg-primary">
      <div className="container-custom text-center px-5">
        <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-white mb-2 md:mb-4">
          Prêt à lancer votre carrière ?
        </h2>
        <p className="text-white/75 text-sm md:text-lg mb-5 md:mb-8 max-w-xl mx-auto">
          Inscription ouverte toute l'année. Rejoignez +2 000 chauffeurs formés avec succès.
        </p>

        {/* Animated places counter */}
        <div className="max-w-sm md:max-w-md mx-auto mb-5 md:mb-8">
          <PlacesProgressBar />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
          <Link
            to="/contact"
            className="btn-cta-orange w-full sm:w-auto px-6 md:px-8 py-3.5 md:py-4 text-sm md:text-base font-bold rounded-lg inline-flex items-center justify-center gap-2"
          >
            Je m'inscris maintenant
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
          </Link>
          <a
            href="tel:0188750555"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm md:text-base font-semibold transition-colors py-2"
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
