import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import AlmaLogo from "@/components/logo/AlmaLogo";

// TODO: remplacer par le merchant ID réel Alma
const ALMA_MERCHANT_ID = "ALMA_MERCHANT_ID";
const ALMA_AMOUNT_CENTS = 99000; // 990€ en centimes

const smoothEase = [0.22, 1, 0.36, 1] as const;

const installments = [
  { label: "Aujourd'hui", amount: "247,50€" },
  { label: "J+30", amount: "247,50€" },
  { label: "J+60", amount: "247,50€" },
  { label: "J+90", amount: "247,50€" },
];

/** Lazy-load the Alma widget script once */
const useAlmaWidget = () => {
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;

    const script = document.createElement("script");
    script.src = "https://cdn.almapay.com/widgets/v1/alma-widgets.umd.js";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // keep script loaded — no cleanup needed
    };
  }, []);
};

const AlmaBanner = () => {
  const [showModal, setShowModal] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  useAlmaWidget();

  const openSimulation = useCallback(() => {
    setShowModal(true);
  }, []);

  // Render widget inside modal when open
  useEffect(() => {
    if (!showModal || !widgetRef.current) return;

    const w = window as any;
    if (w.Alma?.Widgets) {
      widgetRef.current.innerHTML = "";
      try {
        const widgets = w.Alma.Widgets.initialize(ALMA_MERCHANT_ID, w.Alma.ApiMode.LIVE);
        widgets.add(w.Alma.Widgets.PaymentPlans, {
          container: widgetRef.current,
          purchaseAmount: ALMA_AMOUNT_CENTS,
          locale: "fr",
        });
      } catch (err) {
        console.warn("Alma widget init error:", err);
        widgetRef.current.innerHTML =
          '<p style="text-align:center;padding:24px;color:#666;">Simulation Alma indisponible pour le moment.</p>';
      }
    } else {
      widgetRef.current.innerHTML =
        '<p style="text-align:center;padding:24px;color:#666;">Chargement du widget Alma…</p>';
    }
  }, [showModal]);

  return (
    <>
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
                    className="flex flex-col items-center px-3 py-2 md:px-4 md:py-3 rounded-xl border cursor-pointer hover:shadow-md transition-shadow"
                    style={{
                      backgroundColor: "rgba(27,67,50,0.05)",
                      borderColor: "rgba(27,67,50,0.15)",
                    }}
                    onClick={openSimulation}
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
              <Button onClick={openSimulation} className="btn-cta-orange" size="sm">
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

      {/* Alma simulation modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={() => setShowModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: "rgba(27,67,50,0.12)" }}>
              <div className="flex items-center gap-2">
                <AlmaLogo className="h-6" />
                <span className="text-sm font-bold" style={{ color: "#1B4332" }}>Simulation de paiement</span>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-muted transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div ref={widgetRef} className="p-6 min-h-[200px]" />
          </motion.div>
        </div>
      )}
    </>
  );
};

export default AlmaBanner;
