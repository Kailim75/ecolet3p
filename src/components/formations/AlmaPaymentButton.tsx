import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Loader2 } from "lucide-react";
import AlmaLogo from "@/components/logo/AlmaLogo";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AlmaPaymentButtonProps {
  formationTitle: string;
  price: number; // in euros
}

const installmentOptions = [
  { count: 2, label: "2×" },
  { count: 3, label: "3×" },
  { count: 4, label: "4×" },
];

const AlmaPaymentButton = ({ formationTitle, price }: AlmaPaymentButtonProps) => {
  const [open, setOpen] = useState(false);
  const [selectedInstallments, setSelectedInstallments] = useState(3);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });
  const { toast } = useToast();

  const monthlyAmount = (price / selectedInstallments).toFixed(2);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.first_name || !form.last_name || !form.email) {
      toast({ title: "Veuillez remplir tous les champs obligatoires", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-alma-payment', {
        body: {
          amount: price,
          installments_count: selectedInstallments,
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
    } catch (err: unknown) {
      console.error('Alma payment error:', err);
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
      <Button
        variant="outline"
        className="w-full border-primary/30 text-primary hover:bg-primary/5 text-sm mt-2"
        onClick={() => setOpen(true)}
      >
        <CreditCard className="h-4 w-4 mr-2" />
        Payer en plusieurs fois avec Alma
      </Button>
      <div className="flex items-center justify-center gap-1.5 mt-1.5">
        <span className="text-[10px] text-muted-foreground">Propulsé par</span>
        <AlmaLogo className="h-3" />
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-foreground">Paiement en plusieurs fois</DialogTitle>
            <DialogDescription>
              {formationTitle} — {price}€ TTC
            </DialogDescription>
          </DialogHeader>

          {/* Installment selector */}
          <div className="flex gap-2 mb-4">
            {installmentOptions.map((opt) => (
              <button
                key={opt.count}
                type="button"
                onClick={() => setSelectedInstallments(opt.count)}
                className={`flex-1 rounded-lg border-2 py-3 px-2 text-center transition-colors ${
                  selectedInstallments === opt.count
                    ? "border-primary bg-primary/10 text-primary font-bold"
                    : "border-border text-muted-foreground hover:border-primary/40"
                }`}
              >
                <span className="block text-lg font-bold">{opt.label}</span>
                <span className="block text-xs">
                  {(price / opt.count).toFixed(2)}€/mois
                </span>
              </button>
            ))}
          </div>

          <div className="bg-accent/50 rounded-lg p-3 mb-4 text-center">
            <p className="text-sm text-muted-foreground">
              {selectedInstallments} mensualités de{" "}
              <span className="font-bold text-foreground">{monthlyAmount}€</span>
              {" "}sans frais
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="alma-first-name">Prénom *</Label>
                <Input
                  id="alma-first-name"
                  value={form.first_name}
                  onChange={(e) => setForm(prev => ({ ...prev, first_name: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="alma-last-name">Nom *</Label>
                <Input
                  id="alma-last-name"
                  value={form.last_name}
                  onChange={(e) => setForm(prev => ({ ...prev, last_name: e.target.value }))}
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="alma-email">Email *</Label>
              <Input
                id="alma-email"
                type="email"
                value={form.email}
                onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="alma-phone">Téléphone</Label>
              <Input
                id="alma-phone"
                type="tel"
                value={form.phone}
                onChange={(e) => setForm(prev => ({ ...prev, phone: e.target.value }))}
              />
            </div>

            <Button type="submit" className="w-full btn-cta-orange" size="lg" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Redirection vers Alma...
                </>
              ) : (
                <>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Payer en {selectedInstallments}× avec Alma
                </>
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

export default AlmaPaymentButton;
