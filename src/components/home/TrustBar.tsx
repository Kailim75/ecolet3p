import { Star, TrendingUp, ShieldCheck, Users } from "lucide-react";

const stats = [
  { icon: Star, label: "5.0/5", sublabel: "(359 avis)", color: "text-gold" },
  { icon: TrendingUp, label: "94%", sublabel: "de réussite", color: "text-forest" },
  { icon: ShieldCheck, label: "Agréé", sublabel: "Préfecture 92", color: "text-forest" },
  { icon: Users, label: "+500", sublabel: "élèves formés", color: "text-forest" },
];

const TrustBar = () => (
  <div className="bg-[#F0F5F3] border-y border-forest/10">
    <div className="container-custom py-4">
      <div className="flex flex-wrap justify-center gap-6 md:gap-10 lg:gap-16">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center gap-2.5">
            <stat.icon className={`w-5 h-5 ${stat.color} flex-shrink-0`} />
            <div className="flex items-baseline gap-1.5">
              <span className="font-bold text-forest text-sm md:text-base">{stat.label}</span>
              <span className="text-muted-foreground text-xs md:text-sm">{stat.sublabel}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default TrustBar;
