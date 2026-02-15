# 🔍 AUDIT COMPLET — www.ecolet3p.fr
## Date : 13 février 2026

---

## 🔴 ALERTE CRITIQUE : LE SITE N'EST PAS INDEXÉ PAR GOOGLE

C'est le problème n°1, de très loin. Voici les preuves :

- **`site:ecolet3p.fr`** → 0 résultat
- **`site:www.ecolet3p.fr`** → 0 résultat
- **`"ecolet3p"`** → 0 résultat
- **`"ecole t3p" formation`** → 0 résultat
- **`formation taxi vtc montrouge 92`** → Drop Academy apparaît en 1er (même adresse : 3 rue Corneille !), BVTC en 2ème, CFCT92IDF en 3ème. ECOLE T3P : **ABSENT**.

**Conséquence** : Aucun prospect ne peut trouver ton site via Google. Tout ton trafic vient uniquement du bouche-à-oreille, de Google Maps ou de liens directs. Tu es **invisible** sur le moteur de recherche qui génère 90% du trafic web.

**Cause probable** : Le site est une React SPA (Single Page Application) sur Lovable. Google a des difficultés à indexer les SPA qui font du client-side rendering. Même avec la solution de pre-rendering mise en place récemment, Google n'a toujours pas indexé le site.

**Actions urgentes** :
1. Vérifier dans Google Search Console si des pages sont soumises et si des erreurs de crawl sont signalées
2. Vérifier que le sitemap.xml existe et est soumis à Google Search Console
3. Vérifier que le robots.txt ne bloque pas le crawl
4. Vérifier que le pre-rendering fonctionne réellement (tester avec `curl` ou `fetch` la page d'accueil vue comme Googlebot)
5. Envisager une migration vers un framework SSR (Next.js, Astro) ou générer des pages HTML statiques

---

## 📊 ANALYSE SECTION PAR SECTION

---

### 1. TITLE & META (SEO technique)

**Title** : "ECOLE T3P — Formation Taxi VTC VMDTR à Montrouge | Sud Paris 92"
- ✅ Bien : contient les mots-clés principaux (Formation, Taxi, VTC, VMDTR, Montrouge, 92)
- ✅ Bien : longueur correcte (~60 caractères)
- ⚠️ Amélioration possible : ajouter un élément de différenciation ("94% réussite" ou "Agréé Préfecture")

**Ce qui manque (à vérifier dans le code source)** :
- Meta description optimisée ?
- Meta og:image, og:title, og:description pour le partage social ?
- Balise canonical ?
- Données structurées (Schema.org LocalBusiness, EducationalOrganization, Course) ?

---

### 2. HERO / ABOVE-THE-FOLD

**Positif** :
- ✅ H1 clair : "Devenez chauffeur Taxi, VTC ou VMDTR" — bon pour le SEO
- ✅ Badge "Centre agréé Préfecture 92" — crédibilité immédiate
- ✅ Note Google "5.0/5 — 359 avis" avec lien
- ✅ CTA double : "S'inscrire à la formation" + "Voir les tarifs"
- ✅ Compteur de places avec urgence ("Plus que 4 places pour la session de mars 2026")
- ✅ Mini-cartes formation (Taxi / VTC / VMDTR)
- ✅ Photo authentique de formation

**Problèmes constatés** :
- 🔴 Le sous-titre revient à la version factuelle : "Formation professionnelle agréée à Montrouge. Accompagnement complet de l'inscription à l'obtention de votre carte professionnelle." — Il avait été changé en version chiffrée (94% + 2000) sur Lovable mais le site live montre la version factuelle. **Vérifier si les changements ont été publiés.**
- 🔴 Espace vide excessif au-dessus du hero (visible sur les captures mobile)
- ⚠️ Le compteur indique "Plus que 4 places" — est-ce mis à jour dynamiquement ou c'est un chiffre fixe ? Si c'est faux, ça nuit à la crédibilité
- ⚠️ L'image n'a pas de srcset/responsive — une seule taille servie

---

### 3. BARRE DE STATS

```
94% Taux de réussite | +2000 Chauffeurs formés | 5.0/5 Note Google (359 avis) | 4x Paiement sans frais
```

- ✅ Bien structuré, chiffres forts
- ⚠️ Le "4x" n'est pas un "chiffre clé" au même titre que les 3 autres — c'est un argument commercial, pas une stat. Remplacer par "10+ ans d'expérience" ou "40+ élèves/mois" serait plus crédible

---

### 4. SECTION "NOS FORMATIONS"

**Contenu** :
- Formation Taxi (990€)
- Formation VTC (990€)
- Formation VMDTR (990€)
- Formation Continue (250€)

**Problèmes** :
- ⚠️ Les descriptions sont très courtes et génériques. "Devenez chauffeur VTC professionnel avec notre formation agréée" — ça ne dit rien de spécifique
- ⚠️ Il manque les formations Continue Taxi, Continue VTC, Mobilité, Récupération de points — elles sont dans le footer mais pas dans cette section
- 🟡 Les prix affichent "soit 4× 248€" mais le vrai calcul est 247,50€ — incohérence mineure mais remarquable
- ⚠️ Pas de durée visible directement (63h est mentionné dans les mini-cartes du hero mais pas ici)
- 🟡 Le bouton "En savoir plus" est générique — préférer "Voir le programme Taxi" / "Découvrir la formation VTC"

---

### 5. PARCOURS EN 4 ÉTAPES

```
1. Contactez-nous → 2. Choisissez votre formation → 3. Suivez la formation → 4. Obtenez votre carte pro
```

- ✅ Bon : rassure le prospect sur la simplicité du processus
- ⚠️ Cette section est dupliquée plus bas ("Comment s'inscrire ?") avec quasi le même contenu. C'est redondant — fusionner les deux ou en supprimer une

---

### 6. SECTION "POURQUOI CHOISIR ECOLE T3P ?"

- ✅ 94% taux de réussite — bon argument
- ✅ 5 min du métro — bon pour le local
- ✅ Suivi post-formation — différenciant
- ✅ Paiement 4x — facilitateur

- ⚠️ Reprend les mêmes arguments que la barre de stats. Trouver des arguments différenciants supplémentaires : formation en petits groupes ? Formateurs terrain ? Planning flexible ?

---

### 7. SECTION PAIEMENT

- ✅ Bonne explication du paiement en 4×
- ⚠️ Pas de mention d'Alma ni de logo (sur la version live, contrairement à ce qu'on a vu dans Lovable preview)
- ⚠️ Texte "4× sans frais" affiché seul sans contexte visuel fort — pas assez impactant

