import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Mail, Check, Rocket } from "lucide-react";
import { motion } from "framer-motion";

const benefits = [
  "Premier rendez-vous gratuit",
  "Paiement en 4x sans frais",
  "Réponse sous 24h",
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const
    }
  }
};

const CTASection = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container-custom">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[2.5rem] overflow-hidden"
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-gray-900" />
          
          {/* Animated gradient overlay */}
          <motion.div 
            animate={{ 
              backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"]
            }}
            transition={{ 
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute inset-0 opacity-30"
            style={{
              background: "linear-gradient(135deg, rgba(249, 115, 22, 0.3) 0%, transparent 25%, rgba(59, 130, 246, 0.2) 50%, transparent 75%, rgba(249, 115, 22, 0.2) 100%)",
              backgroundSize: "200% 200%",
            }}
          />

          {/* Pattern overlay */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)`,
              backgroundSize: '32px 32px'
            }}
          />

          {/* Decorative orbs */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-0 right-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.25, 0.2]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl"
          />

          {/* Content */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="relative px-8 py-20 md:px-16 md:py-28 text-center"
          >
            {/* Icon */}
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-orange-500 to-orange-400 shadow-lg shadow-orange-500/30 mb-8"
            >
              <motion.div
                animate={{ 
                  y: [0, -5, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Rocket className="w-10 h-10 text-white" />
              </motion.div>
            </motion.div>

            {/* Title */}
            <motion.h2 
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight"
            >
              Prêt à Démarrer Votre<br />
              <span className="text-orange-400">Nouvelle Carrière</span> ?
            </motion.h2>

            {/* Subtitle */}
            <motion.p 
              variants={itemVariants}
              className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Rejoignez les 10 000 élèves qui ont transformé leur vie professionnelle avec T3P Campus
            </motion.p>

            {/* Benefits */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap items-center justify-center gap-6 mb-10"
            >
              {benefits.map((benefit, index) => (
                <motion.div 
                  key={benefit} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  className="flex items-center gap-2 text-white/80"
                >
                  <motion.div 
                    whileHover={{ scale: 1.2 }}
                    className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center"
                  >
                    <Check className="w-4 h-4 text-green-400" />
                  </motion.div>
                  <span className="font-medium">{benefit}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            >
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  asChild
                  size="lg"
                  className="btn-premium-orange text-base px-10 py-7 rounded-full"
                >
                  <Link to="/contact" className="flex items-center gap-3">
                    <Phone className="w-5 h-5" />
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
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm text-base px-10 py-7 rounded-full transition-all duration-300"
                >
                  <Link to="/contact" className="flex items-center gap-3">
                    <Mail className="w-5 h-5" />
                    Nous contacter
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Direct contact */}
            <motion.div 
              variants={itemVariants}
              className="border-t border-white/10 pt-8"
            >
              <p className="text-white/50 mb-4">Ou contactez-nous directement :</p>
              <div className="flex flex-wrap items-center justify-center gap-8">
                <motion.a
                  whileHover={{ scale: 1.05, color: "#fb923c" }}
                  href="tel:0188750555"
                  className="flex items-center gap-2 text-white transition-colors group"
                >
                  <Phone className="w-5 h-5" />
                  <span className="font-bold text-lg">01 88 75 05 55</span>
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05, color: "#fb923c" }}
                  href="mailto:dropacademymontrouge@gmail.com"
                  className="flex items-center gap-2 text-white transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span className="font-semibold">dropacademymontrouge@gmail.com</span>
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
