import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, RefreshCcw, Headphones, Award } from "lucide-react";

const smoothEase = [0.22, 1, 0.36, 1] as const;

const guarantees = [
  {
    icon: ShieldCheck,
    title: "Agrément Préfecture",
    description: "Centre agréé par la Préfecture des Hauts-de-Seine pour les formations T3P.",
  },
  {
    icon: RefreshCcw,
    title: "Repassage gratuit",
    description: "En cas d'échec à l'examen, bénéficiez d'une session de rattrapage sans frais supplémentaires.",
  },
  {
    icon: Headphones,
    title: "Support 6j/7",
    description: "Une équipe pédagogique disponible du lundi au samedi pour répondre à toutes vos questions.",
  },
  {
    icon: Award,
    title: "Satisfaction garantie",
    description: "94% de taux de réussite et des avis 5★ sur Google attestent de la qualité de nos formations.",
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

const GuaranteeSection = () => {
  return (
    <section className="section-padding" style={{ background: "#F5F0E8" }}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="text-center mb-10 md:mb-14"
        >
          <h2 className="section-title mb-3">Nos Garanties</h2>
          <p className="section-subtitle mx-auto">
            Votre réussite est notre priorité — nous nous engageons à vos côtés
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {guarantees.map((g) => {
            const Icon = g.icon;
            return (
              <motion.div
                key={g.title}
                variants={staggerItem}
                whileHover={{ y: -4, boxShadow: "0 12px 30px rgba(27,67,50,0.10)" }}
                className="bg-white rounded-xl p-6 border text-center transition-all"
                style={{ borderColor: "rgba(27,67,50,0.10)" }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "rgba(27,67,50,0.08)" }}
                >
                  <Icon className="w-6 h-6" style={{ color: "#1B4332" }} />
                </div>
                <h3 className="text-base font-bold mb-2" style={{ color: "#1B4332" }}>{g.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{g.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default GuaranteeSection;
