import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft, Check, X } from "lucide-react";

const LogoInstitutional = () => {
  return (
    <div className="min-h-screen bg-[#F8F6F3] p-8">
      <Helmet><meta name="robots" content="noindex, nofollow" /></Helmet>
      <div className="max-w-5xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />Retour à l'accueil
        </Link>

        <h1 className="text-3xl font-serif font-bold text-primary mb-2">Logo Institutionnel ÉCOLE T3P</h1>
        <p className="text-muted-foreground mb-4">Version FINALE — Statutaire et sobre</p>

        <div className="bg-white rounded-lg p-4 mb-12 border border-primary/10">
          <h3 className="font-semibold text-primary mb-3 text-sm uppercase tracking-wide">Critères respectés</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            {["Sans sceau", "Sans badge", "Sans dégradés", "Sans effets", "Monochrome OK", "Typographie précise", "Baseline institutionnelle", "Drapeau français"].map((item) => (
              <div key={item} className="flex items-center gap-2 text-primary">
                <Check className="w-4 h-4" /><span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-serif font-semibold text-primary mb-4 pb-2 border-b border-primary/20">1. Logo principal — Fond clair</h2>
          <div className="bg-white rounded-lg p-8 border border-primary/10">
            <img src="/images/ecole-t3p-logo-color.svg" alt="ÉCOLE T3P" className="h-14 w-auto" />
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-lg font-serif font-semibold text-primary mb-4 pb-2 border-b border-primary/20">2. Logo principal — Fond sombre</h2>
          <div className="bg-primary rounded-lg p-8">
            <img src="/images/ecole-t3p-logo-white.svg" alt="ÉCOLE T3P" className="h-14 w-auto" />
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-lg font-serif font-semibold text-primary mb-4 pb-2 border-b border-primary/20">3. Monogramme T3P</h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 border border-primary/10 flex flex-col items-center">
              <img src="/logo/ecole-t3p-monogram.svg" alt="T3P" className="w-20 h-20" />
              <p className="text-xs text-muted-foreground mt-3">Fond clair</p>
            </div>
            <div className="bg-primary rounded-lg p-6 flex flex-col items-center">
              <img src="/logo/ecole-t3p-monogram-white.svg" alt="T3P" className="w-20 h-20" />
              <p className="text-xs text-white/70 mt-3">Fond sombre</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-lg font-serif font-semibold text-primary mb-4 pb-2 border-b border-primary/20">Tests de lisibilité</h2>
          <div className="bg-white rounded-lg p-6 border border-primary/10">
            <div className="flex items-end gap-8 flex-wrap">
              {[6, 8, 10, 14].map((h) => (
                <div key={h} className="text-center">
                  <img src="/images/ecole-t3p-logo-color.svg" alt="ÉCOLE T3P" className={`h-${h} w-auto mb-2`} />
                  <p className="text-xs text-muted-foreground">{h * 4}px</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-lg font-serif font-semibold text-primary mb-4 pb-2 border-b border-primary/20">Simulation — Attestation officielle</h2>
          <div className="bg-white rounded-lg p-8 border border-primary/10 max-w-md mx-auto">
            <div className="mb-6">
              <img src="/images/ecole-t3p-logo-color.svg" alt="ÉCOLE T3P" className="h-10 w-auto" />
            </div>
            <div className="border-t border-b border-primary/20 py-4 mb-4">
              <h3 className="text-center font-serif font-semibold text-primary text-lg">ATTESTATION DE FORMATION</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              Je soussigné, Directeur de l'ÉCOLE T3P, certifie que M./Mme [NOM PRÉNOM] 
              a suivi avec succès la formation [INTITULÉ] du [DATE] au [DATE].
            </p>
            <div className="flex justify-between items-end mt-8">
              <div className="text-xs text-muted-foreground">
                <p>Fait à Montrouge</p><p>Le [DATE]</p>
              </div>
              <div className="text-center">
                <img src="/logo/ecole-t3p-monogram.svg" alt="T3P" className="w-12 h-12 mx-auto opacity-60" />
                <p className="text-xs text-muted-foreground mt-1">Le Directeur</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-serif font-semibold text-primary mb-4 pb-2 border-b border-primary/20">Usages interdits</h2>
          <div className="bg-red-50 rounded-lg p-4 border border-red-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-red-700">
              {["Sceau / badge", "Dégradés de couleur", "Effets de relief", "Ombres portées", "Pictogrammes", "Rotation du logo", "Déformation", "Couleurs non-officielles"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <X className="w-4 h-4" /><span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LogoInstitutional;
