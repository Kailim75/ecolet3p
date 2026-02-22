import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, Send, Lock, ArrowRight, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import type { SimulationInputs, SimulationResult } from "./SimulatorLevel1";

interface LeadCaptureFormProps {
  inputs: SimulationInputs;
  results: SimulationResult;
  onSuccess: () => void;
}

export default function LeadCaptureForm({ inputs, results, onSuccess }: LeadCaptureFormProps) {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName || !form.email || !form.phone) {
      toast({ title: "Champs requis", description: "Veuillez remplir tous les champs obligatoires.", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from("simulations").insert({
        first_name: form.firstName.trim(),
        last_name: form.lastName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        profession: inputs.profession,
        hours_per_day: inputs.hoursPerDay,
        days_per_week: inputs.daysPerWeek,
        avg_fare: inputs.avgFare,
        rides_per_hour: inputs.ridesPerHour,
        monthly_revenue: results.monthlyRevenue,
        monthly_charges: results.monthlyCharges,
        monthly_net: results.monthlyNet,
        simulation_level: 2,
        source: "simulateur-avance",
      });

      if (error) throw error;

      // Trigger WhatsApp notification
      try {
        await supabase.functions.invoke("notify-simulation-lead", {
          body: {
            firstName: form.firstName,
            lastName: form.lastName,
            phone: form.phone,
            email: form.email,
            profession: inputs.profession,
            monthlyNet: Math.round(results.monthlyNet),
          },
        });
      } catch {
        // Non-blocking
      }

      setSubmitted(true);
      onSuccess();
      toast({ title: "✅ Simulation avancée débloquée !", description: "Vos résultats détaillés sont maintenant accessibles." });
    } catch (err) {
      toast({ title: "Erreur", description: "Une erreur est survenue. Veuillez réessayer.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center p-8">
        <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-4" />
        <h3 className="text-xl font-bold text-foreground mb-2">Simulation avancée débloquée !</h3>
        <p className="text-muted-foreground">Découvrez votre projection 12 mois ci-dessous.</p>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <div className="text-center mb-4">
        <Lock className="w-8 h-8 text-primary mx-auto mb-2" />
        <h3 className="text-lg font-bold text-foreground">Débloquez votre simulation avancée</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Projection 12 mois • Comparatif scénarios • Calcul ROI formation
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Prénom *"
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            className="pl-10"
            required
            maxLength={50}
          />
        </div>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Nom"
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            className="pl-10"
            maxLength={50}
          />
        </div>
      </div>

      <div className="relative">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="email"
          placeholder="Email *"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="pl-10"
          required
          maxLength={100}
        />
      </div>

      <div className="relative">
        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="tel"
          placeholder="Téléphone *"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="pl-10"
          required
          maxLength={20}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-cta-orange w-full px-6 py-4 font-bold rounded-xl inline-flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Envoi...
          </span>
        ) : (
          <>
            <Send className="w-5 h-5" /> Débloquer ma simulation avancée
          </>
        )}
      </button>

      <p className="text-[11px] text-muted-foreground text-center">
        🔒 Vos données sont sécurisées. Aucun spam. Un conseiller ECOLE T3P vous contactera sous 24h.
      </p>
    </motion.form>
  );
}
