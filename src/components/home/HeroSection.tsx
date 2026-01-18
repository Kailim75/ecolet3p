import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Trophy, Users, CreditCard } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { icon: Trophy, value: "96%", label: "de réussite" },
  { icon: Users, value: "10 000+", label: "élèves formés" },
  { icon: CreditCard, value: "Paiement 4x", label: "sans frais" },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-cream" />
      
      {/* Subtle pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #0F4C81 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />

      {/* Decorative shapes */}
      <motion.div 
        className="absolute top-32 right-10 w-64 h-64 bg-orange/5 rounded-full blur-3xl"
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-20 left-10 w-80 h-80 bg-navy/5 rounded-full blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.6, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="badge-success">
                <span className="w-2 h-2 rounded-full bg-green-success animate-pulse" />
                Inscriptions ouvertes
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-warm-gray-900 mt-6 mb-4 leading-tight"
            >
              Devenez Chauffeur{" "}
              <span className="text-gradient-navy">Professionnel</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-xl text-navy font-semibold mb-2"
            >
              TAXI • VTC • VMDTR
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-warm-gray-600 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              Formation d'excellence à Montrouge avec <strong className="text-orange">96% de réussite</strong>. 
              Rejoignez 10 000+ professionnels formés depuis 2014.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex flex-wrap justify-center lg:justify-start gap-6 mb-8"
            >
              {stats.map((stat, index) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange/10 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-orange" />
                  </div>
                  <div className="text-left">
                    <div className="text-lg font-bold text-warm-gray-900">{stat.value}</div>
                    <div className="text-sm text-warm-gray-600">{stat.label}</div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
            >
              <Button asChild className="btn-primary-lg">
                <Link to="/contact" className="flex items-center gap-2">
                  Prendre rendez-vous
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild className="btn-secondary px-6 py-3">
                <Link to="/formations">Voir nos formations</Link>
              </Button>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-warm-gray-600"
            >
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-success" />
                Certifications RS5635 & RS5637
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-success" />
                Centre agréé
              </div>
            </motion.div>
          </div>

          {/* Visual Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Main visual card */}
              <div className="bg-white rounded-3xl shadow-warm-lg p-8 border border-warm-gray-100">
                <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-navy/5 to-orange/5 flex items-center justify-center overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&h=450&fit=crop" 
                    alt="Chauffeur professionnel"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
                
                {/* Floating stats card */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-lg p-5 border border-warm-gray-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-green-success/10 flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-green-success" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-warm-gray-900">96%</div>
                      <div className="text-sm text-warm-gray-600">Taux de réussite</div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating badge */}
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -top-4 -right-4 bg-orange text-white rounded-2xl shadow-orange px-4 py-3"
                >
                  <div className="text-sm font-bold">10 000+</div>
                  <div className="text-xs opacity-90">élèves formés</div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
