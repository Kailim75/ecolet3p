import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Briefcase, ArrowRight, CheckCircle2, Clock, Euro, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import AlmaLogo from "@/components/logo/AlmaLogo";
import PreRegistrationForm from "@/components/formations/PreRegistrationForm";
import { useState } from "react";

const features = [
  "Choix du statut juridique (micro-entreprise, SASU, etc.)",
  "Obligations comptables et fiscales",
  "Élaboration d'un business plan simplifié",
  "Gestion de trésorerie au quotidien",
  "Assurances professionnelles obligatoires",
  "Démarches URSSAF et obligations sociales",
];

const FormationGestionEntreprise = () => {
  const [preRegOpen, setPreRegOpen] = useState(false);

  return (
    <Layout>
      <Helmet>
        <title>Formation Gestion & Création d'Entreprise | ECOLE T3P</title>
        <meta name="description" content="Formation gestion d'entreprise 21h (3 jours) à 390€. Lancez votre activité de chauffeur sur des bases solides. Paiement 4× sans frais." />
        <link rel="canonical" href="https://www.ecolet3p.fr/formations/gestion-entreprise" />
      </Helmet>

      <section className="relative py-20 md:py-28 overflow-hidden" style={{ background: 'linear-gradient(135deg, #1B4D3E 0%, #0F3028 100%)' }}>
        <div className="container-custom relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <span className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-1.5 rounded-full text-sm font-bold mb-4">
              <Briefcase className="w-4 h-4" /> Formation complémentaire
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-white mb-4">Gestion & Création d'Entreprise</h1>
            <p className="text-lg text-white/80 mb-6">Lancez votre activité de chauffeur sur des bases solides.</p>
            <div className="flex flex-wrap gap-3 mb-8">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white text-sm"><Clock className="w-4 h-4" /> 21 heures (3 jours)</div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white text-sm"><Euro className="w-4 h-4" /> 390€</div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="font-bold btn-cta-orange" onClick={() => setPreRegOpen(true)}>Je m'inscris <ArrowRight className="w-4 h-4 ml-2" /></Button>
              <Button asChild size="lg" variant="outline" className="font-bold border-white/30 text-white hover:bg-white/10"><a href="tel:0188750555"><Phone className="w-4 h-4 mr-2" /> 01 88 75 05 55</a></Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-black text-foreground mb-8">Programme de la formation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-start gap-3 p-4 bg-muted/30 rounded-xl">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <span className="text-sm">{f}</span>
              </motion.div>
            ))}
          </div>
          <div className="bg-card border-2 border-primary/20 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-bold mb-2">Tarif</h3>
            <p className="text-4xl font-black text-primary mb-2">390€</p>
            <div className="flex items-center justify-center gap-1.5 mb-6">
              <span className="text-sm font-semibold" style={{ color: "#FA5022" }}>ou 4× 97,50€/mois</span>
              <AlmaLogo className="h-4" />
            </div>
            <Button size="lg" className="font-bold btn-cta-orange" onClick={() => setPreRegOpen(true)}>Je m'inscris <ArrowRight className="w-4 h-4 ml-2" /></Button>
          </div>
        </div>
      </section>

      <PreRegistrationForm isOpen={preRegOpen} onClose={() => setPreRegOpen(false)} formationTitle="Formation Gestion & Création d'Entreprise" formationDuration="21 heures (3 jours)" />
    </Layout>
  );
};

export default FormationGestionEntreprise;
