import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Send, CheckCircle2, User, Mail, Phone, Loader2,
  CarTaxiFront, Car, Bike, Sun, Moon, Calendar, ArrowLeft, ArrowRight,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { formatSessionPeriod } from "@/lib/formatSessionPeriod";
import { getSessionFormat } from "@/lib/sessionFormat";

const formationChoices = [
  { value: "taxi", label: "Taxi", icon: CarTaxiFront },
  { value: "vtc", label: "VTC", icon: Car },
  { value: "vmdtr", label: "VMDTR / Moto-Taxi", icon: Bike },
];

const scheduleChoices = [
  { value: "jour", label: "Journée (9h30–16h30)", icon: Sun },
  { value: "soir", label: "Soirée (18h–21h30)", icon: Moon },
];

const NONE_MATCHES = "__none__";

const contactSchema = z.object({
  firstName: z.string().trim().min(2, "Prénom requis (min 2 caractères)"),
  lastName: z.string().trim().min(2, "Nom requis (min 2 caractères)"),
  email: z.string().trim().email("Email invalide"),
  phone: z.string().trim().regex(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/, "Numéro français invalide"),
});

interface StepPreRegistrationFormProps {
  isOpen: boolean;
  onClose: () => void;
  defaultFormation?: string;
}

type SessionRow = {
  id: string;
  start_date: string;
  end_date: string | null;
  start_time: string;
  end_time: string;
  notes: string | null;
  formations: { title: string; category: string } | null;
};

/**
 * Ramène la formation transmise par la page vers une des valeurs de formationChoices.
 */
const normalizeFormation = (value?: string): string => {
  if (!value) return "";
  const v = value.toLowerCase();
  if (v.includes("vmdtr") || v.includes("moto")) return "vmdtr";
  if (v.includes("vtc")) return "vtc";
  if (v.includes("taxi")) return "taxi";
  return value;
};

const trimTime = (t: string) => (t ?? "").slice(0, 5);

