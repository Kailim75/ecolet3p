import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const PrivacyPolicy = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-cream py-16 md:py-20">
        <div className="container-custom text-center">
          <motion.h1 
            className="section-title mb-4"
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
          >
            POLITIQUE DE CONFIDENTIALITÉ
          </motion.h1>
          <motion.p 
            className="section-subtitle mx-auto"
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
          >
            Comment nous protégeons vos données personnelles
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
                ECOLE T3P, dont le siège social est situé au 3 rue Corneille, 92120 Montrouge, est responsable du traitement de vos données personnelles collectées sur ce site.
              </p>
              <p className="text-muted-foreground mt-2">
                <strong>Contact :</strong> montrouge@ecolet3p.fr<br />
                <strong>Téléphone :</strong> 01 88 75 05 55
              </p>
            </div>

            <div className="card-livementor mb-8">
              <h2 className="text-xl font-bold text-forest mb-4">2. Données collectées</h2>
              <p className="text-muted-foreground mb-4">
                Nous collectons les données suivantes :
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>Données d'identification :</strong> nom, prénom, civilité</li>
                <li><strong>Données de contact :</strong> email, numéro de téléphone</li>
                <li><strong>Données relatives à votre demande :</strong> formation souhaitée, message</li>
                <li><strong>Données de navigation :</strong> cookies techniques et analytiques</li>
              </ul>
            </div>

            <div className="card-livementor mb-8">
              <h2 className="text-xl font-bold text-forest mb-4">3. Finalités du traitement</h2>
              <p className="text-muted-foreground mb-4">
                Vos données sont collectées pour les finalités suivantes :
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Traitement de vos demandes d'information et de pré-inscription</li>
                <li>Envoi de réponses à vos questions</li>
                <li>Amélioration de nos services et de notre site</li>
                <li>Respect de nos obligations légales</li>
              </ul>
            </div>

            <div className="card-livementor mb-8">
              <h2 className="text-xl font-bold text-forest mb-4">4. Base légale du traitement</h2>
              <p className="text-muted-foreground">
                Le traitement de vos données est fondé sur :
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-2">
                <li><strong>Votre consentement</strong> lors de la soumission des formulaires</li>
                <li><strong>L'exécution d'un contrat</strong> ou de mesures précontractuelles</li>
                <li><strong>Notre intérêt légitime</strong> à améliorer nos services</li>
              </ul>
            </div>

            <div className="card-livementor mb-8">
              <h2 className="text-xl font-bold text-forest mb-4">5. Destinataires des données</h2>
              <p className="text-muted-foreground">
                Vos données sont destinées uniquement à ECOLE T3P et ne sont jamais vendues à des tiers. Elles peuvent être transmises à nos sous-traitants techniques (hébergement, envoi d'emails) dans le cadre strict de leurs missions, dans le respect du RGPD.
              </p>
            </div>

            <div className="card-livementor mb-8">
              <h2 className="text-xl font-bold text-forest mb-4">6. Durée de conservation</h2>
              <p className="text-muted-foreground">
                Vos données sont conservées pendant une durée de 3 ans à compter de votre dernière interaction avec nous, sauf obligation légale de conservation plus longue. Les données relatives aux pré-inscriptions sont conservées pendant 5 ans.
              </p>
            </div>

            <div className="card-livementor mb-8">
              <h2 className="text-xl font-bold text-forest mb-4">7. Vos droits</h2>
              <p className="text-muted-foreground mb-4">
                Conformément au RGPD, vous disposez des droits suivants :
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>Droit d'accès :</strong> obtenir une copie de vos données</li>
                <li><strong>Droit de rectification :</strong> corriger vos données</li>
                <li><strong>Droit à l'effacement :</strong> demander la suppression de vos données</li>
                <li><strong>Droit à la limitation :</strong> limiter le traitement de vos données</li>
                <li><strong>Droit à la portabilité :</strong> recevoir vos données dans un format structuré</li>
                <li><strong>Droit d'opposition :</strong> vous opposer au traitement de vos données</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                Pour exercer ces droits, contactez-nous à : <a href="mailto:montrouge@ecolet3p.fr" className="text-forest hover:text-gold font-semibold">montrouge@ecolet3p.fr</a>
              </p>
            </div>

            <div className="card-livementor mb-8">
              <h2 className="text-xl font-bold text-forest mb-4">8. Cookies</h2>
              <p className="text-muted-foreground mb-4">
                Ce site utilise des cookies pour :
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>Cookies essentiels :</strong> nécessaires au fonctionnement du site</li>
                <li><strong>Cookies de préférences :</strong> mémoriser vos choix (consentement cookies)</li>
                <li><strong>Cookies analytiques :</strong> mesurer l'audience du site (si activés)</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                Vous pouvez gérer vos préférences de cookies à tout moment via le bandeau de cookies.
              </p>
            </div>

            <div className="card-livementor mb-8">
              <h2 className="text-xl font-bold text-forest mb-4">9. Sécurité</h2>
              <p className="text-muted-foreground">
                Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, modification, divulgation ou destruction. Notre site utilise le protocole HTTPS pour sécuriser les échanges de données.
              </p>
            </div>

            <div className="card-livementor mb-8">
              <h2 className="text-xl font-bold text-forest mb-4">10. Réclamation</h2>
              <p className="text-muted-foreground">
                Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de la CNIL (Commission Nationale de l'Informatique et des Libertés) : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-forest hover:text-gold font-semibold">www.cnil.fr</a>
              </p>
            </div>

            <div className="card-livementor">
              <h2 className="text-xl font-bold text-forest mb-4">11. Mise à jour</h2>
              <p className="text-muted-foreground">
                Cette politique de confidentialité peut être mise à jour à tout moment. La date de dernière mise à jour est indiquée ci-dessous.
              </p>
              <p className="text-muted-foreground mt-4">
                <strong>Dernière mise à jour :</strong> {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>

            <div className="mt-8 text-center">
              <Link to="/mentions-legales" className="text-forest hover:text-gold font-semibold">
                ← Retour aux Mentions Légales
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default PrivacyPolicy;
