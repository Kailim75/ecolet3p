/**
 * Single source of truth for the canonical domain.
 * All absolute URLs (sitemap, canonical, OG, JSON-LD, internal links)
 * MUST use this base. Non-www, HTTPS only.
 */
export const SITE_URL = "https://ecolet3p.fr";

/**
 * Builds the canonical URL for a given pathname.
 * - Always absolute, using SITE_URL
 * - Strips trailing slash (except for "/")
 * - Ensures leading slash
 *
 * Usage:
 *   getCanonicalUrl("/formations/vtc")  → "https://ecolet3p.fr/formations/vtc"
 *   getCanonicalUrl("/")                → "https://ecolet3p.fr/"
 */
export const getCanonicalUrl = (pathname: string): string => {
  // Ensure leading slash
  const cleanPath = pathname.startsWith("/") ? pathname : `/${pathname}`;

  // For root, keep trailing slash
  if (cleanPath === "/") {
    return `${SITE_URL}/`;
  }

  // Remove trailing slash for all other paths
  const normalized = cleanPath.endsWith("/") ? cleanPath.slice(0, -1) : cleanPath;

  return `${SITE_URL}${normalized}`;
};
