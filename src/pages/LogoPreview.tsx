import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import EcoleT3PLogoV5C from "@/components/logo/EcoleT3PLogoV5C";
import { EcoleT3PInstitutional, EcoleT3PMonogram } from "@/components/logo/EcoleT3PInstitutional";

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
        <p className="text-muted-foreground mb-12">Logo officiel ECOLE T3P — toutes variantes</p>

        {/* ── LOGO V5C (Actuel) ── */}
        <Section title="⭐ Logo V5C — Officiel">
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

        {/* ── Logo Institutionnel ── */}
        <Section title="📜 Logo Institutionnel (SVG React)">
          <div className="grid gap-8">
            <Card label="Institutionnel — Clair">
              <EcoleT3PInstitutional className="h-14" theme="light" showBaseline />
            </Card>
            <Card label="Institutionnel — Sombre" bg="bg-primary">
              <p className="text-sm font-semibold text-white/60 mb-4">Institutionnel — Sombre</p>
              <EcoleT3PInstitutional className="h-14" theme="dark" showBaseline />
            </Card>
            <Card label="Institutionnel — Mono">
              <EcoleT3PInstitutional className="h-14" theme="mono" showBaseline />
            </Card>
          </div>
        </Section>

        {/* ── Monogramme ── */}
        <Section title="🔵 Monogramme T3P">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {(["light", "dark", "mono"] as const).map((theme) => (
              <div key={theme} className={`rounded-2xl p-6 shadow-lg flex flex-col items-center ${theme === "dark" ? "bg-primary" : "bg-card"}`}>
                <p className={`text-xs font-semibold mb-3 ${theme === "dark" ? "text-white/60" : "text-muted-foreground"}`}>{theme}</p>
                <EcoleT3PMonogram className="w-20 h-20" theme={theme} />
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
