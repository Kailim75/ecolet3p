import { Calendar, Users, Trophy, Star } from "lucide-react";

const stats = [
  { icon: Calendar, value: "Depuis 2014", label: "Plus de 10 ans d'expertise" },
  { icon: Users, value: "+2 000", label: "Chauffeurs formés" },
  { icon: Trophy, value: "94%", label: "Taux de réussite" },
  { icon: Star, value: "5.0/5", label: "359 avis Google" },
];

const ReassuranceBar = () => {
  return (
    <section className="bg-muted py-10 md:py-14">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat) => (
            <div key={stat.value} className="flex flex-col items-center text-center gap-2">
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-1">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <span className="stat-number text-2xl md:text-3xl">{stat.value}</span>
              <span className="text-muted-foreground text-sm">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReassuranceBar;
