import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Send, CheckCircle2, User, Mail, Phone, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

// Validation schema
const preRegistrationSchema = z.object({
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
    .regex(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/, "Veuillez entrer un numéro de téléphone français valide"),
});

type PreRegistrationData = z.infer<typeof preRegistrationSchema>;

interface PreRegistrationFormProps {
  isOpen: boolean;
  onClose: () => void;
  formationTitle: string;
  formationDuration: string;
}

const PreRegistrationForm = ({ 
  isOpen, 
  onClose, 
  formationTitle, 
  formationDuration 
}: PreRegistrationFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof PreRegistrationData, string>>>({});
  const [formData, setFormData] = useState<PreRegistrationData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const handleInputChange = (field: keyof PreRegistrationData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate form data
    const result = preRegistrationSchema.safeParse(formData);
    
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof PreRegistrationData, string>> = {};
      result.error.errors.forEach((error) => {
        const field = error.path[0] as keyof PreRegistrationData;
        fieldErrors[field] = error.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Insert into database
      const { data: insertedData, error: dbError } = await supabase
        .from('pre_registrations')
        .insert({
          first_name: result.data.firstName,
          last_name: result.data.lastName,
          email: result.data.email,
          phone: result.data.phone,
          formation_title: formationTitle,
          formation_duration: formationDuration,
        })
        .select()
        .single();

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

      // Send notification to admin
      try {
        await supabase.functions.invoke('notify-new-registration', {
          body: {
            type: "INSERT",
            table: "pre_registrations",
            record: insertedData
          }
        });
        console.log('Admin notification sent');
      } catch (notifyError) {
        // Don't block the user if notification fails
        console.error('Failed to send admin notification:', notifyError);
      }

      setIsSubmitting(false);
      setIsSuccess(true);

      toast({
        title: "Pré-inscription envoyée !",
        description: `Nous vous recontacterons rapidement pour la ${formationTitle}.`,
      });
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }

    // Reset after showing success
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({ firstName: "", lastName: "", email: "", phone: "" });
      onClose();
    }, 2000);
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setErrors({});
      setFormData({ firstName: "", lastName: "", email: "", phone: "" });
      setIsSuccess(false);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md bg-card">
        {isSuccess ? (
          <motion.div 
            className="py-8 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
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
              Notre équipe vous contactera sous 24h pour finaliser votre inscription.
            </p>
          </motion.div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-black text-forest">
                Pré-inscription rapide
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Remplissez ce formulaire et nous vous recontacterons rapidement.
              </DialogDescription>
            </DialogHeader>

            {/* Formation info badge */}
            <div className="p-3 bg-forest/5 rounded-lg border border-forest/10 mb-4">
              <p className="text-sm font-semibold text-forest">{formationTitle}</p>
              <p className="text-xs text-muted-foreground">Durée : {formationDuration}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* First Name */}
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm font-medium text-forest">
                  Prénom *
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="firstName"
                    placeholder="Jean"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    className={`pl-10 ${errors.firstName ? "border-destructive" : ""}`}
                    disabled={isSubmitting}
                  />
                </div>
                {errors.firstName && (
                  <p className="text-xs text-destructive">{errors.firstName}</p>
                )}
              </div>

              {/* Last Name */}
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sm font-medium text-forest">
                  Nom *
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="lastName"
                    placeholder="Dupont"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    className={`pl-10 ${errors.lastName ? "border-destructive" : ""}`}
                    disabled={isSubmitting}
                  />
                </div>
                {errors.lastName && (
                  <p className="text-xs text-destructive">{errors.lastName}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-forest">
                  Email *
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="jean.dupont@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`pl-10 ${errors.email ? "border-destructive" : ""}`}
                    disabled={isSubmitting}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-destructive">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-forest">
                  Téléphone *
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="06 12 34 56 78"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className={`pl-10 ${errors.phone ? "border-destructive" : ""}`}
                    disabled={isSubmitting}
                  />
                </div>
                {errors.phone && (
                  <p className="text-xs text-destructive">{errors.phone}</p>
                )}
              </div>

              {/* Submit button */}
              <Button 
                type="submit" 
                className="w-full btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Envoyer ma demande
                  </>
                )}
              </Button>

              {/* Legal notice */}
              <p className="text-xs text-muted-foreground text-center">
                En soumettant ce formulaire, vous acceptez d'être recontacté par notre équipe. 
                Vos données sont traitées conformément à notre politique de confidentialité.
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PreRegistrationForm;
