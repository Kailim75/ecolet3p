import React, { useState, useRef, useEffect } from "react";
import { Lock, Check, Loader2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AlmaLogo from "@/components/logo/AlmaLogo";
import { motion, AnimatePresence } from "framer-motion";

/* ── Price formatter ── */
const formatPrice = (amount: number): string => {
  if (Number.isInteger(amount)) {
    return amount >= 1000
      ? amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "\u00A0") + "€"
      : amount + "€";
  }
  const formatted = amount.toFixed(2).replace(".", ",");
  return formatted + "€";
};

/* ── Types ── */
interface PricingPaymentBlockProps {
  formationTitle: string;
  price: number;
  onRegister: () => void;
  /** "essentiel" | "premium" — controls visual tier */
  tier?: "essentiel" | "premium";
  /** Label above the card name */
  tierLabel?: string;
  /** Subtitle under the tier name */
  subtitle?: string;
  /** Features checklist */
  features?: string[];
  /** If true, render as a single centered card (wider) */
  single?: boolean;
}

const installmentOptions = [
  { count: 1, label: "1×" },
  { count: 2, label: "2×" },
  { count: 3, label: "3×" },
  { count: 4, label: "4×" },
];

const reassuranceItems = ["0€ de frais", "Sans justificatif", "100% sécurisé", "Réponse immédiate"];

