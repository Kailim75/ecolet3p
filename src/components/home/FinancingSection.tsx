import React from "react";
import { motion } from "framer-motion";
import { Landmark, Flag, CreditCard } from "lucide-react";

const smoothEase = [0.22, 1, 0.36, 1] as const;

const options = [
  {
    icon: Landmark,
    title: "Compte CPF",
    description: "Utilisez votre solde CPF pour financer tout ou partie de votre formation. Éligible à toutes nos formations initiales.",
    badge: "Éligible CPF",
    badgeBg: "rgba(5,150,105,0.1)",
    badgeColor: "#059669",
    iconBg: "rgba(5,150,105,0.08)",
    iconColor: "#059669",
  },
  {
    icon: Flag,
    title: "France Travail (Pôle Emploi)",
    description: "Demandeurs d'emploi : bénéficiez d'une prise en charge partielle ou totale via l'AIF ou d'autres dispositifs.",
    badge: "France Travail",
    badgeBg: "rgba(37,99,235,0.1)",
    badgeColor: "#2563EB",
    iconBg: "rgba(37,99,235,0.08)",
    iconColor: "#2563EB",
  },
  {
    icon: CreditCard,
    title: "Paiement en 4× sans frais",
    description: "Étalez votre paiement en 4 mensualités sans frais supplémentaires. Exemple : 248€/mois pour la formation à 990€.",
    badge: "4× sans frais",
    badgeBg: "rgba(249,115,22,0.1)",
    badgeColor: "#F97316",
    iconBg: "rgba(249,115,22,0.08)",
    iconColor: "#F97316",
  },
];

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: smoothEase } },
};

const FinancingSection = () => {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="text-center mb-14"
        >
          <h2 className="font-serif text-[28px] md:text-[36px] xl:text-[42px] font-extrabold mb-4" style={{ color: "#1B4D3E" }}>
            Comment financer votre formation ?
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "#6B7280" }}>
            Plusieurs solutions existent pour vous aider
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {options.map((option) => {
            const Icon = option.icon;
            return (
              <motion.div
                key={option.title}
                variants={staggerItem}
                className="p-6 xl:p-8 border border-border/60 rounded-xl bg-white hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: option.iconBg }}>
                  <Icon className="w-6 h-6" style={{ color: option.iconColor }} />
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ color: "#1A1A1A" }}>{option.title}</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "#6B7280" }}>{option.description}</p>
                <span
                  className="inline-block text-xs font-semibold px-3 py-1 rounded-full"
                  style={{ backgroundColor: option.badgeBg, color: option.badgeColor }}
                >
                  {option.badge}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default FinancingSection;
