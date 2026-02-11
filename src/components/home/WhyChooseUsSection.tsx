import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, MapPin, UserCheck, CreditCard } from "lucide-react";

const smoothEase = [0.22, 1, 0.36, 1] as const;

const reasons = [
  {
    icon: TrendingUp,
    stat: "94%",
    title: "Taux de réussite supérieur à la moyenne",
    description: "94% de nos élèves obtiennent leur carte professionnelle dès le premier passage grâce à notre méthode pédagogique éprouvée.",
  },
  {
    icon: MapPin,
    stat: "5 min",
    title: "Centre à Montrouge, 5 min du métro",
    description: "Facilement accessible depuis tout le sud de Paris et les Hauts-de-Seine. Métro Mairie de Montrouge, ligne 4.",
  },
  {
    icon: UserCheck,
    stat: "100%",
    title: "Suivi post-formation jusqu'à la carte pro",
    description: "Nous vous accompagnons après la formation : démarches administratives, création d'entreprise, obtention de votre carte professionnelle.",
  },
  {
    icon: CreditCard,
    stat: "4x",
    title: "Paiement en 4x sans frais",
    description: "Facilitez votre accès à la formation avec notre solution de paiement échelonné. Aucun frais supplémentaire.",
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
    <section className="py-16 md:py-20" style={{ backgroundColor: "#0F2A1D" }}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="text-center mb-14"
        >
          <h2 className="font-serif text-[28px] md:text-[36px] font-extrabold mb-4 text-white">
            Pourquoi choisir ECOLE T3P ?
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                variants={staggerItem}
                className="flex flex-col items-center text-center"
              >
                {/* Stat number */}
                <span className="text-3xl font-extrabold mb-3" style={{ color: "#D4A853" }}>{reason.stat}</span>

                {/* Icon */}
                <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: "rgba(212,168,83,0.15)" }}>
                  <Icon className="w-6 h-6" style={{ color: "#D4A853" }} />
                </div>

                {/* Title with gold underline */}
                <h3 className="text-base font-bold text-white mb-2 pb-2 border-b-2" style={{ borderColor: "#D4A853" }}>
                  {reason.title}
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed" style={{ color: "#D1D5DB" }}>{reason.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
