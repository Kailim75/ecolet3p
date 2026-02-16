import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Download, ArrowLeft, Scale, Briefcase, ShieldCheck, MessageCircle, Globe, Car, Route, CheckCircle, Clock, CircleDollarSign, Lightbulb, Target, GraduationCap, FileCheck, BookOpen, Layers, Star, ClipboardList, HeartHandshake, MapPin, Users, Building, MonitorSmartphone, Bike, TrendingUp } from "lucide-react";

/* ─── Data (same as GuideFormation) ─── */

const modulesCommuns = [
  { title: "Réglementation T3P", coef: 3, icon: Scale, desc: "Les règles du transport de personnes, vos droits et obligations professionnelles." },
  { title: "Gestion & entreprise", coef: 2, icon: Briefcase, desc: "Comptabilité simplifiée, statuts juridiques et gestion au quotidien." },
  { title: "Sécurité routière", coef: 3, icon: ShieldCheck, desc: "Prévention des risques, conduite préventive et premiers réflexes." },
  { title: "Français & communication", coef: 2, icon: MessageCircle, desc: "Accueil client, communication claire et relation de confiance." },
  { title: "Anglais professionnel", coef: 1, icon: Globe, desc: "Vocabulaire essentiel pour accueillir une clientèle internationale." },
];

const modulesSpecifiques = [
  {
    title: "Spécifique TAXI", coef: 3, icon: Car,
    competences: ["Maîtrise de la tarification horodatée", "Connaissance de la zone géographique", "Prise en charge en station et maraude", "Réglementation propre au taxi"],
    lien: "Vous serez prêt à exercer en tant que taxi, en indépendant ou salarié."
  },
  {
    title: "Spécifique VTC / VMDTR", coef: 3, icon: Route,
    competences: ["Service premium et relation client haut de gamme", "Réservation préalable et gestion des plateformes", "Navigation GPS et optimisation d'itinéraire", "Réglementation propre au VTC et au VMDTR"],
    lien: "Vous serez préparé à offrir un service de qualité sur réservation."
  },
];

const conditionsAcces = [
  { icon: Car, label: "Permis B en cours de validité" },
  { icon: HeartHandshake, label: "Aptitude médicale (visite médicale préfectorale)" },
  { icon: FileCheck, label: "Casier judiciaire compatible (bulletin n°2)" },
  { icon: ShieldCheck, label: "Attestation de premiers secours (PSC1 recommandé)" },
];

const etapesCarte = [
  { step: 1, title: "Réussite de l'examen", desc: "Obtention de l'attestation de réussite délivrée par la CMA." },
  { step: 2, title: "Constitution du dossier", desc: "Rassemblement des pièces justificatives nécessaires." },
  { step: 3, title: "Dépôt en préfecture", desc: "Transmission de votre dossier complet à la préfecture compétente." },
  { step: 4, title: "Réception de la carte", desc: "Vous recevez votre carte professionnelle et pouvez exercer." },
];

const opportunites = [
  { icon: Building, label: "Indépendant", desc: "Créez votre propre activité." },
  { icon: Users, label: "Salarié", desc: "Rejoignez une société de transport." },
  { icon: MonitorSmartphone, label: "Plateformes", desc: "Uber, Bolt, etc." },
  { icon: Car, label: "Taxi traditionnel", desc: "Station ou maraude." },
  { icon: Bike, label: "VMDTR", desc: "Moto-taxi en agglomération." },
];

/* ─── PDF Page ─── */

