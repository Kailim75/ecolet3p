import { Link } from "react-router-dom";
import { CalendarDays, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getNextSession, admissibiliteSessions } from "@/data/cmaCalendarData";

const NextCMASessionBanner = () => {
  const next = getNextSession(admissibiliteSessions);
  if (!next) return null;

  return (
    <section className="py-8 md:py-12">
      <div className="container-custom">
        <div
          className="rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-5 md:gap-8"
          style={{
            background: "linear-gradient(135deg, rgba(26,82,118,0.04) 0%, rgba(27,77,62,0.04) 100%)",
            border: "1px solid rgba(26,82,118,0.12)",
          }}
        >
          <div className="flex items-center gap-4 flex-shrink-0">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "rgba(26,82,118,0.1)" }}
            >
              <CalendarDays className="w-6 h-6" style={{ color: "#1A5276" }} />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-serif font-bold text-base md:text-lg mb-1" style={{ color: "#1A1A1A" }}>
              Prochaine session CMA : {next.session} 2026
            </h3>
            <p className="text-sm flex items-center gap-1.5" style={{ color: "#666" }}>
              <Clock className="w-3.5 h-3.5 flex-shrink-0" />
              Date limite d'inscription : <strong style={{ color: "#D35400" }}>{next.inscriptionDeadline}</strong>
            </p>
          </div>

          <Button asChild variant="outline" className="rounded-xl font-semibold flex-shrink-0 hover:text-[#1A5276] hover:border-[#1A5276]">
            <Link to="/calendrier-examens">
              Voir le calendrier complet <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NextCMASessionBanner;
