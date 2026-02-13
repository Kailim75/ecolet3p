import { useState, useRef } from "react";
import TrustBar from "@/components/home/TrustBar";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, useScroll, useTransform, AnimatePresence, type Variants } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  MapPin, Phone, Mail, Clock, Send, CheckCircle, Train, Home,
  CarTaxiFront, Car, Bike, RefreshCw, ArrowLeftRight, Shield,
  ArrowLeft, Star
} from "lucide-react";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList,
  BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useToast } from "@/hooks/use-toast";

const contactInfo = [
  { icon: MapPin, title: "Adresse", content: "3 rue Corneille\n92120 Montrouge" },
  { icon: Phone, title: "Téléphone", content: "01 88 75 05 55", href: "tel:0188750555" },
  { icon: Mail, title: "Email", content: "montrouge@ecolet3p.fr", href: "mailto:montrouge@ecolet3p.fr" },
  { icon: Clock, title: "Horaires", content: "Lun-Ven : 9h30-12h30 / 13h30-18h00\nFermé le week-end" },
  { icon: Train, title: "Accès", content: "Métro Ligne 4 : Mairie de Montrouge" },
];

const formationChoices = [
  { id: "taxi", label: "Taxi", price: "990€", icon: CarTaxiFront },
  { id: "vtc", label: "VTC", price: "990€", icon: Car },
  { id: "vmdtr", label: "VMDTR", price: "990€", icon: Bike },
  { id: "continue", label: "Formation Continue", price: "170-250€", icon: RefreshCw },
  { id: "mobilite", label: "Mobilité", price: "440€", icon: ArrowLeftRight },
  { id: "recup-points", label: "Récupération de points", price: "250€", icon: Shield },
];

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};

const staggerItemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
};

const scaleUpVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

