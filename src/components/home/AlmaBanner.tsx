import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import AlmaLogo from "@/components/logo/AlmaLogo";
import AlmaPaymentButton from "@/components/formations/AlmaPaymentButton";

const smoothEase = [0.22, 1, 0.36, 1] as const;

const PRICE = 990;

const installmentPlans = [
  { count: 2, amounts: ["495,00€", "495,00€"], labels: ["Aujourd'hui", "J+30"] },
  { count: 3, amounts: ["330,00€", "330,00€", "330,00€"], labels: ["Aujourd'hui", "J+30", "J+60"] },
  { count: 4, amounts: ["247,50€", "247,50€", "247,50€", "247,50€"], labels: ["Aujourd'hui", "J+30", "J+60", "J+90"] },
];

const AlmaBanner = () => {
  const [selectedPlan, setSelectedPlan] = useState(2); // index for 4x plan

  const plan = installmentPlans[selectedPlan];

  return (
    <section className="py-8 md:py-10 bg-white border-y" style={{ borderColor: "rgba(27,67,50,0.12)" }}>
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
          {/* Left: Alma logo + tagline */}
          <div className="flex flex-col items-center lg:items-start gap-2 shrink-0">
            <AlmaLogo className="h-8 md:h-10" />
            <p className="text-xs md:text-sm text-muted-foreground text-center lg:text-left max-w-[220px]">
              Le paiement en plusieurs fois, simple et sans frais
            </p>
          </div>

          {/* Center: Plan selector + installment badges */}
          <div className="flex-1 flex flex-col items-center gap-4">
            {/* Plan selector */}
            <div className="flex gap-2">
              {installmentPlans.map((p, idx) => (
                <button
                  key={p.count}
                  onClick={() => setSelectedPlan(idx)}
                  className="px-3 py-1 rounded-full text-xs font-semibold border transition-all duration-200"
                  style={{
                    backgroundColor: selectedPlan === idx ? "#1B4332" : "transparent",
                    color: selectedPlan === idx ? "white" : "#1B4332",
                    borderColor: selectedPlan === idx ? "#1B4332" : "rgba(27,67,50,0.3)",
                  }}
                >
                  {p.count}×
                </button>
              ))}
            </div>

            {/* Animated installment badges */}
            <div className="flex items-center justify-center gap-2 md:gap-3 flex-wrap">
              {plan.amounts.map((amount, idx) => (
                <React.Fragment key={`${plan.count}-${idx}`}>
                  <motion.div
                    key={`badge-${plan.count}-${idx}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: idx * 0.08, ease: smoothEase }}
                    className="flex flex-col items-center px-3 py-2 md:px-4 md:py-3 rounded-xl border"
                    style={{
                      backgroundColor: "rgba(27,67,50,0.05)",
                      borderColor: "rgba(27,67,50,0.15)",
                    }}
                  >
                    <span className="text-[10px] md:text-xs text-muted-foreground font-medium">{plan.labels[idx]}</span>
                    <span className="text-sm md:text-lg font-black" style={{ color: "#1B4332" }}>{amount}</span>
                  </motion.div>
                  {idx < plan.amounts.length - 1 && (
                    <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-muted-foreground shrink-0" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Right: CTA — uses AlmaPaymentButton which handles the full payment flow */}
          <div className="shrink-0">
            <AlmaPaymentButton formationTitle="Formation T3P" price={PRICE} />
          </div>
        </div>

        {/* Trust line */}
        <div className="flex items-center justify-center gap-4 md:gap-6 mt-4 flex-wrap">
          {["Aucun frais supplémentaire", "Décision immédiate", "Sans engagement"].map((text) => (
            <span key={text} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <CheckCircle className="w-3.5 h-3.5" style={{ color: "#1B4332" }} />
              {text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AlmaBanner;
