import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Train } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const contactInfo = [
  {
    icon: MapPin,
    title: "Adresse",
    content: "3 rue Corneille\n92120 Montrouge",
  },
  {
    icon: Phone,
    title: "Téléphone",
    content: "01 88 75 05 55",
    href: "tel:0188750555",
  },
  {
    icon: Mail,
    title: "Email",
    content: "dropacademymontrouge@gmail.com",
    href: "mailto:dropacademymontrouge@gmail.com",
  },
  {
    icon: Clock,
    title: "Horaires",
    content: "Lun-Ven : 9h30-12h30 / 13h30-18h00\nFermé le week-end",
  },
  {
    icon: Train,
    title: "Accès",
    content: "Métro Ligne 4 : Mairie de Montrouge",
  },
];

const formations = [
  "Formation TAXI Initiale",
  "Formation VTC Initiale",
  "Formation VMDTR",
  "Formation TPMR",
  "Formation Accélérée",
  "Formation à Distance",
  "Formation Passerelle",
  "Formation Mobilité",
  "Formation Continue",
  "Récupération de Points",
  "Autre",
];

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    civility: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    formation: "",
    message: "",
    consent: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.civility) {
      newErrors.civility = "Veuillez sélectionner une civilité";
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Le prénom est requis";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Le nom est requis";
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "L'email n'est pas valide";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Le téléphone est requis";
    } else if (!/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = "Le numéro de téléphone n'est pas valide";
    }

    if (!formData.formation) {
      newErrors.formation = "Veuillez sélectionner une formation";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Le message est requis";
    }

    if (!formData.consent) {
      newErrors.consent = "Vous devez accepter les conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({
      civility: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      formation: "",
      message: "",
      consent: false,
    });

    toast({
      title: "Demande envoyée !",
      description: "Nous vous recontacterons dans les plus brefs délais.",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="gradient-hero py-20 md:py-28">
        <div className="container-custom text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 animate-fade-up">
            Contactez-nous
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto animate-fade-up stagger-1">
            Une question sur nos formations ? Prenez rendez-vous ou envoyez-nous un message.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Nos coordonnées
                </h2>
                <div className="space-y-5">
                  {contactInfo.map((info) => (
                    <div key={info.title} className="flex gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                        <info.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">
                          {info.title}
                        </h3>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="text-muted-foreground hover:text-primary transition-colors whitespace-pre-line"
                          >
                            {info.content}
                          </a>
                        ) : (
                          <p className="text-muted-foreground whitespace-pre-line">
                            {info.content}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-muted rounded-xl h-64 flex items-center justify-center overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2627.0833183533!2d2.3137!3d48.8155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDjCsDQ4JzU1LjgiTiAywrAxOCc0OS4zIkU!5e0!3m2!1sfr!2sfr!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localisation T3P Campus"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-card rounded-xl border border-border p-6 md:p-8 shadow-soft">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Envoyez votre demande
                </h2>

                {isSubmitted ? (
                  <div className="text-center py-12 animate-scale-in">
                    <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Demande envoyée !
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Nous vous recontacterons dans les plus brefs délais.
                    </p>
                    <Button onClick={() => setIsSubmitted(false)} variant="outline">
                      Envoyer une autre demande
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Civility */}
                    <div className="space-y-2">
                      <Label>Civilité *</Label>
                      <RadioGroup
                        value={formData.civility}
                        onValueChange={(value) => {
                          setFormData((prev) => ({ ...prev, civility: value }));
                          if (errors.civility) setErrors((prev) => ({ ...prev, civility: "" }));
                        }}
                        className="flex gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="M." id="mr" />
                          <Label htmlFor="mr" className="font-normal cursor-pointer">M.</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Mme" id="mme" />
                          <Label htmlFor="mme" className="font-normal cursor-pointer">Mme</Label>
                        </div>
                      </RadioGroup>
                      {errors.civility && (
                        <p className="text-sm text-destructive">{errors.civility}</p>
                      )}
                    </div>

                    {/* Name fields */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Prénom *</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder="Jean"
                          className={errors.firstName ? "border-destructive" : ""}
                        />
                        {errors.firstName && (
                          <p className="text-sm text-destructive">{errors.firstName}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="lastName">Nom *</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder="Dupont"
                          className={errors.lastName ? "border-destructive" : ""}
                        />
                        {errors.lastName && (
                          <p className="text-sm text-destructive">{errors.lastName}</p>
                        )}
                      </div>
                    </div>

                    {/* Contact fields */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="jean.dupont@exemple.fr"
                          className={errors.email ? "border-destructive" : ""}
                        />
                        {errors.email && (
                          <p className="text-sm text-destructive">{errors.email}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Téléphone *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="06 12 34 56 78"
                          className={errors.phone ? "border-destructive" : ""}
                        />
                        {errors.phone && (
                          <p className="text-sm text-destructive">{errors.phone}</p>
                        )}
                      </div>
                    </div>

                    {/* Formation select */}
                    <div className="space-y-2">
                      <Label>Formation souhaitée *</Label>
                      <Select
                        value={formData.formation}
                        onValueChange={(value) => {
                          setFormData((prev) => ({ ...prev, formation: value }));
                          if (errors.formation) setErrors((prev) => ({ ...prev, formation: "" }));
                        }}
                      >
                        <SelectTrigger className={errors.formation ? "border-destructive" : ""}>
                          <SelectValue placeholder="Sélectionnez une formation" />
                        </SelectTrigger>
                        <SelectContent>
                          {formations.map((f) => (
                            <SelectItem key={f} value={f}>
                              {f}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.formation && (
                        <p className="text-sm text-destructive">{errors.formation}</p>
                      )}
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Décrivez votre projet ou posez vos questions..."
                        rows={5}
                        className={errors.message ? "border-destructive" : ""}
                      />
                      {errors.message && (
                        <p className="text-sm text-destructive">{errors.message}</p>
                      )}
                    </div>

                    {/* Consent */}
                    <div className="space-y-2">
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="consent"
                          checked={formData.consent}
                          onCheckedChange={(checked) => {
                            setFormData((prev) => ({ ...prev, consent: checked as boolean }));
                            if (errors.consent) setErrors((prev) => ({ ...prev, consent: "" }));
                          }}
                        />
                        <Label htmlFor="consent" className="font-normal text-sm leading-relaxed cursor-pointer">
                          J'accepte que mes données soient utilisées pour traiter ma demande et être recontacté(e) 
                          par T3P Campus. *
                        </Label>
                      </div>
                      {errors.consent && (
                        <p className="text-sm text-destructive">{errors.consent}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full btn-accent"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        "Envoi en cours..."
                      ) : (
                        <>
                          Envoyer ma demande
                          <Send className="ml-2 w-5 h-5" />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
