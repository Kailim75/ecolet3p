import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Euro, Clock, Car, CarTaxiFront, Bike, ArrowRight, Calculator } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface SimulationResult {
  monthlyRevenue: number;
  monthlyCharges: number;
  monthlyNet: number;
  dailyNet: number;
}

interface SimulatorLevel1Props {
  onUnlockLevel2: (data: SimulationInputs) => void;
  onResultsReady: (inputs: SimulationInputs, results: SimulationResult) => void;
}

export interface SimulationInputs {
  profession: "vtc" | "taxi" | "vmdtr";
  hoursPerDay: number;
  daysPerWeek: number;
  avgFare: number;
  ridesPerHour: number;
}

const professions = [
  { id: "vtc" as const, label: "VTC", icon: Car, color: "bg-primary" },
  { id: "taxi" as const, label: "Taxi", icon: CarTaxiFront, color: "bg-amber-600" },
  { id: "vmdtr" as const, label: "VMDTR", icon: Bike, color: "bg-orange-600" },
];

const chargeRates: Record<string, { social: number; fuel: number; insurance: number; vehicle: number; platform: number }> = {
  vtc: { social: 0.22, fuel: 0.08, insurance: 0.04, vehicle: 0.15, platform: 0.20 },
  taxi: { social: 0.22, fuel: 0.08, insurance: 0.04, vehicle: 0.12, platform: 0.10 },
  vmdtr: { social: 0.22, fuel: 0.05, insurance: 0.04, vehicle: 0.08, platform: 0.20 },
};

function calculateSimulation(inputs: SimulationInputs): SimulationResult {
  const { hoursPerDay, daysPerWeek, avgFare, ridesPerHour, profession } = inputs;
  const monthlyRevenue = hoursPerDay * daysPerWeek * 4.33 * avgFare * ridesPerHour;
  const rates = chargeRates[profession];
  const totalChargeRate = rates.social + rates.fuel + rates.insurance + rates.vehicle + rates.platform;
  const monthlyCharges = monthlyRevenue * totalChargeRate;
  const monthlyNet = monthlyRevenue - monthlyCharges;
  const dailyNet = monthlyNet / (daysPerWeek * 4.33);
  return { monthlyRevenue, monthlyCharges, monthlyNet, dailyNet };
}

export default function SimulatorLevel1({ onUnlockLevel2, onResultsReady }: SimulatorLevel1Props) {
  const [inputs, setInputs] = useState<SimulationInputs>({
    profession: "vtc",
    hoursPerDay: 8,
    daysPerWeek: 5,
    avgFare: 25,
    ridesPerHour: 2,
  });
  const [results, setResults] = useState<SimulationResult | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleCalculate = () => {
    const res = calculateSimulation(inputs);
    setResults(res);
    setShowResults(true);
    onResultsReady(inputs, res);
  };

  return (
    <div className="space-y-8">
      {/* Profession selector */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-3">Votre métier</label>
        <div className="grid grid-cols-3 gap-3">
          {professions.map((p) => (
            <button
              key={p.id}
              onClick={() => setInputs({ ...inputs, profession: p.id })}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                inputs.profession === p.id
                  ? "border-primary bg-secondary shadow-md"
                  : "border-border bg-card hover:border-primary/30"
              }`}
            >
              <div className={`w-10 h-10 rounded-lg ${inputs.profession === p.id ? "bg-primary" : "bg-muted"} flex items-center justify-center transition-colors`}>
                <p.icon className={`w-5 h-5 ${inputs.profession === p.id ? "text-primary-foreground" : "text-muted-foreground"}`} />
              </div>
              <span className={`text-sm font-bold ${inputs.profession === p.id ? "text-primary" : "text-muted-foreground"}`}>{p.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Sliders */}
      <motion.div
        className="space-y-6"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
      >
        {[
          { label: "Heures par jour", value: inputs.hoursPerDay, min: 4, max: 14, step: 1, unit: "h", icon: <Clock className="w-4 h-4" />, key: "hoursPerDay" },
          { label: "Jours par semaine", value: inputs.daysPerWeek, min: 3, max: 7, step: 1, unit: "j", icon: <Clock className="w-4 h-4" />, key: "daysPerWeek" },
          { label: "Tarif moyen par course", value: inputs.avgFare, min: 10, max: 60, step: 1, unit: "€", icon: <Euro className="w-4 h-4" />, key: "avgFare" },
          { label: "Courses par heure", value: inputs.ridesPerHour, min: 1, max: 4, step: 0.5, unit: "", icon: <TrendingUp className="w-4 h-4" />, key: "ridesPerHour" },
        ].map((s) => (
          <motion.div
            key={s.key}
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
            }}
          >
            <SliderInput
              label={s.label}
              value={s.value}
              min={s.min}
              max={s.max}
              step={s.step}
              unit={s.unit}
              icon={s.icon}
              onChange={(v) => setInputs({ ...inputs, [s.key]: v })}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Calculate button */}
      <button
        onClick={handleCalculate}
        className="btn-cta-orange w-full px-6 py-4 font-bold rounded-xl inline-flex items-center justify-center gap-2 text-lg"
      >
        <Calculator className="w-5 h-5" /> Calculer mes revenus
      </button>

      {/* Results */}
      <AnimatePresence>
        {showResults && results && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-2 gap-4">
              <ResultCard label="CA mensuel brut" value={results.monthlyRevenue} prefix="€" color="text-primary" />
              <ResultCard label="Charges estimées" value={results.monthlyCharges} prefix="€" color="text-destructive" />
              <ResultCard label="Revenu net estimé" value={results.monthlyNet} prefix="€" color="text-primary" highlight />
              <ResultCard label="Revenu net / jour" value={results.dailyNet} prefix="€" color="text-accent" />
            </div>

            <div className="bg-secondary/50 rounded-xl p-4 border border-border">
              <p className="text-xs text-muted-foreground mb-1">💡 Estimation simplifiée</p>
              <p className="text-sm text-muted-foreground">
                Charges incluses : cotisations sociales ({(chargeRates[inputs.profession].social * 100).toFixed(0)}%), 
                carburant, assurance, véhicule et commissions plateformes.
              </p>
            </div>

            {/* CTA Level 2 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-primary rounded-xl p-6 text-center"
            >
              <h3 className="text-lg font-bold text-primary-foreground mb-2">
                🔓 Débloquez la simulation avancée
              </h3>
              <p className="text-primary-foreground/80 text-sm mb-4">
                Projection 12 mois • Comparatif standard vs optimisé T3P • Calcul ROI formation
              </p>
              <button
                onClick={() => onUnlockLevel2(inputs)}
                className="btn-cta-orange px-8 py-3.5 font-bold rounded-lg inline-flex items-center gap-2"
              >
                Prendre RDV pour débloquer <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

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
        <span className="text-lg font-bold text-primary">
          {value}{unit}
        </span>
      </div>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={(v) => onChange(v[0])}
        className="w-full"
      />
      <div className="flex justify-between text-xs text-muted-foreground mt-1">
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  );
}

function ResultCard({ label, value, prefix, color, highlight }: {
  label: string; value: number; prefix: string; color: string; highlight?: boolean;
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 800;
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(value * eased));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`p-4 rounded-xl border ${highlight ? "border-primary/30 bg-secondary" : "border-border bg-card"}`}
    >
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className={`text-2xl font-bold ${color}`}>
        {displayValue.toLocaleString("fr-FR")} {prefix}
      </p>
    </motion.div>
  );
}

export { calculateSimulation };
export type { SimulationResult };
