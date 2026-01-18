import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface FormationSession {
  id: string;
  formation_id: string;
  start_date: string;
  end_date: string | null;
  start_time: string;
  end_time: string;
  location: string | null;
  max_participants: number;
  current_participants: number;
  price_override: number | null;
  status: string;
  notes: string | null;
}

export const useFormationSessions = (formationId?: string) => {
  const [sessions, setSessions] = useState<FormationSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSessions = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      let query = supabase
        .from("formation_sessions")
        .select("*")
        .in("status", ["upcoming", "ongoing"])
        .order("start_date", { ascending: true });

      if (formationId) {
        query = query.eq("formation_id", formationId);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;
      setSessions(data || []);
    } catch (err: any) {
      console.error("Error fetching sessions:", err);
      setError(err.message || "Erreur lors du chargement des sessions");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, [formationId]);

  return { sessions, isLoading, error, refetch: fetchSessions };
};

// Get available spots for a session
export const getAvailableSpots = (session: FormationSession): number => {
  return session.max_participants - session.current_participants;
};

// Check if session is full
export const isSessionFull = (session: FormationSession): boolean => {
  return getAvailableSpots(session) <= 0;
};
