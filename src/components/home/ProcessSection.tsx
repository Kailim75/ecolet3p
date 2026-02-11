import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Phone, ClipboardList, GraduationCap, Trophy } from "lucide-react";

const smoothEase = [0.22, 1, 0.36, 1] as const;

const steps = [
  { number: 1, icon: Phone, title: "Contactez-nous", description: "Appelez ou remplissez le formulaire" },
  { number: 2, icon: ClipboardList, title: "Choisissez votre formation", description: "Initiale, Continue, Mobilité..." },
  { number: 3, icon: GraduationCap, title: "Suivez la formation", description: "63h ou 33h selon votre disponibilité" },
  { number: 4, icon: Trophy, title: "Obtenez votre carte pro", description: "Examen CMA puis demande en Préfecture" },
];

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: smoothEase } }
};

const ProcessSection = () => {
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
          <h2 className="font-serif text-[28px] md:text-[36px] font-extrabold mb-4" style={{ color: "#1A1A1A" }}>
            Comment s'inscrire ?
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="relative"
        >
          {/* Dashed line connecting steps (desktop) */}
          <div className="hidden lg:block absolute top-8 left-[15%] right-[15%] border-t-2 border-dashed" style={{ borderColor: "#D1D5DB" }} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  variants={staggerItem}
                  className="flex flex-col items-center text-center relative"
                >
                  {/* Number circle - orange */}
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold mb-4 relative z-10"
                    style={{ backgroundColor: "#FFF7ED", color: "#F97316", border: "3px solid #F97316" }}
                  >
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: "rgba(27,77,62,0.08)" }}>
                    <Icon className="w-5 h-5 text-forest" />
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-base mb-1" style={{ color: "#1A1A1A" }}>{step.title}</h3>

                  {/* Description */}
                  <p className="text-sm" style={{ color: "#777" }}>{step.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button asChild className="btn-cta-orange px-8 py-4 text-base rounded-lg w-full md:w-auto">
            <Link to="/contact">
              Commencer mon inscription <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;
