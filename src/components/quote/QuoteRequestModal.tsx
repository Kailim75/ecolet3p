import React, { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  FileText, ArrowLeft, ArrowRight, Send,
  CarTaxiFront, Car, Bike, BookOpen, RefreshCw, Shield,
  Sparkles, Clock,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

// ── Data ──────────────────────────────────────────────
const formations = [
  { value: "taxi", label: "TAXI", desc: "Initiale · 182h", icon: CarTaxiFront, color: "from-amber-500/15 to-amber-600/5" },
  { value: "vtc", label: "VTC", desc: "Initiale · 182h", icon: Car, color: "from-emerald-500/15 to-emerald-600/5" },
  { value: "vmdtr", label: "VMDTR", desc: "Moto-Taxi", icon: Bike, color: "from-blue-500/15 to-blue-600/5" },
  { value: "mobilite", label: "Mobilité", desc: "35h", icon: BookOpen, color: "from-violet-500/15 to-violet-600/5" },
  { value: "continue", label: "Continue", desc: "14h · Renouvellement", icon: RefreshCw, color: "from-cyan-500/15 to-cyan-600/5" },
  { value: "recup-points", label: "Points", desc: "Stage agréé", icon: Shield, color: "from-rose-500/15 to-rose-600/5" },
];

const contactSchema = z.object({
  firstName: z.string().trim().min(2, "Prénom requis (min 2 caractères)").max(50),
  lastName: z.string().trim().min(2, "Nom requis (min 2 caractères)").max(50),
  email: z.string().trim().email("Email invalide").max(100),
  phone: z.string().trim().min(10, "Numéro invalide (min 10 chiffres)").max(15),
});

// ── Context ───────────────────────────────────────────
interface QuoteModalContextType {
  openQuoteModal: (preselectedFormation?: string) => void;
  closeQuoteModal: () => void;
  isOpen: boolean;
}

const QuoteModalContext = createContext<QuoteModalContextType | undefined>(undefined);

export const useQuoteModal = () => {
  const context = useContext(QuoteModalContext);
  if (!context) throw new Error("useQuoteModal must be used within a QuoteModalProvider");
  return context;
};

export const QuoteModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [preselectedFormation, setPreselectedFormation] = useState("");

  const openQuoteModal = (formation?: string) => {
    setPreselectedFormation(formation || "");
    setIsOpen(true);
  };
  const closeQuoteModal = () => { setIsOpen(false); setPreselectedFormation(""); };

  return (
    <QuoteModalContext.Provider value={{ openQuoteModal, closeQuoteModal, isOpen }}>
      {children}
      <QuoteRequestModal isOpen={isOpen} onClose={closeQuoteModal} preselectedFormation={preselectedFormation} />
    </QuoteModalContext.Provider>
  );
};

