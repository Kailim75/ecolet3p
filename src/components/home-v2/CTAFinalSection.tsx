import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";

const CTAFinalSection = () => {
  return (
    <section className="py-16 md:py-24 bg-primary">
      <div className="container-custom text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
          Prêt à lancer votre carrière ?
        </h2>
        <p className="text-white/75 text-base md:text-lg mb-8 max-w-xl mx-auto">
          Inscription ouverte toute l'année. Rejoignez +2 000 chauffeurs formés avec succès.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/contact"
            className="btn-cta-orange px-8 py-4 text-base font-bold rounded-lg inline-flex items-center gap-2"
          >
            Je m'inscris maintenant
            <ArrowRight className="w-5 h-5" />
          </Link>
          <a
            href="tel:0188750555"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white font-semibold transition-colors"
          >
            <Phone className="w-5 h-5" />
            Ou appelez le 01 88 75 05 55
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTAFinalSection;
