import { Calendar, Users, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface Session {
  id: string;
  start_date: string;
  start_time: string;
  end_time: string;
  max_participants: number;
  current_participants: number;
  formation_title?: string;
}

interface FallbackSession {
  id: string;
  label: string;
  time: string;
  spots: number;
}

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

interface UpcomingSessionsCardProps {
  sessions: Session[];
  onRegister: () => void;
  fallbackSessions?: FallbackSession[];
}

const defaultFallbackSessions: FallbackSession[] = [
  { id: "f1", label: "16 mars 2026", time: "9h30 – 16h30", spots: 12 },
  { id: "f2", label: "6 avril 2026", time: "9h30 – 16h30", spots: 8 },
  { id: "f3", label: "4 mai 2026", time: "9h30 – 16h30", spots: 0 },
];

const SessionRow = ({
  label,
  time,
  spots,
  onRegister,
}: {
  label: string;
  time: string;
  spots: number;
  onRegister: () => void;
}) => {
  const full = spots <= 0;
  return (
    <div className="border-l-4 border-[#D4A017] bg-white rounded-r-lg p-4 space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold capitalize">{label}</p>
          <p className="text-sm text-muted-foreground">{time}</p>
        </div>
        <div>
          {full ? (
            <Badge variant="destructive">Complet</Badge>
          ) : (
            <Badge className="bg-[#D4A017]/10 text-[#D4A017] border-[#D4A017]/30">
              <Users className="h-3 w-3 mr-1" />
              {spots} places
            </Badge>
          )}
        </div>
      </div>
      {full ? (
        <Button
          variant="outline"
          size="sm"
          className="w-full border-[#D4A017] text-[#D4A017] hover:bg-[#D4A017]/5"
          onClick={onRegister}
        >
          Rejoindre la liste d'attente
        </Button>
      ) : (
        <Button
          size="sm"
          className="w-full bg-[#E67E22] hover:bg-[#CF6D17] text-white"
          onClick={onRegister}
        >
          Réserver cette session
        </Button>
      )}
    </div>
  );
};

const UpcomingSessionsCard = ({
  sessions,
  onRegister,
  fallbackSessions,
}: UpcomingSessionsCardProps) => {
  const fallback = fallbackSessions || defaultFallbackSessions;
  const hasSessions = sessions.length > 0;

  return (
    <div className="rounded-xl bg-[#FFFBF0] border border-[#F0E6C8] p-6">
      <h3 className="flex items-center gap-2 text-lg font-bold text-foreground mb-4">
        <Calendar className="h-5 w-5 text-[#D4A017]" />
        Prochaines sessions
      </h3>

      <div className="space-y-3">
        {hasSessions
          ? sessions.map((session) => {
              const spots = session.max_participants - session.current_participants;
              return (
                <div key={session.id}>
                  {session.formation_title && (
                    <p className="text-xs font-semibold text-[#D4A017] mb-1 ml-1">
                      {session.formation_title}
                    </p>
                  )}
                  <SessionRow
                    label={formatDate(session.start_date)}
                    time={`${session.start_time} – ${session.end_time}`}
                    spots={spots}
                    onRegister={onRegister}
                  />
                </div>
              );
            })
          : fallback.map((s) => (
              <SessionRow
                key={s.id}
                label={s.label}
                time={s.time}
                spots={s.spots}
                onRegister={onRegister}
              />
            ))}
      </div>

      <Link
        to="/contact"
        className="flex items-center justify-center gap-1 mt-4 text-sm font-medium text-[#D4A017] hover:text-[#B8860B] transition-colors"
      >
        Voir toutes les dates
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
};

export default UpcomingSessionsCard;
