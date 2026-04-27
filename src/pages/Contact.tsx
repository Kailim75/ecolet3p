import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import TrustBar from "@/components/home/TrustBar";
import DynamicSEOHead from "@/components/seo/DynamicSEOHead";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { analytics } from "@/lib/analytics";
import {
  ArrowLeftRight,
  CalendarDays,
  Car,
  CarTaxiFront,
  CheckCircle,
  Clock,
  ExternalLink,
  Home,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  RefreshCw,
  Send,
  Shield,
  Train,
  Bike,
} from "lucide-react";

const contactInfo = [
  { icon: MapPin, title: "Adresse", content: "3 rue Corneille, 92120 Montrouge" },
  { icon: Phone, title: "Téléphone", content: "01 88 75 05 55", href: "tel:0188750555" },
  { icon: Mail, title: "Email", content: "montrouge@ecolet3p.fr", href: "mailto:montrouge@ecolet3p.fr" },
  { icon: Clock, title: "Horaires", content: "Lun-Ven : 9h30-12h30 / 13h30-18h00" },
  { icon: Train, title: "Accès", content: "Métro ligne 4 : Mairie de Montrouge" },
];

const formationChoices = [
  { id: "taxi", label: "Taxi", price: "990€", icon: CarTaxiFront },
  { id: "vtc", label: "VTC", price: "990€", icon: Car },
  { id: "vmdtr", label: "VMDTR", price: "990€", icon: Bike },
  { id: "continue", label: "Formation continue", price: "170€ à 250€", icon: RefreshCw },
  { id: "mobilite", label: "Passerelle", price: "665€", icon: ArrowLeftRight },
  { id: "recup-points", label: "Récupération de points", price: "250€", icon: Shield },
];

