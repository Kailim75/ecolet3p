import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Star, Check, ArrowRight, Users } from "lucide-react";
import formationSession from "@/assets/center/formation-session.jpg";
import PlacesProgressBar from "@/components/home/PlacesProgressBar";
import AlmaLogo from "@/components/logo/AlmaLogo";

const smoothEase = [0.16, 1, 0.3, 1] as const;

const heroAnim = (delay: number, type: "up" | "left" | "pop" = "up") => ({
  initial: {
    opacity: 0,
    ...(type === "up" && { y: 20 }),
    ...(type === "left" && { x: 30 }),
    ...(type === "pop" && { scale: 0.85 }),
  },
  animate: {
    opacity: 1,
    ...(type === "up" && { y: 0 }),
    ...(type === "left" && { x: 0 }),
    ...(type === "pop" && { scale: 1 }),
  },
  transition: { duration: 0.6, delay: delay / 1000, ease: smoothEase },
});

const formations = [
  { emoji: "🚕", title: "Formation Taxi", hours: "63h", price: 990, color: "#D35400", bgColor: "rgba(211,84,0,0.06)", link: "/formations/taxi" },
  { emoji: "🚗", title: "Formation VTC", hours: "63h", price: 990, color: "#1E8449", bgColor: "rgba(30,132,73,0.06)", link: "/formations/vtc" },
  { emoji: "🏍️", title: "Formation VMDTR", hours: "33h", price: 990, color: "#1A5276", bgColor: "rgba(26,82,118,0.06)", link: "/formations/vmdtr" },
];

