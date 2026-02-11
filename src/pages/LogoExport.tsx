import React from "react";
import { EcoleT3PLogo, EcoleT3PIcon } from "@/components/logo/EcoleT3PLogo";
import { Button } from "@/components/ui/button";
import { Download, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const LogoExport = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* Navigation bar - hidden when printing */}
      <div className="print:hidden bg-cream p-4 border-b border-forest/10 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-forest hover:text-gold transition-colors"
          >
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
          <div className="text-center mb-12 pb-8 border-b-2 border-forest">
            <h1 className="text-3xl font-black text-forest mb-2">CHARTE LOGO</h1>
            <p className="text-warm-gray-600">ECOLE T3P - Centre de Formation Taxi VTC VMDTR</p>
          </div>

          {/* Logo Principal */}
          <section className="mb-16">
            <h2 className="text-xl font-bold text-forest mb-6 uppercase tracking-wide">
              Logo Principal
            </h2>
            <div className="bg-cream-light rounded-xl p-12 flex items-center justify-center border border-forest/10">
              <EcoleT3PLogo className="h-20" theme="color" />
            </div>
            <p className="text-sm text-warm-gray-500 mt-4 text-center">
              Version couleur - À utiliser sur fonds clairs
            </p>
          </section>

          {/* Icône */}
          <section className="mb-16">
            <h2 className="text-xl font-bold text-forest mb-6 uppercase tracking-wide">
              Icône
            </h2>
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-cream-light rounded-xl p-8 flex items-center justify-center border border-forest/10 mb-3">
                  <EcoleT3PIcon className="w-20 h-20" theme="color" />
                </div>
                <p className="text-xs text-warm-gray-500">Standard</p>
              </div>
              <div className="text-center">
                <div className="bg-forest rounded-xl p-8 flex items-center justify-center mb-3">
                  <EcoleT3PIcon className="w-20 h-20" theme="white" />
                </div>
                <p className="text-xs text-warm-gray-500">Fond sombre</p>
              </div>
              <div className="text-center">
                <div className="bg-cream-light rounded-xl p-8 flex items-center justify-center border border-forest/10 mb-3">
                  <EcoleT3PIcon className="w-20 h-20" theme="mono" />
                </div>
                <p className="text-xs text-warm-gray-500">Monochrome</p>
              </div>
            </div>
          </section>

          {/* Couleurs */}
          <section className="mb-16">
            <h2 className="text-xl font-bold text-forest mb-6 uppercase tracking-wide">
              Palette de Couleurs
            </h2>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-full aspect-square rounded-xl bg-[#1B4D3E] mb-3 shadow-md"></div>
                <p className="font-bold text-sm text-forest">Forest Green</p>
                <p className="text-xs text-warm-gray-500">#1B4D3E</p>
              </div>
              <div className="text-center">
                <div className="w-full aspect-square rounded-xl bg-[#D4A853] mb-3 shadow-md"></div>
                <p className="font-bold text-sm text-forest">Gold</p>
                <p className="text-xs text-warm-gray-500">#D4A853</p>
              </div>
              <div className="text-center">
                <div className="w-full aspect-square rounded-xl bg-[#F5EBD7] mb-3 shadow-md border border-gray-200"></div>
                <p className="font-bold text-sm text-forest">Cream</p>
                <p className="text-xs text-warm-gray-500">#F5EBD7</p>
              </div>
              <div className="text-center">
                <div className="w-full aspect-square rounded-xl bg-[#6B6B6B] mb-3 shadow-md"></div>
                <p className="font-bold text-sm text-forest">Warm Gray</p>
                <p className="text-xs text-warm-gray-500">#6B6B6B</p>
              </div>
            </div>
          </section>

          {/* Versions du logo */}
          <section className="mb-16 print:break-before-page">
            <h2 className="text-xl font-bold text-forest mb-6 uppercase tracking-wide">
              Versions du Logo
            </h2>
            
            <div className="space-y-8">
              {/* Version standard */}
              <div className="bg-white rounded-xl p-8 border border-forest/10">
                <p className="text-sm font-semibold text-forest mb-4">Version Standard (fond clair)</p>
                <EcoleT3PLogo className="h-14" theme="color" />
              </div>

              {/* Version blanche */}
              <div className="bg-forest rounded-xl p-8">
                <p className="text-sm font-semibold text-cream/80 mb-4">Version Blanche (fond sombre)</p>
                <EcoleT3PLogo className="h-14" theme="white" />
              </div>

              {/* Version monochrome */}
              <div className="bg-cream-light rounded-xl p-8 border border-forest/10">
                <p className="text-sm font-semibold text-forest mb-4">Version Monochrome</p>
                <EcoleT3PLogo className="h-14" theme="mono" />
              </div>

              {/* Version horizontale */}
              <div className="bg-white rounded-xl p-8 border border-forest/10">
                <p className="text-sm font-semibold text-forest mb-4">Version Horizontale Compacte</p>
                <EcoleT3PLogo className="h-12" variant="horizontal" />
              </div>
            </div>
          </section>

          {/* Tailles minimales */}
          <section className="mb-16">
            <h2 className="text-xl font-bold text-forest mb-6 uppercase tracking-wide">
              Tailles Minimales
            </h2>
            <div className="flex items-end gap-8 flex-wrap bg-cream-light rounded-xl p-8 border border-forest/10">
              <div className="text-center">
                <EcoleT3PIcon className="w-6 h-6 mb-2 mx-auto" theme="color" />
                <p className="text-xs text-warm-gray-500">24px</p>
                <p className="text-xs text-forest font-semibold">Min. digital</p>
              </div>
              <div className="text-center">
                <EcoleT3PIcon className="w-10 h-10 mb-2 mx-auto" theme="color" />
                <p className="text-xs text-warm-gray-500">40px</p>
                <p className="text-xs text-forest font-semibold">Recommandé</p>
              </div>
              <div className="text-center">
                <EcoleT3PIcon className="w-16 h-16 mb-2 mx-auto" theme="color" />
                <p className="text-xs text-warm-gray-500">64px</p>
                <p className="text-xs text-forest font-semibold">Standard</p>
              </div>
              <div className="text-center">
                <EcoleT3PIcon className="w-24 h-24 mb-2 mx-auto" theme="color" />
                <p className="text-xs text-warm-gray-500">96px</p>
                <p className="text-xs text-forest font-semibold">Grand format</p>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="text-center pt-8 border-t border-forest/20">
            <p className="text-sm text-warm-gray-500">
              © 2026 ECOLE T3P - Tous droits réservés - Tous droits réservés
            </p>
            <p className="text-xs text-warm-gray-400 mt-2">
              3 rue Corneille, 92120 Montrouge | montrouge@ecolet3p.fr | 01 88 75 05 55
            </p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default LogoExport;
