import React from "react";

interface LogoProps {
  className?: string;
  variant?: "full" | "monogram" | "seal";
  theme?: "light" | "dark" | "mono";
  showBaseline?: boolean;
}

/**
 * ÉCOLE T3P - Logo Institutionnel V2
 * 
 * Système de logo statutaire et sobre pour un centre de formation agréé Préfecture.
 * Sans dégradés, sans effets, sans ombres. Fonctionne en monochrome.
 * 
 * Variantes:
 * - full: Logo complet avec texte "ÉCOLE T3P"
 * - monogram: Monogramme "T3P" seul (style sceau/institution)
 * - seal: Version tampon pour documents officiels
 */

// Couleurs institutionnelles
const COLORS = {
  forest: "#1B4D3E",      // Vert foncé institutionnel
  white: "#FFFFFF",
  cream: "#F5EBD7",
  black: "#1A1A1A",
  gray: "#4A4A4A",
};

/**
 * Monogramme T3P - Style sceau institutionnel
 * Utilisable seul sur tampons, icônes, attestations
 */
export const EcoleT3PMonogram = ({ 
  className = "w-12 h-12",
  theme = "light"
}: { className?: string; theme?: "light" | "dark" | "mono" }) => {
  const bgColor = theme === "dark" ? COLORS.white : COLORS.forest;
  const textColor = theme === "dark" ? COLORS.forest : COLORS.white;
  const borderColor = theme === "mono" ? COLORS.forest : bgColor;

  if (theme === "mono") {
    return (
      <svg viewBox="0 0 60 60" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        {/* Cercle simple sans effets */}
        <circle cx="30" cy="30" r="28" fill="none" stroke={COLORS.forest} strokeWidth="2"/>
        <circle cx="30" cy="30" r="24" fill="none" stroke={COLORS.forest} strokeWidth="1"/>
        {/* T3P centré */}
        <text 
          x="30" 
          y="35" 
          textAnchor="middle" 
          fontFamily="Georgia, 'Times New Roman', serif" 
          fontSize="16" 
          fontWeight="700" 
          fill={COLORS.forest}
          letterSpacing="0.02em"
        >
          T3P
        </text>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 60 60" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Cercle plein institutionnel */}
      <circle cx="30" cy="30" r="28" fill={bgColor}/>
      <circle cx="30" cy="30" r="24" fill="none" stroke={textColor} strokeWidth="1" opacity="0.3"/>
      {/* T3P centré */}
      <text 
        x="30" 
        y="35" 
        textAnchor="middle" 
        fontFamily="Georgia, 'Times New Roman', serif" 
        fontSize="16" 
        fontWeight="700" 
        fill={textColor}
        letterSpacing="0.02em"
      >
        T3P
      </text>
    </svg>
  );
};

/**
 * Sceau officiel T3P - Pour documents et attestations
 */
export const EcoleT3PSeal = ({ 
  className = "w-20 h-20",
  theme = "light"
}: { className?: string; theme?: "light" | "dark" | "mono" }) => {
  const mainColor = theme === "dark" ? COLORS.white : COLORS.forest;

  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Double cercle institutionnel */}
      <circle cx="50" cy="50" r="48" fill="none" stroke={mainColor} strokeWidth="2"/>
      <circle cx="50" cy="50" r="42" fill="none" stroke={mainColor} strokeWidth="1"/>
      
      {/* Texte circulaire haut - ÉCOLE */}
      <path id="topArcSeal" d="M 15 50 A 35 35 0 0 1 85 50" fill="none"/>
      <text fontFamily="Georgia, 'Times New Roman', serif" fontSize="9" fontWeight="600" fill={mainColor} letterSpacing="0.2em">
        <textPath href="#topArcSeal" startOffset="50%" textAnchor="middle">ÉCOLE</textPath>
      </text>
      
      {/* T3P central */}
      <text 
        x="50" 
        y="56" 
        textAnchor="middle" 
        fontFamily="Georgia, 'Times New Roman', serif" 
        fontSize="22" 
        fontWeight="700" 
        fill={mainColor}
        letterSpacing="0.02em"
      >
        T3P
      </text>
      
      {/* Texte circulaire bas - CENTRE DE FORMATION */}
      <path id="bottomArcSeal" d="M 15 50 A 35 35 0 0 0 85 50" fill="none"/>
      <text fontFamily="Georgia, 'Times New Roman', serif" fontSize="6" fontWeight="500" fill={mainColor} letterSpacing="0.1em">
        <textPath href="#bottomArcSeal" startOffset="50%" textAnchor="middle">CENTRE DE FORMATION</textPath>
      </text>
      
      {/* Petits séparateurs */}
      <circle cx="18" cy="50" r="1.5" fill={mainColor}/>
      <circle cx="82" cy="50" r="1.5" fill={mainColor}/>
    </svg>
  );
};

/**
 * Logo complet ÉCOLE T3P - Version institutionnelle
 */
export const EcoleT3PInstitutional = ({ 
  className = "h-14",
  variant = "full",
  theme = "light",
  showBaseline = true
}: LogoProps) => {
  
  if (variant === "monogram") {
    return <EcoleT3PMonogram className={className} theme={theme} />;
  }

  if (variant === "seal") {
    return <EcoleT3PSeal className={className} theme={theme} />;
  }

  const mainColor = theme === "dark" ? COLORS.white : COLORS.forest;
  const baselineColor = theme === "dark" ? "rgba(255,255,255,0.7)" : COLORS.gray;

  // Logo complet horizontal
  return (
    <svg viewBox="0 0 320 70" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Monogramme à gauche */}
      <circle cx="32" cy="32" r="30" fill={mainColor}/>
      <circle cx="32" cy="32" r="25" fill="none" stroke={theme === "dark" ? COLORS.forest : COLORS.white} strokeWidth="1" opacity="0.3"/>
      <text 
        x="32" 
        y="38" 
        textAnchor="middle" 
        fontFamily="Georgia, 'Times New Roman', serif" 
        fontSize="17" 
        fontWeight="700" 
        fill={theme === "dark" ? COLORS.forest : COLORS.white}
        letterSpacing="0.02em"
      >
        T3P
      </text>
      
      {/* Texte ÉCOLE T3P */}
      <text 
        x="78" 
        y="32" 
        fontFamily="Georgia, 'Times New Roman', serif" 
        fontSize="30" 
        fontWeight="700" 
        fill={mainColor}
        letterSpacing="0.04em"
      >
        ÉCOLE
      </text>
      <text 
        x="175" 
        y="32" 
        fontFamily="Georgia, 'Times New Roman', serif" 
        fontSize="30" 
        fontWeight="400" 
        fill={mainColor}
        letterSpacing="0.04em"
      >
        T3P
      </text>
      
      {/* Baseline institutionnelle */}
      {showBaseline && (
        <text 
          x="78" 
          y="52" 
          fontFamily="'Inter', 'Helvetica Neue', Arial, sans-serif" 
          fontSize="9" 
          fontWeight="500" 
          fill={baselineColor}
          letterSpacing="0.12em"
        >
          CENTRE DE FORMATION AGRÉÉ PRÉFECTURE
        </text>
      )}
    </svg>
  );
};

export default EcoleT3PInstitutional;
