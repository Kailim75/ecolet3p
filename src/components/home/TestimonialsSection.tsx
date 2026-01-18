import { Star, Quote, Award, Shield } from "lucide-react";

const testimonials = [
  {
    name: "Mohamed K.",
    role: "Chauffeur VTC",
    year: "Promotion 2024",
    content: "Excellente formation ! Les formateurs sont très compétents et à l'écoute. J'ai obtenu ma carte VTC en 2 mois grâce à leur accompagnement personnalisé.",
    rating: 5,
    avatar: "MK",
    color: "from-blue-600 to-blue-500",
  },
  {
    name: "Sophie M.",
    role: "Chauffeur TAXI",
    year: "Promotion 2024",
    content: "Formation intensive mais très bien encadrée. J'ai particulièrement apprécié les mises en situation pratiques qui m'ont permis d'être prête pour l'examen.",
    rating: 5,
    avatar: "SM",
    color: "from-purple-600 to-purple-500",
  },
  {
    name: "Pierre D.",
    role: "Chauffeur VMDTR",
    year: "Promotion 2023",
    content: "Excellent centre de formation ! L'équipe est à l'écoute et les cours sont clairs. Je recommande vivement T3P Campus pour tous ceux qui veulent devenir chauffeur professionnel.",
    rating: 5,
    avatar: "PD",
    color: "from-emerald-500 to-emerald-400",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="section-padding section-light relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-50" />

      <div className="container-custom relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 rounded-full px-4 py-2 text-sm font-semibold mb-6">
            <Star className="w-4 h-4 fill-current" />
            Témoignages
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6">
            Ils Ont Réussi Grâce à{" "}
            <span className="text-gradient-blue">T3P Campus</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Rejoignez les milliers d'élèves qui ont transformé leur vie professionnelle
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-5 py-2.5 shadow-sm">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />
                ))}
              </div>
              <span className="font-semibold text-gray-900">4.9/5</span>
              <span className="text-gray-500">sur Google</span>
            </div>
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-5 py-2.5 shadow-sm">
              <Shield className="w-4 h-4 text-green-500" />
              <span className="font-semibold text-gray-900">Certifié Qualiopi</span>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="group relative bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Quote icon */}
              <div className="absolute -top-4 -right-2 w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-400 flex items-center justify-center shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform duration-500">
                <Quote className="w-6 h-6 text-white" />
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-orange-400 text-orange-400" />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg">
                    {testimonial.name}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {testimonial.role} • {testimonial.year}
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