const PricingPaymentBlock = ({
  formationTitle,
  price,
  onRegister,
  tier = "essentiel",
  tierLabel,
  subtitle,
  features,
  single = false,
}: PricingPaymentBlockProps) => {
  const [selected, setSelected] = useState(4);
  const [showCheckout, setShowCheckout] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ first_name: "", last_name: "", email: "", phone: "" });
  const { toast } = useToast();
  const pillsRef = useRef<HTMLDivElement>(null);

  const isPremium = tier === "premium";
  const monthlyAmount = price / selected;
  const monthlyFormatted = formatPrice(Math.round(monthlyAmount * 100) / 100);

  const dynamicText =
    selected === 1
      ? `${formatPrice(price)} en une fois`
      : `${monthlyFormatted}/mois pendant ${selected} mois`;

  const ctaLine1 = selected === 1 ? "Réserver et payer" : "Réserver ma place";
  const ctaLine2 =
    selected === 1
      ? formatPrice(price)
      : `${monthlyFormatted}/mois × ${selected} — sans frais`;

  const handlePay = () => {
    if (selected === 1) {
      onRegister();
    } else {
      setShowCheckout(true);
    }
  };

  const handleAlmaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.first_name || !form.last_name || !form.email) {
      toast({ title: "Veuillez remplir tous les champs obligatoires", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-alma-payment", {
        body: {
          amount: price,
          installments_count: selected,
          formation_title: formationTitle,
          customer_first_name: form.first_name,
          customer_last_name: form.last_name,
          customer_email: form.email,
          customer_phone: form.phone,
        },
      });
      if (error) throw error;
      if (data?.payment_url) {
        window.location.href = data.payment_url;
      } else {
        throw new Error("URL de paiement non reçue");
      }
    } catch {
      toast({
        title: "Erreur lors de la création du paiement",
        description: "Veuillez réessayer ou nous contacter au 01 88 75 05 55",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, delay: isPremium ? 0 : 0.1 }}
        className={`relative rounded-[20px] p-7 md:p-8 transition-all duration-300 hover:-translate-y-1 ${
          single ? "max-w-[520px] mx-auto" : ""
        }`}
        style={{
          background: isPremium
            ? "linear-gradient(180deg, #FFF9F7 0%, #FFFFFF 100%)"
            : "#FFFFFF",
          border: isPremium ? "2px solid #FA5022" : "1px solid #E8E8E8",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.06)",
        }}
      >
        {/* Recommended badge */}
        {isPremium && (
          <div
            className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-white text-xs font-bold tracking-wide px-5 py-1.5 rounded-full z-10 whitespace-nowrap"
            style={{
              background: "linear-gradient(135deg, #FA5022, #E8451E)",
              boxShadow: "0 4px 12px rgba(250, 80, 34, 0.3)",
            }}
          >
            <Star className="w-3.5 h-3.5 fill-white" />
            RECOMMANDÉ
          </div>
        )}

        {/* Tier name */}
        <div className="text-center mb-5 pt-1">
          <p className="text-[13px] font-bold uppercase tracking-[1.5px]" style={{ color: "#999" }}>
            {tierLabel || (isPremium ? "PREMIUM" : "ESSENTIEL")}
          </p>
          {subtitle && (
            <p className="text-base font-medium mt-1" style={{ color: "#555" }}>
              {subtitle}
            </p>
          )}
        </div>

        {/* Price */}
        <div className="text-center mb-6">
          <div className="flex items-baseline justify-center gap-0.5">
            <span className="text-[52px] font-extrabold leading-none" style={{ color: "#1A5276" }}>
              {price >= 1000
                ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "\u00A0")
                : price}
            </span>
            <span className="text-[32px] font-extrabold" style={{ color: "#1A5276" }}>€</span>
          </div>
          <p className="text-[13px] mt-1" style={{ color: "#999" }}>
            TTC — Tout inclus
          </p>
        </div>

        {/* Features checklist */}
        {features && features.length > 0 && (
          <div className="mb-6">
            {features.map((feat, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 py-2"
                style={{ borderBottom: i < features.length - 1 ? "1px solid #F5F5F5" : "none" }}
              >
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "#EAFAF1" }}
                >
                  <Check className="w-3 h-3" style={{ color: "#27AE60" }} />
                </div>
                <span className="text-sm" style={{ color: "#444" }}>{feat}</span>
              </div>
            ))}
          </div>
        )}

        {/* Pill selector */}
        <p className="text-sm font-semibold mb-3" style={{ color: "#1A1A1A" }}>
          Mode de paiement :
        </p>
        <div
          ref={pillsRef}
          className="flex rounded-xl p-1 mb-2"
          style={{ backgroundColor: "#F5F5F5" }}
        >
          {installmentOptions.map((opt) => {
            const isSelected = selected === opt.count;
            return (
              <button
                key={opt.count}
                type="button"
                onClick={() => setSelected(opt.count)}
                className="relative flex-1 h-10 rounded-[10px] text-[15px] font-bold transition-all duration-300 cursor-pointer"
                style={{
                  backgroundColor: isSelected ? "#FFFFFF" : "transparent",
                  color: isSelected ? "#1A5276" : "#666",
                  fontWeight: isSelected ? 700 : 500,
                  boxShadow: isSelected ? "0 2px 8px rgba(0,0,0,0.1)" : "none",
                }}
              >
                {opt.count === 4 && (
                  <span
                    className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: "#FA5022" }}
                  />
                )}
                {opt.label}
              </button>
            );
          })}
        </div>

        {/* Dynamic amount */}
        <AnimatePresence mode="wait">
          <motion.p
            key={selected}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.2 }}
            className="text-center text-lg md:text-xl font-bold my-4"
            style={{ color: "#1A5276" }}
          >
            {dynamicText}
          </motion.p>
        </AnimatePresence>

        {/* CTA Button */}
        <Button
          className="w-full rounded-[14px] text-white transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
          style={{
            background: "linear-gradient(135deg, #F39C12, #E67E22)",
            boxShadow: "0 4px 16px rgba(243, 156, 18, 0.35)",
            minHeight: "56px",
          }}
          onClick={handlePay}
        >
          <Lock className="h-4 w-4 mr-2 flex-shrink-0" />
          <span className="flex flex-col items-start leading-tight">
            <span className="text-base font-bold">{ctaLine1}</span>
            <span className="text-[13px] font-normal opacity-90">{ctaLine2}</span>
          </span>
        </Button>

        {/* Reassurance grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4">
          {reassuranceItems.map((text) => (
            <span key={text} className="flex items-center gap-1.5 text-[13px]" style={{ color: "#888" }}>
              <Check className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#27AE60" }} />
              {text}
            </span>
          ))}
        </div>

        {/* Alma branding */}
        <div className="flex items-center justify-center gap-2 mt-5 pt-4" style={{ borderTop: "1px solid #F0F0F0" }}>
          <span className="text-xs" style={{ color: "#BBB" }}>Paiement sécurisé par</span>
          <AlmaLogo className="h-[18px] opacity-70" />
        </div>
      </motion.div>

      {/* Alma checkout dialog */}
      <Dialog open={showCheckout} onOpenChange={setShowCheckout}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-foreground">Paiement en {selected}× avec Alma</DialogTitle>
            <DialogDescription>
              {formationTitle} — {selected}× {monthlyFormatted}/mois sans frais
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAlmaSubmit} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="pp-first-name">Prénom *</Label>
                <Input id="pp-first-name" value={form.first_name} onChange={(e) => setForm((p) => ({ ...p, first_name: e.target.value }))} required />
              </div>
              <div>
                <Label htmlFor="pp-last-name">Nom *</Label>
                <Input id="pp-last-name" value={form.last_name} onChange={(e) => setForm((p) => ({ ...p, last_name: e.target.value }))} required />
              </div>
            </div>
            <div>
              <Label htmlFor="pp-email">Email *</Label>
              <Input id="pp-email" type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} required />
            </div>
            <div>
              <Label htmlFor="pp-phone">Téléphone</Label>
              <Input id="pp-phone" type="tel" value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} />
            </div>
            <Button type="submit" className="w-full btn-cta-orange text-base" size="lg" disabled={loading}>
              {loading ? (
                <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Redirection vers Alma...</>
              ) : (
                <><Lock className="h-4 w-4 mr-2" />Payer en {selected}× — {monthlyFormatted}/mois</>
              )}
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Vous serez redirigé vers la page sécurisée Alma pour finaliser votre paiement.
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PricingPaymentBlock;
