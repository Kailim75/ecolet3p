// Responsive srcsets for blog images using vite-imagetools
// Generates 400w, 800w, 1200w variants for each blog image

import vtcDriver2025_400 from "@/assets/blog/vtc-driver-2025.jpg?w=400&format=webp";
import vtcDriver2025_800 from "@/assets/blog/vtc-driver-2025.jpg?w=800&format=webp";
import vtcDriver2026_400 from "@/assets/blog/vtc-driver-2026.jpg?w=400&format=webp";
import vtcDriver2026_800 from "@/assets/blog/vtc-driver-2026.jpg?w=800&format=webp";
import taxiDriver2026_400 from "@/assets/blog/taxi-driver-2026.jpg?w=400&format=webp";
import taxiDriver2026_800 from "@/assets/blog/taxi-driver-2026.jpg?w=800&format=webp";
import vmdtrDriver2026_400 from "@/assets/blog/vmdtr-driver-2026.jpg?w=400&format=webp";
import vmdtrDriver2026_800 from "@/assets/blog/vmdtr-driver-2026.jpg?w=800&format=webp";
import vtcTaxiVmdtrComparison2026_400 from "@/assets/blog/vtc-taxi-vmdtr-comparison-2026.jpg?w=400&format=webp";
import vtcTaxiVmdtrComparison2026_800 from "@/assets/blog/vtc-taxi-vmdtr-comparison-2026.jpg?w=800&format=webp";
import statutsJuridiquesT3p_400 from "@/assets/blog/statuts-juridiques-t3p.jpg?w=400&format=webp";
import statutsJuridiquesT3p_800 from "@/assets/blog/statuts-juridiques-t3p.jpg?w=800&format=webp";
import technologieIaTransport_400 from "@/assets/blog/technologie-ia-transport.jpg?w=400&format=webp";
import technologieIaTransport_800 from "@/assets/blog/technologie-ia-transport.jpg?w=800&format=webp";
import anglaisChauffeurT3p_400 from "@/assets/blog/anglais-chauffeur-t3p.jpg?w=400&format=webp";
import anglaisChauffeurT3p_800 from "@/assets/blog/anglais-chauffeur-t3p.jpg?w=800&format=webp";
import taxiDriverFormation_400 from "@/assets/blog/taxi-driver-formation.jpg?w=400&format=webp";
import taxiDriverFormation_800 from "@/assets/blog/taxi-driver-formation.jpg?w=800&format=webp";
import vtcVsTaxiComparison_400 from "@/assets/blog/vtc-vs-taxi-comparison.jpg?w=400&format=webp";
import vtcVsTaxiComparison_800 from "@/assets/blog/vtc-vs-taxi-comparison.jpg?w=800&format=webp";
import carteProfessionnelleVtc_400 from "@/assets/blog/carte-professionnelle-vtc.jpg?w=400&format=webp";
import carteProfessionnelleVtc_800 from "@/assets/blog/carte-professionnelle-vtc.jpg?w=800&format=webp";
import financementFormation_400 from "@/assets/blog/financement-formation.jpg?w=400&format=webp";
import financementFormation_800 from "@/assets/blog/financement-formation.jpg?w=800&format=webp";
import motoTaxiVmdtr_400 from "@/assets/blog/moto-taxi-vmdtr.jpg?w=400&format=webp";
import motoTaxiVmdtr_800 from "@/assets/blog/moto-taxi-vmdtr.jpg?w=800&format=webp";
import formationContinue_400 from "@/assets/blog/formation-continue.jpg?w=400&format=webp";
import formationContinue_800 from "@/assets/blog/formation-continue.jpg?w=800&format=webp";
import renouvellementCartePro_400 from "@/assets/blog/renouvellement-carte-pro.jpg?w=400&format=webp";
import renouvellementCartePro_800 from "@/assets/blog/renouvellement-carte-pro.jpg?w=800&format=webp";

