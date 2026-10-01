import { Link } from "react-router-dom";
import { ArrowRight, Check, ExternalLink } from "lucide-react";
import tarifs from "@/data/tarifs.json";
import t3pCampus from "@/data/t3pCampus.json";
import agrements from "@/data/agrements.json";

// Mise en avant du moto-taxi : dans les Hauts-de-Seine, seuls deux centres sont agréés.
// Le chiffre vient de la liste officielle de la préfecture des Hauts-de-Seine
// (src/data/agrements.json → sourceListes) : ne l'élargir à un autre territoire
// que si la liste de ce territoire a été lue (au 01/10/2026, 5 préfectures d'Île-de-France
// ne publient aucune liste VMDTR : aucun chiffre régional n'est vérifiable).
const VmdtrSection = () => (
  <section className="section-padding bg-primary" aria-labelledby="vmdtr-titre">
    <div className="container-custom grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-cream mb-3">Moto-taxi · VMDTR</p>
        <h2 id="vmdtr-titre" className="text-3xl md:text-4xl font-bold text-white mb-5 text-balance">
          Moto-taxi : une formation rare dans les Hauts-de-Seine
        </h2>
        <p className="text-white/85 text-base md:text-lg leading-relaxed mb-4">
          Selon la liste officielle de la préfecture mise à jour le {agrements.vmdtrListeMiseAJour}, seuls{" "}
          {agrements.vmdtrCentresAgreesDepartement} centres des Hauts-de-Seine sont agréés pour former les
          conducteurs de moto-taxi. ECOLE T3P est l'un d'eux, sous le n° {agrements.vmdtr}, valable jusqu'au{" "}
          {agrements.vmdtrValidite}.
        </p>
        <a
          href={agrements.sourceListes}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-white underline underline-offset-4 decoration-white/40 hover:decoration-white"
        >
          Voir la liste officielle de la préfecture
          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
        </a>
      </div>

      <div className="rounded-2xl bg-white/10 border border-white/15 p-6 md:p-8">
        <ul className="space-y-4 mb-7">
          <li className="flex items-start gap-3 text-white">
            <Check className="w-5 h-5 mt-0.5 shrink-0 text-gold-light" aria-hidden="true" />
            <span>
              <strong>En salle à Montrouge</strong> : {tarifs.dureeInitialeHeures} heures, {tarifs.initiale} € tout
              compris, moto d'examen fournie.
            </span>
          </li>
          <li className="flex items-start gap-3 text-white">
            <Check className="w-5 h-5 mt-0.5 shrink-0 text-gold-light" aria-hidden="true" />
            <span>
              <strong>Ou en ligne</strong>, depuis chez vous : {t3pCampus.prixFormationEnLigne} € frais d'examen
              compris.
            </span>
          </li>
          <li className="flex items-start gap-3 text-white">
            <Check className="w-5 h-5 mt-0.5 shrink-0 text-gold-light" aria-hidden="true" />
            <span>Pour les titulaires du permis A depuis au moins 3 ans.</span>
          </li>
        </ul>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/formations/vmdtr"
            className="btn-cta-orange px-6 py-3.5 text-base font-bold rounded-lg inline-flex items-center justify-center gap-2"
          >
            Découvrir la formation VMDTR
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
          <Link
            to="/preparation-examen-en-ligne"
            className="px-6 py-3.5 text-base font-bold rounded-lg inline-flex items-center justify-center gap-2 border-2 border-white/70 text-white hover:bg-white hover:text-primary transition-colors"
          >
            Se former en ligne
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default VmdtrSection;
