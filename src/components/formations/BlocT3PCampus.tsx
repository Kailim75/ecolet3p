import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, ListChecks, Timer } from "lucide-react";
import t3pCampus from "@/data/t3pCampus.json";

interface BlocT3PCampusProps {
  /** Passerelle : l'élève ne prépare que les épreuves de sa nouvelle carte. */
  variante?: "formation" | "passerelle";
}

/**
 * Le renvoi vers T3P Campus, la préparation en ligne de l'école, sur les pages
 * des formations initiales et de la passerelle.
 *
 * Jusqu'au 01/10/2026, aucune page d'ecolet3p.fr ne menait au site
 * d'entraînement : Google ne le connaissait pas, et un candidat qui lisait
 * la page Taxi ne savait pas qu'il pouvait se tester tout de suite. Les
 * chiffres viennent de src/data/t3pCampus.json, jamais recopiés ici.
 */
const BlocT3PCampus = ({ variante = "formation" }: BlocT3PCampusProps) => {
  const fmt = (n: number) => n.toLocaleString("fr-FR");
  const points = [
    { icon: ListChecks, texte: `${fmt(t3pCampus.questions)} questions corrigées, annales comprises` },
    { icon: BookOpen, texte: `${t3pCampus.fiches} fiches de cours : l'essentiel, les pièges de l'examen` },
    { icon: Timer, texte: `${t3pCampus.examensBlancs} examens blancs chronométrés, épreuve par épreuve` },
  ];

  return (
    <section className="section-padding bg-background" aria-labelledby="titre-t3p-campus">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto rounded-2xl border border-border bg-card p-6 md:p-10">
          <p className="text-xs font-bold uppercase tracking-wider text-accent mb-3">T3P Campus, notre site d'entraînement</p>
          <h2 id="titre-t3p-campus" className="section-title mb-4">
            Entraînez-vous en ligne, avant et pendant {variante === "passerelle" ? "votre passerelle" : "la formation"}
          </h2>
          <p className="text-muted-foreground mb-6">
            {variante === "passerelle"
              ? "Sur T3P Campus, vous ne révisez que les épreuves de votre nouvelle carte, avec les mêmes formateurs qu'à Montrouge."
              : "Les élèves du centre révisent sur T3P Campus entre deux cours. Un candidat qui prépare l'examen à distance y trouve la même banque de questions, les mêmes fiches et les mêmes examens blancs, corrigés par les formateurs de Montrouge."}
          </p>
          <ul className="grid sm:grid-cols-3 gap-4 mb-8">
            {points.map((p) => (
              <li key={p.texte} className="flex items-start gap-3">
                <span className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                  <p.icon className="w-4 h-4 text-primary" aria-hidden="true" />
                </span>
                <span className="text-sm font-medium text-foreground">{p.texte}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={t3pCampus.urlEssai}
              className="btn-cta-orange inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold"
            >
              Essai gratuit : {t3pCampus.questionsEssai} questions, sans compte
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
            <Link
              to="/preparation-examen-en-ligne"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary px-6 py-3 font-semibold text-primary hover:bg-secondary transition-colors"
            >
              La préparation en ligne, en détail
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlocT3PCampus;
