import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

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

        {/* Logo principal */}
        <Section title="⭐ Logo Principal">
          <div className="grid gap-8">
            <Card label="Couleur (fond clair)">
              <img src="/images/ecole-t3p-logo-color.svg" alt="ÉCOLE T3P" className="h-14 w-auto" />
            </Card>
            <Card label="Blanc (fond sombre)" bg="bg-primary">
              <p className="text-sm font-semibold text-white/60 mb-4">Blanc (fond sombre)</p>
              <img src="/images/ecole-t3p-logo-white.svg" alt="ÉCOLE T3P" className="h-14 w-auto" />
            </Card>
          </div>
          <div className="bg-card rounded-2xl p-8 shadow-lg mt-8">
            <p className="text-sm font-semibold text-muted-foreground mb-6">Tailles comparées</p>
            <div className="flex items-end gap-8 flex-wrap">
              {[8, 10, 12, 14, 16, 20].map((h) => (
                <div key={h} className="text-center">
                  <img src="/images/ecole-t3p-logo-color.svg" alt="ÉCOLE T3P" className={`h-${h} w-auto mb-2`} />
                  <p className="text-xs text-muted-foreground">h-{h}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Monogramme */}
        <Section title="🔵 Monogramme T3P">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div className="rounded-2xl p-6 shadow-lg flex flex-col items-center bg-card">
              <p className="text-xs font-semibold mb-3 text-muted-foreground">Couleur</p>
              <img src="/logo/ecole-t3p-monogram.svg" alt="T3P" className="w-20 h-20" />
            </div>
            <div className="rounded-2xl p-6 shadow-lg flex flex-col items-center bg-primary">
              <p className="text-xs font-semibold mb-3 text-white/60">Blanc</p>
              <img src="/logo/ecole-t3p-monogram-white.svg" alt="T3P" className="w-20 h-20" />
            </div>
          </div>
        </Section>

        {/* Simulation contexte */}
        <Section title="🖥️ Simulation en contexte">
          <div className="bg-card rounded-2xl p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <img src="/images/ecole-t3p-logo-color.svg" alt="ÉCOLE T3P" className="h-10 w-auto" />
              <div className="flex gap-6 text-sm font-semibold text-muted-foreground">
                <span>Accueil</span><span>Formations</span><span>Contact</span>
              </div>
            </div>
          </div>
          <div className="bg-primary rounded-2xl p-4 shadow-lg mt-4">
            <div className="flex items-center justify-between">
              <img src="/images/ecole-t3p-logo-white.svg" alt="ÉCOLE T3P" className="h-10 w-auto" />
              <div className="flex gap-6 text-sm font-semibold text-white/60">
                <span>Accueil</span><span>Formations</span><span>Contact</span>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
};

export default LogoPreview;
