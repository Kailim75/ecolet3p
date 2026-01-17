import Layout from "@/components/layout/Layout";
import { Target, Eye, Heart, Users } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Excellence",
    description: "Nous visons l'excellence dans chaque formation dispensée, avec des contenus actualisés et des méthodes pédagogiques innovantes.",
  },
  {
    icon: Heart,
    title: "Bienveillance",
    description: "Chaque apprenant est unique. Nous offrons un accompagnement personnalisé dans un environnement bienveillant et stimulant.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Nous croyons en la force du collectif. Nos formations favorisent l'échange, le partage et l'apprentissage entre pairs.",
  },
  {
    icon: Eye,
    title: "Innovation",
    description: "Nous restons à la pointe des évolutions du marché pour proposer des formations toujours pertinentes et actuelles.",
  },
];

const stats = [
  { value: "10+", label: "Années d'expérience" },
  { value: "5000+", label: "Apprenants formés" },
  { value: "95%", label: "Taux de satisfaction" },
  { value: "85%", label: "Taux d'insertion" },
];

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="gradient-primary py-16 md:py-24">
        <div className="container-custom text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4 animate-fade-up">
            À propos de T3P Campus
          </h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto animate-fade-up stagger-1 opacity-0">
            Votre partenaire de confiance pour une formation professionnelle de qualité.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-up">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Notre histoire
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Fondé en 2014, <strong className="text-foreground">T3P Campus</strong> est né de la conviction 
                  que la formation professionnelle doit être accessible, pratique et orientée vers les besoins 
                  réels du marché du travail.
                </p>
                <p>
                  Notre équipe de fondateurs, issus du monde de l'entreprise et de la formation, a créé un 
                  centre de formation qui place l'apprenant au cœur de son dispositif pédagogique.
                </p>
                <p>
                  Aujourd'hui, T3P Campus est reconnu comme un acteur majeur de la formation professionnelle, 
                  accompagnant chaque année des milliers de personnes dans leur montée en compétences et leur 
                  évolution de carrière.
                </p>
              </div>
            </div>
            <div className="animate-fade-up stagger-2 opacity-0">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
                alt="Équipe T3P Campus"
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
                className={`text-center animate-fade-up opacity-0 stagger-${index + 1}`}
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
              Permettre à chacun de développer ses compétences professionnelles pour s'épanouir 
              dans sa carrière. Nous croyons que l'apprentissage continu est la clé de la réussite 
              dans un monde en constante évolution.
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
                className={`bg-card rounded-xl p-6 border border-border shadow-soft card-hover animate-fade-up opacity-0 stagger-${index + 1}`}
              >
                <div className="w-14 h-14 gradient-primary rounded-xl flex items-center justify-center mb-5">
                  <value.icon className="w-7 h-7 text-primary-foreground" />
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
    </Layout>
  );
};

export default About;
