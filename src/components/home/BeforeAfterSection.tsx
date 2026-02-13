import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const smoothEase = [0.22, 1, 0.36, 1] as const;

const transformations = [
  {
    name: "Mohamed K.",
    initials: "MK",
    before: { job: "Livreur intérimaire", salary: "1 200€/mois", status: "Précarité, horaires subis" },
    after: { job: "Chauffeur VTC indépendant", salary: "3 200€/mois", status: "Son propre patron, horaires choisis" },
    formation: "Formation VTC",
    duration: "3 mois entre l'inscription et la 1ère course",
    quote: "ECOLE T3P m'a accompagné du premier jour de formation jusqu'à la création de mon entreprise. Aujourd'hui je gère mon planning et mes revenus.",
  },
  {
    name: "Sophie L.",
    initials: "SL",
    before: { job: "Assistante administrative", salary: "1 600€/mois", status: "Lassée du bureau, envie de terrain" },
    after: { job: "Chauffeure de taxi parisien", salary: "2 800€/mois", status: "Indépendante, chaque jour est différent" },
    formation: "Formation Taxi",
    duration: "2 mois et demi du 1er cours à la carte pro",
    quote: "J'ai réussi l'examen du premier coup grâce à une préparation solide. L'équipe est disponible même après la formation.",
  },
  {
    name: "Alexandre D.",
    initials: "AD",
    before: { job: "Magasinier en CDI", salary: "1 450€/mois", status: "Travail physique, peu d'évolution" },
    after: { job: "Chauffeur moto-taxi", salary: "2 600€/mois", status: "Passion moto + indépendance" },
    formation: "Formation VMDTR",
    duration: "2 mois du début de la formation à l'activité",
    quote: "Le paiement en 4 fois m'a permis de suivre la formation sans stress financier. Aujourd'hui je vis de ma passion.",
  },
];

interface InfoRowProps {
  label: string;
  value: string;
  variant: "before" | "after";
}

const InfoRow = ({ label, value, variant }: InfoRowProps) => (
  <div className="flex items-center gap-2 mb-2.5">
    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${variant === "before" ? "bg-destructive" : "bg-forest"}`} />
    <span className="text-xs text-muted-foreground min-w-[60px]">{label}</span>
    <span className="text-sm font-semibold text-charcoal">{value}</span>
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
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-border/60 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
    >
      {/* Toggle */}
      <div className="flex border-b border-border/60">
        <button
          onClick={() => setFlipped(false)}
          className={`flex-1 py-3 text-xs font-bold tracking-wide transition-all duration-300 ${
            !flipped ? "bg-destructive/10 text-destructive" : "bg-muted/30 text-muted-foreground"
          }`}
        >
          ❌ AVANT
        </button>
        <button
          onClick={() => setFlipped(true)}
          className={`flex-1 py-3 text-xs font-bold tracking-wide transition-all duration-300 ${
            flipped ? "bg-forest/10 text-forest" : "bg-muted/30 text-muted-foreground"
          }`}
        >
          ✅ APRÈS
        </button>
      </div>

      <div className="p-5 md:p-6">
        {/* Identity */}
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-300 ${
            flipped ? "bg-forest/10 text-forest" : "bg-orange/10 text-orange"
          }`}>
            {item.initials}
          </div>
          <div>
            <p className="font-bold text-charcoal text-sm">{item.name}</p>
            <span className={`inline-block text-[11px] font-semibold text-white px-2 py-0.5 rounded transition-colors duration-300 ${
              flipped ? "bg-forest" : "bg-orange"
            }`}>
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
            <div className="mt-4 p-3 rounded-xl bg-forest/5 border-l-3 border-forest">
              <p className="text-xs text-muted-foreground italic leading-relaxed">
                "{item.quote}"
              </p>
            </div>
            <p className="mt-3 text-[11px] text-muted-foreground">
              ⏱️ {item.duration}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const BeforeAfterSection = () => {
  return (
    <section className="py-10 lg:py-20 bg-gradient-to-b from-background to-cream/30">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: smoothEase }}
          className="text-center mb-8 md:mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-forest/8 text-forest rounded-full text-xs font-semibold mb-4 border border-forest/10">
            Témoignages réels
          </span>
          <h2 className="text-[24px] md:text-[32px] lg:text-[38px] font-black text-forest leading-tight mb-3">
            Ils ont changé de vie avec ECOLE T3P
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
            Découvrez le parcours de nos anciens élèves, de leur situation avant la formation à leur nouvelle carrière.
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
          <Button asChild className="btn-cta-orange px-8 py-4 text-base rounded-xl" style={{ boxShadow: "0 4px 14px rgba(230,126,34,0.35)" }}>
            <Link to="/contact">
              Je veux changer de vie <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default BeforeAfterSection;
