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

/**
 * Fetches dynamic SEO overrides for a given page URL from seo_overrides table.
 * These overrides come from approved AI fixes in the SEO dashboard.
 */
export const useSEOOverrides = (pageUrl: string) => {
  const [overrides, setOverrides] = useState<SEOOverridesMap>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!pageUrl) {
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
