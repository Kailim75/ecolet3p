import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";

/**
 * Les tables où écrivent les formulaires publics ne sont pas lisibles par les visiteurs (RLS).
 * Un `.insert(...).select()` demande à Postgres de relire la ligne créée : la relecture est
 * refusée et l'enregistrement ENTIER échoue. C'est ce qui a cassé les pré-inscriptions
 * (« Réserver ma place ») du 18/01/2026 au 31/10/2026.
 * Côté visiteur, on insère sans rien demander en retour ; seul l'espace admin (connecté) peut relire.
 */

function walk(p: string, out: string[] = []): string[] {
  if (statSync(p).isFile()) {
    if ([".ts", ".tsx"].includes(extname(p))) out.push(p);
    return out;
  }
  for (const entry of readdirSync(p)) {
    if (["admin", "test", "integrations"].includes(entry)) continue;
    walk(join(p, entry), out);
  }
  return out;
}

describe("formulaires publics", () => {
  it("aucun formulaire visiteur ne relit la ligne qu'il vient d'insérer", () => {
    const fautes: string[] = [];
    for (const f of [...walk("src/components"), ...walk("src/pages")]) {
      const lignes = readFileSync(f, "utf-8").split("\n");
      lignes.forEach((ligne, i) => {
        if (!/\.insert\(/.test(ligne)) return;
        // on suit la chaîne jusqu'au point-virgule qui la termine
        for (let j = i; j < Math.min(lignes.length, i + 20); j++) {
          if (j > i && /\.select\(/.test(lignes[j])) {
            fautes.push(`${f}:${i + 1} — insert suivi d'un select (ligne ${j + 1})`);
            break;
          }
          if (/;\s*$/.test(lignes[j])) break;
        }
      });
    }
    expect(fautes).toEqual([]);
  });
});
