import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";
import { DEPARTEMENTS_IDF, METIER_LABELS, type Metier } from "@/data/departementsIdfData";

interface Props {
  metier: Metier;
}

/**
 * Maillage interne SEO vers les 8 pages départementales (75, 77, 78, 91, 92, 93, 94, 95).
 * Affiché sur les pages principales /formations/{vtc|taxi|vmdtr}.
 */
const DepartementLinksBlock = ({ metier }: Props) => {
  const label = METIER_LABELS[metier];

  return (
    <section className="section-padding bg-background border-t border-border">
      <div className="container-custom">
        <div className="text-center mb-8 max-w-2xl mx-auto">
          <h2 className="section-title mb-2">
            Formation {label.short} par département en Île-de-France
          </h2>
          <p className="text-muted-foreground text-sm">
            Notre centre de Montrouge (92) accueille les candidats des 8 départements
            franciliens. Retrouvez les informations préfecture, médecins agréés et
            démarches spécifiques à votre département.
          </p>
        </div>

        <nav
          aria-label={`Formation ${label.short} par département`}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-w-4xl mx-auto"
        >
          {DEPARTEMENTS_IDF.map((dept) => (
            <Link
              key={dept.code}
              to={`/formations/${metier}/${dept.code}`}
              className="card-t3p group flex items-start gap-2 p-3"
            >
              <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-primary">
                  {dept.nom} ({dept.code})
                </div>
                <div className="text-[11px] text-muted-foreground truncate">
                  Formation {label.short}
                </div>
                <span className="text-[11px] font-semibold text-accent inline-flex items-center gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Voir <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
};

export default DepartementLinksBlock;
