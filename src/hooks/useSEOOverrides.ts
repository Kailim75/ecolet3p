import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface SEOOverride {
  field: string;
  value: string;
}

export interface SEOOverridesMap {
  title?: string;
  description?: string;
  h1?: string;
  og_title?: string;
  og_description?: string;
}

// Cache de session des surcharges SEO.
// Sans lui, chaque retour sur une page refait l'appel réseau : le H1 et le titre
// s'affichent d'abord avec leur valeur par défaut puis BASCULENT quand la réponse
// arrive — sur l'accueil, la cascade d'animation du héros rejouait à chaque fois.
// Les surcharges changent rarement : une lecture par session suffit.
const overridesCache = new Map<string, SEOOverridesMap>();

const readSessionCache = (pageUrl: string): SEOOverridesMap | undefined => {
  if (overridesCache.has(pageUrl)) return overridesCache.get(pageUrl);
  try {
    const raw = sessionStorage.getItem("t3p-seo-overrides:" + pageUrl);
    if (raw) {
      const parsed = JSON.parse(raw) as SEOOverridesMap;
      overridesCache.set(pageUrl, parsed);
      return parsed;
    }
  } catch { /* stockage indisponible : on fera l'appel réseau */ }
  return undefined;
};

/**
 * Fetches dynamic SEO overrides for a given page URL from seo_overrides table.
 * These overrides come from approved AI fixes in the SEO dashboard.
 */
export const useSEOOverrides = (pageUrl: string) => {
  const [overrides, setOverrides] = useState<SEOOverridesMap>(() => readSessionCache(pageUrl) ?? {});
  const [loading, setLoading] = useState(() => readSessionCache(pageUrl) === undefined);

  useEffect(() => {
    if (!pageUrl) {
      setLoading(false);
      return;
    }

    const cached = readSessionCache(pageUrl);
    if (cached !== undefined) {
      setOverrides(cached);
      setLoading(false);
      return;
    }

    const fetchOverrides = async () => {
      try {
        const { data, error } = await supabase
          .from("seo_overrides")
          .select("field, value")
          .eq("page_url", pageUrl);

        if (error) throw error;

        const map: SEOOverridesMap = {};
        (data || []).forEach((row: SEOOverride) => {
          (map as any)[row.field] = row.value;
        });
        setOverrides(map);
        overridesCache.set(pageUrl, map);
        try {
          sessionStorage.setItem("t3p-seo-overrides:" + pageUrl, JSON.stringify(map));
        } catch { /* stockage indisponible : sans conséquence */ }
      } catch (err) {
        console.error("Error fetching SEO overrides:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOverrides();
  }, [pageUrl]);

  return { overrides, loading };
};
