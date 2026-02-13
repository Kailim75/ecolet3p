import React, { useState } from "react";
import { Lock, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AlmaLogo from "@/components/logo/AlmaLogo";

interface PricingPaymentBlockProps {
  formationTitle: string;
  price: number;
  onRegister: () => void;
}

const installmentOptions = [
  { count: 1, label: "1×", sublabel: "en une fois" },
  { count: 2, label: "2×", sublabel: "/mois" },
  { count: 3, label: "3×", sublabel: "/mois" },
  { count: 4, label: "4×", sublabel: "/mois", popular: true },
];

const PricingPaymentBlock = ({ formationTitle, price, onRegister }: PricingPaymentBlockProps) => {
  const [selected, setSelected] = useState(4);
  const [showCheckout, setShowCheckout] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ first_name: "", last_name: "", email: "", phone: "" });
  const { toast } = useToast();

  const monthlyAmount = (price / selected).toFixed(2);

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
      <div className="rounded-2xl border border-border/60 bg-card p-6 md:p-8 shadow-lg">
        {/* Price header */}
        <div className="rounded-xl p-6 mb-6 text-center" style={{ backgroundColor: "#F8F9FA", border: "1px solid #E8E8E8" }}>
          <p className="text-5xl font-extrabold mb-1" style={{ color: "#1A5276" }}>{price}€</p>
          <p className="text-sm" style={{ color: "#777" }}>TTC — Tout inclus</p>
        </div>

        {/* Installment selector title */}
        <p className="text-sm font-semibold mb-3" style={{ color: "#1A1A1A" }}>
          Choisissez votre mode de paiement :
        </p>

        {/* 4 options */}
        <div className="grid grid-cols-4 gap-2 md:gap-3 mb-5">
          {installmentOptions.map((opt) => {
            const amount = (price / opt.count).toFixed(2);
            const isSelected = selected === opt.count;
            return (
              <button
                key={opt.count}
                type="button"
                onClick={() => setSelected(opt.count)}
                className="relative rounded-xl py-3 px-2 text-center transition-all duration-200 cursor-pointer border-2"
                style={{
                  borderColor: isSelected ? "#FA5022" : "#E0E0E0",
                  backgroundColor: isSelected ? "#FFF5F2" : "#FFFFFF",
                  boxShadow: isSelected ? "0 4px 12px rgba(250, 80, 34, 0.15)" : "none",
                }}
              >
                {opt.popular && (
                  <span
                    className="absolute -top-2 right-1 text-white text-[10px] font-bold px-1.5 py-0.5 rounded"
                    style={{ backgroundColor: "#FA5022" }}
                  >
                    Le + choisi
                  </span>
                )}
                <span className="block text-lg font-bold" style={{ color: isSelected ? "#FA5022" : "#1A1A1A" }}>
                  {opt.label}
                </span>
                <span className="block text-base font-semibold" style={{ color: "#1A5276" }}>
                  {amount}€
                </span>
                <span className="block text-xs" style={{ color: "#999" }}>
                  {opt.sublabel}
                </span>
              </button>
            );
          })}
        </div>

        {/* CTA Button */}
        <Button
          className="w-full text-base font-bold rounded-xl h-14 text-white transition-all duration-200 hover:-translate-y-0.5"
          style={{
            background: "linear-gradient(135deg, #F39C12, #E67E22)",
            boxShadow: "0 4px 14px rgba(243, 156, 18, 0.35)",
          }}
          onClick={handlePay}
        >
          <Lock className="h-4 w-4 mr-2" />
          {selected === 1
            ? `S'inscrire et payer — ${price}€`
            : `S'inscrire et payer — ${monthlyAmount}€/mois`}
        </Button>

        {/* Reassurance */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mt-4">
          {["0€ de frais", "Sans justificatif", "100% sécurisé", "Réponse immédiate"].map((text) => (
            <span key={text} className="flex items-center gap-1.5 text-xs" style={{ color: "#666" }}>
              <Check className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#27AE60" }} />
              {text}
            </span>
          ))}
        </div>

        {/* Alma branding */}
        <div className="flex items-center justify-center gap-2 mt-5 pt-4 border-t border-border/40">
          <span className="text-xs" style={{ color: "#999" }}>Paiement sécurisé par</span>
          <AlmaLogo className="h-5" />
        </div>
      </div>

      {/* Alma checkout dialog */}
      <Dialog open={showCheckout} onOpenChange={setShowCheckout}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-foreground">Paiement en {selected}× avec Alma</DialogTitle>
            <DialogDescription>
              {formationTitle} — {selected}× {monthlyAmount}€/mois sans frais
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
                <><Lock className="h-4 w-4 mr-2" />Payer en {selected}× — {monthlyAmount}€/mois</>
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
