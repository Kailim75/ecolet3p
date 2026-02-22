import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calculator, ArrowRight } from "lucide-react";
import SimulatorLevel1 from "@/components/simulator/SimulatorLevel1";
import type { SimulationInputs, SimulationResult } from "@/components/simulator/SimulatorLevel1";
import { supabase } from "@/integrations/supabase/client";

const SimulatorWidget = () => {
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
    window.location.href = "/simulateur-revenus";
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
            <Calculator className="w-4 h-4" /> Outil gratuit
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Estimez vos revenus en 30 secondes
          </h2>
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
              to="/simulateur-revenus"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline transition-all"
            >
              Accéder à la simulation avancée complète
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimulatorWidget;
