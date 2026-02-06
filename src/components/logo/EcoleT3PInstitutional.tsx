import React from "react";

interface LogoProps {
  className?: string;
  variant?: "full" | "monogram";
  theme?: "light" | "dark" | "mono";
  showBaseline?: boolean;
}

/**
 * ÉCOLE T3P - Logo Institutionnel FINAL
 * 
 * Logotype statutaire et sobre pour un centre de formation agréé Préfecture.
 * Sans sceau, sans badge, sans dégradés, sans effets. Fonctionne en monochrome.
 * 
 * Variantes:
 * - full: Logotype complet "ÉCOLE T3P" + baseline
 * - monogram: Monogramme "T3P" seul (séparé du logo principal)
 */

// Couleurs institutionnelles
const COLORS = {
  forest: "#1B4D3E",      // Vert foncé institutionnel
  white: "#FFFFFF",
  black: "#1A1A1A",
  gray: "#4A4A4A",
};

/**
 * Monogramme T3P - Version séparée du logo principal
 * Usage : Favicon, icône, petit format, tampon
 */
export const EcoleT3PMonogram = ({ 
  className = "w-12 h-12",
  theme = "light"
}: { className?: string; theme?: "light" | "dark" | "mono" }) => {
  const mainColor = theme === "dark" ? COLORS.white : COLORS.forest;

  return (
    <svg viewBox="0 0 60 60" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* T3P en typographie institutionnelle */}
      <text 
        x="30" 
        y="38" 
        textAnchor="middle" 
        fontFamily="Georgia, 'Times New Roman', serif" 
        fontSize="24" 
        fontWeight="700" 
        fill={mainColor}
        letterSpacing="0.02em"
      >
        T3P
      </text>
    </svg>
  );
};

/**
 * Logo complet ÉCOLE T3P - Version institutionnelle finale
 * Logotype texte pur, sans sceau ni badge
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

  const mainColor = theme === "dark" ? COLORS.white : COLORS.forest;
  const baselineColor = theme === "dark" ? "rgba(255,255,255,0.7)" : COLORS.gray;

  // Logo complet - Logotype texte institutionnel
  return (
    <svg viewBox="0 0 280 55" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* ÉCOLE T3P - Logotype principal */}
      <text 
        x="0" 
        y="28" 
        fontFamily="Georgia, 'Times New Roman', serif" 
        fontSize="32" 
        fontWeight="700" 
        fill={mainColor}
        letterSpacing="0.03em"
      >
        ÉCOLE T3P
      </text>
      
      {/* Baseline institutionnelle */}
      {showBaseline && (
        <text 
          x="0" 
          y="48" 
          fontFamily="'Inter', 'Helvetica Neue', Arial, sans-serif" 
          fontSize="10" 
          fontWeight="500" 
          fill={baselineColor}
          letterSpacing="0.08em"
        >
          Centre de formation agréé Préfecture
        </text>
      )}
    </svg>
  );
};

export default EcoleT3PInstitutional;
