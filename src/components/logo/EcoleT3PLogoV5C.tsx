import React from "react";

interface EcoleT3PLogoV5CProps {
  className?: string;
  variant?: "color" | "white";
}

/**
 * ÉCOLE T3P — Logo PNG haute qualité fond transparent
 * Color: PNG original | White: filtre CSS brightness-0 invert
 */
const EcoleT3PLogoV5C = ({
  className = "h-12",
  variant = "color",
}: EcoleT3PLogoV5CProps) => {
  return (
    <img
      src="/images/ecole-t3p-logo-color.png"
      alt="École T3P — Centre de Formation Agréé"
      className={`${className} ${variant === "white" ? "brightness-0 invert" : ""}`}
      loading="eager"
      decoding="async"
    />
  );
};

export default EcoleT3PLogoV5C;
