import React from "react";

interface EcoleT3PLogoV5CProps {
  className?: string;
  variant?: "color" | "white";
}

/**
 * ÉCOLE T3P — Logo final (image PNG)
 * Utilise l'image publique existante
 */
const EcoleT3PLogoV5C = ({
  className = "h-12",
  variant = "color",
}: EcoleT3PLogoV5CProps) => {
  const src = variant === "white"
    ? "/images/ecole-t3p-logo-v5c-white.png"
    : "/images/ecole-t3p-logo-header.png";

  return (
    <img
      src={src}
      alt="École T3P — Centre de Formation Agréé"
      className={className}
      loading="eager"
      decoding="async"
    />
  );
};

export default EcoleT3PLogoV5C;
