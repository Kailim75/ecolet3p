import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";
import tarifs from "@/data/tarifs.json";
import avisGoogle from "@/data/avisGoogle.json";

/**
 * Garde-fous des décisions du directeur (18/09/2026).
 * Chaque motif interdit correspond à une information publiée qui s'est révélée fausse :
 * le test échoue si elle revient dans le dépôt.
 */

const ROOTS = ["src", "public", "index.html"];
// Fichiers qui ne peuvent pas importer la source unique : nombre d'avis en dur toléré,
// mais vérifié contre src/data/avisGoogle.json par le test « fichiers statiques ».
const STATIQUES = ["public/llms.txt", "public/llms-full.txt", "index.html"];
const EXTS = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".json", ".md", ".txt"]);
const IGNORE_DIRS = new Set(["node_modules", "dist", ".git", "test"]);
const ALLOW_FILES = new Set(["src/data/avisGoogle.json"]);

function walk(p: string, out: string[] = []): string[] {
  const st = statSync(p);
  if (st.isFile()) {
    if (EXTS.has(extname(p))) out.push(p);
    return out;
  }
  for (const entry of readdirSync(p)) {
    if (IGNORE_DIRS.has(entry)) continue;
    walk(join(p, entry), out);
  }
  return out;
}

const files = ROOTS.flatMap((r) => walk(r)).filter((f) => !ALLOW_FILES.has(f.replace(/\\/g, "/")));
const lignes = files.flatMap((f) =>
  readFileSync(f, "utf-8")
    .split("\n")
    .map((ligne, i) => ({ f, n: i + 1, ligne })),
);

describe("décisions du directeur — avis Google", () => {
  it("le fichier source est renseigné et daté", () => {
    expect(avisGoogle.nombre).toBeGreaterThan(0);
    expect(avisGoogle.noteAffichee).toMatch(/^[0-5],\d$/);
    expect(avisGoogle.releveLe).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(avisGoogle.url).toMatch(/^https:\/\//);
  });

  it("aucun nombre d'avis codé en dur hors du fichier source", () => {
    // Dans src/, le nombre d'avis doit venir de @/lib/avis : aucun chiffre écrit avant « avis ».
    // Les fichiers statiques sont vérifiés par le test suivant.
    const fautes = lignes
      .filter(({ f }) => !STATIQUES.includes(f))
      .filter(({ ligne }) => /\b\d{2,4}\s*avis\b/i.test(ligne))
      .map(({ f, n, ligne }) => `${f}:${n} — ${ligne.trim().slice(0, 100)}`);
    expect(fautes).toEqual([]);
  });

  it("les fichiers statiques reprennent le nombre d'avis à jour", () => {
    for (const f of STATIQUES) {
      const contenu = readFileSync(f, "utf-8");
      if (/\bavis\b/i.test(contenu)) {
        expect(contenu, `${f} cite un nombre d'avis périmé`).toMatch(
          new RegExp(`\\b${avisGoogle.nombre}\\b`),
        );
      }
      expect(contenu, `${f} contient encore 359 avis`).not.toMatch(/\b359\b/);
    }
  });

  it("aucun lien vers une fiche Google inexistante", () => {
    const fautes = lignes
      .filter(({ ligne }) => /maps\/place\/ECOLE\+T3P|T3P\+Campus\+Montrouge/.test(ligne))
      .map(({ f, n }) => `${f}:${n}`);
    expect(fautes).toEqual([]);
  });
});

describe("décisions du directeur — contenus", () => {
  it("prix et durées de la mobilité géographique", () => {
    expect(tarifs.mobiliteGeographique).toBe(440);
    expect(tarifs.dureeMobilite92Heures).toBe(14);
    expect(tarifs.dureeMobilite75Heures).toBe(35);
  });

  it("aucune information contredisant les décisions", () => {
    const motifs: [RegExp, string][] = [
      [/\b200\s?m(ètres)?\b(?![a-zà-ÿ])/i, "centre « à 200 m » du métro (c'est 8 minutes à pied)"],
      [/\b10\s?[-àa]\s?15\s+(personnes|stagiaires)/i, "effectif « 10 à 15 » (c'est 15 maximum)"],
      [/\b12\s+places\b/i, "« 12 places par session » (c'est 15 maximum)"],
      [/d[èe]s\s+la\s+1[re]{0,2}\s+pr[ée]sentation/i, "« dès la 1re présentation » non étayé"],
      [/première\s+présentation/i, "« première présentation » non étayé"],
      [/sans\s+justificatif/i, "Alma « sans justificatif »"],
      [/aucune\s+condition\s+de\s+ressources/i, "Alma « aucune condition de ressources »"],
      [/9h00\s?[-–]\s?17h00/i, "horaires de jour 9h00-17h00 (ce sont 9h30-16h30)"],
      [/permis\s+A2?\s[^\n]{0,40}2\s?ans\s+si\s+[^\n]{0,30}passerelle/i, "permis A « 2 ans si passerelle »"],
      [/12\s+mois\s+pr[ée]c[ée]dant\s+l['’]expiration/i, "fenêtre réglementaire des 12 mois non étayée"],
      [/certifi[ée]s?\s+Qualiopi/i, "certification Qualiopi (en cours, pas acquise)"],
    ];
    const fautes: string[] = [];
    for (const { f, n, ligne } of lignes) {
      for (const [re, nom] of motifs) {
        if (re.test(ligne)) fautes.push(`${f}:${n} : ${nom} — ${ligne.trim().slice(0, 90)}`);
      }
    }
    expect(fautes).toEqual([]);
  });

  it("la location du véhicule d'examen est toujours réservée aux candidats libres", () => {
    const prix = /\b(189|249|299)\s?€/;
    const fautes: string[] = [];
    for (const f of files) {
      const contenu = readFileSync(f, "utf-8");
      const lignesFichier = contenu.split("\n");
      lignesFichier.forEach((ligne, i) => {
        if (!prix.test(ligne)) return;
        // la précision peut être sur la ligne, ou dans les 12 lignes qui suivent (bloc JSX / tableau)
        const contexte = lignesFichier.slice(Math.max(0, i - 6), i + 13).join(" ");
        if (!/candidats?\s+libres?/i.test(contexte)) {
          fautes.push(`${f}:${i + 1} — ${ligne.trim().slice(0, 90)}`);
        }
      });
    }
    expect(fautes).toEqual([]);
  });

  it("les frais d'examen cités en clair correspondent au tarif officiel", () => {
    const citations = lignes.filter(({ ligne }) => /\b241\s?€/.test(ligne));
    if (citations.length > 0) expect(tarifs.fraisExamenCMA).toBe(241);
  });
});
