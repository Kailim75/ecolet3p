import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Star, Check, ArrowRight, Users, Phone } from "lucide-react";
import formationSession from "@/assets/center/formation-session.jpg";
import PlacesProgressBar from "@/components/home/PlacesProgressBar";
import AlmaLogo from "@/components/logo/AlmaLogo";

const smoothEase = [0.16, 1, 0.3, 1] as const;
const staggerDelay = 0.08;

const HeroSection = () => {
  return (
    <section
      className="relative flex items-center overflow-hidden pt-4 md:pt-6 pb-0"
      style={{
        minHeight: "calc(100svh - 60px)",
        background: "linear-gradient(135deg, #FFFAF5 0%, #FFF5EB 30%, #F0F4FF 100%)",
      }}
    >
      {/* Decorative warm glow circle */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-200px",
          right: "-100px",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "rgba(243,156,18,0.05)",
          filter: "blur(100px)",
        }}
      />

      {/* Subtle dot pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #000 0.5px, transparent 0.5px)",
          backgroundSize: "24px 24px",
          opacity: 0.03,
        }}
      />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-16 items-center">
          {/* Left column */}
          <div className="lg:col-span-3 max-w-xl xl:max-w-2xl">
            {/* 1. Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: smoothEase, delay: 0 }}
              className="mb-3 md:mb-5"
            >
              <span
                className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium border"
                style={{ backgroundColor: "rgba(27,77,62,0.06)", borderColor: "rgba(27,77,62,0.15)", color: "#1B4D3E" }}
              >
                <Check className="w-3.5 h-3.5 md:w-4 md:h-4" />
                Centre agréé Préfecture 92
              </span>
            </motion.div>

            {/* 2. H1 — bigger, bolder, saturated colors */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: staggerDelay, ease: smoothEase }}
              className="font-serif leading-[1.1] tracking-tight mb-3 md:mb-5"
              style={{
                color: "#1A1A1A",
                fontSize: "clamp(32px, 5vw, 56px)",
                fontWeight: 900,
                textShadow: "0 2px 4px rgba(0,0,0,0.04)",
              }}
            >
              Devenez chauffeur{" "}
              <span style={{ color: "#D35400" }}>Taxi</span>,{" "}
              <span style={{ color: "#1E8449" }}>VTC</span> ou{" "}
              <span style={{ color: "#1A5276" }}>VMDTR</span>
            </motion.h1>

            {/* 3. Subtitle — value proposition with numbers */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: staggerDelay * 2, ease: smoothEase }}
              className="mb-4 md:mb-5 max-w-[560px]"
            >
              <p className="text-base md:text-lg font-semibold mb-1" style={{ color: "#1A5276" }}>
                94% de réussite dès le 1er passage — Rejoignez les +2000 chauffeurs formés
              </p>
              <p className="text-sm md:text-[15px]" style={{ color: "#666" }}>
                Formation agréée à Montrouge (92) · De l'inscription à votre carte professionnelle
              </p>
            </motion.div>

            {/* 4. Google Reviews Badge — bigger, pill-shaped, hover effect */}
            <motion.a
              href="https://www.google.com/maps/place/ECOLE+T3P"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: staggerDelay * 3, ease: smoothEase }}
              className="inline-flex items-center gap-2 md:gap-3 px-5 py-2.5 md:px-6 md:py-3 bg-white rounded-full mb-4 md:mb-5 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group"
              style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #E8E8E8" }}
            >
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
              <span className="text-sm" style={{ color: "#4B5563" }}>— 359 avis vérifiés</span>
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.a>

            {/* 5. CTA Buttons — shimmer on primary, refined secondary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: staggerDelay * 4, ease: smoothEase }}
              className="flex flex-col sm:flex-row gap-3 mb-4"
            >
              <Button
                asChild
                className="relative overflow-hidden btn-cta-orange px-9 py-4 text-base rounded-xl w-full sm:w-auto hover:-translate-y-[3px] transition-all duration-300 group/btn"
                style={{ boxShadow: "0 6px 20px rgba(243,156,18,0.4)" }}
              >
                <Link to="/contact">
                  {/* Shimmer effect */}
                  <span className="absolute inset-0 pointer-events-none shimmer-effect" />
                  S'inscrire à la formation
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover/btn:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="px-8 py-4 text-base rounded-xl font-bold w-full sm:w-auto transition-all duration-300 hover:text-[#1A5276] hover:border-[#1A5276]"
                style={{ borderColor: "#DDD", color: "#555" }}
              >
                <Link to="/formations">Voir les tarifs</Link>
              </Button>
            </motion.div>

            {/* 6. Places progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: staggerDelay * 5 }}
              className="mb-4 max-w-md"
            >
              <PlacesProgressBar />
            </motion.div>

            {/* 7. Mini-cartes formations — enriched with monthly price + Alma */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: staggerDelay * 6, ease: smoothEase }}
              className="flex sm:grid sm:grid-cols-3 gap-3 mb-5 overflow-x-auto sm:overflow-visible snap-x snap-mandatory pb-2 sm:pb-0 -mx-1 px-1"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {[
                { emoji: "🚕", title: "Formation Taxi", hours: "63h", price: 990, color: "#D35400", bgColor: "rgba(211,84,0,0.06)", link: "/formations/taxi" },
                { emoji: "🚗", title: "Formation VTC", hours: "63h", price: 990, color: "#1E8449", bgColor: "rgba(30,132,73,0.06)", link: "/formations/vtc" },
                { emoji: "🏍️", title: "Formation VMDTR", hours: "33h", price: 990, color: "#1A5276", bgColor: "rgba(26,82,118,0.06)", link: "/formations/vmdtr" },
              ].map((f) => (
                <Link
                  key={f.title}
                  to={f.link}
                  className="group flex items-center gap-3 p-3 bg-white border border-border/60 rounded-xl transition-all duration-300 min-w-[180px] sm:min-w-0 snap-start flex-shrink-0 sm:flex-shrink cursor-pointer"
                  style={{}}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = f.color;
                    e.currentTarget.style.boxShadow = `0 4px 16px ${f.color}20`;
                    e.currentTarget.style.backgroundColor = f.bgColor;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "";
                    e.currentTarget.style.boxShadow = "";
                    e.currentTarget.style.backgroundColor = "";
                  }}
                >
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center text-xl flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: f.bgColor }}
                  >
                    {f.emoji}
                  </div>
                  <div>
                    <p className="font-semibold text-sm transition-colors" style={{ color: "#1A1A1A" }}>
                      {f.title}
                    </p>
                    <p className="text-xs" style={{ color: "#6B7280" }}>
                      {f.hours} · dès {f.price}€
                    </p>
                    <p className="text-[10px] flex items-center gap-1 mt-0.5" style={{ color: "#FA5022" }}>
                      ou {(f.price / 4).toFixed(2)}€/mois <AlmaLogo className="h-2.5 inline" />
                    </p>
                  </div>
                </Link>
              ))}
            </motion.div>

            {/* 8. Quick info pills — mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: staggerDelay * 7 }}
              className="flex flex-wrap gap-2 sm:hidden mb-4"
            >
              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium bg-white border border-border/60" style={{ color: "#4B5563" }}>
                <Check className="w-3 h-3 text-forest" /> Jusqu'à 4× sans frais <AlmaLogo className="h-3 ml-0.5" />
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium bg-white border border-border/60" style={{ color: "#4B5563" }}>
                <Check className="w-3 h-3 text-forest" /> Dès 990€
              </span>
            </motion.div>

            {/* 9. Desktop micro-text with Alma logo */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: staggerDelay * 7 }}
              className="hidden sm:flex text-sm flex-wrap gap-4"
              style={{ color: "#4B5563" }}
            >
              <span className="flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-forest" /> Paiement en 1×, 2×, 3× ou 4× sans frais
                <AlmaLogo className="h-3.5 ml-0.5" />
              </span>
              <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-forest" /> Prochaine session : mars 2026</span>
            </motion.p>
          </div>

          {/* Right column — photo with decorative frame */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: staggerDelay * 6, ease: smoothEase }}
            className="lg:col-span-2 relative hidden lg:block"
          >
            {/* Decorative frame behind */}
            <div
              className="absolute rounded-3xl pointer-events-none"
              style={{
                bottom: -16,
                right: -16,
                top: 0,
                left: 0,
                border: "3px solid #F39C12",
                borderRadius: 24,
                zIndex: 0,
              }}
            />
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{
                boxShadow: "0 24px 48px rgba(0,0,0,0.15)",
                borderRadius: 24,
                zIndex: 1,
              }}
            >
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

            {/* Floating card — animated float */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1, type: "spring", stiffness: 200, damping: 15 }}
              className="absolute -bottom-6 -left-8 rounded-2xl p-4 border border-border/40 z-10 hero-float"
              style={{
                boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
                backdropFilter: "blur(12px)",
                background: "rgba(255,255,255,0.95)",
                borderRadius: 16,
              }}
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

      {/* 13. Transition gradient to next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[60px] pointer-events-none"
        style={{ background: "linear-gradient(180deg, transparent 0%, #FFFFFF 100%)" }}
      />
    </section>
  );
};

export default HeroSection;
