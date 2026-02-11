import React, { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import {
  User, Mail, Phone, CheckCircle2, Loader2,
  FileText, Sparkles, ArrowLeft, ArrowRight, Send,
  CarTaxiFront, Car, Bike, BookOpen, RefreshCw, Shield,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

const formations = [
  { value: "taxi", label: "Formation TAXI Initiale (182h)", icon: CarTaxiFront },
  { value: "vtc", label: "Formation VTC Initiale (182h)", icon: Car },
  { value: "vmdtr", label: "Formation VMDTR – Moto Taxi", icon: Bike },
  { value: "mobilite", label: "Formation Mobilité (35h)", icon: BookOpen },
  { value: "continue", label: "Formation Continue (14h)", icon: RefreshCw },
  { value: "recup-points", label: "Stage Récupération de Points", icon: Shield },
];

const contactSchema = z.object({
  firstName: z.string().trim().min(2, "Prénom requis (min 2 caractères)"),
  lastName: z.string().trim().min(2, "Nom requis (min 2 caractères)"),
  email: z.string().trim().email("Email invalide"),
  phone: z.string().trim().min(10, "Numéro invalide (min 10 chiffres)"),
});

// Context for global modal access
interface QuoteModalContextType {
  openQuoteModal: (preselectedFormation?: string) => void;
  closeQuoteModal: () => void;
  isOpen: boolean;
}

const QuoteModalContext = createContext<QuoteModalContextType | undefined>(undefined);

export const useQuoteModal = () => {
  const context = useContext(QuoteModalContext);
  if (!context) {
    throw new Error("useQuoteModal must be used within a QuoteModalProvider");
  }
  return context;
};

interface QuoteModalProviderProps {
  children: ReactNode;
}

export const QuoteModalProvider = ({ children }: QuoteModalProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [preselectedFormation, setPreselectedFormation] = useState<string>("");

  const openQuoteModal = (formation?: string) => {
    setPreselectedFormation(formation || "");
    setIsOpen(true);
  };

  const closeQuoteModal = () => {
    setIsOpen(false);
    setPreselectedFormation("");
  };

  return (
    <QuoteModalContext.Provider value={{ openQuoteModal, closeQuoteModal, isOpen }}>
      {children}
      <QuoteRequestModal
        isOpen={isOpen}
        onClose={closeQuoteModal}
        preselectedFormation={preselectedFormation}
      />
    </QuoteModalContext.Provider>
  );
};

interface QuoteRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedFormation?: string;
}

const QuoteRequestModal = ({ isOpen, onClose, preselectedFormation = "" }: QuoteRequestModalProps) => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formation, setFormation] = useState(preselectedFormation);
  const [contact, setContact] = useState({ firstName: "", lastName: "", email: "", phone: "" });
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  useEffect(() => {
    if (preselectedFormation) {
      setFormation(preselectedFormation);
    }
  }, [preselectedFormation]);

  const canNext = () => {
    if (step === 1) return !!formation;
    return true;
  };

  const handleSubmit = async () => {
    const result = contactSchema.safeParse(contact);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((e) => {
        fieldErrors[e.path[0] as string] = e.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);

    try {
      const formationLabel = formations.find((f) => f.value === formation)?.label || formation;

      const { data: insertedData, error: dbError } = await supabase
        .from("pre_registrations")
        .insert({
          first_name: result.data.firstName,
          last_name: result.data.lastName,
          email: result.data.email,
          phone: result.data.phone,
          formation_title: formationLabel,
          formation_duration: "Devis demandé",
        })
        .select()
        .single();

      if (dbError) throw dbError;

      try {
        await supabase.functions.invoke("notify-new-registration", {
          body: {
            firstName: result.data.firstName,
            lastName: result.data.lastName,
            email: result.data.email,
            phone: result.data.phone,
            formationTitle: formationLabel,
            message,
          },
        });
      } catch {
        // Non-blocking
      }

      setIsSuccess(true);
      toast({ title: "Demande envoyée !", description: "Nous vous recontacterons sous 24h." });

      setTimeout(() => {
        resetAndClose();
      }, 2500);
    } catch {
      toast({ title: "Erreur", description: "Veuillez réessayer.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setStep(1);
    setFormation(preselectedFormation || "");
    setContact({ firstName: "", lastName: "", email: "", phone: "" });
    setMessage("");
    setErrors({});
    setIsSuccess(false);
    onClose();
  };

  const slideVariant = {
    enter: { opacity: 0, x: 40 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
  };

  const stepLabels = [
    { num: 1, label: "Formation" },
    { num: 2, label: "Coordonnées" },
    { num: 3, label: "Message" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={() => !isSubmitting && resetAndClose()}>
      <DialogContent className="max-w-md bg-card">
        {isSuccess ? (
          <motion.div className="py-8 text-center" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
              className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4"
            >
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </motion.div>
            <h3 className="text-xl font-bold text-primary mb-2">Demande envoyée !</h3>
            <p className="text-muted-foreground">Notre équipe vous contactera sous 24h.</p>
          </motion.div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-xl font-black text-primary">
                <FileText className="w-5 h-5 text-[hsl(var(--cta))]" />
                Devis gratuit en 3 étapes
              </DialogTitle>
              <DialogDescription>Rapide et sans engagement</DialogDescription>
            </DialogHeader>

            {/* Reassurance banner */}
            <div className="flex items-center gap-2 bg-[hsl(var(--cta))]/10 border border-[hsl(var(--cta))]/20 rounded-lg p-2.5 text-sm">
              <Sparkles className="w-4 h-4 text-[hsl(var(--cta))] shrink-0" />
              <span><strong>Réponse sous 24h</strong> – Sans engagement</span>
            </div>

            {/* Step indicator */}
            <div className="flex items-center gap-2 mb-1">
              {stepLabels.map((s, i) => (
                <div key={s.num} className="flex items-center gap-2 flex-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-colors ${
                    step >= s.num
                      ? "bg-[hsl(var(--cta))] text-white"
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {step > s.num ? <CheckCircle2 className="h-4 w-4" /> : s.num}
                  </div>
                  <span className={`text-xs font-medium hidden sm:block ${step >= s.num ? "text-foreground" : "text-muted-foreground"}`}>
                    {s.label}
                  </span>
                  {i < 2 && <div className={`flex-1 h-0.5 ${step > s.num ? "bg-[hsl(var(--cta))]" : "bg-muted"}`} />}
                </div>
              ))}
            </div>
            <Progress value={progress} className="h-1.5 mb-2" />

            <AnimatePresence mode="wait">
              {/* Step 1: Formation choice */}
              {step === 1 && (
                <motion.div key="s1" variants={slideVariant} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }}>
                  <p className="font-semibold mb-3">Quelle formation vous intéresse ?</p>
                  <RadioGroup value={formation} onValueChange={setFormation} className="space-y-2">
                    {formations.map((f) => (
                      <label
                        key={f.value}
                        className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                          formation === f.value
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/40"
                        }`}
                      >
                        <RadioGroupItem value={f.value} />
                        <f.icon className="h-5 w-5 text-primary shrink-0" />
                        <span className="font-medium text-sm">{f.label}</span>
                      </label>
                    ))}
                  </RadioGroup>
                </motion.div>
              )}

              {/* Step 2: Contact info */}
              {step === 2 && (
                <motion.div key="s2" variants={slideVariant} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }}>
                  <p className="font-semibold mb-3">Vos coordonnées</p>
                  <div className="space-y-3">
                    {([
                      { key: "firstName", label: "Prénom", icon: User, placeholder: "Jean" },
                      { key: "lastName", label: "Nom", icon: User, placeholder: "Dupont" },
                      { key: "email", label: "Email", icon: Mail, placeholder: "jean@email.com", type: "email" },
                      { key: "phone", label: "Téléphone", icon: Phone, placeholder: "06 12 34 56 78", type: "tel" },
                    ] as const).map((field) => (
                      <div key={field.key} className="space-y-1">
                        <Label className="text-sm">{field.label} *</Label>
                        <div className="relative">
                          <field.icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            type={(field as any).type || "text"}
                            placeholder={field.placeholder}
                            value={contact[field.key]}
                            onChange={(e) => {
                              setContact((p) => ({ ...p, [field.key]: e.target.value }));
                              if (errors[field.key]) setErrors((p) => ({ ...p, [field.key]: "" }));
                            }}
                            className={`pl-10 ${errors[field.key] ? "border-destructive" : ""}`}
                            disabled={isSubmitting}
                          />
                        </div>
                        {errors[field.key] && <p className="text-xs text-destructive">{errors[field.key]}</p>}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 3: Optional message */}
              {step === 3 && (
                <motion.div key="s3" variants={slideVariant} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }}>
                  <p className="font-semibold mb-3">Un message ? (optionnel)</p>
                  <Textarea
                    placeholder="Précisez vos besoins, questions ou disponibilités..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="resize-none h-28"
                    disabled={isSubmitting}
                  />
                  <div className="mt-4 p-3 bg-primary/5 border border-primary/10 rounded-lg text-sm text-muted-foreground">
                    <p className="font-medium text-foreground mb-1">📋 Récapitulatif</p>
                    <p>Formation : <strong>{formations.find(f => f.value === formation)?.label}</strong></p>
                    <p>Contact : <strong>{contact.firstName} {contact.lastName}</strong></p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation buttons */}
            <div className="flex gap-3 mt-4">
              {step > 1 && (
                <Button variant="outline" onClick={() => setStep((s) => s - 1)} disabled={isSubmitting}>
                  <ArrowLeft className="h-4 w-4 mr-1" /> Retour
                </Button>
              )}
              <div className="flex-1" />
              {step < totalSteps ? (
                <Button onClick={() => setStep((s) => s + 1)} disabled={!canNext()} className="btn-cta-orange">
                  Suivant <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={isSubmitting} className="btn-cta-orange">
                  {isSubmitting ? (
                    <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Envoi...</>
                  ) : (
                    <><Send className="h-4 w-4 mr-2" />Envoyer</>
                  )}
                </Button>
              )}
            </div>

            <p className="text-xs text-muted-foreground text-center mt-2">
              Sans engagement. Vos données sont traitées conformément au RGPD.
            </p>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default QuoteRequestModal;
