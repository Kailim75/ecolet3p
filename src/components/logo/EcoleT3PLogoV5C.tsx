import React from "react";

interface EcoleT3PLogoV5CProps {
  className?: string;
  variant?: "color" | "white";
}

/**
 * ÉCOLE T3P — Logo V5C pixel-perfect en SVG React
 * Style : serif luxueux (Didot / Georgia), Vert Forêt + "3" orange doré
 * Variantes : "color" (fond clair) et "white" (fond sombre)
 */
const EcoleT3PLogoV5C = ({
  className = "h-12",
  variant = "color",
}: EcoleT3PLogoV5CProps) => {
  const isWhite = variant === "white";

  // Couleurs principales
  const mainColor = isWhite ? "#FFFFFF" : "#1B5E20";
  const accentColor = isWhite ? "#F5A623" : "#E65100";
  const taglineColor = isWhite ? "rgba(255,255,255,0.6)" : "#6B7280";

  return (
    <svg
      viewBox="0 0 340 68"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="École T3P — Centre de Formation Agréé"
    >
      {/* É C O L E */}
      <text
        x="0"
        y="34"
        fontFamily="Georgia, 'Times New Roman', 'Didot', serif"
        fontSize="38"
        fontWeight="700"
        fill={mainColor}
        letterSpacing="0.02em"
      >
        ÉCOLE
      </text>

      {/* T */}
      <text
        x="158"
        y="34"
        fontFamily="Georgia, 'Times New Roman', 'Didot', serif"
        fontSize="38"
        fontWeight="700"
        fill={mainColor}
        letterSpacing="0.02em"
      >
        T
      </text>

      {/* 3 — accent orange */}
      <text
        x="184"
        y="34"
        fontFamily="Georgia, 'Times New Roman', 'Didot', serif"
        fontSize="38"
        fontWeight="700"
        fill={accentColor}
        letterSpacing="0.02em"
      >
        3
      </text>

      {/* P */}
      <text
        x="208"
        y="34"
        fontFamily="Georgia, 'Times New Roman', 'Didot', serif"
        fontSize="38"
        fontWeight="700"
        fill={mainColor}
        letterSpacing="0.02em"
      >
        P
      </text>

      {/* Tagline — CENTRE DE FORMATION AGRÉÉ */}
      <text
        x="1"
        y="49"
        fontFamily="Inter, 'Helvetica Neue', Arial, sans-serif"
        fontSize="8.5"
        fontWeight="600"
        fill={taglineColor}
        letterSpacing="0.14em"
      >
        CENTRE DE FORMATION AGRÉÉ
      </text>

      {/* by Stampee & aamet */}
      <text
        x="1"
        y="62"
        fontFamily="Inter, 'Helvetica Neue', Arial, sans-serif"
        fontSize="6.5"
        fontWeight="400"
        fill={isWhite ? "rgba(255,255,255,0.4)" : "#9CA3AF"}
        letterSpacing="0.06em"
        fontStyle="italic"
      >
        by Stampee &amp; aamet
      </text>
    </svg>
  );
};

export default EcoleT3PLogoV5C;
