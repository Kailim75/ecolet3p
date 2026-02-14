import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const smoothEase = [0.22, 1, 0.36, 1] as const;

const transformations = [
  {
    name: "Rachid A.",
    initials: "RA",
    before: { job: "Agent de sécurité", salary: "1 350€/mois", status: "Horaires de nuit, fatigue accumulée" },
    after: { job: "Chauffeur VTC indépendant", salary: "3 100€/mois", status: "Ses propres horaires, revenus doublés" },
    formation: "Formation VTC",
    duration: "3 mois entre l'inscription et la 1ère course",
    quote: "Les formateurs m'ont préparé à l'examen mais aussi à gérer mon activité. Aujourd'hui je choisis mes horaires et mes clients.",
    rating: 10,
  },
  {
    name: "Céline V.",
    initials: "CV",
    before: { job: "Vendeuse en prêt-à-porter", salary: "1 500€/mois", status: "Lassée du commerce, envie d'indépendance" },
    after: { job: "Chauffeure de taxi parisien", salary: "2 900€/mois", status: "Indépendante, chaque journée est différente" },
    formation: "Formation Taxi",
    duration: "2 mois et demi du 1er cours à la carte pro",
    quote: "J'ai réussi l'examen du premier coup grâce aux cours du soir. L'équipe reste disponible même après l'obtention de la carte pro.",
    rating: 10,
  },
  {
    name: "Dimitri P.",
    initials: "DP",
    before: { job: "Préparateur de commandes", salary: "1 400€/mois", status: "Travail répétitif, aucune évolution" },
    after: { job: "Chauffeur moto-taxi VMDTR", salary: "2 700€/mois", status: "Passion moto + liberté totale" },
    formation: "Formation VMDTR",
    duration: "2 mois du début de la formation à l'activité",
    quote: "Le paiement en 4 fois via Alma m'a permis de me former sans stress. Aujourd'hui je vis de ma passion sur deux roues.",
    rating: 10,
  },
];

interface InfoRowProps {
  label: string;
  value: string;
  variant: "before" | "after";
}

const InfoRow = ({ label, value, variant }: InfoRowProps) => (
  <div className="flex items-center gap-2 mb-2.5">
    <span
      className="w-2 h-2 rounded-full flex-shrink-0"
      style={{ backgroundColor: variant === "before" ? "#DC2626" : "#1B4332" }}
    />
    <span className="text-xs min-w-[60px]" style={{ color: "#999" }}>{label}</span>
    <span className="text-sm font-semibold" style={{ color: "#1A1A1A" }}>{value}</span>
  </div>
);

interface BeforeAfterCardProps {
  item: typeof transformations[0];
  index: number;
}

const BeforeAfterCard = ({ item, index }: BeforeAfterCardProps) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: smoothEase }}
      className="bg-white rounded-2xl overflow-hidden border hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
      style={{ borderColor: "rgba(27,67,50,0.12)", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
    >
      {/* Toggle */}
      <div className="flex" style={{ borderBottom: "1px solid rgba(27,67,50,0.08)" }}>
        <button
          onClick={() => setFlipped(false)}
          className="flex-1 py-3 text-xs font-bold tracking-wide transition-all duration-300"
          style={{
            backgroundColor: !flipped ? "rgba(220,38,38,0.08)" : "transparent",
            color: !flipped ? "#DC2626" : "#999",
          }}
          aria-label="Voir la situation avant"
          aria-pressed={!flipped}
        >
          ❌ AVANT
        </button>
        <button
          onClick={() => setFlipped(true)}
          className="flex-1 py-3 text-xs font-bold tracking-wide transition-all duration-300"
          style={{
            backgroundColor: flipped ? "rgba(27,67,50,0.08)" : "transparent",
            color: flipped ? "#1B4332" : "#999",
          }}
          aria-label="Voir la situation après"
          aria-pressed={flipped}
        >
          ✅ APRÈS
        </button>
      </div>

      <div className="p-5 md:p-6">
        {/* Identity */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-300"
            style={{
              backgroundColor: flipped ? "rgba(27,67,50,0.1)" : "rgba(232,121,58,0.1)",
              color: flipped ? "#1B4332" : "#E8793A",
            }}
          >
            {item.initials}
          </div>
          <div>
            <p className="font-bold text-sm" style={{ color: "#1A1A1A" }}>{item.name}</p>
            <span
              className="inline-block text-[11px] font-semibold text-white px-2 py-0.5 rounded transition-colors duration-300"
              style={{ backgroundColor: flipped ? "#1B4332" : "#E8793A" }}
            >
              {item.formation}
            </span>
          </div>
        </div>

        {/* Content */}
        {!flipped ? (
          <div>
            <InfoRow label="Métier" value={item.before.job} variant="before" />
            <InfoRow label="Revenus" value={item.before.salary} variant="before" />
            <InfoRow label="Situation" value={item.before.status} variant="before" />
          </div>
        ) : (
          <div>
            <InfoRow label="Métier" value={item.after.job} variant="after" />
            <InfoRow label="Revenus" value={item.after.salary} variant="after" />
            <InfoRow label="Situation" value={item.after.status} variant="after" />
            <div className="mt-4 p-3 rounded-xl border-l-3" style={{ backgroundColor: "rgba(27,67,50,0.04)", borderLeftColor: "#1B4332" }}>
              <p className="text-xs italic leading-relaxed" style={{ color: "#666" }}>
                "{item.quote}"
              </p>
            </div>
            <div className="flex items-center justify-between mt-3">
              <p className="text-[11px]" style={{ color: "#999" }}>
                ⏱️ {item.duration}
              </p>
              <p className="text-[11px] font-bold" style={{ color: "#1B4332" }}>
                {item.rating}/10 recommande
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const BeforeAfterSection = () => {
  return (
    <section className="py-10 lg:py-20" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: smoothEase }}
          className="text-center mb-8 md:mb-12"
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-4 border"
            style={{ backgroundColor: "rgba(27,67,50,0.06)", color: "#1B4332", borderColor: "rgba(27,67,50,0.12)" }}
          >
            Témoignages réels
          </span>
          <h2 className="text-[24px] md:text-[32px] lg:text-[38px] font-black leading-tight mb-3" style={{ color: "#1B4332" }}>
            Ils ont changé de vie avec ÉCOLE T3P
          </h2>
          <p className="text-sm md:text-base max-w-xl mx-auto" style={{ color: "#666" }}>
            Découvrez le parcours de praticiens réels, de leur situation avant la formation à leur nouvelle carrière
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-10">
          {transformations.map((t, i) => (
            <BeforeAfterCard key={i} item={t} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3, ease: smoothEase }}
          className="text-center"
        >
          <Button
            asChild
            className="btn-cta-orange px-8 py-4 text-base rounded-xl"
            style={{ backgroundColor: "#E8793A", boxShadow: "0 4px 14px rgba(232,121,58,0.35)" }}
          >
            <Link to="/contact" aria-label="Rejoindre la prochaine session de formation">
              Rejoindre la prochaine session <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default BeforeAfterSection;
