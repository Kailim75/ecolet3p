import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import PrefetchLink from "@/components/ui/PrefetchLink";
import AlmaLogo from "@/components/logo/AlmaLogo";
import { useQuoteModal } from "@/components/quote/QuoteRequestModal";
import {
  ArrowRight, CreditCard, Clock, Moon, Car, Key,
  CheckCircle2, Star, Award, Shield, Users,
  BookOpen, FileText, Monitor, Headphones, UserCheck,
} from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

// ── Alma Payment Simulation Modal ─────────────────────
const AlmaSimulationModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  if (!open) return null;
  const installments = [
    { label: "Aujourd'hui", amount: "247,50€" },
    { label: "J+30", amount: "247,50€" },
    { label: "J+60", amount: "247,50€" },
    { label: "J+90", amount: "247,50€" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-card rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl"
      >
        <div className="flex items-center gap-3 mb-6">
          <AlmaLogo className="h-8" />
          <div>
            <p className="font-bold text-foreground">Simulation de paiement</p>
            <p className="text-xs text-muted-foreground">Formation T3P — 990€</p>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2 mb-6">
          {installments.map((inst, i) => (
            <div key={i} className="bg-primary/5 rounded-xl p-3 text-center border border-primary/10">
              <p className="text-[10px] text-muted-foreground font-medium mb-1">{inst.label}</p>
              <p className="text-sm font-black text-primary">{inst.amount}</p>
            </div>
          ))}
        </div>
        <div className="text-center space-y-3">
          <p className="text-xs text-muted-foreground">✅ Aucun frais supplémentaire · Décision immédiate · Sans engagement</p>
          <Button onClick={onClose} className="w-full btn-cta-orange">Fermer la simulation</Button>
        </div>
      </motion.div>
    </div>
  );
};

