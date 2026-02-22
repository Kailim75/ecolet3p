import { Link } from "react-router-dom";
import { ArrowRight, Eye, Trophy, Star, FileSearch } from "lucide-react";
import { motion } from "framer-motion";
const formationSession = "/images/hero-formation-session.jpg";
import { useIsMobile } from "@/hooks/use-mobile";

const HeroSection = () => {
  const isMobile = useIsMobile();

  const floatAnimation = isMobile ? {} : { y: [0, -6, 0] };
  const floatTransition = isMobile ? {} : { duration: 3, repeat: Infinity, ease: "easeInOut" as const };
  const floatAnimation2 = isMobile ? {} : { y: [0, -5, 0] };
  const floatTransition2 = isMobile ? {} : { duration: 3.5, repeat: Infinity, ease: "easeInOut" as const, delay: 0.5 };

  return (
    <section className="relative min-h-screen lg:min-h-[70vh] flex items-center bg-primary pt-20 lg:pt-16">
      {/* Background image — real <img> for LCP optimization */}
      <img
        src={formationSession}
        alt="Session de formation Taxi VTC en salle à l'ECOLE T3P Montrouge"
        width={1920}
        height={1080}
        fetchPriority="high"
        loading="eager"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover blur-[3px] brightness-[0.4]"
      />
      {/* Green overlay */}
      <div className="absolute inset-0 bg-primary/70" />
      
      <div className="container-custom relative z-10 py-12 lg:py-20">
        <div className="max-w-3xl lg:max-w-[55%]">
          <h1 className="text-[28px] md:text-[40px] lg:text-[52px] font-bold text-white leading-tight mb-6">
            Devenez chauffeur professionnel à partir de 990€.
          </h1>
          <p className="text-white/80 text-base md:text-lg lg:text-xl mb-8 max-w-2xl leading-relaxed">
            Formation VTC, Taxi ou VMDTR. 3 formats au choix : Journée, Soir ou E-learning. 
            Accompagnement de A à Z.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/contact"
              className="btn-cta-orange px-8 py-4 text-base font-bold rounded-lg inline-flex items-center justify-center gap-2"
            >
              Réserver ma place
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="#formations"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border-2 border-white text-white font-bold text-base hover:bg-white hover:text-primary transition-all duration-300"
            >
              <Eye className="w-5 h-5" />
              Voir les formations
            </a>
          </div>
          <Link
            to="/audit-rentabilite"
            className="inline-flex items-center gap-2 mt-4 text-accent font-semibold text-sm hover:underline transition-all"
          >
            <FileSearch className="w-4 h-4" />
            Audit de rentabilité gratuit →
            <motion.span
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="ml-1 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-accent text-accent-foreground rounded-full"
            >
              Nouveau
            </motion.span>
          </Link>

          {/* Badges — inline on mobile, floating on desktop */}
          <div className="flex flex-row gap-3 mt-6 lg:hidden">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white/95 backdrop-blur-sm rounded-2xl p-3 shadow-card-hover flex items-center gap-2.5 flex-1"
            >
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                <Trophy className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-xl font-bold text-primary leading-none">94%</p>
                <p className="text-[10px] text-muted-foreground font-medium">de réussite</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white/95 backdrop-blur-sm rounded-2xl p-3 shadow-card-hover flex items-center gap-2.5 flex-1"
            >
              <div className="flex flex-col items-center gap-0.5">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <span className="text-base font-bold text-primary leading-none">5.0/5</span>
              </div>
              <div>
                <p className="text-xs font-bold text-primary leading-tight">359 avis</p>
                <p className="text-[10px] text-muted-foreground font-medium">Google</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Floating badges — desktop only */}
        <div className="hidden lg:flex absolute right-12 top-1/2 -translate-y-1/2 flex-col gap-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              animate={floatAnimation}
              transition={floatTransition}
              className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-card-hover flex items-center gap-3"
            >
              <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary leading-none">94%</p>
                <p className="text-xs text-muted-foreground font-medium">de réussite</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              animate={floatAnimation2}
              transition={floatTransition2}
              className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-card-hover flex items-center gap-3"
            >
              <div className="flex flex-col items-center gap-0.5">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <span className="text-lg font-bold text-primary leading-none">5.0/5</span>
              </div>
              <div>
                <p className="text-sm font-bold text-primary leading-tight">359 avis</p>
                <p className="text-xs text-muted-foreground font-medium">Google</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
