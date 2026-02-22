import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileSearch, Users, Calculator, TrendingUp, Euro, Clock,
  Car, CarTaxiFront, Bike, BarChart3, ArrowRight, Lightbulb,
  Building2, Briefcase, User
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { supabase } from "@/integrations/supabase/client";
import RdvChoiceModal from "@/components/layout/RdvChoiceModal";

const BASE_COUNT = 2000;
const FORMATION_COUT = 990;

type Profession = "vtc" | "taxi" | "vmdtr";
type StatutJuridique = "micro" | "sasu" | "eurl" | "societe_existante";

const professions = [
  { id: "vtc" as Profession, label: "VTC", icon: Car },
  { id: "taxi" as Profession, label: "Taxi", icon: CarTaxiFront },
  { id: "vmdtr" as Profession, label: "VMDTR", icon: Bike },
];

const statuts: { id: StatutJuridique; label: string; icon: typeof User }[] = [
  { id: "micro", label: "Micro-entreprise", icon: User },
  { id: "sasu", label: "SASU", icon: Building2 },
  { id: "eurl", label: "EURL", icon: Briefcase },
  { id: "societe_existante", label: "Société existante", icon: Building2 },
];

const comparaisonMap: Record<StatutJuridique, StatutJuridique> = {
  micro: "sasu",
  sasu: "eurl",
  eurl: "sasu",
  societe_existante: "micro",
};

interface CalcResult {
  netMensuel: number;
  netAnnuel: number;
  caMensuel: number;
  commissionPlateforme: number;
  caApresCommission: number;
}

function calculateForStatut(
  caMensuel: number,
  commissionPct: number,
  chargesSocialesMicroPct: number,
  impotSocietePct: number,
  chargesFixes: number,
  statut: StatutJuridique
): CalcResult {
  const commissionPlateforme = caMensuel * (commissionPct / 100);
  const caApresCommission = caMensuel - commissionPlateforme;

  let netMensuel = 0;

  switch (statut) {
    case "micro": {
      const chargesSociales = caApresCommission * (chargesSocialesMicroPct / 100);
      netMensuel = caApresCommission - chargesSociales - chargesFixes;
      break;
    }
    case "sasu": {
      const beneficeAvantIS = caApresCommission - chargesFixes;
      const impotSociete = beneficeAvantIS * (impotSocietePct / 100);
      netMensuel = beneficeAvantIS - impotSociete;
      break;
    }
    case "eurl": {
      const beneficeAvantIS = caApresCommission - chargesFixes;
      const chargesSocialesEurl = beneficeAvantIS * 0.45;
      netMensuel = beneficeAvantIS - chargesSocialesEurl;
      break;
    }
    case "societe_existante": {
      netMensuel = caApresCommission - chargesFixes;
      break;
    }
  }

  netMensuel = Math.max(0, parseFloat(netMensuel.toFixed(2)));
  const netAnnuel = parseFloat((netMensuel * 12).toFixed(2));

  return { netMensuel, netAnnuel, caMensuel, commissionPlateforme, caApresCommission };
}

