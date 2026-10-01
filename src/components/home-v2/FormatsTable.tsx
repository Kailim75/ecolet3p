import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import tarifs from "@/data/tarifs.json";
import t3pCampus from "@/data/t3pCampus.json";

// Deux offres, deux prix : la formation en salle (990 €, véhicule d'examen fourni)
// et la formation en ligne sur T3P Campus (596 €, véhicule d'examen à louer).
// Il n'existe pas d'e-learning au prix de la formation en salle.
const formats = [
  {
    name: "Journée",
    lieu: "En salle à Montrouge",
    duration: "1 semaine",
    hours: "9h30 – 16h30",
    ideal: "En reconversion, disponible",
    vehicule: "Fourni",
    price: `${tarifs.initiale}€`,
    priceDetail: "tout compris",
  },
  {
    name: "Soir",
    lieu: "En salle à Montrouge",
    duration: "2 semaines",
    hours: "18h – 21h30",
    ideal: "Salarié, temps partiel",
    vehicule: "Fourni",
    price: `${tarifs.initiale}€`,
    priceDetail: "tout compris",
  },
  {
    name: "En ligne",
    lieu: "Sur T3P Campus, partout en France",
    duration: "À votre rythme",
    hours: "Libres",
    ideal: "Loin de Montrouge, emploi du temps chargé",
    vehicule: "À louer en plus",
    price: `${t3pCampus.prixFormationEnLigne}€`,
    priceDetail: "frais d'examen compris",
    link: "/preparation-examen-en-ligne",
  },
];

const rows: { label: string; key: "lieu" | "duration" | "hours" | "ideal" | "vehicule" }[] = [
  { label: "Où", key: "lieu" },
  { label: "Durée", key: "duration" },
  { label: "Horaires", key: "hours" },
  { label: "Idéal pour", key: "ideal" },
  { label: "Véhicule d'examen", key: "vehicule" },
];

const FormatsTable = () => {
  const isMobile = useIsMobile();

  return (
    <section className="section-padding bg-muted">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h2 className="section-title mb-4">En salle ou en ligne : à vous de choisir</h2>
          <p className="section-subtitle mx-auto">
            Le même centre, les mêmes formateurs, le même examen. En salle à {tarifs.initiale} € tout compris,
            ou en ligne à {t3pCampus.prixFormationEnLigne} € frais d'examen compris.
          </p>
        </div>

        {isMobile ? (
          <div className="flex flex-col gap-4">
            {formats.map((f) => (
              <div key={f.name} className="card-t3p p-5">
                <h3 className="text-lg font-bold text-primary mb-3">{f.name}</h3>
                <dl className="space-y-2 text-sm">
                  {rows.map((r) => (
                    <div key={r.key} className="flex justify-between gap-4">
                      <dt className="font-semibold text-foreground">{r.label}</dt>
                      <dd className="text-muted-foreground text-right max-w-[60%]">{f[r.key]}</dd>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-2 border-t border-border">
                    <dt className="font-semibold text-foreground">Prix</dt>
                    <dd className="text-right">
                      <span className="text-lg font-bold text-accent">{f.price}</span>
                      <span className="block text-xs text-muted-foreground">{f.priceDetail}</span>
                    </dd>
                  </div>
                </dl>
                {f.link && (
                  <Link
                    to={f.link}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-accent transition-colors"
                  >
                    Découvrir la formation en ligne
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-border bg-card">
            <table className="w-full text-sm md:text-base">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="px-4 py-4 text-left font-semibold" />
                  {formats.map((f) => (
                    <th key={f.name} className="px-4 py-4 text-center font-semibold">
                      {f.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.key} className="border-b border-border">
                    <td className="px-4 py-4 font-semibold text-foreground">{r.label}</td>
                    {formats.map((f) => (
                      <td key={f.name} className="px-4 py-4 text-center text-muted-foreground">
                        {f[r.key]}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <td className="px-4 py-4 font-semibold text-foreground">Prix</td>
                  {formats.map((f) => (
                    <td key={f.name} className="px-4 py-4 text-center">
                      <span className="block font-bold text-accent">{f.price}</span>
                      <span className="block text-xs text-muted-foreground">{f.priceDetail}</span>
                      {f.link && (
                        <Link
                          to={f.link}
                          className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-accent transition-colors"
                        >
                          Découvrir
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-6 text-center">
          <p className="text-muted-foreground text-sm md:text-base">
            Paiement en 4× sans frais avec Alma — en salle{" "}
            <span className="font-bold text-accent">{tarifs.almaInitiale4x}€/mois</span>, en ligne{" "}
            <span className="font-bold text-accent">{t3pCampus.mensualiteFormationEnLigne}€/mois</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FormatsTable;