// Original images for mapping
import vtcDriver2025 from "@/assets/blog/vtc-driver-2025.jpg";
import vtcDriver2026 from "@/assets/blog/vtc-driver-2026.jpg";
import taxiDriver2026 from "@/assets/blog/taxi-driver-2026.jpg";
import vmdtrDriver2026 from "@/assets/blog/vmdtr-driver-2026.jpg";
import vtcTaxiVmdtrComparison2026 from "@/assets/blog/vtc-taxi-vmdtr-comparison-2026.jpg";
import statutsJuridiquesT3p from "@/assets/blog/statuts-juridiques-t3p.jpg";
import technologieIaTransport from "@/assets/blog/technologie-ia-transport.jpg";
import anglaisChauffeurT3p from "@/assets/blog/anglais-chauffeur-t3p.jpg";
import taxiDriverFormation from "@/assets/blog/taxi-driver-formation.jpg";
import vtcVsTaxiComparison from "@/assets/blog/vtc-vs-taxi-comparison.jpg";
import carteProfessionnelleVtc from "@/assets/blog/carte-professionnelle-vtc.jpg";
import financementFormation from "@/assets/blog/financement-formation.jpg";
import motoTaxiVmdtr from "@/assets/blog/moto-taxi-vmdtr.jpg";
import formationContinue from "@/assets/blog/formation-continue.jpg";
import renouvellementCartePro from "@/assets/blog/renouvellement-carte-pro.jpg";

interface BlogImageSrcset {
  webpSrcSet: string;
  sizes: string;
}

const srcsetMap: Record<string, BlogImageSrcset> = {
  [vtcDriver2025]: {
    webpSrcSet: `${vtcDriver2025_400} 400w, ${vtcDriver2025_800} 800w`,
    sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px",
  },
  [vtcDriver2026]: {
    webpSrcSet: `${vtcDriver2026_400} 400w, ${vtcDriver2026_800} 800w`,
    sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px",
  },
  [taxiDriver2026]: {
    webpSrcSet: `${taxiDriver2026_400} 400w, ${taxiDriver2026_800} 800w`,
    sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px",
  },
  [vmdtrDriver2026]: {
    webpSrcSet: `${vmdtrDriver2026_400} 400w, ${vmdtrDriver2026_800} 800w`,
    sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px",
  },
  [vtcTaxiVmdtrComparison2026]: {
    webpSrcSet: `${vtcTaxiVmdtrComparison2026_400} 400w, ${vtcTaxiVmdtrComparison2026_800} 800w`,
    sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px",
  },
  [statutsJuridiquesT3p]: {
    webpSrcSet: `${statutsJuridiquesT3p_400} 400w, ${statutsJuridiquesT3p_800} 800w`,
    sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px",
  },
  [technologieIaTransport]: {
    webpSrcSet: `${technologieIaTransport_400} 400w, ${technologieIaTransport_800} 800w`,
    sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px",
  },
  [anglaisChauffeurT3p]: {
    webpSrcSet: `${anglaisChauffeurT3p_400} 400w, ${anglaisChauffeurT3p_800} 800w`,
    sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px",
  },
  [taxiDriverFormation]: {
    webpSrcSet: `${taxiDriverFormation_400} 400w, ${taxiDriverFormation_800} 800w`,
    sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px",
  },
  [vtcVsTaxiComparison]: {
    webpSrcSet: `${vtcVsTaxiComparison_400} 400w, ${vtcVsTaxiComparison_800} 800w`,
    sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px",
  },
  [carteProfessionnelleVtc]: {
    webpSrcSet: `${carteProfessionnelleVtc_400} 400w, ${carteProfessionnelleVtc_800} 800w`,
    sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px",
  },
  [financementFormation]: {
    webpSrcSet: `${financementFormation_400} 400w, ${financementFormation_800} 800w`,
    sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px",
  },
  [motoTaxiVmdtr]: {
    webpSrcSet: `${motoTaxiVmdtr_400} 400w, ${motoTaxiVmdtr_800} 800w`,
    sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px",
  },
  [formationContinue]: {
    webpSrcSet: `${formationContinue_400} 400w, ${formationContinue_800} 800w`,
    sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px",
  },
  [renouvellementCartePro]: {
    webpSrcSet: `${renouvellementCartePro_400} 400w, ${renouvellementCartePro_800} 800w`,
    sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px",
  },
};

export function getBlogImageSrcset(imageSrc: string): BlogImageSrcset | null {
  return srcsetMap[imageSrc] || null;
}
