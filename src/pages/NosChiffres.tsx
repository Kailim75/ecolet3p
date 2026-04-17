import type { ElementType } from "react";
import { motion } from "framer-motion";
import DynamicSEOHead from "@/components/seo/DynamicSEOHead";
import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Home, Star, Users, TrendingUp, CheckCircle2, Clock, Accessibility } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

type Indicator = {
  icon: ElementType;
  title: string;
  value: string;
  status: "published" | "pending";
  description: string;
  source?: string;
};

const indicators: Indicator[] = [
  {
    icon: Star,
    title: "Satisfaction stagiaires",
    value: "5,0 / 5",
    status: "published",
    description: "Note moyenne des avis Google vérifiés recueillis sur l'ensemble des stagiaires depuis 2014.",
    source: "359 avis Google — actualisé en continu",
  },
  {
    icon: Users,
    title: "Stagiaires formés (depuis 2014)",
    value: "1 000+",
    status: "published",
    description: "Nombre de stagiaires ayant suivi une formation Taxi, VTC ou VMDTR au sein du centre.",
    source: "Données internes ECOLE T3P",
  },
  {
    icon: CheckCircle2,
    title: "Taux de réussite à l'examen T3P",
    value: "Données en cours de consolidation",
    status: "pending",
    description: "Pourcentage de stagiaires ayant obtenu leur carte professionnelle à l'issue de la formation. Indicateur calculé sur 12 mois glissants conformément aux exigences Qualiopi.",
    source: "Publication lors de la certification Qualiopi initiale",
  },
  {
    icon: TrendingUp,
    title: "Taux d'insertion / prise de poste",
    value: "Données en cours de consolidation",
    status: "pending",
    description: "Proportion de stagiaires ayant démarré leur activité professionnelle (salarié ou indépendant) dans les 6 mois suivant l'obtention de la carte.",
    source: "Enquête post-formation — publication Qualiopi 2026",
  },
  {
    icon: Clock,
    title: "Taux d'abandon en cours de formation",
    value: "Données en cours de consolidation",
    status: "pending",
    description: "Part des stagiaires n'ayant pas terminé le parcours pour lequel ils étaient inscrits (hors cas de force majeure et reports validés).",
    source: "Publication Qualiopi 2026",
  },
  {
    icon: Clock,
    title: "Délai moyen d'accès à la formation",
    value: "< 15 jours ouvrés",
    status: "published",
    description: "Délai médian entre la première prise de contact et l'entrée effective en formation, hors contraintes de financement externe (OPCO, CPF).",
    source: "Données internes ECOLE T3P",
  },
  {
    icon: Accessibility,
    title: "Accessibilité aux personnes en situation de handicap",
    value: "Sur demande — étude individualisée",
    status: "pending",
    description: "Accueil et adaptation des formations aux personnes en situation de handicap. Référent handicap en cours de désignation. Les aménagements sont étudiés au cas par cas, en lien avec l'Agefiph et Cap Emploi.",
    source: "Voir notre Règlement Intérieur — Article 7",
  },
];

