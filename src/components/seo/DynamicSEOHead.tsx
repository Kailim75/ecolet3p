import { Helmet } from "react-helmet-async";
import { useSEOOverrides } from "@/hooks/useSEOOverrides";

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
 * If an admin has approved an AI fix for title/description/og_title/og_description/h1,
 * it will override the static defaults.
 * 
 * Use the `h1` return value to render the page's H1 dynamically:
 * const { h1 } = DynamicSEOHead(...)  — or use the useDynamicH1 hook directly.
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

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
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
