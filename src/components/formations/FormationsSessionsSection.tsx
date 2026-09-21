import { Link } from "react-router-dom";
import { CalendarDays, Users, Clock, Info } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { formatSessionPeriod } from "@/lib/formatSessionPeriod";
import { getSessionFormat } from "@/lib/sessionFormat";

/**
 * Reprend le design des cartes de UpcomingSessionsSection (accueil),
 * mais affiche TOUTES les sessions à venir (pas de limite à 4).
 */
interface SessionWithFormation {
  id: string;
  start_date: string;
  end_date: string | null;
  start_time: string;
  end_time: string;
  max_participants: number;
  current_participants: number;
  status: string;
  notes: string | null;
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

const FormationsSessionsSection = () => {
  const [sessions, setSessions] = useState<SessionWithFormation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      const { data, error } = await supabase
        .from("formation_sessions")
        .select("id, start_date, end_date, start_time, end_time, max_participants, current_participants, status, notes, formations(title, category)")
        .eq("status", "upcoming")
        .gte("start_date", new Date().toISOString().slice(0, 10))
        .order("start_date", { ascending: true })
        .order("start_time", { ascending: true });

      if (!error && data) {
        setSessions(data.map((s: any) => ({
          id: s.id,
          start_date: s.start_date,
          end_date: s.end_date,
          start_time: s.start_time,
          end_time: s.end_time,
          max_participants: s.max_participants,
          current_participants: s.current_participants,
          status: s.status,
          notes: s.notes,
          formation_title: s.formations?.title || "",
          formation_category: s.formations?.category || "",
        })));
      }
      setIsLoading(false);
    };
    fetchSessions();
  }, []);

  if (isLoading) {
    return (
      <section id="sessions" className="py-10 md:py-16 bg-white scroll-mt-14">
        <div className="container-custom">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-black text-foreground">Prochaines sessions</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
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
    <section id="sessions" className="py-10 md:py-16 bg-white scroll-mt-14">
      <div className="container-custom">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-black text-foreground mb-2">Prochaines sessions</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Places limitées à 12 stagiaires par session — réservez la vôtre dès maintenant.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sessions.map((session) => {
            const spots = session.max_participants - session.current_participants;
            const full = spots <= 0;
            const urgent = spots > 0 && spots <= 3;
            const link = categoryLinks[session.formation_category] || "/formations";
            const fmt = getSessionFormat(session.start_time);
            const FmtIcon = fmt.Icon;

            return (
              <Link
                key={session.id}
                to={full ? "/contact" : link}
                className="card-t3p flex flex-col gap-3 group relative overflow-hidden"
              >
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className={`inline-block text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide ${categoryColors[session.formation_category] || "bg-muted text-foreground"}`}>
                    {session.formation_category?.toUpperCase() || "Formation"}
                  </span>
                  <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide ${fmt.className}`}>
                    <FmtIcon className="w-3 h-3" />
                    {fmt.label}
                  </span>
                </div>

                <h3 className="text-base font-bold text-primary leading-snug">
                  {session.formation_title}
                </h3>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarDays className="w-4 h-4 text-primary shrink-0" />
                  <span>{formatSessionPeriod(session.start_date, session.end_date)}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 text-primary shrink-0" />
                  <span>{session.start_time.slice(0, 5)} – {session.end_time.slice(0, 5)}</span>
                </div>

                {session.notes && (
                  <div className="flex items-start gap-2 text-xs text-muted-foreground bg-muted/50 rounded-md px-2 py-1.5">
                    <Info className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <span>{session.notes}</span>
                  </div>
                )}

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
                  ) : session.current_participants === 0 ? (
                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-primary" />
                      <span className="text-sm font-bold text-primary">{spots} places disponibles</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-primary" />
                        <span className={`text-sm font-bold ${urgent ? "text-accent" : "text-primary"}`}>
                          Plus que {spots} place{spots > 1 ? "s" : ""}
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
      </div>
    </section>
  );
};

export default FormationsSessionsSection;
