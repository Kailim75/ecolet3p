import { describe, it, expect } from "vitest";
import {
  parseAttestationText,
  frDateToIso,
  sessionLabelFromDates,
} from "@/lib/examResults";

// Gabarit identique aux attestations CMA, données fictives
const ADMIS = `ATTESTATION DE RÉUSSITE AUX
ÉPREUVES D’ADMISSIBILITÉ
de l’examen d’accès à la profession de conducteur de VTC
Monsieur Jean Pierre DUPONT-TEST,
Né le 05/03/1990 à PARIS (FRANCE) demeurant : 1 rue de l'Exemple - 75001 PARIS
Numéro de dossier : 00012345 - Département d'exercice : 75
est considéré ADMISSIBLE au passage de l’épreuve pratique VTC Complète
Intitulé de l’épreuve Coefficient Note éliminatoire
inférieure à: Note obtenue
A - Réglementation du T3P 3 6/20 14/20
B - Gestion 2 6/20 9/20
E - Anglais 1 4/20 13/20
GV - Réglementation nationale 3 6/20 14/20
Note globale à l’admissibilité du 01/10/2026 à CENTREX / EXATECH 12,41/20
Fait à Paris, le 27/10/2026`;

const MOBILITE = `Madame Awa TEST,
Née le 29/01/1996 à BECHAR (ALGÉRIE) demeurant : 2 All. Exemple - 92220 BAGNEUX
Numéro de dossier : 18317 - Département d'exercice : 92
est considérée ADMISSIBLE au passage de l’épreuve pratique VTC Mobilité
FV - Développement commercial 3 6/20 11/20
GV - Réglementation nationale 3 6/20 12/20
Note globale à l’admissibilité du 29/09/2026 à CENTREX / EXATECH 11,50/20`;

const NON_ADMIS = `Monsieur Paul TEST,
Né le 12/12/1985 à LYON (FRANCE)
Numéro de dossier : 00099999 - Département d'exercice : 75
n'est pas ADMISSIBLE aux épreuves d'admissibilité de l'examen TAXI Complète
A - Réglementation du T3P 3 6/20 15/20
B - Gestion 2 6/20 4/20
Note globale à l’admissibilité du 29/09/2026 à CENTREX / EXATECH 12,24/20`;

describe("parseAttestationText", () => {
  it("lit une attestation d'admissibilité complète", () => {
    const r = parseAttestationText(ADMIS)!;
    expect(r).toMatchObject({
      civility: "Monsieur",
      full_name: "Jean Pierre DUPONT-TEST",
      birth_date: "1990-03-05",
      dossier_number: "00012345",
      department: "75",
      exam_type: "VTC Complète",
      exam_date: "2026-10-01",
      global_score: 12.41,
      result: "admis",
      comment: null,
    });
    expect(r.subjects).toHaveLength(4);
    expect(r.subjects[3]).toEqual({
      code: "GV", label: "Réglementation nationale", coefficient: 3, eliminatory_below: 6, score: 14,
    });
  });

  it("gère Madame/Née, la mobilité et complète le n° de dossier à 8 chiffres", () => {
    const r = parseAttestationText(MOBILITE)!;
    expect(r.civility).toBe("Madame");
    expect(r.dossier_number).toBe("00018317");
    expect(r.exam_type).toBe("VTC Mobilité");
    expect(r.subjects).toHaveLength(2);
    expect(r.result).toBe("admis");
  });

  it("détecte un non-admis et la note éliminatoire", () => {
    const r = parseAttestationText(NON_ADMIS)!;
    expect(r.result).toBe("non_admis");
    expect(r.exam_type).toBe("TAXI Complète");
    expect(r.comment).toBe("Note éliminatoire : Gestion (4,00/20)");
  });

  it("ignore une page qui n'est pas une attestation", () => {
    expect(parseAttestationText("Le service T3P\nCMA ILE DE FRANCE")).toBeNull();
  });
});

describe("helpers", () => {
  it("convertit et valide les dates", () => {
    expect(frDateToIso("1/9/1996")).toBe("1996-09-01");
    expect(frDateToIso("31/02/1996")).toBeNull();
  });

  it("nomme la session d'après la première épreuve", () => {
    expect(sessionLabelFromDates(["2026-10-01", "2026-09-29", null])).toBe("Septembre 2026");
  });
});
