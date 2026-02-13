import React from "react";
import { motion } from "framer-motion";
import { Shield, Zap, FileX, ArrowRight } from "lucide-react";
import PrefetchLink from "@/components/ui/PrefetchLink";
import AlmaLogo from "@/components/logo/AlmaLogo";
import { EcoleT3PMonogram } from "@/components/logo/EcoleT3PInstitutional";

const smoothEase = [0.22, 1, 0.36, 1] as const;

const advantages = [
  { icon: Shield, title: "100% sécurisé", description: "Paiement crypté et protégé" },
  { icon: Zap, title: "Réponse immédiate", description: "Acceptation en quelques secondes" },
  { icon: FileX, title: "Sans justificatif", description: "Aucun document à fournir" },
];

const FinancingSection = () => {
  return (
    <section className="py-16 md:py-20" style={{ backgroundColor: "#FAFAFA" }}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Logos */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <EcoleT3PMonogram className="w-10 h-10" />
            <span className="text-lg font-bold" style={{ color: "#999" }}>×</span>
            <AlmaLogo className="h-8" />
          </div>

          <h2 className="font-serif text-[24px] md:text-[28px] xl:text-[36px] font-extrabold mb-4" style={{ color: "#1A1A1A" }}>
            Payez votre formation en 1×, 2×, 3× ou 4×{" "}
            <span style={{ color: "#27AE60" }}>sans frais</span>
          </h2>
        </motion.div>

        {/* Advantages */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.15, ease: smoothEase }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto mt-10 mb-8"
        >
          {advantages.map((adv) => {
            const Icon = adv.icon;
            return (
              <div
                key={adv.title}
                className="flex flex-col items-center text-center p-5 rounded-xl border border-border/40 bg-white"
              >
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: "rgba(250,80,34,0.08)" }}>
                  <Icon className="w-6 h-6" style={{ color: "#FA5022" }} />
                </div>
                <p className="font-bold text-sm" style={{ color: "#1A1A1A" }}>{adv.title}</p>
                <p className="text-xs mt-1" style={{ color: "#6B7280" }}>{adv.description}</p>
              </div>
            );
          })}
        </motion.div>

        {/* Example */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.25, ease: smoothEase }}
          className="text-center"
        >
          <p className="text-sm mb-5" style={{ color: "#6B7280" }}>
            Exemple : Formation VTC à 990€ →{" "}
            <span className="font-bold" style={{ color: "#1A1A1A" }}>4× 247,50€/mois</span>
          </p>
          <PrefetchLink
            to="/paiement"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:underline"
            style={{ color: "#FA5022" }}
          >
            En savoir plus sur le paiement <ArrowRight className="w-4 h-4" />
          </PrefetchLink>
        </motion.div>
      </div>
    </section>
  );
};

export default FinancingSection;
