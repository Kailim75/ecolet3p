/**
 * Post-build prerendering script for ecolet3p.fr
 * 
 * Generates per-route HTML files from the built index.html template,
 * replacing SEO metadata (title, description, canonical, OG, Twitter)
 * so crawlers and social scrapers see correct metadata without JS.
 * 
 * Usage: node scripts/prerender.mjs
 * Runs automatically after `vite build` via package.json postbuild script.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'fs';
import { join } from 'path';
import { buildRoutes } from './seoRoutes.mjs';

const DIST = join(process.cwd(), 'dist');
const SITE_URL = 'https://ecolet3p.fr';

// Titres, descriptions et H1 : src/data/seoPages.json (source unique partagée avec
// l'application) + formule des pages départementales. Voir scripts/seoRoutes.mjs.
const routes = buildRoutes();

// ─── HTML transformation ──────────────────────────────────────────────────────

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function getCanonical(path) {
  if (path === '/') return `${SITE_URL}/`;
  return `${SITE_URL}${path}`;
}

function replaceOrFail(html, pattern, replacement, what) {
  if (!pattern.test(html)) {
    console.error(`❌ Balise introuvable dans dist/index.html : ${what}. Prérendu interrompu.`);
    process.exit(1);
  }
  return html.replace(pattern, () => replacement);
}

// Toutes les balises d'en-tête réécrites ici portent data-rh="true" dans index.html :
// react-helmet-async les reconnaît comme siennes et les REMPLACE au lieu d'ajouter
// une seconde série (constat du 15/09/2026 : deux descriptions et deux canoniques par
// page une fois le JavaScript exécuté). Les expressions ci-dessous ne remplacent que
// le début de la balise et conservent donc cet attribut.
function transformHtml(template, route, ogImageUrl) {
  let html = template;
  const isHome = route.path === '/';
  const canonical = getCanonical(route.path);
  const title = escapeHtml(route.title);
  const description = escapeHtml(route.description);

  html = replaceOrFail(html, /<title>[^<]*<\/title>/, `<title>${title}</title>`, 'title');
  html = replaceOrFail(html, /<meta name="description" content="[^"]*"/, `<meta name="description" content="${description}"`, 'description');
  html = replaceOrFail(html, /<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${title}"`, 'og:title');
  html = replaceOrFail(html, /<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${description}"`, 'og:description');
  html = replaceOrFail(html, /<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${canonical}"`, 'og:url');
  html = replaceOrFail(html, /<meta name="twitter:title" content="[^"]*"/, `<meta name="twitter:title" content="${title}"`, 'twitter:title');
  html = replaceOrFail(html, /<meta name="twitter:description" content="[^"]*"/, `<meta name="twitter:description" content="${description}"`, 'twitter:description');

  // Image sociale propre à la route (articles de blog) ; sinon og-image.jpg du gabarit.
  if (ogImageUrl) {
    html = replaceOrFail(html, /<meta property="og:image" content="[^"]*"/, `<meta property="og:image" content="${ogImageUrl}"`, 'og:image');
    html = replaceOrFail(html, /<meta name="twitter:image" content="[^"]*"/, `<meta name="twitter:image" content="${ogImageUrl}"`, 'twitter:image');
  }

  // Pas de canonique dans dist/index.html : ce fichier est aussi le repli SPA des URL
  // non prérendues, qui se déclareraient sinon doublons de l'accueil. L'accueil reçoit
  // la sienne de Helmet.
  if (!isHome) {
    if (/<link rel="canonical"/.test(html)) {
      console.error('❌ Une canonique existe déjà dans le gabarit. Prérendu interrompu.');
      process.exit(1);
    }
    html = html.replace('</head>', `    <link rel="canonical" href="${canonical}" data-rh="true" />\n  </head>`);
  }

  if (isHome) {
    // L'accueil garde son bloc de repli détaillé ; seul son H1 suit la source unique.
    const h1Re = /(<div class="seo-fallback"[\s\S]*?<h1>)[^<]*(<\/h1>)/;
    if (!h1Re.test(html)) {
      console.error('❌ H1 du bloc de repli introuvable dans dist/index.html. Prérendu interrompu.');
      process.exit(1);
    }
    return html.replace(h1Re, (_, open, close) => `${open}${escapeHtml(route.h1)}${close}`);
  }

  // Remplace TOUT le bloc de repli par un contenu propre à la route.
  //
  // Ce bloc était auparavant recopié à l'identique sur les 105 pages (1441 mots, même
  // empreinte md5), et seul le H1 changeait. Conséquence mesurée dans Search Console
  // le 20/07/2026 : Google choisissait « https://ecolet3p.fr/ » comme canonique pour
  // des pages qui déclaraient pourtant la leur, et refusait de les indexer — 13 pages
  // indexées sur 105. Le contenu réel des pages vient du rendu React ; ce repli ne doit
  // donc être qu'une courte carte d'identité, UNIQUE par route.
  const fallback = `<div class="seo-fallback" role="complementary" aria-label="Contenu pour moteurs de recherche">
      <header>
        <h1>${escapeHtml(route.h1)}</h1>
        <p>${description}</p>
      </header>
      <p>ECOLE T3P — centre de formation Taxi, VTC et VMDTR agréé Préfecture (agrément n° 23/007), 3 rue Corneille, 92120 Montrouge. Téléphone : <a href="tel:0188750555">01 88 75 05 55</a>.</p>
      <nav aria-label="Formations principales">
        <ul>
          <li><a href="/formations/taxi">Formation Taxi</a></li>
          <li><a href="/formations/vtc">Formation VTC</a></li>
          <li><a href="/formations/vmdtr">Formation VMDTR</a></li>
          <li><a href="/formations">Toutes les formations</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
    </div>
  </body>`;
  return replaceOrFail(html, /<div class="seo-fallback"[\s\S]*?<\/div>\s*<\/body>/, fallback, 'bloc de repli');
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function main() {
  const indexPath = join(DIST, 'index.html');
  if (!existsSync(indexPath)) {
    console.error('❌ dist/index.html not found. Run vite build first.');
    process.exit(1);
  }

  const template = readFileSync(indexPath, 'utf-8');

  // Table de correspondance imageBase → nom haché produit par Vite.
  // On préfère le .jpg (compatibilité universelle des scrapers sociaux) et on
  // retombe sur .webp si aucun .jpg n'existe. Un article sans image trouvée
  // fait échouer le prérendu : mieux vaut un build cassé qu'un og:image en 404.
  const assetsDir = join(DIST, 'assets');
  const assetFiles = existsSync(assetsDir) ? readdirSync(assetsDir) : [];
  const imageBases = [...new Set(routes.map(r => r.imageBase).filter(Boolean))];
  const imageMap = {};
  for (const base of imageBases) {
    const escaped = base.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(`^${escaped}-[A-Za-z0-9_-]+\\.(jpg|webp)$`);
    const matches = assetFiles.filter(f => re.test(f));
    if (matches.length === 0) {
      console.error(`❌ Aucun asset haché trouvé pour "${base}" dans dist/assets/. Prérendu interrompu.`);
      process.exit(1);
    }
    const jpg = matches.find(f => f.endsWith('.jpg'));
    imageMap[base] = jpg || matches[0];
  }

  let generated = 0;

  for (const route of routes) {
    const ogImageUrl = route.imageBase
      ? `${SITE_URL}/assets/${imageMap[route.imageBase]}`
      : null;
    const html = transformHtml(template, route, ogImageUrl);

    // L'accueil réécrit dist/index.html lui-même (gabarit déjà lu en mémoire).
    const outDir = join(DIST, route.path);
    mkdirSync(outDir, { recursive: true });
    writeFileSync(join(outDir, 'index.html'), html, 'utf-8');
    generated++;
  }

  console.log(`✅ Prerender complete: ${generated} pages generated (accueil compris).`);
}

main();
