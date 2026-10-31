/// <reference types="node" />
import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";
import { blogArticlesMeta } from "@/data/blogArticlesMeta";

/**
 * Audit du 31/10/2026 : 12 liens de blog des pages formation menaient à des articles
 * inexistants (l'application retombait sans message sur /blog). Tout lien /blog/<slug> écrit
 * dans src/pages et src/components doit désigner un article publié.
 */
const RACINES = ["src/pages", "src/components"];
const EXTS = new Set([".ts", ".tsx"]);

function parcourir(chemin: string, fichiers: string[] = []): string[] {
  if (statSync(chemin).isFile()) {
    if (EXTS.has(extname(chemin))) fichiers.push(chemin);
    return fichiers;
  }
  for (const entree of readdirSync(chemin)) parcourir(join(chemin, entree), fichiers);
  return fichiers;
}

// Lien littéral juste après un guillemet : exclut les imports d'images (@/assets/blog/…) et les
// liens construits (/blog/${slug}).
const LIEN_BLOG = /["'`]\/blog\/([a-z0-9][a-z0-9-]*)(?=[#?"'`])/g;

describe("liens internes vers le blog", () => {
  const slugs = new Set(blogArticlesMeta.map((article) => article.slug));

  it("la liste des articles est chargée", () => {
    expect(slugs.size).toBeGreaterThan(10);
  });

  it("chaque lien /blog/<slug> des pages et composants mène à un article existant", () => {
    const fautes: string[] = [];
    let liens = 0;
    for (const fichier of RACINES.flatMap((racine) => parcourir(racine))) {
      readFileSync(fichier, "utf-8")
        .split("\n")
        .forEach((ligne, i) => {
          // Exemples de saisie du gestionnaire de redirections (admin), pas des liens.
          if (/placeholder=/.test(ligne)) return;
          for (const [, slug] of ligne.matchAll(LIEN_BLOG)) {
            liens++;
            if (!slugs.has(slug)) fautes.push(`${fichier}:${i + 1} → /blog/${slug}`);
          }
        });
    }
    expect(liens).toBeGreaterThan(20);
    expect(fautes, `Liens vers des articles inexistants :\n${fautes.join("\n")}`).toEqual([]);
  });
});
