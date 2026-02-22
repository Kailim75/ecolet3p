import { useState, useRef, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home, ChevronRight, TrendingUp, Star, Users,
  Phone, ArrowRight, Shield, Award, Clock, FileSearch
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import SimulatorLevel1 from "@/components/simulator/SimulatorLevel1";
import SimulatorLevel2 from "@/components/simulator/SimulatorLevel2";
import LeadCaptureForm from "@/components/simulator/LeadCaptureForm";
import type { SimulationInputs, SimulationResult } from "@/components/simulator/SimulatorLevel1";
import { supabase } from "@/integrations/supabase/client";

const BASE_COUNT = 2000;

const AuditRentabilite = () => {
  const [step, setStep] = useState<"level1" | "capture" | "level2">("level1");
  const [inputs, setInputs] = useState<SimulationInputs | null>(null);
  const [results, setResults] = useState<SimulationResult | null>(null);
  const [simCount, setSimCount] = useState<number | null>(null);
  const level2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    supabase.rpc("get_simulation_count").then(({ data }) => {
      if (data !== null) setSimCount(Number(data));
    });
  }, []);

  const handleResultsReady = async (inp: SimulationInputs, res: SimulationResult) => {
    setInputs(inp);
    setResults(res);
    try {
      await supabase.from("simulations").insert({
        profession: inp.profession,
        hours_per_day: inp.hoursPerDay,
        days_per_week: inp.daysPerWeek,
        avg_fare: inp.avgFare,
        rides_per_hour: inp.ridesPerHour,
        monthly_revenue: res.monthlyRevenue,
        monthly_charges: res.monthlyCharges,
        monthly_net: res.monthlyNet,
        simulation_level: 1,
      });
    } catch {
      // Non-blocking
    }
  };

  const handleUnlockLevel2 = (inp: SimulationInputs) => {
    setInputs(inp);
    setStep("capture");
    setTimeout(() => level2Ref.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const handleLeadSuccess = () => {
    setStep("level2");
    setTimeout(() => level2Ref.current?.scrollIntoView({ behavior: "smooth" }), 200);
  };

  const auditSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Audit Rentabilité Chauffeur Professionnel – ECOLE T3P",
    description: "Audit stratégique gratuit pour évaluer votre rentabilité en tant que chauffeur VTC, Taxi ou VMDTR. Projection 12 mois et plan d'action personnalisé.",
    provider: { "@type": "EducationalOrganization", name: "ECOLE T3P", url: "https://www.ecolet3p.fr" },
    applicationCategory: "FinanceApplication",
    offers: { "@type": "Offer", price: 0, priceCurrency: "EUR" },
  };

  return (
    <Layout>
      <Helmet>
        <title>Audit Rentabilité Chauffeur VTC Taxi VMDTR | ECOLE T3P</title>
        <meta name="description" content="Audit stratégique gratuit : évaluez votre rentabilité en VTC, Taxi ou VMDTR. Pré-audit instantané + rapport détaillé 12 mois avec plan d'action personnalisé par ECOLE T3P." />
        <link rel="canonical" href="https://www.ecolet3p.fr/audit-rentabilite" />
        <meta property="og:title" content="Audit Rentabilité Chauffeur Professionnel | ECOLE T3P" />
        <meta property="og:description" content="Évaluez votre rentabilité chauffeur VTC, Taxi ou VMDTR. Rapport stratégique 12 mois gratuit." />
        <meta property="og:url" content="https://www.ecolet3p.fr/audit-rentabilite" />
        <script type="application/ld+json">{JSON.stringify(auditSchema)}</script>
      </Helmet>

      {/* Breadcrumb */}
      <div className="bg-muted py-3 border-b border-border mt-16">
        <div className="container-custom">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
              <Home className="w-4 h-4" /> Accueil
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground font-medium">Audit Rentabilité</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="py-14 lg:py-20 bg-primary">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold bg-white/15 text-white border border-white/20 mb-6">
              <FileSearch className="w-4 h-4" /> Audit stratégique gratuit
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-[24px] md:text-[34px] lg:text-[44px] font-bold text-white leading-tight mb-4">
              Audit Rentabilité<br />
              <span className="text-accent">Chauffeur Professionnel</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-white/80 text-base md:text-lg max-w-2xl mx-auto">
              Évaluez votre potentiel de revenus en 30 secondes. Pré-audit instantané — puis débloquez votre <strong className="text-white">rapport stratégique 12 mois</strong> personnalisé.
            </motion.p>
            {simCount !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm"
              >
                <Users className="w-4 h-4" />
                <span className="font-bold text-accent">{(BASE_COUNT + simCount).toLocaleString("fr-FR")}+</span> audits réalisés
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Reassurance */}
      <section className="bg-muted py-4 border-b border-border">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Users, value: "+2 000", label: "chauffeurs formés" },
              { icon: Star, value: "5.0/5", label: "359 avis Google" },
              { icon: Award, value: "94%", label: "taux de réussite" },
              { icon: Clock, value: "30 sec", label: "pré-audit gratuit" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                  <s.icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <span className="stat-number text-base leading-tight">{s.value}</span>
                  <span className="block text-xs text-muted-foreground">{s.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audit */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="max-w-xl mx-auto">
            {/* Level 1 */}
            <div className="card-t3p">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">1</div>
                <h2 className="text-lg font-bold text-foreground">Pré-audit express</h2>
                <span className="text-xs bg-secondary text-primary px-2 py-0.5 rounded-full font-semibold ml-auto">Gratuit</span>
              </div>
              <SimulatorLevel1
                onUnlockLevel2={handleUnlockLevel2}
                onResultsReady={handleResultsReady}
              />
            </div>

            {/* Level 2 gate / form */}
            <div ref={level2Ref} className="mt-8">
              {step === "capture" && inputs && results && (
                <div className="card-t3p border-2 border-primary/20">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">2</div>
                    <h2 className="text-lg font-bold text-foreground">Audit stratégique complet</h2>
                    <span className="text-xs bg-accent/20 text-accent px-2 py-0.5 rounded-full font-semibold ml-auto">Premium</span>
                  </div>
                  <LeadCaptureForm
                    inputs={inputs}
                    results={results}
                    onSuccess={handleLeadSuccess}
                  />
                </div>
              )}

              {step === "level2" && inputs && results && (
                <div className="card-t3p border-2 border-primary/20">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">2</div>
                    <h2 className="text-lg font-bold text-foreground">Rapport stratégique</h2>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold ml-auto flex items-center gap-1">
                      <Shield className="w-3 h-3" /> Débloqué
                    </span>
                  </div>
                  <SimulatorLevel2 inputs={inputs} basicResults={results} />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-primary">
        <div className="container-custom text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Prêt à concrétiser ces revenus ?
            </h2>
            <p className="text-white/80 mb-4 max-w-2xl mx-auto">
              Rejoignez les +2 000 chauffeurs formés par ECOLE T3P. Formation tout compris dès 990€.
            </p>
            <p className="text-accent font-semibold mb-8">
              94% de taux de réussite • Paiement en 4× sans frais
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/formations" className="btn-cta-orange px-10 py-4 text-lg font-bold rounded-lg inline-flex items-center gap-2">
                Voir nos formations <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="tel:0188750555" className="text-white/80 hover:text-white font-semibold inline-flex items-center gap-2 text-lg">
                <Phone className="w-5 h-5" /> 01 88 75 05 55
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default AuditRentabilite;
