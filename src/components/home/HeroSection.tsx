import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const smoothEase = [0.22, 1, 0.36, 1] as const;

const HeroSection = () => {
  return (
    <section className="relative min-h-[60vh] flex items-center bg-cream pt-24 pb-16">
      {/* Subtle background accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-forest/3 -skew-x-12 transform origin-top-right pointer-events-none" />
      
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Regulatory micro-text */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: smoothEase }}
            className="text-sm text-muted-foreground mb-4 uppercase tracking-wider"
          >
            Conformément à la réglementation en vigueur
          </motion.p>

          {/* Main title - factual, institutional */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: smoothEase }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-forest leading-tight mb-6"
          >
            Formation Continue Obligatoire
            <br />
            <span className="text-gold">Chauffeurs TAXI, VTC et VMDTR</span>
          </motion.h1>

          {/* Subtitle - institutional */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: smoothEase }}
            className="text-lg md:text-xl text-muted-foreground mb-4"
          >
            Renouvellement de la carte professionnelle
          </motion.p>

          {/* Credential line */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: smoothEase }}
            className="text-base text-forest font-medium mb-10"
          >
            Centre de formation agréé
          </motion.p>

          {/* Single exploratory CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: smoothEase }}
          >
            <Button asChild className="btn-primary px-8 py-6 text-base">
              <Link to="/formations">Voir les formations</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