const NosChiffres = () => {
  return (
    <Layout>
      <DynamicSEOHead
        pageUrl="/nos-chiffres"
        defaultTitle="Nos chiffres — Indicateurs Qualiopi | ECOLE T3P Montrouge"
        defaultDescription="Retrouvez les indicateurs publics de performance d'ECOLE T3P : satisfaction, réussite à l'examen, insertion, abandon, accessibilité. Transparence Qualiopi."
      >
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Accueil", item: "https://ecolet3p.fr/" },
            { "@type": "ListItem", position: 2, name: "Nos chiffres", item: "https://ecolet3p.fr/nos-chiffres" },
          ],
        })}</script>
      </DynamicSEOHead>

      <div className="bg-muted/30 py-3 border-b">
        <div className="container mx-auto px-4">
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
                <BreadcrumbPage>Nos chiffres</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <section className="bg-cream py-16 md:py-20">
        <div className="container-custom text-center max-w-3xl mx-auto">
          <motion.h1 className="section-title mb-4" initial="hidden" animate="visible" variants={fadeUpVariants}>
            NOS CHIFFRES — INDICATEURS QUALIOPI
          </motion.h1>
          <motion.p className="section-subtitle" initial="hidden" animate="visible" variants={fadeUpVariants}>
            Transparence sur nos résultats pédagogiques. Indicateurs mis à jour semestriellement.
          </motion.p>
          <motion.p
            className="text-sm text-muted-foreground mt-6 p-4 bg-white/60 rounded-lg border border-gold/30"
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
          >
            <strong>Statut certification Qualiopi :</strong> ECOLE T3P est <em>en cours d'obtention</em> de la certification Qualiopi.
            Les indicateurs marqués <em>« Données en cours de consolidation »</em> seront publiés dès la
            validation de l'audit initial. Dernière mise à jour : 16 avril 2026.
          </motion.p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-custom max-w-5xl">
          <div className="grid md:grid-cols-2 gap-6">
            {indicators.map((ind, i) => {
              const Icon = ind.icon;
              const isPending = ind.status === "pending";
              return (
                <motion.div
                  key={ind.title}
                  className={`card-livementor ${isPending ? "border-gold/40 bg-gold/5" : ""}`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.05 } },
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className={`shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${isPending ? "bg-gold/20 text-gold-dark" : "bg-forest/10 text-forest"}`}>
                      <Icon className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-forest mb-1">{ind.title}</h3>
                      <p className={`text-2xl font-bold mb-2 ${isPending ? "text-gold-dark" : "text-forest-dark"}`}>
                        {ind.value}
                      </p>
                      <p className="text-sm text-muted-foreground mb-2 leading-relaxed">{ind.description}</p>
                      {ind.source && (
                        <p className="text-xs text-muted-foreground/80 italic">Source : {ind.source}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-12 p-6 bg-muted/30 rounded-xl">
            <h2 className="text-lg font-bold text-forest mb-3">Méthodologie</h2>
            <p className="text-sm text-muted-foreground mb-3">
              Les indicateurs sont calculés conformément au décret n° 2019-565 du 6 juin 2019 relatif au Référentiel National Qualité (RNQ) des organismes concourant au développement des compétences. Le périmètre couvre l'ensemble des formations dispensées par ECOLE T3P : Taxi, VTC, VMDTR, passerelles, formations continues et accompagnement.
            </p>
            <p className="text-sm text-muted-foreground">
              Les données sont consolidées tous les 6 mois et publiées sur cette page. Toute demande de précision méthodologique peut être adressée à <a href="mailto:montrouge@ecolet3p.fr" className="text-forest hover:text-gold font-semibold">montrouge@ecolet3p.fr</a>.
            </p>
          </div>

          <div className="mt-8 p-6 bg-muted/30 rounded-xl">
            <h2 className="text-lg font-bold text-forest mb-4">Pages connexes</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              <Link to="/mentions-legales" className="text-forest hover:text-gold font-semibold flex items-center gap-2">→ Mentions légales</Link>
              <Link to="/cgv" className="text-forest hover:text-gold font-semibold flex items-center gap-2">→ CGV</Link>
              <Link to="/reglement-interieur" className="text-forest hover:text-gold font-semibold flex items-center gap-2">→ Règlement intérieur</Link>
              <Link to="/formations" className="text-forest hover:text-gold font-semibold flex items-center gap-2">→ Nos formations</Link>
              <Link to="/a-propos" className="text-forest hover:text-gold font-semibold flex items-center gap-2">→ À propos d'ECOLE T3P</Link>
              <Link to="/contact" className="text-forest hover:text-gold font-semibold flex items-center gap-2">→ Nous contacter</Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NosChiffres;
