# Plan de Restructuration UX — ECOLE T3P

> **Objectif** : Site institutionnel, fluide, sans friction cognitive, qui oriente chaque profil vers le bon parcours.

---

## 1. Profils Utilisateurs

| Profil | Besoin | Parcours cible |
|--------|--------|----------------|
| Candidat débutant | Formation initiale | /formations/taxi, /formations/vtc, /formations/vmdtr |
| Conducteur en activité | Formation continue | /formations/continue-taxi, /formations/continue-vtc, /formations/continue-vmdtr |
| Chauffeur changeant de zone | Mobilité taxi | /formations/mobilite |
| Automobiliste | Récupération de points | /formations/recuperation-points |
| Candidat examen pratique | Location véhicule | /services/location-vehicule-examen |

---

## 2. Architecture du Site

### Menu Principal

```
Accueil
Formations ▾
  ├─ Formations Initiales
  │   ├─ TAXI
  │   ├─ VTC
  │   └─ VMDTR
  ├─ Formations Continues
  │   ├─ Continue TAXI (14h)
  │   ├─ Continue VTC (14h)
  │   └─ Continue VMDTR (14h)
  ├─ Mobilité Taxi (75, 92)
  └─ Récupération de Points
Services ▾
  └─ Location véhicule examen
      ├─ Examen VTC (189€)
      ├─ Examen TAXI (249€)
      └─ Examen VMDTR (299€)
Pourquoi ECOLE T3P
Contact
```

---

## 3. Phases d'Implémentation

### Phase 1 — Page d'Accueil (Priorité Haute)

#### 1.1 Hero Section
- **Titre** : `ECOLE T3P — Formations & services transport réglementés`
- **Sous-titre** : `Formations initiales et continues • Mobilité taxi • Récupération de points • Examens`
- **Micro-texte** : `Centre de formation agréé — Conformément à la réglementation en vigueur`
- **CTA principal** : `Voir toutes les formations`
- **CTA secondaire** : `Accéder aux services d'examen`

#### 1.2 Section Formations (OffersSection refonte)
- 4 blocs maximum :
  1. **Formations Initiales** → /formations (filtre initiales)
  2. **Formations Continues** → /formations (filtre continues)
  3. **Mobilité Taxi** → /formations/mobilite
  4. **Récupération de Points** → /formations/recuperation-points
- Chaque bloc : Titre + 1 phrase + Bouton "En savoir plus"

#### 1.3 Section Services (Nouveau)
- Bloc unique : **Location véhicule examen**
- 3 sous-offres : VTC (189€), TAXI (249€), VMDTR (299€)
- CTA : `Réserver un véhicule`

#### 1.4 Sections à supprimer de l'accueil
- ❌ TestimonialsSection
- ❌ GoogleReviewsSection  
- ❌ Stats/pourcentages
- ❌ Badges "94% réussite"

#### 1.5 Sections à conserver (modifiées)
- ✅ WhyChooseUsSection → Renommer "Pourquoi ECOLE T3P" (sans témoignages)
- ✅ FAQSection → Conserver, rendre factuel
- ✅ CTASection → CTA sobre, exploratoire
- ✅ AppointmentSection → Conserver

---

### Phase 2 — Header & Navigation

#### 2.1 Menu Desktop
- Dropdown "Formations" avec sous-catégories (Initiales, Continues, Mobilité, Points)
- Nouveau lien "Services" avec dropdown (Location véhicule examen)
- Liens : Pourquoi ECOLE T3P, Contact

#### 2.2 Menu Mobile
- Accordéon pour Formations (avec sous-catégories)
- Accordéon pour Services
- Navigation claire par catégorie

---

### Phase 3 — Pages Formations (Structure Unifiée)

#### Structure commune à TOUTES les formations :

```
1. Hero compact
   - Titre formation
   - Badge : "Formation initiale" ou "Formation continue obligatoire"
   
2. Définition factuelle
   - 2-3 lignes max
   
3. Cadre réglementaire
   - Encadré sobre avec mention légale
   
4. Informations clés (scan rapide)
   - Durée | Format | Lieu | Validité
   
5. Objectifs (max 4 points)
   - Liste à puces courte
   
6. Programme synthétique
   - Accordéon ou liste
   
7. Tarif
   - Prix sans promotion
   - Mention "Tarif conforme à la réglementation"
   
8. Sessions disponibles
   - Tableau des prochaines dates
   
9. CTA
   - "Voir les sessions" ou "Réserver"
```

