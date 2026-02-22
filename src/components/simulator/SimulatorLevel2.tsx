import { useMemo } from "react";
import { motion } from "framer-motion";
import { TrendingUp, ArrowRight, CheckCircle2, BarChart3, Target, Sparkles } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import type { SimulationInputs, SimulationResult } from "./SimulatorLevel1";
import { calculateSimulation } from "./SimulatorLevel1";

interface SimulatorLevel2Props {
  inputs: SimulationInputs;
  basicResults: SimulationResult;
}

export default function SimulatorLevel2({ inputs, basicResults }: SimulatorLevel2Props) {
  const formationCost = 990;

  const projection = useMemo(() => {
    const months = [];
    for (let i = 1; i <= 12; i++) {
      // Standard: start slow, ramp up over months
      const standardRamp = Math.min(1, 0.5 + i * 0.05);
      const standardNet = basicResults.monthlyNet * standardRamp;

      // Optimized: faster ramp with T3P training (higher ride rate, better fares)
      const optimizedInputs: SimulationInputs = {
        ...inputs,
        ridesPerHour: Math.min(inputs.ridesPerHour * 1.2, 4),
        avgFare: inputs.avgFare * 1.15,
      };
      const optimizedResult = calculateSimulation(optimizedInputs);
      const optimizedRamp = Math.min(1, 0.7 + i * 0.03);
      const optimizedNet = optimizedResult.monthlyNet * optimizedRamp;

      months.push({
        month: i,
        standard: Math.round(standardNet),
        optimized: Math.round(optimizedNet),
        cumStandard: 0,
        cumOptimized: 0,
      });
    }

    // Cumulative
    let cumS = 0, cumO = -formationCost;
    months.forEach((m) => {
      cumS += m.standard;
      cumO += m.optimized;
      m.cumStandard = Math.round(cumS);
      m.cumOptimized = Math.round(cumO);
    });

    return months;
  }, [inputs, basicResults]);

  // ROI month: when cumOptimized > cumStandard
  const roiMonth = projection.findIndex((m) => m.cumOptimized > m.cumStandard) + 1;
  const gain12m = projection[11].cumOptimized - projection[11].cumStandard;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="bg-secondary rounded-xl p-5 border border-border">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <h3 className="font-bold text-foreground">Rapport stratégique débloqué</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Projection 12 mois avec comparaison scénario standard vs méthode optimisée ECOLE T3P.
        </p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-3 gap-3">
        <KPICard
          icon={<Target className="w-5 h-5" />}
          value={`${roiMonth} mois`}
          label="Amortissement formation"
          color="text-primary"
        />
        <KPICard
          icon={<TrendingUp className="w-5 h-5" />}
          value={`+${((gain12m / projection[11].cumStandard) * 100).toFixed(0)}%`}
          label="Gain cumulé à 12 mois"
          color="text-accent"
        />
        <KPICard
          icon={<BarChart3 className="w-5 h-5" />}
          value={`${gain12m.toLocaleString("fr-FR")}€`}
          label="Revenu suppl. vs standard"
          color="text-primary"
        />
      </div>

      {/* 12-month Recharts area chart */}
      <div>
        <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-primary" /> Évolution annuelle des revenus
        </h4>
        <div className="bg-card rounded-xl border border-border p-4">
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={projection.map(m => ({ name: `M${m.month}`, standard: m.standard, optimized: m.optimized }))} margin={{ top: 5, right: 5, left: -10, bottom: 5 }}>
              <defs>
                <linearGradient id="colorOptimized" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorStandard" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `${(v / 1000).toFixed(1)}k`} />
              <Tooltip
                contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }}
                formatter={(value: number, name: string) => [`${value.toLocaleString("fr-FR")}€`, name === "optimized" ? "Avec ECOLE T3P" : "Sans formation"]}
                labelFormatter={(label) => `Mois ${label.replace("M", "")}`}
              />
              <Legend formatter={(value) => value === "optimized" ? "Avec ECOLE T3P" : "Sans formation"} wrapperStyle={{ fontSize: 12 }} />
              <Area type="monotone" dataKey="standard" stroke="hsl(var(--muted-foreground))" fill="url(#colorStandard)" strokeWidth={2} strokeDasharray="5 5" />
              <Area type="monotone" dataKey="optimized" stroke="hsl(var(--primary))" fill="url(#colorOptimized)" strokeWidth={2.5} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ROI formation */}
      <div className="bg-primary/5 rounded-xl p-5 border border-primary/20">
        <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-primary" /> Amortissement de votre formation
        </h4>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Coût formation ECOLE T3P</span>
            <span className="font-bold text-foreground">{formationCost}€</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Revenus additionnels / mois (avec T3P)</span>
            <span className="font-bold text-primary">
              +{(projection[5].optimized - projection[5].standard).toLocaleString("fr-FR")}€
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Amortissement en</span>
            <span className="font-bold text-primary">{roiMonth} mois</span>
          </div>
          <div className="h-px bg-border my-2" />
          <div className="flex justify-between text-sm">
            <span className="font-semibold text-foreground">Gain net à 12 mois</span>
            <span className="font-bold text-primary text-lg">
              +{gain12m.toLocaleString("fr-FR")}€
            </span>
          </div>
        </div>
      </div>

      {/* Comparative table */}
      <div>
        <h4 className="font-bold text-foreground mb-3">Comparatif détaillé</h4>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted">
                <th className="text-left p-3 font-semibold">Critère</th>
                <th className="text-center p-3 font-semibold text-muted-foreground">Standard</th>
                <th className="text-center p-3 font-semibold text-primary">Avec T3P</th>
              </tr>
            </thead>
            <tbody>
              {[
                { label: "Taux de réussite examen", standard: "~60%", optimized: "94%" },
                { label: "Courses/heure", standard: `${inputs.ridesPerHour}`, optimized: `${Math.min(inputs.ridesPerHour * 1.2, 4).toFixed(1)}` },
                { label: "Tarif moyen course", standard: `${inputs.avgFare}€`, optimized: `${(inputs.avgFare * 1.15).toFixed(0)}€` },
                { label: "Net mensuel (M6)", standard: `${projection[5].standard.toLocaleString("fr-FR")}€`, optimized: `${projection[5].optimized.toLocaleString("fr-FR")}€` },
                { label: "Cumulé à 12 mois", standard: `${projection[11].cumStandard.toLocaleString("fr-FR")}€`, optimized: `${projection[11].cumOptimized.toLocaleString("fr-FR")}€` },
                { label: "Accompagnement admin", standard: "❌ Non", optimized: "✅ Inclus" },
                { label: "Accès multi-plateformes", standard: "❌ Limité", optimized: "✅ Optimisé" },
              ].map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-card" : "bg-muted/30"}>
                  <td className="p-3 font-medium text-foreground">{row.label}</td>
                  <td className="p-3 text-center text-muted-foreground">{row.standard}</td>
                  <td className="p-3 text-center font-semibold text-primary">{row.optimized}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}

function KPICard({ icon, value, label, color }: { icon: React.ReactNode; value: string; label: string; color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-3 rounded-xl border border-border bg-card text-center"
    >
      <div className={`flex justify-center mb-1 ${color}`}>{icon}</div>
      <p className={`text-lg font-bold ${color}`}>{value}</p>
      <p className="text-[10px] text-muted-foreground leading-tight">{label}</p>
    </motion.div>
  );
}
