import React from "react";
import { motion } from "framer-motion";
import { Phone, GraduationCap, BookOpen, BadgeCheck } from "lucide-react";

const smoothEase = [0.22, 1, 0.36, 1] as const;

const steps = [
  {
    icon: Phone,
    number: "1",
    title: "Contactez-nous",
    description: "Appelez ou remplissez le formulaire. Réponse sous 24h.",
    color: "#F97316",
    bgColor: "rgba(249,115,22,0.1)",
  },
  {
    icon: GraduationCap,
    number: "2",
    title: "Choisissez votre formation",
    description: "Taxi, VTC ou VMDTR. Format journée ou soirée.",
    color: "#059669",
    bgColor: "rgba(5,150,105,0.1)",
  },
  {
    icon: BookOpen,
    number: "3",
    title: "Suivez la formation",
    description: "33h à 63h selon la formation. Cours + préparation examen CMA.",
    color: "#2563EB",
    bgColor: "rgba(37,99,235,0.1)",
  },
  {
    icon: BadgeCheck,
    number: "4",
    title: "Obtenez votre carte pro",
    description: "Examen réussi, demande en préfecture, vous êtes chauffeur !",
    color: "#D4A853",
    bgColor: "rgba(212,168,83,0.1)",
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

const JourneyStepsSection = () => {
  return (
    <section className="py-16 md:py-20" style={{ backgroundColor: "#F9FAFB" }}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="text-center mb-14"
        >
          <h2 className="font-serif text-[28px] md:text-[36px] xl:text-[42px] font-extrabold mb-4" style={{ color: "#1B4D3E" }}>
            Votre parcours en 4 étapes
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "#6B7280" }}>
            De l'inscription à l'obtention de votre carte professionnelle
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8 relative"
        >
          {/* Connecting line — desktop only */}
          <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5" style={{ background: "linear-gradient(90deg, #F97316, #059669, #2563EB, #D4A853)" }} />

          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <motion.div key={step.number} variants={staggerItem} className="flex flex-col items-center text-center relative z-10">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-4 border-4 border-white"
                  style={{ backgroundColor: step.bgColor, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
                >
                  <Icon className="w-7 h-7" style={{ color: step.color }} />
                </div>
                <h3 className="font-bold text-base mb-2" style={{ color: "#1A1A1A" }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>{step.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default JourneyStepsSection;
