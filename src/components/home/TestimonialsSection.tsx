import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Marie Dupont",
    role: "Développeuse Web",
    company: "TechCorp",
    content: "Grâce à T3P Campus, j'ai pu me reconvertir dans le développement web. La qualité de l'enseignement et l'accompagnement m'ont permis de décrocher mon premier emploi en 3 mois !",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Thomas Martin",
    role: "Chef de Projet",
    company: "Innovate SA",
    content: "La formation en gestion de projet Agile a transformé ma façon de travailler. Les formateurs sont exceptionnels et les méthodes très pratiques.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "Sophie Bernard",
    role: "Responsable Marketing",
    company: "Digital Agency",
    content: "Une expérience incroyable ! Le contenu est actualisé et correspond parfaitement aux besoins du marché. Je recommande vivement T3P Campus.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="section-padding">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ce que disent nos anciens élèves
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez les témoignages de ceux qui ont transformé leur carrière avec nous.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`relative bg-card rounded-xl p-6 border border-border shadow-soft card-hover animate-fade-up opacity-0 stagger-${index + 1}`}
            >
              {/* Quote icon */}
              <div className="absolute -top-4 -left-2">
                <div className="w-10 h-10 gradient-accent rounded-full flex items-center justify-center">
                  <Quote className="w-5 h-5 text-accent-foreground" />
                </div>
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4 pt-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground/80 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role} • {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
