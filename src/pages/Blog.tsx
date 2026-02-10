import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { blogArticles } from "@/data/blogArticles";
import { Clock, Calendar, ArrowRight, BookOpen, Tag, Home } from "lucide-react";
import NewsletterForm from "@/components/newsletter/NewsletterForm";
import OptimizedImage from "@/components/ui/OptimizedImage";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 }
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

  // Featured article = first one
  const featuredArticle = blogArticles[0];
  const otherArticles = blogArticles.slice(1);

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Blog ECOLE T3P - Formation Taxi VTC",
    "description": "Articles, conseils et actualités sur les formations Taxi, VTC et VMDTR",
    "url": "https://www.ecolet3p.fr/blog",
    "publisher": {
      "@type": "Organization",
      "name": "ECOLE T3P",
      "logo": { "@type": "ImageObject", "url": "https://www.ecolet3p.fr/logo/ecole-t3p-favicon.svg" }
    },
    "blogPost": blogArticles.map(article => ({
      "@type": "BlogPosting",
      "headline": article.title,
      "description": article.excerpt,
      "datePublished": article.publishDate,
      "author": { "@type": "Organization", "name": "ECOLE T3P" },
      "url": `https://www.ecolet3p.fr/blog/${article.slug}`
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://www.ecolet3p.fr/" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.ecolet3p.fr/blog" }
    ]
  };

  return (
    <Layout>
      <Helmet>
        <title>Blog Formation Taxi VTC — Guides | ECOLE T3P</title>
        <meta name="description" content="Articles, guides et actualités sur les métiers de chauffeur Taxi, VTC et VMDTR. Conseils pour réussir votre examen et lancer votre activité professionnelle." />
        <link rel="canonical" href="https://www.ecolet3p.fr/blog" />
        <meta property="og:title" content="Blog ECOLE T3P - Formation Taxi VTC Montrouge" />
        <meta property="og:description" content="Articles, conseils et actualités sur les formations Taxi, VTC et VMDTR." />
        <meta property="og:url" content="https://www.ecolet3p.fr/blog" />
        <meta property="og:type" content="blog" />
        <meta property="og:image" content="https://www.ecolet3p.fr/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(blogSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      {/* Breadcrumb */}
      <div className="bg-muted/30 py-3 border-b">
        <div className="container mx-auto px-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/" className="flex items-center gap-1">
                    <Home className="h-4 w-4" />
                    Accueil
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Blog</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Hero */}
      <section className="relative bg-forest overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(var(--accent)/0.15),_transparent_60%)]" />
        <div className="relative container-custom py-16 md:py-24 text-center">
          <motion.span 
            className="inline-flex items-center gap-2 bg-gold/20 backdrop-blur-sm text-gold text-xs font-bold px-4 py-1.5 rounded-full border border-gold/30 mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <BookOpen className="w-4 h-4" />
            Blog & Ressources
          </motion.span>
          <motion.h1 
            className="text-3xl md:text-5xl font-black text-cream uppercase tracking-wide mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Actualités &<br />
            <span className="text-gold">Conseils Pratiques</span>
          </motion.h1>
          <motion.p 
            className="text-cream/70 max-w-xl mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Guides, conseils et actualités pour réussir votre reconversion 
            en tant que chauffeur professionnel.
          </motion.p>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Link 
              to={`/blog/${featuredArticle.slug}`}
              className="group grid md:grid-cols-2 gap-0 bg-card rounded-2xl overflow-hidden border border-border hover:shadow-warm-lg transition-all duration-300"
            >
              <div className="h-64 md:h-full overflow-hidden">
                <OptimizedImage 
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="group-hover:scale-105 transition-transform duration-500"
                  priority
                />
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <span className="inline-flex items-center gap-1.5 bg-gold/15 text-forest text-xs font-bold px-3 py-1 rounded-full mb-4 self-start">
                  <Tag className="w-3 h-3" />
                  {featuredArticle.category}
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-forest mb-4 group-hover:text-gold transition-colors leading-tight">
                  {featuredArticle.title}
                </h2>
                <p className="text-muted-foreground mb-6 line-clamp-3 leading-relaxed">
                  {featuredArticle.excerpt}
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-6">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatDate(featuredArticle.publishDate)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {featuredArticle.readTime}
                  </span>
                </div>
                <span className="inline-flex items-center gap-2 text-forest font-bold text-sm group-hover:text-gold transition-colors">
                  Lire l'article
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="pb-16 bg-background">
        <div className="container-custom">
          <h2 className="text-xl font-black text-forest uppercase tracking-wide mb-8 flex items-center gap-3">
            <span className="w-8 h-1 bg-gold rounded-full" />
            Tous les articles
          </h2>
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            animate="visible"
            variants={staggerContainerVariants}
          >
            {otherArticles.map((article, index) => (
              <motion.article 
                key={article.slug}
                variants={staggerItemVariants}
              >
                <Link 
                  to={`/blog/${article.slug}`}
                  className="group block bg-card rounded-2xl overflow-hidden border border-border hover:shadow-warm-lg transition-all duration-300 hover:-translate-y-1 h-full"
                >
                  {/* Image */}
                  <div className="w-full h-48 overflow-hidden">
                    <OptimizedImage 
                      src={article.image}
                      alt={article.title}
                      className="group-hover:scale-105 transition-transform duration-500"
                      priority={index < 3}
                    />
                  </div>

                  <div className="p-6">
                    {/* Category */}
                    <span className="inline-flex items-center gap-1.5 bg-gold/15 text-forest text-xs font-bold px-3 py-1 rounded-full mb-4">
                      <Tag className="w-3 h-3" />
                      {article.category}
                    </span>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-forest mb-3 group-hover:text-gold transition-colors line-clamp-2 leading-snug">
                      {article.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-muted-foreground text-sm mb-5 line-clamp-3 leading-relaxed">
                      {article.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" />
                        {formatDate(article.publishDate)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3" />
                        {article.readTime}
                      </span>
                    </div>

                    {/* Read more */}
                    <span className="flex items-center gap-2 text-forest font-semibold text-sm group-hover:text-gold transition-colors">
                      Lire l'article
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-cream">
        <div className="container-custom">
          <div className="max-w-xl mx-auto">
            <NewsletterForm source="blog" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-forest text-cream relative overflow-hidden">
        <div className="absolute top-0 right-0 w-60 h-60 bg-gold/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-gold/10 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="container-custom text-center relative">
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
              className="inline-flex items-center gap-2 bg-gold text-forest font-bold py-4 px-8 rounded-xl hover:bg-gold/90 transition-colors shadow-gold"
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
