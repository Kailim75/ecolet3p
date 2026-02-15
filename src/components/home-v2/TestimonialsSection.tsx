import { Star } from "lucide-react";

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
          <div className="inline-flex items-center gap-2 bg-card px-4 py-2 rounded-full border border-border">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              ))}
            </div>
            <span className="font-bold text-sm text-foreground">5.0/5</span>
            <span className="text-muted-foreground text-sm">— 359 avis Google</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="card-t3p">
              <div className="flex mb-3">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <p className="text-foreground text-sm leading-relaxed mb-4 italic">
                "{t.text}"
              </p>
              <div>
                <p className="font-semibold text-sm text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.formation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
