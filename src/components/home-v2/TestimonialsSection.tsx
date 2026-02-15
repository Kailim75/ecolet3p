import { Star, ExternalLink, BadgeCheck } from "lucide-react";

const GOOGLE_MAPS_URL = "https://www.google.com/maps/place/Drop+Academy+Montrouge+-+Formations+TAXI+%2F+VTC+%2F+VMDTR+%2F+Stage+r%C3%A9cup%C3%A9ration+de+points/@48.8125825,2.3087391,17z/data=!4m8!3m7!1s0x47e671c5d7e0be99:0xe08551512248734c!8m2!3d48.812579!4d2.311314!9m1!1b1!16s%2Fg%2F11sv53bwx2?entry=ttu";

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
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-card px-4 py-2 rounded-full border border-border hover:shadow-md transition-shadow"
          >
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              ))}
            </div>
            <span className="font-bold text-sm text-foreground">5.0/5</span>
            <span className="text-muted-foreground text-sm">— 359 avis Google</span>
            <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <a
              key={t.name}
              href={GOOGLE_MAPS_URL}
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