const HeroSection = () => {
  return (
    <section
      className="relative flex items-center overflow-hidden max-w-[100vw]"
      style={{
        paddingTop: 16,
        paddingBottom: 0,
        minHeight: "calc(100svh - 60px)",
        background: "linear-gradient(135deg, #FFFAF5 0%, #FFF5EB 30%, #F5F7FF 100%)",
      }}
    >
      {/* C2 — Warm glow circle */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: -150,
          right: -100,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(243,156,18,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #000 0.5px, transparent 0.5px)",
          backgroundSize: "24px 24px",
          opacity: 0.03,
        }}
      />

      <div className="container-custom relative z-10 px-4 sm:px-6">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-16 items-center">
          {/* Left column */}
          <div className="lg:col-span-3 max-w-full xl:max-w-2xl overflow-hidden">
            {/* 1. Badge — delay 0ms */}
            <motion.div {...heroAnim(0)} className="mb-2 md:mb-4">
              <span
                className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium border"
                style={{ backgroundColor: "rgba(27,77,62,0.06)", borderColor: "rgba(27,77,62,0.15)", color: "#1B4D3E" }}
              >
                <Check className="w-3.5 h-3.5 md:w-4 md:h-4" />
                Centre agréé Préfecture 92
              </span>
            </motion.div>

            {/* 2. H1 — delay 80ms */}
            <motion.h1
              {...heroAnim(80)}
              className="font-serif leading-[1.1] tracking-tight mb-3 md:mb-5"
              style={{
                color: "#1A1A1A",
                fontSize: "clamp(26px, 5vw, 56px)",
                fontWeight: 900,
                textShadow: "0 2px 4px rgba(0,0,0,0.04)",
              }}
            >
              Devenez chauffeur{" "}
              <span style={{ color: "#D35400" }}>Taxi</span>,{" "}
              <span style={{ color: "#1E8449" }}>VTC</span> ou{" "}
              <span style={{ color: "#1A5276" }}>VMDTR</span>
            </motion.h1>

            {/* 3. Subtitle — delay 160ms */}
            <motion.div {...heroAnim(160)} className="mb-4 md:mb-5 max-w-[560px]">
              <p className="text-base md:text-lg font-semibold mb-1" style={{ color: "#1A5276" }}>
                94% de réussite dès le 1er passage — Rejoignez les +2000 chauffeurs formés
              </p>
              <p className="text-sm md:text-[15px]" style={{ color: "#666" }}>
                Formation agréée à Montrouge (92) · De l'inscription à votre carte professionnelle
              </p>
            </motion.div>

            {/* 4. Google Reviews — delay 240ms */}
            <motion.a
              href="https://www.google.com/maps/place/ECOLE+T3P"
              target="_blank"
              rel="noopener noreferrer"
              {...heroAnim(240)}
              className="inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-white rounded-full mb-4 md:mb-5 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group"
              style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #E8E8E8" }}
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <div className="flex flex-shrink-0">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#FBBC05] fill-[#FBBC05]" />
                ))}
              </div>
              <span className="font-bold text-xs md:text-sm" style={{ color: "#1A1A1A" }}>5.0/5</span>
              <span className="text-xs md:text-sm hidden min-[400px]:inline" style={{ color: "#4B5563" }}>— 359 avis</span>
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block" />
            </motion.a>

            {/* 5. CTA Buttons — delay 320ms */}
            <motion.div {...heroAnim(320)} className="flex flex-col sm:flex-row gap-3 mb-4">
              <Button
                asChild
                className="relative overflow-hidden btn-cta-orange px-6 sm:px-9 py-4 text-sm sm:text-base rounded-xl w-full sm:w-auto cta-shimmer group/btn"
                style={{ boxShadow: "0 6px 24px rgba(243,156,18,0.4)", transition: "all 300ms ease" }}
              >
                <Link to="/contact">
                  S'inscrire maintenant
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover/btn:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="px-6 sm:px-8 py-4 text-sm sm:text-base rounded-xl font-bold w-full sm:w-auto transition-all duration-300 hover:text-[#1A5276] hover:border-[#1A5276]"
                style={{ borderColor: "#DDD", color: "#555" }}
              >
                <Link to="/formations">Voir les tarifs</Link>
              </Button>
            </motion.div>

            {/* 6. Places progress bar — delay 400ms */}
            <motion.div {...heroAnim(400)} className="mb-4 max-w-md">
              <PlacesProgressBar />
            </motion.div>

            {/* 7. Mini-cartes formations — delay 480ms — C6 refinements */}
            <motion.div
              {...heroAnim(480)}
              className="flex flex-col min-[480px]:flex-row min-[480px]:overflow-x-auto sm:grid sm:grid-cols-3 gap-3 mb-5 sm:overflow-visible snap-x snap-mandatory pb-2 sm:pb-0 -mx-1 px-1"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {formations.map((f) => (
                <Link
                  key={f.title}
                  to={f.link}
                  className="group flex items-center gap-3 bg-white border border-border/60 rounded-xl transition-all duration-200 min-w-0 min-[480px]:min-w-[200px] sm:min-w-0 snap-start flex-shrink-0 sm:flex-shrink cursor-pointer"
                  style={{ padding: "14px 16px" }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.borderColor = f.color;
                    el.style.borderLeftWidth = "3px";
                    el.style.borderLeftColor = f.color;
                    el.style.boxShadow = `0 4px 12px rgba(0,0,0,0.06)`;
                    el.style.backgroundColor = "#FAFAFA";
                    el.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.borderColor = "";
                    el.style.borderLeftWidth = "";
                    el.style.borderLeftColor = "";
                    el.style.boxShadow = "";
                    el.style.backgroundColor = "";
                    el.style.transform = "";
                  }}
                >
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center text-xl flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: f.bgColor }}
                  >
                    {f.emoji}
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: "#1A1A1A" }}>{f.title}</p>
                    <p className="text-xs" style={{ color: "#6B7280" }}>{f.hours} · dès {f.price}€</p>
                    <p className="flex items-center gap-1 mt-1" style={{ fontSize: 12, fontWeight: 600, color: "#D35400" }}>
                      ou {(f.price / 4).toFixed(2).replace(".", ",")}€/mois
                      <AlmaLogo className="h-3 inline opacity-70" />
                    </p>
                  </div>
                </Link>
              ))}
            </motion.div>

            {/* Mobile pills */}
            <motion.div {...heroAnim(560)} className="flex flex-wrap gap-2 sm:hidden mb-4">
              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium bg-white border border-border/60" style={{ color: "#4B5563" }}>
                <Check className="w-3 h-3 text-forest" /> Jusqu'à 4× sans frais <AlmaLogo className="h-3 ml-0.5" />
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium bg-white border border-border/60" style={{ color: "#4B5563" }}>
                <Check className="w-3 h-3 text-forest" /> Dès 990€
              </span>
            </motion.div>

            {/* Desktop micro-text */}
            <motion.p {...heroAnim(560)} className="hidden sm:flex text-sm flex-wrap gap-4" style={{ color: "#4B5563" }}>
              <span className="flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-forest" /> Paiement en 1×, 2×, 3× ou 4× sans frais
                <AlmaLogo className="h-3.5 ml-0.5" />
              </span>
              <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-forest" /> Prochaine session : mars 2026</span>
            </motion.p>
          </div>

          {/* Right column — photo with C3 reinforced frame */}
          <motion.div
            {...heroAnim(200, "left")}
            className="lg:col-span-2 relative hidden lg:block"
          >
            {/* C3 Option A — Reinforced decorative frame */}
            <div
              className="absolute pointer-events-none"
              style={{
                bottom: -20,
                right: -20,
                top: 0,
                left: 0,
                border: "3px solid rgba(243,156,18,0.3)",
                borderRadius: 24,
                background: "rgba(243,156,18,0.03)",
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

            {/* Floating card — C5 popIn delay 600ms */}
            <motion.div
              {...heroAnim(600, "pop")}
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

      {/* Transition gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[60px] pointer-events-none"
        style={{ background: "linear-gradient(180deg, transparent 0%, #FFFFFF 100%)" }}
      />
    </section>
  );
};

export default HeroSection;
