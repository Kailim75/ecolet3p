import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { T3PCampusLogo, T3PCampusIcon } from "@/components/logo/T3PCampusLogo";
import { EcoleT3PLogo, EcoleT3PIcon } from "@/components/logo/EcoleT3PLogo";
import EcoleT3PLogoV5C from "@/components/logo/EcoleT3PLogoV5C";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-16">
    <h2 className="text-2xl font-bold text-primary mb-6 border-b border-primary/20 pb-2">{title}</h2>
    {children}
  </section>
);

const Card = ({ label, bg = "bg-card", children }: { label: string; bg?: string; children: React.ReactNode }) => (
  <div className={`${bg} rounded-2xl p-8 shadow-lg`}>
    <p className="text-sm font-semibold text-muted-foreground mb-4">{label}</p>
    {children}
  </div>
);

const LogoPreview = () => {
  return (
    <div className="min-h-screen bg-secondary p-8">
      <Helmet><meta name="robots" content="noindex, nofollow" /></Helmet>
      <div className="max-w-6xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Retour à l'accueil
        </Link>

        <h1 className="text-4xl font-black text-primary mb-2">Prévisualisation des Logos</h1>
        <p className="text-muted-foreground mb-12">Tous les variants de logo côte à côte</p>

        {/* ── LOGO V5C (Actuel) ── */}
        <Section title="⭐ Logo V5C — Actuel (SVG React)">
          <div className="grid gap-8">
            <Card label="V5C Couleur (fond clair)">
              <EcoleT3PLogoV5C className="h-14" variant="color" />
            </Card>
            <Card label="V5C Blanc (fond sombre)" bg="bg-primary">
              <p className="text-sm font-semibold text-white/60 mb-4">V5C Blanc (fond sombre)</p>
              <EcoleT3PLogoV5C className="h-14" variant="white" />
            </Card>
          </div>
          {/* Tailles */}
          <div className="bg-card rounded-2xl p-8 shadow-lg mt-8">
            <p className="text-sm font-semibold text-muted-foreground mb-6">Tailles comparées</p>
            <div className="flex items-end gap-8 flex-wrap">
              {[8, 10, 12, 14, 16, 20].map((h) => (
                <div key={h} className="text-center">
                  <EcoleT3PLogoV5C className={`h-${h} w-auto mb-2`} variant="color" />
                  <p className="text-xs text-muted-foreground">h-{h}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── LOGO V5C PNG (référence) ── */}
        <Section title="🖼️ Logo V5C — PNG (référence image)">
          <div className="grid md:grid-cols-2 gap-8">
            <Card label="V5C PNG Couleur">
              <img src="/images/ecole-t3p-logo-v5c.png" alt="V5C couleur" className="h-16 w-auto object-contain" />
            </Card>
            <Card label="V5C PNG Blanc" bg="bg-primary">
              <p className="text-sm font-semibold text-white/60 mb-4">V5C PNG Blanc</p>
              <img src="/images/ecole-t3p-logo-v5c-white.png" alt="V5C blanc" className="h-16 w-auto object-contain" />
            </Card>
          </div>
        </Section>

        {/* ── ECOLE T3P Legacy ── */}
        <Section title="📜 Logo ECOLE T3P — Legacy (SVG React)">
          <div className="grid gap-8">
            <Card label="Full — Color">
              <EcoleT3PLogo className="h-16" variant="full" theme="color" />
            </Card>
            <Card label="Full — White" bg="bg-primary">
              <p className="text-sm font-semibold text-white/60 mb-4">Full — White</p>
              <EcoleT3PLogo className="h-16" variant="full" theme="white" />
            </Card>
            <Card label="Full — Mono">
              <EcoleT3PLogo className="h-16" variant="full" theme="mono" />
            </Card>
            <Card label="Horizontal">
              <EcoleT3PLogo className="h-12" variant="horizontal" theme="color" />
            </Card>
          </div>
        </Section>

        {/* ── Icônes Legacy ── */}
        <Section title="🔵 Icônes ECOLE T3P — Legacy">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {(["color", "white", "mono", "gold", "stamp"] as const).map((theme) => (
              <div key={theme} className={`rounded-2xl p-6 shadow-lg flex flex-col items-center ${theme === "white" ? "bg-primary" : "bg-card"}`}>
                <p className={`text-xs font-semibold mb-3 ${theme === "white" ? "text-white/60" : "text-muted-foreground"}`}>{theme}</p>
                <EcoleT3PIcon className="w-20 h-20" theme={theme} />
              </div>
            ))}
          </div>
        </Section>

        {/* ── T3P Campus ── */}
        <Section title="🎓 Logo T3P Campus">
          <div className="grid gap-8">
            <Card label="Campus — Color">
              <T3PCampusLogo className="h-16" theme="color" />
            </Card>
            <Card label="Campus — White" bg="bg-primary">
              <p className="text-sm font-semibold text-white/60 mb-4">Campus — White</p>
              <T3PCampusLogo className="h-16" theme="white" />
            </Card>
            <Card label="Campus — Mono">
              <T3PCampusLogo className="h-16" theme="mono" />
            </Card>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8">
            {(["color", "white", "mono"] as const).map((theme) => (
              <div key={theme} className={`rounded-2xl p-6 shadow-lg flex flex-col items-center ${theme === "white" ? "bg-primary" : "bg-card"}`}>
                <p className={`text-xs font-semibold mb-3 ${theme === "white" ? "text-white/60" : "text-muted-foreground"}`}>Icon — {theme}</p>
                <T3PCampusIcon className="w-20 h-20" theme={theme} />
              </div>
            ))}
          </div>
        </Section>

        {/* ── Fichiers SVG statiques ── */}
        <Section title="📁 Fichiers SVG statiques (src/assets)">
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { src: "/logo/ecole-t3p-institutional-white.svg", label: "Institutional White", dark: true },
              { src: "/logo/ecole-t3p-monogram.svg", label: "Monogram", dark: false },
            ].map(({ src, label, dark }) => (
              <div key={src} className={`rounded-2xl p-6 shadow-lg flex flex-col items-center ${dark ? "bg-primary" : "bg-card"}`}>
                <p className={`text-xs font-semibold mb-3 ${dark ? "text-white/60" : "text-muted-foreground"}`}>{label}</p>
                <img src={src} alt={label} className="h-12 w-auto" />
              </div>
            ))}
          </div>
        </Section>

        {/* ── Simulation contexte ── */}
        <Section title="🖥️ Simulation en contexte">
          <div className="bg-card rounded-2xl p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <EcoleT3PLogoV5C className="h-10" variant="color" />
              <div className="flex gap-6 text-sm font-semibold text-muted-foreground">
                <span>Accueil</span>
                <span>Formations</span>
                <span>Contact</span>
              </div>
            </div>
          </div>
          <div className="bg-primary rounded-2xl p-4 shadow-lg mt-4">
            <div className="flex items-center justify-between">
              <EcoleT3PLogoV5C className="h-10" variant="white" />
              <div className="flex gap-6 text-sm font-semibold text-white/60">
                <span>Accueil</span>
                <span>Formations</span>
                <span>Contact</span>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
};

export default LogoPreview;
