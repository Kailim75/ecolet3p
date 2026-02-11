import React from "react";
import { motion } from "framer-motion";
import { CreditCard, Check } from "lucide-react";

const smoothEase = [0.22, 1, 0.36, 1] as const;

const FinancingSection = () => {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="font-serif text-[28px] md:text-[36px] xl:text-[42px] font-extrabold mb-4" style={{ color: "#1B4D3E" }}>
            Facilitez votre paiement
          </h2>
          <p className="text-lg mb-10" style={{ color: "#6B7280" }}>
            Étalez le coût de votre formation en toute simplicité
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.15, ease: smoothEase }}
          className="max-w-lg mx-auto p-8 border border-border/60 rounded-xl bg-white hover:shadow-lg transition-shadow duration-300 text-center"
        >
          <div className="w-14 h-14 rounded-lg flex items-center justify-center mb-5 mx-auto" style={{ backgroundColor: "rgba(249,115,22,0.08)" }}>
            <CreditCard className="w-7 h-7" style={{ color: "#F97316" }} />
          </div>
          <h3 className="font-bold text-xl mb-2" style={{ color: "#1A1A1A" }}>Paiement en 4× sans frais</h3>
          <p className="text-sm leading-relaxed mb-6" style={{ color: "#6B7280" }}>
            Étalez votre paiement en 4 mensualités sans frais supplémentaires.
            <br />
            <span className="font-semibold" style={{ color: "#1A1A1A" }}>Exemple : 248€/mois pour la formation à 990€.</span>
          </p>
          <div className="flex flex-col gap-2 text-left max-w-xs mx-auto">
            <span className="flex items-center gap-2 text-sm" style={{ color: "#4B5563" }}>
              <Check className="w-4 h-4 flex-shrink-0" style={{ color: "#059669" }} /> Sans justificatif
            </span>
            <span className="flex items-center gap-2 text-sm" style={{ color: "#4B5563" }}>
              <Check className="w-4 h-4 flex-shrink-0" style={{ color: "#059669" }} /> Aucun frais supplémentaire
            </span>
            <span className="flex items-center gap-2 text-sm" style={{ color: "#4B5563" }}>
              <Check className="w-4 h-4 flex-shrink-0" style={{ color: "#059669" }} /> Mise en place à l'inscription
            </span>
          </div>
          <span
            className="inline-block text-xs font-semibold px-4 py-1.5 rounded-full mt-6"
            style={{ backgroundColor: "rgba(249,115,22,0.1)", color: "#F97316" }}
          >
            4× sans frais
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default FinancingSection;