const actionCards = [
  {
    title: "Appeler maintenant",
    description: "Parler à un conseiller pendant les horaires d'ouverture.",
    href: "tel:0188750555",
    icon: Phone,
  },
  {
    title: "WhatsApp",
    description: "Obtenir une réponse rapide sur votre situation.",
    href: "https://wa.me/33783787663?text=Bonjour%2C%20je%20souhaite%20des%20informations%20sur%20les%20formations%20ECOLE%20T3P",
    icon: MessageCircle,
  },
  {
    title: "Voir le centre",
    description: "Itinéraire Google Maps vers le centre de Montrouge.",
    href: "https://www.google.com/maps/place/ECOLE+T3P",
    icon: MapPin,
  },
];

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
    } else if (!/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Le numéro de téléphone n'est pas valide";
    }

    if (!formData.consent) {
      newErrors.consent = "Vous devez accepter les conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const toggleFormation = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      formation: prev.formation === id ? "" : id,
    }));
  };

  const handleSubmit = async (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const contactRequestId = crypto.randomUUID();
      const record = {
        id: contactRequestId,
        full_name: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        formation: formData.formation || null,
        message: formData.message.trim() || null,
        status: "new",
      };

      const { error: dbError } = await supabase
        .from("contact_requests" as never)
        .insert(record as never);

      if (dbError) {
        console.error("Contact form DB error:", dbError);
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors de l'envoi. Veuillez réessayer ou nous appeler au 01 88 75 05 55.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      analytics.trackFormSubmission("contact");

      try {
        await supabase.functions.invoke("notify-contact-request", {
          body: { contactRequestId },
        });
      } catch (notifyErr) {
        console.error("Contact notification failed:", notifyErr);
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
      toast({
        title: "Demande envoyée !",
        description: "Nous vous recontactons dans les plus brefs délais.",
      });
    } catch (error) {
      console.error("Contact form error:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer ou nous appeler au 01 88 75 05 55.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      formation: "",
      message: "",
      consent: false,
    });
    setErrors({});
    setIsSubmitted(false);
  };

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact ECOLE T3P",
    description: "Contactez notre centre de formation Taxi VTC à Montrouge",
    url: "https://ecolet3p.fr/contact",
    mainEntity: {
      "@type": "LocalBusiness",
      name: "ECOLE T3P",
      telephone: "+33188750555",
      email: "montrouge@ecolet3p.fr",
      address: {
        "@type": "PostalAddress",
        streetAddress: "3 rue Corneille",
        addressLocality: "Montrouge",
        postalCode: "92120",
        addressCountry: "FR",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 48.8155,
        longitude: 2.3137,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:30",
          closes: "18:00",
        },
      ],
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://ecolet3p.fr/" },
      { "@type": "ListItem", position: 2, name: "Contact", item: "https://ecolet3p.fr/contact" },
    ],
  };

  return (
    <Layout>
      <DynamicSEOHead
        pageUrl="/contact"
        defaultTitle="Contact ECOLE T3P Montrouge (92) | Taxi VTC"
        defaultDescription="Contactez ECOLE T3P pour votre formation Taxi, VTC ou VMDTR. Réponse sous 24h. 3 rue Corneille, 92120 Montrouge. Appelez le 01 88 75 05 55."
        canonicalUrl="https://ecolet3p.fr/contact"
        ogImage="https://ecolet3p.fr/og-image.jpg"
      >
        <meta
          name="keywords"
          content="contact formation taxi Montrouge, centre VTC Bagneux, formation taxi Vanves, centre formation Malakoff, formation VTC Châtillon, ECOLE T3P contact, devis formation taxi 92, centre formation sud Paris"
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Contact ECOLE T3P Montrouge | Sud Paris 92" />
        <meta
          name="twitter:description"
          content="01 88 75 05 55. 3 rue Corneille, Montrouge. Accessible depuis Bagneux, Vanves, Malakoff."
        />
        <script type="application/ld+json">{JSON.stringify(contactSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </DynamicSEOHead>

      <div className="bg-muted/30 py-3 border-b">
        <div className="container-custom">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/" className="flex items-center gap-1">
                    <Home className="h-4 w-4" />
                    Accueil
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Contact</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <section className="bg-cream py-10 md:py-16 lg:py-20 border-b border-border">
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center rounded-full bg-primary/8 px-3 py-1 text-xs font-semibold text-primary">
                Contact ECOLE T3P
              </span>
              <h1 className="mt-4 text-4xl font-black uppercase tracking-tight text-primary md:text-5xl">
                Parlons de votre projet
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Une question sur nos formations Taxi, VTC, VMDTR ou sur votre renouvellement de carte ?
                Notre équipe vous répond rapidement par téléphone, email ou WhatsApp.
              </p>

              <div className="mt-6 grid gap-3 md:grid-cols-3">
                {actionCards.map((card) => {
                  const Icon = card.icon;
                  return (
                    <a
                      key={card.title}
                      href={card.href}
                      target={card.href.startsWith("http") ? "_blank" : undefined}
                      rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="card-t3p group hover:border-primary/30"
                    >
                      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/8 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h2 className="text-base font-bold text-primary">{card.title}</h2>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{card.description}</p>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                        Ouvrir <ExternalLink className="h-4 w-4" />
                      </span>
                    </a>
                  );
                })}
              </div>

              <div className="mt-6 flex flex-wrap gap-2 text-sm">
                <span className="rounded-full bg-white px-3 py-1.5 font-medium text-foreground shadow-sm">
                  Réponse sous 24h
                </span>
                <span className="rounded-full bg-white px-3 py-1.5 font-medium text-foreground shadow-sm">
                  Paiement en 4x sans frais
                </span>
                <span className="rounded-full bg-white px-3 py-1.5 font-medium text-foreground shadow-sm">
                  Centre agréé Préfecture 92
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-primary p-6 text-primary-foreground shadow-xl">
                <p className="text-sm font-semibold uppercase tracking-wide text-primary-foreground/70">
                  Contact direct
                </p>
                <div className="mt-4 space-y-4">
                  <a
                    href="tel:0188750555"
                    className="flex items-center justify-between rounded-xl bg-white/10 px-4 py-3 transition hover:bg-white/15"
                    onClick={() => analytics.trackPhoneClick()}
                  >
                    <div>
                      <p className="text-sm text-primary-foreground/70">Téléphone</p>
                      <p className="text-lg font-bold">01 88 75 05 55</p>
                    </div>
                    <Phone className="h-5 w-5" />
                  </a>
                  <a
                    href="mailto:montrouge@ecolet3p.fr"
                    className="flex items-center justify-between rounded-xl bg-white/10 px-4 py-3 transition hover:bg-white/15"
                    onClick={() => analytics.trackEmailClick()}
                  >
                    <div>
                      <p className="text-sm text-primary-foreground/70">Email</p>
                      <p className="text-base font-bold">montrouge@ecolet3p.fr</p>
                    </div>
                    <Mail className="h-5 w-5" />
                  </a>
                  <div className="rounded-xl bg-white/10 px-4 py-3">
                    <p className="text-sm text-primary-foreground/70">Adresse</p>
                    <p className="text-base font-bold">3 rue Corneille, 92120 Montrouge</p>
                    <p className="mt-1 text-sm text-primary-foreground/80">Métro ligne 4, Mairie de Montrouge</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TrustBar />

      <section className="py-10 md:py-14 lg:py-20">
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-12">
            <aside className="space-y-6 lg:col-span-4">
              <div className="card-t3p">
                <h2 className="text-xl font-bold text-primary">Coordonnées utiles</h2>
                <div className="mt-5 space-y-4">
                  {contactInfo.map((info) => {
                    const Icon = info.icon;
                    return (
                      <div key={info.title} className="flex gap-3">
                        <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/8 text-primary">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{info.title}</p>
                          {info.href ? (
                            <a href={info.href} className="text-sm text-muted-foreground hover:text-primary">
                              {info.content}
                            </a>
                          ) : (
                            <p className="text-sm text-muted-foreground">{info.content}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="card-t3p">
                <h2 className="text-xl font-bold text-primary">Venir au centre</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Le centre est à 2 minutes à pied du métro Mairie de Montrouge et facilement accessible depuis
                  Bagneux, Vanves, Malakoff et le sud de Paris.
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                  <a
                    href="https://www.google.com/maps/place/ECOLE+T3P"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                  >
                    <MapPin className="h-4 w-4" />
                    Ouvrir Google Maps
                  </a>
                  <a
                    href="https://wa.me/33783787663?text=Bonjour%2C%20je%20souhaite%20des%20informations%20sur%20les%20formations%20ECOLE%20T3P"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-3 text-sm font-semibold text-foreground transition hover:bg-muted"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Poser une question
                  </a>
                </div>
              </div>
            </aside>

            <div className="lg:col-span-8">
              <div className="card-t3p p-5 md:p-8">
                {isSubmitted ? (
                  <div className="text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <CheckCircle className="h-9 w-9" />
                    </div>
                    <h2 className="mt-5 text-2xl font-bold text-primary">Demande envoyée avec succès</h2>
                    <p className="mt-3 text-muted-foreground">
                      Notre équipe vous recontacte sous 24h maximum pour faire le point sur votre projet.
                    </p>
                    <div className="mx-auto mt-6 max-w-xl rounded-2xl bg-muted p-5 text-left">
                      <p className="font-semibold text-foreground">Prochaines étapes</p>
                      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                        <li>1. Confirmation par email de la bonne réception de votre demande.</li>
                        <li>2. Appel d'un conseiller pour répondre à vos questions.</li>
                        <li>3. Proposition de la formation et de la session les plus adaptées.</li>
                      </ul>
                    </div>
                    <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                      <a
                        href="tel:0188750555"
                        className="btn-primary min-w-[220px]"
                        onClick={() => analytics.trackPhoneClick()}
                      >
                        Appeler le centre
                      </a>
                      <button type="button" onClick={resetForm} className="btn-secondary min-w-[220px]">
                        Envoyer une autre demande
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col gap-3 border-b border-border pb-6">
                      <span className="inline-flex w-fit items-center rounded-full bg-primary/8 px-3 py-1 text-xs font-semibold text-primary">
                        Formulaire de contact
                      </span>
                      <h2 className="text-2xl font-bold text-primary">Recevez une réponse claire et rapide</h2>
                      <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                        Dites-nous ce que vous cherchez et nous vous orientons vers la bonne formation, le bon format
                        et la prochaine session disponible.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                      <div className="mt-6">
                        <Label className="font-semibold text-foreground">Formation recherchée</Label>
                        <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                          {formationChoices.map((formation) => {
                            const Icon = formation.icon;
                            const isSelected = formData.formation === formation.id;

                            return (
                              <button
                                key={formation.id}
                                type="button"
                                onClick={() => toggleFormation(formation.id)}
                                className={`rounded-xl border p-4 text-left transition ${
                                  isSelected
                                    ? "border-primary bg-primary/5 shadow-sm"
                                    : "border-border hover:border-primary/30 hover:bg-muted/60"
                                }`}
                              >
                                <div className="flex items-center justify-between gap-3">
                                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/8 text-primary">
                                    <Icon className="h-5 w-5" />
                                  </div>
                                  {isSelected && <CheckCircle className="h-5 w-5 text-primary" />}
                                </div>
                                <p className="mt-3 font-semibold text-foreground">{formation.label}</p>
                                <p className="text-sm text-accent">{formation.price}</p>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="mt-6 grid gap-5 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="fullName" className="font-semibold text-foreground">
                            Nom complet *
                          </Label>
                          <Input
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Jean Dupont"
                            className={errors.fullName ? "border-destructive" : ""}
                          />
                          {errors.fullName && <p className="text-sm text-destructive">{errors.fullName}</p>}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone" className="font-semibold text-foreground">
                            Téléphone *
                          </Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="06 12 34 56 78"
                            className={errors.phone ? "border-destructive" : ""}
                          />
                          {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
                        </div>

                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="email" className="font-semibold text-foreground">
                            Email *
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="jean.dupont@exemple.fr"
                            className={errors.email ? "border-destructive" : ""}
                          />
                          {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                        </div>

                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="message" className="font-semibold text-foreground">
                            Votre message
                          </Label>
                          <Textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={5}
                            placeholder="Décrivez votre projet, vos contraintes d'horaires ou vos questions."
                          />
                        </div>
                      </div>

                      <div className="mt-6 rounded-xl bg-muted p-4">
                        <div className="flex items-start gap-3">
                          <Checkbox
                            id="consent"
                            checked={formData.consent}
                            onCheckedChange={(checked) => {
                              setFormData((prev) => ({ ...prev, consent: checked as boolean }));
                              if (errors.consent) {
                                setErrors((prev) => ({ ...prev, consent: "" }));
                              }
                            }}
                            className="mt-1"
                          />
                          <div>
                            <Label htmlFor="consent" className="cursor-pointer text-sm leading-relaxed text-muted-foreground">
                              J'accepte que mes données soient utilisées pour traiter ma demande et être recontacté(e)
                              par ECOLE T3P. *
                            </Label>
                            {errors.consent && <p className="mt-2 text-sm text-destructive">{errors.consent}</p>}
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="text-sm text-muted-foreground">
                          <p className="font-medium text-foreground">Réponse garantie sous 24h</p>
                          <p>Aucun spam, aucun engagement.</p>
                        </div>
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="btn-cta-orange w-full sm:w-auto sm:min-w-[240px]"
                        >
                          {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande"}
                          {!isSubmitting && <Send className="ml-2 h-4 w-4" />}
                        </Button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-card">
        <div className="container-custom py-8 md:py-10">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <h2 className="text-2xl font-bold text-primary">Nous trouver facilement</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                Le centre est situé au 3 rue Corneille à Montrouge, accessible rapidement depuis Bagneux, Vanves,
                Malakoff, Châtillon et le sud de Paris.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-border bg-background p-4">
                  <div className="flex items-center gap-2 text-primary">
                    <CalendarDays className="h-4 w-4" />
                    <p className="font-semibold">Horaires</p>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">Lun-Ven : 9h30-12h30 / 13h30-18h00</p>
                </div>
                <div className="rounded-xl border border-border bg-background p-4">
                  <div className="flex items-center gap-2 text-primary">
                    <Train className="h-4 w-4" />
                    <p className="font-semibold">Métro</p>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">Mairie de Montrouge, ligne 4</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="overflow-hidden rounded-2xl border border-border shadow-sm">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2627.0833183533!2d2.3137!3d48.8155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDjCsDQ4JzU1LjgiTiAywrAxOCc0OS4zIkU!5e0!3m2!1sfr!2sfr!4v1234567890"
                  width="100%"
                  height="320"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localisation ECOLE T3P - 3 rue Corneille, 92120 Montrouge"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
