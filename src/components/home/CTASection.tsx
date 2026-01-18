import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Phone, Mail, Check } from "lucide-react";

const benefits = ["Premier rendez-vous gratuit", "Paiement 4x sans frais", "Réponse sous 24h"];

const CTASection = () => {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden gradient-hero">
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl lg:text-5xl font-black text-cream uppercase leading-tight mb-6"
          >
            Prêt à démarrer votre{" "}
            <span className="text-gold">nouvelle carrière</span> ?
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl text-cream/80 mb-8"
          >
            Rejoignez les 10 000 élèves qui ont transformé leur vie professionnelle avec T3P Campus
          </motion.p>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 md:gap-8 mb-10"
          >
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 text-cream/90">
                <span className="w-5 h-5 rounded-full bg-gold flex items-center justify-center">
                  <Check className="w-3 h-3 text-forest" />
                </span>
                <span className="font-medium">{benefit}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center gap-4 mb-10"
          >
            <Button
              asChild
              className="bg-gold text-forest font-bold px-8 py-4 rounded-md hover:bg-gold-light transition-all text-sm uppercase tracking-wide"
            >
              <Link to="/contact">
                <Phone className="w-4 h-4 mr-2" />
                PRENDRE RENDEZ-VOUS
              </Link>
            </Button>
            <Button
              asChild
              className="bg-transparent border-2 border-cream text-cream font-bold px-8 py-4 rounded-md hover:bg-cream hover:text-forest transition-all text-sm uppercase tracking-wide"
            >
              <Link to="/contact">
                <Mail className="w-4 h-4 mr-2" />
                NOUS CONTACTER
              </Link>
            </Button>
          </motion.div>

          {/* Direct Contact */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <p className="text-cream/60 text-sm mb-3">Ou contactez-nous directement :</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8">
              <a href="tel:0188750555" className="text-cream hover:text-gold transition-colors font-semibold">
                📞 01 88 75 05 55
              </a>
              <a href="mailto:dropacademymontrouge@gmail.com" className="text-cream hover:text-gold transition-colors font-semibold">
                ✉️ dropacademymontrouge@gmail.com
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-forest-light/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
    </section>
  );
};

export default CTASection;
