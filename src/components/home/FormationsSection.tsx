import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const formations = [
  {
    emoji: "🚕",
    title: "Formation TAXI Initiale",
    description: "Formation complète pour devenir chauffeur de taxi professionnel en Île-de-France.",
    duration: "10 jours de formation",
    level: "Tous niveaux",
    payment: "Paiement 4x sans frais",
    price: "Nous consulter",
    popular: true,
  },
  {
    emoji: "🚗",
    title: "Formation VTC Initiale",
    description: "Devenez chauffeur privé professionnel avec notre formation VTC complète.",
    duration: "10 jours de formation",
    level: "Tous niveaux",
    payment: "Paiement 4x sans frais",
    price: "Nous consulter",
    popular: false,
  },
  {
    emoji: "🏍️",
    title: "Formation VMDTR",
    description: "Formation moto-taxi pour le transport rapide de passagers en deux-roues.",
    duration: "10 jours de formation",
    level: "Tous niveaux",
    payment: "Paiement 4x sans frais",
    price: "À partir de 1 500 €",
    popular: false,
  },
  {
    emoji: "🔄",
    title: "Récupération de Points",
    description: "Stage de sensibilisation pour récupérer 4 points sur votre permis de conduire.",
    duration: "2 jours de stage",
    level: "Tous conducteurs",
    payment: "Paiement facilité",
    price: "Nous consulter",
    popular: false,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const
    }
  }
};

const FormationsSection = () => {
  return (
    <section className="section-padding section-white">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-warm-gray-900 mb-4">
            Nos Formations
          </h2>
          <p className="text-lg text-warm-gray-600 leading-relaxed">
            4 formations principales pour démarrer votre carrière dans le transport de personnes
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
        >
          {formations.map((formation) => (
            <motion.div
              key={formation.title}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="card-warm p-6 relative"
            >
              {/* Popular badge */}
              {formation.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-orange text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                    ⭐ Populaire
                  </span>
                </div>
              )}

              {/* Emoji Icon */}
              <div className="icon-container-lg mx-auto mb-5">
                <span className="text-4xl">{formation.emoji}</span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-warm-gray-900 text-center mb-3">
                {formation.title}
              </h3>

              {/* Description */}
              <p className="text-warm-gray-600 text-center text-sm mb-5 leading-relaxed">
                {formation.description}
              </p>

              {/* Features */}
              <div className="space-y-2 mb-5">
                <div className="flex items-center gap-2 text-sm text-warm-gray-600">
                  <span className="text-orange">•</span>
                  {formation.duration}
                </div>
                <div className="flex items-center gap-2 text-sm text-warm-gray-600">
                  <span className="text-orange">•</span>
                  {formation.level}
                </div>
                <div className="flex items-center gap-2 text-sm text-warm-gray-600">
                  <span className="text-orange">•</span>
                  {formation.payment}
                </div>
              </div>

              {/* Price */}
              <div className="border-t border-warm-gray-100 pt-4 mb-4">
                <p className="text-xs text-warm-gray-500 uppercase tracking-wide">Tarif</p>
                <p className="text-lg font-bold text-warm-gray-900">{formation.price}</p>
              </div>

              {/* CTA */}
              <Button
                asChild
                variant="outline"
                className="w-full border-2 border-warm-gray-200 hover:border-orange hover:bg-orange/5 text-warm-gray-900 font-semibold rounded-xl transition-all duration-250"
              >
                <Link to="/contact" className="flex items-center justify-center gap-2">
                  En savoir plus
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <Link
            to="/formations"
            className="inline-flex items-center gap-2 text-orange font-semibold hover:text-orange-dark transition-colors group"
          >
            <span>Voir toutes nos formations (10 au total)</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FormationsSection;
