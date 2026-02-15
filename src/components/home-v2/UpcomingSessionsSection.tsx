import { Link } from "react-router-dom";
import { CalendarDays, Users, ArrowRight, Clock } from "lucide-react";
import { useFormationSessions, getAvailableSpots, isSessionFull } from "@/hooks/useFormationSessions";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface SessionWithFormation {
  id: string;
  start_date: string;
  end_date: string | null;
  start_time: string;
  end_time: string;
  max_participants: number;
  current_participants: number;
  status: string;
  formation_title: string;
  formation_category: string;
}

const categoryColors: Record<string, string> = {
  vtc: "bg-primary/10 text-primary",
  taxi: "bg-accent/10 text-accent",
  vmdtr: "bg-primary/15 text-primary",
};

const categoryLinks: Record<string, string> = {
  vtc: "/formations/vtc",
  taxi: "/formations/taxi",
  vmdtr: "/formations/vmdtr",
};

const UpcomingSessionsSection = () => {
  const [sessions, setSessions] = useState<SessionWithFormation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      const { data, error } = await supabase
        .from("formation_sessions")
        .select("id, start_date, end_date, start_time, end_time, max_participants, current_participants, status, formations(title, category)")
        .in("status", ["upcoming", "ongoing"])
        .order("start_date", { ascending: true })
        .limit(4);

      if (!error && data) {
        const mapped = data.map((s: any) => ({
          id: s.id,
          start_date: s.start_date,
          end_date: s.end_date,
          start_time: s.start_time,
          end_time: s.end_time,
          max_participants: s.max_participants,
          current_participants: s.current_participants,
          status: s.status,
          formation_title: s.formations?.title || "",
          formation_category: s.formations?.category || "",
        }));
        setSessions(mapped);
      }
      setIsLoading(false);
    };
    fetchSessions();
  }, []);

  if (isLoading) {
    return (
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="section-title mb-4">Prochaines sessions</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="card-t3p animate-pulse">
                <div className="h-5 bg-muted rounded w-24 mb-3" />
                <div className="h-6 bg-muted rounded w-full mb-2" />
                <div className="h-4 bg-muted rounded w-32 mb-4" />
                <div className="h-8 bg-muted rounded w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (sessions.length === 0) return null;

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h2 className="section-title mb-4">Prochaines sessions</h2>
          <p className="section-subtitle mx-auto">
            Places limitées — inscrivez-vous avant qu'il ne soit trop tard.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sessions.map((session) => {
            const spots = session.max_participants - session.current_participants;
            const full = spots <= 0;
            const urgent = spots > 0 && spots <= 3;
            const startDate = new Date(session.start_date);
            const link = categoryLinks[session.formation_category] || "/formations";

            return (
              <Link
                key={session.id}
                to={full ? "/contact" : link}
                className="card-t3p flex flex-col gap-3 group relative overflow-hidden"
              >
                {/* Category badge */}
                <span className={`inline-block self-start text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide ${categoryColors[session.formation_category] || "bg-muted text-foreground"}`}>
                  {session.formation_category?.toUpperCase() || "Formation"}
                </span>

                {/* Title */}
                <h3 className="text-base font-bold text-primary leading-snug">
                  {session.formation_title}
                </h3>

                {/* Date */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarDays className="w-4 h-4 text-primary shrink-0" />
                  <span className="capitalize">
                    {format(startDate, "d MMMM yyyy", { locale: fr })}
                  </span>
                </div>

                {/* Time */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 text-primary shrink-0" />
                  <span>{session.start_time.slice(0, 5)} – {session.end_time.slice(0, 5)}</span>
                </div>

                {/* Places */}
                <div className="mt-auto pt-3 border-t border-border">
                  {full ? (
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-destructive bg-destructive/10 px-2.5 py-1 rounded-full">
                        Complet
                      </span>
                      <span className="text-xs text-accent font-semibold">
                        Liste d'attente →
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-primary" />
                        <span className={`text-sm font-bold ${urgent ? "text-accent" : "text-primary"}`}>
                          {spots} place{spots > 1 ? "s" : ""} restante{spots > 1 ? "s" : ""}
                        </span>
                      </div>
                      {urgent && (
                        <span className="text-[10px] font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-full animate-pulse">
                          Dernières places
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/formations"
            className="inline-flex items-center gap-2 text-primary font-bold hover:text-accent transition-colors"
          >
            Voir toutes les formations et sessions
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default UpcomingSessionsSection;
