
# Plan de Rebranding Complet : T3P Campus vers ECOLE T3P

## Contexte

Suite a la premiere phase de rebranding qui a mis a jour le Header, Footer, Index.tsx, les pages legales et cree le nouveau systeme de logo `EcoleT3PLogo.tsx`, cette phase complete la migration en mettant a jour toutes les pages de formations et les fichiers restants.

---

## Phase 1 : Pages de Formations (Priorite Haute)

### 1.1 FormationTaxi.tsx
**Modifications requises :**
- Metadonnees SEO : titre, description, canonical URL (`ecolet3p.fr`)
- Schema JSON-LD Course : provider.name, provider.sameAs
- Schema BreadcrumbList : toutes les URLs
- Alt text images : "T3P Campus" vers "ECOLE T3P"
- Texte descriptif dans les cards : "Centre T3P Campus" vers "Centre ECOLE T3P"

### 1.2 FormationVTC.tsx
**Modifications identiques :**
- Metadonnees SEO completes
- Schemas JSON-LD (Course, FAQ, Breadcrumb)
- Alt text et textes descriptifs
- URLs canoniques vers ecolet3p.fr

### 1.3 FormationVMDTR.tsx
**Modifications identiques :**
- Metadonnees SEO
- Schemas JSON-LD
- Textes descriptifs et alt text

### 1.4 FormationMobilite.tsx
**Modifications identiques :**
- Metadonnees SEO
- Schemas JSON-LD
- Textes descriptifs

### 1.5 Formations.tsx (Catalogue)
**Modifications :**
- Titre et meta description
- Schema ItemList : name, description, url
- Schemas Course : provider.name, provider.sameAs
- Schema Breadcrumb : URLs
- URLs d'images (`t3pcampus.fr` vers `ecolet3p.fr`)

---

## Phase 2 : Autres Pages Principales

### 2.1 Contact.tsx
**Modifications :**
- Email : `montrouge@t3pcampus.fr` vers `montrouge@ecolet3p.fr`
- Titre Helmet et meta description
- Schema ContactPage : name, url, mainEntity
- Schema LocalBusiness : name, email
- Schema Breadcrumb : URLs
- Title de l'iframe Google Maps

### 2.2 About.tsx
**Modifications :**
- Titre Helmet et meta description
- Schema EducationalOrganization : name, alternateName, url, logo, email
- Schema LocalBusiness : name, email, url
- Schema Breadcrumb : URLs
- Alt text de l'image gallery
- Texte dans le contenu : "T3P Campus" vers "ECOLE T3P"

### 2.3 Blog.tsx
**Modifications :**
- Titre et meta description
- Schema Blog : name, url, publisher
- Schema ItemList : name, url
- Schema Breadcrumb : URLs
- Logos references dans les schemas

### 2.4 BlogArticle.tsx
**Modifications :**
- Titre document dynamique
- Schema Article : author, publisher
- Logo URL dans les schemas

### 2.5 CharteGraphique.tsx
**Modifications :**
- Titre Helmet : "Campus T3P" vers "ECOLE T3P"
- Textes descriptifs dans la page
- Exemples de typographie

### 2.6 LogoExport.tsx
**Modifications :**
- Import du composant : `T3PCampusLogo` vers `EcoleT3PLogo`
- Textes descriptifs
- Footer avec email

---

## Phase 3 : Donnees et Contenus

### 3.1 blogArticles.ts
**Modifications :**
- Champ `author` : "T3P Campus" vers "ECOLE T3P"
- References dans le contenu des articles
- URLs mentionnees

### 3.2 TestimonialsSection.tsx
**Verification :** 
- Reference "T3P Campus" dans les temoignages

---

## Phase 4 : Edge Functions (Backend)

### 4.1 appointment-reminder/index.ts
**Modifications :**
- Email from : `Campus T3P <montrouge@t3pcampus.fr>` vers `ECOLE T3P <montrouge@ecolet3p.fr>`
- Textes dans les templates HTML emails
- Footer des emails

### 4.2 notify-new-appointment/index.ts
**Modifications :**
- adminEmail : `montrouge@t3pcampus.fr` vers `montrouge@ecolet3p.fr`
- Email from : `Campus T3P` vers `ECOLE T3P`
- Textes dans le template HTML

