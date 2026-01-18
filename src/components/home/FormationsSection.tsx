import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const formations = [
  {
    emoji: "🚕",
    title: "TAXI",
    subtitle: "Formation TAXI Initiale",
    description: "Formation complète pour devenir chauffeur de taxi professionnel.",
    duration: "10 jours",
    level: "Tous niveaux",
    location: "Présentiel Montrouge",
    price: "Nous consulter",
    popular: true,
    color: "from-yellow-500 to-amber-500",
  },
  {
    emoji: "🚗",
    title: "VTC",
    subtitle: "Formation VTC Initiale",
    description: "Devenez chauffeur privé professionnel avec notre formation VTC.",
    duration: "10 jours",
    level: "Tous niveaux",
    location: "Présentiel Montrouge",
    price: "Nous consulter",
    popular: false,
    color: "from-blue-600 to-blue-500",
  },
  {
    emoji: "🏍️",
    title: "VMDTR",
    subtitle: "Formation Moto-Taxi",
    description: "Formation moto-taxi pour le transport rapide de passagers.",
    duration: "10 jours",
    level: "Tous niveaux",
    location: "Présentiel Montrouge",
    price: "À partir de 1 500 €",
    popular: false,
    color: "from-emerald-500 to-green-500",
  },
  {
    emoji: "🔄",
    title: "POINTS",
    subtitle: "Récupération de Points",
    description: "Stage de sensibilisation pour récupérer 4 points sur votre permis.",
    duration: "2 jours",
    level: "Tous",
    location: "Présentiel Montrouge",
    price: "Nous consulter",
    popular: false,
    color: "from-orange-500 to-orange-400",
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
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const FormationsSection = () => {
  return (
    <section className="section-padding section-light relative overflow-hidden">
      {/* Decorative elements */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.5, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.5, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute bottom-0 left-0 w-80 h-80 bg-orange-100 rounded-full blur-3xl"
      />

      <div className="container-custom relative">
        {/* Header */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={headerVariants}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 rounded-full px-4 py-2 text-sm font-semibold mb-6"
          >
            <Sparkles className="w-4 h-4" />
            Nos formations
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6">
            Choisissez Votre{" "}
            <span className="text-gradient-blue">Formation</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            4 formations principales pour démarrer votre carrière de chauffeur professionnel
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {formations.map((formation) => (
            <motion.div
              key={formation.title}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group card-premium relative p-6"
            >
              {/* Popular badge */}
              {formation.popular && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -top-3 left-1/2 -translate-x-1/2 z-10"
                >
                  <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-orange-500 to-orange-400 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg shadow-orange-500/30">
                    <span className="text-sm">⭐</span>
                    Populaire
                  </span>
                </motion.div>
              )}

              {/* Icon */}
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${formation.color} flex items-center justify-center mb-5 shadow-lg`}
              >
                <span className="text-3xl">{formation.emoji}</span>
              </motion.div>

              {/* Title */}
              <div className="mb-3">
                <span className={`text-sm font-bold bg-gradient-to-r ${formation.color} bg-clip-text text-transparent uppercase tracking-wider`}>
                  {formation.title}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mt-1 group-hover:text-blue-600 transition-colors duration-300">
                  {formation.subtitle}
                </h3>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-5 leading-relaxed">
                {formation.description}
              </p>

              {/* Features */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-green-500" />
                  {formation.duration} de formation
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-green-500" />
                  {formation.level}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-green-500" />
                  {formation.location}
                </div>
              </div>

              {/* Price */}
              <div className="border-t border-gray-100 pt-5 mb-5">
                <span className="text-xs text-gray-500 uppercase tracking-wider">À partir de</span>
                <div className="text-xl font-bold text-gray-900 mt-1">{formation.price}</div>
                <span className="text-xs text-orange-500 font-medium">Paiement 4x sans frais</span>
              </div>

              {/* CTA */}
              <Button 
                asChild 
                className="w-full bg-gray-900 hover:bg-blue-600 text-white rounded-xl py-5 font-semibold transition-all duration-300 group-hover:shadow-lg"
              >
                <Link to="/contact" className="flex items-center justify-center gap-2">
                  En savoir plus
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <Link
            to="/formations"
            className="inline-flex items-center gap-3 text-blue-600 font-semibold hover:text-blue-700 transition-colors group"
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
