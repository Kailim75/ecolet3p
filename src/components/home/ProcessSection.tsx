import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform, type Easing } from "framer-motion";
import { ClipboardEdit, BookOpen, Target, Award } from "lucide-react";

const smoothEase: Easing = [0.22, 1, 0.36, 1];

const steps = [
  { number: "1", icon: ClipboardEdit, title: "Inscription", description: "Prenez rendez-vous. Nous étudions ensemble votre projet." },
  { number: "2", icon: BookOpen, title: "Formation", description: "Suivez votre formation avec nos formateurs experts." },
  { number: "3", icon: Target, title: "Examen", description: "Passez votre examen avec confiance." },
  { number: "4", icon: Award, title: "Carte Pro", description: "Obtenez votre carte et démarrez votre carrière." },
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
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-5, 5]);

  return (
    <section ref={containerRef} className="section-padding bg-card overflow-hidden relative">
      {/* Parallax Background Elements */}
      <motion.div 
        style={{ y: y1, rotate }}
        className="absolute top-20 -left-32 w-72 h-72 bg-forest/5 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div 
        style={{ y: y2 }}
        className="absolute -bottom-20 right-1/4 w-80 h-80 bg-gold/10 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-1/2 -right-16 w-40 h-40 bg-forest/5 rounded-full blur-2xl pointer-events-none"
      />

      <div className="container-custom relative z-10">
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
                whileHover={{ 
                  y: -10, 
                  boxShadow: "0 25px 50px rgba(27, 77, 62, 0.15)", 
                  borderColor: "rgba(212, 168, 83, 0.5)"
                }}
                whileTap={{ scale: 0.98, y: -5 }}
              >
                <motion.div 
                  className="step-number mb-4 group-hover:bg-gold group-hover:text-forest transition-colors"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                >
                  {step.number}
                </motion.div>

                <motion.div 
                  className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4"
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(212, 168, 83, 0.25)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <step.icon className="w-6 h-6 text-forest" />
                </motion.div>

                <motion.h3 
                  className="text-lg font-bold text-forest mb-2 group-hover:text-gold transition-colors duration-300"
                >
                  {step.title}
                </motion.h3>
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
          <motion.div 
            whileHover={{ scale: 1.05, y: -4 }} 
            whileTap={{ scale: 0.97 }}
            className="inline-block"
          >
            <Button asChild className="btn-primary glow-hover">
              <Link to="/contact">COMMENCER MON PARCOURS</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;