### 4.3 notify-new-registration/index.ts
**Modifications :**
- adminEmail : `montrouge@t3pcampus.fr` vers `montrouge@ecolet3p.fr`
- Email from
- Textes et footer du template

### 4.4 send-newsletter-confirmation/index.ts
**Modifications :**
- Email from
- URLs dans le template (`campust3ptest.lovable.app` vers le nouveau domaine)
- Textes dans le contenu HTML
- Unsubscribe URL

### 4.5 confirm-appointment/index.ts
**Modifications similaires**

### 4.6 unsubscribe-newsletter/index.ts
**Modifications similaires**

---

## Phase 5 : Templates HTML (public/templates/)

### 5.1 Fichiers a mettre a jour :
- `attestation-campus-t3p.html` (renommer vers `attestation-ecole-t3p.html`)
- `carte-visite-campus-t3p.html` (renommer vers `carte-visite-ecole-t3p.html`)
- `contrat-campus-t3p.html` (renommer vers `contrat-ecole-t3p.html`)

### 5.2 Dans chaque template :
- Remplacer "Campus T3P" par "ECOLE T3P"
- Mettre a jour les emails
- Logos et references visuelles

---

## Phase 6 : Fichiers de Configuration

### 6.1 public/charte-graphique-campus-t3p.md
**Renommer vers :** `charte-graphique-ecole-t3p.md`
**Contenu :** Mettre a jour toutes les references

---

## Resume des Fichiers a Modifier

### Fichiers TypeScript/TSX (16 fichiers) :
1. `src/pages/FormationTaxi.tsx`
2. `src/pages/FormationVTC.tsx`
3. `src/pages/FormationVMDTR.tsx`
4. `src/pages/FormationMobilite.tsx`
5. `src/pages/Formations.tsx`
6. `src/pages/Contact.tsx`
7. `src/pages/About.tsx`
8. `src/pages/Blog.tsx`
9. `src/pages/BlogArticle.tsx`
10. `src/pages/CharteGraphique.tsx`
11. `src/pages/LogoExport.tsx`
12. `src/data/blogArticles.ts`
13. `src/components/home/TestimonialsSection.tsx`

### Edge Functions (6 fichiers) :
1. `supabase/functions/appointment-reminder/index.ts`
2. `supabase/functions/notify-new-appointment/index.ts`
3. `supabase/functions/notify-new-registration/index.ts`
4. `supabase/functions/send-newsletter-confirmation/index.ts`
5. `supabase/functions/confirm-appointment/index.ts`
6. `supabase/functions/unsubscribe-newsletter/index.ts`

### Templates HTML (3 fichiers a renommer et modifier) :
1. `public/templates/attestation-campus-t3p.html`
2. `public/templates/carte-visite-campus-t3p.html`
3. `public/templates/contrat-campus-t3p.html`

### Fichiers Markdown (1 fichier) :
1. `public/charte-graphique-campus-t3p.md`

---

## Tableau des Remplacements Globaux

| Ancien | Nouveau |
|--------|---------|
| T3P Campus | ECOLE T3P |
| Campus T3P | ECOLE T3P |
| t3pcampus.fr | ecolet3p.fr |
| montrouge@t3pcampus.fr | montrouge@ecolet3p.fr |
| T3PCampusLogo | EcoleT3PLogo |
| T3PCampusIcon | EcoleT3PIcon |
| t3p-campus-favicon.svg | ecole-t3p-favicon.svg |
| Centre T3P Campus | Centre ECOLE T3P |
| campust3ptest.lovable.app | (a definir - nouveau domaine) |

---

## Notes Techniques

1. **Logos** : Le composant `EcoleT3PLogo` existe deja et doit remplacer `T3PCampusLogo`
2. **Favicon** : `/logo/ecole-t3p-favicon.svg` existe deja et est reference dans `index.html`
3. **Schemas SEO** : Tous les schemas JSON-LD doivent etre mis a jour pour la coherence Google
4. **Edge Functions** : Deploiement automatique apres modification

---

## Ordre d'Execution Recommande

1. Pages de formations (impact SEO majeur)
2. Pages principales (Contact, About, Blog)
3. Donnees et contenus (blogArticles)
4. Edge Functions (backend)
5. Templates HTML (documents)
6. Fichiers de configuration

