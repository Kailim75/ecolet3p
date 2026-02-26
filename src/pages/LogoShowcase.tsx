import React from "react";
import EcoleT3PLogoV5C from "@/components/logo/EcoleT3PLogoV5C";
import EcoleT3PMonogram from "@/components/logo/EcoleT3PMonogram";

const LogoShowcase = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-3xl font-black text-foreground mb-12 text-center">
        Kit Logo — ÉCOLE T3P
      </h1>

      {/* Logo principal */}
      <section className="mb-16">
        <h2 className="text-lg font-bold text-foreground mb-6 border-b border-border pb-2">Logo principal</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Fond clair */}
          <div className="rounded-2xl border border-border bg-white p-10 flex flex-col items-center gap-4">
            <p className="text-xs text-muted-foreground uppercase tracking-widest">Fond clair</p>
            <EcoleT3PLogoV5C variant="color" className="h-20 w-auto" />
            <code className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">variant="color"</code>
          </div>
          {/* Fond sombre */}
          <div className="rounded-2xl border border-border bg-primary p-10 flex flex-col items-center gap-4">
            <p className="text-xs text-white/50 uppercase tracking-widest">Fond sombre</p>
            <EcoleT3PLogoV5C variant="white" className="h-20 w-auto" />
            <code className="text-xs text-white/40 bg-white/10 px-2 py-1 rounded">variant="white"</code>
          </div>
        </div>
      </section>

      {/* Monogramme */}
      <section className="mb-16">
        <h2 className="text-lg font-bold text-foreground mb-6 border-b border-border pb-2">Monogramme compact</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Color */}
          <div className="rounded-2xl border border-border bg-white p-10 flex flex-col items-center gap-4">
            <p className="text-xs text-muted-foreground uppercase tracking-widest">Color</p>
            <EcoleT3PMonogram variant="color" className="h-20 w-20" />
            <code className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">variant="color"</code>
          </div>
          {/* White on dark */}
          <div className="rounded-2xl border border-border bg-primary p-10 flex flex-col items-center gap-4">
            <p className="text-xs text-white/50 uppercase tracking-widest">White</p>
            <EcoleT3PMonogram variant="white" className="h-20 w-20" />
            <code className="text-xs text-white/40 bg-white/10 px-2 py-1 rounded">variant="white"</code>
          </div>
          {/* Transparent on image */}
          <div className="rounded-2xl border border-border bg-gradient-to-br from-primary to-accent p-10 flex flex-col items-center gap-4">
            <p className="text-xs text-white/50 uppercase tracking-widest">Transparent</p>
            <EcoleT3PMonogram variant="transparent" className="h-20 w-20" />
            <code className="text-xs text-white/40 bg-white/10 px-2 py-1 rounded">variant="transparent"</code>
          </div>
        </div>
      </section>

      {/* Tailles */}
      <section className="mb-16">
        <h2 className="text-lg font-bold text-foreground mb-6 border-b border-border pb-2">Échelle de tailles</h2>
        <div className="rounded-2xl border border-border bg-white p-10 flex items-end justify-center gap-10 flex-wrap">
          {[8, 10, 12, 16, 20, 24].map((h) => (
            <div key={h} className="flex flex-col items-center gap-2">
              <EcoleT3PLogoV5C variant="color" className={`h-${h} w-auto`} />
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
            <li>📁 /images/ecole-t3p-logo-color.png — Logo principal (PNG)</li>
            <li>📁 /images/ecole-t3p-logo-color.svg — Logo principal (SVG texte)</li>
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
