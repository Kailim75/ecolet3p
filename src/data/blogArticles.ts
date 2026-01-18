import vtcDriver2025 from "@/assets/blog/vtc-driver-2025.jpg";
import taxiDriverFormation from "@/assets/blog/taxi-driver-formation.jpg";
import vtcVsTaxiComparison from "@/assets/blog/vtc-vs-taxi-comparison.jpg";
import carteProfessionnelleVtc from "@/assets/blog/carte-professionnelle-vtc.jpg";
import financementFormation from "@/assets/blog/financement-formation.jpg";
import motoTaxiVmdtr from "@/assets/blog/moto-taxi-vmdtr.jpg";
import formationContinue from "@/assets/blog/formation-continue.jpg";

export interface BlogArticle {
  slug: string;
  title: string;
  metaDescription: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishDate: string;
  author: string;
  image: string;
  content: string;
}

export const blogArticles: BlogArticle[] = [
  {
    slug: "devenir-chauffeur-vtc-guide-complet-2025",
    title: "Comment devenir chauffeur VTC en 2025 : Guide complet",
    metaDescription: "Découvrez toutes les étapes pour devenir chauffeur VTC en 2025 : formation, examen, carte professionnelle et démarches administratives.",
    excerpt: "Vous souhaitez devenir chauffeur VTC ? Découvrez notre guide complet avec toutes les étapes, de la formation à l'obtention de votre carte professionnelle.",
    category: "VTC",
    readTime: "8 min",
    publishDate: "2025-01-15",
    author: "T3P Campus",
    image: vtcDriver2025,
    content: `
## Introduction

Le métier de chauffeur VTC (Voiture de Transport avec Chauffeur) attire de plus en plus de personnes en quête d'indépendance professionnelle. En 2025, ce secteur continue de croître avec l'essor des plateformes de réservation.

## Les prérequis pour devenir chauffeur VTC

Avant de vous lancer, assurez-vous de remplir ces conditions :

- **Âge minimum** : 21 ans
- **Permis de conduire** : Permis B valide depuis au moins 3 ans
- **Casier judiciaire** : Bulletin n°2 vierge de certaines infractions
- **Aptitude médicale** : Visite médicale préfectorale

## La formation VTC obligatoire

La formation initiale VTC est **obligatoire** pour passer l'examen. Chez T3P Campus, notre formation de 10 jours couvre :

### Module théorique
- Réglementation du transport public particulier de personnes
- Gestion d'entreprise et comptabilité
- Sécurité routière
- Français et anglais professionnel

### Module pratique
- Conduite professionnelle
- Relation client
- Utilisation des applications de réservation

## L'examen VTC

L'examen se compose de 7 épreuves :
1. Réglementation T3P
2. Gestion d'entreprise
3. Sécurité routière
4. Français
5. Anglais
6. Développement commercial
7. Réglementation nationale

**Taux de réussite T3P Campus : 97%**

## Obtenir sa carte professionnelle VTC

Après réussite à l'examen, vous devez :
1. Déposer votre dossier en préfecture
2. Fournir les pièces justificatives
3. Recevoir votre carte VTC sous 3 mois

## Créer son entreprise VTC

Plusieurs options s'offrent à vous :
- **Auto-entrepreneur** : Idéal pour débuter
- **SASU/EURL** : Pour développer votre activité
- **Salarié** : Travailler pour une société VTC

## Conclusion

Devenir chauffeur VTC est un projet accessible avec une bonne préparation. T3P Campus vous accompagne à chaque étape de votre reconversion.
    `
  },
  {
    slug: "formation-taxi-carte-professionnelle-t3p",
    title: "Formation Taxi : Tout savoir sur la carte professionnelle T3P",
    metaDescription: "Guide complet sur la formation taxi et l'obtention de la carte professionnelle T3P. Prérequis, examen, durée et coût de la formation.",
    excerpt: "La carte professionnelle T3P est indispensable pour exercer le métier de taxi. Découvrez comment l'obtenir grâce à notre formation certifiante.",
    category: "TAXI",
    readTime: "7 min",
    publishDate: "2025-01-10",
    author: "T3P Campus",
    image: taxiDriverFormation,
    content: `
## Qu'est-ce que la carte professionnelle T3P ?

La carte T3P (Transport Public Particulier de Personnes) est le sésame obligatoire pour exercer le métier de chauffeur de taxi en France. Sans elle, impossible de prendre le volant professionnellement.

## Pourquoi suivre une formation taxi ?

La formation n'est pas obligatoire pour passer l'examen, mais elle est **fortement recommandée**. Voici pourquoi :

- **Taux de réussite** : Les candidats formés réussissent à 97% contre 30% pour les candidats libres
- **Gain de temps** : Formation intensive de 10 jours
- **Accompagnement** : Suivi personnalisé par des formateurs experts
- **Préparation complète** : Théorie + pratique

## Le programme de formation taxi T3P Campus

### Semaine 1 : Théorie
- Réglementation du transport de personnes
- Code de la route approfondi
- Gestion d'une activité de taxi
- Notions de comptabilité

### Semaine 2 : Pratique et révisions
- Conduite professionnelle
- Relation client
- Examens blancs
- Révisions intensives

## L'examen taxi

L'examen comprend des épreuves écrites et pratiques :

| Épreuve | Coefficient | Durée |
|---------|-------------|-------|
| Réglementation T3P | 3 | 1h30 |
| Gestion | 2 | 1h |
| Sécurité routière | 2 | 45min |
| Français | 1 | 30min |
| Anglais | 1 | 20min |

## Après l'examen : les démarches

1. **Demande de carte** : Dossier en préfecture
2. **Visite médicale** : Chez un médecin agréé
3. **Inscription au registre** : Registre des VTC/Taxis
4. **Licence ou ADS** : Achat ou location d'une autorisation de stationnement

## Le coût de la formation

Chez T3P Campus, nous proposons des facilités de paiement en 4x sans frais pour rendre la formation accessible à tous.

## Conclusion

La carte professionnelle taxi ouvre les portes d'un métier stable et recherché. Notre équipe vous accompagne de A à Z dans votre projet professionnel.
    `
  },
  {
    slug: "vtc-ou-taxi-quelle-formation-choisir",
    title: "VTC vs Taxi : Quelle formation choisir en 2025 ?",
    metaDescription: "Comparatif complet entre les métiers de VTC et Taxi. Revenus, avantages, inconvénients et formation adaptée à votre profil.",
    excerpt: "Hésitation entre VTC et Taxi ? Découvrez les différences clés entre ces deux métiers pour faire le bon choix de carrière.",
    category: "Guide",
    readTime: "10 min",
    publishDate: "2025-01-08",
    author: "T3P Campus",
    image: vtcVsTaxiComparison,
    content: `
## Introduction

VTC ou Taxi ? C'est LA question que se posent tous les candidats au transport de personnes. Ces deux métiers partagent des points communs mais présentent des différences majeures.

## Tableau comparatif VTC vs Taxi

| Critère | VTC | Taxi |
|---------|-----|------|
| Réservation | Obligatoire | Possible en maraude |
| Tarification | Libre | Réglementée |
| Zone d'activité | France entière | Zone géographique |
| Investissement initial | Moyen | Élevé (licence) |
| Revenus moyens | 2000-4000€ | 2500-5000€ |

## Les avantages du métier de VTC

### Flexibilité
- Choisissez vos horaires
- Travaillez où vous voulez
- Pas de licence à acheter

### Accessibilité
- Formation plus courte
- Démarrage rapide
- Coûts initiaux réduits

### Croissance du marché
- Applications en plein essor
- Clientèle croissante
- Innovations technologiques

## Les avantages du métier de Taxi

### Stabilité
- Clientèle fidèle
- Tarifs garantis
- Reconnaissance du métier

### Exclusivités
- Maraude autorisée
- Voies de bus
- Stations de taxi

### Valeur patrimoniale
- La licence est un actif
- Revente possible
- Transmission familiale

## Quel profil pour quel métier ?

### Choisissez VTC si vous :
- Aimez la flexibilité
- Êtes à l'aise avec la technologie
- Voulez démarrer rapidement
- Préférez le travail indépendant

### Choisissez Taxi si vous :
- Cherchez la stabilité
- Avez un budget pour la licence
- Aimez le contact client spontané
- Voulez une activité patrimoniale

## La solution passerelle

Saviez-vous qu'il existe une **formation passerelle** ? Si vous êtes déjà VTC, vous pouvez devenir taxi (et inversement) avec une formation complémentaire courte.

Chez T3P Campus, nous proposons cette formation passerelle de 7 jours pour les professionnels souhaitant élargir leur activité.

## Notre recommandation

Il n'y a pas de "meilleur" choix universel. Tout dépend de votre situation personnelle, vos objectifs et votre budget. 

**Notre conseil** : Venez nous rencontrer pour un entretien gratuit. Nous analyserons votre profil et vous orienterons vers la formation adaptée.

## Conclusion

VTC et Taxi sont deux beaux métiers avec chacun leurs avantages. L'important est de choisir celui qui correspond à vos aspirations. T3P Campus vous forme aux deux avec le même niveau d'excellence.
    `
  },
  {
    slug: "etapes-obtenir-carte-professionnelle-vtc",
    title: "Les 5 étapes pour obtenir sa carte professionnelle VTC",
    metaDescription: "Découvrez les 5 étapes clés pour obtenir votre carte professionnelle VTC : formation, examen, dossier préfecture et lancement d'activité.",
    excerpt: "De la formation à la création de votre entreprise, suivez notre guide étape par étape pour devenir chauffeur VTC professionnel.",
    category: "VTC",
    readTime: "6 min",
    publishDate: "2025-01-05",
    author: "T3P Campus",
    image: carteProfessionnelleVtc,
    content: `
## Les 5 étapes vers votre carte VTC

Obtenir sa carte professionnelle VTC peut sembler complexe. Nous avons simplifié le parcours en 5 étapes claires.

## Étape 1 : Vérifier les prérequis

Avant tout, assurez-vous de remplir les conditions :

✅ Avoir 21 ans minimum
✅ Posséder le permis B depuis 3 ans
✅ Avoir un casier judiciaire compatible
✅ Être apte médicalement

**Conseil T3P** : Nous vérifions gratuitement votre éligibilité lors de votre premier rendez-vous.

## Étape 2 : Suivre la formation VTC

La formation initiale est votre meilleur atout pour réussir l'examen.

### Chez T3P Campus :
- **Durée** : 10 jours intensifs
- **Format** : Présentiel à Montrouge
- **Contenu** : Théorie + pratique
- **Examens blancs** : Inclus

### Pourquoi se former ?
- 97% de réussite avec formation vs 30% en candidat libre
- Accompagnement personnalisé
- Préparation complète à l'examen

## Étape 3 : Passer l'examen VTC

L'examen se déroule dans un centre agréé et comprend 7 épreuves.

### Les épreuves :
1. **Réglementation T3P** - La plus importante
2. **Gestion d'entreprise** - Comptabilité, fiscalité
3. **Sécurité routière** - Code approfondi
4. **Français** - Compréhension écrite
5. **Anglais** - Niveau basique
6. **Développement commercial** - Marketing
7. **Réglementation nationale** - Droit des transports

### Nos conseils pour réussir :
- Révisez chaque jour après la formation
- Faites tous les examens blancs
- Dormez bien la veille
- Arrivez en avance le jour J

## Étape 4 : Constituer le dossier préfecture

Après réussite à l'examen, vous devez déposer un dossier complet :

📄 Formulaire CERFA rempli
📄 Attestation de réussite à l'examen
📄 Justificatif d'identité
📄 Justificatif de domicile
📄 Photo d'identité
📄 Certificat médical
📄 Extrait de casier judiciaire
📄 Copie du permis de conduire

**Délai** : 3 mois maximum pour recevoir votre carte

## Étape 5 : Lancer votre activité

Avec votre carte en poche, vous pouvez exercer ! Mais il reste quelques démarches :

### Créer votre entreprise
- Choisir votre statut (auto-entrepreneur, SASU...)
- S'inscrire au registre VTC
- Souscrire une assurance RC Pro

### Équiper votre véhicule
- Véhicule conforme (4-9 places, moins de 6 ans)
- Vignette verte obligatoire
- Équipements de confort

### Rejoindre une plateforme
- Uber, Bolt, Heetch...
- Ou travailler en direct avec vos clients

## Timeline récapitulatif

| Étape | Durée |
|-------|-------|
| Formation | 2 semaines |
| Attente examen | 2-4 semaines |
| Examen + résultats | 1 semaine |
| Dossier préfecture | 1-3 mois |
| **Total** | **3-5 mois** |

## Conclusion

Le parcours vers la carte VTC est structuré et accessible. Avec T3P Campus, vous bénéficiez d'un accompagnement à chaque étape. Contactez-nous pour démarrer votre projet !
    `
  },
  {
    slug: "financer-formation-taxi-vtc-aides",
    title: "Comment financer sa formation Taxi/VTC : Aides et options",
    metaDescription: "Découvrez toutes les options pour financer votre formation taxi ou VTC : paiement en plusieurs fois, Pôle Emploi, région et autres aides.",
    excerpt: "Le financement ne doit pas être un frein à votre projet. Découvrez toutes les solutions pour financer votre formation de chauffeur.",
    category: "Financement",
    readTime: "5 min",
    publishDate: "2025-01-02",
    author: "T3P Campus",
    image: financementFormation,
    content: `
## Le financement, un obstacle ?

Le coût d'une formation professionnelle peut sembler élevé. Mais de nombreuses solutions existent pour vous aider à financer votre projet de reconversion.

## Option 1 : Paiement en plusieurs fois

Chez T3P Campus, nous proposons un **paiement en 4x sans frais** pour toutes nos formations.

### Comment ça marche ?
- 1er versement à l'inscription
- 3 versements mensuels
- Aucun frais supplémentaire
- Aucune condition de ressources

**Exemple** : Pour une formation à 2000€, vous payez 4x 500€.

## Option 2 : Aide de Pôle Emploi

Si vous êtes demandeur d'emploi, plusieurs dispositifs existent :

### L'AIF (Aide Individuelle à la Formation)
- Prise en charge totale ou partielle
- À demander à votre conseiller
- Délai : 2-4 semaines

### L'AREF (Aide au Retour à l'Emploi Formation)
- Maintien de vos allocations pendant la formation
- Cumul possible avec l'AIF

### Le CSP (Contrat de Sécurisation Professionnelle)
- Pour les licenciés économiques
- Formation financée à 100%

## Option 3 : Aide régionale

Chaque région dispose de budgets formation :

### Île-de-France
- Programme Île-de-France Compétences
- Chèque Formation Régional
- Aide aux demandeurs d'emploi

### Comment en bénéficier ?
1. Contactez votre conseiller Pôle Emploi
2. Ou rendez-vous sur le site de votre région
3. Constituez un dossier de demande

## Option 4 : Autofinancement

Si vous n'êtes pas éligible aux aides :

### Le paiement échelonné
- Jusqu'à 4x sans frais chez T3P Campus
- Pas de conditions de revenus

### L'épargne personnelle
- Investissement rentabilisé en quelques mois d'activité

### Le crédit formation
- Prêt bancaire dédié à la formation
- Taux préférentiels

## Tableau récapitulatif des aides

| Dispositif | Public | Montant max |
|------------|--------|-------------|
| AIF Pôle Emploi | Demandeurs d'emploi | 100% |
| Aide régionale | Résidents région | Variable |
| 4x sans frais | Tous | Étalement |

## Notre accompagnement

Chez T3P Campus, nous vous aidons à identifier les aides auxquelles vous avez droit :

✅ Entretien gratuit pour évaluer votre situation
✅ Aide à la constitution des dossiers
✅ Attestations et documents nécessaires
✅ Suivi de vos demandes

## Conclusion

Le financement ne doit pas être un frein à votre projet professionnel. Entre les aides publiques et nos facilités de paiement, il existe forcément une solution adaptée à votre situation.

**Contactez-nous** pour un bilan personnalisé de vos options de financement.
    `
  },
  {
    slug: "formation-vmdtr-moto-taxi-scooter",
    title: "Formation VMDTR : Devenir conducteur moto-taxi ou scooter",
    metaDescription: "Guide complet sur la formation VMDTR pour devenir conducteur de deux-roues motorisé. Prérequis, programme, examen et débouchés.",
    excerpt: "Découvrez comment devenir conducteur de moto-taxi ou de scooter professionnel grâce à la formation VMDTR et obtenir votre carte professionnelle.",
    category: "VMDTR",
    readTime: "7 min",
    publishDate: "2025-01-18",
    author: "T3P Campus",
    image: motoTaxiVmdtr,
    content: `
## Qu'est-ce que la formation VMDTR ?

La formation VMDTR (Véhicule Motorisé à Deux ou Trois Roues) permet d'exercer le métier de conducteur de transport de personnes en deux-roues, communément appelé **moto-taxi**.

Ce secteur en pleine expansion offre de nombreuses opportunités, notamment dans les grandes villes où les deux-roues permettent de circuler plus rapidement.

## Les avantages du métier de moto-taxi

### Rapidité et efficacité
- Circulation fluide même en cas de bouchons
- Temps de trajet réduit de 30 à 50%
- Clients pressés (hommes d'affaires, aéroports)

### Flexibilité
- Horaires modulables
- Investissement initial plus faible qu'en VTC
- Coûts d'exploitation réduits

### Clientèle premium
- Tarifs plus élevés qu'en VTC
- Clientèle professionnelle fidèle
- Courses aéroport très lucratives

## Les prérequis pour la formation VMDTR

Pour vous inscrire à notre formation, vous devez :

- Avoir 21 ans minimum
- Être titulaire du permis A (moto) depuis 3 ans minimum
- Avoir un casier judiciaire compatible
- Passer la visite médicale préfectorale

**Important** : Le permis A est obligatoire. Le permis A2 ne suffit pas pour exercer en moto-taxi.

## Le programme de formation T3P Campus

Notre formation VMDTR dure **7 jours** et couvre l'ensemble des compétences nécessaires.

### Module 1 : Réglementation (2 jours)
- Cadre légal du transport de personnes
- Droits et obligations du conducteur VMDTR
- Réglementation spécifique deux-roues
- Assurances professionnelles

### Module 2 : Sécurité (2 jours)
- Conduite défensive
- Anticipation des dangers
- Transport de passager en sécurité
- Équipements obligatoires

### Module 3 : Gestion et relation client (2 jours)
- Création et gestion d'entreprise
- Comptabilité simplifiée
- Accueil et service client premium
- Gestion des réservations

### Module 4 : Pratique et examen blanc (1 jour)
- Mise en situation réelle
- Examen blanc complet
- Corrections personnalisées

## L'examen VMDTR

L'examen est composé de 7 épreuves similaires à l'examen VTC. Notre taux de réussite est de 95%.

## Les débouchés professionnels

Après votre formation, plusieurs options s'offrent à vous :

### Indépendant
- Créez votre propre activité
- Développez votre clientèle
- Fixez vos tarifs

### Salarié
- Rejoignez une société de moto-taxi
- Bénéficiez d'une clientèle existante

### Plateformes
- Citybird, Felix, Motocab...
- Commission sur les courses
- Flexibilité totale

## Tarifs et revenus

Les revenus mensuels estimés vont de 1500-2500€ en temps partiel à 3000-5000€ en temps plein.

## Conclusion

La formation VMDTR ouvre les portes d'un métier passionnant pour les amateurs de deux-roues. Avec T3P Campus, bénéficiez d'une formation complète et d'un accompagnement personnalisé.
    `
  },
  {
    slug: "formation-continue-renouvellement-carte-professionnelle",
    title: "Formation Continue : Renouveler sa carte professionnelle VTC/Taxi",
    metaDescription: "Tout savoir sur la formation continue obligatoire pour renouveler votre carte professionnelle VTC ou Taxi. Durée, programme et modalités.",
    excerpt: "Votre carte professionnelle arrive à expiration ? Découvrez la formation continue obligatoire pour la renouveler et maintenir vos compétences à jour.",
    category: "Formation Continue",
    readTime: "6 min",
    publishDate: "2025-01-16",
    author: "T3P Campus",
    image: formationContinue,
    content: `
## La formation continue : une obligation légale

Depuis 2017, tous les chauffeurs VTC et Taxi doivent suivre une **formation continue obligatoire** pour renouveler leur carte professionnelle. Cette formation doit être effectuée tous les 5 ans.

## Pourquoi cette obligation ?

La formation continue vise à :

- **Actualiser vos connaissances** sur la réglementation
- **Renforcer la sécurité** routière
- **Améliorer la qualité** du service client
- **S'adapter aux évolutions** du métier

## Qui est concerné ?

Tous les titulaires d'une carte VTC, Taxi ou VMDTR arrivant à échéance dans les 12 prochains mois.

**Attention** : Sans attestation de formation continue, vous ne pourrez pas renouveler votre carte professionnelle.

## Le programme de formation continue

Notre formation continue dure **14 heures** réparties sur 2 jours.

### Jour 1 : Réglementation et sécurité (7h)

**Matin : Actualités réglementaires**
- Évolutions de la loi Grandguillaume
- Nouvelles obligations des plateformes
- Réglementation environnementale (ZFE)
- Droits et devoirs actualisés

**Après-midi : Sécurité routière**
- Rappel des fondamentaux
- Nouvelles règles du code de la route
- Éco-conduite et conduite défensive
- Gestion des situations d'urgence

### Jour 2 : Relation client et gestion (7h)

**Matin : Excellence du service client**
- Accueil des personnes à mobilité réduite
- Gestion des conflits
- Communication interculturelle
- Satisfaction et fidélisation client

**Après-midi : Gestion d'activité**
- Évolutions fiscales et sociales
- Outils numériques de gestion
- Développement commercial
- Bien-être au travail

## Les modalités pratiques chez T3P Campus

- **Durée** : 2 jours (14 heures)
- **Lieu** : Montrouge (92)
- **Horaires** : 9h00 - 17h00
- **Effectif** : 10-15 personnes max
- **Paiement** : 4x sans frais possible

## L'attestation de formation continue

À l'issue de la formation, vous recevez une **attestation officielle** qui vous permettra de déposer votre demande de renouvellement en préfecture.

## Que se passe-t-il sans formation continue ?

- Refus de renouvellement de votre carte professionnelle
- Interdiction d'exercer à l'expiration de la carte
- Sanctions en cas d'exercice illégal (amendes, suspension)

## Les avantages de la formation continue

Au-delà de l'obligation légale, la formation continue vous apporte :

- Mise à jour des connaissances réglementaires
- Échanges avec d'autres professionnels
- Nouvelles techniques de relation client
- Réseau professionnel élargi

## Conclusion

La formation continue n'est pas qu'une contrainte administrative : c'est l'occasion de faire le point sur votre pratique et de vous perfectionner.

Chez T3P Campus, nous rendons cette formation agréable et enrichissante. Réservez votre place dès maintenant !
    `
  }
];

export const getArticleBySlug = (slug: string): BlogArticle | undefined => {
  return blogArticles.find(article => article.slug === slug);
};

export const getRelatedArticles = (currentSlug: string, limit: number = 3): BlogArticle[] => {
  return blogArticles
    .filter(article => article.slug !== currentSlug)
    .slice(0, limit);
};