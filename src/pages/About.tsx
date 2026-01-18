import Layout from "@/components/layout/Layout";
import { Target, Eye, Heart, Users, Trophy, Calendar, GraduationCap, Award } from "lucide-react";

const values = [
  {
    icon: Trophy,
    title: "Excellence",
    description: "Nous visons l'excellence avec un taux de réussite de 96% à l'examen professionnel.",
  },
  {
    icon: Heart,
    title: "Accompagnement",
    description: "Un suivi personnalisé pour chaque stagiaire, de l'inscription jusqu'à l'obtention de la carte.",
  },
  {
    icon: Target,
    title: "Réussite",
    description: "Notre objectif : votre réussite à l'examen et votre insertion professionnelle rapide.",
  },
  {
    icon: Users,
    title: "Flexibilité",
    description: "Des formats adaptés à votre situation : présentiel, à distance ou cours du soir.",
  },
];

const stats = [
  { value: "96%", label: "Taux de réussite" },
  { value: "10 ans", label: "D'expérience" },
  { value: "10 000+", label: "Apprenants formés" },
  { value: "10", label: "Formations proposées" },
];

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="gradient-hero py-20 md:py-28">
        <div className="container-custom text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 animate-fade-up">
            À propos de T3P Campus
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto animate-fade-up stagger-1">
            Votre centre de formation de référence pour devenir chauffeur professionnel TAXI, VTC ou VMDTR.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-up">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Qui sommes-nous ?
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Fondé en 2014, <strong className="text-foreground">T3P Campus</strong> est un centre de formation 
                  professionnel situé à Montrouge, aux portes de Paris. Nous sommes spécialisés dans la formation 
                  des chauffeurs professionnels : TAXI, VTC et VMDTR (moto-taxi).
                </p>
                <p>
                  Notre équipe de formateurs expérimentés, tous issus du métier, accompagne chaque année 
                  des centaines de personnes dans leur reconversion professionnelle ou le développement 
                  de leurs compétences.
                </p>
                <p>
                  Avec un taux de réussite de 96% à l'examen professionnel, nous sommes reconnus comme 
                  l'un des meilleurs centres de formation de la région parisienne.
                </p>
              </div>
            </div>
            <div className="animate-fade-up stagger-2">
              <img
                src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&h=400&fit=crop"
                alt="Formation chauffeur professionnel"
                className="rounded-xl shadow-large w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding section-alt">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Notre mission
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Former des chauffeurs professionnels compétents, responsables et prêts à exercer leur métier 
              dans les meilleures conditions. Nous croyons que chaque personne mérite une formation de qualité 
              pour réussir sa reconversion professionnelle.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding section-alt">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            Nos valeurs
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="bg-card rounded-xl p-6 border border-border shadow-soft card-hover animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-5">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Certifications & Agréments
            </h2>
            <p className="text-muted-foreground mb-8">
              T3P Campus est un centre de formation agréé, reconnu par les autorités compétentes.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-primary/10 text-primary px-6 py-3 rounded-full font-semibold">
                Certification RS5635
              </div>
              <div className="bg-primary/10 text-primary px-6 py-3 rounded-full font-semibold">
                Certification RS5637
              </div>
              <div className="bg-accent/10 text-accent px-6 py-3 rounded-full font-semibold">
                Centre agréé Préfecture
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
