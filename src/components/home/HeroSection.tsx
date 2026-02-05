import React, { useRef } from "react"; // v1
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform, type Easing } from "framer-motion";
import formationSession from "@/assets/center/formation-session.jpg";
import { useQuoteModal } from "@/components/quote/QuoteRequestModal";

const smoothEase: Easing = [0.22, 1, 0.36, 1];

const HeroSection = () => {
  const { openQuoteModal } = useQuoteModal();
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

            {/* Title - SEO Optimized H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: smoothEase }}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-forest leading-[1.05] tracking-tight mb-6"
            >
              Formation T3P –{" "}
              <motion.span 
                className="text-gold inline-block"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: smoothEase }}
              >
                Taxi, VTC & VMDTR
              </motion.span>
            </motion.h1>

            {/* Subtitle - Benefit oriented */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: smoothEase }}
              className="text-lg md:text-xl text-warm-gray-600 leading-relaxed mb-8"
            >
              Préparez l'examen T3P et obtenez votre carte professionnelle pour exercer légalement comme chauffeur Taxi, VTC ou VMDTR.
            </motion.p>

            {/* Reassurance phrase */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: smoothEase }}
              className="text-base md:text-lg font-semibold text-forest mb-8"
            >
              94 % de réussite – plus de 2 000 élèves formés – paiement 4× sans frais
            </motion.p>


            {/* CTA Buttons - Conversion oriented */}
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
                <Button onClick={() => openQuoteModal()} className="btn-accent pulse-subtle">
                  Obtenez votre devis gratuit en 2 minutes !
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
                  <Link to="/formations">Découvrir la formation T3P</Link>
                </Button>
              </motion.div>
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
              <div className="space-y-2 text-sm text-forest">
                <p className="flex items-center gap-2">
                  <span className="text-gold">✔</span> Formation conforme à la réglementation T3P
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-gold">✔</span> Accompagnement jusqu'à la carte pro
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-gold">✔</span> Formateurs expérimentés et agréés
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute top-20 right-0 w-1/3 h-full bg-forest/5 -skew-x-12 transform origin-top-right" />
    </section>
  );
};

export default HeroSection;
