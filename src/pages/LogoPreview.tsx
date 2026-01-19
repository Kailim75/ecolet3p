import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { T3PCampusLogo, T3PCampusIcon } from "@/components/logo/T3PCampusLogo";

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
              <T3PCampusLogo className="h-16" theme="color" />
            </div>

            {/* White Logo on dark background */}
            <div className="bg-forest rounded-2xl p-8 shadow-lg">
              <p className="text-sm font-semibold text-cream/70 mb-4">Logo Blanc (fond sombre)</p>
              <T3PCampusLogo className="h-16" theme="white" />
            </div>

            {/* Mono Logo */}
            <div className="bg-cream-light rounded-2xl p-8 shadow-lg border border-forest/10">
              <p className="text-sm font-semibold text-warm-gray-500 mb-4">Logo Monochrome</p>
              <T3PCampusLogo className="h-16" theme="mono" />
            </div>

            {/* Horizontal Logo */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <p className="text-sm font-semibold text-warm-gray-500 mb-4">Logo Horizontal Compact</p>
              <T3PCampusLogo className="h-12" variant="horizontal" />
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
              <T3PCampusIcon className="w-24 h-24" theme="color" />
            </div>

            {/* White Icon on dark background */}
            <div className="bg-forest rounded-2xl p-8 shadow-lg flex flex-col items-center">
              <p className="text-sm font-semibold text-cream/70 mb-4">Icône Blanc</p>
              <T3PCampusIcon className="w-24 h-24" theme="white" />
            </div>

            {/* Mono Icon */}
            <div className="bg-cream-light rounded-2xl p-8 shadow-lg border border-forest/10 flex flex-col items-center">
              <p className="text-sm font-semibold text-warm-gray-500 mb-4">Icône Monochrome</p>
              <T3PCampusIcon className="w-24 h-24" theme="mono" />
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
                <T3PCampusIcon className="w-6 h-6 mb-2" theme="color" />
                <p className="text-xs text-warm-gray-500">24px</p>
              </div>
              <div className="text-center">
                <T3PCampusIcon className="w-8 h-8 mb-2" theme="color" />
                <p className="text-xs text-warm-gray-500">32px</p>
              </div>
              <div className="text-center">
                <T3PCampusIcon className="w-10 h-10 mb-2" theme="color" />
                <p className="text-xs text-warm-gray-500">40px</p>
              </div>
              <div className="text-center">
                <T3PCampusIcon className="w-12 h-12 mb-2" theme="color" />
                <p className="text-xs text-warm-gray-500">48px</p>
              </div>
              <div className="text-center">
                <T3PCampusIcon className="w-16 h-16 mb-2" theme="color" />
                <p className="text-xs text-warm-gray-500">64px</p>
              </div>
              <div className="text-center">
                <T3PCampusIcon className="w-24 h-24 mb-2" theme="color" />
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
                <T3PCampusIcon className="w-10 h-10" theme="color" />
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
                <T3PCampusIcon className="w-10 h-10" theme="white" />
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
