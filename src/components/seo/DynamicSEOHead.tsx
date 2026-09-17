import { Helmet } from "react-helmet-async";
import { getPageSeo } from "@/lib/seoPages";
import { getCanonicalUrl } from "@/lib/siteConfig";

interface DynamicSEOHeadProps {
  pageUrl: string; // e.g. "/formations/taxi"
  defaultTitle: string;
  defaultDescription: string;
  defaultH1?: string;
  canonicalUrl?: string;
  ogImage?: string;
  children?: React.ReactNode;
}

/**
 * Balises d'en-tête d'une page, lues dans src/data/seoPages.json (source unique partagée
 * avec le prérendu). Les valeurs par défaut ne servent qu'aux pages absentes du fichier.
 *
 * Le prérendu marque ses balises statiques data-rh="true" : Helmet les reconnaît comme
 * siennes et les remplace au lieu d'en ajouter une seconde série. Ne pas rendre ici une
 * balise que les pages passent aussi en children (Helmet ne dédoublonne pas au sein
 * d'une même instance).
 *
 * CANONICAL : `canonicalUrl` si fourni, sinon calculée depuis `pageUrl`.
 */
const DynamicSEOHead = ({
  pageUrl,
  defaultTitle,
  defaultDescription,
  canonicalUrl,
  ogImage,
  children,
}: DynamicSEOHeadProps) => {
  const seo = getPageSeo(pageUrl);
  const title = seo?.title ?? defaultTitle;
  const description = seo?.description ?? defaultDescription;
  const canonical = canonicalUrl || getCanonicalUrl(pageUrl);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
      <meta name="robots" content="index, follow" />
      {children}
    </Helmet>
  );
};

export default DynamicSEOHead;

/**
 * H1 d'une page, lu dans la source unique.
 * Usage : const h1 = useDynamicH1("/formations/taxi", "H1 par défaut");
 */
export const useDynamicH1 = (pageUrl: string, defaultH1: string): string =>
  getPageSeo(pageUrl)?.h1 ?? defaultH1;
