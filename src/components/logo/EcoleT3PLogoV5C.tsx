import React from "react";

interface EcoleT3PLogoV5CProps {
  className?: string;
  variant?: "color" | "white";
}

/**
 * ÉCOLE T3P — Logo officiel V5C (SVG React inline)
 * 
 * Typographie serif « ÉCOLE T3P » avec le chiffre 3 en or.
 * Tagline « CENTRE DE FORMATION AGRÉÉ ».
 * Ratio natif ≈ 4.2:1 (viewBox 320×76).
 * 
 * Variantes :
 * - color : fond clair (texte vert forêt, 3 doré)
 * - white : fond sombre (texte blanc, 3 doré clair)
 */
const EcoleT3PLogoV5C = ({
  className = "h-12",
  variant = "color",
}: EcoleT3PLogoV5CProps) => {
  const isWhite = variant === "white";

  // Palette
  const textMain = isWhite ? "#FFFFFF" : "#1B4D3E";
  const goldColor = isWhite ? "#E4BE73" : "#D4A853";
  const taglineColor = isWhite ? "rgba(255,255,255,0.65)" : "#5A5A5A";
  const creditColor = isWhite ? "rgba(255,255,255,0.35)" : "#9A9A9A";

  return (
    <svg
      viewBox="0 0 320 76"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="École T3P — Centre de Formation Agréé"
      style={{ width: "auto" }}
    >
      {/* ÉCOLE  T  3  P — main brand */}
      <text
        x="0"
        y="42"
        fontFamily="Georgia, 'Times New Roman', 'Noto Serif', serif"
        fontSize="46"
        fontWeight="700"
        letterSpacing="0.02em"
      >
        <tspan fill={textMain}>ÉCOLE </tspan>
        <tspan fill={textMain}>T</tspan>
        <tspan fill={goldColor}>3</tspan>
        <tspan fill={textMain}>P</tspan>
      </text>

      {/* Tagline */}
      <text
        x="1"
        y="60"
        fontFamily="'Inter', 'Helvetica Neue', Arial, sans-serif"
        fontSize="10.5"
        fontWeight="600"
        fill={taglineColor}
        letterSpacing="0.14em"
      >
        CENTRE DE FORMATION AGRÉÉ
      </text>

      {/* Credit line */}
      <text
        x="1"
        y="73"
        fontFamily="'Inter', 'Helvetica Neue', Arial, sans-serif"
        fontSize="7"
        fontWeight="400"
        fill={creditColor}
        letterSpacing="0.05em"
      >
        by Stampee &amp; aamet
      </text>
    </svg>
  );
};

export default EcoleT3PLogoV5C;
