import { useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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
    content: "montrouge@ecolet3p.fr",
    href: "mailto:montrouge@ecolet3p.fr",
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

// Animation variants with proper typing
const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const staggerItemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5 }
  }
};

const scaleUpVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5 }
  }
};

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    formation: "",
    message: "",
    consent: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Le nom complet est requis";
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = "Le nom doit contenir au moins 3 caractères";
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
      fullName: "",
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

  const heroRef = useRef(null);
  const contactRef = useRef(null);
  
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const { scrollYProgress: contactScroll } = useScroll({
    target: contactRef,
    offset: ["start end", "end start"]
  });

  const heroY = useTransform(heroScroll, [0, 1], [0, 100]);
  const heroScale = useTransform(heroScroll, [0, 1], [1, 1.1]);
  const contactY1 = useTransform(contactScroll, [0, 1], [80, -80]);
  const contactY2 = useTransform(contactScroll, [0, 1], [-60, 60]);
  const contactRotate = useTransform(contactScroll, [0, 1], [-5, 5]);

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact ECOLE T3P",
    "description": "Contactez notre centre de formation Taxi VTC à Montrouge",
    "url": "https://ecolet3p.fr/contact",
    "mainEntity": {
      "@type": "LocalBusiness",
      "name": "ECOLE T3P",
      "telephone": "+33188750555",
      "email": "montrouge@ecolet3p.fr",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "3 rue Corneille",
        "addressLocality": "Montrouge",
        "postalCode": "92120",
        "addressCountry": "FR"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 48.8155,
        "longitude": 2.3137
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:30",
          "closes": "18:00"
        }
      ]
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Accueil",
        "item": "https://ecolet3p.fr/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Contact",
        "item": "https://ecolet3p.fr/contact"
      }
    ]
  };

  return (
    <Layout>
      <Helmet>
        <title>Contact ECOLE T3P Montrouge - Formation Taxi VTC Bagneux Vanves | 01 88 75 05 55</title>
        <meta name="description" content="Contactez ECOLE T3P à Montrouge. 3 rue Corneille 92120. Tél : 01 88 75 05 55. Métro Mairie de Montrouge. Accessible depuis Bagneux, Vanves, Malakoff, Châtillon, Paris 13e, 14e, 15e." />
        <meta name="keywords" content="contact formation taxi Montrouge, centre VTC Bagneux, formation taxi Vanves, centre formation Malakoff, formation VTC Châtillon, ECOLE T3P contact, devis formation taxi 92, centre formation sud Paris" />
        <link rel="canonical" href="https://ecolet3p.fr/contact" />
        
        <meta property="og:title" content="Contact ECOLE T3P Montrouge - Formation Taxi VTC Bagneux Vanves" />
        <meta property="og:description" content="3 rue Corneille 92120 Montrouge. Tél : 01 88 75 05 55. Métro Mairie de Montrouge. Accessible depuis Bagneux, Vanves, Malakoff et Paris 14e." />
        <meta property="og:url" content="https://ecolet3p.fr/contact" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://ecolet3p.fr/og-image.jpg" />
        
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Contact ECOLE T3P Montrouge | Sud Paris 92" />
        <meta name="twitter:description" content="01 88 75 05 55. 3 rue Corneille, Montrouge. Accessible depuis Bagneux, Vanves, Malakoff." />
        
        <script type="application/ld+json">{JSON.stringify(contactSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      {/* Hero - LiveMentor Style with Parallax */}
      <section ref={heroRef} className="bg-cream py-20 md:py-28 relative overflow-hidden">
        {/* Parallax Decorative Elements */}
        <motion.div 
          style={{ y: heroY, scale: heroScale }}
          className="absolute -top-20 -left-20 w-64 h-64 bg-forest/5 rounded-full blur-3xl pointer-events-none"
        />
        <motion.div 
          style={{ y: heroY }}
          className="absolute top-1/2 -right-32 w-80 h-80 bg-gold/10 rounded-full blur-3xl pointer-events-none"
        />
        <motion.div 
          className="absolute bottom-10 left-1/4 w-40 h-40 bg-forest/5 rounded-full blur-2xl pointer-events-none"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div 
          className="absolute top-20 right-1/4 w-32 h-32 bg-gold/15 rounded-full blur-2xl pointer-events-none"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        
        <div className="container-custom text-center relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainerVariants}
          >
            <motion.span 
              variants={fadeUpVariants}
              className="badge-livementor mb-6 inline-block"
            >
              📬 Contactez-nous
            </motion.span>
            <motion.h1 
              variants={fadeUpVariants}
              className="section-title mb-6"
            >
              PARLONS DE VOTRE<br />
              <span className="text-gold">PROJET</span>
            </motion.h1>
            <motion.p 
              variants={fadeUpVariants}
              className="section-subtitle mx-auto"
            >
              Une question sur nos formations ? Prenez rendez-vous ou envoyez-nous un message.
              Notre équipe vous répond sous 24h.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section with Parallax */}
      <section ref={contactRef} className="section-padding bg-background relative overflow-hidden">
        {/* Parallax Background Elements */}
        <motion.div 
          style={{ y: contactY1, rotate: contactRotate }}
          className="absolute -top-32 left-10 w-72 h-72 bg-forest/5 rounded-full blur-3xl pointer-events-none"
        />
        <motion.div 
          style={{ y: contactY2 }}
          className="absolute top-1/3 -right-20 w-64 h-64 bg-gold/10 rounded-full blur-3xl pointer-events-none"
        />
        <motion.div 
          style={{ y: contactY1 }}
          className="absolute -bottom-20 left-1/3 w-56 h-56 bg-forest/5 rounded-full blur-2xl pointer-events-none"
        />

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <motion.div 
              className="lg:col-span-2 space-y-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainerVariants}
            >
              <motion.div variants={fadeUpVariants}>
                <h2 className="text-2xl font-black text-forest uppercase tracking-tight mb-6">
                  Nos coordonnées
                </h2>
                <div className="space-y-5">
                  {contactInfo.map((info, index) => (
                    <motion.div 
                      key={info.title} 
                      className="flex gap-4"
                      variants={staggerItemVariants}
                      custom={index}
                    >
                      <motion.div 
                        className="icon-container shrink-0"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <info.icon className="w-6 h-6" />
                      </motion.div>
                      <div>
                        <h3 className="font-bold text-forest mb-1">
                          {info.title}
                        </h3>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="text-muted-foreground hover:text-forest transition-colors whitespace-pre-line"
                          >
                            {info.content}
                          </a>
                        ) : (
                          <p className="text-muted-foreground whitespace-pre-line">
                            {info.content}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Map */}
              <motion.div 
                variants={scaleUpVariants}
                className="rounded-xl h-64 overflow-hidden border-2 border-border shadow-lg"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2627.0833183533!2d2.3137!3d48.8155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDjCsDQ4JzU1LjgiTiAywrAxOCc0OS4zIkU!5e0!3m2!1sfr!2sfr!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localisation ECOLE T3P"
                />
              </motion.div>

              {/* Quick Contact CTA */}
              <motion.div 
                variants={fadeUpVariants}
                className="card-livementor bg-forest text-cream"
              >
                <h3 className="font-bold text-lg mb-2">📞 Besoin d'un conseil rapide ?</h3>
                <p className="text-cream/80 text-sm mb-4">
                  Appelez-nous directement, notre équipe est disponible du lundi au vendredi.
                </p>
                <a 
                  href="tel:0188750555" 
                  className="inline-flex items-center gap-2 bg-gold text-forest font-bold py-3 px-6 rounded-md hover:bg-gold/90 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  01 88 75 05 55
                </a>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              className="lg:col-span-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={scaleUpVariants}
            >
              <div className="card-livementor">
                <h2 className="text-2xl font-black text-forest uppercase tracking-tight mb-6">
                  Envoyez votre demande
                </h2>

                {isSubmitted ? (
                  <motion.div 
                    className="text-center py-12"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <motion.div 
                      className="w-20 h-20 bg-forest/10 rounded-full flex items-center justify-center mx-auto mb-6"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    >
                      <CheckCircle className="w-10 h-10 text-forest" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-forest mb-2">
                      Demande envoyée avec succès !
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Nous vous recontacterons dans les plus brefs délais.
                    </p>
                    <button 
                      onClick={() => setIsSubmitted(false)} 
                      className="btn-secondary"
                    >
                      Envoyer une autre demande
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Full Name */}
                    <motion.div 
                      className="space-y-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <Label htmlFor="fullName" className="font-bold text-forest">Nom complet *</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Jean Dupont"
                        className={`border-2 focus:border-forest focus:ring-forest ${errors.fullName ? "border-destructive" : "border-border"}`}
                      />
                      {errors.fullName && (
                        <p className="text-sm text-destructive">{errors.fullName}</p>
                      )}
                    </motion.div>

                    {/* Contact fields */}
                    <motion.div 
                      className="grid md:grid-cols-2 gap-6"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="space-y-2">
                        <Label htmlFor="email" className="font-bold text-forest">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="jean.dupont@exemple.fr"
                          className={`border-2 focus:border-forest focus:ring-forest ${errors.email ? "border-destructive" : "border-border"}`}
                        />
                        {errors.email && (
                          <p className="text-sm text-destructive">{errors.email}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone" className="font-bold text-forest">Téléphone *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="06 12 34 56 78"
                          className={`border-2 focus:border-forest focus:ring-forest ${errors.phone ? "border-destructive" : "border-border"}`}
                        />
                        {errors.phone && (
                          <p className="text-sm text-destructive">{errors.phone}</p>
                        )}
                      </div>
                    </motion.div>

                    {/* Formation select */}
                    <motion.div 
                      className="space-y-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Label className="font-bold text-forest">Formation souhaitée *</Label>
                      <Select
                        value={formData.formation}
                        onValueChange={(value) => {
                          setFormData((prev) => ({ ...prev, formation: value }));
                          if (errors.formation) setErrors((prev) => ({ ...prev, formation: "" }));
                        }}
                      >
                        <SelectTrigger className={`border-2 focus:border-forest ${errors.formation ? "border-destructive" : "border-border"}`}>
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
                    </motion.div>

                    {/* Message (optional) */}
                    <motion.div 
                      className="space-y-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Label htmlFor="message" className="font-bold text-forest">Message <span className="font-normal text-muted-foreground">(optionnel)</span></Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Décrivez votre projet ou posez vos questions..."
                        rows={4}
                        className="border-2 focus:border-forest focus:ring-forest border-border"
                      />
                    </motion.div>

                    {/* Consent */}
                    <motion.div 
                      className="space-y-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="consent"
                          checked={formData.consent}
                          onCheckedChange={(checked) => {
                            setFormData((prev) => ({ ...prev, consent: checked as boolean }));
                            if (errors.consent) setErrors((prev) => ({ ...prev, consent: "" }));
                          }}
                          className="border-forest data-[state=checked]:bg-forest data-[state=checked]:border-forest mt-1"
                        />
                        <Label htmlFor="consent" className="font-normal text-sm leading-relaxed cursor-pointer text-muted-foreground">
                          J'accepte que mes données soient utilisées pour traiter ma demande et être recontacté(e) 
                          par T3P Campus. *
                        </Label>
                      </div>
                      {errors.consent && (
                        <p className="text-sm text-destructive">{errors.consent}</p>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      <motion.button
                        type="submit"
                        className="btn-primary w-full flex items-center justify-center gap-2"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {isSubmitting ? (
                          <motion.span
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            Envoi en cours...
                          </motion.span>
                        ) : (
                          <>
                            ENVOYER MA DEMANDE
                            <Send className="w-5 h-5" />
                          </>
                        )}
                      </motion.button>
                    </motion.div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