export default function AuditRentabiliteModule() {
  const [simCount, setSimCount] = useState<number | null>(null);
  const [profession, setProfession] = useState<Profession>("vtc");
  const [statutJuridique, setStatutJuridique] = useState<StatutJuridique>("micro");
  const [joursTravailles, setJoursTravailles] = useState(22);
  const [heuresParJour, setHeuresParJour] = useState(8);
  const [revenuHoraire, setRevenuHoraire] = useState(25);
  const [commissionPct, setCommissionPct] = useState(25);
  const [chargesSocialesMicroPct, setChargesSocialesMicroPct] = useState(22);
  const [impotSocietePct, setImpotSocietePct] = useState(15);
  const [chargesFixes, setChargesFixes] = useState(500);
  const [showResults, setShowResults] = useState(false);
  const [showComparatif, setShowComparatif] = useState(false);
  const [showAmortissement, setShowAmortissement] = useState(false);
  const [isRdvOpen, setIsRdvOpen] = useState(false);

  useEffect(() => {
    supabase.rpc("get_simulation_count").then(({ data }) => {
      if (data !== null) setSimCount(Number(data));
    });
  }, []);

  const caMensuel = joursTravailles * heuresParJour * revenuHoraire;

  const resultStatut1 = calculateForStatut(caMensuel, commissionPct, chargesSocialesMicroPct, impotSocietePct, chargesFixes, statutJuridique);
  const statutComparaison = comparaisonMap[statutJuridique];
  const resultStatut2 = calculateForStatut(caMensuel, commissionPct, chargesSocialesMicroPct, impotSocietePct, chargesFixes, statutComparaison);

  const differenceAnnuelle = parseFloat((resultStatut2.netAnnuel - resultStatut1.netAnnuel).toFixed(2));

  const moisAmortissement = resultStatut1.netMensuel > 0
    ? parseFloat((FORMATION_COUT / resultStatut1.netMensuel).toFixed(2))
    : 0;
  const joursAmortissement = resultStatut1.netMensuel > 0
    ? parseFloat(((FORMATION_COUT / resultStatut1.netMensuel) * 30).toFixed(2))
    : 0;

  const statutLabel = (id: StatutJuridique) => statuts.find(s => s.id === id)?.label ?? id;

  const handleCalculate = async () => {
    setShowResults(true);
    setShowComparatif(false);
    setShowAmortissement(false);

    // Animate sequence
    setTimeout(() => setShowComparatif(true), 1000);
    setTimeout(() => setShowAmortissement(true), 1800);

    // Save to CRM
    try {
      await supabase.from("simulations").insert({
        profession,
        hours_per_day: heuresParJour,
        days_per_week: Math.round(joursTravailles / 4.33),
        avg_fare: revenuHoraire,
        rides_per_hour: 1,
        monthly_revenue: caMensuel,
        monthly_charges: caMensuel - resultStatut1.netMensuel,
        monthly_net: resultStatut1.netMensuel,
        simulation_level: 1,
        source: "audit-homepage",
      });
    } catch {
      // Non-blocking
    }
  };

  return (
    <section className="section-padding bg-primary/5 border-y border-primary/10" id="audit-rentabilite">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold bg-primary/10 text-primary border border-primary/20 mb-4">
            <FileSearch className="w-4 h-4" /> Audit Rentabilité Gratuit
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Audit Rentabilité Chauffeur Professionnel
          </h2>
          {simCount !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-2 mb-4 text-sm text-muted-foreground"
            >
              <Users className="w-4 h-4 text-primary" />
              <span>
                <AnimatedCounter value={BASE_COUNT + simCount} /> audits réalisés
              </span>
            </motion.div>
          )}
          <p className="text-muted-foreground max-w-xl mx-auto">
            Simulez votre rentabilité selon votre statut juridique. Résultats instantanés, comparatif stratégique inclus.
          </p>
        </motion.div>

        <div className="max-w-xl mx-auto">
          <div className="card-t3p">
            {/* Profession selector */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-foreground mb-3">Votre métier</label>
              <div className="grid grid-cols-3 gap-3">
                {professions.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setProfession(p.id)}
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${
                      profession === p.id
                        ? "border-primary bg-secondary shadow-md"
                        : "border-border bg-card hover:border-primary/30"
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-lg ${profession === p.id ? "bg-primary" : "bg-muted"} flex items-center justify-center transition-colors`}>
                      <p.icon className={`w-5 h-5 ${profession === p.id ? "text-primary-foreground" : "text-muted-foreground"}`} />
                    </div>
                    <span className={`text-sm font-bold ${profession === p.id ? "text-primary" : "text-muted-foreground"}`}>{p.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Statut juridique */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-foreground mb-3">Statut juridique</label>
              <div className="grid grid-cols-2 gap-2">
                {statuts.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setStatutJuridique(s.id)}
                    className={`flex items-center gap-2 p-3 rounded-xl border-2 transition-all text-left ${
                      statutJuridique === s.id
                        ? "border-primary bg-secondary shadow-md"
                        : "border-border bg-card hover:border-primary/30"
                    }`}
                  >
                    <s.icon className={`w-4 h-4 shrink-0 ${statutJuridique === s.id ? "text-primary" : "text-muted-foreground"}`} />
                    <span className={`text-xs font-bold ${statutJuridique === s.id ? "text-primary" : "text-muted-foreground"}`}>{s.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sliders principaux */}
            <div className="space-y-5 mb-6">
              <SliderInput label="Jours travaillés / mois" value={joursTravailles} min={10} max={30} step={1} unit="j" icon={<Clock className="w-4 h-4" />} onChange={setJoursTravailles} />
              <SliderInput label="Heures par jour" value={heuresParJour} min={4} max={14} step={1} unit="h" icon={<Clock className="w-4 h-4" />} onChange={setHeuresParJour} />
              <SliderInput label="Revenu horaire moyen" value={revenuHoraire} min={10} max={60} step={1} unit="€" icon={<Euro className="w-4 h-4" />} onChange={setRevenuHoraire} />
            </div>

            {/* Paramètres avancés */}
            <details className="mb-6 group">
              <summary className="text-sm font-semibold text-primary cursor-pointer select-none flex items-center gap-2">
                <TrendingUp className="w-4 h-4" /> Paramètres avancés
              </summary>
              <div className="mt-4 space-y-5 pt-4 border-t border-border">
                <SliderInput label="Commission plateforme" value={commissionPct} min={0} max={35} step={1} unit="%" icon={<Euro className="w-4 h-4" />} onChange={setCommissionPct} />
                {statutJuridique === "micro" && (
                  <SliderInput label="Charges sociales micro" value={chargesSocialesMicroPct} min={10} max={30} step={1} unit="%" icon={<Euro className="w-4 h-4" />} onChange={setChargesSocialesMicroPct} />
                )}
                {(statutJuridique === "sasu") && (
                  <SliderInput label="Impôt société (IS)" value={impotSocietePct} min={10} max={25} step={1} unit="%" icon={<Euro className="w-4 h-4" />} onChange={setImpotSocietePct} />
                )}
                <SliderInput label="Charges fixes mensuelles" value={chargesFixes} min={0} max={2000} step={50} unit="€" icon={<Euro className="w-4 h-4" />} onChange={setChargesFixes} />
              </div>
            </details>

            {/* CA preview */}
            <div className="bg-secondary/60 rounded-xl p-4 mb-6 border border-border">
              <p className="text-xs text-muted-foreground mb-1">CA mensuel estimé</p>
              <p className="text-2xl font-bold text-primary">{caMensuel.toLocaleString("fr-FR")} €</p>
              {caMensuel < 1500 && (
                <p className="text-xs text-amber-600 mt-2 font-medium">
                  ⚠️ Un CA inférieur à 1 500€ rend l'activité difficilement rentable. Ajustez vos paramètres ou contactez-nous pour un audit personnalisé.
                </p>
              )}
            </div>

            {/* Calculate */}
            <button
              onClick={handleCalculate}
              className="btn-cta-orange w-full px-6 py-4 font-bold rounded-xl inline-flex items-center justify-center gap-2 text-lg"
            >
              <Calculator className="w-5 h-5" /> Lancer l'audit
            </button>

            {/* Results */}
            <AnimatePresence>
              {showResults && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mt-8 space-y-6"
                >
                  {/* Net mensuel */}
                  <div className="bg-secondary rounded-xl p-5 border border-primary/20">
                    <p className="text-xs text-muted-foreground mb-1">
                      Net mensuel estimé — {statutLabel(statutJuridique)}
                    </p>
                    <AnimatedValue value={resultStatut1.netMensuel} className="text-3xl font-bold text-primary" suffix=" €" />
                    <p className="text-sm text-muted-foreground mt-1">
                      soit <span className="font-semibold text-foreground">{resultStatut1.netAnnuel.toLocaleString("fr-FR")} €</span> / an
                    </p>
                  </div>

                  {resultStatut1.netMensuel <= 0 && (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
                      ⚠️ Votre simulation indique une rentabilité insuffisante. Un audit stratégique est recommandé.
                    </div>
                  )}

                  {/* Comparatif */}
                  <AnimatePresence>
                    {showComparatif && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-card rounded-xl border border-border p-5"
                      >
                        <div className="flex items-center gap-2 mb-4">
                          <BarChart3 className="w-5 h-5 text-primary" />
                          <h3 className="text-sm font-bold text-foreground">Comparatif stratégique</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="p-3 rounded-lg bg-secondary/50 border border-border">
                            <p className="text-xs text-muted-foreground mb-1">{statutLabel(statutJuridique)}</p>
                            <p className="text-lg font-bold text-foreground">{resultStatut1.netMensuel.toLocaleString("fr-FR")} €<span className="text-xs font-normal text-muted-foreground">/mois</span></p>
                          </div>
                          <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                            <p className="text-xs text-muted-foreground mb-1">{statutLabel(statutComparaison)}</p>
                            <p className="text-lg font-bold text-primary">{resultStatut2.netMensuel.toLocaleString("fr-FR")} €<span className="text-xs font-normal text-muted-foreground">/mois</span></p>
                          </div>
                        </div>
                        <div className={`p-3 rounded-lg border text-center ${differenceAnnuelle > 0 ? "bg-primary/5 border-primary/20" : differenceAnnuelle < 0 ? "bg-amber-50 border-amber-200" : "bg-secondary border-border"}`}>
                          <p className="text-xs text-muted-foreground mb-1">Différence annuelle</p>
                          <p className={`text-xl font-bold ${differenceAnnuelle > 0 ? "text-primary" : differenceAnnuelle < 0 ? "text-amber-600" : "text-foreground"}`}>
                            {differenceAnnuelle > 0 ? "+" : ""}{differenceAnnuelle.toLocaleString("fr-FR")} €
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {differenceAnnuelle > 500
                              ? `Le statut ${statutLabel(statutComparaison)} pourrait vous faire gagner ${differenceAnnuelle.toLocaleString("fr-FR")}€/an.`
                              : differenceAnnuelle < -500
                                ? `Votre statut actuel (${statutLabel(statutJuridique)}) semble plus avantageux.`
                                : "Les deux statuts sont proches dans votre configuration."}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Amortissement */}
                  <AnimatePresence>
                    {showAmortissement && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-4"
                      >
                        <div className="bg-accent/10 rounded-xl border border-accent/20 p-5">
                          <div className="flex items-center gap-2 mb-3">
                            <Lightbulb className="w-5 h-5 text-accent" />
                            <h3 className="text-sm font-bold text-foreground">Amortissement Formation 990€</h3>
                          </div>
                          {resultStatut1.netMensuel > 0 ? (
                            <>
                              <p className="text-2xl font-bold text-accent mb-1">
                                {joursAmortissement < 31
                                  ? `${Math.round(joursAmortissement)} jours`
                                  : `${moisAmortissement.toFixed(1)} mois`}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Formation à 990€ rentabilisée en <strong className="text-foreground">{Math.round(joursAmortissement)} jours</strong> selon votre simulation.
                              </p>
                            </>
                          ) : (
                            <p className="text-sm text-muted-foreground">
                              Ajustez vos paramètres pour estimer l'amortissement de la formation.
                            </p>
                          )}
                        </div>

                        {/* CTA */}
                        <div className="bg-primary rounded-xl p-6 text-center">
                          <h3 className="text-lg font-bold text-primary-foreground mb-2">
                            Prêt à concrétiser ces revenus ?
                          </h3>
                          <p className="text-primary-foreground/80 text-sm mb-4">
                            Nos conseillers analysent votre situation et vous accompagnent jusqu'à l'examen.
                          </p>
                          <button
                            onClick={() => setIsRdvOpen(true)}
                            className="btn-cta-orange px-8 py-3.5 font-bold rounded-lg inline-flex items-center gap-2"
                          >
                            Prendre rendez-vous <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <RdvChoiceModal isOpen={isRdvOpen} onClose={() => setIsRdvOpen(false)} />
      </div>
    </section>
  );
}

/* ── Sous-composants ── */

function SliderInput({ label, value, min, max, step, unit, icon, onChange }: {
  label: string; value: number; min: number; max: number; step: number;
  unit: string; icon: React.ReactNode; onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-foreground flex items-center gap-2">
          {icon} {label}
        </label>
        <span className="text-lg font-bold text-primary">{value}{unit}</span>
      </div>
      <Slider value={[value]} min={min} max={max} step={step} onValueChange={(v) => onChange(v[0])} className="w-full" />
      <div className="flex justify-between text-xs text-muted-foreground mt-1">
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  );
}

function AnimatedCounter({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const duration = 1200;
    const start = Date.now();
    const animate = () => {
      const progress = Math.min((Date.now() - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(value * eased));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [value]);
  return <span className="font-bold text-primary">{display.toLocaleString("fr-FR")}+</span>;
}

function AnimatedValue({ value, className, suffix }: { value: number; className: string; suffix: string }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const duration = 800;
    const start = Date.now();
    const animate = () => {
      const progress = Math.min((Date.now() - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(value * eased));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [value]);
  return <p className={className}>{display.toLocaleString("fr-FR")}{suffix}</p>;
}
