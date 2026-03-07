import React from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, AlertTriangle, Info, ArrowRight, FileText, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  admissibiliteSessions,
  admissionSessions,
  admissionDepartements,
  isDeadlinePassed,
  getNextSession,
} from "@/data/cmaCalendarData";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { generateAdmissibilitePdf, generateAdmissionPdf } from "@/lib/generateCmaPdf";
import CMAConditionsSection from "@/components/formations/CMAConditionsSection";

const CalendrierExamens = () => {
  const nextSession = getNextSession(admissibiliteSessions);

  return (
    <Layout>
      <Helmet>
        <title>Calendrier examens CMA 2026 — Taxi VTC VMDTR | ECOLE T3P</title>
        <meta
          name="description"
          content="Calendrier prévisionnel 2026 des examens CMA Île-de-France : dates d'admissibilité (théorique) et d'admission (pratique) pour les cartes professionnelles Taxi, VTC et VMDTR."
        />
        <link rel="canonical" href="https://ecolet3p.fr/calendrier-examens" />
      </Helmet>

      {/* Hero */}
      <section className="pt-12 pb-8 md:pt-16 md:pb-12" style={{ background: "linear-gradient(135deg, #FFFAF5 0%, #F5F7FF 100%)" }}>
        <div className="container-custom">
          <AnimatedSection>
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="outline" className="text-xs font-medium" style={{ borderColor: "rgba(27,77,62,0.2)", color: "#1B4D3E" }}>
                <CalendarDays className="w-3 h-3 mr-1" /> Mise à jour déc. 2025
              </Badge>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: "#1A1A1A" }}>
              Calendrier des examens <span style={{ color: "#1A5276" }}>CMA 2026</span>
            </h1>
            <p className="text-base md:text-lg max-w-2xl mb-6" style={{ color: "#555" }}>
              Dates prévisionnelles des épreuves d'<strong>admissibilité</strong> (théorique) et d'<strong>admission</strong> (pratique) pour les cartes professionnelles Taxi, VTC et VMDTR en Île-de-France.
            </p>

            {nextSession && (
              <div
                className="inline-flex items-center gap-3 px-5 py-3 rounded-xl border"
                style={{ backgroundColor: "rgba(243,156,18,0.06)", borderColor: "rgba(243,156,18,0.2)" }}
              >
                <Clock className="w-5 h-5 flex-shrink-0" style={{ color: "#D35400" }} />
                <div>
                  <p className="text-sm font-semibold" style={{ color: "#1A1A1A" }}>
                    Prochaine clôture : session de {nextSession.session}
                  </p>
                  <p className="text-xs" style={{ color: "#666" }}>
                    Date limite d'inscription : {nextSession.inscriptionDeadline}
                  </p>
                </div>
              </div>
            )}
          </AnimatedSection>
        </div>
      </section>

      {/* Tables */}
      <section className="py-12 md:py-16">
        <div className="container-custom">
          <Tabs defaultValue="admissibilite" className="w-full">
            <TabsList className="grid w-full max-w-lg grid-cols-2 mb-8">
              <TabsTrigger value="admissibilite" className="text-sm font-semibold">
                📝 Admissibilité (théorique)
              </TabsTrigger>
              <TabsTrigger value="admission" className="text-sm font-semibold">
                🚗 Admission (pratique)
              </TabsTrigger>
            </TabsList>

            {/* Admissibilité table */}
            <TabsContent value="admissibilite">
              <AnimatedSection>
                <div className="rounded-xl border overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr style={{ background: "hsl(var(--foreground))" }}>
                          <th className="px-4 py-3 text-left font-bold text-xs uppercase tracking-wider" style={{ color: "hsl(var(--primary-foreground))" }}>Session</th>
                          <th className="px-4 py-3 text-left font-bold text-xs uppercase tracking-wider" style={{ color: "hsl(var(--primary-foreground))" }}>Date limite d'inscription</th>
                          <th className="px-4 py-3 text-left font-bold text-xs uppercase tracking-wider hidden md:table-cell" style={{ color: "hsl(var(--primary-foreground))" }}>Convocations</th>
                          <th className="px-4 py-3 text-center font-bold text-xs uppercase tracking-wider hidden lg:table-cell" style={{ color: "hsl(var(--primary-foreground))" }}>Places</th>
                          <th className="px-4 py-3 text-center font-bold text-xs uppercase tracking-wider" style={{ color: "hsl(var(--primary-foreground))" }}>Statut</th>
                        </tr>
                      </thead>
                      <tbody>
                        {admissibiliteSessions.map((s, i) => {
                          const passed = isDeadlinePassed(s.inscriptionDeadline);
                          const isNext = nextSession?.session === s.session;
                          return (
                            <tr
                              key={s.session}
                              className="border-b transition-colors hover:bg-muted/30"
                              style={{
                                borderColor: "hsl(var(--border))",
                                ...(isNext ? { backgroundColor: "rgba(243,156,18,0.04)" } : {}),
                                ...(passed ? { opacity: 0.5 } : {}),
                              }}
                            >
                              <td className="px-4 py-3 font-semibold" style={{ color: "#1A1A1A" }}>
                                {isNext && <span className="mr-1">👉</span>}
                                {s.session}
                              </td>
                              <td className="px-4 py-3" style={{ color: passed ? "#999" : "#D35400", fontWeight: isNext ? 600 : 400 }}>
                                {s.inscriptionDeadline}
                              </td>
                              <td className="px-4 py-3 hidden md:table-cell" style={{ color: "#555" }}>{s.convocations}</td>
                              <td className="px-4 py-3 text-center hidden lg:table-cell" style={{ color: "#555" }}>{s.places}</td>
                              <td className="px-4 py-3 text-center">
                                {passed ? (
                                  <Badge variant="secondary" className="text-[10px]">Clôturée</Badge>
                                ) : isNext ? (
                                  <Badge className="text-[10px] bg-orange text-white">Prochaine</Badge>
                                ) : (
                                  <Badge variant="outline" className="text-[10px]">À venir</Badge>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
                <p className="text-xs mt-4 flex items-start gap-2" style={{ color: "#888" }}>
                  <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                  Les sessions se déroulent sur 2 à 5 jours selon le flux d'inscriptions (3 000 à 5 000 places). Le lieu et la date sont précisés sur les convocations.
                </p>
              </AnimatedSection>
            </TabsContent>

            {/* Admission table — per department */}
            <TabsContent value="admission">
              <AnimatedSection>
                <p className="text-sm mb-4" style={{ color: "#555" }}>
                  Épreuves pratiques pour les départements <strong>75 (Paris)</strong>, <strong>92 (Hauts-de-Seine)</strong>, <strong>93 (Seine-Saint-Denis)</strong> et <strong>94 (Val-de-Marne)</strong>.
                </p>
                <div className="rounded-xl border overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr style={{ background: "hsl(var(--foreground))" }}>
                          <th className="px-4 py-3 text-left font-bold text-xs uppercase tracking-wider" style={{ color: "hsl(var(--primary-foreground))" }}>Session</th>
                          {admissionDepartements.map((dept) => (
                            <th key={dept} className="px-3 py-3 text-center font-bold text-xs uppercase tracking-wider" style={{ color: "hsl(var(--primary-foreground))" }}>
                              Dept {dept}
                            </th>
                          ))}
                          <th className="px-4 py-3 text-left font-bold text-xs uppercase tracking-wider hidden md:table-cell" style={{ color: "hsl(var(--primary-foreground))" }}>Clôture inscription</th>
                          <th className="px-3 py-3 text-center font-bold text-xs uppercase tracking-wider" style={{ color: "hsl(var(--primary-foreground))" }}>Statut</th>
                        </tr>
                      </thead>
                      <tbody>
                        {admissionSessions.map((s) => {
                          const passed = isDeadlinePassed(s.inscriptionDeadline);
                          return (
                            <tr
                              key={s.session}
                              className="border-b transition-colors hover:bg-muted/30"
                              style={{
                                borderColor: "hsl(var(--border))",
                                ...(passed ? { opacity: 0.5 } : {}),
                              }}
                            >
                              <td className="px-4 py-3 font-semibold" style={{ color: "#1A1A1A" }}>{s.session}</td>
                              {admissionDepartements.map((dept) => (
                                <td key={dept} className="px-3 py-3 text-center text-xs" style={{ color: "#1A5276", fontWeight: 500 }}>
                                  {s.dates}
                                </td>
                              ))}
                              <td className="px-4 py-3 hidden md:table-cell" style={{ color: passed ? "#999" : "#D35400" }}>{s.inscriptionDeadline}</td>
                              <td className="px-3 py-3 text-center">
                                {passed ? (
                                  <Badge variant="secondary" className="text-[10px]">Clôturée</Badge>
                                ) : (
                                  <Badge variant="outline" className="text-[10px]">À venir</Badge>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
                <p className="text-xs mt-4 flex items-start gap-2" style={{ color: "#888" }}>
                  <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                  Les épreuves pratiques se déroulent sur 2 à 5 jours selon le flux d'inscriptions. Le lieu et la date exacts sont précisés sur les convocations transmises aux candidats.
                </p>
              </AnimatedSection>
            </TabsContent>
          </Tabs>

          {/* CTA */}
          <AnimatedSection className="mt-12">
            <div
              className="rounded-2xl p-8 md:p-10 text-center"
              style={{ background: "linear-gradient(135deg, rgba(27,77,62,0.04) 0%, rgba(26,82,118,0.04) 100%)", border: "1px solid rgba(27,77,62,0.1)" }}
            >
              <h2 className="font-serif text-xl md:text-2xl font-bold mb-3" style={{ color: "#1A1A1A" }}>
                Préparez votre examen avec ECOLE T3P
              </h2>
              <p className="text-sm md:text-base mb-6 max-w-lg mx-auto" style={{ color: "#555" }}>
                94% de réussite dès le 1er passage. Nos formations vous préparent efficacement aux épreuves théoriques et pratiques de la CMA.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild className="btn-cta-orange px-8 py-3 rounded-xl">
                  <Link to="/contact">
                    S'inscrire à une formation <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="px-8 py-3 rounded-xl">
                  <Link to="/formations">Voir nos formations</Link>
                </Button>
              </div>
            </div>
          </AnimatedSection>

          {/* Conditions d'accès CMA — tableau + article */}
          <CMAConditionsSection />

          {/* PDF Downloads */}
          <AnimatedSection className="mt-8">
            <div className="flex flex-col sm:flex-row gap-3 justify-center flex-wrap">
              <Button
                variant="outline"
                className="gap-2 rounded-xl px-6 py-3"
                onClick={generateAdmissibilitePdf}
              >
                <Download className="w-4 h-4" />
                Calendrier Admissibilité (PDF)
              </Button>
              <Button
                variant="outline"
                className="gap-2 rounded-xl px-6 py-3"
                onClick={generateAdmissionPdf}
              >
                <Download className="w-4 h-4" />
                Calendrier Admission (PDF)
              </Button>
            </div>
          </AnimatedSection>

          {/* Source */}
          <p className="text-[11px] text-center mt-8 flex items-center justify-center gap-1" style={{ color: "#AAA" }}>
            <FileText className="w-3 h-3" />
            Source : Chambre de Métiers et de l'Artisanat Île-de-France — Calendrier prévisionnel 2026 (sous réserve de modifications)
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default CalendrierExamens;
