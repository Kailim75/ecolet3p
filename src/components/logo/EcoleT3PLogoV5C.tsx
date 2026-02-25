import React from "react";
import logoColor from "@/assets/logo/ecole-t3p-logo-final.png";

interface EcoleT3PLogoV5CProps {
  className?: string;
  variant?: "color" | "white";
}

/**
 * ÉCOLE T3P — Logo final (image PNG)
 * Variante "white" utilise un filtre CSS brightness pour le fond sombre
 */
const EcoleT3PLogoV5C = ({
  className = "h-12",
  variant = "color",
}: EcoleT3PLogoV5CProps) => {
  return (
    <img
      src={logoColor}
      alt="École T3P — Centre de Formation Agréé"
      className={`${className} w-auto object-contain ${variant === "white" ? "brightness-0 invert" : ""}`}
    />
  );
};

export default EcoleT3PLogoV5C;
