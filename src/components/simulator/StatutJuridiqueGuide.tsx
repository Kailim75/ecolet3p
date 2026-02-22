import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2, User, Briefcase, Building, CheckCircle2, XCircle,
  Lightbulb, TrendingUp, Euro, BarChart3, GraduationCap, ArrowRight
} from "lucide-react";
import type { SimulationInputs, SimulationResult } from "./SimulatorLevel1";

interface StatutJuridiqueGuideProps {
  inputs: SimulationInputs;
  results: SimulationResult;
}

interface StatutConfig {
  id: string;
  label: string;
  icon: typeof Building2;
  socialRate: number;
  tvaApplicable: boolean;
  irRate: number;
  extraCharges: number; // % fixed charges (comptable, CFE, etc.)
  advantages: string[];
  disadvantages: string[];
  recommendation: string;
  profileFit: string;
  color: string;
}

const statuts: StatutConfig[] = [
  {
    id: "micro",
    label: "Micro-entrepreneur",
    icon: User,
    socialRate: 0.212,
    tvaApplicable: false,
    irRate: 0, // Versement libératoire ~2.2% inclus dans social
    extraCharges: 0.02,
    advantages: [
      "Simplicité administrative maximale",
      "Pas de TVA sous 37 500€",
      "Cotisations proportionnelles au CA",
      "Comptabilité simplifiée",
    ],
    disadvantages: [
      "Plafond CA 77 700€/an",
      "Pas de déduction de charges réelles",
      "Protection sociale limitée",
      "Crédibilité moindre vs société",
    ],
    recommendation: "Idéal pour débuter ou tester l'activité avec un risque minimal.",
    profileFit: "Débutants & temps partiel",
    color: "bg-emerald-50 border-emerald-200 text-emerald-700",
  },
  {
    id: "sasu",
    label: "SASU",
    icon: Building2,
    socialRate: 0.45,
    tvaApplicable: true,
    irRate: 0.15, // IS 15% jusqu'à 42.5k
    extraCharges: 0.06,
    advantages: [
      "Régime assimilé salarié (meilleure couverture)",
      "Dividendes sans cotisations sociales",
      "Optimisation rémunération / dividendes",
      "Image professionnelle forte",
    ],
    disadvantages: [
      "Charges sociales élevées (~45%)",
      "Comptabilité obligatoire",
      "Coûts de gestion (expert-comptable)",
      "Complexité administrative",
    ],
    recommendation: "Optimal pour maximiser la protection sociale et optimiser fiscalement au-delà de 50k€ net/an.",
    profileFit: "CA > 50 000€ & protection sociale",
    color: "bg-blue-50 border-blue-200 text-blue-700",
  },
  {
    id: "eurl",
    label: "EURL",
    icon: Briefcase,
    socialRate: 0.40,
    tvaApplicable: true,
    irRate: 0.15,
    extraCharges: 0.05,
    advantages: [
      "Patrimoine personnel protégé",
      "Déduction des charges réelles",
      "Cotisations TNS plus avantageuses",
      "Choix IR ou IS possible",
    ],
    disadvantages: [
      "Comptabilité complète obligatoire",
      "Charges sociales sur rémunération (~40%)",
      "Formalités de création",
      "Moins flexible que la SASU",
    ],
    recommendation: "Meilleur compromis charges/protection pour un chauffeur à temps plein stabilisé.",
    profileFit: "Temps plein & optimisation charges",
    color: "bg-purple-50 border-purple-200 text-purple-700",
  },
  {
    id: "societe",
    label: "Société existante",
    icon: Building,
    socialRate: 0.42,
    tvaApplicable: true,
    irRate: 0.15,
    extraCharges: 0.08,
    advantages: [
      "Structure déjà en place",
      "Mutualisation des coûts",
      "Possibilité multi-activités",
      "Crédibilité maximale",
    ],
    disadvantages: [
      "Charges de structure plus élevées",
      "Gestion comptable complexe",
      "Responsabilités juridiques accrues",
      "Pas optimal si activité unique",
    ],
    recommendation: "Pertinent si vous avez déjà une structure et souhaitez ajouter l'activité transport.",
    profileFit: "Entrepreneurs multi-activités",
    color: "bg-amber-50 border-amber-200 text-amber-700",
  },
];

