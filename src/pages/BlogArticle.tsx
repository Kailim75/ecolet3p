import React, { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { getArticleBySlug, getRelatedArticles } from "@/data/blogArticles";
import { Clock, Calendar, ArrowLeft, ArrowRight, Share2, User, Tag } from "lucide-react";
import NewsletterForm from "@/components/newsletter/NewsletterForm";
import OptimizedImage from "@/components/ui/OptimizedImage";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;
  const relatedArticles = slug ? getRelatedArticles(slug, 3) : [];
  const [readProgress, setReadProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setReadProgress(docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const formatDateISO = (dateString: string) => {
    return new Date(dateString).toISOString();
  };

  const wordCount = article.content.split(/\s+/).filter(word => word.length > 0).length;
  const articleUrl = `https://ecolet3p.fr/blog/${article.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${articleUrl}#article`,
    "mainEntityOfPage": { "@type": "WebPage", "@id": articleUrl },
    "headline": article.title,
    "description": article.metaDescription,
    "image": {
      "@type": "ImageObject",
      "url": typeof article.image === 'string' && article.image.startsWith('http') 
        ? article.image 
        : `https://ecolet3p.fr${article.image}`,
      "width": 1200,
      "height": 630
    },
    "author": { "@type": "Organization", "name": "ECOLE T3P", "url": "https://ecolet3p.fr" },
    "publisher": {
      "@type": "Organization",
      "name": "ECOLE T3P",
      "url": "https://ecolet3p.fr",
      "logo": { "@type": "ImageObject", "url": "https://ecolet3p.fr/logo/ecole-t3p-favicon.svg", "width": 512, "height": 512 }
    },
    "datePublished": formatDateISO(article.publishDate),
    "dateModified": formatDateISO(article.publishDate),
    "articleSection": article.category,
    "wordCount": wordCount,
    "inLanguage": "fr-FR",
    "isAccessibleForFree": true
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://ecolet3p.fr/" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://ecolet3p.fr/blog" },
      { "@type": "ListItem", "position": 3, "name": article.title, "item": articleUrl }
    ]
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: article.title, text: article.excerpt, url: window.location.href });
      } catch (err) { /* cancelled */ }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>{article.title} | Blog ECOLE T3P</title>
        <meta name="description" content={article.metaDescription} />
        <meta name="keywords" content={`${article.category}, formation ${article.category.toLowerCase()}, ECOLE T3P, transport de personnes`} />
        <link rel="canonical" href={articleUrl} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.metaDescription} />
        <meta property="og:url" content={articleUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={typeof article.image === 'string' && article.image.startsWith('http') ? article.image : `https://ecolet3p.fr${article.image}`} />
        <meta property="og:site_name" content="ECOLE T3P" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="article:published_time" content={formatDateISO(article.publishDate)} />
        <meta property="article:section" content={article.category} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.metaDescription} />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-50 bg-border/30">
        <motion.div
          className="h-full bg-gold"
          style={{ width: `${readProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Hero with image */}
      <section className="relative bg-forest overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <OptimizedImage
            src={article.image}
            alt={article.title}
            className="opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/80 to-forest/60" />
        </div>

        <div className="relative container-custom py-16 md:py-24">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            className="max-w-3xl mx-auto text-center"
          >
            {/* Breadcrumb */}
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 text-cream/70 hover:text-gold transition-colors mb-8 text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour au blog
            </Link>

            {/* Category badge */}
            <div className="mb-6">
              <span className="inline-flex items-center gap-1.5 bg-gold/20 backdrop-blur-sm text-gold text-xs font-bold px-4 py-1.5 rounded-full border border-gold/30">
                <Tag className="w-3 h-3" />
                {article.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-cream leading-tight mb-8">
              {article.title}
            </h1>

            {/* Meta bar */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-cream/70 text-sm">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {article.author}
              </span>
              <span className="w-1 h-1 rounded-full bg-cream/40" />
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formatDate(article.publishDate)}
              </span>
              <span className="w-1 h-1 rounded-full bg-cream/40" />
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {article.readTime} de lecture
              </span>
              <span className="w-1 h-1 rounded-full bg-cream/40" />
              <button 
                onClick={handleShare}
                className="flex items-center gap-2 hover:text-gold transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Partager
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article content */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            {/* Lead / Excerpt */}
            <motion.p
              className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-12 font-medium border-l-4 border-gold pl-6 italic"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              {article.excerpt}
            </motion.p>

            {/* Main content */}
            <motion.article
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="article-content"
              dangerouslySetInnerHTML={{ __html: formatContent(article.content) }}
            />

            {/* Divider */}
            <div className="my-12 flex items-center gap-4">
              <div className="flex-1 h-px bg-border" />
              <div className="w-2 h-2 rounded-full bg-gold" />
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Author box */}
            <motion.div 
              className="p-8 bg-cream rounded-2xl border border-border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 bg-forest rounded-2xl flex items-center justify-center flex-shrink-0 shadow-warm">
                  <span className="text-cream text-2xl font-black">T3P</span>
                </div>
                <div>
                  <p className="font-bold text-forest text-lg">{article.author}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                    Centre de formation professionnelle spécialisé dans les métiers du transport de personnes à Montrouge (92).
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Newsletter */}
            <motion.div 
              className="mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <NewsletterForm source="blog-article" />
            </motion.div>

            {/* CTA */}
            <motion.div 
              className="mt-10 p-10 bg-forest text-cream rounded-2xl text-center relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-gold/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gold/10 rounded-full translate-y-1/2 -translate-x-1/2" />
              <div className="relative">
                <h3 className="text-2xl font-black mb-3 uppercase">
                  Prêt à devenir chauffeur professionnel ?
                </h3>
                <p className="text-cream/80 mb-8 max-w-lg mx-auto">
                  Contactez-nous pour un entretien gratuit et personnalisé sur votre projet de reconversion.
                </p>
                <Link 
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-gold text-forest font-bold py-4 px-8 rounded-xl hover:bg-gold/90 transition-colors shadow-gold"
                >
                  Demander un rendez-vous
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-16 bg-cream">
          <div className="container-custom">
            <h2 className="text-2xl font-black text-forest mb-10 text-center uppercase tracking-wide">
              Articles similaires
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {relatedArticles.map((relatedArticle) => (
                <Link
                  key={relatedArticle.slug}
                  to={`/blog/${relatedArticle.slug}`}
                  className="group bg-background rounded-2xl overflow-hidden border border-border hover:shadow-warm-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-full h-40 overflow-hidden">
                    <OptimizedImage 
                      src={relatedArticle.image} 
                      alt={relatedArticle.title}
                      className="group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <span className="inline-block bg-gold/15 text-forest text-xs font-bold px-3 py-1 rounded-full mb-3">
                      {relatedArticle.category}
                    </span>
                    <h3 className="font-bold text-forest group-hover:text-gold transition-colors line-clamp-2 leading-snug">
                      {relatedArticle.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-2">
                      {relatedArticle.readTime} de lecture
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

// Enhanced content formatter
function formatContent(content: string): string {
  let html = content
    // Headings with anchors
    .replace(/^## (.+)$/gm, (_match, title) => {
      const id = title.toLowerCase().replace(/[^a-zà-ÿ0-9]+/g, '-').replace(/^-|-$/g, '');
      return `<h2 id="${id}">${title}</h2>`;
    })
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Links
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
    // Checkmark items
    .replace(/^✅ (.+)$/gm, '<li class="check-item"><span class="check-icon">✅</span> $1</li>')
    .replace(/^❌ (.+)$/gm, '<li class="cross-item"><span class="cross-icon">❌</span> $1</li>')
    .replace(/^📄 (.+)$/gm, '<li class="doc-item"><span class="doc-icon">📄</span> $1</li>')
    // Regular list items
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    // Wrap consecutive li in ul
    .replace(/(<li[^>]*>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`)
    // Tables
    .replace(/(\|.+\|(?:\n\|.+\|)+)/g, (_match, tableBlock) => {
      const rows = tableBlock.trim().split('\n');
      let tableHtml = '<div class="table-wrapper"><table>';
      rows.forEach((row: string, i: number) => {
        if (row.match(/^\|[\s-|:]+\|$/)) return; // skip separator
        const cells = row.split('|').filter((c: string) => c.trim() !== '');
        const tag = i === 0 ? 'th' : 'td';
        const rowTag = i === 0 ? 'thead' : '';
        const rowEndTag = i === 0 ? '</thead><tbody>' : '';
        tableHtml += `${i === 0 ? '<thead>' : ''}<tr>${cells.map((c: string) => `<${tag}>${c.trim()}</${tag}>`).join('')}</tr>${rowEndTag}`;
      });
      tableHtml += '</tbody></table></div>';
      return tableHtml;
    })
    // Paragraphs
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[hultd])/gm, '<p>')
    .replace(/(?<![>])$/gm, '</p>')
    .replace(/<p><\/p>/g, '')
    .replace(/<p>(<[hultd])/g, '$1')
    .replace(/(<\/[hultd][^>]*>)<\/p>/g, '$1');

  return html;
}

export default BlogArticle;
