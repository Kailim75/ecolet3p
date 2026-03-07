import { Helmet } from "react-helmet-async";
import { useSEOOverrides } from "@/hooks/useSEOOverrides";
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
 * Renders Helmet tags with dynamic SEO overrides from the database.
 * 
 * CANONICAL LOGIC (centralized):
 * - If `canonicalUrl` is provided, it is used as-is.
 * - Otherwise, the canonical is auto-computed from `pageUrl` via getCanonicalUrl().
 * - This guarantees every page using DynamicSEOHead has exactly ONE canonical tag.
 */
const DynamicSEOHead = ({
  pageUrl,
  defaultTitle,
  defaultDescription,
  defaultH1,
  canonicalUrl,
  ogImage,
  children,
}: DynamicSEOHeadProps) => {
  const { overrides } = useSEOOverrides(pageUrl);

  const title = overrides.title || defaultTitle;
  const description = overrides.description || defaultDescription;
  const ogTitle = overrides.og_title || title;
  const ogDescription = overrides.og_description || description;

  // Always compute canonical — either from explicit prop or from pageUrl
  const canonical = canonicalUrl || getCanonicalUrl(pageUrl);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta name="robots" content="index, follow" />
      {children}
    </Helmet>
  );
};

export default DynamicSEOHead;

/**
 * Hook to get the dynamic H1 for a page.
 * Usage: const h1 = useDynamicH1("/formations/taxi", "Default H1 Text");
 */
export const useDynamicH1 = (pageUrl: string, defaultH1: string): string => {
  const { overrides } = useSEOOverrides(pageUrl);
  return overrides.h1 || defaultH1;
};
