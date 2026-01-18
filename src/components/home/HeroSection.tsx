import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform, type Easing } from "framer-motion";
import { Award, Users, CreditCard } from "lucide-react";
import { useRef } from "react";

const smoothEase: Easing = [0.22, 1, 0.36, 1];

const stats = [
  { icon: Award, value: "96%", label: "de réussite" },
  { icon: Users, value: "10 000+", label: "élèves formés" },
  { icon: CreditCard, value: "Paiement 4x", label: "sans frais" },
];

const staggerContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const staggerItemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: smoothEase }
  }
};

const HeroSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-[90vh] flex items-center hero-bg overflow-hidden pt-20">
      {/* Vertical text */}
      <motion.div 
        className="hidden xl:block absolute left-8 top-1/2 -translate-y-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <span 
          className="text-forest/20 font-black text-sm uppercase tracking-[0.3em] block"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          T3P CAMPUS
        </span>
      </motion.div>

      <motion.div style={{ y, opacity }} className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="max-w-xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: smoothEase }}
              className="mb-6"
            >
              <span className="badge-livementor">
                <motion.span 
                  className="w-2 h-2 bg-gold rounded-full"
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                Inscriptions ouvertes
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: smoothEase }}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-forest uppercase leading-[1.05] tracking-tight mb-6"
            >
              Des formations pour{" "}
              <motion.span 
                className="text-gold inline-block"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: smoothEase }}
              >
                devenir chauffeur
              </motion.span>{" "}
              et réussir
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: smoothEase }}
              className="text-lg md:text-xl text-warm-gray-600 leading-relaxed mb-8"
            >
              Un accompagnement personnalisé pour obtenir votre carte professionnelle TAXI, VTC ou VMDTR.
            </motion.p>

            {/* Stats */}
            <motion.div
              variants={staggerContainerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-6 mb-10"
            >
              {stats.map((stat, index) => (
                <motion.div 
                  key={index} 
                  variants={staggerItemVariants}
                  className="flex items-center gap-3"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <div className="w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-forest" />
                  </div>
                  <div>
                    <span className="font-black text-forest text-lg">{stat.value}</span>
                    <span className="text-warm-gray-500 text-sm ml-1">{stat.label}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: smoothEase }}
            >
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button asChild className="btn-primary">
                  <Link to="/contact">DÉCOUVRIR NOS FORMATIONS</Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="mt-10 flex items-center gap-4 text-sm text-warm-gray-500"
            >
              {["Certifications RS5635 & RS5637", "Centre agréé"].map((text, i) => (
                <motion.div 
                  key={text}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + i * 0.1, duration: 0.4 }}
                >
                  <span className="w-5 h-5 rounded-full bg-forest flex items-center justify-center text-cream text-xs">✓</span>
                  <span>{text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: smoothEase }}
            className="relative hidden lg:block"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <motion.img
                src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&h=700&fit=crop"
                alt="Chauffeur professionnel"
                className="w-full h-[600px] object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/60 via-transparent to-transparent" />
              
              <motion.div 
                className="absolute bottom-6 right-6 left-6 bg-cream-light/95 backdrop-blur-sm rounded-xl p-5"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-forest flex items-center justify-center text-cream font-bold text-xl">
                    MB
                  </div>
                  <div>
                    <p className="font-bold text-forest">Mohamed B.</p>
                    <p className="text-warm-gray-600 text-sm">Chauffeur VTC • Alumni T3P Campus</p>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 1, type: "spring", stiffness: 200 }}
              whileHover={{ y: -5 }}
              className="absolute -left-8 top-1/4 bg-card rounded-xl shadow-xl p-5 border border-border"
            >
              <motion.p 
                className="stat-number mb-1"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.2, type: "spring", stiffness: 300 }}
              >
                87%
              </motion.p>
              <p className="text-sm text-warm-gray-600 max-w-[140px]">
                des entreprises créées existent toujours 3 ans après
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute top-20 right-0 w-1/3 h-full bg-forest/5 -skew-x-12 transform origin-top-right" />
    </section>
  );
};

export default HeroSection;