#### Pages existantes à modifier :
- [ ] /formations/taxi (initiale)
- [ ] /formations/vtc (initiale)
- [ ] /formations/vmdtr (initiale)
- [ ] /formations/mobilite
- [ ] /formations/recuperation-points

#### Pages à créer :
- [ ] /formations/continue-taxi (14h)
- [ ] /formations/continue-vtc (14h)
- [ ] /formations/continue-vmdtr (14h)

---

### Phase 4 — Page Services (Nouveau)

#### 4.1 Page /services/location-vehicule-examen

```
1. Titre
   "Location de véhicule double commande pour examen pratique"
   
2. Bloc réassurance
   - Véhicule conforme aux exigences réglementaires
   - Accompagnement jour de l'examen
   
3. Trois offres distinctes
   
   ┌─────────────────────────────────────┐
   │ EXAMEN VTC                          │
   │ 189 € TTC                           │
   │ • 2h de conduite                    │
   │ • Véhicule conforme                 │
   │ • Mise à disposition jour J         │
   │ [Réserver]                          │
   └─────────────────────────────────────┘
   
   ┌─────────────────────────────────────┐
   │ EXAMEN TAXI (75 & banlieue)         │
   │ 249 € TTC                           │
   │ • 2h de conduite                    │
   │ • Véhicule conforme                 │
   │ • Mise à disposition jour J         │
   │ [Réserver]                          │
   └─────────────────────────────────────┘
   
   ┌─────────────────────────────────────┐
   │ EXAMEN VMDTR                        │
   │ 299 € TTC                           │
   │ • 2h de conduite                    │
   │ • Moto conforme                     │
   │ • Mise à disposition jour J         │
   │ [Réserver]                          │
   └─────────────────────────────────────┘
   
4. Encadré informatif
   "Ce service est un accompagnement logistique. 
    Il ne constitue pas une formation."
    
5. CTA global
   "Réserver un véhicule pour l'examen"
```

---

### Phase 5 — Page "Pourquoi ECOLE T3P"

Déplacer ici les éléments de réassurance :
- Centre agréé
- Formateurs expérimentés
- Conformité réglementaire
- Sessions régulières
- (Optionnel) Témoignages discrets en bas de page
- Statistiques de réussite
- Avis Google

---

### Phase 6 — Footer

Informations obligatoires :
- Adresse physique : 3 rue Corneille, 92120 Montrouge
- Téléphone : 01 88 75 05 55
- Email : montrouge@ecolet3p.fr
- SIRET : 94856480200023
- Mention "Centre de formation agréé"
- Liens légaux (CGV, Politique de confidentialité, Mentions légales)

---

## 4. Règles de Design

### Couleurs (tokens existants)
- **Primary** : Forest (#1B4D3E) — Texte, éléments de confiance
- **Secondary** : Cream (#F5EBD7) — Fonds, zones de respiration
- **Accent** : Gold (#D4A853) — CTAs, mises en avant sobres

### Typographie
- Titres : Courts, majuscules modérées
- Paragraphes : ≤ 2 lignes
- Hiérarchie H1 > H2 > H3 stricte

### Spacing
- Sections : `py-16` minimum
- Zones blanches assumées
- Une information = une zone

---

## 5. Interdictions

| ❌ Interdit | ✅ Alternative |
|-------------|----------------|
| "94% de réussite" | "Centre de formation agréé" |
| Témoignages en hero | Témoignages en page secondaire |
| "Dernières places !" | "Sessions disponibles" |
| "Inscrivez-vous maintenant" | "Voir les sessions" |
| Badges marketing | Mentions réglementaires |
| Paiement 4x sans frais | Prix net unique |

---

## 6. Ordre d'Exécution

1. ✅ Plan validé
2. ✅ Phase 1.1 — Hero Section (accueil) — Titre institutionnel, CTA exploratoires
3. ✅ Phase 1.2 — Section Formations (accueil) — 4 blocs sans marketing
4. ✅ Phase 1.3 — Section Services (accueil) — Location véhicule examen
5. ✅ Phase 2 — Header/Navigation (menu restructuré) — Formations (3 catégories) + Services
6. ⬜ Phase 3 — Pages formations continues (créer)
7. ⬜ Phase 4 — Page services location véhicule
8. ⬜ Phase 5 — Page "Pourquoi ECOLE T3P"
9. ⬜ Phase 6 — Footer & nettoyage

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

---

*Dernière mise à jour : 2026-02-05*
