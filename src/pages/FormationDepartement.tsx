import { useParams, Navigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import DynamicSEOHead from "@/components/seo/DynamicSEOHead";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Building2,
  Stethoscope,
  FileText,
  MapPin,
  ExternalLink,
  CheckCircle2,
  ArrowRight,
  Mail,
  Phone,
  GraduationCap,
  ChevronRight,
  Home,
} from "lucide-react";
import {
  getDepartementByCode,
  METIER_LABELS,
  SERVICE_PUBLIC_LINKS,
  type Metier,
  type DepartementInfo,
} from "@/data/departementsIdfData";
import { getCanonicalUrl } from "@/lib/siteConfig";

interface Props {
  metier: Metier;
}

const FormationDepartementPage = ({ metier }: Props) => {
  const { dept } = useParams<{ dept: string }>();
  const departement = dept ? getDepartementByCode(dept) : undefined;

  if (!departement) {
    return <Navigate to={`/formations/${metier}`} replace />;
  }

  const labels = METIER_LABELS[metier];
  const spLink = SERVICE_PUBLIC_LINKS[metier];
  const pageUrl = `/formations/${metier}-${departement.code}`;
  const canonical = getCanonicalUrl(pageUrl);
  const prefectureUrl = metier === "taxi" ? departement.prefecture.urlTaxi : departement.prefecture.urlVtc;

  const title = `Formation ${labels.short} ${departement.nom} (${departement.code}) — Préfecture & Démarches | ECOLE T3P`;
  const description = `Formation ${labels.short} pour le département ${departement.nom} (${departement.code}) : démarches officielles auprès de la Préfecture, médecins agréés, examen T3P. Centre agréé à Montrouge — 94% de réussite, dès 990€.`;

  // JSON-LD : Service + BreadcrumbList + LocalBusiness reference
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: `Formation ${labels.long} — ${departement.nom}`,
        description,
        provider: {
          "@type": "EducationalOrganization",
          name: "ECOLE T3P",
          url: "https://ecolet3p.fr",
          address: {
            "@type": "PostalAddress",
            streetAddress: "3 rue Corneille",
            addressLocality: "Montrouge",
            postalCode: "92120",
            addressCountry: "FR",
          },
        },
        areaServed: {
          "@type": "AdministrativeArea",
          name: `${departement.nom} (${departement.code})`,
        },
        offers: {
          "@type": "Offer",
          price: "990",
          priceCurrency: "EUR",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: "https://ecolet3p.fr/" },
          { "@type": "ListItem", position: 2, name: "Formations", item: "https://ecolet3p.fr/formations" },
          {
            "@type": "ListItem",
            position: 3,
            name: `Formation ${labels.short}`,
            item: `https://ecolet3p.fr/formations/${metier}`,
          },
          { "@type": "ListItem", position: 4, name: departement.nom, item: canonical },
        ],
      },
    ],
  };

  return (
    <Layout>
      <DynamicSEOHead
        pageUrl={pageUrl}
        defaultTitle={title}
        defaultDescription={description}
        canonicalUrl={canonical}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Breadcrumb */}
      <nav aria-label="Fil d'Ariane" className="bg-muted/30 border-b">
        <div className="container mx-auto px-4 py-3 text-sm text-muted-foreground flex items-center gap-1 flex-wrap">
          <Link to="/" className="hover:text-primary flex items-center gap-1">
            <Home className="w-3.5 h-3.5" /> Accueil
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/formations" className="hover:text-primary">Formations</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to={`/formations/${metier}`} className="hover:text-primary">
            Formation {labels.short}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-foreground font-medium">{departement.nom}</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/5 py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
            <MapPin className="w-3.5 h-3.5" />
            Département {departement.code} — {departement.nom}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
            Formation {labels.short} dans le {departement.nom} ({departement.code})
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mb-6 leading-relaxed">
            Vous résidez dans le {departement.nom} et souhaitez obtenir votre carte
            professionnelle {labels.short} ? ECOLE T3P, centre agréé Préfecture situé à
            Montrouge (92), accueille les candidats du département {departement.code}.
            Retrouvez ci-dessous toutes les <strong>démarches officielles</strong> à
            effectuer auprès de la Préfecture de {departement.nom}, vérifiées en
            sources <code className="text-xs bg-muted px-1.5 py-0.5 rounded">*.gouv.fr</code>.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild size="lg" className="bg-cta hover:bg-cta/90 text-cta-foreground">
              <Link to={`/formations/${metier}`}>
                Voir la formation {labels.short} (dès 990€) <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/contact">Demander un conseil</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Sources officielles */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4 max-w-4xl space-y-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Démarches officielles dans le {departement.nom}
            </h2>
            <p className="text-muted-foreground">
              Sources : Préfecture du {departement.nom}, service-public.fr et Légifrance.
            </p>
          </div>

          {/* Préfecture */}
          <article className="bg-card border rounded-2xl p-6 md:p-8 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold mb-2">
                  Préfecture de rattachement — Dépôt de votre carte professionnelle
                </h3>
                <p className="font-semibold text-foreground">{departement.prefecture.nom}</p>
                <address className="not-italic text-muted-foreground mt-2 text-sm leading-relaxed">
                  {departement.prefecture.adresse}<br />
                  {departement.prefecture.codePostal} {departement.prefecture.ville}
                </address>
                {departement.prefecture.email && (
                  <p className="text-sm mt-2 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <a
                      href={`mailto:${departement.prefecture.email}`}
                      className="text-primary hover:underline"
                    >
                      {departement.prefecture.email}
                    </a>
                  </p>
                )}
                {departement.prefecture.telephone && (
                  <p className="text-sm mt-1 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>{departement.prefecture.telephone}</span>
                  </p>
                )}
                {departement.prefecture.notes && (
                  <p className="text-sm mt-3 p-3 bg-muted/50 rounded-lg border-l-2 border-primary">
                    <strong>Bon à savoir :</strong> {departement.prefecture.notes}
                  </p>
                )}
                <Button asChild variant="outline" size="sm" className="mt-4">
                  <a href={prefectureUrl} target="_blank" rel="noopener noreferrer">
                    Page officielle {labels.short} — Préfecture {departement.code}
                    <ExternalLink className="ml-2 w-3.5 h-3.5" />
                  </a>
                </Button>
              </div>
            </div>
          </article>

          {/* Médecins agréés */}
          <article className="bg-card border rounded-2xl p-6 md:p-8 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
                <Stethoscope className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold mb-2">
                  Visite médicale obligatoire — Médecin agréé du {departement.code}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  Pour obtenir votre carte professionnelle {labels.short}, vous devez
                  passer une visite médicale auprès d'un <strong>médecin agréé par la
                  Préfecture</strong> (hors commission médicale). Le certificat
                  d'aptitude à la conduite (formulaire Cerfa n° 14880*02) doit être
                  joint à votre dossier.
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  La liste officielle est publiée et mise à jour régulièrement par la
                  Préfecture du {departement.nom}.
                </p>
                <Button asChild variant="outline" size="sm">
                  <a
                    href={departement.medecinsAgreesUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Liste officielle des médecins agréés — {departement.code}
                    <ExternalLink className="ml-2 w-3.5 h-3.5" />
                  </a>
                </Button>
              </div>
            </div>
          </article>

          {/* Service-public.fr */}
          <article className="bg-card border rounded-2xl p-6 md:p-8 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-12 h-12 rounded-xl bg-secondary/40 text-foreground flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold mb-2">
                  Démarches administratives — Référentiel officiel
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Le portail <strong>service-public.fr</strong> (édité par la DILA,
                  Direction de l'information légale et administrative) recense
                  l'ensemble des démarches, pièces justificatives, délais et recours
                  pour l'obtention de la carte professionnelle {labels.short}.
                </p>
                <Button asChild variant="outline" size="sm">
                  <a href={spLink.fiche} target="_blank" rel="noopener noreferrer">
                    {spLink.titre} — service-public.fr
                    <ExternalLink className="ml-2 w-3.5 h-3.5" />
                  </a>
                </Button>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Étapes */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">
            Les 6 étapes pour obtenir votre carte {labels.short} dans le {departement.nom}
          </h2>
          <ol className="space-y-4">
            {[
              `Vérifier les prérequis : 21 ans, permis B (3 ans, 2 ans si conduite accompagnée), casier judiciaire vierge (bulletin n°2).`,
              `Effectuer la visite médicale auprès d'un médecin agréé par la Préfecture du ${departement.nom} (liens ci-dessus).`,
              `S'inscrire à la formation ${labels.short} chez ECOLE T3P à Montrouge (Journée, Soir ou E-learning, dès 990€).`,
              `Réussir l'examen T3P organisé par la Chambre de Métiers et de l'Artisanat (94% de réussite chez ECOLE T3P).`,
              `Constituer et déposer votre dossier de carte professionnelle auprès de la Préfecture du ${departement.nom} (lien officiel ci-dessus).`,
              `Recevoir votre carte professionnelle (délai indicatif : 4 semaines à 4 mois selon le département) et lancer votre activité.`,
            ].map((step, i) => (
              <li key={i} className="flex gap-4 bg-card border rounded-xl p-4">
                <div className="shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                  {i + 1}
                </div>
                <p className="text-sm md:text-base leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Notre centre + accessibilité */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-gradient-to-br from-primary/10 to-accent/5 border rounded-2xl p-6 md:p-10">
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-12 h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold mb-3">
                  ECOLE T3P à Montrouge — accessible depuis le {departement.nom}
                </h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  <strong>3 rue Corneille, 92120 Montrouge</strong> — à 2 minutes à pied
                  du métro Mairie de Montrouge (ligne 4).
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  <MapPin className="inline w-4 h-4 mr-1 text-primary" />
                  <strong>Depuis le {departement.code} ({departement.nom}) :</strong>{" "}
                  {departement.accessibiliteDepuisMontrouge}
                </p>
                <p className="text-sm text-muted-foreground mb-6">
                  <strong>Principales communes desservies :</strong>{" "}
                  {departement.communesPrincipales.join(", ")}.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button asChild className="bg-cta hover:bg-cta/90 text-cta-foreground">
                    <Link to={`/formations/${metier}`}>
                      Découvrir la formation {labels.short}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/contact">Nous contacter</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Questions fréquentes — {labels.short} dans le {departement.nom}
          </h2>
          <Accordion type="single" collapsible className="space-y-3">
            <AccordionItem value="q1" className="bg-card border rounded-xl px-4">
              <AccordionTrigger className="text-left">
                Puis-je faire ma formation à Montrouge si je vis dans le {departement.nom} ?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Oui. Aucune obligation de suivre la formation dans votre département de
                résidence. L'attestation de formation délivrée par ECOLE T3P (centre
                agréé Préfecture 23/007) est valable sur l'ensemble du territoire
                national. Vous déposerez ensuite votre dossier auprès de la Préfecture
                du {departement.nom} pour obtenir votre carte professionnelle.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q2" className="bg-card border rounded-xl px-4">
              <AccordionTrigger className="text-left">
                Où dois-je déposer mon dossier de carte professionnelle ?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Vous devez déposer votre dossier auprès de la Préfecture de votre
                département de résidence — pour vous, la {departement.prefecture.nom},{" "}
                {departement.prefecture.adresse}, {departement.prefecture.codePostal}{" "}
                {departement.prefecture.ville}. La procédure est en grande partie
                dématérialisée via demarches-simplifiees.fr (voir lien officiel
                ci-dessus).
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q3" className="bg-card border rounded-xl px-4">
              <AccordionTrigger className="text-left">
                Quel est le délai pour recevoir ma carte professionnelle dans le {departement.nom} ?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Le délai dépend du département. En Seine-Saint-Denis (93), la
                Préfecture annonce 4 mois en moyenne. Dans les Hauts-de-Seine (92) ou le
                Val-de-Marne (94), comptez en général 4 à 8 semaines. Les indications
                officielles sont publiées sur la page Préfecture liée ci-dessus.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q4" className="bg-card border rounded-xl px-4">
              <AccordionTrigger className="text-left">
                Combien coûte la formation {labels.short} ?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                La formation {labels.short} chez ECOLE T3P démarre à{" "}
                <strong>990€</strong> (formule Essentiel) ou 1 190€ (formule Premium
                avec accompagnement post-formation). Frais d'examen T3P (241€) inclus.
                Paiement en 4 fois sans frais via Alma disponible.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-12 md:py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Prêt à devenir chauffeur {labels.short} dans le {departement.nom} ?
          </h2>
          <p className="mb-6 text-primary-foreground/90">
            Rejoignez les 94% de réussite ECOLE T3P. Formation agréée Préfecture,
            sessions chaque mois, paiement en 4×.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="bg-cta hover:bg-cta/90 text-cta-foreground">
              <Link to={`/formations/${metier}`}>
                Voir la formation {labels.short} <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Link to="/contact">Prendre rendez-vous</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FormationDepartementPage;
