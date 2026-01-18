import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Users, CreditCard } from "lucide-react";

const formations = [
  {
    emoji: "🚕",
    title: "Formation TAXI Initiale",
    description: "Formation complète pour devenir chauffeur de taxi professionnel en Île-de-France.",
    duration: "10 jours",
    level: "Tous niveaux",
    payment: "Paiement 4x sans frais",
    popular: true,
  },
  {
    emoji: "🚗",
    title: "Formation VTC Initiale",
    description: "Devenez chauffeur VTC et lancez votre activité de transport.",
    duration: "10 jours",
    level: "Tous niveaux",
    payment: "Paiement 4x sans frais",
    popular: true,
  },
  {
    emoji: "🏍️",
    title: "Formation VMDTR",
    description: "Formation spécialisée pour le transport en deux-roues motorisés.",
    duration: "7 jours",
    level: "Permis moto requis",
    payment: "Paiement 4x sans frais",
    popular: false,
  },
  {
    emoji: "📚",
    title: "Formation Continue",
    description: "Remise à niveau et perfectionnement pour les professionnels.",
    duration: "2 jours",
    level: "Professionnels",
    payment: "Éligible CPF",
    popular: false,
  },
];

const FormationsSection = () => {
  return (
    <section className="section-padding gradient-warm">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title mb-4">NOS FORMATIONS</h2>
          <p className="section-subtitle mx-auto">
            4 formations principales pour démarrer votre carrière dans le transport de personnes
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {formations.map((formation, i) => (
            <motion.div
              key={formation.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-livementor relative group"
            >
              {/* Popular Badge */}
              {formation.popular && (
                <div className="absolute -top-3 left-6 bg-gold text-forest px-4 py-1 rounded-full text-xs font-bold uppercase">
                  Populaire
                </div>
              )}

              <div className="flex flex-col h-full">
                {/* Emoji */}
                <div className="text-5xl mb-5">{formation.emoji}</div>

                {/* Title */}
                <h3 className="text-xl font-bold text-forest mb-3 group-hover:text-gold transition-colors">
                  {formation.title}
                </h3>

                {/* Description */}
                <p className="text-warm-gray-600 mb-6 flex-grow">
                  {formation.description}
                </p>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-sm text-warm-gray-600">
                    <Clock className="w-4 h-4 text-forest" />
                    <span>{formation.duration} de formation</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-warm-gray-600">
                    <Users className="w-4 h-4 text-forest" />
                    <span>{formation.level}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-warm-gray-600">
                    <CreditCard className="w-4 h-4 text-forest" />
                    <span>{formation.payment}</span>
                  </div>
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between pt-5 border-t border-border">
                  <div>
                    <span className="text-xs text-warm-gray-500 uppercase">Tarif</span>
                    <p className="font-bold text-forest">Nous consulter</p>
                  </div>
                  <Link
                    to="/contact"
                    className="flex items-center gap-2 text-forest font-semibold hover:text-gold transition-colors text-sm uppercase"
                  >
                    En savoir plus
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Link
            to="/formations"
            className="inline-flex items-center gap-2 text-forest font-semibold hover:text-gold transition-colors text-sm uppercase"
          >
            Voir toutes nos formations (10 au total)
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FormationsSection;
