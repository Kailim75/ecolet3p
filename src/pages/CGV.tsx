import { motion } from "framer-motion";
import DynamicSEOHead from "@/components/seo/DynamicSEOHead";
import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";
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

const CGV = () => {
  return (
    <Layout>
      <DynamicSEOHead
        pageUrl="/cgv"
        defaultTitle="CGV — Conditions Générales de Vente | ECOLE T3P Montrouge"
        defaultDescription="Conditions générales de vente des formations Taxi, VTC, VMDTR et services complémentaires proposés par ECOLE T3P à Montrouge (92)."
      >
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Accueil", item: "https://ecolet3p.fr/" },
            { "@type": "ListItem", position: 2, name: "CGV", item: "https://ecolet3p.fr/cgv" },
          ],
        })}</script>
      </DynamicSEOHead>

      {/* Breadcrumb */}
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
                <BreadcrumbPage>CGV</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-cream py-16 md:py-20">
        <div className="container-custom text-center">
          <motion.h1
            className="section-title mb-4"
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
          >
            CONDITIONS GÉNÉRALES DE VENTE
          </motion.h1>
          <motion.p
            className="section-subtitle mx-auto"
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
          >
            Version en vigueur au 16 avril 2026
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-background">
        <div className="container-custom max-w-4xl">
          <motion.div
            className="prose prose-lg max-w-none"
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
          >
            <div className="card-livementor mb-8">
              <h2 className="text-xl font-bold text-forest mb-4">Article 1 — Objet et champ d'application</h2>
              <p className="text-muted-foreground mb-3">
                Les présentes Conditions Générales de Vente (ci-après « CGV ») régissent l'ensemble des relations contractuelles entre ECOLE T3P, EURL au capital de 2 000 €, immatriculée au RCS de Nanterre sous le SIRET 948 564 802 00023, dont le siège social est situé 3 rue Corneille — 92120 Montrouge (ci-après « ECOLE T3P » ou « le Centre »), et toute personne physique ou morale souscrivant à une formation ou à un service du Centre (ci-après « le Stagiaire » ou « le Client »).
              </p>
              <p className="text-muted-foreground">
                Toute inscription à une formation implique l'acceptation sans réserve des présentes CGV, du règlement intérieur et, le cas échéant, de la convention de formation professionnelle continue signée par le Client.
              </p>
            </div>

            <div className="card-livementor mb-8">
              <h2 className="text-xl font-bold text-forest mb-4">Article 2 — Formations et services proposés</h2>
              <p className="text-muted-foreground mb-3">ECOLE T3P propose notamment :</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                <li>Formations initiales Taxi, VTC et VMDTR (moto-taxi) — préparation à l'examen T3P</li>
                <li>Formations continues obligatoires (renouvellement de carte professionnelle)</li>
                <li>Passerelle Taxi ↔ VTC (14 heures)</li>
                <li>Stage de récupération de points du permis de conduire</li>
                <li>Formation accessibilité PMR</li>
                <li>Accompagnement à la création et à la gestion d'activité</li>
                <li>Location de véhicule d'examen</li>
              </ul>
              <p className="text-muted-foreground mt-3">
                Le contenu pédagogique, la durée, les modalités et les tarifs de chaque formation sont détaillés dans la fiche programme remise avant inscription et sur le site ecolet3p.fr.
              </p>
            </div>

            <div className="card-livementor mb-8">
              <h2 className="text-xl font-bold text-forest mb-4">Article 3 — Inscription et formation du contrat</h2>
              <p className="text-muted-foreground mb-3">
                L'inscription est réputée définitive à réception par ECOLE T3P :
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                <li>du bulletin d'inscription dûment complété et signé,</li>
                <li>ou de la convention de formation professionnelle signée (pour les formations dispensées en application du Code du travail),</li>
                <li>et du versement de l'acompte prévu à l'article 4.</li>
              </ul>
              <p className="text-muted-foreground mt-3">
                Pour les inscriptions à distance (via le site ou par téléphone), la signature électronique ou la validation du bulletin en ligne vaut acceptation ferme.
              </p>
            </div>

            <div className="card-livementor mb-8">
              <h2 className="text-xl font-bold text-forest mb-4">Article 4 — Prix et modalités de paiement</h2>
              <p className="text-muted-foreground mb-3">
                Les prix sont indiqués en euros, TVA non applicable (article 293 B du CGI — franchise en base) ou TVA selon régime applicable. Ils incluent les supports pédagogiques remis au Stagiaire et l'accompagnement pédagogique. Ils n'incluent pas les frais d'inscription à l'examen, ni les frais de déplacement, ni la location de véhicule sauf mention expresse.
              </p>
              <p className="text-muted-foreground mb-3">
                <strong>Modalités de paiement :</strong>
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                <li>Paiement intégral par carte bancaire, espèces (dans la limite légale) ou virement</li>
                <li>Paiement en 4× sans frais via notre partenaire Alma (sous conditions d'éligibilité)</li>
                <li>Prise en charge OPCO / CPF / France Travail / Région : sur justificatif, une fois la convention de financement signée</li>
              </ul>
              <p className="text-muted-foreground mt-3">
                Un acompte de 30 % est requis à l'inscription. Le solde est dû au plus tard le premier jour de la formation. Tout retard de paiement entraîne, de plein droit et sans mise en demeure préalable, l'application de pénalités au taux de 3 fois le taux d'intérêt légal, ainsi qu'une indemnité forfaitaire pour frais de recouvrement de 40 € (articles L.441-10 et D.441-5 du Code de commerce).
              </p>
            </div>

            <div className="card-livementor mb-8">
              <h2 className="text-xl font-bold text-forest mb-4">Article 5 — Droit de rétractation</h2>
              <p className="text-muted-foreground mb-3">
                <strong>Pour les contrats conclus à distance ou hors établissement par un consommateur (particulier)</strong> : conformément aux articles L.221-18 et suivants du Code de la consommation, le Client dispose d'un délai de quatorze (14) jours à compter de la signature du contrat pour se rétracter, sans avoir à motiver sa décision. Le formulaire de rétractation est joint à la convention.
              </p>
              <p className="text-muted-foreground mb-3">
                <strong>Pour les contrats de formation professionnelle continue signés par un particulier à titre individuel (article L.6353-5 du Code du travail)</strong> : le Stagiaire dispose d'un délai de dix (10) jours à compter de la signature de la convention pour se rétracter par lettre recommandée avec accusé de réception. Aucune somme ne peut être exigée avant l'expiration de ce délai.
              </p>
              <p className="text-muted-foreground">
                En cas de début d'exécution de la prestation à la demande expresse du Stagiaire avant expiration du délai de rétractation, celui-ci renonce à son droit de rétractation conformément à l'article L.221-25 du Code de la consommation.
              </p>
            </div>

            <div className="card-livementor mb-8">
              <h2 className="text-xl font-bold text-forest mb-4">Article 6 — Annulation, report et absence</h2>
              <p className="text-muted-foreground mb-3"><strong>Annulation par le Stagiaire (hors rétractation) :</strong></p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                <li>Plus de 14 jours avant la formation : remboursement intégral (hors frais de dossier de 50 €)</li>
                <li>Entre 7 et 14 jours : 50 % du montant dû, reliquat remboursé</li>
                <li>Moins de 7 jours : 100 % du montant dû</li>
                <li>Absence non justifiée le jour J : 100 % du montant dû</li>
              </ul>
              <p className="text-muted-foreground mt-3">
                Un report sans frais est possible une fois, sous réserve d'en faire la demande au moins 7 jours avant la date de début, et dans la limite des places disponibles sur une session ultérieure.
              </p>
              <p className="text-muted-foreground mt-3">
                <strong>Cas de force majeure (maladie grave justifiée par certificat médical, décès d'un proche, etc.)</strong> : report gratuit ou remboursement au prorata de la partie non suivie.
              </p>
              <p className="text-muted-foreground mt-3">
                <strong>Annulation par ECOLE T3P :</strong> en cas d'effectif insuffisant, d'indisponibilité du formateur ou de force majeure, ECOLE T3P se réserve le droit de reporter ou d'annuler la session. Les sommes versées sont intégralement remboursées dans un délai de 14 jours, à l'exclusion de toute autre indemnité.
              </p>
            </div>

            <div className="card-livementor mb-8">
              <h2 className="text-xl font-bold text-forest mb-4">Article 7 — Exécution de la formation</h2>
              <p className="text-muted-foreground mb-3">
                ECOLE T3P s'engage à mettre en œuvre les moyens pédagogiques nécessaires à la réalisation de la formation. La participation du Stagiaire à l'ensemble des séquences, son assiduité et son implication personnelle sont des conditions de réussite.
              </p>
              <p className="text-muted-foreground">
                Une attestation de fin de formation et, le cas échéant, un certificat de réalisation sont remis au Stagiaire à l'issue du parcours. L'obtention de la carte professionnelle Taxi/VTC/VMDTR reste subordonnée à la réussite de l'examen organisé par la Chambre des Métiers et de l'Artisanat (CMA).
              </p>
            </div>

            <div className="card-livementor mb-8">
              <h2 className="text-xl font-bold text-forest mb-4">Article 8 — Obligations du Stagiaire</h2>
              <p className="text-muted-foreground">
                Le Stagiaire s'engage à respecter le règlement intérieur (consultable sur <Link to="/reglement-interieur" className="text-forest hover:text-gold font-semibold">cette page</Link>), à suivre la formation avec assiduité, à ne pas perturber le déroulement des séances et à respecter les locaux, le matériel, les formateurs et les autres stagiaires. Tout manquement grave pourra entraîner une exclusion, sans remboursement.
              </p>
            </div>

            <div className="card-livementor mb-8">
              <h2 className="text-xl font-bold text-forest mb-4">Article 9 — Propriété intellectuelle</h2>
              <p className="text-muted-foreground">
                Les supports pédagogiques (livrets, fiches, vidéos, exercices, accès plateforme) sont la propriété exclusive d'ECOLE T3P ou de ses partenaires. Ils sont remis au Stagiaire pour un usage strictement personnel. Toute reproduction, diffusion ou revente, même partielle, est interdite sans autorisation écrite.
              </p>
            </div>

            <div className="card-livementor mb-8">
              <h2 className="text-xl font-bold text-forest mb-4">Article 10 — Données personnelles</h2>
              <p className="text-muted-foreground">
                Les données collectées dans le cadre de l'inscription et du suivi pédagogique sont traitées conformément à notre <Link to="/politique-de-confidentialite" className="text-forest hover:text-gold font-semibold">Politique de Confidentialité</Link>. Le Stagiaire dispose d'un droit d'accès, de rectification, d'effacement, de limitation et de portabilité, exerçable auprès de <a href="mailto:montrouge@ecolet3p.fr" className="text-forest hover:text-gold">montrouge@ecolet3p.fr</a>.
              </p>
            </div>

            <div className="card-livementor mb-8">
              <h2 className="text-xl font-bold text-forest mb-4">Article 11 — Réclamation et médiation</h2>
              <p className="text-muted-foreground mb-3">
                Toute réclamation peut être adressée par écrit à l'adresse postale du Centre ou par email à <a href="mailto:montrouge@ecolet3p.fr" className="text-forest hover:text-gold">montrouge@ecolet3p.fr</a>. ECOLE T3P s'engage à accuser réception sous 7 jours ouvrés et à apporter une réponse sous 30 jours.
              </p>
              <p className="text-muted-foreground">
                Conformément aux articles L.612-1 et suivants du Code de la consommation, en cas de litige non résolu amiablement, le Client consommateur peut recourir gratuitement au service de médiation de la consommation. Le médiateur sera désigné à l'issue de la certification Qualiopi.
              </p>
            </div>

            <div className="card-livementor mb-8">
              <h2 className="text-xl font-bold text-forest mb-4">Article 12 — Droit applicable et juridiction compétente</h2>
              <p className="text-muted-foreground">
                Les présentes CGV sont soumises au droit français. À défaut de résolution amiable, tout litige relèvera de la compétence exclusive des tribunaux de Nanterre, sous réserve des règles impératives de compétence prévues par le Code de la consommation pour les litiges impliquant un consommateur.
              </p>
            </div>

            {/* Liens internes */}
            <div className="mt-12 p-6 bg-muted/30 rounded-xl">
              <h2 className="text-lg font-bold text-forest mb-4">Pages connexes</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                <Link to="/mentions-legales" className="text-forest hover:text-gold font-semibold flex items-center gap-2">
                  → Mentions légales
                </Link>
                <Link to="/reglement-interieur" className="text-forest hover:text-gold font-semibold flex items-center gap-2">
                  → Règlement intérieur
                </Link>
                <Link to="/politique-de-confidentialite" className="text-forest hover:text-gold font-semibold flex items-center gap-2">
                  → Politique de confidentialité
                </Link>
                <Link to="/nos-chiffres" className="text-forest hover:text-gold font-semibold flex items-center gap-2">
                  → Nos chiffres (Qualiopi)
                </Link>
                <Link to="/contact" className="text-forest hover:text-gold font-semibold flex items-center gap-2">
                  → Nous contacter
                </Link>
                <Link to="/formations" className="text-forest hover:text-gold font-semibold flex items-center gap-2">
                  → Nos formations
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default CGV;
