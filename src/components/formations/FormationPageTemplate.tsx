import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Clock, Euro, Check, ArrowRight, Phone, Star,
  Home, ChevronRight, GraduationCap, CalendarDays, Users
} from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
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
import PricingPaymentBlock from "@/components/formations/PricingPaymentBlock";
import ExamProgramSection from "@/components/formations/ExamProgramSection";
import NextCMASessionBanner from "@/components/formations/NextCMASessionBanner";
import { supabase } from "@/integrations/supabase/client";

interface ProgramModule {
  title: string;
  duration: string;
  topics: string[];
}

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
}

interface FAQ {
  question: string;
  answer: string;
}

interface Prerequisite {
  icon: LucideIcon;
  text: string;
}

interface RelatedLink {
  title: string;
  desc: string;
  path: string;
}

interface FormationPageProps {
  // SEO
  title: string;
  description: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;

  // Hero
  heroImage: string;
  badge: string;
  badgeIcon: LucideIcon;
  heading: string;
  subheading: string;
  duration: string;
  price: number;
  thirdTag: { icon: LucideIcon; label: string };

  // Content
  category: string;
  profession: "taxi" | "vtc" | "vmdtr";
  programModules: ProgramModule[];
  prerequisites: Prerequisite[];
  testimonials: Testimonial[];
  faqs: FAQ[];
  relatedLinks: RelatedLink[];
  seoContent: { title: string; text: string }[];

  // Pricing
  premiumPrice?: number;
  premiumLabel?: string;
  premiumFeatures?: string[];
  essentielFeatures?: string[];
}

