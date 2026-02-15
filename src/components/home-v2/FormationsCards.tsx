import { Link } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";

const formations = [
  {
    badge: "Formation initiale",
    title: "Formation VTC",
    subtitle: "Carte professionnelle VTC",
    price: "990€",
    priceDetail: "tout compris",
    inclusions: [
      "Frais d'examen (241€) inclus",
      "2 heures de conduite incluses",
      "Véhicule fourni le jour de l'examen",
      "3 formats : Jour, Soir, E-learning",
    ],
    cta: "Je deviens chauffeur VTC",
    link: "/formations/vtc",
  },
  {
    badge: "Formation initiale",
    title: "Formation Taxi",
    subtitle: "Carte professionnelle Taxi",
    price: "990€",
    priceDetail: "tout compris",
    inclusions: [
      "Frais d'examen (241€) inclus",
      "2 heures de conduite incluses",
      "Véhicule fourni le jour de l'examen",
      "3 formats : Jour, Soir, E-learning",
    ],
    cta: "Je deviens chauffeur Taxi",
    link: "/formations/taxi",
  },
  {
    badge: "Formation initiale",
    title: "Formation VMDTR",
    subtitle: "Carte professionnelle VMDTR",
    price: "990€",
    priceDetail: "tout compris",
    inclusions: [
      "Frais d'examen (241€) inclus",
      "Formation moto-taxi complète",
      "Accompagnement administratif",
      "Format : Soir ou E-learning",
    ],
    cta: "Je deviens moto-taxi",
    link: "/formations/vmdtr",
  },
];

const FormationsCards = () => {
  return (
    <section id="formations" className="section-padding bg-background">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="section-title mb-4">Choisissez votre formation</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {formations.map((f) => (
            <div key={f.title} className="card-t3p flex flex-col">
              <span className="inline-block self-start text-xs font-semibold px-3 py-1 rounded-full bg-secondary text-primary mb-4">
                {f.badge}
              </span>
              <h3 className="text-xl font-bold text-primary mb-1">{f.title}</h3>
              <p className="text-muted-foreground text-sm mb-4">{f.subtitle}</p>
              <div className="mb-5">
                <span className="text-3xl font-bold text-accent">{f.price}</span>
                <span className="text-muted-foreground text-sm ml-2">{f.priceDetail}</span>
              </div>
              <ul className="space-y-3 mb-6 flex-1">
                {f.inclusions.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to={f.link}
                className="btn-cta-orange w-full py-3.5 text-center font-bold rounded-lg inline-flex items-center justify-center gap-2"
              >
                {f.cta}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/formations#tarifs"
            className="inline-flex items-center gap-2 text-primary font-bold hover:text-accent transition-colors"
          >
            Voir tous les tarifs en un coup d'œil
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FormationsCards;
