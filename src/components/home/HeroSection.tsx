import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Star, Check, ArrowRight, Users, Moon, Sun, Monitor, Phone } from "lucide-react";
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

type ScheduleOption = "soiree" | "journee" | "elearning";

const scheduleOptions: { key: ScheduleOption; emoji: React.ReactNode; label: string; detail: string }[] = [
  { key: "soiree", emoji: <Moon className="w-4 h-4" />, label: "Soirée", detail: "2 sem." },
  { key: "journee", emoji: <Sun className="w-4 h-4" />, label: "Journée", detail: "40h" },
  { key: "elearning", emoji: <Monitor className="w-4 h-4" />, label: "E-learning", detail: "À votre rythme" },
];

const formations = [
  { emoji: "🚕", title: "Taxi", color: "#D35400", bgColor: "rgba(211,84,0,0.06)", link: "/formations/taxi" },
  { emoji: "🚗", title: "VTC", color: "#1E8449", bgColor: "rgba(30,132,73,0.06)", link: "/formations/vtc" },
  { emoji: "🏍️", title: "VMDTR", color: "#1A5276", bgColor: "rgba(26,82,118,0.06)", link: "/formations/vmdtr" },
];

const HeroSection = () => {
  const [selectedSchedule, setSelectedSchedule] = useState<ScheduleOption>("soiree");

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
      {/* Warm glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: -150, right: -100, width: 500, height: 500, borderRadius: "50%",
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
            {/* Badge */}
            <motion.div {...heroAnim(0)} className="mb-2 md:mb-4">
              <span
                className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium border"
                style={{ backgroundColor: "rgba(27,77,62,0.06)", borderColor: "rgba(27,77,62,0.15)", color: "#1B4D3E" }}
              >
                <Check className="w-3.5 h-3.5 md:w-4 md:h-4" />
                Agréé Préfecture 92
              </span>
            </motion.div>

            {/* H1 — New wording */}
            <motion.h1
              {...heroAnim(80)}
              className="font-serif leading-[1.15] tracking-tight mb-3 md:mb-5"
              style={{
                color: "#1A1A1A",
                fontSize: "clamp(1.55rem, 5vw, 52px)",
                fontWeight: 900,
                textShadow: "0 2px 4px rgba(0,0,0,0.04)",
              }}
            >
              Centre expert en préparation{" "}
              <span style={{ color: "#1B4332" }}>T3P</span>
              <br className="hidden sm:block" />
              <span className="text-[0.85em]" style={{ fontWeight: 800 }}>
                {" "}— <span style={{ color: "#D35400" }}>Taxi</span>,{" "}
                <span style={{ color: "#1E8449" }}>VTC</span>,{" "}
                <span style={{ color: "#1A5276" }}>VMDTR</span>
              </span>
            </motion.h1>

            {/* Subtitle — New wording */}
            <motion.div {...heroAnim(160)} className="mb-4 md:mb-5 max-w-[600px]">
              <p className="text-[0.95rem] md:text-lg font-semibold mb-1" style={{ color: "#1B4332" }}>
                94% de réussite au premier passage — +2000 conducteurs accompagnés depuis 2014
              </p>
              <p className="text-[0.8rem] md:text-[15px]" style={{ color: "#666" }}>
                Formation agréée à Montrouge (92) · De l'inscription à votre carte professionnelle
              </p>
            </motion.div>

            {/* Google Reviews */}
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

            {/* Two CTAs side by side */}
            <motion.div {...heroAnim(320)} className="flex flex-col sm:flex-row gap-3 mb-4">
              <Button
                asChild
                className="relative overflow-hidden btn-cta-orange px-6 sm:px-9 py-4 text-sm sm:text-base rounded-xl w-full sm:w-auto cta-shimmer group/btn"
                style={{ backgroundColor: "#E8793A", boxShadow: "0 6px 24px rgba(232,121,58,0.4)", transition: "all 300ms ease" }}
              >
                <Link to="/contact" aria-label="Réserver ma place à la prochaine session">
                  Réserver ma place
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover/btn:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="px-6 sm:px-8 py-4 text-sm sm:text-base rounded-xl font-bold w-full sm:w-auto transition-all duration-300"
                style={{ borderColor: "#1B4332", color: "#1B4332" }}
              >
                <Link to="/contact" aria-label="Être rappelé sous 24 heures">
                  <Phone className="w-4 h-4 mr-2" />
                  Être rappelé sous 24h
                </Link>
              </Button>
            </motion.div>

            {/* Places progress bar */}
            <motion.div {...heroAnim(400)} className="mb-4 max-w-md">
              <PlacesProgressBar />
            </motion.div>

            {/* Mini-cards formations with schedule selection */}
            <motion.div
              {...heroAnim(480)}
              className="flex flex-col min-[480px]:flex-row min-[480px]:overflow-x-auto sm:grid sm:grid-cols-3 gap-3 mb-3 sm:overflow-visible snap-x snap-mandatory pb-2 sm:pb-0 -mx-1 px-1"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {formations.map((f) => (
                <Link
                  key={f.title}
                  to={f.link}
                  className="group flex items-center gap-3 bg-white border border-border/60 rounded-xl transition-all duration-200 min-w-0 min-[480px]:min-w-[180px] sm:min-w-0 snap-start flex-shrink-0 sm:flex-shrink cursor-pointer"
                  style={{ padding: "14px 16px" }}
                  aria-label={`Formation ${f.title}`}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.borderColor = f.color;
                    el.style.borderLeftWidth = "3px";
                    el.style.borderLeftColor = f.color;
                    el.style.boxShadow = "0 4px 12px rgba(0,0,0,0.06)";
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
                    <p className="font-semibold text-sm" style={{ color: "#1A1A1A" }}>Formation {f.title}</p>
                    <p className="text-xs" style={{ color: "#6B7280" }}>dès 990€</p>
                  </div>
                </Link>
              ))}
            </motion.div>

            {/* Schedule selector */}
            <motion.div {...heroAnim(520)} className="mb-4">
              <div className="flex flex-col min-[480px]:flex-row flex-wrap gap-3">
                {scheduleOptions.map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => setSelectedSchedule(opt.key)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200"
                    style={{
                      backgroundColor: selectedSchedule === opt.key ? "#1B4332" : "white",
                      color: selectedSchedule === opt.key ? "white" : "#4B5563",
                      borderColor: selectedSchedule === opt.key ? "#1B4332" : "rgba(0,0,0,0.1)",
                    }}
                    aria-label={`Option ${opt.label} — ${opt.detail}`}
                    aria-pressed={selectedSchedule === opt.key}
                  >
                    {opt.emoji}
                    {opt.label} — {opt.detail}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Alma payment line */}
            <motion.div {...heroAnim(560)} className="flex items-center gap-2 flex-wrap">
              <span className="text-sm" style={{ color: "#4B5563" }}>
                Paiement en 4× sans frais avec
              </span>
              <AlmaLogo className="h-4" />
              <span className="text-sm font-bold" style={{ color: "#1B4332" }}>
                — 247,50€/mois
              </span>
            </motion.div>
          </div>

          {/* Right column — photo (desktop) */}
          <motion.div
            {...heroAnim(200, "left")}
            className="lg:col-span-2 relative hidden lg:block"
          >
            <div
              className="absolute pointer-events-none"
              style={{
                bottom: -20, right: -20, top: 0, left: 0,
                border: "3px solid rgba(232,121,58,0.3)",
                borderRadius: 24,
                background: "rgba(232,121,58,0.03)",
                zIndex: 0,
              }}
            />
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{ boxShadow: "0 24px 48px rgba(0,0,0,0.15)", borderRadius: 24, zIndex: 1 }}
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

            {/* Floating card */}
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
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(27,67,50,0.1)" }}>
                  <Users className="w-5 h-5" style={{ color: "#1B4332" }} />
                </div>
                <div>
                  <p className="font-bold text-sm" style={{ color: "#1B4332" }}>+2000 chauffeurs formés</p>
                  <p className="text-xs" style={{ color: "#6B7280" }}>depuis 2014</p>
                </div>
              </div>
              <div className="mt-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs" style={{ color: "#6B7280" }}>Taux de réussite</span>
                  <span className="text-xs font-bold" style={{ color: "#1B4332" }}>94%</span>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "94%" }}
                    transition={{ duration: 1.5, delay: 1.2, ease: smoothEase }}
                    className="h-full rounded-full"
                    style={{ background: "linear-gradient(90deg, #1B4332, #E8793A)" }}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Mobile photo — below text */}
          <motion.div
            {...heroAnim(400, "up")}
            className="lg:hidden relative mt-2"
          >
            <div className="relative rounded-xl overflow-hidden" style={{ maxHeight: 250 }}>
              <img
                src={formationSession}
                alt="Session de formation ECOLE T3P à Montrouge"
                className="w-full h-[250px] object-cover rounded-xl"
                loading="eager"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-xl" />
            </div>
            {/* Floating badge mobile */}
            <div
              className="absolute bottom-3 left-3 right-3 flex items-center gap-3 p-3 rounded-xl"
              style={{
                background: "rgba(255,255,255,0.92)",
                backdropFilter: "blur(8px)",
                boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
              }}
            >
              <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: "rgba(27,67,50,0.1)" }}>
                <Users className="w-4 h-4" style={{ color: "#1B4332" }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-xs" style={{ color: "#1B4332" }}>+2000 chauffeurs formés</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px]" style={{ color: "#6B7280" }}>Taux de réussite</span>
                  <span className="text-[10px] font-bold" style={{ color: "#1B4332" }}>94%</span>
                </div>
              </div>
            </div>
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
