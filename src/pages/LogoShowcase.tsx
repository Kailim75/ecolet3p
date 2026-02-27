import React from "react";
import { Link } from "react-router-dom";
import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LogoItem {
  label: string;
  src: string;
  bg: "light" | "dark";
}

const logos: LogoItem[] = [
  { label: "Logo couleur (SVG)", src: "/images/ecole-t3p-logo-color.svg", bg: "light" },
  { label: "Logo blanc (SVG)", src: "/images/ecole-t3p-logo-white.svg", bg: "dark" },
  { label: "Logo couleur HD (PNG)", src: "/images/ecole-t3p-logo-color.png", bg: "light" },
  { label: "Logo fond vert HD (PNG)", src: "/images/ecole-t3p-logo-white-bg.png", bg: "dark" },
];

const monograms: LogoItem[] = [
  { label: "Monogramme couleur (SVG)", src: "/logo/ecole-t3p-monogram.svg", bg: "light" },
  { label: "Monogramme blanc (SVG)", src: "/logo/ecole-t3p-monogram-white.svg", bg: "dark" },
];

const handleDownload = (path: string) => {
  const a = document.createElement("a");
  a.href = path;
  a.download = path.split("/").pop() || "logo";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

const LogoCard = ({ item }: { item: LogoItem }) => (
  <div className="rounded-2xl border border-border overflow-hidden flex flex-col">
    <div className={`${item.bg === "dark" ? "bg-primary" : "bg-white"} p-10 flex items-center justify-center min-h-[140px]`}>
      <img src={item.src} alt={item.label} className="h-16 w-auto max-w-full object-contain" />
    </div>
    <div className="p-4 flex items-center justify-between gap-3 bg-card">
      <p className="text-sm font-semibold text-foreground">{item.label}</p>
      <Button size="sm" variant="outline" onClick={() => handleDownload(item.src)}>
        <Download className="w-4 h-4 mr-1.5" />
        Télécharger
      </Button>
    </div>
  </div>
);

const LogoShowcase = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-3xl font-black text-foreground">Kit Logo — ÉCOLE T3P</h1>
          <Button variant="secondary" asChild>
            <Link to="/logo-export">
              <FileText className="w-4 h-4 mr-2" />
              Exporter tout en PDF
            </Link>
          </Button>
        </div>

        <section className="mb-16">
          <h2 className="text-lg font-bold text-foreground mb-6 border-b border-border pb-2">Logo principal</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {logos.map((item) => <LogoCard key={item.src} item={item} />)}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-lg font-bold text-foreground mb-6 border-b border-border pb-2">Monogramme compact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {monograms.map((item) => <LogoCard key={item.src} item={item} />)}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground mb-6 border-b border-border pb-2">Échelle de tailles</h2>
          <div className="rounded-2xl border border-border bg-white p-10 flex items-end justify-center gap-10 flex-wrap">
            {[8, 10, 12, 16, 20, 24].map((h) => (
              <div key={h} className="flex flex-col items-center gap-2">
                <img src="/images/ecole-t3p-logo-color.svg" alt="ÉCOLE T3P" className={`h-${h} w-auto`} />
                <span className="text-xs text-muted-foreground">h-{h}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default LogoShowcase;
