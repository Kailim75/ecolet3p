import React from "react";
import { motion } from "framer-motion";
import { Target, Users, RefreshCcw, Building2 } from "lucide-react";

const smoothEase = [0.22, 1, 0.36, 1] as const;

const reasons = [
  {
    icon: Target,
    title: "Méthode structurée",
    description: "Programme intensif axé sur la réussite au premier passage, pas sur le remplissage de sessions.",
  },
  {
    icon: Users,
    title: "Groupes limités à 12 stagiaires",
    description: "Chaque candidat bénéficie d'un suivi réel, pas d'une formation de masse.",
  },
  {
    icon: RefreshCcw,
    title: "Accompagnement jusqu'à réussite",
    description: "Si vous ne réussissez pas, nous vous réaccompagnons sans frais pédagogiques supplémentaires à la session suivante.*",
  },
  {
    icon: Building2,
    title: "Indépendant par choix",
    description: "Hors CPF volontairement pour préserver notre liberté pédagogique et la qualité de notre suivi.",
  },
];

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: smoothEase } },
};

const WhyChooseUsSection = () => {
  return (
    <section className="py-12 md:py-20" style={{ backgroundColor: "#1B4332" }}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="text-center mb-10 md:mb-14"
        >
          <h2 className="text-[22px] md:text-[36px] font-black text-white mb-3">
            Un positionnement exigeant, des résultats mesurables
          </h2>
        </motion.div>

        {/* Desktop: 4-column grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                variants={staggerItem}
                whileHover={{ y: -4, boxShadow: "0 12px 30px rgba(0,0,0,0.15)" }}
                className="rounded-xl p-6 text-center transition-all"
                style={{ backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "rgba(255,255,255,0.10)" }}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{reason.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.70)" }}>{reason.description}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Mobile: 1 column */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="md:hidden flex flex-col gap-3"
        >
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                variants={staggerItem}
                className="flex items-start gap-4 rounded-xl p-4"
                style={{ backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "rgba(255,255,255,0.10)" }}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-white mb-1">{reason.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>{reason.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Footnote */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8 text-xs italic"
          style={{ color: "rgba(255,255,255,0.45)" }}
        >
          *Sous réserve d'assiduité complète et d'éligibilité à l'examen.
        </motion.p>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
