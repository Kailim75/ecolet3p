# Sprint 1 — Batch 1 · Notes de passation

**Date** : 17 avril 2026
**Exécution** : autonome (utilisateur endormi, autorisation donnée)
**Branche** : à créer manuellement (`chore/sprint-1-batch-1-legal-security`)
**Push / PR** : **NON effectué** — à valider au réveil.

---

## Résumé des changements

| # | Action | Fichiers | Type |
|---|--------|----------|------|
| 1 | Ignorer `.env` + template + runbook rotation | `.gitignore`, `.env.example`, `docs/RUNBOOK_ROTATION_CLES.md` | Sécurité |
| 2 | Durcir RLS `newsletter_subscribers` (suppression policy publique `USING true`) | `supabase/migrations/20260416000000_harden_newsletter_rls.sql` | Sécurité |
| 3 | Mentions légales — blocs *Organisme de formation* et *Référents* avec placeholders *en cours de demande* | `src/pages/LegalMentions.tsx` | Légal |
| 4 | Nouvelle page **CGV** | `src/pages/CGV.tsx` + route `/cgv` | Légal |
| 5 | Nouvelle page **Règlement Intérieur** (articles L.6352-3 à 5 du Code du travail) | `src/pages/ReglementInterieur.tsx` + route `/reglement-interieur` | Légal |
| 6 | Nouvelle page **Nos Chiffres Qualiopi** (7 indicateurs, dont 4 *en cours de consolidation*) | `src/pages/NosChiffres.tsx` + route `/nos-chiffres` | Qualiopi |
| 7 | Liens footer mis à jour (silo institutionnel + barre bas) | `src/components/layout/Footer.tsx` | SEO/UX |

`git diff --stat` résumé : 4 fichiers modifiés (+52/-1 lignes), 6 nouveaux fichiers.

---

## ⚠️ Actions utilisateur requises au réveil

### 🔴 CRITIQUE — à faire dans les 24 h

1. **Rotation clé Supabase anon/publishable**
   Dashboard Supabase → Project Settings → API → *Reset anon public key*.
   Mettre à jour `.env` local + env de prod Lovable. Procédure complète dans `docs/RUNBOOK_ROTATION_CLES.md`.

2. **Retirer `.env` du tracking Git**
   ```bash
   cd /chemin/ecolet3p
   git rm --cached .env
   git add .gitignore .env.example
   git commit -m "chore(security): stop tracking .env, add template + runbook"
   ```

3. **Vérifier qu'aucune `service_role` key n'a fuité**
   ```bash
   git log --all -p -S "service_role" -- .
   ```
   Si résultat non vide → rotater `SERVICE_ROLE_KEY` côté Supabase **immédiatement**.

### 🟠 À valider / compléter cette semaine

4. **Relire les 3 nouvelles pages légales** pour adapter au contexte réel :
   - CGV Art. 4 : confirmer le régime TVA (franchise en base 293 B ou autre)
   - CGV Art. 6 : barème annulation (actuellement 14j / 7j / <7j — à ajuster si ta pratique diffère)
   - CGV Art. 4 : acompte 30 % (confirmer)
   - Règlement intérieur Art. 7 : texte accessibilité PMR — remplacer « en cours de mise en conformité » par le statut réel
   - Nos Chiffres : les valeurs publiées ("1 000+", "< 15 jours") sont estimatives ; à vérifier et ajuster

