import {
  CarTaxiFront, Car, Bike, RefreshCw, ArrowRight, ArrowLeftRight,
  Accessibility, Briefcase, Languages, ClipboardList, MapPin,
  Package, Gift, GraduationCap, Star, Tag, RotateCcw, KeyRound
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface MegaMenuItem {
  name: string;
  path: string;
  icon: LucideIcon;
  detail: string;
  color: string;
  badge?: string;
}

export interface MegaMenuColumn {
  id: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  items: MegaMenuItem[];
  /** Extra block at the bottom of the column (packs separator, parrainage, etc.) */
  footer?: MegaMenuItem[];
}

export const megaMenuColumns: MegaMenuColumn[] = [
  {
    id: "devenir",
    title: "Devenir Chauffeur",
    subtitle: "Journée ou soirée · Examen inclus",
    icon: GraduationCap,
    items: [
      { name: "Formation Taxi", path: "/formations/taxi", icon: CarTaxiFront, detail: "dès 990€", color: "text-amber-600" },
      { name: "Formation VTC", path: "/formations/vtc", icon: Car, detail: "dès 990€", color: "text-forest" },
      { name: "Formation VMDTR", path: "/formations/vmdtr", icon: Bike, detail: "dès 990€", color: "text-orange-600" },
      { name: "Passerelle T3P", path: "/passerelle-vtc-taxi", icon: ArrowLeftRight, detail: "665€ tout compris", color: "text-amber-600" },
      { name: "Location véhicule examen", path: "/services/location-vehicule-examen", icon: KeyRound, detail: "dès 189€", color: "text-forest" },
    ],
  },
  {
    id: "evoluer",
    title: "Évoluer & Renouveler",
    subtitle: "Obligatoire tous les 5 ans",
    icon: RefreshCw,
    items: [
      { name: "Continue Taxi", path: "/formations/continue-taxi", icon: RefreshCw, detail: "14h · 250€", color: "text-amber-600" },
      { name: "Continue VTC", path: "/formations/continue-vtc", icon: RefreshCw, detail: "14h · 170€", color: "text-forest" },
      { name: "Continue VMDTR", path: "/formations/continue-vmdtr", icon: RefreshCw, detail: "14h · 250€", color: "text-orange-600" },
      { name: "Renouvellement carte pro", path: "/formations#renouvellement", icon: RotateCcw, detail: "14h · 250€", color: "text-primary" },
    ],
  },
  {
    id: "complementaires",
    title: "Complémentaires",
    subtitle: "Boostez votre carrière",
    icon: Star,
    items: [
      { name: "Accessibilité PMR", path: "/formation-accessibilite-pmr", icon: Accessibility, detail: "14h · 290€", color: "text-purple-600", badge: "NOUVEAU" },
      { name: "Gestion d'activité", path: "/accompagnement-gestion-activite", icon: Briefcase, detail: "21h · 390€", color: "text-forest", badge: "NOUVEAU" },
      { name: "Anglais professionnel", path: "/formations/anglais-professionnel", icon: Languages, detail: "20h · 350€", color: "text-blue-600", badge: "NOUVEAU" },
      { name: "Aide administrative", path: "/aide-administrative-creation-entreprise", icon: ClipboardList, detail: "dès 190€", color: "text-muted-foreground", badge: "NOUVEAU" },
      { name: "Mobilité géographique", path: "/formations/mobilite", icon: MapPin, detail: "14-35h · 440€", color: "text-forest" },
    ],
  },
  {
    id: "offres",
    title: "Offres Spéciales",
    subtitle: "Économisez jusqu'à 190€",
    icon: Tag,
    items: [
      { name: "Pack Double Activité", path: "/formations#packs", icon: Package, detail: "dès 1 490€", color: "text-primary" },
      { name: "Pack Reconversion", path: "/formations#packs", icon: Package, detail: "dès 1 090€", color: "text-primary" },
      { name: "Pack Entrepreneur", path: "/formations#packs", icon: Package, detail: "dès 1 190€", color: "text-primary" },
      { name: "Pack Sérénité Admin", path: "/formations#packs", icon: Package, detail: "dès 1 090€", color: "text-primary" },
      { name: "Pack International", path: "/formations#packs", icon: Package, detail: "dès 1 190€", color: "text-primary" },
      { name: "Pack Accessibilité", path: "/formations#packs", icon: Package, detail: "dès 1 150€", color: "text-primary" },
    ],
    footer: [
      { name: "Récupération de points", path: "/stage-recuperation-points", icon: RotateCcw, detail: "2j · 250€ · Jusqu'à 4 pts", color: "text-forest" },
      { name: "Programme Parrainage", path: "/formations#parrainage", icon: Gift, detail: "Jusqu'à 100€ offerts", color: "text-primary" },
    ],
  },
];
