import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft, Check, X } from "lucide-react";
import { EcoleT3PInstitutional, EcoleT3PMonogram } from "@/components/logo/EcoleT3PInstitutional";

const LogoInstitutional = () => {
  return (
    <div className="min-h-screen bg-[#F8F6F3] p-8">
      <Helmet><meta name="robots" content="noindex, nofollow" /></Helmet>
      <div className="max-w-5xl mx-auto">
        {/* Back link */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-[#1B4D3E] hover:text-[#4A4A4A] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à l'accueil
        </Link>

        <h1 className="text-3xl font-serif font-bold text-[#1B4D3E] mb-2">Logo Institutionnel ÉCOLE T3P</h1>
        <p className="text-[#4A4A4A] mb-4">Version FINALE — Statutaire et sobre</p>
        
        {/* Validation checklist */}
        <div className="bg-white rounded-lg p-4 mb-12 border border-[#1B4D3E]/10">
          <h3 className="font-semibold text-[#1B4D3E] mb-3 text-sm uppercase tracking-wide">Critères respectés</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            {[
              "Sans sceau",
              "Sans badge",
              "Sans dégradés",
              "Sans effets",
              "Monochrome OK",
              "Typographie serif",
              "Baseline institutionnelle",
              "Pas de 'Campus'"
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-[#1B4D3E]">
                <Check className="w-4 h-4" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 1. Logo principal fond clair */}
        <section className="mb-12">
          <h2 className="text-lg font-serif font-semibold text-[#1B4D3E] mb-4 pb-2 border-b border-[#1B4D3E]/20">
            1. Logo principal — Fond clair
          </h2>
          <div className="bg-white rounded-lg p-8 border border-[#1B4D3E]/10">
            <EcoleT3PInstitutional className="h-14" theme="light" showBaseline={true} />
          </div>
          <p className="text-xs text-[#4A4A4A] mt-2">Usage : Documents officiels, site web, supports de communication</p>
        </section>

        {/* 2. Logo principal fond sombre */}
        <section className="mb-12">
          <h2 className="text-lg font-serif font-semibold text-[#1B4D3E] mb-4 pb-2 border-b border-[#1B4D3E]/20">
            2. Logo principal — Fond sombre
          </h2>
          <div className="bg-[#1B4D3E] rounded-lg p-8">
            <EcoleT3PInstitutional className="h-14" theme="dark" showBaseline={true} />
          </div>
          <p className="text-xs text-[#4A4A4A] mt-2">Usage : Signalétique, supports foncés, événementiel</p>
        </section>

        {/* 3. Logo monochrome */}
        <section className="mb-12">
          <h2 className="text-lg font-serif font-semibold text-[#1B4D3E] mb-4 pb-2 border-b border-[#1B4D3E]/20">
            3. Logo monochrome
          </h2>
          <div className="bg-[#F8F6F3] rounded-lg p-8 border-2 border-[#1B4D3E]/20">
            <EcoleT3PInstitutional className="h-14" theme="mono" showBaseline={true} />
          </div>
          <p className="text-xs text-[#4A4A4A] mt-2">Usage : Impression N&B, fax, tampons, documents administratifs</p>
        </section>

        {/* 4. Monogramme T3P seul */}
        <section className="mb-12">
          <h2 className="text-lg font-serif font-semibold text-[#1B4D3E] mb-4 pb-2 border-b border-[#1B4D3E]/20">
            4. Monogramme T3P (séparé)
          </h2>
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 border border-[#1B4D3E]/10 flex flex-col items-center">
              <EcoleT3PMonogram className="w-20 h-20" theme="light" />
              <p className="text-xs text-[#4A4A4A] mt-3">Fond clair</p>
            </div>
            <div className="bg-[#1B4D3E] rounded-lg p-6 flex flex-col items-center">
              <EcoleT3PMonogram className="w-20 h-20" theme="dark" />
              <p className="text-xs text-white/70 mt-3">Fond sombre</p>
            </div>
            <div className="bg-[#F8F6F3] rounded-lg p-6 border-2 border-[#1B4D3E]/20 flex flex-col items-center">
              <EcoleT3PMonogram className="w-20 h-20" theme="mono" />
              <p className="text-xs text-[#4A4A4A] mt-3">Monochrome</p>
            </div>
          </div>
          <p className="text-xs text-[#4A4A4A] mt-2">Usage : Favicon, icônes, réseaux sociaux, petits formats</p>
        </section>

        {/* Test de lisibilité */}
        <section className="mb-12">
          <h2 className="text-lg font-serif font-semibold text-[#1B4D3E] mb-4 pb-2 border-b border-[#1B4D3E]/20">
            Tests de lisibilité
          </h2>
          <div className="bg-white rounded-lg p-6 border border-[#1B4D3E]/10">
            <div className="flex items-end gap-8 flex-wrap">
              <div className="text-center">
                <EcoleT3PInstitutional className="h-6 mb-2" theme="light" showBaseline={false} />
                <p className="text-xs text-[#4A4A4A]">24px</p>
              </div>
              <div className="text-center">
                <EcoleT3PInstitutional className="h-8 mb-2" theme="light" showBaseline={false} />
                <p className="text-xs text-[#4A4A4A]">32px</p>
              </div>
              <div className="text-center">
                <EcoleT3PInstitutional className="h-10 mb-2" theme="light" showBaseline={false} />
                <p className="text-xs text-[#4A4A4A]">40px</p>
              </div>
              <div className="text-center">
                <EcoleT3PInstitutional className="h-14 mb-2" theme="light" showBaseline={true} />
                <p className="text-xs text-[#4A4A4A]">56px (baseline)</p>
              </div>
            </div>
          </div>
        </section>

        {/* Simulation document officiel */}
        <section className="mb-12">
          <h2 className="text-lg font-serif font-semibold text-[#1B4D3E] mb-4 pb-2 border-b border-[#1B4D3E]/20">
            Simulation — Attestation officielle
          </h2>
          <div className="bg-white rounded-lg p-8 border border-[#1B4D3E]/10 max-w-md mx-auto">
            <div className="mb-6">
              <EcoleT3PInstitutional className="h-10" theme="light" showBaseline={true} />
            </div>
            <div className="border-t border-b border-[#1B4D3E]/20 py-4 mb-4">
              <h3 className="text-center font-serif font-semibold text-[#1B4D3E] text-lg">ATTESTATION DE FORMATION</h3>
            </div>
            <p className="text-sm text-[#4A4A4A] mb-4 leading-relaxed">
              Je soussigné, Directeur de l'ÉCOLE T3P, certifie que M./Mme [NOM PRÉNOM] 
              a suivi avec succès la formation [INTITULÉ] du [DATE] au [DATE].
            </p>
            <div className="flex justify-between items-end mt-8">
              <div className="text-xs text-[#4A4A4A]">
                <p>Fait à Montrouge</p>
                <p>Le [DATE]</p>
              </div>
              <div className="text-center">
                <EcoleT3PMonogram className="w-12 h-12 mx-auto opacity-60" theme="light" />
                <p className="text-xs text-[#4A4A4A] mt-1">Le Directeur</p>
              </div>
            </div>
          </div>
        </section>

        {/* Interdictions */}
        <section>
          <h2 className="text-lg font-serif font-semibold text-[#1B4D3E] mb-4 pb-2 border-b border-[#1B4D3E]/20">
            Usages interdits
          </h2>
          <div className="bg-red-50 rounded-lg p-4 border border-red-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-red-700">
              {[
                "Sceau / badge",
                "Dégradés de couleur",
                "Effets de relief",
                "Ombres portées",
                "Pictogrammes",
                "Mention 'Campus'",
                "Rotation du logo",
                "Déformation"
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <X className="w-4 h-4" />
                  <span>{item}</span>
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