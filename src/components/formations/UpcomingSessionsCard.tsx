import { Calendar, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Session {
  id: string;
  start_date: string;
  start_time: string;
  end_time: string;
  max_participants: number;
  current_participants: number;
  formation_title?: string;
}

const fallbackSessions = [
  { id: "f1", label: "Lundi 16 mars 2026", time: "9h00 - 17h00", spots: 5 },
  { id: "f2", label: "Lundi 6 avril 2026", time: "9h00 - 17h00", spots: 8 },
  { id: "f3", label: "Lundi 4 mai 2026", time: "18h00 - 22h00", spots: 3 },
];

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

interface UpcomingSessionsCardProps {
  sessions: Session[];
  onRegister: () => void;
}

const UpcomingSessionsCard = ({ sessions, onRegister }: UpcomingSessionsCardProps) => {
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
              const full = spots <= 0;
              return (
                <div
                  key={session.id}
                  className="border-l-4 border-[#D4A017] bg-white rounded-r-lg p-4 flex items-center justify-between"
                >
                  <div>
                    {session.formation_title && (
                      <p className="text-xs font-semibold text-[#D4A017] mb-0.5">{session.formation_title}</p>
                    )}
                    <p className="font-semibold capitalize">{formatDate(session.start_date)}</p>
                    <p className="text-sm text-muted-foreground">
                      {session.start_time} – {session.end_time}
                    </p>
                  </div>
                  <div>
                    {full ? (
                      <Badge variant="secondary">Complet</Badge>
                    ) : (
                      <Badge className="bg-[#D4A017]/10 text-[#D4A017] border-[#D4A017]/30">
                        <Users className="h-3 w-3 mr-1" />
                        {spots} places
                      </Badge>
                    )}
                  </div>
                </div>
              );
            })
          : fallbackSessions.map((s) => (
              <div
                key={s.id}
                className="border-l-4 border-[#D4A017] bg-white rounded-r-lg p-4 flex items-center justify-between"
              >
                <div>
                  <p className="font-semibold">{s.label}</p>
                  <p className="text-sm text-muted-foreground">{s.time}</p>
                </div>
                <Badge className="bg-[#D4A017]/10 text-[#D4A017] border-[#D4A017]/30">
                  <Users className="h-3 w-3 mr-1" />
                  {s.spots} places
                </Badge>
              </div>
            ))}
      </div>

      <Button className="w-full mt-4 btn-cta-orange" onClick={onRegister}>
        Réserver ma place
      </Button>
    </div>
  );
};

export default UpcomingSessionsCard;
