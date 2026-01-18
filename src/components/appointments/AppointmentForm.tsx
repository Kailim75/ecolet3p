import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { 
  CalendarIcon, 
  Clock, 
  User, 
  Mail, 
  CheckCircle2, 
  Loader2,
  GraduationCap
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

// Validation schema
const appointmentSchema = z.object({
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
  formationChoice: z.string()
    .min(1, "Veuillez sélectionner une formation"),
  appointmentDate: z.date({
    required_error: "Veuillez sélectionner une date",
  }),
  appointmentTime: z.string()
    .min(1, "Veuillez sélectionner une heure"),
});

type AppointmentData = z.infer<typeof appointmentSchema>;

const formations = [
  "Formation VTC (182h)",
  "Formation TAXI (182h)", 
  "Formation Passerelle TAXI → VTC (14h)",
  "Formation Passerelle VTC → TAXI (14h)",
  "Formation Mobilité (35h)",
  "Formation Continue VTC (14h)",
  "Formation Continue TAXI (14h)",
];

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"
];

const AppointmentForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof AppointmentData, string>>>({});
  const [formData, setFormData] = useState<Partial<AppointmentData>>({
    firstName: "",
    lastName: "",
    email: "",
    formationChoice: "",
    appointmentTime: "",
  });
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const handleInputChange = (field: keyof AppointmentData, value: string | Date) => {
    if (field === "appointmentDate" && value instanceof Date) {
      setSelectedDate(value);
    }
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const dataToValidate = {
      ...formData,
      appointmentDate: selectedDate,
    };

    const result = appointmentSchema.safeParse(dataToValidate);
    
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof AppointmentData, string>> = {};
      result.error.errors.forEach((error) => {
        const field = error.path[0] as keyof AppointmentData;
        fieldErrors[field] = error.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const { error: dbError } = await supabase
        .from('appointments')
        .insert({
          first_name: result.data.firstName,
          last_name: result.data.lastName,
          email: result.data.email,
          formation_choice: result.data.formationChoice,
          appointment_date: format(result.data.appointmentDate, 'yyyy-MM-dd'),
          appointment_time: result.data.appointmentTime,
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

      setIsSubmitting(false);
      setIsSuccess(true);

      toast({
        title: "Rendez-vous demandé !",
        description: `Nous vous confirmerons votre rendez-vous du ${format(result.data.appointmentDate, 'dd MMMM yyyy', { locale: fr })} à ${result.data.appointmentTime}.`,
      });

      // Reset after showing success
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({ firstName: "", lastName: "", email: "", formationChoice: "", appointmentTime: "" });
        setSelectedDate(undefined);
      }, 3000);
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

  // Disable past dates and weekends
  const disabledDays = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const day = date.getDay();
    return date < today || day === 0 || day === 6;
  };

  if (isSuccess) {
    return (
      <motion.div 
        className="py-12 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
          className="w-24 h-24 rounded-full bg-forest/10 flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle2 className="w-12 h-12 text-forest" />
        </motion.div>
        <h3 className="text-2xl font-bold text-forest mb-3">Demande envoyée !</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          Notre équipe vous contactera rapidement pour confirmer votre rendez-vous.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              className={cn("pl-10", errors.firstName && "border-destructive")}
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
              className={cn("pl-10", errors.lastName && "border-destructive")}
              disabled={isSubmitting}
            />
          </div>
          {errors.lastName && (
            <p className="text-xs text-destructive">{errors.lastName}</p>
          )}
        </div>
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
            className={cn("pl-10", errors.email && "border-destructive")}
            disabled={isSubmitting}
          />
        </div>
        {errors.email && (
          <p className="text-xs text-destructive">{errors.email}</p>
        )}
      </div>

      {/* Formation Choice */}
      <div className="space-y-2">
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
            <SelectTrigger className={cn("pl-10", errors.formationChoice && "border-destructive")}>
              <SelectValue placeholder="Sélectionnez une formation" />
            </SelectTrigger>
            <SelectContent>
              {formations.map((formation) => (
                <SelectItem key={formation} value={formation}>
                  {formation}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {errors.formationChoice && (
          <p className="text-xs text-destructive">{errors.formationChoice}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Date */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-forest">
            Date souhaitée *
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal pl-10 relative",
                  !selectedDate && "text-muted-foreground",
                  errors.appointmentDate && "border-destructive"
                )}
                disabled={isSubmitting}
              >
                <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                {selectedDate ? (
                  format(selectedDate, "PPP", { locale: fr })
                ) : (
                  <span>Choisir une date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && handleInputChange("appointmentDate", date)}
                disabled={disabledDays}
                initialFocus
                locale={fr}
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
          {errors.appointmentDate && (
            <p className="text-xs text-destructive">{errors.appointmentDate}</p>
          )}
        </div>

        {/* Time */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-forest">
            Heure souhaitée *
          </Label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
            <Select 
              value={formData.appointmentTime} 
              onValueChange={(value) => handleInputChange("appointmentTime", value)}
              disabled={isSubmitting}
            >
              <SelectTrigger className={cn("pl-10", errors.appointmentTime && "border-destructive")}>
                <SelectValue placeholder="Sélectionnez une heure" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {errors.appointmentTime && (
            <p className="text-xs text-destructive">{errors.appointmentTime}</p>
          )}
        </div>
      </div>

      {/* Submit button */}
      <Button 
        type="submit" 
        className="w-full btn-primary text-lg py-6"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Envoi en cours...
          </>
        ) : (
          <>
            <CalendarIcon className="w-5 h-5 mr-2" />
            Demander un rendez-vous
          </>
        )}
      </Button>

      {/* Legal notice */}
      <p className="text-xs text-muted-foreground text-center">
        En soumettant ce formulaire, vous acceptez d'être recontacté par notre équipe. 
        Vos données sont traitées conformément à notre politique de confidentialité.
      </p>
    </form>
  );
};

export default AppointmentForm;
