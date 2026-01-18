import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Trophy, Calendar, Users, CreditCard, ChevronDown, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { icon: Trophy, value: "96%", label: "de réussite", color: "from-orange-500 to-orange-400" },
  { icon: Calendar, value: "10 ans", label: "d'expérience", color: "from-blue-500 to-blue-400" },
  { icon: Users, value: "10 000+", label: "élèves formés", color: "from-emerald-500 to-emerald-400" },
  { icon: CreditCard, value: "4x", label: "sans frais", color: "from-purple-500 to-purple-400" },
];

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  })
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.3
    }
  }
};

const statVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 gradient-hero" />
      
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-15"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1920&h=1080&fit=crop')"
        }}
      />

      {/* Animated gradient overlay */}
      <div 
        className="absolute inset-0 opacity-30 animate-gradient"
        style={{
          background: "linear-gradient(135deg, rgba(30, 64, 175, 0.4) 0%, rgba(59, 130, 246, 0.2) 25%, rgba(249, 115, 22, 0.1) 50%, rgba(30, 64, 175, 0.3) 100%)",
          backgroundSize: "200% 200%",
        }}
      />
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)`,
          backgroundSize: '48px 48px'
        }}
      />

      {/* Decorative gradient orbs */}
      <motion.div 
        className="absolute top-20 -left-32 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"
        animate={{ 
          y: [0, -20, 0],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-20 -right-32 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl"
        animate={{ 
          y: [0, 20, 0],
          opacity: [0.2, 0.35, 0.2]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl" />
      
      {/* Content */}
      <div className="container-custom relative z-10 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center lg:text-left lg:mx-0">
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2.5 mb-8"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500" />
            </span>
            <span className="text-sm font-medium text-white/90 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-orange-400" />
              Inscriptions ouvertes — Centre agréé RS5635 & RS5637
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1 
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-[1.1]"
          >
            Devenez Chauffeur{" "}
            <span className="relative inline-block">
              <span className="text-gradient-orange">Professionnel</span>
              <motion.svg 
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
                className="absolute -bottom-2 left-0 w-full" 
                viewBox="0 0 200 8" 
                fill="none"
              >
                <motion.path 
                  d="M2 6c40-4 80-4 120 0s60 4 76 0" 
                  stroke="url(#underline-gradient)" 
                  strokeWidth="3" 
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
                />
                <defs>
                  <linearGradient id="underline-gradient" x1="0" y1="0" x2="200" y2="0">
                    <stop stopColor="#f97316" />
                    <stop offset="1" stopColor="#fb923c" />
                  </linearGradient>
                </defs>
              </motion.svg>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            className="text-lg md:text-xl lg:text-2xl text-white/70 mb-8 leading-relaxed max-w-2xl"
          >
            <span className="text-white font-semibold">TAXI • VTC • VMDTR</span> — Formation d'excellence à Montrouge. 
            Rejoignez les 10 000 chauffeurs qui nous font confiance.
          </motion.p>

          {/* Stats */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={statVariants}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 text-center hover:bg-white/10 hover:border-white/20 transition-all duration-500 cursor-default"
              >
                {/* Glow effect on hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl`} />
                
                <div className={`w-10 h-10 mx-auto mb-3 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-2xl md:text-3xl font-black text-white mb-1">{stat.value}</div>
                <div className="text-xs text-white/60 font-medium uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div 
            custom={4}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                asChild
                size="lg"
                className="btn-premium-orange text-base px-8 py-6 rounded-full"
              >
                <Link to="/contact" className="flex items-center gap-3">
                  <span className="text-lg">📞</span>
                  Prendre rendez-vous
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30 backdrop-blur-sm text-base px-8 py-6 rounded-full transition-all duration-300"
              >
                <Link to="/formations" className="flex items-center gap-2">
                  Voir nos formations
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-white/40 text-xs font-medium uppercase tracking-widest">Découvrir</span>
          <ChevronDown className="w-5 h-5 text-white/40 mx-auto mt-1" />
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
};

export default HeroSection;
