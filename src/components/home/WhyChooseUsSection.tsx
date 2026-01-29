import React from "react";
import { motion } from "framer-motion";
import { Award, Users, GraduationCap, CreditCard, Clock, Shield } from "lucide-react";

const smoothEase = [0.22, 1, 0.36, 1] as const;

const reasons = [
  {
    icon: Award,
    title: "94% de Réussite",
    description: "Un taux de réussite exceptionnel grâce à notre méthode pédagogique éprouvée."
  },
  {
    icon: Users,
    title: "2 000+ Élèves Formés",
    description: "Depuis 2014, nous accompagnons les futurs professionnels du transport."
  },
  {
    icon: GraduationCap,
    title: "Formateurs Experts",
    description: "Des formateurs issus du métier, avec une vraie expérience terrain."
  },
  {
    icon: CreditCard,
    title: "Paiement 4x Sans Frais",
    description: "Financez votre formation facilement avec le paiement en plusieurs fois."
  },
  {
    icon: Clock,
    title: "Réponse sous 24h",
    description: "Nous répondons à toutes vos demandes de devis en moins de 24 heures."
  },
  {
    icon: Shield,
    title: "Formation Agréée",
    description: "Formations certifiantes reconnues par les autorités compétentes."
  },
];

const staggerContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
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

const WhyChooseUsSection = () => {
  return (
    <section className="section-padding bg-card relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-forest/5 -skew-x-12 transform origin-top-right" />
      
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: smoothEase }}
          className="text-center mb-16"
        >
          <h2 className="section-title mb-4">Pourquoi nous choisir ?</h2>
          <p className="section-subtitle mx-auto">
            Des avantages concrets pour garantir votre réussite professionnelle
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              variants={staggerItemVariants}
              whileHover={{ 
                y: -8, 
                boxShadow: "0 20px 40px rgba(27, 77, 62, 0.12)"
              }}
              className="flex items-start gap-4 p-6 rounded-xl bg-cream/50 border border-border/30 hover:border-gold/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-forest/10 flex items-center justify-center shrink-0">
                <reason.icon className="w-6 h-6 text-forest" />
              </div>
              <div>
                <h3 className="font-bold text-forest mb-1">{reason.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{reason.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
