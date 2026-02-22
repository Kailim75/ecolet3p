import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FileSearch, ArrowRight, Users } from "lucide-react";
import SimulatorLevel1 from "@/components/simulator/SimulatorLevel1";
import type { SimulationInputs, SimulationResult } from "@/components/simulator/SimulatorLevel1";
import { supabase } from "@/integrations/supabase/client";

const BASE_COUNT = 2000; // historically trained drivers

const SimulatorWidget = () => {
  const [simCount, setSimCount] = useState<number | null>(null);

  useEffect(() => {
    supabase.rpc("get_simulation_count").then(({ data }) => {
      if (data !== null) setSimCount(Number(data));
    });
  }, []);
  const handleResultsReady = async (inp: SimulationInputs, res: SimulationResult) => {
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

  const handleUnlockLevel2 = () => {
    window.location.href = "/audit-rentabilite";
  };

  return (
    <section className="section-padding bg-muted/50" id="simulateur">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold bg-accent/10 text-accent border border-accent/20 mb-4">
            <FileSearch className="w-4 h-4" /> Audit gratuit
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Auditez votre rentabilité en 30 secondes
          </h2>
          {simCount !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-2 mb-6 text-sm text-muted-foreground"
            >
              <Users className="w-4 h-4 text-primary" />
              <span>
                <AnimatedCounter value={BASE_COUNT + simCount} /> audits réalisés
              </span>
            </motion.div>
          )}

          <p className="text-muted-foreground max-w-xl mx-auto">
            Choisissez votre métier, ajustez les paramètres et découvrez votre potentiel de revenus.
          </p>
        </motion.div>

        <div className="max-w-xl mx-auto">
          <div className="card-t3p">
            <SimulatorLevel1
              onUnlockLevel2={handleUnlockLevel2}
              onResultsReady={handleResultsReady}
            />
          </div>
          <div className="text-center mt-6">
            <Link
              to="/audit-rentabilite"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline transition-all"
            >
              Accéder à l'audit stratégique complet
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

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

export default SimulatorWidget;
