import React from "react";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, ExternalLink, CheckCircle, AlertTriangle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/ui/AnimatedSection";

const conditions = [
  { label: "Permis de conduire", detail: "Permis valide autorisant la conduite du véhicule utilisé, délai probatoire expiré" },
  { label: "Aptitude professionnelle", detail: "Réussite à l'examen CMA (admissibilité théorique + admission pratique)" },
  { label: "Honorabilité professionnelle", detail: "Absence de condamnations incompatibles (Art. R3120-8 Code des Transports)" },
];

const documents = [
  "Document d'identité en cours de validité",
  "Permis de conduire en cours de validité",
  "Justificatif de domicile ou attestation d'hébergement (< 3 mois)",
  "Photo d'identité + signature",
  "Certificat médical CERFA n° 14880*02 (< 2 ans, médecin agréé préfecture)",
  "Attestation d'aptitude professionnelle délivrée par la CMA",
  "Taxi uniquement : attestation PSC1 ou équivalent (< 2 ans)",
];

const demarcheLinks = [
  { profession: "Taxi", url: "https://www.demarches-simplifiees.fr/commencer/demande-de-carte-pro-de-taxi-examen", color: "#D35400" },
  { profession: "VTC", url: "https://www.demarches-simplifiees.fr/commencer/demande-de-carte-pro-de-vtc-examen", color: "#1E8449" },
  { profession: "VMDTR", url: "https://www.demarches-simplifiees.fr/commencer/demande-de-carte-pro-de-vmdtr-examen", color: "#1A5276" },
];

const CMAConditionsSection = () => {
  return (
    <AnimatedSection className="mt-12">
      <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "rgba(27,77,62,0.12)" }}>
        {/* Header */}
        <div className="px-6 py-5 md:px-8 md:py-6" style={{ background: "linear-gradient(135deg, rgba(27,77,62,0.05) 0%, rgba(26,82,118,0.05) 100%)" }}>
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-5 h-5" style={{ color: "#1B4D3E" }} />
            <h2 className="font-serif text-lg md:text-xl font-bold" style={{ color: "#1A1A1A" }}>
              Conditions d'accès aux professions T3P
            </h2>
          </div>
          <p className="text-sm" style={{ color: "#666" }}>
            Source : Chambre de Métiers et de l'Artisanat Île-de-France (oct. 2025)
          </p>
        </div>

        {/* Tableau synthétique — desktop */}
        <div className="px-6 md:px-8 py-5">
          <h3 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: "#1B4D3E" }}>
            3 conditions obligatoires
          </h3>

          {/* Desktop: table */}
          <div className="hidden md:block rounded-xl border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "hsl(var(--foreground))" }}>
                  <th className="px-4 py-2.5 text-left font-bold text-xs uppercase tracking-wider" style={{ color: "hsl(var(--primary-foreground))" }}>Condition</th>
                  <th className="px-4 py-2.5 text-left font-bold text-xs uppercase tracking-wider" style={{ color: "hsl(var(--primary-foreground))" }}>Détail</th>
                </tr>
              </thead>
              <tbody>
                {conditions.map((c, i) => (
                  <tr key={i} className="border-b last:border-b-0" style={{ borderColor: "hsl(var(--border))" }}>
                    <td className="px-4 py-3 font-semibold whitespace-nowrap" style={{ color: "#1A1A1A" }}>
                      <span className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: "#1B4D3E" }} />
                        {c.label}
                      </span>
                    </td>
                    <td className="px-4 py-3" style={{ color: "#555" }}>{c.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile: cards */}
          <div className="flex flex-col gap-3 md:hidden">
            {conditions.map((c, i) => (
              <div
                key={i}
                className="rounded-xl border p-4"
                style={{ borderColor: "hsl(var(--border))", backgroundColor: "rgba(27,77,62,0.02)" }}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: "#1B4D3E" }} />
                  <span className="font-semibold text-sm" style={{ color: "#1A1A1A" }}>{c.label}</span>
                </div>
                <p className="text-sm pl-6" style={{ color: "#555" }}>{c.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Documents requis */}
        <div className="px-6 md:px-8 py-5 border-t" style={{ borderColor: "hsl(var(--border))" }}>
          <h3 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: "#1B4D3E" }}>
            Documents requis pour la carte professionnelle
          </h3>
          <ul className="space-y-2">
            {documents.map((doc, i) => (
              <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "#444" }}>
                <FileText className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: "#999" }} />
                {doc}
              </li>
            ))}
          </ul>

          <div className="mt-4 p-3 rounded-lg flex items-start gap-2" style={{ backgroundColor: "rgba(243,156,18,0.06)", border: "1px solid rgba(243,156,18,0.15)" }}>
            <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#D35400" }} />
            <p className="text-xs" style={{ color: "#555" }}>
              Les démarches s'effectuent en ligne via <strong>Démarches Simplifiées</strong> après obtention de l'attestation d'aptitude.
            </p>
          </div>
        </div>

        {/* Liens Démarches Simplifiées */}
        <div className="px-6 md:px-8 py-5 border-t" style={{ borderColor: "hsl(var(--border))" }}>
          <h3 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: "#1B4D3E" }}>
            Demande de carte professionnelle en ligne
          </h3>
          <div className="flex flex-col sm:flex-row gap-2">
            {demarcheLinks.map((d) => (
              <a
                key={d.profession}
                href={d.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-semibold transition-all hover:shadow-md hover:-translate-y-0.5"
                style={{ borderColor: `${d.color}30`, color: d.color, backgroundColor: `${d.color}08` }}
              >
                Carte {d.profession}
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>

        {/* Download PDF */}
        <div className="px-6 md:px-8 py-4 border-t flex items-center justify-between" style={{ borderColor: "hsl(var(--border))", backgroundColor: "rgba(0,0,0,0.015)" }}>
          <span className="text-xs" style={{ color: "#888" }}>Document officiel CMA complet</span>
          <Button variant="outline" size="sm" className="gap-2 rounded-lg" asChild>
            <a href="/documents/cma-conditions-acces.pdf" download>
              <Download className="w-3.5 h-3.5" />
              Télécharger le PDF
            </a>
          </Button>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default CMAConditionsSection;