function calculateForStatut(inputs: SimulationInputs, results: SimulationResult, statut: StatutConfig) {
  const ca = results.monthlyRevenue;
  // Platform + fuel + insurance + vehicle from base calculation
  const operationalRate = inputs.profession === "vtc" ? 0.47 : inputs.profession === "taxi" ? 0.34 : 0.37;
  const operationalCharges = ca * (operationalRate - 0.22); // Remove base social, we'll use statut's

  const socialCharges = ca * statut.socialRate;
  const extraCharges = ca * statut.extraCharges;

  let netBeforeTax = ca - operationalCharges - socialCharges - extraCharges;
  
  // Simplified tax (for micro, versement libératoire is in socialRate)
  if (statut.id !== "micro") {
    netBeforeTax = netBeforeTax * (1 - statut.irRate);
  }

  return {
    monthlyNet: Math.round(netBeforeTax),
    annualNet: Math.round(netBeforeTax * 12),
    totalChargesRate: Math.round((1 - netBeforeTax / ca) * 100),
    formationAmortMonths: Math.max(1, Math.ceil(990 / (netBeforeTax * 0.15))), // 15% gain from formation
  };
}

export default function StatutJuridiqueGuide({ inputs, results }: StatutJuridiqueGuideProps) {
  const [selectedStatut, setSelectedStatut] = useState<string>("micro");
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const comparatif = useMemo(() => {
    return statuts.map((s) => ({
      ...s,
      calc: calculateForStatut(inputs, results, s),
    }));
  }, [inputs, results]);

  const selected = comparatif.find((s) => s.id === selectedStatut)!;
  const bestStatut = comparatif.reduce((best, s) => s.calc.monthlyNet > best.calc.monthlyNet ? s : best);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="bg-secondary rounded-xl p-5 border border-border">
        <div className="flex items-center gap-2 mb-2">
          <GraduationCap className="w-5 h-5 text-primary" />
          <h3 className="font-bold text-foreground">Guide stratégique : choix du statut juridique</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Comparez les statuts adaptés à votre profil. Les calculs s'ajustent automatiquement selon vos paramètres d'audit.
        </p>
      </div>

      {/* Statut cards */}
      <div className="grid grid-cols-2 gap-3">
        {comparatif.map((s) => (
          <motion.button
            key={s.id}
            onClick={() => {
              setSelectedStatut(s.id);
              setExpandedCard(expandedCard === s.id ? null : s.id);
            }}
            whileTap={{ scale: 0.97 }}
            className={`relative p-4 rounded-xl border-2 text-left transition-all ${
              selectedStatut === s.id
                ? "border-primary bg-secondary shadow-md"
                : "border-border bg-card hover:border-primary/30"
            }`}
          >
            {bestStatut.id === s.id && (
              <span className="absolute -top-2 -right-2 text-[10px] bg-accent text-accent-foreground px-2 py-0.5 rounded-full font-bold">
                Recommandé
              </span>
            )}
            <div className={`w-9 h-9 rounded-lg ${selectedStatut === s.id ? "bg-primary" : "bg-muted"} flex items-center justify-center mb-2 transition-colors`}>
              <s.icon className={`w-4 h-4 ${selectedStatut === s.id ? "text-primary-foreground" : "text-muted-foreground"}`} />
            </div>
            <p className={`text-sm font-bold ${selectedStatut === s.id ? "text-primary" : "text-foreground"}`}>
              {s.label}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.profileFit}</p>
            <p className={`text-lg font-bold mt-2 ${selectedStatut === s.id ? "text-primary" : "text-foreground"}`}>
              {s.calc.monthlyNet.toLocaleString("fr-FR")}€
              <span className="text-xs font-normal text-muted-foreground">/mois net</span>
            </p>
          </motion.button>
        ))}
      </div>

      {/* Detail panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selected.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="space-y-4"
        >
          {/* KPIs */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-xl border border-border bg-card text-center">
              <Euro className="w-4 h-4 text-primary mx-auto mb-1" />
              <p className="text-lg font-bold text-primary">{selected.calc.monthlyNet.toLocaleString("fr-FR")}€</p>
              <p className="text-[10px] text-muted-foreground leading-tight">Net mensuel</p>
            </div>
            <div className="p-3 rounded-xl border border-border bg-card text-center">
              <TrendingUp className="w-4 h-4 text-primary mx-auto mb-1" />
              <p className="text-lg font-bold text-primary">{selected.calc.annualNet.toLocaleString("fr-FR")}€</p>
              <p className="text-[10px] text-muted-foreground leading-tight">Net annuel</p>
            </div>
            <div className="p-3 rounded-xl border border-border bg-card text-center">
              <BarChart3 className="w-4 h-4 text-accent mx-auto mb-1" />
              <p className="text-lg font-bold text-accent">{selected.calc.totalChargesRate}%</p>
              <p className="text-[10px] text-muted-foreground leading-tight">Taux charges total</p>
            </div>
          </div>

          {/* Pros / Cons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-card rounded-xl border border-border p-4">
              <h4 className="text-sm font-bold text-primary mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Avantages
              </h4>
              <ul className="space-y-1.5">
                {selected.advantages.map((a, i) => (
                  <li key={i} className="text-xs text-foreground flex items-start gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-primary shrink-0 mt-0.5" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-card rounded-xl border border-border p-4">
              <h4 className="text-sm font-bold text-destructive mb-2 flex items-center gap-1.5">
                <XCircle className="w-4 h-4" /> Inconvénients
              </h4>
              <ul className="space-y-1.5">
                {selected.disadvantages.map((d, i) => (
                  <li key={i} className="text-xs text-foreground flex items-start gap-1.5">
                    <XCircle className="w-3 h-3 text-destructive shrink-0 mt-0.5" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Recommendation */}
          <div className="bg-primary/5 rounded-xl p-4 border border-primary/20">
            <div className="flex items-start gap-2">
              <Lightbulb className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-foreground mb-1">Recommandation ECOLE T3P</p>
                <p className="text-sm text-muted-foreground">{selected.recommendation}</p>
              </div>
            </div>
          </div>

          {/* Formation amortissement */}
          <div className="bg-accent/10 rounded-xl p-4 border border-accent/20">
            <div className="flex items-start gap-2">
              <GraduationCap className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-foreground mb-1">Amortissement formation 990€</p>
                <p className="text-sm text-muted-foreground">
                  Avec le statut <strong>{selected.label}</strong>, votre formation ECOLE T3P est amortie en{" "}
                  <strong className="text-primary">{selected.calc.formationAmortMonths} mois</strong> grâce au gain de revenus optimisés.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Comparatif table */}
      <div>
        <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-primary" /> Comparatif entre statuts
        </h4>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted">
                <th className="text-left p-3 font-semibold text-foreground">Statut</th>
                <th className="text-center p-3 font-semibold text-foreground">Net/mois</th>
                <th className="text-center p-3 font-semibold text-foreground">Net/an</th>
                <th className="text-center p-3 font-semibold text-foreground">Charges</th>
              </tr>
            </thead>
            <tbody>
              {comparatif.map((s, i) => (
                <tr
                  key={s.id}
                  className={`${s.id === selectedStatut ? "bg-secondary" : i % 2 === 0 ? "bg-card" : "bg-muted/30"} cursor-pointer transition-colors hover:bg-secondary/70`}
                  onClick={() => setSelectedStatut(s.id)}
                >
                  <td className="p-3 font-medium text-foreground flex items-center gap-2">
                    <s.icon className="w-4 h-4 text-primary" />
                    {s.label}
                    {bestStatut.id === s.id && (
                      <span className="text-[9px] bg-accent text-accent-foreground px-1.5 py-0.5 rounded-full font-bold">★</span>
                    )}
                  </td>
                  <td className={`p-3 text-center font-bold ${s.id === selectedStatut ? "text-primary" : "text-foreground"}`}>
                    {s.calc.monthlyNet.toLocaleString("fr-FR")}€
                  </td>
                  <td className={`p-3 text-center ${s.id === selectedStatut ? "text-primary" : "text-muted-foreground"}`}>
                    {s.calc.annualNet.toLocaleString("fr-FR")}€
                  </td>
                  <td className="p-3 text-center text-muted-foreground">{s.calc.totalChargesRate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Best recommendation */}
      <div className="bg-primary rounded-xl p-5 text-center">
        <p className="text-primary-foreground/80 text-sm mb-1">Recommandation stratégique pour votre profil</p>
        <p className="text-xl font-bold text-white mb-2">
          {bestStatut.label} — {bestStatut.calc.monthlyNet.toLocaleString("fr-FR")}€ net/mois
        </p>
        <p className="text-primary-foreground/70 text-xs">{bestStatut.recommendation}</p>
      </div>
    </motion.div>
  );
}