const StepPreRegistrationForm = ({
  isOpen,
  onClose,
  defaultFormation,
}: StepPreRegistrationFormProps) => {
  const { toast } = useToast();
  const formationKnown = Boolean(defaultFormation);

  const [step, setStep] = useState(formationKnown ? 2 : 1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formation, setFormation] = useState(normalizeFormation(defaultFormation));
  const [schedule, setSchedule] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [sessions, setSessions] = useState<SessionRow[]>([]);
  const [selectedSessionId, setSelectedSessionId] = useState<string>("");
  const [contact, setContact] = useState({ firstName: "", lastName: "", email: "", phone: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const totalSteps = 3;
  const visibleSteps = formationKnown ? 2 : 3;
  const visibleStep = formationKnown ? step - 1 : step;
  const progress = (visibleStep / visibleSteps) * 100;
  const minStep = formationKnown ? 2 : 1;

  // Charger les sessions de la formation sélectionnée
  useEffect(() => {
    if (!isOpen) return;
    const cat = formation;
    if (cat !== "taxi" && cat !== "vtc" && cat !== "vmdtr") {
      setSessions([]);
      setSelectedSessionId("");
      return;
    }
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from("formation_sessions")
        .select("id, start_date, end_date, start_time, end_time, notes, formations!inner(title, category)")
        .in("status", ["upcoming", "ongoing"])
        .eq("formations.category", cat)
        .order("start_date", { ascending: true });
      if (cancelled) return;
      setSessions((data as unknown as SessionRow[]) ?? []);
      setSelectedSessionId("");
    })();
    return () => { cancelled = true; };
  }, [formation, isOpen]);

  const hasSessions = sessions.length > 0;
  const showLegacyScheduleBlock = !hasSessions || selectedSessionId === NONE_MATCHES;

  const canNext = () => {
    if (step === 1) return !!formation;
    if (step === 2) {
      if (hasSessions && selectedSessionId && selectedSessionId !== NONE_MATCHES) return true;
      return !!schedule;
    }
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
      const formationLabel = formationChoices.find((f) => f.value === formation)?.label || formation;
      const chosenSession =
        hasSessions && selectedSessionId && selectedSessionId !== NONE_MATCHES
          ? sessions.find((s) => s.id === selectedSessionId) ?? null
          : null;

      const scheduleLabel = scheduleChoices.find((s) => s.value === schedule)?.label || schedule;

      let formationDuration: string;
      if (chosenSession) {
        const fmt = getSessionFormat(chosenSession.start_time);
        formationDuration = `Session : ${formatSessionPeriod(chosenSession.start_date, chosenSession.end_date)} (${fmt.label}, ${trimTime(chosenSession.start_time)}–${trimTime(chosenSession.end_time)})`;
      } else if (preferredDate) {
        formationDuration = `Date souhaitée : ${preferredDate}`;
      } else {
        formationDuration = "Date à définir";
      }

      const formationTitle = chosenSession
        ? formationLabel
        : `${formationLabel}${scheduleLabel ? ` (${scheduleLabel})` : ""}`;

      const { data: insertedData, error: dbError } = await supabase
        .from("pre_registrations")
        .insert({
          first_name: result.data.firstName,
          last_name: result.data.lastName,
          email: result.data.email,
          phone: result.data.phone,
          formation_title: formationTitle,
          formation_duration: formationDuration,
          session_id: chosenSession?.id ?? null,
        })
        .select()
        .single();

      if (dbError) throw dbError;

      try {
        await supabase.functions.invoke("notify-new-registration", {
          body: { type: "INSERT", table: "pre_registrations", record: insertedData },
        });
      } catch {
        // Non-blocking
      }

      setIsSuccess(true);
      toast({ title: "Inscription envoyée !", description: "Nous vous recontacterons sous 24h." });

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
    setStep(formationKnown ? 2 : 1);
    setFormation(normalizeFormation(defaultFormation));
    setSchedule("");
    setPreferredDate("");
    setSelectedSessionId("");
    setContact({ firstName: "", lastName: "", email: "", phone: "" });
    setErrors({});
    setIsSuccess(false);
    onClose();
  };

  const slideVariant = {
    enter: { opacity: 0, x: 40 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => !isSubmitting && resetAndClose()}>
      <DialogContent className="max-w-md bg-card max-h-[90vh] overflow-y-auto">
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
              <DialogTitle className="text-xl font-black text-primary">Inscription en {visibleSteps} étapes</DialogTitle>
              <DialogDescription>Rapide et sans engagement</DialogDescription>
            </DialogHeader>

            <div className="flex items-center gap-2 mb-2">
              {[
                { num: 1, label: "Formation" },
                { num: 2, label: "Horaires" },
                { num: 3, label: "Coordonnées" },
              ].map((s, i) => {
                const adjustedNum = formationKnown ? s.num - 1 : s.num;
                return (
                  <div key={s.num} className={`flex items-center gap-2 flex-1 ${formationKnown && s.num === 1 ? "hidden" : ""}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-colors ${
                      visibleStep >= adjustedNum
                        ? "bg-[hsl(var(--cta))] text-white"
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {visibleStep > adjustedNum ? <CheckCircle2 className="h-4 w-4" /> : adjustedNum}
                    </div>
                    <span className={`text-xs font-medium hidden sm:block ${visibleStep >= adjustedNum ? "text-foreground" : "text-muted-foreground"}`}>
                      {s.label}
                    </span>
                    {i < 2 && <div className={`flex-1 h-0.5 ${visibleStep > adjustedNum ? "bg-[hsl(var(--cta))]" : "bg-muted"}`} />}
                  </div>
                );
              })}
            </div>
            <Progress value={progress} className="h-1.5 mb-4" />

            {formationKnown && (
              <div className="flex items-center justify-between gap-3 mb-4 p-3 rounded-lg bg-primary/5 border border-primary/20">
                <span className="text-sm">
                  Formation : <strong>{formationChoices.find((f) => f.value === formation)?.label ?? formation}</strong>
                </span>
                <button type="button" onClick={() => setStep(1)} className="text-xs font-semibold text-accent hover:underline">
                  Modifier
                </button>
              </div>
            )}

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="s1" variants={slideVariant} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }}>
                  <p className="font-semibold mb-3">Quelle formation vous intéresse ?</p>
                  <RadioGroup value={formation} onValueChange={setFormation} className="space-y-3">
                    {formationChoices.map((f) => (
                      <label
                        key={f.value}
                        className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          formation === f.value
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/40"
                        }`}
                      >
                        <RadioGroupItem value={f.value} />
                        <f.icon className="h-5 w-5 text-primary" />
                        <span className="font-medium">{f.label}</span>
                      </label>
                    ))}
                  </RadioGroup>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="s2" variants={slideVariant} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }}>
                  {hasSessions ? (
                    <>
                      <p className="font-semibold mb-3">Choisissez votre session</p>
                      <RadioGroup value={selectedSessionId} onValueChange={setSelectedSessionId} className="space-y-3 mb-2">
                        {sessions.map((s) => {
                          const fmt = getSessionFormat(s.start_time);
                          const active = selectedSessionId === s.id;
                          return (
                            <label
                              key={s.id}
                              className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                active ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
                              }`}
                            >
                              <RadioGroupItem value={s.id} className="mt-1" />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${fmt.className}`}>
                                    <fmt.Icon className="h-3 w-3" />
                                    {fmt.label}
                                  </span>
                                  <span className="font-semibold text-sm">
                                    {formatSessionPeriod(s.start_date, s.end_date)}
                                  </span>
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">
                                  Horaires : {trimTime(s.start_time)}–{trimTime(s.end_time)}
                                </div>
                                {s.notes && (
                                  <div className="text-xs text-muted-foreground mt-1 italic">
                                    {s.notes}
                                  </div>
                                )}
                              </div>
                            </label>
                          );
                        })}

                        <label
                          className={`flex items-center gap-3 p-3 rounded-xl border-2 border-dashed cursor-pointer transition-all ${
                            selectedSessionId === NONE_MATCHES
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/40"
                          }`}
                        >
                          <RadioGroupItem value={NONE_MATCHES} />
                          <span className="text-sm font-medium">Aucune de ces dates ne me convient</span>
                        </label>
                      </RadioGroup>
                    </>
                  ) : (
                    <p className="font-semibold mb-3">Préférence horaire</p>
                  )}

                  {showLegacyScheduleBlock && (
                    <div className={hasSessions ? "mt-4 pt-4 border-t" : ""}>
                      {hasSessions && (
                        <p className="text-sm font-semibold mb-3">Indiquez vos disponibilités</p>
                      )}
                      <RadioGroup value={schedule} onValueChange={setSchedule} className="space-y-3 mb-4">
                        {scheduleChoices.map((s) => (
                          <label
                            key={s.value}
                            className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                              schedule === s.value
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/40"
                            }`}
                          >
                            <RadioGroupItem value={s.value} />
                            <s.icon className="h-5 w-5 text-primary" />
                            <span className="font-medium">{s.label}</span>
                          </label>
                        ))}
                      </RadioGroup>

                      <Label className="text-sm font-medium">Date souhaitée (optionnel)</Label>
                      <div className="relative mt-1">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          type="date"
                          value={preferredDate}
                          onChange={(e) => setPreferredDate(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="s3" variants={slideVariant} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }}>
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
            </AnimatePresence>

            <div className="flex gap-3 mt-6">
              {step > minStep && (
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

            <p className="text-xs text-muted-foreground text-center mt-3">
              Sans engagement. Vos données sont traitées conformément à notre politique de confidentialité.
            </p>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default StepPreRegistrationForm;
