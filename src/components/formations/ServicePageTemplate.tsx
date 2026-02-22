import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Clock, Euro, Check, ArrowRight, Phone,
  Home, ChevronRight, GraduationCap
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import StepPreRegistrationForm from "@/components/formations/StepPreRegistrationForm";
import AlmaLogo from "@/components/logo/AlmaLogo";

interface PricingTier {
  label: string;
  price: number;
  recommended?: boolean;
}

interface ServicePageProps {
  title: string;
  description: string;
  canonical: string;
  badge: string;
  badgeIcon: LucideIcon;
  heading: string;
  subheading: string;
  duration: string;
  price: number;
  features: string[];
  pricing?: PricingTier[];
  relatedLinks: { title: string; desc: string; path: string }[];
  formationTitle: string;
}

const ServicePageTemplate = ({
  title, description, canonical,
  badge, badgeIcon: BadgeIcon, heading, subheading,
  duration, price, features, pricing,
  relatedLinks, formationTitle,
}: ServicePageProps) => {
  const [showPreRegistration, setShowPreRegistration] = useState(false);

  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
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
      <section className="py-16 lg:py-24 bg-primary">
        <div className="container-custom">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-white/15 text-white mb-5">
              <BadgeIcon className="w-4 h-4" /> Formation complémentaire
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
                <Euro className="w-4 h-4" /> {pricing ? `À partir de ${Math.min(...pricing.map(p => p.price))}€` : `${price}€`}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowPreRegistration(true)}
                className="btn-cta-orange px-8 py-4 text-base font-bold rounded-lg inline-flex items-center justify-center gap-2"
              >
                <GraduationCap className="w-5 h-5" /> Réserver ma place
              </button>
              <a
                href="tel:0188750555"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border-2 border-white text-white font-bold hover:bg-white hover:text-primary transition-all"
              >
                <Phone className="w-5 h-5" /> 01 88 75 05 55
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Programme */}
      <section className="section-padding bg-background">
        <div className="container-custom max-w-4xl">
          <h2 className="section-title mb-8">Programme de la formation</h2>
          <div className="grid md:grid-cols-2 gap-4 mb-12">
            {features.map((f, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-muted rounded-xl">
                <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <span className="text-sm text-foreground">{f}</span>
              </div>
            ))}
          </div>

          {/* Pricing */}
          {pricing ? (
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {pricing.map((tier, i) => (
                <div key={i} className={`card-t3p text-center relative ${tier.recommended ? "border-2 border-primary/30" : ""}`}>
                  {tier.recommended && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                      RECOMMANDÉ
                    </span>
                  )}
                  <h3 className="text-lg font-bold mb-2">{tier.label}</h3>
                  <p className="text-3xl font-bold text-primary mb-1">{tier.price}€</p>
                  <div className="flex items-center justify-center gap-1.5 mb-6">
                    <span className="text-sm font-semibold text-accent">ou 4× {(tier.price / 4).toFixed(0)}€/mois</span>
                    <AlmaLogo className="h-4" />
                  </div>
                  <button
                    onClick={() => setShowPreRegistration(true)}
                    className="btn-cta-orange w-full px-6 py-3 font-bold rounded-lg inline-flex items-center justify-center gap-2"
                  >
                    Choisir <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="max-w-md mx-auto card-t3p text-center border-2 border-primary/20">
              <h3 className="text-lg font-bold mb-2">Tarif</h3>
              <p className="text-4xl font-bold text-primary mb-1">{price}€</p>
              <div className="flex items-center justify-center gap-1.5 mb-6">
                <span className="text-sm font-semibold text-accent">ou 4× {(price / 4).toFixed(0)}€/mois</span>
                <AlmaLogo className="h-4" />
              </div>
              <button
                onClick={() => setShowPreRegistration(true)}
                className="btn-cta-orange w-full px-6 py-3.5 font-bold rounded-lg inline-flex items-center justify-center gap-2"
              >
                Réserver ma place <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </section>

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
            defaultFormation={formationTitle}
          />
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default ServicePageTemplate;
