import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Formation {
  id: string;
  title: string;
  description: string | null;
  duration: string;
  price: number | null;
  category: string;
  icon: string | null;
  features: string[] | null;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export const useFormations = (onlyActive: boolean = true) => {
  const [formations, setFormations] = useState<Formation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFormations = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      let query = supabase
        .from("formations")
        .select("*")
        .order("display_order", { ascending: true });

      if (onlyActive) {
        query = query.eq("is_active", true);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;
      setFormations(data || []);
    } catch (err: any) {
      console.error("Error fetching formations:", err);
      setError(err.message || "Erreur lors du chargement des formations");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFormations();
  }, [onlyActive]);

  return { formations, isLoading, error, refetch: fetchFormations };
};

// Helper to get category display name
export const getCategoryLabel = (category: string): string => {
  const labels: Record<string, string> = {
    taxi: "TAXI",
    vtc: "VTC",
    vmdtr: "VMDTR",
    tpmr: "TPMR",
    continue: "Formation Continue",
    mobilite: "Mobilité",
    general: "Général",
  };
  return labels[category] || category;
};

// Helper to map category to filter
export const getCategoryFilter = (category: string): string => {
  if (category === "taxi") return "TAXI";
  if (category === "vtc") return "VTC";
  return "Autres";
};
