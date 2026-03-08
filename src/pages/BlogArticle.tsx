import React, { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import DynamicSEOHead from "@/components/seo/DynamicSEOHead";
import Layout from "@/components/layout/Layout";
import { getArticleBySlug, getRelatedArticles } from "@/data/blogArticles";
import { Clock, Calendar, ArrowLeft, ArrowRight, Share2, User, Tag, Home } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import NewsletterForm from "@/components/newsletter/NewsletterForm";
import OptimizedImage from "@/components/ui/OptimizedImage";

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

  // SEO title overrides to keep under 60 characters
  const seoTitleMap: Record<string, string> = {
    "formation-continue-renouvellement-carte-professionnelle": "Renouvellement Carte Pro : Formation Continue",
    "facilites-paiement-formation-taxi-vtc": "Payer sa Formation en 4× sans Frais | T3P",
    "formation-taxi-carte-professionnelle-t3p": "Carte Pro Taxi : Formation et Examen | T3P",
    "etapes-obtenir-carte-professionnelle-vtc": "5 Étapes pour la Carte Pro VTC | ECOLE T3P",
    "vtc-ou-taxi-quelle-formation-choisir": "VTC ou Taxi : Quelle Formation Choisir ?",
    "devenir-chauffeur-vtc-guide-complet-2025": "Devenir VTC en 2025 : Démarches Pratiques",
    "comment-devenir-chauffeur-vtc-2026": "Devenir Chauffeur VTC en 2026 — Guide Complet",
    "comment-devenir-chauffeur-taxi-2026": "Devenir Chauffeur Taxi en 2026 — Guide Complet",
    "vtc-taxi-vmdtr-2026-quel-metier-choisir": "VTC, Taxi ou VMDTR en 2026 : Quel Métier ?",
    "formation-vmdtr-2026-devenir-conducteur-moto-taxi": "Formation VMDTR 2026 — Devenir Moto-Taxi",
    "formation-vmdtr-moto-taxi-scooter": "VMDTR : Moto ou Scooter Professionnel ?",
    "maitrise-numerique-ia-chauffeur-vtc-taxi": "Numérique et IA pour Chauffeurs VTC Taxi",
    "anglais-chauffeur-vtc-taxi-clientele-internationale": "Anglais pour Chauffeurs VTC Taxi | T3P",
    "quel-statut-juridique-chauffeur-vtc-taxi-2026": "Statut Juridique Chauffeur VTC Taxi 2026",
    "financement-formation-taxi-vtc": "Financement Formation Taxi VTC | ECOLE T3P",
  };

  const seoTitle = slug && seoTitleMap[slug] ? seoTitleMap[slug] : `${article.title} | ECOLE T3P`;

  return (
    <Layout>
      <DynamicSEOHead
        pageUrl={`/blog/${article.slug}`}
        defaultTitle={seoTitle}
        defaultDescription={article.metaDescription}
        canonicalUrl={articleUrl}
        ogImage={typeof article.image === 'string' && article.image.startsWith('http') ? article.image : `https://ecolet3p.fr${article.image}`}
      >
        <meta name="keywords" content={`${article.category}, formation ${article.category.toLowerCase()}, ECOLE T3P, transport de personnes`} />
        <meta property="og:site_name" content="ECOLE T3P" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="article:published_time" content={formatDateISO(article.publishDate)} />
        <meta property="article:section" content={article.category} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.metaDescription} />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </DynamicSEOHead>

      {/* Reading progress bar — CSS width instead of framer-motion */}
      <div className="fixed top-0 left-0 w-full h-1 z-50 bg-border/30">
        <div
          className="h-full bg-gold transition-[width] duration-100 ease-linear"
          style={{ width: `${readProgress}%` }}
        />
      </div>

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
                <BreadcrumbLink asChild>
                  <Link to="/blog">Blog</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="line-clamp-1 max-w-[200px]">{article.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Hero with image — CSS animations */}
      <section className="relative bg-forest overflow-hidden">
        <div className="absolute inset-0">
          <OptimizedImage
            src={article.image}
            alt={article.title}
            className="opacity-30"
            priority
            width={1200}
            height={630}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/80 to-forest/60" />
        </div>

        <div className="relative container-custom py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 text-cream/70 hover:text-gold transition-colors mb-8 text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour au blog
            </Link>

            <div className="mb-6">
              <span className="inline-flex items-center gap-1.5 bg-gold/20 backdrop-blur-sm text-gold text-xs font-bold px-4 py-1.5 rounded-full border border-gold/30">
                <Tag className="w-3 h-3" />
                {article.category}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-cream leading-tight mb-8">
              {article.title}
            </h1>

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
          </div>
        </div>
      </section>

      {/* Article content */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            {/* Lead / Excerpt */}
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-12 font-medium border-l-4 border-gold pl-6 italic animate-fade-in">
              {article.excerpt}
            </p>

            {/* Main content — split to inject lead magnet CTA */}
            {(() => {
              const fullHtml = formatContent(article.content);
              const pCloseRegex = /<\/p>/g;
              let matchCount = 0;
              let splitIndex = -1;
              let match: RegExpExecArray | null;
              while ((match = pCloseRegex.exec(fullHtml)) !== null) {
                matchCount++;
                if (matchCount === 3) {
                  splitIndex = match.index + match[0].length;
                  break;
                }
              }
              if (splitIndex === -1) {
                return (
                  <article
                    className="article-content animate-fade-in"
                    dangerouslySetInnerHTML={{ __html: fullHtml }}
                  />
                );
              }
              const before = fullHtml.slice(0, splitIndex);
              const after = fullHtml.slice(splitIndex);
              return (
                <>
                  <article
                    className="article-content animate-fade-in"
                    dangerouslySetInnerHTML={{ __html: before }}
                  />
                  {/* Lead Magnet CTA */}
                  <div
                    className="my-10 p-6 rounded-xl animate-fade-in"
                    style={{ backgroundColor: "#1B4332", animationDelay: "200ms", animationFillMode: "both" }}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <span className="text-2xl">📘</span>
                      <div>
                        <h3 className="text-lg font-bold text-white leading-snug">
                          Guide gratuit : Les 7 étapes pour devenir chauffeur Taxi ou VTC en 2026
                        </h3>
                        <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.8)" }}>
                          Téléchargez notre guide complet — démarches, examen, financement, création d'entreprise
                        </p>
                      </div>
                    </div>
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        const form = e.target as HTMLFormElement;
                        const email = (form.elements.namedItem("lead-email") as HTMLInputElement)?.value?.trim();
                        if (!email) return;
                        try {
                          const source = `blog-lead-magnet-${article.slug}`;
                          const { error } = await supabase
                            .from("newsletter_subscribers")
                            .insert({ email, source });
                          if (error) {
                            if (error.code === "23505") {
                              toast.success("Vous êtes déjà inscrit(e) ! Vérifiez votre boîte mail.");
                            } else {
                              throw error;
                            }
                          } else {
                            supabase.functions.invoke("send-lead-magnet-guide", {
                              body: { email, source },
                            });
                            toast.success("✅ Guide envoyé ! Vérifiez votre boîte mail.");
                          }
                          form.reset();
                        } catch {
                          toast.error("Une erreur est survenue. Veuillez réessayer.");
                        }
                      }}
                      className="flex flex-col sm:flex-row gap-2"
                    >
                      <input
                        name="lead-email"
                        type="email"
                        required
                        placeholder="Votre email"
                        className="flex-1 px-4 py-3 rounded-lg text-sm bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold"
                      />
                      <button
                        type="submit"
                        className="px-6 py-3 rounded-lg text-sm font-bold text-white shrink-0 transition-opacity hover:opacity-90"
                        style={{ backgroundColor: "#E8793A" }}
                      >
                        Recevoir le guide →
                      </button>
                    </form>
                    <p className="mt-3 text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>
                      ✓ Gratuit ✓ Sans engagement ✓ Envoi immédiat
                    </p>
                  </div>
                  <article
                    className="article-content animate-fade-in"
                    style={{ animationDelay: "300ms", animationFillMode: "both" }}
                    dangerouslySetInnerHTML={{ __html: after }}
                  />
                </>
              );
            })()}

            {/* Divider */}
            <div className="my-12 flex items-center gap-4">
              <div className="flex-1 h-px bg-border" />
              <div className="w-2 h-2 rounded-full bg-gold" />
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Author box */}
            <div className="p-8 bg-cream rounded-2xl border border-border animate-fade-in">
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
            </div>

            {/* Newsletter */}
            <div className="mt-12 animate-fade-in">
              <NewsletterForm source="blog-article" />
            </div>

            {/* CTA */}
            <div 
              className="mt-10 p-10 bg-forest text-cream rounded-2xl text-center relative overflow-hidden animate-fade-in"
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
            </div>
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
                      width={400}
                      height={160}
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
    .replace(/^## (.+)$/gm, (_match, title) => {
      const id = title.toLowerCase().replace(/[^a-zà-ÿ0-9]+/g, '-').replace(/^-|-$/g, '');
      return `<h2 id="${id}">${title}</h2>`;
    })
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
    .replace(/^✅ (.+)$/gm, '<li class="check-item"><span class="check-icon">✅</span> $1</li>')
    .replace(/^❌ (.+)$/gm, '<li class="cross-item"><span class="cross-icon">❌</span> $1</li>')
    .replace(/^📄 (.+)$/gm, '<li class="doc-item"><span class="doc-icon">📄</span> $1</li>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li[^>]*>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`)
    .replace(/(\|.+\|(?:\n\|.+\|)+)/g, (_match, tableBlock) => {
      const rows = tableBlock.trim().split('\n');
      let tableHtml = '<div class="table-wrapper"><table>';
      rows.forEach((row: string, i: number) => {
        if (row.match(/^\|[\s-|:]+\|$/)) return;
        const cells = row.split('|').filter((c: string) => c.trim() !== '');
        const tag = i === 0 ? 'th' : 'td';
        const rowEndTag = i === 0 ? '</thead><tbody>' : '';
        tableHtml += `${i === 0 ? '<thead>' : ''}<tr>${cells.map((c: string) => `<${tag}>${c.trim()}</${tag}>`).join('')}</tr>${rowEndTag}`;
      });
      tableHtml += '</tbody></table></div>';
      return tableHtml;
    })
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[hultd])/gm, '<p>')
    .replace(/(?<![>])$/gm, '</p>')
    .replace(/<p><\/p>/g, '')
    .replace(/<p>(<[hultd])/g, '$1')
    .replace(/(<\/[hultd][^>]*>)<\/p>/g, '$1');

  return html;
}

export default BlogArticle;
