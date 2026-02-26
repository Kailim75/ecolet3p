import React from "react";

interface EcoleT3PLogoV5CProps {
  className?: string;
  variant?: "color" | "white";
}

/**
 * ÉCOLE T3P — Logo SVG vectoriel tracé exact
 * Color: couleurs originales | White: filtre CSS (SVG sans fond = rendu propre)
 */
const EcoleT3PLogoV5C = ({
  className = "h-12",
  variant = "color",
}: EcoleT3PLogoV5CProps) => {
  return (
    <img
      src="/images/ecole-t3p-logo-color.svg"
      alt="École T3P — Centre de Formation Agréé"
      className={`${className} ${variant === "white" ? "brightness-0 invert" : ""}`}
      loading="eager"
      decoding="async"
    />
  );
};

export default EcoleT3PLogoV5C;
