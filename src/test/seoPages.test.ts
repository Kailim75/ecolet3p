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
    const sources = readdirSync("src/pages").map((f) => readFileSync(`src/pages/${f}`, "utf-8")).join("\n");
    const chemins = [
      ...[...sources.matchAll(/<SeoH1Text path="([^"]+)"/g)].map((m) => m[1]),
      ...[...sources.matchAll(/useDynamicH1\("([^"]+)"/g)].map((m) => m[1]),
    ];
    expect(chemins.length).toBeGreaterThan(20);
    expect(chemins.filter((p) => !pages[p])).toEqual([]);
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