const Contact = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "", email: "", phone: "", formation: "", message: "", consent: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const heroRef = useRef(null);
  const contactRef = useRef(null);

  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const { scrollYProgress: contactScroll } = useScroll({ target: contactRef, offset: ["start end", "end start"] });

  const heroY = useTransform(heroScroll, [0, 1], [0, 100]);
  const heroScale = useTransform(heroScroll, [0, 1], [1, 1.1]);
  const contactY1 = useTransform(contactScroll, [0, 1], [80, -80]);
  const contactY2 = useTransform(contactScroll, [0, 1], [-60, 60]);
  const contactRotate = useTransform(contactScroll, [0, 1], [-5, 5]);

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Le nom complet est requis";
    else if (formData.fullName.trim().length < 3) newErrors.fullName = "Le nom doit contenir au moins 3 caractères";
    if (!formData.email.trim()) newErrors.email = "L'email est requis";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "L'email n'est pas valide";
    if (!formData.phone.trim()) newErrors.phone = "Le téléphone est requis";
    else if (!/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/.test(formData.phone.replace(/\s/g, ''))) newErrors.phone = "Le numéro de téléphone n'est pas valide";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.consent) newErrors.consent = "Vous devez accepter les conditions";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateStep3()) return;
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({ title: "Demande envoyée !", description: "Nous vous recontacterons dans les plus brefs délais." });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const selectFormation = (id: string) => {
    setFormData((prev) => ({ ...prev, formation: id }));
    setTimeout(() => setStep(2), 300);
  };

  const goToStep3 = () => {
    if (validateStep2()) setStep(3);
  };

  const contactSchema = {
    "@context": "https://schema.org", "@type": "ContactPage",
    "name": "Contact ECOLE T3P",
    "description": "Contactez notre centre de formation Taxi VTC à Montrouge",
    "url": "https://www.ecolet3p.fr/contact",
    "mainEntity": {
      "@type": "LocalBusiness", "name": "ECOLE T3P",
      "telephone": "+33188750555", "email": "montrouge@ecolet3p.fr",
      "address": { "@type": "PostalAddress", "streetAddress": "3 rue Corneille", "addressLocality": "Montrouge", "postalCode": "92120", "addressCountry": "FR" },
      "geo": { "@type": "GeoCoordinates", "latitude": 48.8155, "longitude": 2.3137 },
      "openingHoursSpecification": [{ "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "09:30", "closes": "18:00" }]
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://www.ecolet3p.fr/" },
      { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://www.ecolet3p.fr/contact" }
    ]
  };

  // Progress bar component
  const ProgressBar = () => (
    <div className="flex items-center justify-center gap-2 md:gap-3 mb-6 md:mb-8">
      {[1, 2, 3].map((s) => (
        <div key={s} className="flex items-center gap-2 md:gap-3">
          <div
            className={`w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center text-xs md:text-sm font-bold transition-all duration-300 ${
              s < step ? "bg-forest text-white" : s === step ? "bg-forest text-white scale-110" : "bg-muted text-muted-foreground"
            }`}
          >
            {s < step ? <CheckCircle className="w-4 h-4 md:w-5 md:h-5" /> : s}
          </div>
          {s < 3 && <div className={`w-8 md:w-10 h-0.5 transition-colors ${s < step ? "bg-forest" : "bg-muted"}`} />}
        </div>
      ))}
    </div>
  );

  const renderFormStep = () => {
    if (isSubmitted) {
      return (
        <motion.div className="text-center py-12" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
          <motion.div className="w-20 h-20 bg-forest/10 rounded-full flex items-center justify-center mx-auto mb-6" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 200 }}>
            <CheckCircle className="w-10 h-10 text-forest" />
          </motion.div>
          <h3 className="text-xl font-bold text-forest mb-2">Demande envoyée avec succès !</h3>
          <p className="text-muted-foreground mb-6">Nous vous recontacterons dans les plus brefs délais.</p>
          <button onClick={() => { setIsSubmitted(false); setStep(1); setFormData({ fullName: "", email: "", phone: "", formation: "", message: "", consent: false }); }} className="btn-secondary">Envoyer une autre demande</button>
        </motion.div>
      );
    }

    return (
      <>
        <ProgressBar />
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
              <h2 className="text-xl font-bold text-forest mb-6 text-center">Quelle formation vous intéresse ?</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {formationChoices.map((f) => {
                  const Icon = f.icon;
                  const isSelected = formData.formation === f.id;
                  return (
                    <motion.button
                      key={f.id}
                      type="button"
                      onClick={() => selectFormation(f.id)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className={`flex flex-col items-center gap-2 p-4 md:p-6 rounded-xl border-2 transition-all cursor-pointer text-center ${
                        isSelected ? "border-forest bg-forest/5 shadow-md" : "border-border hover:border-forest/40 hover:bg-forest/5"
                      }`}
                    >
                      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center ${isSelected ? "bg-forest text-white" : "bg-forest/10 text-forest"}`}>
                        <Icon className="w-5 h-5 md:w-6 md:h-6" />
                      </div>
                      <span className="font-bold text-forest text-sm md:text-base">{f.label}</span>
                      <span className="text-xs md:text-sm font-semibold text-gold">{f.price}</span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
              <button type="button" onClick={() => setStep(1)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-forest mb-4 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Retour
              </button>
              <h2 className="text-xl font-bold text-forest mb-6 text-center">Comment vous contacter ?</h2>
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="font-bold text-forest">Nom complet *</Label>
                  <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Jean Dupont" className={`border-2 focus:border-forest focus:ring-forest ${errors.fullName ? "border-destructive" : "border-border"}`} />
                  {errors.fullName && <p className="text-sm text-destructive">{errors.fullName}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="font-bold text-forest">Téléphone *</Label>
                  <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="06 12 34 56 78" className={`border-2 focus:border-forest focus:ring-forest ${errors.phone ? "border-destructive" : "border-border"}`} />
                  {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-bold text-forest">Email *</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="jean.dupont@exemple.fr" className={`border-2 focus:border-forest focus:ring-forest ${errors.email ? "border-destructive" : "border-border"}`} />
                  {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                </div>
                <Button type="button" onClick={goToStep3} className="btn-cta-orange w-full text-base py-6">
                  Continuer →
                </Button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
              <button type="button" onClick={() => setStep(2)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-forest mb-4 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Retour
              </button>
              <h2 className="text-xl font-bold text-forest mb-6 text-center">Un message ? <span className="font-normal text-muted-foreground">(optionnel)</span></h2>
              <div className="space-y-5">
                <Textarea
                  name="message" value={formData.message} onChange={handleChange}
                  placeholder="Décrivez votre projet ou posez vos questions..."
                  rows={4} className="border-2 focus:border-forest focus:ring-forest border-border"
                />
                <div className="space-y-2">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="consent" checked={formData.consent}
                      onCheckedChange={(checked) => { setFormData((prev) => ({ ...prev, consent: checked as boolean })); if (errors.consent) setErrors((prev) => ({ ...prev, consent: "" })); }}
                      className="border-forest data-[state=checked]:bg-forest data-[state=checked]:border-forest mt-1"
                    />
                    <Label htmlFor="consent" className="font-normal text-sm leading-relaxed cursor-pointer text-muted-foreground">
                      J'accepte que mes données soient utilisées pour traiter ma demande et être recontacté(e) par ECOLE T3P. *
                    </Label>
                  </div>
                  {errors.consent && <p className="text-sm text-destructive">{errors.consent}</p>}
                </div>
                <motion.button
                  type="button" onClick={handleSubmit}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <motion.span animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>Envoi en cours...</motion.span>
                  ) : (
                    <>ENVOYER MA DEMANDE <Send className="w-5 h-5" /></>
                  )}
                </motion.button>
                <p className="text-center text-xs text-muted-foreground">Nous répondons sous 24h</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  };

  return (
    <Layout>
      <Helmet>
        <title>Contact & Inscription | ECOLE T3P Montrouge</title>
        <meta name="description" content="Contactez ECOLE T3P : 01 88 75 05 55 ou montrouge@ecolet3p.fr. 3 rue Corneille, 92120 Montrouge. Métro Mairie de Montrouge ligne 4. Réponse sous 24h." />
        <meta name="keywords" content="contact formation taxi Montrouge, centre VTC Bagneux, formation taxi Vanves, centre formation Malakoff, formation VTC Châtillon, ECOLE T3P contact, devis formation taxi 92, centre formation sud Paris" />
        <link rel="canonical" href="https://www.ecolet3p.fr/contact" />
        <meta property="og:title" content="Contact ECOLE T3P Montrouge - Formation Taxi VTC Bagneux Vanves" />
        <meta property="og:description" content="3 rue Corneille 92120 Montrouge. Tél : 01 88 75 05 55. Métro Mairie de Montrouge. Accessible depuis Bagneux, Vanves, Malakoff et Paris 14e." />
        <meta property="og:url" content="https://www.ecolet3p.fr/contact" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.ecolet3p.fr/og-image.jpg" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Contact ECOLE T3P Montrouge | Sud Paris 92" />
        <meta name="twitter:description" content="01 88 75 05 55. 3 rue Corneille, Montrouge. Accessible depuis Bagneux, Vanves, Malakoff." />
        <script type="application/ld+json">{JSON.stringify(contactSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      {/* Breadcrumb */}
      <div className="bg-muted/30 py-3 border-b">
        <div className="container mx-auto px-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/" className="flex items-center gap-1"><Home className="h-4 w-4" /> Accueil</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbPage>Contact</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Hero */}
      <section ref={heroRef} className="bg-cream py-12 md:py-28 relative overflow-hidden">
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute -top-20 -left-20 w-64 h-64 bg-forest/5 rounded-full blur-3xl pointer-events-none" />
        <motion.div style={{ y: heroY }} className="absolute top-1/2 -right-32 w-80 h-80 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
        <motion.div className="absolute bottom-10 left-1/4 w-40 h-40 bg-forest/5 rounded-full blur-2xl pointer-events-none hidden md:block" animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 4, repeat: Infinity }} />
        <motion.div className="absolute top-20 right-1/4 w-32 h-32 bg-gold/15 rounded-full blur-2xl pointer-events-none hidden md:block" animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 5, repeat: Infinity }} />
        <div className="container-custom text-center relative z-10">
          <motion.div initial="hidden" animate="visible" variants={staggerContainerVariants}>
            <motion.span variants={fadeUpVariants} className="badge-livementor mb-4 md:mb-6 inline-block text-sm">📬 Contactez-nous</motion.span>
            <motion.h1 variants={fadeUpVariants} className="text-[28px] md:text-4xl lg:text-5xl font-black text-forest uppercase tracking-tight mb-3 md:mb-6 leading-tight">PARLONS DE VOTRE<br /><span className="text-gold">PROJET</span></motion.h1>
            <motion.p variants={fadeUpVariants} className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">Une question sur nos formations ? Envoyez-nous un message. Notre équipe vous répond sous 24h.</motion.p>
          </motion.div>
        </div>
      </section>

      <TrustBar />

      {/* Contact Section */}
      <section ref={contactRef} className="py-10 lg:py-20 bg-background relative overflow-hidden">
        <motion.div style={{ y: contactY1, rotate: contactRotate }} className="absolute -top-32 left-10 w-72 h-72 bg-forest/5 rounded-full blur-3xl pointer-events-none hidden md:block" />
        <motion.div style={{ y: contactY2 }} className="absolute top-1/3 -right-20 w-64 h-64 bg-gold/10 rounded-full blur-3xl pointer-events-none hidden md:block" />
        <motion.div style={{ y: contactY1 }} className="absolute -bottom-20 left-1/3 w-56 h-56 bg-forest/5 rounded-full blur-2xl pointer-events-none hidden md:block" />

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Contact Info */}
            <motion.div className="lg:col-span-2 space-y-6 lg:space-y-8" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainerVariants}>
              <motion.div variants={fadeUpVariants}>
                <h2 className="text-xl md:text-2xl font-black text-forest uppercase tracking-tight mb-4 md:mb-6">Nos coordonnées</h2>
                <div className="grid grid-cols-2 gap-3 lg:grid-cols-1 lg:gap-5">
                  {contactInfo.map((info, index) => (
                    <motion.div key={info.title} className="flex gap-3 lg:gap-4" variants={staggerItemVariants} custom={index}>
                      <motion.div className="icon-container shrink-0 w-10 h-10 lg:w-12 lg:h-12" whileHover={{ scale: 1.1, rotate: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                        <info.icon className="w-5 h-5 lg:w-6 lg:h-6" />
                      </motion.div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-forest text-sm lg:text-base mb-0.5">{info.title}</h3>
                        {info.href ? (
                          <a href={info.href} className="text-muted-foreground hover:text-forest transition-colors whitespace-pre-line text-xs lg:text-sm">{info.content}</a>
                        ) : (
                          <p className="text-muted-foreground whitespace-pre-line text-xs lg:text-sm">{info.content}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Quick Contact CTA */}
              <motion.div variants={fadeUpVariants} className="card-livementor bg-forest text-cream p-4 lg:p-6">
                <h3 className="font-bold text-base lg:text-lg mb-1.5">📞 Besoin d'un conseil rapide ?</h3>
                <p className="text-cream/80 text-xs lg:text-sm mb-3">Appelez-nous, notre équipe est disponible du lundi au vendredi.</p>
                <a href="tel:0188750555" className="inline-flex items-center gap-2 bg-gold text-forest font-bold py-2.5 px-5 rounded-md hover:bg-gold/90 transition-colors text-sm">
                  <Phone className="w-4 h-4" /> 01 88 75 05 55
                </a>
              </motion.div>
            </motion.div>

            {/* Multi-step Form */}
            <motion.div className="lg:col-span-3" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={scaleUpVariants}>
              <div className="card-livementor">
                {renderFormStep()}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Band + Map */}
      <section className="bg-card border-t border-border">
        <div className="container-custom py-6 md:py-8">
          {/* Trust band */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-10 mb-6 md:mb-8">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 md:w-4 md:h-4 text-gold fill-gold" />)}
              </div>
              <span className="text-xs md:text-sm font-semibold" style={{ color: "#555" }}>5.0/5 — 359 avis</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs md:text-sm font-semibold" style={{ color: "#555" }}>🎓 94% de réussite</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs md:text-sm font-semibold" style={{ color: "#555" }}>💳 Paiement 4x sans frais</span>
            </div>
          </div>

          {/* Google Maps */}
          <div className="rounded-xl overflow-hidden border border-border shadow-sm" style={{ height: 220 }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2627.0833183533!2d2.3137!3d48.8155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDjCsDQ4JzU1LjgiTiAywrAxOCc0OS4zIkU!5e0!3m2!1sfr!2sfr!4v1234567890"
              width="100%" height="100%" style={{ border: 0 }}
              allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              title="Localisation ECOLE T3P - 3 rue Corneille, 92120 Montrouge"
            />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
