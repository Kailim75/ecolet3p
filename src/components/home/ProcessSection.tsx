import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, type Easing } from "framer-motion";

const smoothEase: Easing = [0.22, 1, 0.36, 1];

const steps = [
  { number: "1", emoji: "✍️", title: "Inscription", description: "Prenez rendez-vous. Nous étudions ensemble votre projet." },
  { number: "2", emoji: "📚", title: "Formation", description: "Suivez votre formation avec nos formateurs experts." },
  { number: "3", emoji: "🎯", title: "Examen", description: "Passez votre examen avec confiance." },
  { number: "4", emoji: "🏆", title: "Carte Pro", description: "Obtenez votre carte et démarrez votre carrière." },
];

const staggerContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
};

const staggerItemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: smoothEase } }
};

const ProcessSection = () => {
  return (
    <section className="section-padding bg-card overflow-hidden">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: smoothEase }}
          className="text-center mb-16"
        >
          <h2 className="section-title mb-4">LA MÉTHODE <span className="text-gold">T3P CAMPUS</span></h2>
          <p className="section-subtitle mx-auto">4 étapes simples pour obtenir votre carte professionnelle</p>
        </motion.div>

        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {steps.map((step, i) => (
            <motion.div key={step.number} variants={staggerItemVariants} className="relative">
              {i < steps.length - 1 && (
                <motion.div 
                  className="hidden lg:block absolute top-8 left-[60%] w-full h-0.5 bg-border origin-left"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.2, duration: 0.5 }}
                />
              )}

              <motion.div 
                className="relative bg-card rounded-xl p-6 border border-border group cursor-pointer"
                whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(27, 77, 62, 0.12)", borderColor: "rgba(27, 77, 62, 0.3)" }}
              >
                <motion.div 
                  className="step-number mb-4 group-hover:bg-gold group-hover:text-forest transition-colors"
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1, type: "spring", stiffness: 300, damping: 15 }}
                >
                  {step.number}
                </motion.div>

                <motion.div 
                  className="text-4xl mb-4"
                  whileHover={{ scale: 1.3, rotate: [0, -15, 15, 0] }}
                  transition={{ duration: 0.4 }}
                >
                  {step.emoji}
                </motion.div>

                <h3 className="text-lg font-bold text-forest mb-2">{step.title}</h3>
                <p className="text-warm-gray-600 text-sm">{step.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <p className="text-warm-gray-600 mb-6">
            <span className="font-semibold text-forest">En moyenne,</span> nos élèves obtiennent leur carte en{" "}
            <span className="font-semibold text-forest">2 à 3 mois</span>
          </p>
          <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
            <Button asChild className="btn-primary">
              <Link to="/contact">COMMENCER MON PARCOURS</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;
