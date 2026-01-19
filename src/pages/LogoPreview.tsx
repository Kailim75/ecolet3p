import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

// Import all logo variants
import logoFull from "@/assets/logo/t3p-campus-logo.svg";
import logoWhite from "@/assets/logo/t3p-campus-logo-white.svg";
import logoMono from "@/assets/logo/t3p-campus-logo-mono.svg";
import logoHorizontal from "@/assets/logo/t3p-campus-logo-horizontal.svg";
import iconFull from "@/assets/logo/t3p-campus-icon.svg";
import iconWhite from "@/assets/logo/t3p-campus-icon-white.svg";
import iconMono from "@/assets/logo/t3p-campus-icon-mono.svg";

const LogoPreview = () => {
  return (
    <div className="min-h-screen bg-cream p-8">
      <div className="max-w-6xl mx-auto">
        {/* Back link */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-forest hover:text-gold transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à l'accueil
        </Link>

        <h1 className="text-4xl font-black text-forest mb-2">Prévisualisation des Logos</h1>
        <p className="text-warm-gray-600 mb-12">Tous les variants du logo T3P Campus</p>

        {/* Full Logos Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-forest mb-6 border-b border-forest/20 pb-2">
            Logos Complets
          </h2>
          
          <div className="grid gap-8">
            {/* Standard Logo */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <p className="text-sm font-semibold text-warm-gray-500 mb-4">Logo Standard (fond clair)</p>
              <img src={logoFull} alt="Logo T3P Campus" className="h-16" />
            </div>

            {/* White Logo on dark background */}
            <div className="bg-forest rounded-2xl p-8 shadow-lg">
              <p className="text-sm font-semibold text-cream/70 mb-4">Logo Blanc (fond sombre)</p>
              <img src={logoWhite} alt="Logo T3P Campus Blanc" className="h-16" />
            </div>

            {/* Mono Logo */}
            <div className="bg-cream-light rounded-2xl p-8 shadow-lg border border-forest/10">
              <p className="text-sm font-semibold text-warm-gray-500 mb-4">Logo Monochrome</p>
              <img src={logoMono} alt="Logo T3P Campus Monochrome" className="h-16" />
            </div>

            {/* Horizontal Logo */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <p className="text-sm font-semibold text-warm-gray-500 mb-4">Logo Horizontal Compact</p>
              <img src={logoHorizontal} alt="Logo T3P Campus Horizontal" className="h-12" />
            </div>
          </div>
        </section>

        {/* Icons Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-forest mb-6 border-b border-forest/20 pb-2">
            Icônes (sans texte)
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Standard Icon */}
            <div className="bg-white rounded-2xl p-8 shadow-lg flex flex-col items-center">
              <p className="text-sm font-semibold text-warm-gray-500 mb-4">Icône Standard</p>
              <img src={iconFull} alt="Icône T3P Campus" className="w-24 h-24" />
            </div>

            {/* White Icon on dark background */}
            <div className="bg-forest rounded-2xl p-8 shadow-lg flex flex-col items-center">
              <p className="text-sm font-semibold text-cream/70 mb-4">Icône Blanc</p>
              <img src={iconWhite} alt="Icône T3P Campus Blanc" className="w-24 h-24" />
            </div>

            {/* Mono Icon */}
            <div className="bg-cream-light rounded-2xl p-8 shadow-lg border border-forest/10 flex flex-col items-center">
              <p className="text-sm font-semibold text-warm-gray-500 mb-4">Icône Monochrome</p>
              <img src={iconMono} alt="Icône T3P Campus Monochrome" className="w-24 h-24" />
            </div>
          </div>
        </section>

        {/* Size Comparison */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-forest mb-6 border-b border-forest/20 pb-2">
            Comparaison des Tailles
          </h2>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-end gap-8 flex-wrap">
              <div className="text-center">
                <img src={iconFull} alt="24px" className="w-6 h-6 mb-2" />
                <p className="text-xs text-warm-gray-500">24px</p>
              </div>
              <div className="text-center">
                <img src={iconFull} alt="32px" className="w-8 h-8 mb-2" />
                <p className="text-xs text-warm-gray-500">32px</p>
              </div>
              <div className="text-center">
                <img src={iconFull} alt="40px" className="w-10 h-10 mb-2" />
                <p className="text-xs text-warm-gray-500">40px</p>
              </div>
              <div className="text-center">
                <img src={iconFull} alt="48px" className="w-12 h-12 mb-2" />
                <p className="text-xs text-warm-gray-500">48px</p>
              </div>
              <div className="text-center">
                <img src={iconFull} alt="64px" className="w-16 h-16 mb-2" />
                <p className="text-xs text-warm-gray-500">64px</p>
              </div>
              <div className="text-center">
                <img src={iconFull} alt="96px" className="w-24 h-24 mb-2" />
                <p className="text-xs text-warm-gray-500">96px</p>
              </div>
            </div>
          </div>
        </section>

        {/* Usage in Context */}
        <section>
          <h2 className="text-2xl font-bold text-forest mb-6 border-b border-forest/20 pb-2">
            Simulation Header
          </h2>
          
          <div className="bg-cream-light rounded-2xl p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={iconFull} alt="Logo" className="w-10 h-10" />
                <span className="text-xl font-black text-forest tracking-tight uppercase">T3P Campus</span>
              </div>
              <div className="flex gap-6 text-sm font-semibold text-warm-gray-600">
                <span>Accueil</span>
                <span>Formations</span>
                <span>Contact</span>
              </div>
            </div>
          </div>

          <div className="bg-forest rounded-2xl p-4 shadow-lg mt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={iconWhite} alt="Logo" className="w-10 h-10" />
                <span className="text-xl font-black text-cream tracking-tight uppercase">T3P Campus</span>
              </div>
              <div className="flex gap-6 text-sm font-semibold text-cream/70">
                <span>Accueil</span>
                <span>Formations</span>
                <span>Contact</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LogoPreview;
