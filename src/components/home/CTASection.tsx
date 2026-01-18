import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Mail, Check } from "lucide-react";
import { motion } from "framer-motion";

const benefits = [
  "Premier rendez-vous gratuit",
  "Paiement en 4x sans frais",
  "Réponse sous 24h",
];

const CTASection = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-hero" />
      
      {/* Pattern overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />

      {/* Decorative shapes */}
      <motion.div 
        className="absolute top-10 right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-10 left-10 w-80 h-80 bg-orange/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          {/* Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Prêt à démarrer votre nouvelle carrière ?
          </h2>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
            Rejoignez les 10 000 élèves qui ont transformé leur vie professionnelle avec T3P Campus
          </p>

          {/* Benefits */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-2 text-white/90">
                <div className="w-5 h-5 rounded-full bg-green-success/30 flex items-center justify-center">
                  <Check className="w-3 h-3 text-green-success" />
                </div>
                <span className="font-medium">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                asChild
                size="lg"
                className="bg-orange hover:bg-orange-dark text-white font-semibold px-8 py-6 rounded-xl shadow-orange text-lg"
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
                className="bg-white/10 border-2 border-white/30 text-white hover:bg-white/20 font-semibold px-8 py-6 rounded-xl text-lg"
              >
                <Link to="/contact" className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Nous contacter
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Direct contact */}
          <div className="pt-8 border-t border-white/20">
            <p className="text-white/60 mb-4 text-sm">Ou contactez-nous directement :</p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <a
                href="tel:0188750555"
                className="flex items-center gap-2 text-white hover:text-orange-light transition-colors font-semibold"
              >
                <Phone className="w-5 h-5" />
                01 88 75 05 55
              </a>
              <a
                href="mailto:dropacademymontrouge@gmail.com"
                className="flex items-center gap-2 text-white hover:text-orange-light transition-colors font-semibold"
              >
                <Mail className="w-5 h-5" />
                dropacademymontrouge@gmail.com
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
