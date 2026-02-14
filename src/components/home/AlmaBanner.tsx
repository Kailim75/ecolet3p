import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CreditCard, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import AlmaLogo from "@/components/logo/AlmaLogo";
import { useQuoteModal } from "@/components/quote/QuoteRequestModal";

const smoothEase = [0.22, 1, 0.36, 1] as const;

const installments = [
  { label: "Aujourd'hui", amount: "247,50€" },
  { label: "J+30", amount: "247,50€" },
  { label: "J+60", amount: "247,50€" },
  { label: "J+90", amount: "247,50€" },
];

const AlmaBanner = () => {
  const { openQuoteModal } = useQuoteModal();

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

          {/* Center: Animated installment badges */}
          <div className="flex-1 flex items-center justify-center gap-2 md:gap-3 flex-wrap">
            {installments.map((inst, idx) => (
              <React.Fragment key={inst.label}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.12, ease: smoothEase }}
                  className="flex flex-col items-center px-3 py-2 md:px-4 md:py-3 rounded-xl border"
                  style={{
                    backgroundColor: "rgba(27,67,50,0.05)",
                    borderColor: "rgba(27,67,50,0.15)",
                  }}
                >
                  <span className="text-[10px] md:text-xs text-muted-foreground font-medium">{inst.label}</span>
                  <span className="text-sm md:text-lg font-black" style={{ color: "#1B4332" }}>{inst.amount}</span>
                </motion.div>
                {idx < installments.length - 1 && (
                  <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-muted-foreground shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Right: CTA */}
          <div className="shrink-0">
            <Button
              onClick={() => openQuoteModal("taxi")}
              className="btn-cta-orange"
              size="sm"
            >
              Simuler mon paiement <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
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