5. **Lancer la demande DREETS** (numéro de déclaration d'activité — NDA)
   → Dossier en ligne sur `mon.activite.emploi.gouv.fr`.
   Une fois obtenu : remplacer le placeholder dans `LegalMentions.tsx` ligne ~114.

6. **Planifier l'audit Qualiopi** (certificateur accrédité Cofrac)
   Budget ~1 200–2 000 € HT. Une fois obtenu : remplacer le placeholder dans `LegalMentions.tsx` ligne ~115 et publier les indicateurs réels dans `NosChiffres.tsx`.

7. **Désigner officiellement le référent handicap** (peut être toi-même au démarrage)
   Mettre à jour `LegalMentions.tsx` ligne ~124 et `ReglementInterieur.tsx` Art. 7.

### 🟡 Technique

8. **Appliquer la migration Supabase**
   ```bash
   supabase db push
   # ou, si CLI non installée :
   # copier le SQL de 20260416000000_harden_newsletter_rls.sql
   # et l'exécuter dans le SQL Editor du dashboard
   ```
   ✅ **Non régressif** — l'Edge Function `unsubscribe-newsletter` utilise déjà `SERVICE_ROLE_KEY` (bypass RLS). Le flux de désinscription continue de fonctionner.

9. **Type-check / build**
   Je n'ai pas pu exécuter `tsc --noEmit` (permission sandbox). À lancer manuellement :
   ```bash
   npm run build
   ```
   Les 3 nouvelles pages suivent exactement le pattern de `LegalMentions.tsx` (imports, Layout, DynamicSEOHead, Breadcrumb, framer-motion). Risque de casse très faible.

10. **Ajouter les 3 nouvelles routes au sitemap.xml et à `scripts/prerender.mjs`**
    (à faire dans Sprint 2, mais pense à vérifier que `/cgv`, `/reglement-interieur`, `/nos-chiffres` apparaissent bien dans le sitemap dans les 48 h après déploiement).

---

## Choix par défaut que j'ai faits (à infirmer si besoin)

- **Placeholders "en cours de demande / d'obtention / de désignation"** plutôt que d'omettre les infos → recommandé juridiquement (transparence vs dissimulation).
- **Médiateur consommation** : annoncé comme *désigné à l'issue de la certification Qualiopi* — permet de repousser proprement.
- **Barème annulation CGV** : 14j/7j/<7j — standard du marché de la formation pro continue.
- **Acompte CGV** : 30 % — standard.
- **Délai de rétractation** : double mention (L.221-18 Code conso pour particulier + L.6353-5 Code travail pour formation pro continue).
- **Juridiction compétente** : Tribunaux de Nanterre (siège à Montrouge 92).
- **Date d'entrée en vigueur** : 16 avril 2026 (hier, cohérent).
- **Nos Chiffres — valeurs publiées** : "1 000+ stagiaires formés depuis 2014" et "5,0/5 sur 359 avis" — extrapolées depuis le JSON-LD d'`index.html`. À vérifier.

---

## Ce qui reste (Batch 2 & Sprints suivants)

**Sprint 1 Batch 2** (session suivante — contexte neuf requis) :
- Honeypot + Cloudflare Turnstile sur 6 formulaires publics
- Rate-limiting Edge Functions (table `rate_limits` Supabase + middleware)

**Sprint 2** — SEO & perf :
- Supprimer 4 pages orphelines (`FormationAccompagnementAdmin`, `FormationGestionEntreprise`, `FormationMobilite`, `FormationPMR`)
- Unifier palette couleurs (tailwind config vs index.css vs charte) — choix forest #1B4D3E à confirmer
- Regénérer hero WebP (1.3 Mo → ~150 Ko)
- Synchroniser `sitemap.xml` avec `scripts/prerender.mjs` (+ les 3 nouvelles routes)
- Ajouter SIRET/DREETS/Qualiopi dans le bloc SEO fallback de `index.html`

**Sprint 3** — qualité :
- Typer les 32 `any`
- Supprimer shadcn inutilisés (`command.tsx`, `sidebar.tsx`)
- Unifier les 2 formulaires de pré-inscription
- Retirer Lorem ipsum dans `CharteGraphique.tsx:26`
- Wrapper `ProtectedRoute` au niveau router
- Restreindre CORS Edge Functions à `https://ecolet3p.fr` en prod
- Sentry + PostHog
- Skip-to-content link (a11y)
- Dédupliquer lockfiles
- Personnaliser `README.md`

---

## Commandes pour ce matin

```bash
cd /chemin/vers/ecolet3p

# 1. Revoir le diff
git status
git diff

# 2. Si OK, créer branche + commit
git checkout -b chore/sprint-1-batch-1-legal-security
git rm --cached .env
git add .
git commit -m "feat(legal,security): sprint 1 batch 1 — CGV, RI, Nos Chiffres, .env hygiene + RLS harden"
git push -u origin chore/sprint-1-batch-1-legal-security

# 3. Ouvrir PR + faire rotation clé Supabase en parallèle
```

Bon réveil 🌅
