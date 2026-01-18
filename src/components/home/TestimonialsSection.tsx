import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Mohamed K.",
    role: "Chauffeur VTC",
    content: "Grâce à T3P Campus, j'ai obtenu ma carte VTC du premier coup. Les formateurs sont vraiment professionnels et la méthode de formation est efficace.",
    rating: 5,
  },
  {
    name: "Sophie M.",
    role: "Chauffeur TAXI",
    content: "Formation intensive mais très bien encadrée. J'ai particulièrement apprécié les mises en situation pratiques qui m'ont permis d'être prête pour l'examen.",
    rating: 5,
  },
  {
    name: "Pierre D.",
    role: "Chauffeur VMDTR",
    content: "Excellent centre de formation ! L'équipe est à l'écoute et les cours sont clairs. Je recommande vivement T3P Campus pour tous ceux qui veulent devenir chauffeur professionnel.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="section-padding section-alt">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ils nous font <span className="text-primary">confiance</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Découvrez les témoignages de nos anciens stagiaires devenus chauffeurs professionnels
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="bg-card rounded-xl border border-border p-6 card-hover animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Quote icon */}
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Quote className="w-5 h-5 text-primary" />
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-accent text-accent"
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-muted-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="border-t border-border pt-4">
                <p className="font-semibold text-foreground">
                  {testimonial.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
