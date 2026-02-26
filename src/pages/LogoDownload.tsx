import React from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Download, FileImage, FileCode, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface LogoAsset {
  label: string;
  description: string;
  path: string;
  format: string;
  background: "light" | "dark" | "transparent";
}

const assets: LogoAsset[] = [
  {
    label: "Logo couleur (PNG)",
    description: "Logo principal haute résolution sur fond transparent",
    path: "/images/ecole-t3p-logo-color.png",
    format: "PNG",
    background: "light",
  },
  {
    label: "Logo couleur (SVG)",
    description: "Logo vectoriel — qualité infinie, idéal impression",
    path: "/images/ecole-t3p-logo-color.svg",
    format: "SVG",
    background: "light",
  },
  {
    label: "Logo blanc (SVG)",
    description: "Version blanche pour fonds sombres",
    path: "/images/ecole-t3p-logo-white.svg",
    format: "SVG",
    background: "dark",
  },
  {
    label: "Logo transparent (PNG)",
    description: "Version transparente fond blanc pour impression",
    path: "/images/ecole-t3p-logo-transparent.png",
    format: "PNG",
    background: "transparent",
  },
  {
    label: "Logo HD Impression (PNG)",
    description: "Version haute résolution pour supports print",
    path: "/images/ecole-t3p-logo-print-hd.png",
    format: "PNG",
    background: "light",
  },
  {
    label: "Monogramme couleur (SVG)",
    description: "Icône compacte T3P sur fond vert",
    path: "/logo/ecole-t3p-monogram.svg",
    format: "SVG",
    background: "light",
  },
  {
    label: "Monogramme blanc (SVG)",
    description: "Icône compacte T3P blanc — fond transparent",
    path: "/logo/ecole-t3p-monogram-white.svg",
    format: "SVG",
    background: "dark",
  },
  {
    label: "Favicon (SVG)",
    description: "Icône navigateur optimisée",
    path: "/logo/ecole-t3p-favicon.svg",
    format: "SVG",
    background: "light",
  },
];

const bgClass = (bg: LogoAsset["background"]) => {
  if (bg === "dark") return "bg-primary";
  if (bg === "transparent") return "bg-[repeating-conic-gradient(hsl(var(--muted))_0%_25%,white_0%_50%)] bg-[length:16px_16px]";
  return "bg-white";
};

const handleDownload = (path: string, label: string) => {
  const a = document.createElement("a");
  a.href = path;
  a.download = path.split("/").pop() || label;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

const LogoDownload = () => {
  return (
    <Layout>
      <Helmet>
        <title>Télécharger les logos — ÉCOLE T3P</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-background pt-28 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Link to="/logo-showcase" className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors mb-8 text-sm">
            <ArrowLeft className="w-4 h-4" />
            Retour au kit logo
          </Link>

          <h1 className="text-3xl font-black text-foreground mb-2">Télécharger les logos</h1>
          <p className="text-muted-foreground mb-10">Tous les formats officiels ÉCOLE T3P, prêts à l'emploi.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {assets.map((asset) => (
              <div key={asset.path} className="rounded-2xl border border-border overflow-hidden flex flex-col">
                {/* Preview */}
                <div className={`${bgClass(asset.background)} p-8 flex items-center justify-center min-h-[120px]`}>
                  <img
                    src={asset.path}
                    alt={asset.label}
                    className="max-h-16 max-w-full object-contain"
                  />
                </div>
                {/* Info + download */}
                <div className="p-4 flex flex-col gap-3 flex-1 bg-card">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-foreground text-sm">{asset.label}</p>
                      <p className="text-xs text-muted-foreground">{asset.description}</p>
                    </div>
                    <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider bg-muted text-muted-foreground px-2 py-0.5 rounded">
                      {asset.format}
                    </span>
                  </div>
                  <Button
                    size="sm"
                    className="w-full mt-auto"
                    onClick={() => handleDownload(asset.path, asset.label)}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Télécharger
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LogoDownload;
