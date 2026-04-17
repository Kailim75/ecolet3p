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

const ReglementInterieur = () => {
  return (
    <Layout>
      <DynamicSEOHead
        pageUrl="/reglement-interieur"
        defaultTitle="Règlement intérieur | ECOLE T3P Montrouge"
        defaultDescription="Règlement intérieur applicable aux stagiaires des formations Taxi, VTC, VMDTR dispensées par ECOLE T3P à Montrouge (92). Articles L.6352-3 à L.6352-5 du Code du travail."
      >
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Accueil", item: "https://ecolet3p.fr/" },
            { "@type": "ListItem", position: 2, name: "Règlement intérieur", item: "https://ecolet3p.fr/reglement-interieur" },
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
                <BreadcrumbPage>Règlement intérieur</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <section className="bg-cream py-16 md:py-20">
        <div className="container-custom text-center">
          <motion.h1 className="section-title mb-4" initial="hidden" animate="visible" variants={fadeUpVariants}>
            RÈGLEMENT INTÉRIEUR
          </motion.h1>
          <motion.p className="section-subtitle mx-auto" initial="hidden" animate="visible" variants={fadeUpVariants}>
            Applicable à l'ensemble des stagiaires — Version en vigueur au 16 avril 2026
          </motion.p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-custom max-w-4xl">
          <motion.div className="prose prose-lg max-w-none" initial="hidden" animate="visible" variants={fadeUpVariants}>
            <div className="card-livementor mb-8">
              <h2 className="text-xl font-bold text-forest mb-4">Préambule</h2>
              <p className="text-muted-foreground">
                Le présent règlement intérieur est établi conformément aux dispositions des articles L.6352-3 à L.6352-5 et R.6352-1 à R.6352-15 du Code du travail. Il s'applique à tous les stagiaires d'ECOLE T3P, quel que soit le dispositif de financement (individuel, employeur, OPCO, CPF, France Travail, Région) et le lieu de formation (présentiel ou distanciel).
              </p>
            </div>

            <div className="card-livementor mb-8">
              <h2 className="text-xl font-bold text-forest mb-4">Article 1 — Hygiène et sécurité</h2>
              <p className="text-muted-foreground mb-3">
                Chaque stagiaire doit veiller à sa sécurité personnelle et à celle des autres en respectant les consignes générales et particulières de sécurité et d'hygiène applicables sur les lieux de formation.
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                <li>Interdiction de fumer ou de vapoter dans les locaux (article L.3512-8 du Code de la santé publique)</li>
                <li>Interdiction d'introduire des boissons alcoolisées ou des substances illicites</li>
                <li>Respect des consignes d'évacuation affichées et du plan d'évacuation</li>
                <li>Signalement immédiat de tout incident, accident ou comportement dangereux au référent pédagogique</li>
              </ul>
              <p className="text-muted-foreground mt-3">
                En cas d'accident, survenu à l'occasion ou en cours de formation, le stagiaire ou les témoins doivent immédiatement prévenir le responsable de formation.
              </p>
            </div>

            <div className="card-livementor mb-8">
              <h2 className="text-xl font-bold text-forest mb-4">Article 2 — Discipline générale</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Horaires :</strong> les stagiaires doivent respecter strictement les horaires de formation. Tout retard doit être justifié au formateur.</li>
                <li><strong>Présence et assiduité :</strong> la présence à toutes les séances est obligatoire ; elle est attestée par la signature de la feuille d'émargement (demi-journée par demi-journée, ou via un système équivalent en distanciel).</li>
                <li><strong>Absences :</strong> toute absence doit être signalée et justifiée dans les plus brefs délais (certificat médical, convocation officielle, cas de force majeure). Les absences non justifiées peuvent entraîner l'impossibilité de valider la formation.</li>
                <li><strong>Tenue :</strong> une tenue correcte et adaptée au cadre professionnel est requise.</li>
                <li><strong>Comportement :</strong> respect du formateur, des autres stagiaires, du personnel et du matériel. Toute violence verbale, physique, tout harcèlement, toute discrimination entraînera l'exclusion immédiate.</li>
                <li><strong>Téléphones portables :</strong> en mode silencieux pendant les séances ; leur usage est réservé aux pauses.</li>
              </ul>
            </div>

            <div className="card-livementor mb-8">
              <h2 className="text-xl font-bold text-forest mb-4">Article 3 — Utilisation du matériel</h2>
              <p className="text-muted-foreground">
                Les stagiaires utilisent le matériel pédagogique (supports, ordinateurs, véhicules d'examen, etc.) exclusivement dans le cadre de la formation, avec soin et selon les consignes du formateur. Toute dégradation volontaire ou résultant d'un usage non conforme engagera la responsabilité financière du stagiaire.
              </p>
            </div>

            <div className="card-livementor mb-8">
              <h2 className="text-xl font-bold text-forest mb-4">Article 4 — Sanctions disciplinaires</h2>
              <p className="text-muted-foreground mb-3">
                Conformément à l'article R.6352-3 du Code du travail, constitue une sanction toute mesure, autre que les observations verbales, prise par le responsable de l'organisme à la suite d'un agissement considéré par lui comme fautif, que cette mesure soit de nature à affecter immédiatement ou non la présence du stagiaire dans la formation ou à mettre en cause la continuité de la formation qu'il reçoit.
              </p>
              <p className="text-muted-foreground mb-3">Les sanctions pouvant être prises sont, par ordre croissant :</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                <li>Avertissement écrit</li>
                <li>Blâme</li>
                <li>Exclusion temporaire de la formation</li>
                <li>Exclusion définitive de la formation</li>
              </ul>
            </div>

            <div className="card-livementor mb-8">
              <h2 className="text-xl font-bold text-forest mb-4">Article 5 — Procédure disciplinaire</h2>
              <p className="text-muted-foreground mb-3">
                Aucune sanction ne peut être infligée au stagiaire sans que celui-ci ait été informé au préalable des griefs retenus contre lui (article R.6352-4 du Code du travail). Lorsque le responsable envisage une sanction ayant une incidence immédiate ou non sur la présence du stagiaire dans la formation, il est procédé ainsi :
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Convocation du stagiaire par lettre recommandée ou remise en main propre contre décharge, précisant l'objet, la date, l'heure et le lieu de l'entretien ;</li>
                <li>Entretien au cours duquel sont indiqués les motifs de la sanction envisagée et au cours duquel le stagiaire peut se faire assister par la personne de son choix (stagiaire ou salarié de l'organisme) ;</li>
                <li>La sanction ne peut intervenir moins d'un jour franc ni plus de quinze jours après l'entretien ;</li>
                <li>Notification écrite et motivée de la sanction au stagiaire.</li>
              </ul>
              <p className="text-muted-foreground mt-3">
                Lorsque l'agissement a rendu indispensable une mesure conservatoire d'exclusion temporaire à effet immédiat, aucune sanction définitive ne peut être prise sans que la procédure ci-dessus ait été observée.
              </p>
            </div>

            <div className="card-livementor mb-8">
              <h2 className="text-xl font-bold text-forest mb-4">Article 6 — Représentation des stagiaires</h2>
              <p className="text-muted-foreground">
                Conformément aux articles R.6352-9 à R.6352-12 du Code du travail, pour chaque formation d'une durée supérieure à 500 heures, il est procédé à l'élection simultanée d'un délégué titulaire et d'un délégué suppléant au scrutin uninominal à deux tours. Les délégués représentent les stagiaires auprès du centre, formulent toute suggestion et présentent toute réclamation individuelle ou collective relative au déroulement de la formation, aux conditions de vie et à l'hygiène et à la sécurité.
              </p>
            </div>

            <div className="card-livementor mb-8">
              <h2 className="text-xl font-bold text-forest mb-4">Article 7 — Accessibilité et adaptation aux situations de handicap</h2>
              <p className="text-muted-foreground">
                ECOLE T3P s'engage à rendre ses formations accessibles aux personnes en situation de handicap. Toute demande d'adaptation (aménagement de poste, supports adaptés, aménagement du temps, accompagnement humain) peut être adressée au référent handicap avant ou au début de la formation. Chaque demande est étudiée au cas par cas dans un délai de 7 jours ouvrés, en lien avec les partenaires compétents (Agefiph, Cap Emploi, MDPH). Le locaux sont <em>en cours de mise en conformité accessibilité PMR — se renseigner auprès du secrétariat pour les aménagements disponibles à date</em>.
              </p>
            </div>

            <div className="card-livementor mb-8">
              <h2 className="text-xl font-bold text-forest mb-4">Article 8 — Publicité et entrée en vigueur</h2>
              <p className="text-muted-foreground">
                Le présent règlement intérieur est affiché dans les locaux du centre, remis à chaque stagiaire préalablement au démarrage de la formation et publié sur le site ecolet3p.fr. Il entre en vigueur le 16 avril 2026 et peut être modifié à tout moment, la version la plus récente faisant foi.
              </p>
            </div>

            <div className="mt-12 p-6 bg-muted/30 rounded-xl">
              <h2 className="text-lg font-bold text-forest mb-4">Pages connexes</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                <Link to="/mentions-legales" className="text-forest hover:text-gold font-semibold flex items-center gap-2">→ Mentions légales</Link>
                <Link to="/cgv" className="text-forest hover:text-gold font-semibold flex items-center gap-2">→ CGV</Link>
                <Link to="/politique-de-confidentialite" className="text-forest hover:text-gold font-semibold flex items-center gap-2">→ Politique de confidentialité</Link>
                <Link to="/nos-chiffres" className="text-forest hover:text-gold font-semibold flex items-center gap-2">→ Nos chiffres (Qualiopi)</Link>
                <Link to="/contact" className="text-forest hover:text-gold font-semibold flex items-center gap-2">→ Nous contacter</Link>
                <Link to="/formations" className="text-forest hover:text-gold font-semibold flex items-center gap-2">→ Nos formations</Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default ReglementInterieur;
