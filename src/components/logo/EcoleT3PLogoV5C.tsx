import React from "react";

interface EcoleT3PLogoV5CProps {
  className?: string;
  variant?: "color" | "white";
}

/**
 * ÉCOLE T3P — Logo avec 2 variantes
 * Color: PNG haute qualité | White: PNG + filtre CSS OU SVG texte dédié
 */
const EcoleT3PLogoV5C = ({
  className = "h-12",
  variant = "color",
}: EcoleT3PLogoV5CProps) => {
  if (variant === "white") {
    return (
      <img
        src="/images/ecole-t3p-logo-white.svg"
        alt="ÉCOLE T3P — Centre de Formation Agréé"
        className={className}
        loading="eager"
        decoding="async"
      />
    );
  }

  return (
    <img
      src="/images/ecole-t3p-logo-color.png"
      alt="ÉCOLE T3P — Centre de Formation Agréé"
      className={className}
      loading="eager"
      decoding="async"
    />
  );
};

export default EcoleT3PLogoV5C;
