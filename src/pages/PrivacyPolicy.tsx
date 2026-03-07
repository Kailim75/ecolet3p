import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
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
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const PrivacyPolicy = () => {
  return (
    <Layout>
      <Helmet>
        <title>Politique de Confidentialité | ECOLE T3P</title>
        <meta name="description" content="Politique de confidentialité et protection des données personnelles du site ecolet3p.fr. ECOLE T3P, centre de formation Taxi VTC à Montrouge." />
        <link rel="canonical" href="https://ecolet3p.fr/politique-de-confidentialite" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://ecolet3p.fr/" },
            { "@type": "ListItem", "position": 2, "name": "Politique de confidentialité", "item": "https://ecolet3p.fr/politique-de-confidentialite" }
          ]
        })}</script>
      </Helmet>

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
                <BreadcrumbPage>Politique de confidentialité</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-cream py-16 md:py-20">
        <div className="container-custom text-center">
          <motion.h1 
            className="text-3xl md:text-4xl font-black text-forest uppercase tracking-tight mb-4"
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
          >
            Politique de Confidentialité
          </motion.h1>
          <motion.p 
            className="section-subtitle mx-auto"
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
          >
            Comment ECOLE T3P protège vos données personnelles conformément au RGPD
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
              <h2 className="text-xl font-bold text-forest mb-4">1. Responsable du traitement</h2>
              <p className="text-muted-foreground">
                ECOLE T3P, centre de formation professionnelle spécialisé dans les métiers du transport de personnes 
                (Taxi, VTC, VMDTR), est responsable du traitement de vos données personnelles collectées sur le site 
                ecolet3p.fr. Notre centre est situé au 3 rue Corneille, 92120 Montrouge, dans les Hauts-de-Seine. 
                Nous sommes agréés par la Préfecture des Hauts-de-Seine pour la délivrance de formations menant à 
                l'obtention de la carte professionnelle de conducteur de transport public particulier de personnes.
              </p>
              <p className="text-muted-foreground mt-2">
                <strong>Contact du responsable :</strong> montrouge@ecolet3p.fr<br />
                <strong>Téléphone :</strong> 01 88 75 05 55<br />
                <strong>Adresse postale :</strong> ECOLE T3P, 3 rue Corneille, 92120 Montrouge
              </p>
            </div>

            <div className="card-livementor mb-8">
              <h2 className="text-xl font-bold text-forest mb-4">2. Données collectées</h2>
              <p className="text-muted-foreground mb-4">
                Dans le cadre de nos activités de formation professionnelle et de gestion de notre site internet, 
                nous collectons les catégories de données suivantes :
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>Données d'identification :</strong> nom, prénom, civilité</li>
                <li><strong>Données de contact :</strong> adresse email, numéro de téléphone</li>
                <li><strong>Données relatives à votre projet professionnel :</strong> formation souhaitée (Taxi, VTC, VMDTR), message, statut professionnel</li>
                <li><strong>Données de pré-inscription :</strong> informations nécessaires à la constitution de votre dossier de formation</li>
                <li><strong>Données de navigation :</strong> cookies techniques, cookies de préférences, cookies analytiques (si consentement)</li>
                <li><strong>Données de rendez-vous :</strong> dates et horaires choisis, notes éventuelles</li>
              </ul>
            </div>

            <div className="card-livementor mb-8">
              <h2 className="text-xl font-bold text-forest mb-4">3. Finalités du traitement</h2>
              <p className="text-muted-foreground mb-4">
                Vos données personnelles sont collectées et traitées pour les finalités suivantes :
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Traitement de vos demandes d'information sur nos formations Taxi, VTC et VMDTR</li>
                <li>Gestion des pré-inscriptions et constitution des dossiers de formation</li>
                <li>Prise de rendez-vous et suivi de vos demandes de contact</li>
                <li>Envoi de la newsletter si vous y êtes inscrit (avec possibilité de désinscription à tout moment)</li>
                <li>Amélioration continue de nos services pédagogiques et de notre site internet</li>
                <li>Respect de nos obligations légales en tant qu'organisme de formation agréé</li>
              </ul>
            </div>

            <div className="card-livementor mb-8">
              <h2 className="text-xl font-bold text-forest mb-4">4. Base légale du traitement</h2>
              <p className="text-muted-foreground">
                Le traitement de vos données est fondé sur les bases légales suivantes :
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-2">
                <li><strong>Votre consentement</strong> lors de la soumission des formulaires de contact, de pré-inscription ou d'inscription à la newsletter</li>
                <li><strong>L'exécution d'un contrat</strong> ou de mesures précontractuelles dans le cadre de votre inscription à une formation</li>
                <li><strong>Notre intérêt légitime</strong> à améliorer nos services de formation et à assurer le bon fonctionnement de notre site</li>
                <li><strong>Le respect d'obligations légales</strong> auxquelles nous sommes soumis en tant qu'organisme de formation déclaré</li>
              </ul>
            </div>

            <div className="card-livementor mb-8">
              <h2 className="text-xl font-bold text-forest mb-4">5. Destinataires des données</h2>
              <p className="text-muted-foreground">
                Vos données personnelles sont destinées exclusivement à l'équipe pédagogique et administrative d'ECOLE T3P. 
                Elles ne sont jamais vendues, louées ou cédées à des tiers à des fins commerciales. Elles peuvent être 
                transmises, dans le cadre strict de leurs missions et dans le respect du RGPD, à nos sous-traitants 
                techniques : hébergement du site, envoi d'emails transactionnels, et outils de gestion de la relation client.
              </p>
            </div>

            <div className="card-livementor mb-8">
              <h2 className="text-xl font-bold text-forest mb-4">6. Durée de conservation</h2>
              <p className="text-muted-foreground">
                Vos données sont conservées pendant une durée de 3 ans à compter de votre dernière interaction avec ECOLE T3P, 
                sauf obligation légale de conservation plus longue. Les données relatives aux pré-inscriptions et aux dossiers 
                de formation sont conservées pendant 5 ans conformément aux obligations des organismes de formation. Les données 
                de la newsletter sont conservées jusqu'à votre désinscription.
              </p>
            </div>

            <div className="card-livementor mb-8">
              <h2 className="text-xl font-bold text-forest mb-4">7. Vos droits</h2>
              <p className="text-muted-foreground mb-4">
                Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, 
                vous disposez des droits suivants sur vos données personnelles :
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>Droit d'accès :</strong> obtenir une copie de l'ensemble des données que nous détenons sur vous</li>
                <li><strong>Droit de rectification :</strong> corriger des données inexactes ou incomplètes</li>
                <li><strong>Droit à l'effacement :</strong> demander la suppression de vos données dans les conditions prévues par le RGPD</li>
                <li><strong>Droit à la limitation :</strong> limiter temporairement le traitement de vos données</li>
                <li><strong>Droit à la portabilité :</strong> recevoir vos données dans un format structuré, couramment utilisé et lisible par machine</li>
                <li><strong>Droit d'opposition :</strong> vous opposer au traitement de vos données pour des motifs légitimes</li>
                <li><strong>Droit de retirer votre consentement :</strong> retirer à tout moment un consentement préalablement donné</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                Pour exercer l'un de ces droits, adressez votre demande par email à : <a href="mailto:montrouge@ecolet3p.fr" className="text-forest hover:text-gold font-semibold">montrouge@ecolet3p.fr</a> 
                ou par courrier à : ECOLE T3P, 3 rue Corneille, 92120 Montrouge. Nous nous engageons à répondre à votre demande dans un délai d'un mois.
              </p>
            </div>

            <div className="card-livementor mb-8">
              <h2 className="text-xl font-bold text-forest mb-4">8. Cookies</h2>
              <p className="text-muted-foreground mb-4">
                Le site ecolet3p.fr utilise des cookies pour assurer son bon fonctionnement et améliorer votre expérience :
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>Cookies essentiels :</strong> nécessaires au fonctionnement technique du site (navigation, sécurité)</li>
                <li><strong>Cookies de préférences :</strong> mémorisation de vos choix (consentement cookies, langue)</li>
                <li><strong>Cookies analytiques :</strong> mesure d'audience anonymisée du site (si vous les avez acceptés)</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                Vous pouvez gérer vos préférences de cookies à tout moment via le bandeau de consentement accessible en bas de page. 
                Vous pouvez également configurer votre navigateur pour refuser les cookies.
              </p>
            </div>

            <div className="card-livementor mb-8">
              <h2 className="text-xl font-bold text-forest mb-4">9. Sécurité des données</h2>
              <p className="text-muted-foreground">
                ECOLE T3P met en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles 
                contre tout accès non autorisé, modification, divulgation ou destruction. Notre site utilise le protocole HTTPS 
                (certificat SSL) pour chiffrer toutes les communications entre votre navigateur et nos serveurs. Les données 
                sont hébergées sur des serveurs sécurisés et l'accès est strictement limité aux personnes habilitées.
              </p>
            </div>

            <div className="card-livementor mb-8">
              <h2 className="text-xl font-bold text-forest mb-4">10. Réclamation auprès de la CNIL</h2>
              <p className="text-muted-foreground">
                Si vous estimez que le traitement de vos données personnelles ne respecte pas vos droits, vous avez la possibilité 
                d'introduire une réclamation auprès de la Commission Nationale de l'Informatique et des Libertés (CNIL), 
                autorité de contrôle française compétente en matière de protection des données : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-forest hover:text-gold font-semibold">www.cnil.fr</a>
              </p>
            </div>

            <div className="card-livementor">
              <h2 className="text-xl font-bold text-forest mb-4">11. Mise à jour de cette politique</h2>
              <p className="text-muted-foreground">
                Cette politique de confidentialité peut être mise à jour pour refléter les évolutions de nos pratiques ou 
                les modifications de la réglementation applicable. Nous vous invitons à la consulter régulièrement.
              </p>
              <p className="text-muted-foreground mt-4">
                <strong>Dernière mise à jour :</strong> {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>

            {/* Liens internes */}
            <div className="mt-12 p-6 bg-muted/30 rounded-xl">
              <h2 className="text-lg font-bold text-forest mb-4">Pages connexes</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                <Link to="/mentions-legales" className="text-forest hover:text-gold font-semibold flex items-center gap-2">
                  → Mentions légales
                </Link>
                <Link to="/contact" className="text-forest hover:text-gold font-semibold flex items-center gap-2">
                  → Nous contacter
                </Link>
                <Link to="/" className="text-forest hover:text-gold font-semibold flex items-center gap-2">
                  → Accueil ECOLE T3P
                </Link>
                <Link to="/formations" className="text-forest hover:text-gold font-semibold flex items-center gap-2">
                  → Nos formations
                </Link>
                <Link to="/blog" className="text-forest hover:text-gold font-semibold flex items-center gap-2">
                  → Blog et actualités
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default PrivacyPolicy;
