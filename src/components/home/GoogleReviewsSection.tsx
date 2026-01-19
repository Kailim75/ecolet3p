import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Star, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const GOOGLE_REVIEWS_URL = "https://www.google.com/search?q=T3P+Campus+Montrouge+avis";

const GoogleReviewsSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.05, 0.95]);

  return (
    <section ref={containerRef} className="py-16 bg-forest relative overflow-hidden">
      {/* Background decorations */}
      <motion.div 
        style={{ y: y1, scale }}
        className="absolute -top-20 right-1/4 w-64 h-64 bg-gold/10 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div 
        className="absolute bottom-10 left-10 w-48 h-48 bg-cream/5 rounded-full blur-2xl pointer-events-none"
      />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-between gap-8"
        >
          {/* Left side - Rating */}
          <div className="flex items-center gap-6">
            {/* Google Logo */}
            <motion.div 
              className="w-16 h-16 bg-cream rounded-xl flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.05, rotate: 3 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <svg viewBox="0 0 24 24" className="w-10 h-10">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </motion.div>

            {/* Rating info */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-4xl font-black text-cream">5.0</span>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1, type: "spring", stiffness: 300 }}
                    >
                      <Star className="w-6 h-6 fill-gold text-gold" />
                    </motion.div>
                  ))}
                </div>
              </div>
              <p className="text-cream/80 text-sm">
                Basé sur <span className="font-bold text-cream">359 avis</span> Google
              </p>
            </div>
          </div>

          {/* Center - Quote */}
          <motion.div 
            className="flex-1 max-w-md text-center md:text-left"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <p className="text-cream/90 text-lg italic">
              "Nos stagiaires nous recommandent pour la qualité de notre accompagnement et notre taux de réussite."
            </p>
          </motion.div>

          {/* Right side - CTA */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              asChild
              className="bg-gold hover:bg-gold/90 text-forest font-bold px-6 py-3 rounded-lg shadow-lg"
            >
              <a 
                href={GOOGLE_REVIEWS_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                Voir tous les avis
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default GoogleReviewsSection;
