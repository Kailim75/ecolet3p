import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Users, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FormationSession, getAvailableSpots, isSessionFull } from "@/hooks/useFormationSessions";

interface SessionCardProps {
  session: FormationSession;
  onRegister?: (session: FormationSession) => void;
  compact?: boolean;
}

const SessionCard = ({ session, onRegister, compact = false }: SessionCardProps) => {
  const spots = getAvailableSpots(session);
  const isFull = isSessionFull(session);
  const startDate = new Date(session.start_date);

  if (compact) {
    return (
      <div
        className={`flex items-center justify-between p-3 rounded-lg border ${
          isFull ? "bg-orange-50 border-orange-200" : "bg-muted/50 border-border"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-forest/10 flex flex-col items-center justify-center shrink-0">
            <span className="text-[10px] text-forest/70 uppercase leading-none">
              {format(startDate, "MMM", { locale: fr })}
            </span>
            <span className="text-sm font-bold text-forest leading-none">
              {format(startDate, "dd")}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-forest">
              {format(startDate, "EEEE d MMMM", { locale: fr })}
            </p>
            <p className="text-xs text-muted-foreground">
              {session.start_time} - {session.end_time}
              {session.location && ` • ${session.location}`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isFull ? (
            <Badge variant="outline" className="text-orange-600 border-orange-300">
              Complet
            </Badge>
          ) : (
            <Badge variant="outline" className="text-green-600 border-green-300">
              {spots} place{spots > 1 ? "s" : ""}
            </Badge>
          )}
          {onRegister && !isFull && (
            <Button
              size="sm"
              onClick={() => onRegister(session)}
              className="btn-primary h-8"
            >
              Réserver
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-xl p-4 border ${
        isFull
          ? "bg-orange-50 border-orange-200"
          : "bg-white border-border hover:border-forest/30"
      } transition-colors`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        {/* Date badge */}
        <div className="w-16 h-16 rounded-xl bg-forest/10 flex flex-col items-center justify-center shrink-0">
          <span className="text-xs text-forest/70 uppercase">
            {format(startDate, "MMM", { locale: fr })}
          </span>
          <span className="text-2xl font-bold text-forest">
            {format(startDate, "dd")}
          </span>
          <span className="text-xs text-forest/70">
            {format(startDate, "yyyy")}
          </span>
        </div>

        {/* Details */}
        <div className="flex-1">
          <p className="font-semibold text-forest mb-1">
            {format(startDate, "EEEE d MMMM yyyy", { locale: fr })}
          </p>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {session.start_time} - {session.end_time}
            </span>
            {session.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {session.location}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              {session.current_participants}/{session.max_participants}
            </span>
          </div>
          {session.end_date && session.end_date !== session.start_date && (
            <p className="text-xs text-muted-foreground mt-1">
              Jusqu'au {format(new Date(session.end_date), "d MMMM yyyy", { locale: fr })}
            </p>
          )}
        </div>

        {/* Action */}
        <div className="flex items-center gap-2 shrink-0">
          {isFull ? (
            <div className="flex items-center gap-2 text-orange-600">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Complet</span>
            </div>
          ) : (
            <>
              <Badge className="bg-green-100 text-green-700">
                {spots} place{spots > 1 ? "s" : ""} disponible{spots > 1 ? "s" : ""}
              </Badge>
              {onRegister && (
                <Button
                  onClick={() => onRegister(session)}
                  className="btn-primary"
                >
                  Réserver
                </Button>
              )}
            </>
          )}
        </div>
      </div>

      {session.price_override && (
        <div className="mt-3 pt-3 border-t border-border">
          <p className="text-sm">
            <span className="text-muted-foreground">Prix pour cette session :</span>{" "}
            <span className="font-bold text-forest">{session.price_override.toFixed(0)} €</span>
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default SessionCard;