const GuideFormationPDF = () => {
  const handlePrint = () => window.print();

  return (
    <>
      <Helmet><meta name="robots" content="noindex, nofollow" /></Helmet>
      {/* Nav bar - hidden when printing */}
      <div className="print:hidden bg-cream p-4 border-b border-forest/10 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link to="/guide-formation" className="inline-flex items-center gap-2 text-forest hover:text-gold transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Retour au guide
          </Link>
          <Button onClick={handlePrint} className="btn-primary">
            <Download className="w-4 h-4 mr-2" />
            Télécharger en PDF
          </Button>
        </div>
      </div>

      {/* PDF Content */}
      <div className="bg-white min-h-screen p-8 print:p-10 text-[#1B4D3E]">
        <div className="max-w-4xl mx-auto">

          {/* ── Header ── */}
          <header className="text-center mb-10 pb-6 border-b-2 border-[#1B4D3E]">
            <h1 className="text-3xl font-black mb-1">GUIDE DE FORMATION</h1>
            <p className="text-sm text-[#6B6B6B]">TAXI · VTC · VMDTR — ECOLE T3P</p>
            <p className="text-xs text-[#6B6B6B] mt-1">3 rue Corneille, 92120 Montrouge · 01 88 75 05 55 · montrouge@ecolet3p.fr</p>
          </header>

          {/* ── 1. Introduction ── */}
          <section className="mb-10">
            <div className="bg-[#F5EBD7] rounded-xl p-6 text-center">
              <BookOpen className="h-8 w-8 mx-auto mb-3 text-[#1B4D3E]" />
              <h2 className="text-xl font-bold mb-2">Bienvenue dans votre formation</h2>
              <p className="text-sm text-[#6B6B6B] max-w-lg mx-auto">
                Ce guide vous accompagne pas à pas, de l'inscription jusqu'à l'obtention de votre carte professionnelle. La formation est accessible, structurée et encadrée.
              </p>
            </div>
          </section>

          {/* ── 2. Objectif ── */}
          <section className="mb-10">
            <SectionTitle icon={Target} title="Objectif de la formation" />
            <p className="text-sm text-[#6B6B6B] mb-4">
              La formation initiale T3P vous prépare à exercer le métier de chauffeur <strong className="text-[#1B4D3E]">Taxi</strong>, <strong className="text-[#1B4D3E]">VTC</strong> ou <strong className="text-[#1B4D3E]">VMDTR</strong>.
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: GraduationCap, text: "Réussir l'examen T3P" },
                { icon: FileCheck, text: "Obtenir la carte professionnelle" },
                { icon: Briefcase, text: "Exercer légalement" },
              ].map((item, i) => (
                <div key={i} className="text-center p-4 rounded-lg border border-[#1B4D3E]/10">
                  <item.icon className="h-6 w-6 mx-auto mb-2 text-[#D4A853]" />
                  <p className="text-xs font-semibold">{item.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── 3. Organisation ── */}
          <section className="mb-10">
            <SectionTitle icon={Layers} title="Organisation de la formation" />
            <div className="grid grid-cols-2 gap-6">
              {[
                { step: "Étape 1", title: "Admissibilité — Théorie", desc: "7 épreuves écrites (QCM + QRC) couvrant les modules communs et spécifiques." },
                { step: "Étape 2", title: "Admission — Pratique", desc: "Mise en situation réelle de conduite et de relation client." },
              ].map((b, i) => (
                <div key={i} className="border border-[#1B4D3E]/10 rounded-lg p-4">
                  <span className="text-[10px] font-bold uppercase text-[#D4A853]">{b.step}</span>
                  <h3 className="font-bold text-sm mt-1 mb-1">{b.title}</h3>
                  <p className="text-xs text-[#6B6B6B]">{b.desc}</p>
                </div>
              ))}
            </div>
            <InfoBox text="Notre centre vous accompagne sur les deux volets : théorie en présentiel à Montrouge, examens blancs réguliers." />
          </section>

          {/* ── 4. Tronc commun ── */}
          <section className="mb-10 print:break-before-page">
            <SectionTitle icon={BookOpen} title="Les 5 modules du tronc commun" />
            <div className="space-y-3">
              {modulesCommuns.map((m, i) => (
                <div key={i} className="flex items-center gap-4 p-3 border border-[#1B4D3E]/10 rounded-lg">
                  <m.icon className="h-5 w-5 text-[#D4A853] flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm">{m.title}</h3>
                      <span className="text-[10px] bg-[#1B4D3E]/10 px-2 py-0.5 rounded-full font-semibold">Coef. {m.coef}</span>
                    </div>
                    <p className="text-xs text-[#6B6B6B] mt-0.5">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── 5. Modules spécifiques ── */}
          <section className="mb-10">
            <SectionTitle icon={Star} title="Les 2 modules spécifiques" />
            <div className="grid grid-cols-2 gap-6">
              {modulesSpecifiques.map((m, i) => (
                <div key={i} className="border border-[#1B4D3E]/10 rounded-lg overflow-hidden">
                  <div className={`h-1 ${i === 0 ? "bg-[#D4A853]" : "bg-[#1B4D3E]"}`} />
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <m.icon className={`h-5 w-5 ${i === 0 ? "text-[#D4A853]" : "text-[#1B4D3E]"}`} />
                      <h3 className="font-bold text-sm">{m.title}</h3>
                      <span className="text-[10px] bg-[#1B4D3E]/10 px-2 py-0.5 rounded-full font-semibold ml-auto">Coef. {m.coef}</span>
                    </div>
                    <ul className="space-y-1.5 mb-3">
                      {m.competences.map((c, j) => (
                        <li key={j} className="flex items-start gap-1.5 text-xs text-[#6B6B6B]">
                          <CheckCircle className="h-3.5 w-3.5 text-[#D4A853] flex-shrink-0 mt-0.5" />
                          {c}
                        </li>
                      ))}
                    </ul>
                    <p className="text-[10px] text-[#1B4D3E] bg-[#1B4D3E]/5 rounded p-2"><strong>→</strong> {m.lien}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── 6. Conditions d'accès ── */}
          <section className="mb-10">
            <SectionTitle icon={ClipboardList} title="Conditions d'accès" />
            <div className="grid grid-cols-2 gap-3 mb-4">
              {conditionsAcces.map((c, i) => (
                <div key={i} className="flex items-center gap-3 p-3 border border-[#1B4D3E]/10 rounded-lg">
                  <c.icon className="h-5 w-5 text-[#1B4D3E] flex-shrink-0" />
                  <span className="text-xs font-medium">{c.label}</span>
                </div>
              ))}
            </div>
            <InfoBox text="Pas sûr de votre éligibilité ? Notre équipe vous accompagne pour vérifier chaque condition." />
          </section>

          {/* ── 7. Épreuve pratique ── */}
          <section className="mb-10 print:break-before-page">
            <SectionTitle icon={Car} title="L'épreuve pratique" />
            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                { icon: Car, label: "Conduite en conditions réelles" },
                { icon: Users, label: "Relation client et accueil passager" },
                { icon: ShieldCheck, label: "Sécurité et vérifications du véhicule" },
                { icon: MapPin, label: "Choix d'itinéraire et gestion du trajet" },
              ].map((e, i) => (
                <div key={i} className="flex items-center gap-3 p-3 border border-[#1B4D3E]/10 rounded-lg">
                  <e.icon className="h-5 w-5 text-[#D4A853] flex-shrink-0" />
                  <span className="text-xs font-medium">{e.label}</span>
                </div>
              ))}
            </div>
            <div className="bg-[#1B4D3E]/5 border border-[#1B4D3E]/15 rounded-lg p-4 flex items-start gap-3">
              <ShieldCheck className="h-4 w-4 text-[#1B4D3E] flex-shrink-0 mt-0.5" />
              <p className="text-xs text-[#1B4D3E]">
                <strong>Vous êtes préparé exactement dans les conditions de l'examen.</strong> Des mises en situation régulières sont organisées tout au long de la formation.
              </p>
            </div>
          </section>

          {/* ── 8. Carte professionnelle ── */}
          <section className="mb-10">
            <SectionTitle icon={FileCheck} title="Obtenir votre carte professionnelle" />
            <div className="space-y-0">
              {etapesCarte.map((e, i) => (
                <div key={i} className="flex gap-4 pb-5 relative">
                  {i < etapesCarte.length - 1 && (
                    <div className="absolute left-[15px] top-9 bottom-0 w-0.5 bg-[#1B4D3E]/15" />
                  )}
                  <div className="w-8 h-8 rounded-full bg-[#1B4D3E] text-white flex items-center justify-center text-xs font-bold flex-shrink-0 z-10">
                    {e.step}
                  </div>
                  <div className="pt-0.5">
                    <h3 className="font-bold text-sm mb-0.5">{e.title}</h3>
                    <p className="text-xs text-[#6B6B6B]">{e.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <InfoBox text="Le centre vous guide dans vos démarches administratives, de la constitution du dossier jusqu'au dépôt en préfecture." />
          </section>

          {/* ── 9. Opportunités ── */}
          <section className="mb-10">
            <SectionTitle icon={Briefcase} title="Vos opportunités après la formation" />
            <div className="grid grid-cols-5 gap-3">
              {opportunites.map((o, i) => (
                <div key={i} className="text-center p-3 border border-[#1B4D3E]/10 rounded-lg">
                  <o.icon className="h-5 w-5 mx-auto mb-2 text-[#D4A853]" />
                  <p className="text-xs font-bold mb-1">{o.label}</p>
                  <p className="text-[10px] text-[#6B6B6B]">{o.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── 10. Rentabilité ── */}
          <section className="mb-10 print:break-before-page">
            <SectionTitle icon={TrendingUp} title="Exemple de rentabilité journalière" />
            <div className="border border-[#1B4D3E]/10 rounded-lg overflow-hidden">
              <div className="bg-[#1B4D3E] text-white px-5 py-3">
                <h3 className="font-bold text-sm flex items-center gap-2">
                  <CircleDollarSign className="h-4 w-4" />
                  Simulation indicative — Chauffeur VTC
                </h3>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-[#6B6B6B] font-bold mb-3">Hypothèses</p>
                    <ul className="space-y-2 text-xs text-[#6B6B6B]">
                      <li className="flex items-center gap-2"><Clock className="h-3.5 w-3.5 text-[#1B4D3E]" />10 courses par jour</li>
                      <li className="flex items-center gap-2"><CircleDollarSign className="h-3.5 w-3.5 text-[#1B4D3E]" />Panier moyen : 25 €</li>
                      <li className="flex items-center gap-2"><Car className="h-3.5 w-3.5 text-[#1B4D3E]" />Charges journalières : 80 €</li>
                    </ul>
                  </div>
                  <div className="flex flex-col justify-center items-center bg-[#1B4D3E]/5 rounded-xl p-5">
                    <p className="text-[10px] uppercase tracking-wider text-[#6B6B6B] font-bold mb-1">Revenu net estimé / jour</p>
                    <p className="text-2xl font-black text-[#1B4D3E]">~ 170 €</p>
                    <p className="text-[10px] text-[#6B6B6B] mt-1">soit ~ 3 700 € / mois</p>
                  </div>
                </div>
                <div className="mt-4 bg-[#D4A853]/10 border border-[#D4A853]/20 rounded-lg p-3 flex items-start gap-2">
                  <Lightbulb className="h-3.5 w-3.5 text-[#D4A853] flex-shrink-0 mt-0.5" />
                  <p className="text-[10px] text-[#6B6B6B]">
                    <strong className="text-[#1B4D3E]">Exemple non contractuel.</strong> Les revenus dépendent de la zone, des heures travaillées, des charges, etc.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ── 11. Conclusion ── */}
          <section className="mb-8">
            <div className="bg-[#1B4D3E] text-white rounded-xl p-8 text-center">
              <h2 className="text-xl font-bold mb-3">Vous n'êtes pas seul.</h2>
              <p className="text-sm text-white/80 max-w-lg mx-auto mb-4">
                Notre centre vous accompagne de l'inscription à l'obtention de votre carte professionnelle. Chaque étape est pensée pour vous mener à la réussite.
              </p>
              <div className="flex justify-center gap-6 text-xs text-white/60">
                <span>📞 01 88 75 05 55</span>
                <span>✉️ montrouge@ecolet3p.fr</span>
                <span>🌐 ecolet3p.fr</span>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="text-center pt-6 border-t border-[#1B4D3E]/20">
            <p className="text-xs text-[#6B6B6B]"><p className="text-xs text-[#6B6B6B]">© 2026 ECOLE T3P — Centre de Formation Taxi VTC VMDTR</p> — Centre de Formation Taxi VTC VMDTR</p>
            <p className="text-[10px] text-[#6B6B6B]/60 mt-1">3 rue Corneille, 92120 Montrouge</p>
          </footer>
        </div>
      </div>
    </>
  );
};

/* ─── Reusable sub-components ─── */

const SectionTitle = ({ icon: Icon, title }: { icon: React.ElementType; title: string }) => (
  <h2 className="text-lg font-bold text-[#1B4D3E] mb-4 flex items-center gap-2 uppercase tracking-wide">
    <Icon className="h-5 w-5 text-[#D4A853]" />
    {title}
  </h2>
);

const InfoBox = ({ text }: { text: string }) => (
  <div className="mt-4 border-2 border-[#D4A853]/30 bg-[#D4A853]/5 rounded-lg p-4 flex items-start gap-3">
    <Lightbulb className="h-4 w-4 text-[#D4A853] flex-shrink-0 mt-0.5" />
    <p className="text-xs text-[#1B4D3E]"><strong>À retenir :</strong> {text}</p>
  </div>
);

export default GuideFormationPDF;
