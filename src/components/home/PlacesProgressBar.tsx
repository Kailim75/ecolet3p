import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

interface PlacesProgressBarProps {
  category?: string;
  className?: string;
}

interface SessionData {
  month: string;
  totalPlaces: number;
  placesLeft: number;
}

const formatMonth = (dateString: string) =>
  new Date(dateString).toLocaleDateString("fr-FR", { month: "long", year: "numeric" });

const PlacesProgressBar = ({ category, className = "" }: PlacesProgressBarProps) => {
  const [data, setData] = useState<SessionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [width, setWidth] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchNextSession = async () => {
      setIsLoading(true);
      let query = supabase
        .from("formation_sessions")
        .select("start_date, max_participants, current_participants, formation_id, formations(category)")
        .in("status", ["upcoming", "ongoing"])
        .order("start_date", { ascending: true })
        .limit(20);

      const { data: sessions } = await query;
      if (!sessions || sessions.length === 0) { setIsLoading(false); return; }

      const filtered = category
        ? sessions.filter((s: any) => s.formations?.category === category)
        : sessions;

      if (filtered.length === 0) { setIsLoading(false); return; }

      const nearestDate = filtered[0].start_date;
      const sameDateSessions = filtered.filter((s: any) => s.start_date === nearestDate);

      const totalPlaces = sameDateSessions.reduce((sum: number, s: any) => sum + s.max_participants, 0);
      const currentParticipants = sameDateSessions.reduce((sum: number, s: any) => sum + s.current_participants, 0);

      setData({
        month: formatMonth(nearestDate),
        totalPlaces,
        placesLeft: totalPlaces - currentParticipants,
      });
      setIsLoading(false);
    };

    fetchNextSession();
  }, [category]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started || !data) return;
    const filled = ((data.totalPlaces - data.placesLeft) / data.totalPlaces) * 100;
    const timer = setTimeout(() => setWidth(filled), 300);
    return () => clearTimeout(timer);
  }, [started, data]);

  if (isLoading) {
    return (
      <div className={`bg-gradient-to-br from-orange/10 to-orange/5 border border-orange/20 rounded-xl p-4 ${className}`}>
        <div className="flex justify-between items-center mb-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-2.5 w-full rounded-full" />
        <div className="flex justify-end mt-1.5">
          <Skeleton className="h-3 w-28" />
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div
      ref={ref}
      className={`bg-gradient-to-br from-orange/10 to-orange/5 border border-orange/20 rounded-xl p-4 ${className}`}
    >
      <div className="flex justify-between items-center mb-2 gap-2">
        <span className="text-xs font-semibold text-orange flex items-center gap-1 flex-shrink-0">
          🔥 Session de {data.month}
        </span>
        <span className="text-xs font-bold flex-shrink-0" style={{ color: "#E74C3C", fontWeight: 700 }}>
          Plus que {data.placesLeft} places !
        </span>
      </div>
      <div className="w-full h-2.5 bg-orange/15 rounded-full overflow-hidden places-bar-pulse">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: "linear-gradient(90deg, #F39C12, #E74C3C)",
            width: `${width}%`,
            transition: "width 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
      </div>
      <p className="text-[11px] text-muted-foreground mt-1.5 text-right">
        {data.totalPlaces - data.placesLeft}/{data.totalPlaces} places réservées
      </p>
    </div>
  );
};

export default PlacesProgressBar;
