import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform, type Easing } from "framer-motion";
import { Phone, Mail, Check } from "lucide-react";
import { useRef } from "react";

const smoothEase: Easing = [0.22, 1, 0.36, 1];
const benefits = ["Premier rendez-vous gratuit", "Paiement 4x sans frais", "Réponse sous 24h"];

const staggerContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};

const staggerItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: smoothEase } }
};

const CTASection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section ref={containerRef} className="relative py-20 md:py-28 overflow-hidden gradient-hero">
      <motion.div style={{ y: y1 }} className="absolute top-0 left-0 w-64 h-64 bg-forest-light/20 rounded-full blur-3xl" />
      <motion.div style={{ y: y2 }} className="absolute bottom-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: smoothEase }}
            className="text-3xl md:text-4xl lg:text-5xl font-black text-cream uppercase leading-tight mb-6"
          >
            Prêt à démarrer votre{" "}
            <motion.span 
              className="text-gold inline-block"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            >
              nouvelle carrière
            </motion.span> ?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl text-cream/80 mb-8"
          >
            Rejoignez les 10 000 élèves qui ont transformé leur vie avec T3P Campus
          </motion.p>

          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4 md:gap-8 mb-10"
          >
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index} 
                variants={staggerItemVariants}
                className="flex items-center gap-2 text-cream/90"
                whileHover={{ scale: 1.05, x: 5 }}
              >
                <motion.span 
                  className="w-5 h-5 rounded-full bg-gold flex items-center justify-center"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1, type: "spring" }}
                >
                  <Check className="w-3 h-3 text-forest" />
                </motion.span>
                <span className="font-medium">{benefit}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-4 mb-10"
          >
            <motion.div whileHover={{ scale: 1.02, y: -3 }} whileTap={{ scale: 0.98 }}>
              <Button asChild className="bg-gold text-forest font-bold px-8 py-4 rounded-md hover:bg-gold-light text-sm uppercase tracking-wide">
                <Link to="/contact"><Phone className="w-4 h-4 mr-2" />PRENDRE RENDEZ-VOUS</Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02, y: -3 }} whileTap={{ scale: 0.98 }}>
              <Button asChild className="bg-transparent border-2 border-cream text-cream font-bold px-8 py-4 rounded-md hover:bg-cream hover:text-forest text-sm uppercase tracking-wide">
                <Link to="/contact"><Mail className="w-4 h-4 mr-2" />NOUS CONTACTER</Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center"
          >
            <p className="text-cream/60 text-sm mb-3">Ou contactez-nous directement :</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8">
              <motion.a href="tel:0188750555" className="text-cream hover:text-gold font-semibold" whileHover={{ scale: 1.05 }}>
                📞 01 88 75 05 55
              </motion.a>
              <motion.a href="mailto:dropacademymontrouge@gmail.com" className="text-cream hover:text-gold font-semibold" whileHover={{ scale: 1.05 }}>
                ✉️ dropacademymontrouge@gmail.com
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
