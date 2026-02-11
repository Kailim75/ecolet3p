import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, MapPin, UserCheck } from "lucide-react";

const smoothEase = [0.22, 1, 0.36, 1] as const;

const reasons = [
  {
    icon: TrendingUp,
    title: "Taux de réussite supérieur à la moyenne",
    description: "94% de nos élèves obtiennent leur carte professionnelle dès le premier passage grâce à notre méthode pédagogique éprouvée.",
  },
  {
    icon: MapPin,
    title: "Centre à Montrouge, 5 min du métro",
    description: "Facilement accessible depuis tout le sud de Paris et les Hauts-de-Seine. Métro Mairie de Montrouge, ligne 4.",
  },
  {
    icon: UserCheck,
    title: "Suivi post-formation jusqu'à la carte pro",
    description: "Nous vous accompagnons après la formation : démarches administratives, création d'entreprise, obtention de votre carte professionnelle.",
  },
];

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: smoothEase } }
};

const WhyChooseUsSection = () => {
  return (
    <section className="py-20 md:py-24" style={{ backgroundColor: "#F8F9FA" }}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="text-center mb-14"
        >
          <h2 className="font-serif text-[28px] md:text-[36px] mb-4" style={{ color: "#1A1A1A" }}>
            Pourquoi choisir ECOLE T3P ?
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                variants={staggerItem}
                className="flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5" style={{ backgroundColor: "#E8F5E9" }}>
                  <Icon className="w-7 h-7 text-forest" />
                </div>
                <h3 className="text-base font-bold mb-2" style={{ color: "#1A1A1A" }}>{reason.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#777" }}>{reason.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
