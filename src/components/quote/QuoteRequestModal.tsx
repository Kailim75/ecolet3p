import React, { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  FileText, ArrowLeft, ArrowRight, Send,
  CarTaxiFront, Car, Bike, BookOpen, RefreshCw, Shield,
  Sparkles, Clock,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

// ── Data ──────────────────────────────────────────────
const formations = [
  { value: "taxi", label: "TAXI Initiale", desc: "182h – Carte pro taxi", icon: CarTaxiFront },
  { value: "vtc", label: "VTC Initiale", desc: "182h – Carte pro VTC", icon: Car },
  { value: "vmdtr", label: "VMDTR / Moto-Taxi", desc: "Carte pro moto-taxi", icon: Bike },
  { value: "mobilite", label: "Mobilité", desc: "35h – Perfectionnement", icon: BookOpen },
  { value: "continue", label: "Formation Continue", desc: "14h – Renouvellement carte", icon: RefreshCw },
  { value: "recup-points", label: "Récupération de Points", desc: "Stage agréé préfecture", icon: Shield },
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

// ── Sub-components ────────────────────────────────────
const StepIndicator = ({ step, totalSteps }: { step: number; totalSteps: number }) => {
  const labels = ["Formation", "Coordonnées", "Finaliser"];
  return (
    <div className="flex items-center gap-1 sm:gap-2">
      {labels.map((label, i) => {
        const num = i + 1;
        const isActive = step >= num;
        const isDone = step > num;
        return (
          <React.Fragment key={num}>
            <div className="flex items-center gap-1.5">
              <motion.div
                animate={{ scale: step === num ? 1.1 : 1 }}
                className={cn(
                  "w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold shrink-0 transition-colors duration-300",
                  isActive ? "bg-[hsl(var(--cta))] text-white shadow-md" : "bg-muted text-muted-foreground"
                )}
              >
                {isDone ? <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> : num}
              </motion.div>
              <span className={cn(
                "text-[10px] sm:text-xs font-medium hidden sm:block transition-colors",
                isActive ? "text-foreground" : "text-muted-foreground"
              )}>
                {label}
              </span>
            </div>
            {i < totalSteps - 1 && (
              <div className={cn("flex-1 h-0.5 rounded-full transition-colors duration-300", isDone ? "bg-[hsl(var(--cta))]" : "bg-muted")} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

const FormationCard = ({ f, selected, onSelect }: { f: typeof formations[0]; selected: boolean; onSelect: () => void }) => (
  <motion.button
    type="button"
    onClick={onSelect}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className={cn(
      "flex items-center gap-3 p-3 sm:p-3.5 rounded-xl border-2 cursor-pointer transition-all text-left w-full",
      selected
        ? "border-primary bg-primary/5 shadow-sm"
        : "border-border hover:border-primary/40 hover:bg-muted/30"
    )}
  >
    <div className={cn(
      "w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors",
      selected ? "bg-primary/15" : "bg-muted"
    )}>
      <f.icon className={cn("h-5 w-5 transition-colors", selected ? "text-primary" : "text-muted-foreground")} />
    </div>
    <div className="min-w-0 flex-1">
      <p className={cn("font-semibold text-sm", selected && "text-primary")}>{f.label}</p>
      <p className="text-xs text-muted-foreground">{f.desc}</p>
    </div>
    <div className={cn(
      "w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-all",
      selected ? "border-primary bg-primary" : "border-muted-foreground/30"
    )}>
      {selected && <CheckCircle2 className="h-3 w-3 text-white" />}
    </div>
  </motion.button>
);

const ContactField = ({ field, contact, errors, isSubmitting, onChange }: {
  field: { key: "firstName" | "lastName" | "email" | "phone"; label: string; icon: any; placeholder: string; type?: string };
  contact: Record<string, string>;
  errors: Record<string, string>;
  isSubmitting: boolean;
  onChange: (key: string, val: string) => void;
}) => (
  <div className="space-y-1">
    <Label className="text-xs sm:text-sm font-medium">{field.label} *</Label>
    <div className="relative">
      <field.icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <Input
        type={field.type || "text"}
        placeholder={field.placeholder}
        value={contact[field.key]}
        onChange={(e) => onChange(field.key, e.target.value)}
        className={cn("pl-10 h-10", errors[field.key] && "border-destructive focus-visible:ring-destructive")}
        disabled={isSubmitting}
      />
    </div>
    <AnimatePresence>
      {errors[field.key] && (
        <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-xs text-destructive">
          {errors[field.key]}
        </motion.p>
      )}
    </AnimatePresence>
  </div>
);

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
  const progress = (step / totalSteps) * 100;

  useEffect(() => {
    if (preselectedFormation) setFormation(preselectedFormation);
  }, [preselectedFormation]);

  const goNext = () => { setDirection(1); setStep((s) => Math.min(s + 1, totalSteps)); };
  const goBack = () => { setDirection(-1); setStep((s) => Math.max(s - 1, 1)); };

  const handleFormationSelect = (value: string) => {
    setFormation(value);
    // Auto-advance after short delay for better UX
    setTimeout(() => { setDirection(1); setStep(2); }, 350);
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
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 50 : -50 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -50 : 50 }),
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
      <DialogContent className="max-w-[440px] bg-card p-4 sm:p-6 gap-3">
        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div key="success" className="py-10 text-center" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
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
              <DialogHeader className="pb-1">
                <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl font-black text-primary">
                  <FileText className="w-5 h-5 text-[hsl(var(--cta))]" />
                  Devis gratuit
                </DialogTitle>
                <DialogDescription className="text-xs sm:text-sm">Rapide, gratuit et sans engagement</DialogDescription>
              </DialogHeader>

              {/* Reassurance */}
              <div className="flex items-center gap-2 bg-[hsl(var(--cta))]/10 border border-[hsl(var(--cta))]/20 rounded-lg px-3 py-2 text-xs sm:text-sm">
                <Clock className="w-4 h-4 text-[hsl(var(--cta))] shrink-0" />
                <span><strong>Réponse sous 24h</strong> – Sans engagement</span>
              </div>

              {/* Steps */}
              <StepIndicator step={step} totalSteps={totalSteps} />
              <Progress value={progress} className="h-1 mb-1" />

              {/* Step content */}
              <div className="min-h-[260px] sm:min-h-[280px] flex flex-col">
                <AnimatePresence mode="wait" custom={direction}>
                  {step === 1 && (
                    <motion.div key="s1" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.2 }} className="flex-1">
                      <p className="font-semibold text-sm mb-2">Quelle formation vous intéresse ?</p>
                      <div className="space-y-2 max-h-[240px] overflow-y-auto pr-1">
                        {formations.map((f) => (
                          <FormationCard key={f.value} f={f} selected={formation === f.value} onSelect={() => handleFormationSelect(f.value)} />
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div key="s2" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.2 }} className="flex-1">
                      <p className="font-semibold text-sm mb-2">Vos coordonnées</p>
                      <div className="grid grid-cols-2 gap-3">
                        {contactFields.slice(0, 2).map((field) => (
                          <ContactField key={field.key} field={field} contact={contact} errors={errors} isSubmitting={isSubmitting} onChange={handleContactChange} />
                        ))}
                      </div>
                      <div className="space-y-3 mt-3">
                        {contactFields.slice(2).map((field) => (
                          <ContactField key={field.key} field={field} contact={contact} errors={errors} isSubmitting={isSubmitting} onChange={handleContactChange} />
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div key="s3" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.2 }} className="flex-1">
                      <p className="font-semibold text-sm mb-2">Précisez votre demande (optionnel)</p>
                      <Textarea
                        placeholder="Questions, disponibilités, besoins particuliers..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="resize-none h-24"
                        disabled={isSubmitting}
                        maxLength={1000}
                      />
                      {/* Recap */}
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="mt-3 p-3 bg-primary/5 border border-primary/10 rounded-xl text-sm space-y-1.5"
                      >
                        <p className="font-semibold text-foreground flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-[hsl(var(--cta))]" />
                          Récapitulatif
                        </p>
                        {selectedFormation && (
                          <div className="flex items-center gap-2">
                            <selectedFormation.icon className="w-4 h-4 text-primary shrink-0" />
                            <span className="text-muted-foreground">
                              <strong className="text-foreground">{selectedFormation.label}</strong> – {selectedFormation.desc}
                            </span>
                          </div>
                        )}
                        <p className="text-muted-foreground">
                          👤 <strong className="text-foreground">{contact.firstName} {contact.lastName}</strong>
                        </p>
                        <p className="text-muted-foreground text-xs">
                          📧 {contact.email} · 📱 {contact.phone}
                        </p>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Navigation */}
              <div className="flex gap-3 pt-2 border-t border-border/50">
                {step > 1 ? (
                  <Button variant="ghost" size="sm" onClick={goBack} disabled={isSubmitting} className="text-muted-foreground">
                    <ArrowLeft className="h-4 w-4 mr-1" /> Retour
                  </Button>
                ) : <div />}
                <div className="flex-1" />
                {step < totalSteps ? (
                  <Button onClick={goNext} disabled={step === 1 && !formation} className="btn-cta-orange" size="sm">
                    Suivant <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} disabled={isSubmitting} className="btn-cta-orange" size="sm">
                    {isSubmitting ? (
                      <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Envoi...</>
                    ) : (
                      <><Send className="h-4 w-4 mr-2" />Envoyer ma demande</>
                    )}
                  </Button>
                )}
              </div>

              <p className="text-[10px] sm:text-xs text-muted-foreground text-center">
                Vos données sont traitées conformément au RGPD · Sans engagement
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default QuoteRequestModal;
