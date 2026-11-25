import { describe, it, expect } from "vitest";
import { parseConvocationText, groupConvocationPages } from "@/lib/convocations";

// Gabarits identiques aux convocations CMA, données fictives
const TAXI = `CONVOCATION À L’EXAMEN D’ADMISSION
DUPONT Jean
1 RUE DE L'EXEMPLE
93200 SAINT-DENIS
Jean.Dupont@Example.fr
N° de dossier : 00012345PE2PF1
Paris, le 19/11/2026
Objet : Convocation à l'épreuve d'admission TAXI Mobilité 75 - Paris
Monsieur,
L'épreuve se déroulera :
Date Heure
16/12/2026 08:45
A l'adresse suivante :
CMA-IDF 75 - BRETEUIL TAXIS
PLACE DE BRETEUIL
75007, PARIS
Merci de vous présenter devant le centre d'examen à 08:30, muni de la présente convocation
Aucun retard ne sera toléré.
Station taxi face au n° 5/11
Consignes de l'épreuve d'admission à lire
Le service T3P`;

const VTC93 = `CONVOCATION À L’EXAMEN D’ADMISSION
TEST Basel
1 RUE DE L EST
95120 ERMONT
basel.test@gmail.com
N° de dossier : 00009495TE1
Objet : Convocation à l'épreuve d'admission VTC Complète 93 - Seine-Saint-Denis
Date Heure
02/12/2026 08:45
A l'adresse suivante :
CMA-IDF 93 - VTC
91-129 rue Edouard Renard
93000, BOBIGNY
Merci de vous présenter devant le centre d'examen à 08:30, muni de la présente convocation
Aucun retard ne sera toléré.
RDV : en salle A106 – 1er étage en face du parking
Consignes de l'épreuve d'admission à lire IMPERATIVEMENT :  CLIQUER ICI
Les jurys sont composés de 2 examinateurs :`;

const FOOTER = `RÉPUBLIQUE FRANÇAISE
Liberté – Égalité – Fraternité
CMA ILE DE FRANCE`;

describe("parseConvocationText", () => {
  it("lit une convocation TAXI avec suffixe de dossier et consigne du centre", () => {
    expect(parseConvocationText(TAXI)).toEqual({
      full_name: "DUPONT Jean",
      email: "jean.dupont@example.fr",
      dossier_number: "00012345",
      exam_type: "TAXI Mobilité",
      department: "75",
      exam_date: "2026-12-16",
      exam_time: "08:45",
      arrival_time: "08:30",
      location: "CMA-IDF 75 - BRETEUIL TAXIS, PLACE DE BRETEUIL, 75007 PARIS",
      notes: "Arrivée à 08 h 30 avec la convocation, une pièce d'identité originale et le permis de conduire. Station taxi face au n° 5/11",
    });
  });

  it("lit une convocation hors Paris et s'arrête aux consignes", () => {
    const c = parseConvocationText(VTC93)!;
    expect(c.department).toBe("93");
    expect(c.location).toBe("CMA-IDF 93 - VTC, 91-129 rue Edouard Renard, 93000 BOBIGNY");
    expect(c.notes).toContain("RDV : en salle A106");
    expect(c.notes).not.toContain("jurys");
  });

  it("ignore une page sans en-tête de convocation", () => {
    expect(parseConvocationText(FOOTER)).toBeNull();
  });
});

describe("groupConvocationPages", () => {
  it("rattache les pages de suite à la convocation précédente", () => {
    const groups = groupConvocationPages([TAXI, VTC93, FOOTER, TAXI]);
    expect(groups.map((g) => g.pageIndexes)).toEqual([[0], [1, 2], [3]]);
    expect(groups.every((g) => g.parsed)).toBe(true);
  });
});
