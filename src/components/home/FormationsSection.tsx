import { Link } from "react-router-dom";
import { motion, type Easing } from "framer-motion";
import { ArrowRight, Clock, Users, CreditCard } from "lucide-react";

const smoothEase: Easing = [0.22, 1, 0.36, 1];

const formations = [
  { emoji: "🚕", title: "Formation TAXI Initiale", description: "Formation complète pour devenir chauffeur de taxi.", duration: "10 jours", level: "Tous niveaux", payment: "Paiement 4x sans frais", popular: true },
  { emoji: "🚗", title: "Formation VTC Initiale", description: "Devenez chauffeur VTC et lancez votre activité.", duration: "10 jours", level: "Tous niveaux", payment: "Paiement 4x sans frais", popular: true },
  { emoji: "🏍️", title: "Formation VMDTR", description: "Formation spécialisée pour le transport en deux-roues.", duration: "7 jours", level: "Permis moto requis", payment: "Paiement 4x sans frais", popular: false },
  { emoji: "📚", title: "Formation Continue", description: "Remise à niveau pour les professionnels.", duration: "2 jours", level: "Professionnels", payment: "Éligible CPF", popular: false },
];

const staggerContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};

const staggerItemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: smoothEase } }
};

const FormationsSection = () => {
  return (
    <section className="section-padding gradient-warm overflow-hidden">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: smoothEase }}
          className="text-center mb-16"
        >
          <h2 className="section-title mb-4">NOS FORMATIONS</h2>
          <p className="section-subtitle mx-auto">4 formations principales pour démarrer votre carrière</p>
        </motion.div>

        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        >
          {formations.map((formation, i) => (
            <motion.div
              key={formation.title}
              variants={staggerItemVariants}
              whileHover={{ y: -8, boxShadow: "0 25px 50px rgba(27, 77, 62, 0.15)" }}
              className="card-livementor relative group cursor-pointer"
            >
              {formation.popular && (
                <motion.div 
                  className="absolute -top-3 left-6 bg-gold text-forest px-4 py-1 rounded-full text-xs font-bold uppercase"
                  initial={{ opacity: 0, y: -10, scale: 0.8 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
                >
                  Populaire
                </motion.div>
              )}

              <motion.div 
                className="text-5xl mb-5"
                whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.4 }}
              >
                {formation.emoji}
              </motion.div>

              <h3 className="text-xl font-bold text-forest mb-3 group-hover:text-gold transition-colors">
                {formation.title}
              </h3>
              <p className="text-warm-gray-600 mb-6">{formation.description}</p>

              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-warm-gray-600">
                  <Clock className="w-4 h-4 text-forest" />{formation.duration}
                </div>
                <div className="flex items-center gap-2 text-sm text-warm-gray-600">
                  <Users className="w-4 h-4 text-forest" />{formation.level}
                </div>
                <div className="flex items-center gap-2 text-sm text-warm-gray-600">
                  <CreditCard className="w-4 h-4 text-forest" />{formation.payment}
                </div>
              </div>

              <div className="flex items-center justify-between pt-5 border-t border-border">
                <div>
                  <span className="text-xs text-warm-gray-500 uppercase">Tarif</span>
                  <p className="font-bold text-forest">Nous consulter</p>
                </div>
                <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                  <Link to="/contact" className="flex items-center gap-2 text-forest font-semibold hover:text-gold text-sm uppercase">
                    En savoir plus<ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <motion.div whileHover={{ x: 10 }} className="inline-block">
            <Link to="/formations" className="inline-flex items-center gap-2 text-forest font-semibold hover:text-gold text-sm uppercase">
              Voir toutes nos formations<ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FormationsSection;
