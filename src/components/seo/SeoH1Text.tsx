import type { CSSProperties } from "react";
import { getPageSeo } from "@/lib/seoPages";

interface SeoH1TextProps {
  /** Chemin de la page dans src/data/seoPages.json (vérifié par src/test/seoPages.test.ts) */
  path: string;
  /** Couleur d'accent de la seconde ligne, appliquée à la partie qui suit « : » */
  accentClassName?: string;
  accentStyle?: CSSProperties;
}

/**
 * Contenu du H1 d'une page, lu dans la source unique partagée avec le prérendu.
 * Les héros en deux couleurs gardent leur rendu quand le H1 contient « : » :
 * la suite passe à la ligne dans la couleur d'accent.
 */
const SeoH1Text = ({ path, accentClassName, accentStyle }: SeoH1TextProps) => {
  const text = getPageSeo(path)?.h1 ?? "";
  const i = text.indexOf(" : ");
  if (i < 0 || (!accentClassName && !accentStyle)) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)} :{" "}
      <br />
      <span className={accentClassName} style={accentStyle}>
        {text.slice(i + 3)}
      </span>
    </>
  );
};

export default SeoH1Text;
