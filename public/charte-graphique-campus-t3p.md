# 🎨 Charte Graphique - Campus T3P

> Centre de Formation VTC, TAXI & VMDTR | Montrouge
> 
> Version 1.0 — Janvier 2026

---

## 📋 Table des matières

1. [Identité de marque](#1-identité-de-marque)
2. [Palette de couleurs](#2-palette-de-couleurs)
3. [Typographie](#3-typographie)
4. [Logo et utilisation](#4-logo-et-utilisation)
5. [Composants UI](#5-composants-ui)
6. [Iconographie](#6-iconographie)
7. [Espacements et grille](#7-espacements-et-grille)
8. [Templates documents](#8-templates-documents)
   - [Flyer](#81-modèle-de-flyer)
   - [Attestation de formation](#82-attestation-de-formation)
   - [Contrat de formation](#83-contrat-de-formation)
   - [Carte de visite](#84-carte-de-visite)
9. [Règles d'utilisation](#9-règles-dutilisation)

---

## 1. Identité de marque

### Philosophie

Campus T3P incarne **l'excellence professionnelle** dans la formation des chauffeurs VTC, TAXI et VMDTR. Notre identité visuelle reflète :

- **Professionnalisme** : Couleurs sobres et élégantes
- **Confiance** : Vert forêt rassurant et stable
- **Premium** : Accents dorés évoquant la réussite
- **Accessibilité** : Design clair et moderne

### Valeurs visuelles

| Valeur | Expression visuelle |
|--------|---------------------|
| Excellence | Typographie bold, espaces généreux |
| Confiance | Vert forêt dominant |
| Réussite | Accents dorés sur les CTAs |
| Modernité | Coins arrondis, ombres douces |

---

## 2. Palette de couleurs

### Couleurs principales

#### 🌲 Forest Green (Vert Forêt)
> Couleur principale — Utilisée pour les titres, backgrounds et éléments de confiance

| Variante | HEX | RGB | HSL | Usage |
|----------|-----|-----|-----|-------|
| **Default** | `#1B4D3E` | `27, 77, 62` | `158° 54% 20%` | Titres, header, footer |
| Light | `#2A6B54` | `42, 107, 84` | `159° 44% 29%` | Hover states, accents |
| Dark | `#143D31` | `20, 61, 49` | `163° 51% 16%` | Pressed states |

#### 🥐 Cream (Crème)
> Couleur de fond — Crée une atmosphère chaleureuse et accueillante

| Variante | HEX | RGB | HSL | Usage |
|----------|-----|-----|-----|-------|
| **Default** | `#F5EBD7` | `245, 235, 215` | `40° 52% 90%` | Background principal |
| Light | `#FBF7EF` | `251, 247, 239` | `40° 50% 96%` | Cards, zones claires |
| Dark | `#E8DCC4` | `232, 220, 196` | `40° 44% 84%` | Séparateurs |

#### ✨ Gold (Or)
> Couleur d'accent — Utilisée pour les CTAs et éléments d'action urgente

| Variante | HEX | RGB | HSL | Usage |
|----------|-----|-----|-----|-------|
| **Default** | `#D4A853` | `212, 168, 83` | `40° 60% 58%` | Boutons CTA, badges |
| Light | `#E4BE73` | `228, 190, 115` | `40° 65% 67%` | Hover states |
| Dark | `#C49843` | `196, 152, 67` | `40° 55% 52%` | Pressed states |

### Couleurs secondaires

#### Warm Gray (Gris Chaud)
> Pour les textes secondaires et éléments discrets

| Niveau | HEX | Usage |
|--------|-----|-------|
| 50 | `#FAF9F7` | Background ultra-léger |
| 100 | `#F0EEE9` | Séparateurs |
| 200 | `#E0DCD4` | Bordures |
| 300 | `#C9C4B8` | Texte désactivé |
| 400 | `#A9A295` | Placeholders |
| 500 | `#898172` | Texte secondaire |
| 600 | `#6B6B6B` | Corps de texte |
| 700 | `#4B463C` | Texte important |
| 800 | `#2C2922` | Texte principal (si non vert) |

### Couleurs fonctionnelles

| Couleur | HEX | Usage |
|---------|-----|-------|
| Success | `#22C55E` | Confirmations, validations |
| Warning | `#F59E0B` | Alertes, avertissements |
| Error | `#EF4444` | Erreurs, annulations |
| Info | `#3B82F6` | Informations |

### Gradients

```css
/* Gradient Hero principal */
background: linear-gradient(135deg, #1B4D3E 0%, #1F5545 50%, #2A6B54 100%);

/* Gradient bouton primaire */
background: linear-gradient(135deg, #1B4D3E 0%, #2A5F4D 100%);

/* Gradient bouton accent (or) */
background: linear-gradient(135deg, #D4A853 0%, #E4BE73 100%);

/* Gradient fond chaud */
background: linear-gradient(180deg, #FBF7EF 0%, #F5EBD7 40%, #EDE3CD 100%);

/* Gradient décoratif carte */
background: linear-gradient(90deg, #1B4D3E, #D4A853, #1B4D3E);
```

---

## 3. Typographie

### Polices

#### Plus Jakarta Sans — Titres
> Police display moderne et impactante

- **Téléchargement** : [Google Fonts](https://fonts.google.com/specimen/Plus+Jakarta+Sans)
- **Poids utilisés** : 600 (Semi-bold), 700 (Bold), 800 (Extra-bold)
- **Usage** : Titres H1-H6, statistiques, nombres importants

#### Inter — Corps de texte
> Police sans-serif optimisée pour la lisibilité écran

- **Téléchargement** : [Google Fonts](https://fonts.google.com/specimen/Inter)
- **Poids utilisés** : 400 (Regular), 500 (Medium), 600 (Semi-bold), 700 (Bold)
- **Usage** : Paragraphes, boutons, navigation, labels

### Hiérarchie typographique

| Élément | Police | Taille | Poids | Line-height | Letter-spacing |
|---------|--------|--------|-------|-------------|----------------|
| Display 1 | Plus Jakarta Sans | 72px (4.5rem) | 900 | 1.05 | -0.02em |
| Display 2 | Plus Jakarta Sans | 60px (3.75rem) | 900 | 1.1 | -0.02em |
| Display 3 | Plus Jakarta Sans | 48px (3rem) | 800 | 1.15 | -0.01em |
| H1 | Plus Jakarta Sans | 40px (2.5rem) | 800 | 1.2 | -0.01em |
| H2 | Plus Jakarta Sans | 32px (2rem) | 700 | 1.25 | -0.01em |
| H3 | Plus Jakarta Sans | 24px (1.5rem) | 700 | 1.3 | 0 |
| H4 | Plus Jakarta Sans | 20px (1.25rem) | 600 | 1.4 | 0 |
| Body Large | Inter | 18px (1.125rem) | 400 | 1.6 | 0 |
| Body | Inter | 16px (1rem) | 400 | 1.6 | 0 |
| Body Small | Inter | 14px (0.875rem) | 400 | 1.5 | 0 |
| Caption | Inter | 12px (0.75rem) | 500 | 1.4 | 0.02em |
| Button | Inter | 14px (0.875rem) | 700 | 1 | 0.05em |

### Exemple CSS

```css
/* Titres */
h1, h2, h3, h4, h5, h6 {
  font-family: 'Plus Jakarta Sans', sans-serif;
  color: #1B4D3E;
  font-weight: 800;
  letter-spacing: -0.01em;
}

/* Corps de texte */
body, p, span {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  color: #4B463C;
  font-weight: 400;
  line-height: 1.6;
}

/* Boutons */
button {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

---

## 4. Logo et utilisation

### Logo principal

Le logo Campus T3P est composé de :
- **Texte** : "Campus T3P" en Plus Jakarta Sans Extra-bold
- **Couleur principale** : Vert forêt `#1B4D3E`

### Déclinaisons

| Version | Fond | Couleur logo |
|---------|------|--------------|
| Standard | Clair/Blanc | `#1B4D3E` |
| Inversé | Vert forêt | `#F5EBD7` ou `#FFFFFF` |
| Or | Vert forêt | `#D4A853` |

### Zones de protection

- **Minimum** : Hauteur du "T" comme espace minimum autour du logo
- **Taille minimum** : 120px de large en digital, 30mm en print

### ❌ À ne pas faire

- Déformer les proportions
- Changer les couleurs arbitrairement
- Ajouter des effets (ombre, contour)
- Placer sur un fond de couleur similaire
- Rotation du logo

---

## 5. Composants UI

### Boutons

#### Bouton Primaire
```css
.btn-primary {
  background: linear-gradient(135deg, #1B4D3E 0%, #2A5F4D 100%);
  color: #FFFFFF;
  padding: 16px 32px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  box-shadow: 0 4px 15px rgba(27, 77, 62, 0.25);
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 35px rgba(27, 77, 62, 0.4);
}
```

#### Bouton Secondaire
```css
.btn-secondary {
  background: transparent;
  border: 2px solid #1B4D3E;
  color: #1B4D3E;
  padding: 14px 30px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 14px;
  text-transform: uppercase;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: #1B4D3E;
  color: #FFFFFF;
}
```

#### Bouton Accent (CTA)
```css
.btn-accent {
  background: linear-gradient(135deg, #D4A853 0%, #E4BE73 100%);
  color: #1B4D3E;
  padding: 16px 32px;
  border-radius: 12px;
  font-weight: 700;
  box-shadow: 0 4px 15px rgba(212, 168, 83, 0.35);
}
```

### Cards

```css
.card {
  background: #FFFFFF;
  border-radius: 16px;
  padding: 24px 32px;
  border: 1px solid rgba(27, 77, 62, 0.08);
  box-shadow: 0 2px 8px rgba(27, 77, 62, 0.04);
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(27, 77, 62, 0.12);
  border-color: rgba(27, 77, 62, 0.15);
}
```

### Badges

```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 9999px;
  font-size: 14px;
  font-weight: 700;
  background: linear-gradient(135deg, rgba(212, 168, 83, 0.25) 0%, rgba(212, 168, 83, 0.15) 100%);
  color: #1B4D3E;
  border: 1px solid rgba(212, 168, 83, 0.3);
}
```

### Inputs

```css
.input {
  background: #FFFFFF;
  border: 1px solid #E0DCD4;
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 16px;
  transition: all 0.2s ease;
}

.input:focus {
  outline: none;
  border-color: #1B4D3E;
  box-shadow: 0 0 0 3px rgba(27, 77, 62, 0.1);
}
```

---

## 6. Iconographie

### Style

- **Bibliothèque** : Lucide React
- **Style** : Ligne (stroke), pas de remplissage
- **Épaisseur** : 2px (strokeWidth: 2)
- **Tailles standard** : 16px, 20px, 24px, 32px, 48px

### Couleurs des icônes

| Contexte | Couleur |
|----------|---------|
| Navigation | `#1B4D3E` |
| Sur fond sombre | `#F5EBD7` ou `#FFFFFF` |
| CTA/Action | `#D4A853` |
| Désactivé | `#A9A295` |
| Succès | `#22C55E` |
| Erreur | `#EF4444` |

### Icônes courantes

| Usage | Icône Lucide |
|-------|--------------|
| Téléphone | `Phone` |
| Email | `Mail` |
| Localisation | `MapPin` |
| Calendrier | `Calendar` |
| Formation VTC | `Car` |
| Formation Taxi | `CarTaxiFront` |
| Formation VMDTR | `Bike` |
| Succès | `CheckCircle` |
| Rendez-vous | `CalendarCheck` |
| Documents | `FileText` |

---

## 7. Espacements et grille

### Système d'espacement

Basé sur un multiple de **4px** :

| Token | Valeur | Usage |
|-------|--------|-------|
| `space-1` | 4px | Espaces internes minimaux |
| `space-2` | 8px | Gaps entre éléments inline |
| `space-3` | 12px | Padding boutons small |
| `space-4` | 16px | Padding standard |
| `space-5` | 20px | Gaps entre cards |
| `space-6` | 24px | Padding sections small |
| `space-8` | 32px | Padding cards |
| `space-10` | 40px | Séparation sections |
| `space-12` | 48px | Padding sections medium |
| `space-16` | 64px | Padding sections desktop |
| `space-20` | 80px | Grandes séparations |
| `space-24` | 96px | Padding hero sections |

### Grille

- **Conteneur max** : 1440px
- **Padding horizontal** : 20px mobile, 32px tablette, 48px desktop
- **Colonnes** : 12 colonnes avec gouttière de 24px
- **Breakpoints** :
  - Mobile : 0-639px
  - Tablette : 640-1023px
  - Desktop : 1024px+
  - Large : 1280px+

### Border Radius

| Token | Valeur | Usage |
|-------|--------|-------|
| `radius-sm` | 6px | Inputs, badges |
| `radius` | 12px | Boutons, cards small |
| `radius-lg` | 16px | Cards standard |
| `radius-xl` | 20px | Cards large |
| `radius-2xl` | 24px | Containers, modals |
| `radius-full` | 9999px | Pills, avatars |

---

## 8. Templates documents

### 8.1 Modèle de Flyer

```
┌─────────────────────────────────────────────┐
│                                             │
│   ┌─────────────────────────────────────┐   │
│   │         [LOGO CAMPUS T3P]           │   │
│   │     Formation VTC & TAXI            │   │
│   └─────────────────────────────────────┘   │
│                                             │
│   ┌─────────────────────────────────────┐   │
│   │                                     │   │
│   │     DEVENEZ CHAUFFEUR              │   │
│   │     PROFESSIONNEL                   │   │
│   │                                     │   │
│   │     [Photo du centre]               │   │
│   │                                     │   │
│   └─────────────────────────────────────┘   │
│                                             │
│   ┌───────────┐  ┌───────────┐  ┌────────┐  │
│   │    96%    │  │   10+     │  │  4x    │  │
│   │  réussite │  │   ans     │  │ s/frais│  │
│   └───────────┘  └───────────┘  └────────┘  │
│                                             │
│   ┌─────────────────────────────────────┐   │
│   │  FORMATIONS DISPONIBLES             │   │
│   │  ─────────────────────              │   │
│   │  ✓ VTC Initial - 63h                │   │
│   │  ✓ TAXI Initial - 63h               │   │
│   │  ✓ VMDTR Moto-Taxi - 14h            │   │
│   │  ✓ Mobilité 75/92 - 14-35h          │   │
│   └─────────────────────────────────────┘   │
│                                             │
│   ╔═════════════════════════════════════╗   │
│   ║     PRENDRE RENDEZ-VOUS             ║   │
│   ║     📞 09 75 18 05 35               ║   │
│   ╚═════════════════════════════════════╝   │
│                                             │
│   21 Rue Hoche, 92120 Montrouge             │
│   M° Mairie de Montrouge (Ligne 4)          │
│                                             │
│   montrouge@t3pcampus.fr                    │
│   www.campust3p.fr                          │
│                                             │
└─────────────────────────────────────────────┘
```

**Spécifications techniques :**
- Format : A5 (148 × 210 mm) ou A4 (210 × 297 mm)
- Fond : `#F5EBD7` (Cream)
- Bandeau supérieur : `#1B4D3E` (Forest)
- CTA : `#D4A853` (Gold) sur fond `#1B4D3E`
- Titres : Plus Jakarta Sans Extra-bold, `#1B4D3E`
- Corps : Inter Regular, `#4B463C`
- Marges : 15mm

---

### 8.2 Attestation de Formation

```
┌────────────────────────────────────────────────────────────────┐
│                                                                │
│   [LOGO CAMPUS T3P]                  N° Attestation: ATT-2026- │
│   Centre de Formation Professionnelle                         │
│   Agrément Préfecture n° XXXXX                                 │
│                                                                │
│ ════════════════════════════════════════════════════════════  │
│                                                                │
│                   ATTESTATION DE FORMATION                     │
│                                                                │
│ ════════════════════════════════════════════════════════════  │
│                                                                │
│   Le centre de formation Campus T3P certifie que :            │
│                                                                │
│   ┌────────────────────────────────────────────────────────┐   │
│   │                                                        │   │
│   │   Nom : ___________________________________________    │   │
│   │                                                        │   │
│   │   Prénom : ________________________________________    │   │
│   │                                                        │   │
│   │   Né(e) le : __/__/____  à _________________________   │   │
│   │                                                        │   │
│   └────────────────────────────────────────────────────────┘   │
│                                                                │
│   A suivi avec succès la formation :                           │
│                                                                │
│   ┌────────────────────────────────────────────────────────┐   │
│   │                                                        │   │
│   │   Formation : [ ] VTC Initial                          │   │
│   │               [ ] TAXI Initial                         │   │
│   │               [ ] VMDTR Moto-Taxi                      │   │
│   │               [ ] Mobilité 75                          │   │
│   │               [ ] Mobilité 92                          │   │
│   │                                                        │   │
│   │   Durée : _______ heures                               │   │
│   │                                                        │   │
│   │   Du : __/__/____ au __/__/____                        │   │
│   │                                                        │   │
│   │   Certification : RS5635 / RS5637                      │   │
│   │                                                        │   │
│   └────────────────────────────────────────────────────────┘   │
│                                                                │
│                                                                │
│   Fait à Montrouge, le __/__/____                              │
│                                                                │
│                                                                │
│                                   [Cachet et Signature]        │
│                                   Le Directeur de la Formation │
│                                                                │
│ ─────────────────────────────────────────────────────────────  │
│   Campus T3P - 21 Rue Hoche, 92120 Montrouge                   │
│   Tél: 09 75 18 05 35 | montrouge@t3pcampus.fr                │
│   SIRET: XXX XXX XXX XXXXX | N° Déclaration: XXXXXXXXXX       │
└────────────────────────────────────────────────────────────────┘
```

**Spécifications techniques :**
- Format : A4 portrait (210 × 297 mm)
- Papier : 120g/m² minimum, ivoire ou blanc cassé
- Filigrane : Logo Campus T3P en fond, opacité 5%
- Bordure : Ligne `#1B4D3E` à 10mm des bords
- Titre : Plus Jakarta Sans Bold 24pt, `#1B4D3E`
- Corps : Inter Regular 11pt, `#2C2922`
- Encadrés : Fond `#FAF9F7`, bordure `#E0DCD4`

---

### 8.3 Contrat de Formation

```
┌────────────────────────────────────────────────────────────────┐
│                                                                │
│   [LOGO CAMPUS T3P]                                            │
│                                                                │
│              CONTRAT DE FORMATION PROFESSIONNELLE              │
│                      (Article L.6353-3 du Code du Travail)     │
│                                                                │
│ ═══════════════════════════════════════════════════════════   │
│                                                                │
│   ENTRE LES SOUSSIGNÉS :                                       │
│                                                                │
│   L'organisme de formation :                                   │
│   Campus T3P                                                   │
│   21 Rue Hoche, 92120 Montrouge                                │
│   SIRET : XXX XXX XXX XXXXX                                    │
│   N° Déclaration d'activité : XXXXXXXXXX                       │
│   Représenté par : [Nom du responsable], en qualité de         │
│   Directeur                                                    │
│   Ci-après dénommé "l'Organisme de formation"                  │
│                                                                │
│   ET                                                           │
│                                                                │
│   Le stagiaire :                                               │
│   Nom : _________________________                              │
│   Prénom : _________________________                           │
│   Adresse : _________________________                          │
│   Téléphone : _________________________                        │
│   Email : _________________________                            │
│   Ci-après dénommé "le Stagiaire"                             │
│                                                                │
│ ═══════════════════════════════════════════════════════════   │
│                                                                │
│   ARTICLE 1 : OBJET DU CONTRAT                                 │
│   Le présent contrat a pour objet la formation suivante :      │
│                                                                │
│   Intitulé : _________________________                         │
│   Objectifs : _________________________                        │
│   Durée totale : _______ heures                                │
│   Dates : Du __/__/____ au __/__/____                          │
│   Horaires : _________________________                         │
│   Lieu : 21 Rue Hoche, 92120 Montrouge                        │
│                                                                │
│   ARTICLE 2 : PROGRAMME                                        │
│   Le programme détaillé de la formation figure en annexe 1     │
│   du présent contrat.                                          │
│                                                                │
│   ARTICLE 3 : TARIF ET MODALITÉS DE PAIEMENT                   │
│   Prix total de la formation : _______ € TTC                   │
│                                                                │
│   Modalités de règlement :                                     │
│   [ ] Comptant à l'inscription                                 │
│   [ ] Paiement en 4 fois sans frais                            │
│       - Acompte : _______ € à la signature                     │
│       - Échéance 2 : _______ € le __/__/____                   │
│       - Échéance 3 : _______ € le __/__/____                   │
│       - Échéance 4 : _______ € le __/__/____                   │
│                                                                │
│   ARTICLE 4 : CONDITIONS DE RÉSILIATION                        │
│   [Texte juridique standard...]                                │
│                                                                │
│   ARTICLE 5 : RÈGLEMENT INTÉRIEUR                              │
│   Le stagiaire déclare avoir pris connaissance du règlement    │
│   intérieur de l'organisme de formation.                       │
│                                                                │
│ ═══════════════════════════════════════════════════════════   │
│                                                                │
│   Fait en deux exemplaires à Montrouge, le __/__/____          │
│                                                                │
│   Le Stagiaire                         L'Organisme de formation│
│   (Signature précédée de la           (Cachet et signature)    │
│   mention "Lu et approuvé")                                    │
│                                                                │
│                                                                │
│   _________________________           _________________________│
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**Spécifications techniques :**
- Format : A4 portrait, multi-pages si nécessaire
- Papier : 80g/m² standard
- En-tête : Logo + filet vert `#1B4D3E`
- Titres articles : Inter Bold 11pt, `#1B4D3E`
- Corps : Inter Regular 10pt, `#2C2922`
- Lignes à compléter : Pointillés `#C9C4B8`
- Pied de page : N° de page, nom du document

---

### 8.4 Carte de Visite

```
RECTO                                      VERSO
┌─────────────────────────────────┐       ┌─────────────────────────────────┐
│                                 │       │                                 │
│   ┌─────────────────────────┐   │       │   ┌─────────────────────────┐   │
│   │                         │   │       │   │                         │   │
│   │    CAMPUS T3P           │   │       │   │  ☎ 09 75 18 05 35       │   │
│   │    ──────────           │   │       │   │                         │   │
│   │    Formation VTC & Taxi │   │       │   │  ✉ montrouge@t3pcampus.fr│  │
│   │                         │   │       │   │                         │   │
│   └─────────────────────────┘   │       │   │  🌐 www.campust3p.fr     │   │
│                                 │       │   │                         │   │
│   [Nom du collaborateur]        │       │   │  📍 21 Rue Hoche        │   │
│   [Fonction]                    │       │   │     92120 Montrouge     │   │
│                                 │       │   │     M° Mairie de         │   │
│                                 │       │   │     Montrouge (L4)       │   │
│   ┌─────────────────────────┐   │       │   │                         │   │
│   │ [Bandeau or décoratif]  │   │       │   └─────────────────────────┘   │
│   └─────────────────────────┘   │       │                                 │
│                                 │       │   Formations certifiées         │
└─────────────────────────────────┘       │   RS5635 & RS5637               │
                                          │                                 │
                                          └─────────────────────────────────┘
```

**Spécifications techniques :**
- Format : 85 × 55 mm (standard européen)
- Papier : 350g/m² couché mat ou soft-touch
- Finition : Pelliculage mat + vernis sélectif sur logo
- Recto :
  - Fond : `#1B4D3E` (Forest) ou `#FFFFFF` selon version
  - Logo : Blanc ou `#1B4D3E`
  - Nom : Plus Jakarta Sans Bold 12pt
  - Fonction : Inter Regular 9pt
  - Bandeau bas : `#D4A853` (Gold) 3mm hauteur
- Verso :
  - Fond : `#F5EBD7` (Cream)
  - Icônes : `#1B4D3E` 12px
  - Texte : Inter Regular 9pt, `#4B463C`

---

## 9. Règles d'utilisation

### ✅ À faire

1. **Toujours** utiliser les couleurs exactes de la palette
2. **Respecter** la hiérarchie typographique
3. **Maintenir** des contrastes accessibles (WCAG AA minimum)
4. **Utiliser** les coins arrondis de manière cohérente
5. **Appliquer** les ombres douces pour créer de la profondeur
6. **Centrer** les éléments importants (CTA, titres)

### ❌ À ne pas faire

1. **Ne jamais** déformer le logo
2. **Ne pas** utiliser d'autres couleurs primaires
3. **Éviter** les fonds trop chargés ou les textures
4. **Ne pas** mélanger les polices avec d'autres familles
5. **Éviter** les effets trop prononcés (ombres dures, bordures épaisses)
6. **Ne pas** réduire les espaces au-delà du minimum défini

### Accessibilité

| Combinaison | Ratio | Statut |
|-------------|-------|--------|
| Forest sur Cream | 7.2:1 | ✅ AAA |
| Forest sur Blanc | 8.1:1 | ✅ AAA |
| Gold sur Forest | 4.8:1 | ✅ AA Large |
| Blanc sur Forest | 8.1:1 | ✅ AAA |

### Responsive

| Breakpoint | Adaptation |
|------------|------------|
| Mobile (<640px) | Tailles de police réduites de 20%, marges de 20px |
| Tablette (640-1023px) | Tailles intermédiaires, marges de 32px |
| Desktop (≥1024px) | Tailles complètes, marges de 48px |

---

## 📎 Ressources

### Fichiers à télécharger

- Logo vectoriel (.svg, .eps)
- Palette de couleurs (.ase pour Adobe)
- Polices (via Google Fonts)
- Templates InDesign/Figma

### Contacts

**Campus T3P Montrouge**
- 📍 21 Rue Hoche, 92120 Montrouge
- 📞 09 75 18 05 35
- ✉️ montrouge@t3pcampus.fr
- 🌐 www.campust3p.fr

---

*Document créé le 18 janvier 2026*
*Version 1.0 — Campus T3P*
