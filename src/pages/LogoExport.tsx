import React from "react";
import { Helmet } from "react-helmet-async";
import EcoleT3PLogoV5C from "@/components/logo/EcoleT3PLogoV5C";
import { EcoleT3PInstitutional, EcoleT3PMonogram } from "@/components/logo/EcoleT3PInstitutional";
import { Button } from "@/components/ui/button";
import { Download, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const LogoExport = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <Helmet><meta name="robots" content="noindex, nofollow" /></Helmet>
      {/* Navigation bar - hidden when printing */}
      <div className="print:hidden bg-secondary p-4 border-b border-primary/10 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Retour
          </Link>
          <Button onClick={handlePrint} className="btn-primary">
            <Download className="w-4 h-4 mr-2" />
            Télécharger en PDF
          </Button>
        </div>
      </div>

      {/* PDF Content */}
      <div className="bg-white min-h-screen p-8 print:p-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 pb-8 border-b-2 border-primary">
            <h1 className="text-3xl font-black text-primary mb-2">CHARTE LOGO</h1>
            <p className="text-muted-foreground">ECOLE T3P - Centre de Formation Taxi VTC VMDTR</p>
          </div>

          {/* Logo Principal */}
          <section className="mb-16">
            <h2 className="text-xl font-bold text-primary mb-6 uppercase tracking-wide">Logo Principal</h2>
            <div className="bg-secondary rounded-xl p-12 flex items-center justify-center border border-primary/10">
              <EcoleT3PLogoV5C className="h-20" variant="color" />
            </div>
            <p className="text-sm text-muted-foreground mt-4 text-center">Version couleur - À utiliser sur fonds clairs</p>
          </section>

          {/* Version fond sombre */}
          <section className="mb-16">
            <h2 className="text-xl font-bold text-primary mb-6 uppercase tracking-wide">Version Fond Sombre</h2>
            <div className="bg-primary rounded-xl p-12 flex items-center justify-center">
              <EcoleT3PLogoV5C className="h-20" variant="white" />
            </div>
            <p className="text-sm text-muted-foreground mt-4 text-center">Version blanche - À utiliser sur fonds sombres</p>
          </section>

          {/* Logo Institutionnel */}
          <section className="mb-16">
            <h2 className="text-xl font-bold text-primary mb-6 uppercase tracking-wide">Logo Institutionnel</h2>
            <div className="space-y-8">
              <div className="bg-white rounded-xl p-8 border border-primary/10">
                <p className="text-sm font-semibold text-primary mb-4">Version Clair</p>
                <EcoleT3PInstitutional className="h-14" theme="light" showBaseline />
              </div>
              <div className="bg-primary rounded-xl p-8">
                <p className="text-sm font-semibold text-white/80 mb-4">Version Sombre</p>
                <EcoleT3PInstitutional className="h-14" theme="dark" showBaseline />
              </div>
              <div className="bg-secondary rounded-xl p-8 border border-primary/10">
                <p className="text-sm font-semibold text-primary mb-4">Version Monochrome</p>
                <EcoleT3PInstitutional className="h-14" theme="mono" showBaseline />
              </div>
            </div>
          </section>

          {/* Monogramme */}
          <section className="mb-16">
            <h2 className="text-xl font-bold text-primary mb-6 uppercase tracking-wide">Monogramme</h2>
            <div className="grid grid-cols-3 gap-8">
              {(["light", "dark", "mono"] as const).map((theme) => (
                <div key={theme} className="text-center">
                  <div className={`rounded-xl p-8 flex items-center justify-center mb-3 ${theme === "dark" ? "bg-primary" : "bg-secondary border border-primary/10"}`}>
                    <EcoleT3PMonogram className="w-20 h-20" theme={theme} />
                  </div>
                  <p className="text-xs text-muted-foreground capitalize">{theme}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Couleurs */}
          <section className="mb-16">
            <h2 className="text-xl font-bold text-primary mb-6 uppercase tracking-wide">Palette de Couleurs</h2>
            <div className="grid grid-cols-4 gap-4">
              {[
                { name: "Forest Green", hex: "#1B4D3E" },
                { name: "Gold", hex: "#D4A853" },
                { name: "Cream", hex: "#F5EBD7" },
                { name: "Warm Gray", hex: "#6B6B6B" },
              ].map(({ name, hex }) => (
                <div key={hex} className="text-center">
                  <div className="w-full aspect-square rounded-xl shadow-md mb-3" style={{ backgroundColor: hex, border: hex === "#F5EBD7" ? "1px solid #e0e0e0" : undefined }} />
                  <p className="font-bold text-sm text-primary">{name}</p>
                  <p className="text-xs text-muted-foreground">{hex}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Footer */}
          <footer className="text-center pt-8 border-t border-primary/20">
            <p className="text-sm text-muted-foreground">© 2026 ECOLE T3P — Tous droits réservés</p>
            <p className="text-xs text-muted-foreground/70 mt-2">3 rue Corneille, 92120 Montrouge | montrouge@ecolet3p.fr | 01 88 75 05 55</p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default LogoExport;
