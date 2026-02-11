import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Star, Check, ArrowRight, Users, Flame } from "lucide-react";
import formationSession from "@/assets/center/formation-session.jpg";

const smoothEase = [0.22, 1, 0.36, 1] as const;

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 xl:pt-12 overflow-hidden" style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #FDF8F0 100%)" }}>
      {/* Decorative circle */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(212,168,83,0.05) 0%, transparent 70%)" }} />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* Left column - 60% */}
          <div className="lg:col-span-3 max-w-xl xl:max-w-2xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: smoothEase }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border" style={{ backgroundColor: "rgba(27,77,62,0.06)", borderColor: "rgba(27,77,62,0.15)", color: "#1B4D3E" }}>
                <Check className="w-4 h-4" />
                Centre agréé Préfecture 92
              </span>
            </motion.div>

            {/* H1 - Color coded */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: smoothEase }}
              className="font-serif text-[32px] md:text-[40px] lg:text-[48px] xl:text-[56px] leading-[1.15] tracking-tight mb-6"
              style={{ color: "#1A1A1A" }}
            >
              Devenez chauffeur{" "}
              <span style={{ color: "#F97316" }}>Taxi</span>,{" "}
              <span style={{ color: "#059669" }}>VTC</span> ou{" "}
              <span style={{ color: "#2563EB" }}>VMDTR</span>
            </motion.h1>

            {/* Subtitle - bigger & darker */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: smoothEase }}
              className="text-lg xl:text-xl leading-relaxed mb-6 max-w-[500px] xl:max-w-[560px]"
              style={{ color: "#4B5563" }}
            >
              Formation professionnelle agréée à Montrouge. Accompagnement complet de l'inscription à l'obtention de votre carte professionnelle.
            </motion.p>

            {/* Google Reviews Badge - enhanced */}
            <motion.a
              href="https://www.google.com/maps/place/ECOLE+T3P"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: smoothEase }}
              className="inline-flex items-center gap-3 px-5 py-3 bg-white rounded-full mb-6 hover:shadow-lg transition-shadow"
              style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.08)", border: "2px solid #FCD34D" }}
            >
              {/* Google G icon */}
              <svg viewBox="0 0 24 24" className="w-5 h-5">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 text-[#FBBC05] fill-[#FBBC05]" />
                ))}
              </div>
              <span className="font-bold text-sm" style={{ color: "#1A1A1A" }}>5.0/5</span>
              <span className="text-sm" style={{ color: "#4B5563" }}>— 359 avis Google</span>
            </motion.a>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: smoothEase }}
              className="flex flex-wrap gap-4 mb-3"
            >
              <Button asChild className="btn-cta-orange px-8 py-4 text-base rounded-lg" style={{ boxShadow: "0 4px 14px rgba(230,126,34,0.35)" }}>
                <Link to="/contact">
                  S'inscrire à la formation <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="px-8 py-4 text-base rounded-lg border-2 font-bold" style={{ borderColor: "#1B4D3E", color: "#1B4D3E" }}>
                <Link to="/formations">Voir les tarifs</Link>
              </Button>
            </motion.div>

            {/* Urgency micro-text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-sm font-medium flex items-center gap-1 mb-4"
              style={{ color: "#EA580C" }}
            >
              <Flame className="w-4 h-4" />
              Plus que 4 places pour la session de mars 2026
            </motion.p>

            {/* Micro-text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-sm flex flex-wrap gap-4"
              style={{ color: "#4B5563" }}
            >
              <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-forest" /> Paiement en 4x sans frais</span>
              <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-forest" /> Prochaine session : mars 2026</span>
            </motion.p>
          </div>

          {/* Right column - 40% */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: smoothEase }}
            className="lg:col-span-2 relative hidden lg:block"
          >
            <div className="relative rounded-3xl overflow-hidden" style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.1)" }}>
              <img
                src={formationSession}
                alt="Session de formation ECOLE T3P — Chauffeurs professionnels en cours de formation à Montrouge"
                width={800}
                height={600}
                className="w-full h-[480px] xl:h-[560px] object-cover"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>

            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8, type: "spring", stiffness: 200 }}
              className="absolute -bottom-6 -left-8 bg-white rounded-xl p-4 border border-border/40"
              style={{ boxShadow: "0 8px 30px rgba(0,0,0,0.1)" }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-forest" />
                </div>
                <div>
                  <p className="font-bold text-forest text-sm">+2000 chauffeurs formés</p>
                  <p className="text-xs" style={{ color: "#6B7280" }}>depuis 2014</p>
                </div>
              </div>
              {/* Mini progress bar with label */}
              <div className="mt-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs" style={{ color: "#6B7280" }}>Taux de réussite</span>
                  <span className="text-xs font-bold" style={{ color: "#1B4D3E" }}>94%</span>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "94%" }}
                    transition={{ duration: 1.5, delay: 1.2, ease: smoothEase }}
                    className="h-full rounded-full"
                    style={{ background: "linear-gradient(90deg, #1B4D3E, #D4A853)" }}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
