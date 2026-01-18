import Layout from "@/components/layout/Layout";
import { Target, Heart, Users, Trophy } from "lucide-react";
import { motion } from "framer-motion";

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
      {/* Hero - LiveMentor style */}
      <section className="gradient-hero py-20 md:py-28">
        <div className="container-custom text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-black text-cream uppercase tracking-tight mb-4"
          >
            À propos de <span className="text-gold">T3P Campus</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-cream/80 max-w-2xl mx-auto"
          >
            Votre centre de formation de référence pour devenir chauffeur professionnel TAXI, VTC ou VMDTR.
          </motion.p>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="section-title mb-6">
                QUI SOMMES-NOUS ?
              </h2>
              <div className="space-y-4 text-warm-gray-600 leading-relaxed">
                <p>
                  Fondé en 2014, <strong className="text-forest">T3P Campus</strong> est un centre de formation 
                  professionnel situé à Montrouge, aux portes de Paris. Nous sommes spécialisés dans la formation 
                  des chauffeurs professionnels : TAXI, VTC et VMDTR (moto-taxi).
                </p>
                <p>
                  Notre équipe de formateurs expérimentés, tous issus du métier, accompagne chaque année 
                  des centaines de personnes dans leur reconversion professionnelle ou le développement 
                  de leurs compétences.
                </p>
                <p>
                  Avec un taux de réussite de <strong className="text-gold">96%</strong> à l'examen professionnel, nous sommes reconnus comme 
                  l'un des meilleurs centres de formation de la région parisienne.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img
                src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&h=400&fit=crop"
                alt="Formation chauffeur professionnel"
                className="rounded-xl shadow-warm-lg w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding bg-card">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="stat-number mb-2">
                  {stat.value}
                </div>
                <div className="text-warm-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="section-title mb-6">
              NOTRE MISSION
            </h2>
            <p className="text-lg text-warm-gray-600 leading-relaxed">
              Former des chauffeurs professionnels compétents, responsables et prêts à exercer leur métier 
              dans les meilleures conditions. Nous croyons que chaque personne mérite une formation de qualité 
              pour réussir sa reconversion professionnelle.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-card">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="section-title">NOS VALEURS</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-livementor text-center group"
              >
                <div className="w-14 h-14 bg-forest/10 rounded-xl flex items-center justify-center mx-auto mb-5 group-hover:bg-gold/20 transition-colors">
                  <value.icon className="w-7 h-7 text-forest group-hover:text-gold transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-forest mb-3">
                  {value.title}
                </h3>
                <p className="text-warm-gray-600 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="section-title mb-6">
              CERTIFICATIONS & AGRÉMENTS
            </h2>
            <p className="text-warm-gray-600 mb-8">
              T3P Campus est un centre de formation agréé, reconnu par les autorités compétentes.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-forest/10 text-forest px-6 py-3 rounded-lg font-bold">
                Certification RS5635
              </div>
              <div className="bg-forest/10 text-forest px-6 py-3 rounded-lg font-bold">
                Certification RS5637
              </div>
              <div className="bg-gold/20 text-forest px-6 py-3 rounded-lg font-bold">
                Centre agréé Préfecture
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
