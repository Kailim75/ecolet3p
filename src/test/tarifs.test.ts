import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";
import tarifs from "@/data/tarifs.json";

const ROOTS = ["src", "scripts/prerender.mjs"];
const EXTS = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".json", ".md"]);
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

  it("no poisoned tarifs (239€) or CPF acceptance claim", () => {
    const offenders: string[] = [];
    for (const f of files) {
      const c = readFileSync(f, "utf-8");
      if (/\b239\s?€/.test(c)) offenders.push(`${f} : 239€`);
      if (/(?:[ée]ligibles?\s+(?:au\s+)?CPF|finance[rz]?\s+(?:par|via|avec)\s+(?:le\s+)?CPF|MonCompteFormation|paiement\s+CPF|CPF\s+accept[ée])/i.test(c)) {
        offenders.push(`${f} : CPF acceptance`);
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
});
