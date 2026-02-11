import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform, type Easing } from "framer-motion";
import { Star } from "lucide-react";
import formationSession from "@/assets/center/formation-session.jpg";

const smoothEase: Easing = [0.22, 1, 0.36, 1];

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
    <section ref={containerRef} className="relative min-h-[85vh] flex items-center hero-bg overflow-hidden pt-20">
      {/* Parallax Background Elements */}
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
            {/* Badge institutionnel */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: smoothEase }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-forest/10 rounded-full text-sm font-medium text-forest border border-forest/20">
                Centre de formation agréé
              </span>
            </motion.div>

            {/* Titre institutionnel */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: smoothEase }}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-forest leading-[1.05] tracking-tight mb-6"
            >
              ECOLE T3P —{" "}
              <motion.span 
                className="text-gold inline-block"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: smoothEase }}
              >
                Formations & Services Transport
              </motion.span>
            </motion.h1>

            {/* Sous-titre factuel */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: smoothEase }}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6"
            >
              Formations initiales et continues • Mobilité taxi • Récupération de points • Examens
            </motion.p>

            {/* Google Reviews Badge */}
            <motion.a
              href="https://www.google.com/maps/place/ECOLE+T3P"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: smoothEase }}
              whileHover={{ scale: 1.03 }}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-forest/10 backdrop-blur-sm rounded-xl border border-forest/15 mb-8 hover:bg-forest/15 transition-colors"
            >
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                ))}
              </div>
              <span className="font-bold text-forest text-sm">5.0/5</span>
              <span className="text-muted-foreground text-sm">sur Google (359 avis)</span>
            </motion.a>

            {/* CTA Buttons - Exploratoires */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: smoothEase }}
              className="flex flex-wrap gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="inline-block"
              >
                <Button asChild className="btn-accent">
                  <Link to="/formations">Voir toutes les formations</Link>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="inline-block"
              >
                <Button asChild variant="outline" className="btn-secondary">
                  <Link to="/services/location-vehicule-examen">Accéder aux services d'examen</Link>
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
                className="w-full h-[500px] object-cover transition-transform duration-600 hover:scale-105"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/60 via-transparent to-transparent" />
            </div>

            {/* Bloc réassurance institutionnel */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 1, type: "spring", stiffness: 200 }}
              whileHover={{ y: -5 }}
              className="absolute -left-8 top-1/4 bg-card rounded-xl shadow-xl p-5 border border-border"
            >
              <div className="space-y-2 text-sm text-forest">
                <p className="flex items-center gap-2">
                  <span className="text-gold">✔</span> Formation conforme à la réglementation
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