// ── Main modal ────────────────────────────────────────
const QuoteRequestModal = ({ isOpen, onClose, preselectedFormation = "" }: { isOpen: boolean; onClose: () => void; preselectedFormation?: string }) => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formation, setFormation] = useState(preselectedFormation);
  const [contact, setContact] = useState({ firstName: "", lastName: "", email: "", phone: "" });
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const totalSteps = 3;

  useEffect(() => {
    if (preselectedFormation) setFormation(preselectedFormation);
  }, [preselectedFormation]);

  const goNext = () => { setDirection(1); setStep((s) => Math.min(s + 1, totalSteps)); };
  const goBack = () => { setDirection(-1); setStep((s) => Math.max(s - 1, 1)); };

  const handleFormationSelect = (value: string) => {
    setFormation(value);
    setTimeout(() => { setDirection(1); setStep(2); }, 400);
  };

  const handleContactChange = (key: string, val: string) => {
    setContact((p) => ({ ...p, [key]: val }));
    if (errors[key]) setErrors((p) => ({ ...p, [key]: "" }));
  };

  const handleSubmit = async () => {
    const result = contactSchema.safeParse(contact);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((e) => { fieldErrors[e.path[0] as string] = e.message; });
      setErrors(fieldErrors);
      setDirection(-1);
      setStep(2);
      return;
    }
    setErrors({});
    setIsSubmitting(true);

    try {
      const formationLabel = formations.find((f) => f.value === formation)?.label || formation;
      const { error: dbError } = await supabase
        .from("pre_registrations")
        .insert({
          first_name: result.data.firstName,
          last_name: result.data.lastName,
          email: result.data.email,
          phone: result.data.phone,
          formation_title: formationLabel,
          formation_duration: "Devis demandé",
        });

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
      } catch { /* non-blocking */ }

      setIsSuccess(true);
      toast({ title: "Demande envoyée !", description: "Nous vous recontacterons sous 24h." });
      setTimeout(resetAndClose, 2500);
    } catch {
      toast({ title: "Erreur", description: "Veuillez réessayer.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setStep(1); setDirection(1);
    setFormation(preselectedFormation || "");
    setContact({ firstName: "", lastName: "", email: "", phone: "" });
    setMessage(""); setErrors({}); setIsSuccess(false);
    onClose();
  };

  const slideVariants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -40 : 40 }),
  };

  const selectedFormation = formations.find((f) => f.value === formation);

  const contactFields = [
    { key: "firstName" as const, label: "Prénom", icon: User, placeholder: "Jean" },
    { key: "lastName" as const, label: "Nom", icon: User, placeholder: "Dupont" },
    { key: "email" as const, label: "Email", icon: Mail, placeholder: "jean@email.com", type: "email" },
    { key: "phone" as const, label: "Téléphone", icon: Phone, placeholder: "06 12 34 56 78", type: "tel" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={() => !isSubmitting && resetAndClose()}>
      <DialogContent className="max-w-[460px] bg-card p-0 gap-0 overflow-hidden">
        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div key="success" className="py-12 text-center px-6" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4"
              >
                <CheckCircle2 className="w-10 h-10 text-primary" />
              </motion.div>
              <h3 className="text-xl font-bold text-primary mb-2">Demande envoyée !</h3>
              <p className="text-muted-foreground text-sm">Notre équipe vous contactera sous 24h.</p>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {/* Header with gradient accent */}
              <div className="bg-gradient-to-r from-primary/5 via-[hsl(var(--cta))]/5 to-transparent px-5 pt-5 pb-3">
                <DialogHeader className="pb-0">
                  <DialogTitle className="flex items-center gap-2 text-lg font-black text-primary">
                    <div className="w-8 h-8 rounded-lg bg-[hsl(var(--cta))]/15 flex items-center justify-center">
                      <FileText className="w-4 h-4 text-[hsl(var(--cta))]" />
                    </div>
                    Devis gratuit
                  </DialogTitle>
                  <DialogDescription className="text-xs">Rapide et sans engagement</DialogDescription>
                </DialogHeader>
              </div>

              <div className="px-5 pb-5 space-y-3">
                {/* Step dots */}
                <div className="flex items-center justify-center gap-3 py-1">
                  {[1, 2, 3].map((s) => (
                    <div key={s} className="flex items-center gap-2">
                      <motion.div
                        animate={{ 
                          width: step === s ? 24 : 8,
                          backgroundColor: step >= s ? "hsl(var(--cta))" : "hsl(var(--muted))"
                        }}
                        transition={{ duration: 0.3 }}
                        className="h-2 rounded-full"
                      />
                    </div>
                  ))}
                </div>

                {/* Step content */}
                <AnimatePresence mode="wait" custom={direction}>
                  {/* STEP 1 — Formation grid */}
                  {step === 1 && (
                    <motion.div key="s1" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.2 }}>
                      <p className="font-semibold text-sm mb-3 text-center">Quelle formation vous intéresse ?</p>
                      <div className="grid grid-cols-3 gap-2">
                        {formations.map((f, i) => (
                          <motion.button
                            key={f.value}
                            type="button"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            onClick={() => handleFormationSelect(f.value)}
                            className={cn(
                              "relative flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 cursor-pointer transition-all text-center group",
                              formation === f.value
                                ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
                                : "border-border hover:border-primary/30 hover:shadow-sm"
                            )}
                          >
                            <div className={cn(
                              "w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center transition-transform group-hover:scale-110",
                              f.color
                            )}>
                              <f.icon className={cn("h-5 w-5", formation === f.value ? "text-primary" : "text-foreground/70")} />
                            </div>
                            <span className={cn("font-bold text-xs leading-tight", formation === f.value && "text-primary")}>{f.label}</span>
                            <span className="text-[10px] text-muted-foreground leading-tight">{f.desc}</span>
                            {formation === f.value && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-primary flex items-center justify-center"
                              >
                                <CheckCircle2 className="h-3 w-3 text-white" />
                              </motion.div>
                            )}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2 — Contact */}
                  {step === 2 && (
                    <motion.div key="s2" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.2 }}>
                      {selectedFormation && (
                        <div className="flex items-center gap-2 mb-3 p-2 rounded-lg bg-primary/5 border border-primary/10">
                          <selectedFormation.icon className="w-4 h-4 text-primary shrink-0" />
                          <span className="text-xs font-medium text-primary">{selectedFormation.label}</span>
                          <span className="text-xs text-muted-foreground">· {selectedFormation.desc}</span>
                        </div>
                      )}
                      <div className="grid grid-cols-2 gap-3">
                        {contactFields.slice(0, 2).map((field) => (
                          <div key={field.key} className="space-y-1">
                            <Label className="text-xs font-medium">{field.label} *</Label>
                            <div className="relative">
                              <field.icon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                              <Input
                                placeholder={field.placeholder}
                                value={contact[field.key]}
                                onChange={(e) => handleContactChange(field.key, e.target.value)}
                                className={cn("pl-9 h-9 text-sm", errors[field.key] && "border-destructive")}
                                disabled={isSubmitting}
                              />
                            </div>
                            {errors[field.key] && <p className="text-[10px] text-destructive">{errors[field.key]}</p>}
                          </div>
                        ))}
                      </div>
                      <div className="space-y-3 mt-3">
                        {contactFields.slice(2).map((field) => (
                          <div key={field.key} className="space-y-1">
                            <Label className="text-xs font-medium">{field.label} *</Label>
                            <div className="relative">
                              <field.icon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                              <Input
                                type={field.type}
                                placeholder={field.placeholder}
                                value={contact[field.key]}
                                onChange={(e) => handleContactChange(field.key, e.target.value)}
                                className={cn("pl-9 h-9 text-sm", errors[field.key] && "border-destructive")}
                                disabled={isSubmitting}
                              />
                            </div>
                            {errors[field.key] && <p className="text-[10px] text-destructive">{errors[field.key]}</p>}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3 — Message + Recap */}
                  {step === 3 && (
                    <motion.div key="s3" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.2 }}>
                      <Textarea
                        placeholder="Questions, disponibilités, besoins particuliers... (optionnel)"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="resize-none h-20 text-sm"
                        disabled={isSubmitting}
                        maxLength={1000}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mt-3 p-3 rounded-xl bg-gradient-to-br from-primary/5 to-[hsl(var(--cta))]/5 border border-primary/10 text-sm space-y-2"
                      >
                        <p className="font-bold text-foreground flex items-center gap-1.5 text-xs">
                          <Sparkles className="w-3.5 h-3.5 text-[hsl(var(--cta))]" />
                          Récapitulatif de votre demande
                        </p>
                        {selectedFormation && (
                          <div className="flex items-center gap-2">
                            <div className={cn("w-7 h-7 rounded-lg bg-gradient-to-br flex items-center justify-center", selectedFormation.color)}>
                              <selectedFormation.icon className="w-3.5 h-3.5 text-primary" />
                            </div>
                            <div>
                              <p className="font-semibold text-xs text-foreground">{selectedFormation.label}</p>
                              <p className="text-[10px] text-muted-foreground">{selectedFormation.desc}</p>
                            </div>
                          </div>
                        )}
                        <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1 border-t border-border/50">
                          <span>👤 {contact.firstName} {contact.lastName}</span>
                          <span>📧 {contact.email}</span>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex items-center gap-3 pt-2">
                  {step > 1 ? (
                    <Button variant="ghost" size="sm" onClick={goBack} disabled={isSubmitting} className="text-muted-foreground hover:text-foreground">
                      <ArrowLeft className="h-4 w-4 mr-1" /> Retour
                    </Button>
                  ) : <div />}
                  <div className="flex-1" />
                  {step < totalSteps ? (
                    <Button onClick={goNext} disabled={step === 1 && !formation} className="btn-cta-orange rounded-full px-6" size="sm">
                      Suivant <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  ) : (
                    <Button onClick={handleSubmit} disabled={isSubmitting} className="btn-cta-orange rounded-full px-6" size="sm">
                      {isSubmitting ? (
                        <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Envoi...</>
                      ) : (
                        <><Send className="h-4 w-4 mr-2" />Envoyer</>
                      )}
                    </Button>
                  )}
                </div>

                {/* Trust line */}
                <div className="flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>Réponse sous 24h · Sans engagement · RGPD</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default QuoteRequestModal;
