import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, type Easing } from "framer-motion";
import { ArrowRight, Clock, Users, CreditCard } from "lucide-react";
import { useRef } from "react";

const smoothEase: Easing = [0.22, 1, 0.36, 1];

const formations = [
  { emoji: "🚕", title: "Formation TAXI Initiale", description: "Formation complète pour devenir chauffeur de taxi.", duration: "10 jours", level: "Tous niveaux", payment: "Paiement 4x sans frais", popular: true },
  { emoji: "🚗", title: "Formation VTC Initiale", description: "Devenez chauffeur VTC et lancez votre activité.", duration: "10 jours", level: "Tous niveaux", payment: "Paiement 4x sans frais", popular: true },
  { emoji: "🏍️", title: "Formation VMDTR", description: "Formation spécialisée pour le transport en deux-roues.", duration: "7 jours", level: "Permis moto requis", payment: "Paiement 4x sans frais", popular: false },
  { emoji: "📚", title: "Formation Continue", description: "Remise à niveau pour les professionnels.", duration: "2 jours", level: "Professionnels", payment: "Paiement 4x sans frais", popular: false },
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
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const y3 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <section ref={containerRef} className="section-padding gradient-warm overflow-hidden relative">
      {/* Parallax Background Elements */}
      <motion.div 
        style={{ y: y1, scale }}
        className="absolute -top-32 left-1/4 w-80 h-80 bg-gold/10 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div 
        style={{ y: y2 }}
        className="absolute top-1/3 -right-20 w-64 h-64 bg-forest/5 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div 
        style={{ y: y3 }}
        className="absolute -bottom-20 left-10 w-48 h-48 bg-gold/15 rounded-full blur-2xl pointer-events-none"
      />

      <div className="container-custom relative z-10">
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
              whileHover={{ 
                y: -12, 
                boxShadow: "0 30px 60px rgba(27, 77, 62, 0.18)",
                borderColor: "rgba(212, 168, 83, 0.6)"
              }}
              whileTap={{ scale: 0.98, y: -6 }}
              className="card-livementor relative group cursor-pointer"
            >
              {formation.popular && (
                <div className="absolute -top-3 left-6 bg-gold text-forest px-4 py-1 rounded-full text-xs font-bold uppercase">
                  Populaire
                </div>
              )}

              <div className="text-5xl mb-5">
                {formation.emoji}
              </div>

              <motion.h3 
                className="text-xl font-bold text-forest mb-3 group-hover:text-gold transition-colors duration-300"
              >
                {formation.title}
              </motion.h3>
              <p className="text-warm-gray-600 mb-6">{formation.description}</p>

              <div className="space-y-2 mb-6">
                {[
                  { Icon: Clock, text: formation.duration },
                  { Icon: Users, text: formation.level },
                  { Icon: CreditCard, text: formation.payment }
                ].map(({ Icon, text }, idx) => (
                  <motion.div 
                    key={idx}
                    className="flex items-center gap-2 text-sm text-warm-gray-600"
                    whileHover={{ x: 5, color: "#1B4D3E" }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Icon className="w-4 h-4 text-forest" />{text}
                  </motion.div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-5 border-t border-border">
                <div>
                  <span className="text-xs text-warm-gray-500 uppercase">Tarif</span>
                  <p className="font-bold text-forest">Nous consulter</p>
                </div>
                <motion.div 
                  whileHover={{ x: 8, scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Link to="/contact" className="flex items-center gap-2 text-forest font-semibold hover:text-gold text-sm uppercase link-underline">
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
          <motion.div 
            whileHover={{ x: 10, scale: 1.02 }} 
            whileTap={{ scale: 0.98 }}
            className="inline-block"
          >
            <Link to="/formations" className="inline-flex items-center gap-2 text-forest font-semibold hover:text-gold text-sm uppercase link-underline">
              Voir toutes nos formations<ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FormationsSection;
