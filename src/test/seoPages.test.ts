import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import seoPages from "@/data/seoPages.json";
import { activeCities } from "@/data/localSeoData";
import { blogArticlesMeta } from "@/data/blogArticlesMeta";
import { DEPARTEMENTS_IDF } from "@/data/departementsIdfData";
import { buildRoutes, departements } from "../../scripts/seoRoutes.mjs";

type Route = { path: string; title: string; description: string; h1: string };
const routes: Route[] = buildRoutes();
const pages = seoPages as Record<string, { title: string; description: string; h1: string }>;
const len = (s: string) => [...s].length;
// Pages réellement routées (importées par App.tsx) : src/pages contient aussi d'anciennes pages
// non branchées (FormationPMR.tsx…) qui redéclarent les mêmes canoniques sans être servies.
const pageFiles = () => {
  const app = readFileSync("src/App.tsx", "utf-8");
  const routees = new Set([...app.matchAll(/["']\.\/pages\/([A-Za-z0-9]+)["']/g)].map((m) => m[1]));
  return readdirSync("src/pages", { withFileTypes: true })
    .filter((d) => d.isFile() && d.name.endsWith(".tsx") && routees.has(d.name.replace(/\.tsx$/, "")))
    .map((d) => `src/pages/${d.name}`);
};

describe("source unique SEO (src/data/seoPages.json)", () => {
  it("couvre chaque ville active et chaque article du blog", () => {
    const manquantes = [
      ...activeCities.map((c) => `/formations/${c.slug}`),
      ...blogArticlesMeta.map((a) => `/blog/${a.slug}`),
    ].filter((path) => !pages[path]);
    expect(manquantes).toEqual([]);
  });

  it("chaque entrée a un title, une description et un H1", () => {
    const incompletes = Object.entries(pages)
      .filter(([, p]) => !p.title?.trim() || !p.description?.trim() || !p.h1?.trim())
      .map(([path]) => path);
    expect(incompletes).toEqual([]);
  });

  it("respecte les longueurs : title ≤ 60, description 120–155, H1 ≤ 70", () => {
    const horsNorme = routes.flatMap((r) => [
      ...(len(r.title) > 60 ? [`${r.path} title ${len(r.title)}`] : []),
      ...(len(r.description) < 120 || len(r.description) > 155 ? [`${r.path} description ${len(r.description)}`] : []),
      ...(len(r.h1) > 70 ? [`${r.path} h1 ${len(r.h1)}`] : []),
    ]);
    expect(horsNorme).toEqual([]);
  });

  it("n'a ni title ni description en double", () => {
    const doublons = (champ: "title" | "description") => {
      const vus = new Map<string, string>();
      return routes.flatMap((r) => {
        const cle = r[champ].toLowerCase();
        if (vus.has(cle)) return [`${champ} : ${vus.get(cle)} = ${r.path}`];
        vus.set(cle, r.path);
        return [];
      });
    };
    expect([...doublons("title"), ...doublons("description")]).toEqual([]);
  });

  it("ne contient aucune allégation interdite", () => {
    const interdits: [RegExp, string][] = [
      [/\bCPF\b/i, "CPF"],
      [/garanti/i, "garantie"],
      [/avis\s+v[ée]rifi/i, "avis vérifiés"],
      [/\bmeilleur/i, "superlatif"],
      [/\bn°\s?1\b/i, "n°1"],
      [/moins cher/i, "le moins cher"],
      // les flèches (↔, →) sont de la typographie, pas des emojis
      [/(?![\u2190-\u21FF])\p{Extended_Pictographic}/u, "emoji"],
    ];
    const fautes = routes.flatMap((r) =>
      [r.title, r.description, r.h1].flatMap((texte) => [
        ...interdits.filter(([re]) => re.test(texte)).map(([, nom]) => `${r.path} : ${nom}`),
        ...[...texte.matchAll(/(\d+(?:,\d+)?)\s?%/g)]
          .filter((m) => m[1] !== "94")
          .map((m) => `${r.path} : taux ${m[0]}`),
      ])
    );
    expect(fautes).toEqual([]);
  });

  it("le prérendu des départements suit departementsIdfData.ts", () => {
    const ecarts = DEPARTEMENTS_IDF.filter((d) => {
      const p = departements.find((x: { code: string }) => x.code === d.code);
      return !p || p.nom !== d.nom || p.dans !== d.dans;
    }).map((d) => d.code);
    expect(ecarts).toEqual([]);
    expect(departements).toHaveLength(DEPARTEMENTS_IDF.length);
  });

  it("chaque H1 branché sur la source unique pointe vers une entrée existante", () => {
    const sources = pageFiles().map((f) => readFileSync(f, "utf-8")).join("\n");
    const chemins = [
      ...[...sources.matchAll(/<SeoH1Text path="([^"]+)"/g)].map((m) => m[1]),
      ...[...sources.matchAll(/useDynamicH1\("([^"]+)"/g)].map((m) => m[1]),
    ];
    expect(chemins.length).toBeGreaterThan(20);
    expect(chemins.filter((p) => !pages[p])).toEqual([]);
  });

  it("aucun chemin SEO n'est déclaré par deux pages", () => {
    // Défaut trouvé en production le 17/09/2026 : /formations/renouvellement passait le
    // pageUrl de /renouvellement-carte-professionnelle et en prenait title, description et canonique.
    const vus = new Map<string, string>();
    const doublons: string[] = [];
    for (const f of pageFiles()) {
      const source = readFileSync(f, "utf-8");
      // pageUrl littéral, ou canonique passée à un gabarit (FormationPageTemplate, ContinueFormationTemplate…)
      const chemins = new Set(
        [...source.matchAll(/(?:pageUrl|canonical|canonicalUrl)="(?:https:\/\/ecolet3p\.fr)?([^"]*)"/g)].map((m) => m[1] || "/")
      );
      for (const chemin of chemins) {
        if (vus.has(chemin)) doublons.push(`${chemin} : ${vus.get(chemin)} et ${f}`);
        else vus.set(chemin, f);
      }
    }
    expect(doublons).toEqual([]);
  });

  it("chaque URL du sitemap a exactement une date lastmod", () => {
    const sitemap = readFileSync("public/sitemap.xml", "utf-8");
    const blocs = sitemap.match(/<url>[\s\S]*?<\/url>/g) ?? [];
    const fautifs = blocs.filter((b) => (b.match(/<lastmod>/g) ?? []).length !== 1).map((b) => b.match(/<loc>([^<]+)/)?.[1]);
    expect(blocs.length).toBe(routes.length);
    expect(fautifs).toEqual([]);
  });

  it("le sitemap liste exactement les pages prérendues", () => {
    const sitemap = readFileSync("public/sitemap.xml", "utf-8");
    const locs = [...sitemap.matchAll(/<loc>https:\/\/ecolet3p\.fr([^<]*)<\/loc>/g)].map((m) => m[1] || "/");
    const prerendues = routes.map((r) => r.path);
    expect({
      absentesDuSitemap: prerendues.filter((p) => !locs.includes(p)),
      nonPrerendues: locs.filter((p) => !prerendues.includes(p)),
    }).toEqual({ absentesDuSitemap: [], nonPrerendues: [] });
  });
});
