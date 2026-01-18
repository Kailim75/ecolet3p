import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const LegalMentions = () => {
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
            MENTIONS LÉGALES
          </motion.h1>
          <motion.p 
            className="section-subtitle mx-auto"
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
          >
            Informations légales concernant le site T3P Campus
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
              <h2 className="text-xl font-bold text-forest mb-4">1. Éditeur du site</h2>
              <p className="text-muted-foreground mb-2">
                <strong>Raison sociale :</strong> T3P Campus<br />
                <strong>Forme juridique :</strong> EURL<br />
                <strong>Capital social :</strong> 2 000 €<br />
                <strong>Siège social :</strong> 3 rue Corneille, 92120 Montrouge<br />
                <strong>SIRET :</strong> 948 564 802 00023<br />
                <strong>Téléphone :</strong> 01 88 75 05 55<br />
                <strong>Email :</strong> dropacademymontrouge@gmail.com
              </p>
              <p className="text-muted-foreground">
                <strong>Directeur de la publication :</strong> Karim KATI
              </p>
            </div>

            <div className="card-livementor mb-8">
              <h2 className="text-xl font-bold text-forest mb-4">2. Hébergeur</h2>
              <p className="text-muted-foreground">
                Ce site est hébergé par :<br />
                <strong>Lovable</strong><br />
                Site web : <a href="https://lovable.dev" target="_blank" rel="noopener noreferrer" className="text-forest hover:text-gold">https://lovable.dev</a>
              </p>
            </div>

            <div className="card-livementor mb-8">
              <h2 className="text-xl font-bold text-forest mb-4">3. Propriété intellectuelle</h2>
              <p className="text-muted-foreground mb-4">
                L'ensemble du contenu de ce site (textes, images, logos, icônes, sons, logiciels, etc.) est la propriété exclusive de T3P Campus ou de ses partenaires et est protégé par les lois françaises et internationales relatives à la propriété intellectuelle.
              </p>
              <p className="text-muted-foreground">
                Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sans autorisation écrite préalable de T3P Campus.
              </p>
            </div>

            <div className="card-livementor mb-8">
              <h2 className="text-xl font-bold text-forest mb-4">4. Données personnelles</h2>
              <p className="text-muted-foreground mb-4">
                Les informations collectées via les formulaires de ce site sont destinées à T3P Campus pour le traitement de vos demandes. Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification et de suppression de vos données.
              </p>
              <p className="text-muted-foreground">
                Pour plus d'informations, consultez notre <Link to="/politique-de-confidentialite" className="text-forest hover:text-gold font-semibold">Politique de Confidentialité</Link>.
              </p>
            </div>

            <div className="card-livementor mb-8">
              <h2 className="text-xl font-bold text-forest mb-4">5. Cookies</h2>
              <p className="text-muted-foreground">
                Ce site utilise des cookies pour améliorer votre expérience de navigation. En continuant à naviguer sur ce site, vous acceptez notre utilisation des cookies. Vous pouvez à tout moment modifier vos préférences via le bandeau de cookies ou les paramètres de votre navigateur.
              </p>
            </div>

            <div className="card-livementor mb-8">
              <h2 className="text-xl font-bold text-forest mb-4">6. Responsabilité</h2>
              <p className="text-muted-foreground mb-4">
                T3P Campus s'efforce d'assurer l'exactitude des informations diffusées sur ce site. Toutefois, T3P Campus ne peut garantir l'exactitude, la complétude ou l'actualité des informations publiées.
              </p>
              <p className="text-muted-foreground">
                T3P Campus ne saurait être tenu responsable des dommages directs ou indirects résultant de l'accès ou de l'utilisation du site.
              </p>
            </div>

            <div className="card-livementor mb-8">
              <h2 className="text-xl font-bold text-forest mb-4">7. Liens hypertextes</h2>
              <p className="text-muted-foreground">
                Ce site peut contenir des liens vers d'autres sites web. T3P Campus n'exerce aucun contrôle sur le contenu de ces sites et décline toute responsabilité quant à leur contenu.
              </p>
            </div>

            <div className="card-livementor">
              <h2 className="text-xl font-bold text-forest mb-4">8. Droit applicable</h2>
              <p className="text-muted-foreground">
                Les présentes mentions légales sont régies par le droit français. En cas de litige, les tribunaux français seront seuls compétents.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default LegalMentions;
