import React from "react";
import { Link } from "react-router-dom";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const LogoShowcase = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="flex items-center justify-between mb-12 max-w-4xl mx-auto">
        <h1 className="text-3xl font-black text-foreground">Kit Logo — ÉCOLE T3P</h1>
        <Button asChild>
          <Link to="/logo-export">
            <Download className="w-4 h-4 mr-2" />
            Télécharger en PDF
          </Link>
        </Button>
      </div>

      {/* Logo principal */}
      <section className="mb-16">
        <h2 className="text-lg font-bold text-foreground mb-6 border-b border-border pb-2">Logo principal</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-border bg-white p-10 flex flex-col items-center gap-4">
            <p className="text-xs text-muted-foreground uppercase tracking-widest">Fond clair</p>
            <img src="/images/ecole-t3p-logo-color.svg" alt="ÉCOLE T3P" className="h-20 w-auto" />
          </div>
          <div className="rounded-2xl border border-border bg-primary p-10 flex flex-col items-center gap-4">
            <p className="text-xs text-white/50 uppercase tracking-widest">Fond sombre</p>
            <img src="/images/ecole-t3p-logo-white.svg" alt="ÉCOLE T3P" className="h-20 w-auto" />
          </div>
        </div>
      </section>

      {/* Monogramme */}
      <section className="mb-16">
        <h2 className="text-lg font-bold text-foreground mb-6 border-b border-border pb-2">Monogramme compact</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-border bg-white p-10 flex flex-col items-center gap-4">
            <p className="text-xs text-muted-foreground uppercase tracking-widest">Couleur</p>
            <img src="/logo/ecole-t3p-monogram.svg" alt="T3P" className="h-20 w-20" />
          </div>
          <div className="rounded-2xl border border-border bg-primary p-10 flex flex-col items-center gap-4">
            <p className="text-xs text-white/50 uppercase tracking-widest">Blanc</p>
            <img src="/logo/ecole-t3p-monogram-white.svg" alt="T3P" className="h-20 w-20" />
          </div>
        </div>
      </section>

      {/* Tailles */}
      <section className="mb-16">
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

      {/* Fichiers */}
      <section>
        <h2 className="text-lg font-bold text-foreground mb-6 border-b border-border pb-2">Assets disponibles</h2>
        <div className="rounded-2xl border border-border bg-muted/50 p-6">
          <ul className="space-y-2 text-sm text-foreground font-mono">
            <li>📁 /images/ecole-t3p-logo-color.svg — Logo principal (SVG)</li>
            <li>📁 /images/ecole-t3p-logo-white.svg — Logo blanc (SVG)</li>
            <li>📁 /logo/ecole-t3p-monogram.svg — Monogramme couleur (SVG)</li>
            <li>📁 /logo/ecole-t3p-monogram-white.svg — Monogramme blanc (SVG)</li>
            <li>📁 /favicon.svg — Favicon monogramme</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default LogoShowcase;
