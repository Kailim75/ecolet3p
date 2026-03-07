import { useState } from "react";
import { Link } from "react-router-dom";
import DynamicSEOHead, { useDynamicH1 } from "@/components/seo/DynamicSEOHead";
import {
  Clock, Euro, Check, ArrowRight, Phone, Star,
  Home, ChevronRight, RefreshCw, Calendar, MapPin,
  GraduationCap
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Layout from "@/components/layout/Layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import StepPreRegistrationForm from "@/components/formations/StepPreRegistrationForm";

interface ProgramModule {
  title: string;
  duration: string;
  topics: string[];
}

interface FAQ {
  question: string;
  answer: string;
}

interface RelatedLink {
  title: string;
  desc: string;
  path: string;
}

interface BlogLink {
  title: string;
  description: string;
  path: string;
}

interface ContinueFormationProps {
  // SEO
  title: string;
  description: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;

  // Hero
  badge: string;
  badgeIcon: LucideIcon;
  heading: string;
  subheading: string;
  duration: string;
  price: number;
  format: string;

  // Content
  category: string;
  objectives: string[];
  regulatoryText: string;
  programModules: ProgramModule[];
  seoContent: { title: string; text: string }[];
  faqs: FAQ[];
  relatedLinks: RelatedLink[];

  // Optional
  testimonial?: { name: string; role: string; content: string };
  extraSection?: React.ReactNode;
  blogLinks?: BlogLink[];
  heroBackground?: string;
}

const ContinueFormationTemplate = ({
  title, description, canonical, ogTitle, ogDescription,
  badge, badgeIcon: BadgeIcon, heading, subheading,
  duration, price, format,
  category, objectives, regulatoryText, programModules,
  seoContent, faqs, relatedLinks,
  testimonial, extraSection, blogLinks, heroBackground,
}: ContinueFormationProps) => {
  const pageUrl = new URL(canonical).pathname;
  const dynamicH1 = useDynamicH1(pageUrl, heading);
  const [showPreRegistration, setShowPreRegistration] = useState(false);

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": dynamicH1,
    "description": description,
    "provider": {
      "@type": "EducationalOrganization",
      "name": "ECOLE T3P",
      "url": "https://ecolet3p.fr",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "3 rue Corneille",
        "addressLocality": "Montrouge",
        "postalCode": "92120",
        "addressRegion": "Hauts-de-Seine",
        "addressCountry": "FR"
      }
    },
    "offers": { "@type": "Offer", "price": price, "priceCurrency": "EUR" },
    "timeRequired": `PT${duration.replace(/\D/g, "")}H`,
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "5.0", "reviewCount": "359" }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question", "name": f.question,
      "acceptedAnswer": { "@type": "Answer", "text": f.answer }
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://ecolet3p.fr/" },
      { "@type": "ListItem", "position": 2, "name": "Formations", "item": "https://ecolet3p.fr/formations" },
      { "@type": "ListItem", "position": 3, "name": badge, "item": canonical },
    ]
  };

  return (
    <Layout>
      <DynamicSEOHead
        pageUrl={new URL(canonical).pathname}
        defaultTitle={title}
        defaultDescription={description}
        canonicalUrl={canonical}
      >
        <script type="application/ld+json">{JSON.stringify(courseSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </DynamicSEOHead>

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
            <span className="text-foreground font-medium">{badge}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="py-16 lg:py-24 bg-primary relative overflow-hidden">
        {heroBackground && (
          <>
            {/* Card image — positioned right, larger and more visible */}
            <div
              className="absolute right-0 top-1/2 -translate-y-1/2 w-[55%] md:w-[45%] h-[130%] bg-contain bg-no-repeat bg-right-center opacity-20 md:opacity-25"
              style={{ backgroundImage: `url(${heroBackground})` }}
            />
            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/40" />
          </>
        )}
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-white/15 text-white mb-5">
              <BadgeIcon className="w-4 h-4" /> {badge}
            </span>
            <h1 className="text-[26px] md:text-[36px] lg:text-[46px] font-bold text-white leading-tight mb-5">
              {dynamicH1}
            </h1>
            <p className="text-white/80 text-base md:text-lg mb-6 max-w-2xl">{subheading}</p>

            <div className="flex flex-wrap gap-3 mb-8">
              <span className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-lg text-white text-sm font-medium">
                <Clock className="w-4 h-4" /> {duration}
              </span>
              <span className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-lg text-white text-sm font-medium">
                <Euro className="w-4 h-4" /> {price}€
              </span>
              <span className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-lg text-white text-sm font-medium">
                <Calendar className="w-4 h-4" /> {format}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowPreRegistration(true)}
                className="btn-cta-orange px-8 py-4 text-base font-bold rounded-lg inline-flex items-center justify-center gap-2"
              >
                <GraduationCap className="w-5 h-5" /> Réserver ma place
              </button>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border-2 border-white text-white font-bold hover:bg-white hover:text-primary transition-all"
              >
                <Phone className="w-5 h-5" /> Nous contacter
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Cadre réglementaire */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="card-t3p border-l-4 border-l-primary">
              <h2 className="text-lg font-bold text-primary mb-3 flex items-center gap-2">
                <RefreshCw className="w-5 h-5" /> Cadre réglementaire
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">{regulatoryText}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Objectifs */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <h2 className="section-title text-center mb-10">Objectifs de la formation</h2>
          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {objectives.map((obj, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                  <Check className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">{obj}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programme */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="section-title mb-3">Programme de formation</h2>
            <p className="section-subtitle mx-auto">Contenu détaillé de vos {duration} de formation</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {programModules.map((mod, i) => (
              <div key={i} className="card-t3p">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-semibold text-primary">{mod.title}</h3>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-secondary text-primary">{mod.duration}</span>
                </div>
                <ul className="space-y-2">
                  {mod.topics.map((topic, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> {topic}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Simple pricing */}
          <div className="mt-14 max-w-md mx-auto">
            <div className="card-t3p text-center border-2 border-primary/20">
              <h3 className="text-lg font-bold text-foreground mb-2">Tarif tout compris</h3>
              <p className="text-4xl font-bold text-primary mb-1">{price}€</p>
              <p className="text-sm text-muted-foreground mb-6">TTC — Attestation de stage incluse</p>
              <button
                onClick={() => setShowPreRegistration(true)}
                className="btn-cta-orange w-full px-6 py-3.5 font-bold rounded-lg inline-flex items-center justify-center gap-2"
              >
                Réserver ma place <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Extra section (calculator, cross-sell, etc.) */}
      {extraSection}

      {/* Testimonial */}
      {testimonial && (
        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto card-t3p">
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <p className="text-sm text-foreground italic mb-4">"{testimonial.content}"</p>
              <p className="font-semibold text-sm">{testimonial.name}</p>
              <p className="text-xs text-muted-foreground">{testimonial.role}</p>
            </div>
          </div>
        </section>
      )}

      {/* SEO Content */}
      {seoContent.length > 0 && (
        <section className="section-padding bg-background">
          <div className="container-custom max-w-4xl">
            {seoContent.map((block, i) => (
              <div key={i} className="mb-8 last:mb-0">
                <h2 className="text-xl font-bold text-primary mb-4">{block.title}</h2>
                <p className="text-muted-foreground leading-relaxed">{block.text}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <h2 className="section-title text-center mb-10">Questions fréquentes</h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="bg-card rounded-xl border border-border px-5">
                  <AccordionTrigger className="text-left text-sm font-medium">{faq.question}</AccordionTrigger>
                  <AccordionContent forceMount className="text-sm text-muted-foreground data-[state=closed]:hidden">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Blog Links */}
      {blogLinks && blogLinks.length > 0 && (
        <section className="section-padding bg-muted">
          <div className="container-custom">
            <h2 className="section-title text-center mb-8">Articles utiles</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {blogLinks.map((link, i) => (
                <Link key={i} to={link.path} className="card-t3p group">
                  <h3 className="text-sm font-semibold text-primary mb-1 group-hover:text-accent transition-colors">{link.title}</h3>
                  <p className="text-xs text-muted-foreground">{link.description}</p>
                  <span className="text-xs font-semibold text-accent mt-2 inline-flex items-center gap-1">
                    Lire l'article <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Links */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <h2 className="section-title text-center mb-8">Formations complémentaires</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {relatedLinks.map((link, i) => (
              <Link key={i} to={link.path} className="card-t3p group">
                <h3 className="text-sm font-semibold text-primary mb-1 group-hover:text-accent transition-colors">{link.title}</h3>
                <p className="text-xs text-muted-foreground">{link.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="container-custom text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Renouvelez votre carte professionnelle</h2>
          <p className="text-white/75 mb-8 max-w-xl mx-auto">
            Inscription ouverte toute l'année. Formation obligatoire tous les 5 ans.
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
            <DialogTitle>Pré-inscription - {badge}</DialogTitle>
          </DialogHeader>
          <StepPreRegistrationForm
            isOpen={showPreRegistration}
            onClose={() => setShowPreRegistration(false)}
            defaultFormation={badge}
          />
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default ContinueFormationTemplate;
