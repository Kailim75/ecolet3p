import React from "react";

interface EcoleT3PLogoV5CProps {
  className?: string;
  variant?: "color" | "white";
}

/**
 * ÉCOLE T3P — Logo SVG adaptatif
 * Variante color : vert forêt + or   |   Variante white : tout blanc
 */
const EcoleT3PLogoV5C = ({
  className = "h-12",
  variant = "color",
}: EcoleT3PLogoV5CProps) => {
  const green = variant === "white" ? "#FFFFFF" : "#1B5E20";
  const gold = variant === "white" ? "#FFFFFF" : "#B8860B";
  const tagline = variant === "white" ? "rgba(255,255,255,0.85)" : "#3E3E3E";
  const sub = variant === "white" ? "rgba(255,255,255,0.55)" : "#9E9E9E";

  return (
    <svg
      viewBox="0 0 360 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="École T3P — Centre de Formation Agréé"
    >
      {/* ── ÉCOLE ── */}
      <text
        x="4"
        y="52"
        fontFamily="'Plus Jakarta Sans', 'Poppins', sans-serif"
        fontWeight="800"
        fontSize="54"
        letterSpacing="2"
        fill={green}
      >
        ÉCOLE
      </text>

      {/* ── T3P ── */}
      <text
        x="210"
        y="52"
        fontFamily="'Plus Jakarta Sans', 'Poppins', sans-serif"
        fontWeight="800"
        fontSize="54"
        letterSpacing="1"
        fill={gold}
      >
        T3P
      </text>

      {/* ── Tagline ── */}
      <text
        x="180"
        y="72"
        textAnchor="middle"
        fontFamily="'Inter', 'Poppins', sans-serif"
        fontWeight="500"
        fontSize="11"
        letterSpacing="3"
        fill={tagline}
      >
        CENTRE DE FORMATION AGRÉÉ
      </text>

      {/* ── Signature ── */}
      <text
        x="180"
        y="88"
        textAnchor="middle"
        fontFamily="'Inter', 'Poppins', sans-serif"
        fontWeight="400"
        fontStyle="italic"
        fontSize="8.5"
        letterSpacing="0.5"
        fill={sub}
      >
        by Sanpre &amp; Sanat
      </text>
    </svg>
  );
};

export default EcoleT3PLogoV5C;
