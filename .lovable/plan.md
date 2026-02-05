# Plan de Développement - ECOLE T3P

## ✅ Phase 1 : Rebranding T3P Campus → ECOLE T3P (TERMINÉ - 29/01/2026)

> Migration complète effectuée

### Modifications effectuées
- Pages de formations avec SEO et schemas JSON-LD
- Contact, About, Blog avec nouvelles métadonnées
- Templates HTML renommés (attestation, carte-visite, contrat, flyer)
- Documentation charte graphique mise à jour
- Composant EcoleT3PLogo intégré partout

---

## ✅ Phase 2 : Restructuration Conversion (29/01/2026)

> Voir historique ci-dessous

---

## 🚧 Phase 3 : Refonte UX Psychologie Cognitive (EN COURS)

### 🎯 Objectif Global
Refondre le site selon les principes de psychologie cognitive et UX institutionnel :
- Réduire la friction mentale
- Fluidifier le parcours utilisateur  
- Renforcer la confiance perçue
- Augmenter les réservations sans pression commerciale

**Règle d'or** : En moins de 5 secondes, le visiteur comprend :
1. De quoi il s'agit
2. Pourquoi c'est obligatoire
3. Ce qu'il doit faire ensuite

### 📋 Décisions Clés

| Question | Décision |
|----------|----------|
| Périmètre produit | Garder formations initiales + continues |
| Témoignages/Stats | Retirer de l'accueil, conserver sur /a-propos |
| Priorité | Plan complet puis implémentation |

---

### 🏗️ Architecture Cible

#### PAGE D'ACCUEIL (/)

**Hero Section – CLARTÉ IMMÉDIATE**
- Titre : "Formation Continue Obligatoire – Chauffeurs TAXI, VTC et VMDTR"
- Sous-titre : "Renouvellement de la carte professionnelle – Centre de formation agréé"
- Micro-texte : "Conformément à la réglementation en vigueur"
- CTA unique : "Voir les formations" (exploratoire, non pressant)
- ❌ Retirer : badge pulsant, stats 94%, témoignage alumni, CTA devis urgent

**Section Formations – 3 CARTES MAXIMUM**
- Nom de la formation (TAXI / VTC / VMDTR)
- Mention "Formation continue obligatoire"
- Durée : 14h | Prix
- Bouton : "Voir le programme"
- ❌ Retirer : arguments commerciaux, pourcentages, badges "Populaire"

**Sections à RETIRER de l'accueil**
- ❌ WhyChooseUsSection
- ❌ AdvantagesSection
- ❌ TestimonialsSection
- ❌ GoogleReviewsSection
- ❌ ProcessSection

**Sections à CONSERVER (simplifiées)**
- ✅ LocalsSection → "Notre Centre" (factuel)
- ✅ FAQSection → questions réglementaires uniquement
- ✅ AppointmentSection → "Réserver une session" (neutre)

---

#### PAGES FORMATIONS CONTINUES (/formations/continue-taxi, etc.)

**Structure IDENTIQUE pour chaque formation** :

1. Hero simplifié (titre + sous-titre factuel)
2. Bloc Définition : "Formation continue obligatoire pour le renouvellement de la carte professionnelle"
3. Bloc Réglementation : "La formation continue est requise tous les 5 ans conformément à la réglementation en vigueur."
4. Informations Clés : Durée (14h) | Format | Lieu | Validité (5 ans)
5. Objectifs (4 max) : Actualisation réglementaire, Sécurité, Conformité, Renouvellement
6. Tarif : présenté comme "tarif réglementaire", sans promotion
7. CTA Final : "Réserver une session"
8. Sessions disponibles (dates factuelles)

---

#### PAGE /A-PROPOS

**Contenu déplacé ici depuis l'accueil** :
- Témoignages
- Statistiques de réussite (94%)
- Avis Google
- Photos du centre

**Contenu autorisé** :
- Centre de formation agréé
- Conformité réglementaire
- Encadrement pédagogique

---

#### FOOTER

**Obligatoire** :
- Adresse, Téléphone, Email
- "Centre de formation agréé"
- SIRET

**À retirer** :
- ❌ Badges "94% réussite", "Depuis 2014"

---

### 🎨 Design & UX

| Aspect | Règle |
|--------|-------|
| Zones blanches | Assumées, une info = une zone |
| Typographie | Titres courts, paragraphes ≤ 2 lignes |
| CTA | Exploratoire ("Voir", "Consulter"), jamais injonctif |
| Animations | Minimales, pas de pulse/shake |

---

### 🧠 Principes Psychologiques

| Principe | Application |
|----------|-------------|
| Loi de Hick | 3 choix max par section |
| Hiérarchie visuelle | Titre > Sous-titre > CTA |
| Réassurance implicite | "Centre agréé" visible partout |
| Fluidité cognitive | Parcours linéaire évident |

---

### 🚫 Interdictions Strictes

- ❌ Marketing agressif
- ❌ Promesses de résultats
- ❌ Témoignages sur pages principales
- ❌ Pourcentages sur accueil
- ❌ Compte à rebours / urgence
- ❌ Badges pulsants

---

### 📦 Checklist d'Implémentation

**Phase 3.1 : Page d'Accueil**
- [ ] Refonte HeroSection (institutionnel)
- [ ] Nouvelle section "Choisir sa formation" (3 cartes)
- [ ] Simplification LocalsSection
- [ ] Simplification FAQSection
- [ ] Retrait sections marketing

**Phase 3.2 : Pages Formations Continues**
- [ ] Template unifié FormationContinuePage
- [ ] Page Formation Continue TAXI
- [ ] Page Formation Continue VTC
- [ ] Page Formation Continue VMDTR

**Phase 3.3 : Pages Secondaires**
- [ ] Refonte /a-propos (déplacer témoignages)
- [ ] Mise à jour Footer (SIRET visible)

**Phase 3.4 : Nettoyage**
- [ ] Supprimer composants inutilisés
- [ ] Tests utilisateur

---

### ✅ Critère de Succès

> Le visiteur pense : "C'est clair. C'est obligatoire. C'est sérieux. Je sais quoi faire."
> Sans jamais se sentir poussé.

---

## Informations légales ECOLE T3P

| Champ | Valeur |
|-------|--------|
| Raison sociale | ECOLE T3P (EURL) |
| SIRET | 94856480200023 |
| Capital | 2 000 € |
| Dirigeant | Karim KATI |
| Adresse | 3 rue Corneille, 92120 Montrouge |
| Téléphone | 01 88 75 05 55 |
| Email | montrouge@ecolet3p.fr |
| Site | www.ecolet3p.fr |
