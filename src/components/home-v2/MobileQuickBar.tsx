import { Link } from "react-router-dom";

const quickLinks = [
  { label: "Je veux devenir VTC", path: "/formations/vtc" },
  { label: "Je veux devenir TAXI", path: "/formations/taxi" },
  { label: "Je veux renouveler ma carte", path: "/formations/continue-vtc" },
  { label: "Location véhicule examen", path: "/services/location-vehicule-examen" },
  { label: "Je veux récupérer mes points", path: "/stage-recuperation-points" },
];

const MobileQuickBar = () => {
  return (
    <div className="lg:hidden bg-card border-b border-border sticky top-16 z-40">
      <div className="flex gap-2 overflow-x-auto px-4 py-2.5 scrollbar-hide">
        {quickLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className="shrink-0 text-xs font-semibold px-4 py-2 rounded-full bg-secondary text-primary border border-primary/15 hover:bg-primary hover:text-primary-foreground transition-colors whitespace-nowrap"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileQuickBar;
