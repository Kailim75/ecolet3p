import { Zap, Shield, CreditCard } from "lucide-react";

const reasons = [
  {
    icon: Zap,
    title: "Inscription immédiate",
    desc: "Pas d'attente administrative de 3 mois. Vous vous inscrivez et vous commencez.",
  },
  {
    icon: Shield,
    title: "Liberté totale",
    desc: "Indépendance tarifaire, pas de contraintes bureaucratiques.",
  },
  {
    icon: CreditCard,
    title: "Paiement facilité",
    desc: "Alma en 4x sans frais : plus simple, plus rapide que le CPF.",
  },
];

const NoCPFSection = () => {
  return (
    <section className="section-padding bg-secondary">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="section-title mb-4">Inscription immédiate, sans paperasse</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reasons.map((r) => (
            <div key={r.title} className="flex flex-col items-center text-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <r.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-primary">{r.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NoCPFSection;
