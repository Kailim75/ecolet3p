import React, { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { getArticleBySlug, getRelatedArticles } from "@/data/blogArticles";
import { Clock, Calendar, ArrowLeft, ArrowRight, Share2 } from "lucide-react";
import NewsletterForm from "@/components/newsletter/NewsletterForm";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;
  const relatedArticles = slug ? getRelatedArticles(slug, 3) : [];

  useEffect(() => {
    // Scroll to top on article change
    window.scrollTo(0, 0);

    // Update meta tags for SEO
    if (article) {
      document.title = `${article.title} | ECOLE T3P`;
      
      // Update meta description
      let metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', article.metaDescription);
      }

      // Add article schema
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'article-schema';
      script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": article.title,
        "description": article.metaDescription,
        "author": {
          "@type": "Organization",
          "name": "ECOLE T3P"
        },
        "publisher": {
          "@type": "Organization",
          "name": "ECOLE T3P",
          "logo": {
            "@type": "ImageObject",
            "url": "https://ecolet3p.fr/logo/ecole-t3p-favicon.svg"
          }
        },
        "datePublished": article.publishDate,
        "dateModified": article.publishDate
      });

      // Remove existing and add new
      const existing = document.getElementById('article-schema');
      if (existing) existing.remove();
      document.head.appendChild(script);

      return () => {
        const scriptToRemove = document.getElementById('article-schema');
        if (scriptToRemove) scriptToRemove.remove();
        document.title = 'ECOLE T3P - Centre de Formation Professionnelle';
      };
    }
  }, [article]);

  if (!article) {
    return <Navigate to="/blog" replace />;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-cream py-12 md:py-20">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            className="max-w-4xl mx-auto"
          >
            {/* Breadcrumb */}
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-forest transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour au blog
            </Link>

            {/* Category */}
            <span className="inline-block bg-gold/20 text-forest text-sm font-bold px-4 py-1.5 rounded-full mb-6">
              {article.category}
            </span>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-forest leading-tight mb-6">
              {article.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formatDate(article.publishDate)}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {article.readTime} de lecture
              </span>
              <button 
                onClick={handleShare}
                className="flex items-center gap-2 hover:text-forest transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Partager
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.article
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="prose prose-lg max-w-none
                prose-headings:text-forest prose-headings:font-bold
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                prose-p:text-muted-foreground prose-p:leading-relaxed
                prose-li:text-muted-foreground
                prose-strong:text-forest
                prose-a:text-forest prose-a:font-semibold hover:prose-a:text-gold
                prose-table:border-collapse prose-th:bg-forest/5 prose-th:text-forest prose-th:p-3 prose-th:text-left
                prose-td:p-3 prose-td:border-b prose-td:border-border
              "
              dangerouslySetInnerHTML={{ __html: formatContent(article.content) }}
            />

            {/* Author box */}
            <motion.div 
              className="mt-12 p-6 bg-forest/5 rounded-xl border border-border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-forest rounded-full flex items-center justify-center">
                  <span className="text-cream text-2xl font-bold">E</span>
                </div>
                <div>
                  <p className="font-bold text-forest">{article.author}</p>
                  <p className="text-sm text-muted-foreground">
                    Centre de formation professionnelle spécialisé dans les métiers du transport de personnes.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Newsletter */}
            <motion.div 
              className="mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <NewsletterForm source="blog-article" />
            </motion.div>

            {/* CTA */}
            <motion.div 
              className="mt-8 p-8 bg-forest text-cream rounded-xl text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h3 className="text-xl font-bold mb-3">
                Prêt à devenir chauffeur professionnel ?
              </h3>
              <p className="text-cream/80 mb-6">
                Contactez-nous pour un entretien gratuit et personnalisé.
              </p>
              <Link 
                to="/contact"
                className="inline-flex items-center gap-2 bg-gold text-forest font-bold py-3 px-6 rounded-md hover:bg-gold/90 transition-colors"
              >
                Demander un rendez-vous
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="section-padding bg-cream">
          <div className="container-custom">
            <h2 className="text-2xl font-bold text-forest mb-8 text-center">
              Articles similaires
            </h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {relatedArticles.map((relatedArticle) => (
                <Link
                  key={relatedArticle.slug}
                  to={`/blog/${relatedArticle.slug}`}
                  className="card-livementor group"
                >
                  <div className="w-full h-32 rounded-lg mb-4 overflow-hidden">
                    <img 
                      src={relatedArticle.image} 
                      alt={relatedArticle.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <span className="inline-block bg-gold/20 text-forest text-xs font-bold px-2 py-1 rounded-full mb-2">
                    {relatedArticle.category}
                  </span>
                  <h3 className="font-bold text-forest group-hover:text-gold transition-colors line-clamp-2">
                    {relatedArticle.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

// Simple markdown-like content formatter
function formatContent(content: string): string {
  return content
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/^\- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
    .replace(/^✅ (.+)$/gm, '<li class="list-none">✅ $1</li>')
    .replace(/^📄 (.+)$/gm, '<li class="list-none">📄 $1</li>')
    .replace(/\|(.+)\|/g, (match) => {
      // Simple table handling
      return match;
    })
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[hul])/gm, '<p>')
    .replace(/(?<![>])$/gm, '</p>')
    .replace(/<p><\/p>/g, '')
    .replace(/<p>(<[hul])/g, '$1')
    .replace(/(<\/[hul][^>]*>)<\/p>/g, '$1');
}

export default BlogArticle;
