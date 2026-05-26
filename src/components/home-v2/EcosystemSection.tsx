import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, type Easing } from "framer-motion";
import { useRef } from "react";
import {
  RefreshCw,
  ArrowLeftRight,
  Accessibility,
  Briefcase,
  FileText,
  AlertTriangle,
  KeyRound,
  ArrowRight,
} from "lucide-react";

const ease: Easing = [0.22, 1, 0.36, 1];

const services = [
  {
    icon: RefreshCw,
    step: "01",
    title: "Renouvellement de carte",
    desc: "Formation continue obligatoire pour renouveler votre carte professionnelle.",
    link: "/formations/continue-vtc",
  },
  {
    icon: ArrowLeftRight,
    step: "02",
    title: "Passerelle VTC ↔ Taxi",
    desc: "Obtenez la double carte en seulement 14 heures de formation.",
    link: "/passerelle-vtc-taxi",
  },
  {
    icon: KeyRound,
    step: "03",
    title: "Location véhicule examen",
    desc: "Véhicule conforme + 2h de conduite incluses pour réussir votre examen pratique.",
    link: "/services/location-vehicule-examen",
  },
  {
    icon: Accessibility,
    step: "04",
    title: "Accessibilité PMR",
    desc: "Formation TPMR pour le transport de personnes à mobilité réduite.",
    link: "/formation-accessibilite-pmr",
  },
  {
    icon: Briefcase,
    step: "05",
    title: "Gestion d'activité",
    desc: "Apprenez à gérer et développer votre activité de chauffeur.",
    link: "/accompagnement-gestion-activite",
  },
  {
    icon: FileText,
    step: "06",
    title: "Aide administrative",
    desc: "Accompagnement pour la création d'entreprise et démarches préfecture.",
    link: "/aide-administrative-creation-entreprise",
  },
  {
    icon: AlertTriangle,
    step: "07",
    title: "Récupération de points",
    desc: "Stages agréés pour récupérer jusqu'à 4 points sur votre permis.",
    link: "/stage-recuperation-points",
  },
];

const EcosystemSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  });
  // Spine fill grows with scroll
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="section-padding bg-background overflow-hidden">
      <div className="container-custom">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-accent mb-3">
            L'écosystème ÉCOLE T3P
          </span>
          <h2 className="section-title mb-4">
            Bien plus qu'une formation : un accompagnement complet
          </h2>
          <p className="section-subtitle mx-auto">
            Sept services interconnectés qui vous accompagnent à chaque étape de votre carrière de chauffeur professionnel.
          </p>
        </div>

        <div ref={containerRef} className="relative max-w-5xl mx-auto">
          {/* Central spine (desktop) — background track */}
          <div
            aria-hidden
            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-border"
          />
          {/* Central spine — animated fill */}
          <motion.div
            aria-hidden
            style={{ height: lineHeight }}
            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 w-px bg-gradient-to-b from-accent via-primary to-accent origin-top"
          />

          {/* Mobile spine */}
          <div
            aria-hidden
            className="md:hidden absolute left-[19px] top-0 bottom-0 w-px bg-border"
          />
          <motion.div
            aria-hidden
            style={{ height: lineHeight }}
            className="md:hidden absolute left-[19px] top-0 w-px bg-gradient-to-b from-accent via-primary to-accent origin-top"
          />

          <ul className="relative space-y-10 md:space-y-16">
            {services.map((s, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.li
                  key={s.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, ease, delay: i * 0.05 }}
                  className="relative md:grid md:grid-cols-2 md:gap-12 items-center"
                >
                  {/* Node on spine */}
                  <div
                    aria-hidden
                    className="absolute md:left-1/2 left-[12px] md:-translate-x-1/2 top-1 md:top-1/2 md:-translate-y-1/2 z-10"
                  >
                    <span className="relative flex items-center justify-center w-4 h-4">
                      <span className="absolute inset-0 rounded-full bg-accent/30 animate-ping opacity-60" />
                      <span className="relative w-3 h-3 rounded-full bg-accent ring-4 ring-background" />
                    </span>
                  </div>

                  {/* Spacer for opposite column on desktop */}
                  {isLeft ? (
                    <>
                      <div className="md:pr-10 pl-12 md:pl-0">
                        <ServiceCard service={s} align="right" />
                      </div>
                      <div className="hidden md:block" />
                    </>
                  ) : (
                    <>
                      <div className="hidden md:block" />
                      <div className="md:pl-10 pl-12">
                        <ServiceCard service={s} align="left" />
                      </div>
                    </>
                  )}
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

interface ServiceCardProps {
  service: (typeof services)[number];
  align: "left" | "right";
}

const ServiceCard = ({ service, align }: ServiceCardProps) => {
  const Icon = service.icon;
  return (
    <Link
      to={service.link}
      className={`card-t3p card-premium group flex flex-col gap-3 md:text-${align}`}
    >
      <div
        className={`flex items-center gap-3 ${
          align === "right" ? "md:flex-row-reverse" : ""
        }`}
      >
        <div className="w-11 h-11 rounded-lg bg-secondary flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <span className="text-xs font-black tracking-widest text-accent/70">
          {service.step}
        </span>
      </div>
      <h3 className="text-lg font-bold text-primary">{service.title}</h3>
      <p className="text-sm text-muted-foreground flex-1">{service.desc}</p>
      <span
        className={`text-sm font-semibold text-accent inline-flex items-center gap-1 ${
          align === "right" ? "md:self-end" : ""
        }`}
      >
        En savoir plus <ArrowRight className="w-4 h-4 arrow-nudge" />
      </span>
    </Link>
  );
};

export default EcosystemSection;
