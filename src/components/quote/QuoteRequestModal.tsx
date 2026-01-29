import { useState, createContext, useContext, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  Mail, 
  Phone,
  CheckCircle2, 
  Loader2,
  GraduationCap,
  FileText,
  X,
  Sparkles
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

// Validation schema
const quoteSchema = z.object({
  firstName: z.string()
    .trim()
    .min(2, "Le prénom doit contenir au moins 2 caractères")
    .max(50, "Le prénom ne peut pas dépasser 50 caractères"),
  lastName: z.string()
    .trim()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(50, "Le nom ne peut pas dépasser 50 caractères"),
  email: z.string()
    .trim()
    .email("Veuillez entrer une adresse email valide")
    .max(100, "L'email ne peut pas dépasser 100 caractères"),
  phone: z.string()
    .trim()
    .min(10, "Le numéro de téléphone doit contenir au moins 10 chiffres")
    .max(15, "Le numéro de téléphone ne peut pas dépasser 15 caractères"),
  formationChoice: z.string()
    .min(1, "Veuillez sélectionner une formation"),
  message: z.string().optional(),
});

type QuoteData = z.infer<typeof quoteSchema>;

const formations = [
  { value: "taxi", label: "Formation TAXI Initiale (182h)" },
  { value: "vtc", label: "Formation VTC Initiale (182h)" },
  { value: "vmdtr", label: "Formation VMDTR - Moto Taxi" },
  { value: "passerelle-taxi-vtc", label: "Passerelle TAXI → VTC (14h)" },
  { value: "passerelle-vtc-taxi", label: "Passerelle VTC → TAXI (14h)" },
  { value: "mobilite", label: "Formation Mobilité (35h)" },
  { value: "continue-vtc", label: "Formation Continue VTC (14h)" },
  { value: "continue-taxi", label: "Formation Continue TAXI (14h)" },
  { value: "recup-points", label: "Stage Récupération de Points" },
];

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof QuoteData, string>>>({});
  const [formData, setFormData] = useState<Partial<QuoteData>>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    formationChoice: preselectedFormation,
    message: "",
  });

  // Update formation when preselected changes
  useState(() => {
    if (preselectedFormation) {
      setFormData(prev => ({ ...prev, formationChoice: preselectedFormation }));
    }
  });

  const handleInputChange = (field: keyof QuoteData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = quoteSchema.safeParse(formData);
    
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof QuoteData, string>> = {};
      result.error.errors.forEach((error) => {
        const field = error.path[0] as keyof QuoteData;
        fieldErrors[field] = error.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Insert into pre_registrations table
      const { error: dbError } = await supabase
        .from('pre_registrations')
        .insert({
          first_name: result.data.firstName,
          last_name: result.data.lastName,
          email: result.data.email,
          phone: result.data.phone,
          formation_title: formations.find(f => f.value === result.data.formationChoice)?.label || result.data.formationChoice,
          formation_duration: "À déterminer",
        });

      if (dbError) {
        console.error('Database error:', dbError);
        toast({
          title: "Erreur",
          description: "Une erreur est survenue. Veuillez réessayer.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Send notification email
      try {
        await supabase.functions.invoke('notify-new-registration', {
          body: {
            firstName: result.data.firstName,
            lastName: result.data.lastName,
            email: result.data.email,
            phone: result.data.phone,
            formationTitle: formations.find(f => f.value === result.data.formationChoice)?.label || result.data.formationChoice,
            message: result.data.message,
          }
        });
      } catch (emailError) {
        console.error('Failed to send notification:', emailError);
      }

      setIsSubmitting(false);
      setIsSuccess(true);

      toast({
        title: "Demande envoyée !",
        description: "Nous vous recontacterons sous 24h.",
      });

      // Reset and close after showing success
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({ firstName: "", lastName: "", email: "", phone: "", formationChoice: "", message: "" });
        onClose();
      }, 2500);
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl font-bold text-forest">
            <FileText className="w-6 h-6 text-gold" />
            Demander un devis gratuit
          </DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div 
              key="success"
              className="py-8 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                className="w-20 h-20 rounded-full bg-forest/10 flex items-center justify-center mx-auto mb-4"
              >
                <CheckCircle2 className="w-10 h-10 text-forest" />
              </motion.div>
              <h3 className="text-xl font-bold text-forest mb-2">Demande envoyée !</h3>
              <p className="text-muted-foreground">
                Nous vous recontacterons sous 24h.
              </p>
            </motion.div>
          ) : (
            <motion.form 
              key="form"
              onSubmit={handleSubmit} 
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Reassurance banner */}
              <div className="flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-lg p-3 text-sm">
                <Sparkles className="w-4 h-4 text-gold shrink-0" />
                <span className="text-forest">
                  <strong>Réponse sous 24h</strong> – Devis gratuit et sans engagement
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* First Name */}
                <div className="space-y-1.5">
                  <Label htmlFor="quote-firstName" className="text-sm font-medium text-forest">
                    Prénom *
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="quote-firstName"
                      placeholder="Jean"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className={cn("pl-9 h-10", errors.firstName && "border-destructive")}
                      disabled={isSubmitting}
                    />
                  </div>
                  {errors.firstName && (
                    <p className="text-xs text-destructive">{errors.firstName}</p>
                  )}
                </div>

                {/* Last Name */}
                <div className="space-y-1.5">
                  <Label htmlFor="quote-lastName" className="text-sm font-medium text-forest">
                    Nom *
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="quote-lastName"
                      placeholder="Dupont"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className={cn("pl-9 h-10", errors.lastName && "border-destructive")}
                      disabled={isSubmitting}
                    />
                  </div>
                  {errors.lastName && (
                    <p className="text-xs text-destructive">{errors.lastName}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <Label htmlFor="quote-email" className="text-sm font-medium text-forest">
                  Email *
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="quote-email"
                    type="email"
                    placeholder="jean.dupont@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={cn("pl-9 h-10", errors.email && "border-destructive")}
                    disabled={isSubmitting}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-destructive">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <Label htmlFor="quote-phone" className="text-sm font-medium text-forest">
                  Téléphone *
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="quote-phone"
                    type="tel"
                    placeholder="06 12 34 56 78"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className={cn("pl-9 h-10", errors.phone && "border-destructive")}
                    disabled={isSubmitting}
                  />
                </div>
                {errors.phone && (
                  <p className="text-xs text-destructive">{errors.phone}</p>
                )}
              </div>

              {/* Formation Choice */}
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-forest">
                  Formation souhaitée *
                </Label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                  <Select 
                    value={formData.formationChoice} 
                    onValueChange={(value) => handleInputChange("formationChoice", value)}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger className={cn("pl-9 h-10", errors.formationChoice && "border-destructive")}>
                      <SelectValue placeholder="Sélectionnez une formation" />
                    </SelectTrigger>
                    <SelectContent>
                      {formations.map((formation) => (
                        <SelectItem key={formation.value} value={formation.value}>
                          {formation.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {errors.formationChoice && (
                  <p className="text-xs text-destructive">{errors.formationChoice}</p>
                )}
              </div>

              {/* Message (optional) */}
              <div className="space-y-1.5">
                <Label htmlFor="quote-message" className="text-sm font-medium text-forest">
                  Message (optionnel)
                </Label>
                <Textarea
                  id="quote-message"
                  placeholder="Précisez vos besoins ou questions..."
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  className="resize-none h-20"
                  disabled={isSubmitting}
                />
              </div>

              {/* Submit button */}
              <Button 
                type="submit" 
                className="w-full btn-accent text-base py-5"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <FileText className="w-5 h-5 mr-2" />
                    Recevoir mon devis gratuit
                  </>
                )}
              </Button>

              {/* Legal notice */}
              <p className="text-xs text-muted-foreground text-center">
                Vos données sont traitées conformément au RGPD. 
                Pas de spam, nous vous recontactons uniquement pour votre projet.
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default QuoteRequestModal;
