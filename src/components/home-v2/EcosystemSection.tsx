import { Link } from "react-router-dom";
import { RefreshCw, ArrowLeftRight, Accessibility, Briefcase, FileText, AlertTriangle, KeyRound, ArrowRight } from "lucide-react";

const services = [
  {
    icon: RefreshCw,
    title: "Renouvellement de carte",
    desc: "Formation continue obligatoire pour renouveler votre carte professionnelle.",
    link: "/formations/continue-vtc",
  },
  {
    icon: ArrowLeftRight,
    title: "Passerelle VTC ↔ Taxi",
    desc: "Obtenez la double carte en seulement 14 heures de formation.",
    link: "/passerelle-vtc-taxi",
  },
  {
    icon: KeyRound,
    title: "Location véhicule examen",
    desc: "Véhicule conforme + 2h de conduite incluses pour réussir votre examen pratique.",
    link: "/services/location-vehicule-examen",
  },
  {
    icon: Accessibility,
    title: "Accessibilité PMR",
    desc: "Formation TPMR pour le transport de personnes à mobilité réduite.",
    link: "/formation-accessibilite-pmr",
  },
  {
    icon: Briefcase,
    title: "Gestion d'activité",
    desc: "Apprenez à gérer et développer votre activité de chauffeur.",
    link: "/accompagnement-gestion-activite",
  },
  {
    icon: FileText,
    title: "Aide administrative",
    desc: "Accompagnement pour la création d'entreprise et démarches préfecture.",
    link: "/aide-administrative-creation-entreprise",
  },
  {
    icon: AlertTriangle,
    title: "Récupération de points",
    desc: "Stages agréés pour récupérer jusqu'à 4 points sur votre permis.",
    link: "/stage-recuperation-points",
  },
];

const EcosystemSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="section-title mb-4">Bien plus qu'une formation : un accompagnement complet</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <Link
              key={s.title}
              to={s.link}
              className="card-t3p group flex flex-col gap-3"
            >
              <div className="w-11 h-11 rounded-lg bg-secondary flex items-center justify-center">
                <s.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-base font-semibold text-primary">{s.title}</h3>
              <p className="text-sm text-muted-foreground flex-1">{s.desc}</p>
              <span className="text-sm font-semibold text-accent inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                En savoir plus <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EcosystemSection;