---

### 8. TÉMOIGNAGES

3 avis affichés :
- Mohamed K. (VTC, Décembre 2025)
- Sophie L. (Taxi, Novembre 2025)
- Alexandre D. (VTC, Octobre 2025)

**Problèmes** :
- 🔴 Ces témoignages semblent **inventés**. Ils sont trop parfaits, pas de noms complets, pas de photos, pas de liens vers des vrais avis Google. Google et les visiteurs détectent les faux avis — ça peut nuire à la crédibilité
- ✅ Le lien "Voir les 359 avis sur Google" est bon — c'est la preuve sociale réelle
- **Recommandation** : remplacer par de vrais extraits d'avis Google (avec screenshot ou en citant le texte exact) ou intégrer un widget d'avis Google (EmbedSocial, Elfsight, etc.)

---

### 9. FAQ

6 questions listées mais **les réponses ne sont pas visibles dans le HTML retourné**. C'est un problème majeur pour le SEO :

- 🔴 Si les réponses sont chargées en JavaScript uniquement (client-side), Google ne les voit pas = 0 valeur SEO
- Les FAQ sont une mine d'or pour les featured snippets Google ("Qu'est-ce que la carte professionnelle T3P ?")
- **Action** : s'assurer que les réponses sont dans le HTML statique (même cachées avec `max-height: 0` + `overflow: hidden`, PAS `display: none`)
- Ajouter le balisage Schema.org FAQPage pour éligibilité aux rich snippets

---

### 10. SECTION CONTACT

- ✅ Numéro de téléphone cliquable (tel:)
- ✅ Email visible
- ✅ Adresse physique
- ✅ Horaires
- ✅ Formulaire de devis

- ⚠️ Le formulaire semble être un simple champ (pas visible en détail). Idéalement : Nom, Téléphone, Email, Formation souhaitée, Message

---

### 11. FOOTER

- ✅ Complet : toutes les formations listées, liens utiles, coordonnées
- ✅ SIRET visible
- ✅ Mentions légales + Politique de confidentialité
- ✅ Lien Google Maps/avis
- ✅ Lien vers "Location véhicule examen" (service additionnel)

- ⚠️ Pas de lien vers les réseaux sociaux (Instagram, Facebook, LinkedIn, TikTok) — même si pas prioritaire, ça renforce la présence en ligne
- ⚠️ Pas de lien vers la page "Paiement" dans le footer (pourtant il y a une page /paiement dans la navbar)

---

### 12. NAVIGATION / STRUCTURE DU SITE

Pages dans la navbar :
- Formations (dropdown)
- Paiement ← NOUVEAU, bien
- Blog
- À propos
- Contact

