import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";
import tarifs from "@/data/tarifs.json";

const ROOTS = ["src", "scripts/prerender.mjs", "public"];
const EXTS = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".json", ".md", ".txt"]);
const IGNORE_DIRS = new Set(["node_modules", "dist", ".git", "test"]);
// files intentionally allowed to mention historical values or the poison words themselves
const ALLOW_FILES = new Set([
  "src/test/tarifs.test.ts",
  "src/data/tarifs.json",
]);

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

describe("tarifs guardrail", () => {
  it("official rates JSON matches expected values", () => {
    expect(tarifs.initiale).toBe(990);
    expect(tarifs.initialePremium).toBe(1190);
    expect(tarifs.continueVTC).toBe(170);
    expect(tarifs.continueTaxi).toBe(250);
    expect(tarifs.passerelle).toBe(665);
    expect(tarifs.fraisExamenCMA).toBe(241);
  });

  it("durées officielles (décisions du directeur du 17/09/2026)", () => {
    expect(tarifs.dureeInitialeHeures).toBe(35);
    expect(tarifs.dureeContinueHeures).toBe(14);
    expect(tarifs.dureePasserelleHeures).toBe(7);
    expect(tarifs.dureePasserelleTaxiHeures).toBe(14);
  });

  it("aucune durée ou promesse contredisant ces décisions", () => {
    const motifs: [RegExp, string][] = [
      [/\b33\s?heures\b/i, "formation initiale VMDTR à 33 h"],
      [/\b182\s?h\b/i, "formation initiale à 182 h"],
      [/formation[^\n]{0,60}\b10\s?jours\b/i, "formation « 10 jours »"],
      [/passerelle[^\n]{0,60}\b18\s?(h|heures)\b/i, "passerelle à 18 h"],
      [/tarifs?\s+garantis?/i, "tarifs garantis"],
      [/100\s?%\s+digital/i, "100 % digital"],
      [/permis\s+A\s+ou\s+A2/i, "permis A ou A2"],
    ];
    const fautes: string[] = [];
    for (const fichier of files) {
      const contenu = readFileSync(fichier, "utf-8");
      for (const ligne of contenu.split("\n")) {
        for (const [re, nom] of motifs) {
          if (re.test(ligne)) fautes.push(`${fichier} : ${nom} — ${ligne.trim().slice(0, 90)}`);
        }
      }
    }
    expect(fautes).toEqual([]);
  });

  it("no poisoned tarifs (239€) or CPF acceptance claim", () => {
    const offenders: string[] = [];
    const affirmative = /(?:[ée]ligibles?\s+(?:au\s+)?CPF|finance[rz]?\s+(?:par|via|avec)\s+(?:le\s+)?CPF|MonCompteFormation|paiement\s+CPF|CPF\s+accept[ée])/i;
    const negation = /(?:pas\s+[ée]ligibles?|non\s+[ée]ligibles?|sans\s+CPF|n['’]est\s+pas|ind[ée]pendants?\s+du\s+CPF|\?)/i;
    for (const f of files) {
      const c = readFileSync(f, "utf-8");
      if (/\b239\s?€/.test(c)) offenders.push(`${f} : 239€`);
      for (const line of c.split("\n")) {
        if (affirmative.test(line) && !negation.test(line)) {
          offenders.push(`${f} : ${line.trim().slice(0, 80)}`);
        }
      }
    }
    expect(offenders).toEqual([]);
  });

  it("no fake success rate (95%, 96%, 97%, 98%, 99%, 100%)", () => {
    const offenders: string[] = [];
    for (const f of files) {
      const c = readFileSync(f, "utf-8");
      if (/\b(95|96|97|98|99|100)\s?%\s*(de\s+)?r[ée]ussite/i.test(c)) {
        offenders.push(f);
      }
    }
    expect(offenders).toEqual([]);
  });

  it("no illegal result guarantee (organisme de formation)", () => {
    const patterns = [
      /r[ée]ussite\s+garantie/i,
      /garanties?\s+de\s+r[ée]ussite/i,
      /100\s?%\s+de\s+r[ée]ussite/i,
      /r[ée]sultats?\s+garantis?/i,
      /100\s?%\s+(de\s+)?dossiers?(\s+accept[ée]s?)?/i,
      /value:\s*"100\s?%",\s*label:\s*"(de\s+)?dossiers/i,
      /la plus comp[ée]titive/i,
    ];
    const offenders: string[] = [];
    for (const f of files) {
      const c = readFileSync(f, "utf-8");
      for (const line of c.split("\n")) {
        for (const p of patterns) {
          if (p.test(line)) {
            offenders.push(`${f} : ${line.trim().slice(0, 100)}`);
          }
        }
      }
    }
    expect(offenders).toEqual([]);
  });

  it("no self-declared 'avis vérifiés' claim (unverifiable reviews)", () => {
    const offenders: string[] = [];
    for (const f of files) {
      const c = readFileSync(f, "utf-8");
      for (const line of c.split("\n")) {
        if (/avis(\s+google)?\s+v[ée]rifi[ée]s?/i.test(line)) {
          offenders.push(`${f} : ${line.trim().slice(0, 100)}`);
        }
      }
    }
    expect(offenders).toEqual([]);
  });
});