// ── Page Component ────────────────────────────────────
const FormuleSoiree = () => {
  const { openQuoteModal } = useQuoteModal();
  const [showAlmaSimulation, setShowAlmaSimulation] = useState(false);

  const badges = [
    { icon: Clock, label: "2 semaines de formation" },
    { icon: Moon, label: "Lun–Ven 18h–21h30" },
    { icon: Car, label: "2h de conduite incluses" },
    { icon: Key, label: "Véhicule fourni à l'examen" },
  ];

  const includes = [
    { icon: Monitor, label: "Accès plateforme T3P Campus" },
    { icon: BookOpen, label: "Quiz interactifs" },
    { icon: Car, label: "2h de conduite" },
    { icon: Key, label: "Véhicule le jour de l'examen" },
    { icon: FileText, label: "Support pédagogique" },
    { icon: Headphones, label: "Suivi personnalisé" },
  ];

  const faqs = [
    {
      q: "Puis-je payer en plusieurs fois ?",
      a: "Oui, Alma vous permet de régler en 4× sans frais (4× 247,50€), avec une décision immédiate en ligne. Aucun justificatif requis.",
    },
    {
      q: "Puis-je changer d'option en cours de formation ?",
      a: "Oui, sous réserve de disponibilité, vous pouvez basculer de l'option soirée à journée (ou inversement) en contactant notre secrétariat.",
    },
    {
      q: "Que faire si je rate l'examen ?",
      a: "ECOLE T3P vous accompagne pour repasser l'examen. Vous bénéficiez de séances de révision gratuites et d'un nouvel accès à la plateforme.",
    },
  ];

  return (
    <Layout>
      <DynamicSEOHead
        pageUrl="/formations/formule-soiree"
        defaultTitle="Formation Soirée Taxi VTC 990€ | ECOLE T3P"
        defaultDescription="Formez-vous le soir au métier de Taxi, VTC ou VMDTR. Sessions 18h-21h30 à Montrouge. 990€ tout compris, 4× sans frais."
      />

      {/* BLOC 1 — Hero */}
      <section className="bg-forest text-primary-foreground pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-forest via-forest to-forest/90" />
        <div className="container-custom relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
            <p className="text-gold text-sm font-bold uppercase tracking-wider mb-3">Option Soirée</p>
            <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight">
              Formation Taxi / VTC / VMDTR
            </h1>
            <div className="text-5xl md:text-7xl font-black text-white mb-4">990€</div>

            {/* Alma highlight */}
            <button
              onClick={() => setShowAlmaSimulation(true)}
              className="inline-flex items-center gap-3 bg-cream/95 rounded-full px-5 py-2.5 mx-auto mb-8 hover:bg-white transition-colors shadow-lg cursor-pointer"
            >
              <CreditCard className="w-4 h-4 text-[#FA5022]" />
              <AlmaLogo className="h-4" />
              <span className="text-sm font-bold text-forest">Payez en 4× sans frais — 4× 247,50€</span>
            </button>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button asChild size="lg" className="btn-cta-orange text-base px-8">
                <PrefetchLink to="/formations#inscription">
                  Réserver ma place <ArrowRight className="w-5 h-5 ml-2" />
                </PrefetchLink>
              </Button>
              <Button variant="outline" size="lg" onClick={() => openQuoteModal("t3p")}
                className="border-white/40 text-white hover:bg-white/10 text-base px-8">
                Demander un devis
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* BLOC 2 — Bandeau Alma */}
      <section className="bg-card border-b border-primary/10">
        <div className="container-custom py-8 md:py-10">
          <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
            {/* Left */}
            <div className="flex items-center gap-4 shrink-0">
              <AlmaLogo className="h-10 md:h-12" />
              <div className="text-left">
                <p className="text-sm font-bold text-foreground">Le paiement en plusieurs fois</p>
                <p className="text-xs text-muted-foreground">Simple et sans frais</p>
              </div>
            </div>

            {/* Center — Installment badges */}
            <div className="flex items-center gap-2 flex-1 justify-center flex-wrap">
              {["Aujourd'hui", "J+30", "J+60", "J+90"].map((label, i) => (
                <React.Fragment key={label}>
                  {i > 0 && <ArrowRight className="w-3 h-3 text-muted-foreground hidden sm:block" />}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                    className="bg-primary/5 border border-primary/10 rounded-xl px-4 py-2 text-center"
                  >
                    <p className="text-[10px] text-muted-foreground font-medium">{label}</p>
                    <p className="text-sm font-black text-primary">247,50€</p>
                  </motion.div>
                </React.Fragment>
              ))}
            </div>

            {/* Right */}
            <Button onClick={() => setShowAlmaSimulation(true)} className="bg-forest hover:bg-forest/90 text-white shrink-0">
              Simuler mon paiement <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <p className="text-center text-xs text-muted-foreground mt-4">
            ✅ Aucun frais supplémentaire — Décision immédiate — Sans engagement
          </p>
        </div>
      </section>

      {/* BLOC 3 — Badges résumé */}
      <section className="bg-background py-10">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {badges.map((b, i) => (
              <motion.div
                key={b.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="flex items-center gap-3 bg-card rounded-xl p-4 border border-border/50"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <b.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-semibold text-foreground">{b.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOC 4 — Programme */}
      <section className="bg-card py-12 md:py-16">
        <div className="container-custom max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-black text-forest text-center mb-8">Programme semaine par semaine</h2>
          <Accordion type="single" collapsible defaultValue="s1" className="space-y-3">
            <AccordionItem value="s1" className="border rounded-xl px-5 bg-background">
              <AccordionTrigger className="font-bold text-forest">
                <span className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-black text-primary">1</span>
                  Semaine 1 — Fondamentaux
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm space-y-2 pb-4">
                <p>• Réglementation du transport public particulier de personnes</p>
                <p>• Géographie et orientation professionnelle</p>
                <p>• Modules théoriques : sécurité, gestion, relation client</p>
                <p>• Accès plateforme e-learning pour révisions entre les séances</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="s2" className="border rounded-xl px-5 bg-background">
              <AccordionTrigger className="font-bold text-forest">
                <span className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-black text-primary">2</span>
                  Semaine 2 — Préparation & Examen
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm space-y-2 pb-4">
                <p>• Révisions intensives et examens blancs</p>
                <p>• 2h de conduite avec véhicule école</p>
                <p>• Préparation mentale à l'examen CMA</p>
                <p>• Passage de l'examen — véhicule fourni</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* BLOC 5 — Ce qui est inclus */}
      <section className="bg-background py-12 md:py-16">
        <div className="container-custom max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-black text-forest text-center mb-8">Ce qui est inclus</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {includes.map((item) => (
              <div key={item.label} className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border/50">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm font-medium text-foreground">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOC 6 — Financement (Alma only — CPF interdit) */}
      <section className="bg-card py-12 md:py-16">
        <div className="container-custom max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-black text-forest text-center mb-8">Financement</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-background rounded-2xl p-6 border border-border/50 text-center">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <UserCheck className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-bold text-forest mb-2">Autofinancement</h3>
              <p className="text-sm text-muted-foreground mb-3">Réglez la totalité en une fois par carte bancaire ou virement.</p>
              <p className="text-2xl font-black text-primary">990€</p>
            </div>
            <div className="bg-[#FFF8F5] rounded-2xl p-6 border border-[#FA5022]/15 text-center">
              <div className="mx-auto mb-3">
                <AlmaLogo className="h-8 mx-auto" />
              </div>
              <h3 className="font-bold text-forest mb-2">Paiement en 4× sans frais</h3>
              <p className="text-sm text-muted-foreground mb-3">4 mensualités de 247,50€ — décision immédiate en ligne.</p>
              <Button onClick={() => setShowAlmaSimulation(true)} className="btn-cta-orange">
                Payer avec Alma <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* BLOC 7 — Preuve sociale */}
      <section className="bg-background py-12 md:py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center max-w-3xl mx-auto">
            {[
              { icon: Award, value: "94%", label: "de réussite" },
              { icon: Users, value: "+2000", label: "conducteurs formés" },
              { icon: Shield, value: "Agréé", label: "Préfecture 92" },
            ].map((stat) => (
              <div key={stat.label} className="bg-card rounded-2xl p-6 border border-border/50">
                <stat.icon className="w-8 h-8 text-gold mx-auto mb-2" />
                <p className="text-3xl font-black text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
          {/* Reviews */}
          <div className="mt-8 max-w-2xl mx-auto space-y-3">
            {[
              { name: "Karim B.", text: "Formation au top, réussie du premier coup grâce à l'équipe ECOLE T3P !", stars: 5 },
              { name: "Sarah M.", text: "Le format soirée est parfait pour ceux qui travaillent en journée. Merci !", stars: 5 },
            ].map((review) => (
              <div key={review.name} className="bg-card rounded-xl p-4 border border-border/50 flex gap-3">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-gold">{review.name[0]}</span>
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    {Array.from({ length: review.stars }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-gold fill-gold" />
                    ))}
                    <span className="text-xs font-semibold text-foreground ml-2">{review.name}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{review.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOC 8 — FAQ */}
      <section className="bg-card py-12 md:py-16">
        <div className="container-custom max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-black text-forest text-center mb-8">Questions fréquentes</h2>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border rounded-xl px-5 bg-background">
                <AccordionTrigger className="font-semibold text-forest text-sm">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground pb-4">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* BLOC 9 — Sticky mobile bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-forest border-t border-gold/20 py-2.5 px-4 md:hidden">
        <div className="flex items-center justify-between gap-3">
          <span className="text-lg font-black text-white">990€</span>
          <div className="flex items-center gap-1.5">
            <AlmaLogo className="h-3" />
            <span className="text-xs text-cream/80">ou 4× 247,50€</span>
          </div>
          <Button asChild size="sm" className="btn-cta-orange text-xs px-4">
            <PrefetchLink to="/formations#inscription">
              Réserver <ArrowRight className="w-3 h-3 ml-1" />
            </PrefetchLink>
          </Button>
        </div>
      </div>

      <AlmaSimulationModal open={showAlmaSimulation} onClose={() => setShowAlmaSimulation(false)} />
    </Layout>
  );
};

export default FormuleSoiree;
