import React from "react";

interface EcoleT3PMonogramProps {
  className?: string;
  variant?: "color" | "white" | "transparent";
}

const srcMap: Record<EcoleT3PMonogramProps["variant"] & string, string> = {
  color: "/logo/ecole-t3p-monogram.svg",
  white: "/logo/ecole-t3p-monogram-white.svg",
  transparent: "/logo/ecole-t3p-monogram-white.svg",
};

/**
 * Monogramme compact "T3P"
 * - color: fond vert + lettrage doré
 * - white: fond transparent + lettrage blanc
 * - transparent: alias de white (rétro-compat)
 */
const EcoleT3PMonogram = ({
  className = "h-10 w-10",
  variant = "color",
}: EcoleT3PMonogramProps) => (
  <img
    src={srcMap[variant]}
    alt="T3P"
    className={className}
    loading="eager"
    decoding="async"
  />
);

export default EcoleT3PMonogram;
