import { Link } from "react-router-dom";
import { ArrowRight, Eye, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import formationSession from "@/assets/center/formation-session.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen lg:min-h-[70vh] flex items-center bg-primary pt-20 lg:pt-16">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${formationSession})`, filter: "blur(3px) brightness(0.4)" }}
      />
      {/* Green overlay */}
      <div className="absolute inset-0 bg-primary/70" />
      
      <div className="container-custom relative z-10 py-12 lg:py-20">
        <div className="max-w-3xl">
          <h1 className="text-[28px] md:text-[40px] lg:text-[52px] font-bold text-white leading-tight mb-6">
            Devenez chauffeur professionnel à 990€ tout compris.
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
              Je m'inscris
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
        </div>

        {/* Floating badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-8 right-5 lg:right-12 lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2"
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
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
      </div>
    </section>
  );
};

export default HeroSection;
