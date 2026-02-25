import React from "react";

interface EcoleT3PLogoV5CProps {
  className?: string;
  variant?: "color" | "white";
}

/**
 * ÉCOLE T3P — Logo final pixel-perfect en SVG React
 * Vert Forêt foncé + "3" doré/or + blason + tagline
 */
const EcoleT3PLogoV5C = ({
  className = "h-12",
  variant = "color",
}: EcoleT3PLogoV5CProps) => {
  const isWhite = variant === "white";

  const mainColor = isWhite ? "#FFFFFF" : "#1A3C28";
  const goldColor = isWhite ? "#D4A843" : "#A8893A";
  const taglineColor = isWhite ? "rgba(255,255,255,0.7)" : "#1A3C28";
  const subtitleColor = isWhite ? "rgba(255,255,255,0.4)" : "#A8893A";

  return (
    <svg
      viewBox="0 0 360 80"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="École T3P — Centre de Formation Agréé"
    >
      {/* ÉCOLE */}
      <text
        x="40"
        y="36"
        fontFamily="Georgia, 'Times New Roman', 'Didot', serif"
        fontSize="40"
        fontWeight="700"
        fill={mainColor}
        letterSpacing="0.04em"
      >
        ÉCOLE
      </text>

      {/* T */}
      <text
        x="210"
        y="36"
        fontFamily="Georgia, 'Times New Roman', 'Didot', serif"
        fontSize="40"
        fontWeight="700"
        fill={mainColor}
        letterSpacing="0.02em"
      >
        T
      </text>

      {/* 3 — doré */}
      <text
        x="237"
        y="36"
        fontFamily="Georgia, 'Times New Roman', 'Didot', serif"
        fontSize="40"
        fontWeight="700"
        fill={goldColor}
        letterSpacing="0.02em"
      >
        3
      </text>

      {/* P */}
      <text
        x="262"
        y="36"
        fontFamily="Georgia, 'Times New Roman', 'Didot', serif"
        fontSize="40"
        fontWeight="700"
        fill={mainColor}
        letterSpacing="0.02em"
      >
        P
      </text>

      {/* CENTRE DE FORMATION — left side */}
      <text
        x="40"
        y="54"
        fontFamily="Inter, 'Helvetica Neue', Arial, sans-serif"
        fontSize="8"
        fontWeight="600"
        fill={taglineColor}
        letterSpacing="0.14em"
      >
        CENTRE DE FORMATION
      </text>

      {/* Blason / Shield icon */}
      <g transform="translate(188, 45)" fill={goldColor}>
        <path d="M5 0 L10 2 L10 7 C10 10 7.5 12 5 13 C2.5 12 0 10 0 7 L0 2 Z" opacity="0.8" />
      </g>

      {/* AGRÉÉ — right side */}
      <text
        x="204"
        y="54"
        fontFamily="Inter, 'Helvetica Neue', Arial, sans-serif"
        fontSize="8"
        fontWeight="600"
        fill={taglineColor}
        letterSpacing="0.14em"
      >
        AGRÉÉ
      </text>

      {/* by Stampee & aamet */}
      <text
        x="120"
        y="68"
        fontFamily="Inter, 'Helvetica Neue', Arial, sans-serif"
        fontSize="7"
        fontWeight="400"
        fill={subtitleColor}
        letterSpacing="0.04em"
        fontStyle="italic"
        textAnchor="middle"
      >
        by Stampee &amp; aamet
      </text>
    </svg>
  );
};

export default EcoleT3PLogoV5C;
