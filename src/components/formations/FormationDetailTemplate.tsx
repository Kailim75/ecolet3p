import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Check, ArrowRight, Phone, Star, ArrowDown,
  Home, ChevronRight, GraduationCap, CreditCard,
  Calendar, Users, Trophy, Clock, Euro
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Layout from "@/components/layout/Layout";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import StepPreRegistrationForm from "@/components/formations/StepPreRegistrationForm";
import AlmaLogo from "@/components/logo/AlmaLogo";
import AlmaPaymentButton from "@/components/formations/AlmaPaymentButton";

/* ─── sub-components ─── */

const ReassuranceBarCompact = () => {
  const stats = [
    { icon: Calendar, value: "Depuis 2014", label: "+10 ans" },
    { icon: Users, value: "+2 000", label: "Chauffeurs" },
    { icon: Trophy, value: "94%", label: "Réussite" },
    { icon: Star, value: "5.0/5", label: "359 avis" },
  ];
  return (
    <section className="bg-muted py-6 border-b border-border">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.value} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                <s.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <span className="stat-number text-lg leading-tight">{s.value}</span>
                <span className="block text-xs text-muted-foreground">{s.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const IncludesSection = ({ includes }: { includes: string[] }) => (
  <section className="section-padding bg-background">
    <div className="container-custom">
      <h2 className="section-title text-center mb-10">Ce que comprend votre formation</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {includes.map((item, i) => (
          <div key={i} className="flex items-start gap-3 p-4 bg-card rounded-xl border border-border">
            <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center shrink-0">
              <Check className="w-4 h-4 text-primary" />
            </div>
            <span className="text-sm font-medium text-foreground">{item}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const FormatsTableSection = () => (
  <section className="section-padding bg-muted">
    <div className="container-custom">
      <h2 className="section-title text-center mb-8">3 formats, un seul tarif : 990€</h2>
      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-sm md:text-base">
          <thead>
            <tr className="bg-primary text-primary-foreground">
              <th className="px-4 py-4 text-left font-semibold" />
              <th className="px-4 py-4 text-center font-semibold">Journée</th>
              <th className="px-4 py-4 text-center font-semibold">Soir</th>
              <th className="px-4 py-4 text-center font-semibold">E-learning</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-4 font-semibold text-foreground">Durée</td>
              <td className="px-4 py-4 text-center text-muted-foreground">1 semaine</td>
              <td className="px-4 py-4 text-center text-muted-foreground">2 semaines</td>
              <td className="px-4 py-4 text-center text-muted-foreground">Illimité jusqu'à l'examen</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-4 font-semibold text-foreground">Horaires</td>
              <td className="px-4 py-4 text-center text-muted-foreground">9h30 – 16h30</td>
              <td className="px-4 py-4 text-center text-muted-foreground">18h – 21h30</td>
              <td className="px-4 py-4 text-center text-muted-foreground">24h/24, 7j/7</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-4 font-semibold text-foreground">Idéal pour</td>
              <td className="px-4 py-4 text-center text-muted-foreground">En reconversion, disponible</td>
              <td className="px-4 py-4 text-center text-muted-foreground">Salarié, temps partiel</td>
              <td className="px-4 py-4 text-center text-muted-foreground">Autonome, flexible</td>
            </tr>
            <tr>
              <td className="px-4 py-4 font-semibold text-foreground">Prix</td>
              <td className="px-4 py-4 text-center font-bold text-accent">990€</td>
              <td className="px-4 py-4 text-center font-bold text-accent">990€</td>
              <td className="px-4 py-4 text-center font-bold text-accent">990€</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-center text-muted-foreground text-sm">
        Frais d'examen T3P (241€) inclus dans tous les formats — Paiement en 4x sans frais avec Alma
      </p>
    </div>
  </section>
);

/* ─── types ─── */

interface ProgramModule {
  title: string;
  duration: string;
  topics: string[];
}

interface FAQ {
  question: string;
  answer: string;
}

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
}

interface CrossSellLink {
  title: string;
  desc: string;
  path: string;
}

interface FormationDetailProps {
  // SEO
  title: string;
  description: string;
  canonical: string;

  // Hero
  profession: string;
  heroTitle: string;
  heroSubtitle: string;

  // Content
  includes: string[];
  programModules: ProgramModule[];
  testimonials: Testimonial[];
  faqs: FAQ[];
  crossSellLinks: CrossSellLink[];

  // CTA
  ctaTitle: string;
  formationTitle: string;
}

/* ─── main template ─── */

const FormationDetailTemplate = ({
  title, description, canonical,
  profession, heroTitle, heroSubtitle,
  includes, programModules, testimonials, faqs,
  crossSellLinks, ctaTitle, formationTitle,
}: FormationDetailProps) => {
  const [showPreRegistration, setShowPreRegistration] = useState(false);

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: heroTitle,
    description,
    provider: { "@type": "EducationalOrganization", name: "ECOLE T3P", url: "https://ecolet3p.fr" },
    offers: { "@type": "Offer", price: 990, priceCurrency: "EUR" },
    aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", reviewCount: "359" },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(f => ({
      "@type": "Question", name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.ecolet3p.fr/" },
      { "@type": "ListItem", position: 2, name: "Formations", item: "https://www.ecolet3p.fr/formations" },
      { "@type": "ListItem", position: 3, name: `Formation ${profession.toUpperCase()}`, item: canonical },
    ],
  };

  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <script type="application/ld+json">{JSON.stringify(courseSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      {/* Breadcrumb */}
      <div className="bg-muted py-3 border-b border-border mt-16">
        <div className="container-custom">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
              <Home className="w-4 h-4" /> Accueil
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/formations" className="hover:text-primary transition-colors">Formations</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground font-medium">Formation {profession.toUpperCase()}</span>
          </nav>
        </div>
      </div>

      {/* Hero compact */}
      <section className="py-12 lg:py-20 bg-primary">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-[24px] md:text-[34px] lg:text-[44px] font-bold text-white leading-tight mb-4">
              {heroTitle}
            </h1>
            <p className="text-white/80 text-base md:text-lg mb-8 max-w-2xl">{heroSubtitle}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowPreRegistration(true)}
                className="btn-cta-orange px-8 py-4 text-base font-bold rounded-lg inline-flex items-center justify-center gap-2"
              >
                <GraduationCap className="w-5 h-5" /> Réserver ma place
              </button>
              <a
                href="#programme"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border-2 border-white text-white font-bold hover:bg-white hover:text-primary transition-all"
              >
                <ArrowDown className="w-5 h-5" /> Voir le programme
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Reassurance bar compact */}
      <ReassuranceBarCompact />

      {/* Ce que comprend */}
      <IncludesSection includes={includes} />

      {/* Tableau comparatif 3 formats */}
      <FormatsTableSection />

      {/* Programme */}
      <section id="programme" className="section-padding bg-background scroll-mt-20">
        <div className="container-custom">
          <h2 className="section-title text-center mb-10">Programme de formation</h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-3">
              {programModules.map((mod, i) => (
                <AccordionItem key={i} value={`mod-${i}`} className="bg-card rounded-xl border border-border px-5">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-foreground">{mod.title}</span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-secondary text-primary shrink-0">{mod.duration}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 pt-1">
                      {mod.topics.map((topic, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> {topic}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Financement */}
      <section className="py-14 bg-[hsl(var(--cta)/0.1)]">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="section-title mb-4">Financement accessible</h2>
            <p className="text-3xl md:text-4xl font-bold text-accent mb-2">990€</p>
            <p className="text-base text-muted-foreground mb-2">
              Payez en 4× sans frais avec Alma — <span className="font-bold text-foreground">247,50€/mois</span>
            </p>
            <div className="flex items-center justify-center gap-1.5 mb-6">
              <span className="text-xs text-muted-foreground">Propulsé par</span>
              <AlmaLogo className="h-4" />
            </div>
            <div className="max-w-xs mx-auto">
              <AlmaPaymentButton formationTitle={formationTitle} price={990} />
            </div>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="section-title mb-3">Ils ont réussi avec T3P</h2>
            <div className="inline-flex items-center gap-2 bg-card px-4 py-2 rounded-full border border-border">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <span className="font-bold text-sm">5.0/5</span>
              <span className="text-muted-foreground text-sm">— 359 avis</span>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {testimonials.map((t, i) => (
              <div key={i} className="card-t3p">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-sm text-foreground italic mb-4">"{t.content}"</p>
                <p className="font-semibold text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <h2 className="section-title text-center mb-10">Questions fréquentes</h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="bg-card rounded-xl border border-border px-5">
                  <AccordionTrigger className="text-left text-sm font-medium">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Cross-sell */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <h2 className="section-title text-center mb-8">Complétez votre parcours</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {crossSellLinks.map((link, i) => (
              <Link key={i} to={link.path} className="card-t3p group">
                <h3 className="text-sm font-semibold text-primary mb-1 group-hover:text-accent transition-colors">{link.title}</h3>
                <p className="text-xs text-muted-foreground">{link.desc}</p>
                <span className="text-xs font-semibold text-accent mt-2 inline-flex items-center gap-1">
                  Découvrir <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-16 bg-primary">
        <div className="container-custom text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{ctaTitle}</h2>
          <p className="text-white/75 mb-8 max-w-xl mx-auto">
            À partir de 990€ — Paiement en 4× sans frais via Alma.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setShowPreRegistration(true)}
              className="btn-cta-orange px-8 py-4 font-bold rounded-lg inline-flex items-center gap-2"
            >
              Réserver ma place <ArrowRight className="w-5 h-5" />
            </button>
            <a href="tel:0188750555" className="text-white/80 hover:text-white font-semibold inline-flex items-center gap-2">
              <Phone className="w-5 h-5" /> 01 88 75 05 55
            </a>
          </div>
        </div>
      </section>

      {/* Pre-Registration Dialog */}
      <Dialog open={showPreRegistration} onOpenChange={setShowPreRegistration}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Pré-inscription — Formation {profession.toUpperCase()}</DialogTitle>
          </DialogHeader>
          <StepPreRegistrationForm
            isOpen={showPreRegistration}
            onClose={() => setShowPreRegistration(false)}
            defaultFormation={formationTitle}
          />
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default FormationDetailTemplate;