Pages dans le footer (formations) :
- /formations/taxi
- /formations/vtc
- /formations/vmdtr
- /formations/continue-taxi
- /formations/continue-vtc
- /formations/mobilite
- /stage-recuperation-points
- /services/location-vehicule-examen

**Problèmes** :
- ⚠️ La navbar ne montre pas la page "Paiement" dans le HTML retourné — elle est peut-être dans le dropdown "Formations"
- 🟡 Le blog existe (/blog) — mais est-il alimenté ? Le contenu de blog est crucial pour le SEO

---

## 📱 PROBLÈMES MOBILE (constatés sur captures iPhone)

| Bug | Gravité | Status |
|-----|---------|--------|
| Overflow horizontal — contenu coupé à droite | 🔴 Critique | Probablement corrigé (capture 04:08 vs 03:42) |
| H1 coupé en haut / badge disparu | 🔴 Critique | À vérifier |
| Espace vide excessif au-dessus du hero | 🟠 Haut | Non corrigé |
| Chevauchement bouton tel + bulle chat + CTA sticky | 🟠 Haut | Non corrigé |
| Bouton CTA tronqué | 🟠 Haut | Probablement corrigé |

---

## 🆚 COMPARAISON CONCURRENTIELLE (sur "formation taxi vtc montrouge 92")

| Critère | ECOLE T3P | Drop Academy | BVTC |
|---------|-----------|--------------|------|
| Indexé Google | ❌ NON | ✅ Oui (1er) | ✅ Oui (2ème) |
| Page dédiée Montrouge | ❌ Non | ✅ Oui | ✅ Oui |
| Avis Google | 359 (5.0) | 77 avis | Non vérifié |
| Même adresse ! | 3 rue Corneille | 3 rue Corneille | Autre |
| Taux réussite affiché | 94% | Non affiché | 95% |
| Prix formation VTC | 990€ | Non affiché | Non affiché |
| Paiement facilité | 4× Alma | Non mentionné | Non mentionné |

**Point crucial** : Drop Academy est à la MÊME adresse que toi (3 rue Corneille, 92120 Montrouge) et apparaît en 1er sur Google pour ta requête cible. Toi, tu n'apparais pas du tout. C'est une situation d'urgence absolue.

---

## 📋 PLAN D'ACTION PAR PRIORITÉ

### 🔴 URGENCE ABSOLUE (cette semaine)

1. **Résoudre le problème d'indexation** :
   - Vérifier Google Search Console (pages indexées, erreurs)
   - Soumettre le sitemap.xml
   - Tester le rendu de la page comme Google le voit (outil d'inspection d'URL dans GSC)
   - Si le pre-rendering ne fonctionne pas → envisager un site HTML statique/SSR pour les pages critiques

2. **Corriger les bugs mobile** :
   - Overflow horizontal
   - Espace vide hero
   - Chevauchement des éléments en bas d'écran

### 🟠 HAUTE PRIORITÉ (cette quinzaine)

3. **FAQ : réponses dans le HTML** + balisage Schema.org FAQPage
4. **Témoignages** : remplacer les faux avis par de vrais avis Google
5. **Blog** : publier au minimum 3-5 articles SEO ciblés :
   - "Formation VTC Montrouge : programme, prix, inscription"
   - "Comment devenir chauffeur taxi en 2026 : guide complet"
   - "Formation VMDTR : tout savoir sur le taxi moto"
   - "Paiement en 4× sans frais pour votre formation taxi VTC"

### 🟡 PRIORITÉ MOYENNE (ce mois)

6. **Données structurées Schema.org** : LocalBusiness + Course + FAQPage + Review
7. **Descriptions de formations enrichies** : contenu unique et détaillé pour chaque formation
8. **Meta descriptions optimisées** pour chaque page
9. **Intégration Alma visible** avec logo sur le site live (pas seulement dans Lovable preview)
10. **Supprimer la redondance** : fusionner "Parcours en 4 étapes" et "Comment s'inscrire"

### 🟢 BONUS (ce trimestre)

11. Créer des pages de ville ciblées (formation VTC Montrouge, formation taxi Hauts-de-Seine, etc.)
12. Intégrer un widget d'avis Google sur le site
13. Optimiser les Core Web Vitals (LCP, CLS, INP)
14. Ajouter des réseaux sociaux

---

## RÉSUMÉ EN 1 PHRASE

> **Le site est bien conçu visuellement et le contenu est bon, MAIS il est totalement invisible sur Google — c'est comme avoir une belle boutique dans une rue piétonne avec la vitrine opaque. Tout l'effort SEO technique (indexation, Schema.org, contenu blog) est la priorité absolue avant toute amélioration visuelle.**
