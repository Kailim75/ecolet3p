import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Award, Users, CreditCard } from "lucide-react";

const stats = [
  { icon: Award, value: "96%", label: "de réussite" },
  { icon: Users, value: "10 000+", label: "élèves formés" },
  { icon: CreditCard, value: "Paiement 4x", label: "sans frais" },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center hero-bg overflow-hidden pt-20">
      {/* Vertical text - LiveMentor style */}
      <div className="hidden xl:block absolute left-8 top-1/2 -translate-y-1/2 z-10">
        <span 
          className="text-forest/20 font-black text-sm uppercase tracking-[0.3em] block"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          T3P CAMPUS
        </span>
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="max-w-xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <span className="badge-livementor">
                <span className="w-2 h-2 bg-gold rounded-full animate-pulse"></span>
                Inscriptions ouvertes
              </span>
            </motion.div>

            {/* Title - LiveMentor condensed uppercase style */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-forest uppercase leading-[1.05] tracking-tight mb-6"
            >
              Des formations pour{" "}
              <span className="text-gold">devenir chauffeur</span>{" "}
              et réussir
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-warm-gray-600 leading-relaxed mb-8"
            >
              Un accompagnement personnalisé pour obtenir votre carte professionnelle TAXI, VTC ou VMDTR et commencer à vivre de votre activité.
            </motion.p>

            {/* Stats - Inline like LiveMentor */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-6 mb-10"
            >
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-forest" />
                  </div>
                  <div>
                    <span className="font-black text-forest text-lg">{stat.value}</span>
                    <span className="text-warm-gray-500 text-sm ml-1">{stat.label}</span>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTA Button - LiveMentor style */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button asChild className="btn-primary">
                <Link to="/contact">DÉCOUVRIR NOS FORMATIONS</Link>
              </Button>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-10 flex items-center gap-4 text-sm text-warm-gray-500"
            >
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-forest flex items-center justify-center text-cream text-xs">✓</span>
                <span>Certifications RS5635 & RS5637</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-forest flex items-center justify-center text-cream text-xs">✓</span>
                <span>Centre agréé</span>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&h=700&fit=crop"
                alt="Chauffeur professionnel"
                className="w-full h-[600px] object-cover"
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-forest/60 via-transparent to-transparent" />
              
              {/* Bottom card on image */}
              <div className="absolute bottom-6 right-6 left-6 bg-cream-light/95 backdrop-blur-sm rounded-xl p-5">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-forest flex items-center justify-center text-cream font-bold text-xl">
                    MB
                  </div>
                  <div>
                    <p className="font-bold text-forest">Mohamed B.</p>
                    <p className="text-warm-gray-600 text-sm">Chauffeur VTC • Alumni T3P Campus</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute -left-8 top-1/4 bg-card rounded-xl shadow-xl p-5 border border-border"
            >
              <p className="stat-number mb-1">87%</p>
              <p className="text-sm text-warm-gray-600 max-w-[140px]">
                des entreprises créées existent toujours 3 ans après
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Decorative shape */}
      <div className="absolute top-20 right-0 w-1/3 h-full bg-forest/5 -skew-x-12 transform origin-top-right" />
    </section>
  );
};

export default HeroSection;