const FormationPageTemplate = ({
  title, description, canonical, ogTitle, ogDescription,
  heroImage, badge, badgeIcon: BadgeIcon, heading, subheading,
  duration, price, thirdTag,
  category, profession, programModules, prerequisites,
  testimonials, faqs, relatedLinks, seoContent,
  premiumPrice, premiumLabel, premiumFeatures, essentielFeatures,
}: FormationPageProps) => {
  const [showPreRegistration, setShowPreRegistration] = useState(false);
  const [formations, setFormations] = useState<any[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);

  const mainFormation = formations.find(f => f.title?.toLowerCase().includes('initial')) || formations[0];
  const soireeFormation = formations.find(f => f.title?.toLowerCase().includes('soirée'));

  useEffect(() => {
    const fetchFormations = async () => {
      const { data } = await supabase
        .from("formations")
        .select("*")
        .eq("category", category)
        .eq("is_active", true)
        .order("display_order");

      if (data && data.length > 0) {
        setFormations(data);
        const formationIds = data.map(f => f.id);
        const { data: sessionsData } = await supabase
          .from("formation_sessions")
          .select("*, formations(title)")
          .in("formation_id", formationIds)
          .in("status", ["upcoming", "ongoing"])
          .order("start_date")
          .limit(6);

        setSessions((sessionsData || []).map(s => ({
          ...s,
          formation_title: (s as any).formations?.title
        })));
      }
    };
    fetchFormations();
  }, [category]);

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": heading,
    "description": description,
    "provider": { "@type": "EducationalOrganization", "name": "ECOLE T3P", "url": "https://www.ecolet3p.fr" },
    "offers": { "@type": "Offer", "price": soireeFormation?.price || price, "priceCurrency": "EUR" },
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

  const ThirdIcon = thirdTag.icon;

  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={ogDescription} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(courseSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
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
            <span className="text-foreground font-medium">{badge}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="relative py-16 lg:py-24 bg-primary overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})`, filter: "blur(2px) brightness(0.35)" }}
        />
        <div className="absolute inset-0 bg-primary/65" />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-white/15 text-white mb-5">
              <BadgeIcon className="w-4 h-4" /> {badge}
            </span>
            <h1 className="text-[26px] md:text-[36px] lg:text-[46px] font-bold text-white leading-tight mb-5">
              {heading}
            </h1>
            <p className="text-white/80 text-base md:text-lg mb-6 max-w-2xl">{subheading}</p>

            <div className="flex flex-wrap gap-3 mb-8">
              <span className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-lg text-white text-sm font-medium">
                <Clock className="w-4 h-4" /> {duration}
              </span>
              <span className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-lg text-white text-sm font-medium">
                <Euro className="w-4 h-4" /> {soireeFormation?.price || price}€
              </span>
              <span className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-lg text-white text-sm font-medium">
                <ThirdIcon className="w-4 h-4" /> {thirdTag.label}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowPreRegistration(true)}
                className="btn-cta-orange px-8 py-4 text-base font-bold rounded-lg inline-flex items-center justify-center gap-2"
              >
                <GraduationCap className="w-5 h-5" /> S'inscrire
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

      {/* Prochaines sessions */}
      {sessions.length > 0 && (
        <section className="py-10 bg-muted border-b border-border">
          <div className="container-custom">
            <h2 className="section-title text-center mb-6">Prochaines sessions</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {sessions.map((session: any) => {
                const spots = session.max_participants - session.current_participants;
                const full = spots <= 0;
                const urgent = spots > 0 && spots <= 3;
                const startDate = new Date(session.start_date);
                return (
                  <div key={session.id} className="card-t3p flex flex-col gap-2">
                    <h3 className="text-sm font-bold text-primary">{session.formation_title || badge}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CalendarDays className="w-4 h-4 text-primary shrink-0" />
                      <span className="capitalize">{format(startDate, "d MMMM yyyy", { locale: fr })}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 text-primary shrink-0" />
                      <span>{session.start_time?.slice(0, 5)} – {session.end_time?.slice(0, 5)}</span>
                    </div>
                    <div className="mt-auto pt-2 border-t border-border">
                      {full ? (
                        <span className="text-xs font-bold text-destructive bg-destructive/10 px-2.5 py-1 rounded-full">Complet</span>
                      ) : (
                        <div className="flex items-center gap-1.5">
                          <Users className="w-4 h-4 text-primary" />
                          <span className={`text-sm font-bold ${urgent ? "text-accent" : "text-primary"}`}>
                            {spots} place{spots > 1 ? "s" : ""} restante{spots > 1 ? "s" : ""}
                          </span>
                          {urgent && (
                            <span className="text-[10px] font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-full animate-pulse ml-auto">
                              Dernières places
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="text-center mt-6">
              <button
                onClick={() => setShowPreRegistration(true)}
                className="btn-cta-orange px-6 py-3 text-sm font-bold rounded-lg inline-flex items-center gap-2"
              >
                Réserver ma place <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Programme */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="section-title mb-3">Programme de la formation</h2>
            <p className="section-subtitle mx-auto">Tous les modules pour réussir votre examen</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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

          {/* Pricing */}
          {premiumFeatures && essentielFeatures && (
            <>
              <h3 className="text-xl md:text-2xl font-bold text-center mt-14 mb-8">Choisissez votre formule</h3>
              <div className="grid md:grid-cols-2 gap-6 max-w-[900px] mx-auto">
                <div className="md:order-2">
                  <PricingPaymentBlock
                    formationTitle={`Formation ${badge} Journée`}
                    price={mainFormation?.price || premiumPrice || 1190}
                    onRegister={() => setShowPreRegistration(true)}
                    tier="premium"
                    tierLabel={premiumLabel || "PREMIUM"}
                    subtitle="Formation + Accompagnement"
                    features={premiumFeatures}
                  />
                </div>
                <div className="md:order-1">
                  <PricingPaymentBlock
                    formationTitle={`Formation ${badge} Soirée`}
                    price={soireeFormation?.price || price}
                    onRegister={() => setShowPreRegistration(true)}
                    tier="essentiel"
                    tierLabel="ESSENTIEL"
                    subtitle="Formation seule"
                    features={essentielFeatures}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      <ExamProgramSection profession={profession} />
      <NextCMASessionBanner />

      {/* Prérequis */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <h2 className="section-title text-center mb-10">Conditions d'accès</h2>
          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {prerequisites.map((p, i) => {
              const PIcon = p.icon;
              return (
                <div key={i} className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                    <PIcon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{p.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <h2 className="section-title text-center mb-10">Ils ont réussi avec nous</h2>
          <div className="grid md:grid-cols-3 gap-6">
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
      <section className="section-padding bg-muted">
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

      {/* Related Links */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <h2 className="section-title text-center mb-8">Découvrez aussi</h2>
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
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Prêt à vous lancer ?</h2>
          <p className="text-white/75 mb-8 max-w-xl mx-auto">
            Inscription ouverte toute l'année. Paiement en 4x sans frais via Alma.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setShowPreRegistration(true)}
              className="btn-cta-orange px-8 py-4 font-bold rounded-lg inline-flex items-center gap-2"
            >
              Je m'inscris <ArrowRight className="w-5 h-5" />
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

export default FormationPageTemplate;
