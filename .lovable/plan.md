
# Plan SEO/GEO — Devenir n°1 sur Google + IA

Basé sur l'analyse **réelle** Google Search Console (90 derniers jours) : 66 clics, 1327 impressions, position moyenne 8 sur le domaine principal.

## Diagnostic critique des données GSC

| Problème | Impact mesuré |
|---|---|
| **www.ecolet3p.fr indexé en parallèle** | 36 clics @ position 26 vs 30 clics @ position 8 → autorité divisée par 2 |
| **CTR catastrophique** | "formation vtc montrouge" : position 3, 100 impressions, **1 seul clic (1%)** → titres SERP peu attractifs |
| **Mots-clés "92/93" mal positionnés** | "centre formation vtc 92" : 26 impressions @ position 12 — page existe mais sous-optimisée |
| **Pages indexées non cliquées** | `/contact` (149 impressions, 0 clic) ; `/formation-accessibilite-pmr` (113 impressions, 0 clic) |
| **Aucune page GEO/IA dédiée** | Pas de FAQ structurée AEO, llms.txt minimal |

## 5 chantiers priorisés

### Chantier 1 — Consolidation www → non-www (CRITIQUE)
- Ajout d'un `<link rel="canonical">` strict non-www sur **toutes** les pages (déjà partiel)
- Soumission via GSC d'une **demande de suppression** des URLs www indexées
- Vérification que la redirection 302 actuelle est bien forcée vers 301 (à confirmer côté hébergeur)
- Ajout `Sitemap:` strict non-www dans robots.txt (déjà OK)
- **Gain attendu** : autorité consolidée, +30-50% de positions sur 4-8 semaines

### Chantier 2 — Réécriture titres SERP (CTR boost)
Cibler les pages avec impressions élevées et CTR < 2% :
- **Home** : titre plus accrocheur avec USPs ("94% réussite • Montrouge • à partir de 990€")
- **/formations/taxi** (1095 impressions, CTR 0.5%) : intégrer "Paris 92" + prix
- **/formations/vmdtr** (200 impressions, CTR 0.5%) : intégrer "taxi moto" + "Île-de-France"
- Ajouter des **emojis SERP** discrets (✅) testés performants
- **Gain attendu** : +100-200% de clics sans bouger les positions

### Chantier 3 — Pages géographiques département (92/93)
GSC montre 6 requêtes "centre formation vtc/taxi 92/93" avec 0 clic. Créer :
- `/formations/hauts-de-seine-92` (hub département)
- `/formations/seine-saint-denis-93` (hub département)
- Maillage interne depuis les pages ville existantes
- Schema.org `LocalBusiness` + `areaServed` enrichi
- **Gain attendu** : capture du trafic départemental (200+ impressions/mois)

### Chantier 4 — Optimisation IA (AEO/GEO)
Pour ChatGPT, Perplexity, Gemini, Claude :
- **Refonte `/llms.txt`** : structure question/réponse (et non liste de pages)
- **Création `/llms-full.txt`** : tarifs, durées, conditions d'admission, dates de sessions en Markdown structuré
- **Ajout JSON-LD `FAQPage`** sur 5 pages clés (Home, Taxi, VTC, VMDTR, Renouvellement) avec questions réelles tirées de GSC ("combien coûte", "combien de temps", "où se former")
- **JSON-LD `Course`** sur chaque page formation (prix, durée, niveau, organisme)
- **Gain attendu** : citations dans réponses IA (déjà 5-10% du trafic SEO en 2026)

### Chantier 5 — Pages à fort potentiel sous-exploitées
- **/contact** (149 impressions, 0 clic, position 6.8) : ajouter description SERP avec téléphone + WhatsApp + horaires
- **/formation-accessibilite-pmr** (113 impressions, 0 clic) : titre/desc orientés bénéfice
- **/blog/renouvellement-carte-professionnelle-vtc-taxi-2026** (20 impressions, pos 9.3) : booster avec liens internes depuis les pages FCO
- **Gain attendu** : conversion d'impressions dormantes en clics

## Détails techniques

- `useSEOOverrides` + `DynamicSEOHead` déjà en place → réécriture des entrées dans `src/data/seoPageData.ts`
- `scripts/prerender.mjs` injecte le HTML statique → tous les changements seront pré-rendus pour les crawlers
- Sitemap déjà à jour avec les bonnes priorités
- Aucune migration DB requise

## Ce que je ne ferai PAS sans validation
- Toucher la config Cloudflare/302→301 (côté hébergeur, pas du code)
- Activer la GSC sitemap submission automatique (à faire 1 fois manuellement après soumission)
- Modifier les prix, offres ou identité de marque (mémoire projet)

## Ordre d'exécution suggéré
1. **Chantier 2** (titres) — quick win, déploiement immédiat
2. **Chantier 4** (IA/llms.txt) — différenciateur 2026
3. **Chantier 5** (pages dormantes) — conversion impressions
4. **Chantier 3** (départements 92/93) — nouvelles pages
5. **Chantier 1** (suite GSC) — actions hors-code à coordonner

**Recommandation** : commencer par les **chantiers 2 + 4 + 5** dans cette session (impact rapide, 100% codable). Les chantiers 1 et 3 en suivant.
