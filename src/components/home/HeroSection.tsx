import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform, type Easing } from "framer-motion";
import { Award, Users, CreditCard } from "lucide-react";
import formationSession from "@/assets/center/formation-session.jpg";

const smoothEase: Easing = [0.22, 1, 0.36, 1];

const stats = [
  { icon: Award, value: "94%", label: "de réussite" },
  { icon: Users, value: "2 000+", label: "élèves formés" },
  { icon: CreditCard, value: "Paiement 4x", label: "sans frais" },
];

const staggerContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
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

const HeroSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const y2 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 10]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  return (
    <section ref={containerRef} className="relative min-h-[90vh] flex items-center hero-bg overflow-hidden pt-20">
      {/* Enhanced Parallax Background Elements */}
      <motion.div 
        style={{ y: y2, rotate, scale }}
        className="absolute -top-32 -right-32 w-96 h-96 bg-forest/5 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div 
        style={{ y, rotate }}
        className="absolute top-1/3 -left-20 w-64 h-64 bg-gold/10 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div 
        style={{ y: y2 }}
        className="absolute bottom-20 right-1/4 w-48 h-48 bg-forest/5 rounded-full blur-2xl pointer-events-none"
      />
      {/* Vertical text */}
      <motion.div 
        className="hidden xl:block absolute left-8 top-1/2 -translate-y-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <span 
          className="text-forest/20 font-black text-sm uppercase tracking-[0.3em] block"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          ECOLE T3P
        </span>
      </motion.div>

      <motion.div style={{ y, opacity }} className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="max-w-xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: smoothEase }}
              className="mb-6"
            >
              <span className="badge-livementor">
                <motion.span 
                  className="w-2 h-2 bg-gold rounded-full"
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                Inscriptions ouvertes
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: smoothEase }}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-forest uppercase leading-[1.05] tracking-tight mb-6"
            >
              Des formations pour{" "}
              <motion.span 
                className="text-gold inline-block"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: smoothEase }}
              >
                devenir chauffeur
              </motion.span>{" "}
              et réussir
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: smoothEase }}
              className="text-lg md:text-xl text-warm-gray-600 leading-relaxed mb-8"
            >
              Un accompagnement personnalisé pour obtenir votre carte professionnelle TAXI, VTC ou VMDTR.
            </motion.p>

            {/* Stats */}
            <motion.div
              variants={staggerContainerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-6 mb-10"
            >
              {stats.map((stat, index) => (
                <motion.div 
                  key={index} 
                  variants={staggerItemVariants}
                  className="flex items-center gap-3 group"
                >
                  <motion.div 
                    className="w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center"
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(27, 77, 62, 0.2)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <stat.icon className="w-5 h-5 text-forest" />
                  </motion.div>
                  <div>
                    <span className="font-black text-forest text-lg">{stat.value}</span>
                    <span className="text-warm-gray-500 text-sm ml-1">{stat.label}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons with enhanced micro-interactions */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: smoothEase }}
              className="flex flex-wrap gap-4"
            >
              <motion.div
                whileHover={{ 
                  scale: 1.05, 
                  y: -4,
                }}
                whileTap={{ scale: 0.97, y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="inline-block"
              >
                <Button asChild className="btn-accent pulse-subtle">
                  <a href="#rendez-vous">PRENDRE RENDEZ-VOUS</a>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ 
                  scale: 1.05, 
                  y: -4,
                }}
                whileTap={{ scale: 0.97, y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="inline-block"
              >
                <Button asChild className="btn-secondary">
                  <Link to="/formations">DÉCOUVRIR NOS FORMATIONS</Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="mt-10 flex items-center gap-4 text-sm text-warm-gray-500"
            >
              {["Formateurs experts", "Depuis 2014"].map((text, i) => (
                <motion.div 
                  key={text}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + i * 0.1, duration: 0.4 }}
                >
                  <span className="w-5 h-5 rounded-full bg-forest flex items-center justify-center text-cream text-xs">✓</span>
                  <span>{text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: smoothEase }}
            className="relative hidden lg:block"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl" style={{ aspectRatio: '4/3' }}>
              <img
                src={formationSession}
                alt="Session de formation ECOLE T3P - Chauffeurs professionnels en cours"
                width={800}
                height={600}
                className="w-full h-[600px] object-cover transition-transform duration-600 hover:scale-105"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/60 via-transparent to-transparent" />
              
              <motion.div 
                className="absolute bottom-6 right-6 left-6 bg-cream-light/95 backdrop-blur-sm rounded-xl p-5"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-forest flex items-center justify-center text-cream font-bold text-xl">
                    MB
                  </div>
                  <div>
                    <p className="font-bold text-forest">Mohamed B.</p>
                    <p className="text-warm-gray-600 text-sm">Chauffeur VTC • Alumni ECOLE T3P</p>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 1, type: "spring", stiffness: 200 }}
              whileHover={{ y: -5 }}
              className="absolute -left-8 top-1/4 bg-card rounded-xl shadow-xl p-5 border border-border"
            >
              <motion.p 
                className="stat-number mb-1"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.2, type: "spring", stiffness: 300 }}
              >
                87%
              </motion.p>
              <p className="text-sm text-warm-gray-600 max-w-[140px]">
                des entreprises créées existent toujours 3 ans après
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute top-20 right-0 w-1/3 h-full bg-forest/5 -skew-x-12 transform origin-top-right" />
    </section>
  );
};

export default HeroSection;
