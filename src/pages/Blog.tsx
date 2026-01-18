import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { blogArticles } from "@/data/blogArticles";
import { Clock, Calendar, ArrowRight } from "lucide-react";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const staggerItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const Blog = () => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-cream py-16 md:py-24">
        <div className="container-custom text-center">
          <motion.span 
            className="badge-livementor mb-6 inline-block"
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
          >
            📚 Blog & Ressources
          </motion.span>
          <motion.h1 
            className="section-title mb-4"
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
          >
            ACTUALITÉS &<br />
            <span className="text-gold">CONSEILS PRATIQUES</span>
          </motion.h1>
          <motion.p 
            className="section-subtitle mx-auto"
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
          >
            Guides, conseils et actualités pour réussir votre reconversion 
            en tant que chauffeur professionnel.
          </motion.p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            animate="visible"
            variants={staggerContainerVariants}
          >
            {blogArticles.map((article, index) => (
              <motion.article 
                key={article.slug}
                variants={staggerItemVariants}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <Link 
                  to={`/blog/${article.slug}`}
                  className="block card-livementor h-full group"
                >
                  {/* Article Image */}
                  <div className="w-full h-48 rounded-lg mb-6 overflow-hidden">
                    <motion.img 
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>

                  {/* Category badge */}
                  <span className="inline-block bg-gold/20 text-forest text-xs font-bold px-3 py-1 rounded-full mb-4">
                    {article.category}
                  </span>

                  {/* Title */}
                  <h2 className="text-lg font-bold text-forest mb-3 group-hover:text-gold transition-colors line-clamp-2">
                    {article.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(article.publishDate)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>

                  {/* Read more */}
                  <motion.div 
                    className="flex items-center gap-2 text-forest font-semibold text-sm group-hover:text-gold transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    Lire l'article
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-forest text-cream">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-black uppercase mb-4">
              Prêt à démarrer votre formation ?
            </h2>
            <p className="text-cream/80 mb-8 max-w-xl mx-auto">
              Nos conseillers sont disponibles pour répondre à toutes vos questions 
              et vous orienter vers la formation adaptée à votre projet.
            </p>
            <Link 
              to="/contact" 
              className="inline-flex items-center gap-2 bg-gold text-forest font-bold py-4 px-8 rounded-md hover:bg-gold/90 transition-colors"
            >
              Demander un rendez-vous
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
