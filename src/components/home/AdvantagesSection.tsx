import React, { useRef } from "react";
import { motion, useScroll, useTransform, type Easing } from "framer-motion";

// Force refresh
const smoothEase: Easing = [0.22, 1, 0.36, 1];

const advantages = [
  { value: "94%", title: "De Réussite", description: "Notre taux de réussite aux examens TAXI et VTC." },
  { value: "2 000+", title: "Élèves Formés", description: "Depuis 2014, nous accompagnons les futurs chauffeurs." },
  { value: "10 ans", title: "D'Expérience", description: "Une décennie d'expertise dans la formation." },
  { value: "4x", title: "Paiement Sans Frais", description: "Facilitez votre formation avec le paiement en plusieurs fois." },
];

const staggerContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const staggerItemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: smoothEase }
  }
};

const AdvantagesSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -10]);

  return (
    <section ref={containerRef} className="section-padding bg-card overflow-hidden relative">
      {/* Parallax Background Elements - hidden on mobile for perf */}
      <div className="hidden md:block">
        <motion.div 
          style={{ y: y1, rotate: rotate1 }}
          className="absolute -top-20 -left-20 w-64 h-64 bg-forest/5 rounded-full blur-3xl pointer-events-none"
        />
        <motion.div 
          style={{ y: y2, rotate: rotate2 }}
          className="absolute -bottom-32 -right-32 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none"
        />
        <motion.div 
          style={{ y: y1 }}
          className="absolute top-1/2 right-0 w-32 h-32 bg-forest/5 rounded-full blur-2xl pointer-events-none"
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: smoothEase }}
          className="text-center mb-8 md:mb-16"
        >
          <motion.h2 
            className="section-title mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            NOUS AVONS ACCOMPAGNÉ + DE{" "}
            <motion.span 
              className="text-gold"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
            >
              2 000 PROJETS
            </motion.span>
          </motion.h2>
          <motion.p 
            className="section-subtitle mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            En 10 ans, nous avons appris qu'obtenir sa carte professionnelle demande une méthode.
          </motion.p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6"
        >
          {advantages.map((adv, i) => (
            <motion.div
              key={adv.title}
              variants={staggerItemVariants}
              whileHover={{ 
                y: -10, 
                boxShadow: "0 25px 50px rgba(27, 77, 62, 0.18)",
                borderColor: "rgba(212, 168, 83, 0.5)"
              }}
              whileTap={{ scale: 0.98, y: -5 }}
              className="card-livementor text-center group cursor-pointer"
            >
              <div className="mb-4">
                <motion.span 
                  className="stat-number group-hover:text-gold transition-colors duration-300"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                >
                  {adv.value}
                </motion.span>
              </div>
              <motion.h3 
                className="text-lg font-bold text-forest mb-2 group-hover:text-gold transition-colors duration-300"
              >
                {adv.title}
              </motion.h3>
              <p className="text-warm-gray-600 text-sm leading-relaxed">{adv.description}</p>
              
              {/* Hover indicator */}
              <motion.div
                className="w-12 h-1 bg-gold/30 rounded-full mx-auto mt-4"
                initial={{ width: 0 }}
                whileHover={{ width: 48 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AdvantagesSection;
