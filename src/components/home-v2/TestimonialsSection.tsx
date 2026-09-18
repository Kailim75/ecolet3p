import { Star, ExternalLink, BadgeCheck } from "lucide-react";
import { libelleAvisGoogle, noteGoogle, urlAvisGoogle } from "@/lib/avis";

const testimonials = [
  {
    name: "Mamadou D.",
    formation: "Formation VTC",
    text: "Excellente formation, les formateurs sont passionnés et disponibles. J'ai obtenu ma carte du premier coup !",
    rating: 5,
  },
  {
    name: "Sarah K.",
    formation: "Formation Taxi",
    text: "Le format soirée m'a permis de continuer à travailler tout en me formant. Organisation au top.",
    rating: 5,
  },
  {
    name: "Youssef B.",
    formation: "Formation VMDTR",
    text: "Accompagnement complet de l'inscription jusqu'à la création de mon entreprise. Je recommande à 100%.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="section-padding bg-muted">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="section-title mb-4">Ils ont réussi avec T3P</h2>
          <a
            href={urlAvisGoogle}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-card px-4 py-2 rounded-full border border-border hover:shadow-md transition-shadow"
          >
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              ))}
            </div>
            <span className="font-bold text-sm text-foreground">{noteGoogle}/5</span>
            <span className="text-muted-foreground text-sm">— {libelleAvisGoogle}</span>
            <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <a
              key={t.name}
              href={urlAvisGoogle}
              target="_blank"
              rel="noopener noreferrer"
              className="card-t3p block group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary bg-secondary px-2.5 py-1 rounded-full">
                  <BadgeCheck className="w-3.5 h-3.5" />
                  Avis Google
                </span>
              </div>
              <p className="text-foreground text-sm leading-relaxed mb-4 italic">
                "{t.text}"
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-sm text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.formation}</p>
                </div>
                <span className="text-xs text-accent font-semibold opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center gap-1">
                  Voir sur Google <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
