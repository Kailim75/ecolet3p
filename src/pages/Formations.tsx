import { useState, useRef, useEffect } from "react";
import DynamicSEOHead from "@/components/seo/DynamicSEOHead";
import Layout from "@/components/layout/Layout";
import { 
  Clock, ArrowRight, Phone, Star, Shield, CreditCard, Award,
  Moon, Calendar, Loader2, FileText, MapPin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, type Easing } from "framer-motion";
import PreRegistrationForm from "@/components/formations/PreRegistrationForm";
import CatalogueCard from "@/components/formations/CatalogueCard";
import PackCard from "@/components/formations/PackCard";

import AlmaLogo from "@/components/logo/AlmaLogo";
import { useIsMobile } from "@/hooks/use-mobile";
import salleFormation from "@/assets/center/salle-formation-equipee.jpg";
import {
  formationsInitiales,
  formationsContinues,
  formationsPasserelles,
  formationsMobilite,
  formationRecupPoints,
  formationsComplementaires,
  packs,
  trustBadges,
  type FormationOffer,
} from "@/data/offreCatalogueData";

const smoothEase: Easing = [0.22, 1, 0.36, 1];

const sections = [
  { id: "tarifs", label: "Tarifs" },
  { id: "initiales", label: "Formations Initiales" },
  { id: "continues", label: "Continues" },
  { id: "passerelles", label: "Passerelles" },
  { id: "mobilite", label: "Mobilité" },
  { id: "recup-points", label: "Récup. Points" },
  { id: "complementaires", label: "Complémentaires" },
  { id: "packs", label: "Nos Packs" },
  { id: "parrainage", label: "Parrainage" },
];

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
};

const Formations = () => {
  const [preRegOpen, setPreRegOpen] = useState(false);
  const [preRegTitle, setPreRegTitle] = useState("");
  const [preRegDuration, setPreRegDuration] = useState("");
  const [activeAnchor, setActiveAnchor] = useState("initiales");
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const isMobile = useIsMobile();
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroImageY = useTransform(heroScrollProgress, [0, 1], ["0%", "25%"]);
  const heroImageScale = useTransform(heroScrollProgress, [0, 1], [1, 1.1]);
  const heroContentY = useTransform(heroScrollProgress, [0, 1], [0, 60]);
  const heroOpacity = useTransform(heroScrollProgress, [0, 0.7], [1, 0.3]);

  const openPreReg = (formation: FormationOffer) => {
    setPreRegTitle(formation.title + (formation.subtitle ? ` — ${formation.subtitle}` : ""));
    setPreRegDuration(formation.duration);
    setPreRegOpen(true);
  };

  const openPreRegPack = (packTitle: string, format: string) => {
    setPreRegTitle(`${packTitle} — ${format}`);
    setPreRegDuration(format);
    setPreRegOpen(true);
  };

  // Footer observer for mobile sticky bar
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsFooterVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  // Active anchor observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveAnchor(entry.target.id);
        });
      },
      { rootMargin: "-100px 0px -60% 0px", threshold: 0 }
    );
    sections.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Group initiales
  const initialesSoiree = formationsInitiales.filter(f => f.format === "soiree");
  const initialesJournee = formationsInitiales.filter(f => f.format === "journee");

  // SEO
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://ecolet3p.fr/" },
      { "@type": "ListItem", position: 2, name: "Formations", item: "https://ecolet3p.fr/formations" }
    ]
  };

  return (
    <Layout>
      <DynamicSEOHead
        pageUrl="/formations"
        defaultTitle="Formations Taxi VTC VMDTR | ECOLE T3P"
        defaultDescription="Catalogue complet : formations initiales Taxi VTC VMDTR dès 990€, continues, passerelles, packs économiques et programme parrainage. Paiement 4× sans frais."
        canonicalUrl="https://www.ecolet3p.fr/formations"
      >
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </DynamicSEOHead>

      {/* ============ HERO ============ */}
      <section ref={heroRef} className="relative min-h-[420px] md:min-h-[560px] flex items-center overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: heroImageY, scale: heroImageScale }}>
          <img src={salleFormation} alt="Centre de formation ECOLE T3P" width={1200} height={560} className="w-full h-full object-cover" loading="eager" fetchPriority="high" />
        </motion.div>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(13,33,55,0.92) 0%, rgba(27,58,92,0.85) 100%)' }} />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

        <motion.div className="container-custom relative z-10 py-16 md:py-20" style={{ y: heroContentY, opacity: heroOpacity }}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
            <div className="lg:col-span-3">
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-sm font-semibold text-white/70 mb-3 tracking-wide uppercase">
                Centre de formation agréé Préfecture • Montrouge (92)
              </motion.p>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-2xl md:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4" style={{ lineHeight: 1.1 }}>
                Formations <span className="text-gold">TAXI · VTC · VMDTR</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-base md:text-lg text-white/80 mb-8 max-w-xl">
                Rejoignez les 2000+ chauffeurs formés. Packs économiques, programme parrainage et paiement en 4× sans frais.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg" className="font-bold text-base btn-cta-orange">
                  <Link to="/contact">Demander un devis gratuit <ArrowRight className="w-4 h-4 ml-2" /></Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="font-bold text-base border-white/30 text-white hover:bg-white/10">
                  <a href="tel:0188750555"><Phone className="w-4 h-4 mr-2" /> 01 88 75 05 55</a>
                </Button>
              </motion.div>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} className="lg:col-span-2 grid grid-cols-2 gap-3">
              {[
                { icon: <Award className="w-5 h-5 text-gold" />, value: "94%", label: "Taux de réussite" },
                { icon: <Star className="w-5 h-5 text-gold fill-gold" />, value: "5.0/5", label: "359 avis Google" },
                { icon: <Shield className="w-5 h-5 text-gold" />, value: "Agréé", label: "Préfecture 92" },
                { icon: <CreditCard className="w-5 h-5 text-gold" />, value: "4×", label: "Sans frais Alma" },
              ].map((badge, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10">
                  <div className="flex justify-center mb-2">{badge.icon}</div>
                  <p className="text-xl font-black text-white">{badge.value}</p>
                  <p className="text-xs text-white/60">{badge.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ============ STICKY NAV ============ */}
      <nav className="sticky top-16 z-40 bg-white border-b border-border shadow-sm">
        <div className="container-custom">
          <div className="flex gap-0.5 md:gap-1 overflow-x-auto scrollbar-hide py-0 -mx-2 px-2">
            {sections.map(s => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={(e) => { e.preventDefault(); document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
                className={`whitespace-nowrap px-2.5 md:px-4 py-3 text-[11px] md:text-sm font-semibold border-b-2 transition-colors min-h-[44px] flex items-center ${
                  activeAnchor === s.id ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-primary hover:border-primary/40'
                }`}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ============ TARIFS EN UN COUP D'ŒIL ============ */}
      <section id="tarifs" className="py-10 md:py-16 bg-white scroll-mt-14">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8 text-center">
            <h2 className="text-2xl md:text-3xl font-black text-foreground mb-2">💰 Tarifs en un coup d'œil</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Tous nos tarifs sont <strong>tout compris</strong> — frais d'examen inclus. Paiement en 4× sans frais avec Alma.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="rounded-2xl border border-border overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-forest text-cream">
                    <th className="px-4 md:px-6 py-3 text-sm font-bold">Formation</th>
                    <th className="px-4 md:px-6 py-3 text-sm font-bold">Format</th>
                    <th className="px-4 md:px-6 py-3 text-sm font-bold text-right">Tarif TTC</th>
                    <th className="px-4 md:px-6 py-3 text-sm font-bold text-right hidden md:table-cell">4× Alma</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    { name: "Taxi Initiale", format: "Journée · Soir · E-learning", price: "990€", alma: "247,50€", highlight: true },
                    { name: "VTC Initiale", format: "Journée · Soir · E-learning", price: "990€", alma: "247,50€", highlight: true },
                    { name: "VMDTR Initiale", format: "Journée · Soir · E-learning", price: "990€", alma: "247,50€", highlight: true },
                    { name: "Passerelle T3P", format: "14h · 2 jours", price: "665€", alma: "166,25€", highlight: false },
                    { name: "Renouvellement", format: "14h · tous les 5 ans", price: "350€", alma: "87,50€", highlight: false },
                    { name: "Récup. de points", format: "14h · 2 jours", price: "250€", alma: "62,50€", highlight: false },
                  ].map((row, i) => (
                    <tr key={i} className={row.highlight ? "bg-gold/5" : "bg-card"}>
                      <td className="px-4 md:px-6 py-3.5">
                        <span className="font-bold text-sm text-foreground">{row.name}</span>
                        {row.highlight && <span className="ml-2 text-[10px] font-bold text-gold bg-gold/15 px-1.5 py-0.5 rounded-full align-middle">TOUT COMPRIS</span>}
                      </td>
                      <td className="px-4 md:px-6 py-3.5 text-sm text-muted-foreground">{row.format}</td>
                      <td className="px-4 md:px-6 py-3.5 text-right">
                        <span className="text-lg font-black text-foreground">{row.price}</span>
                      </td>
                      <td className="px-4 md:px-6 py-3.5 text-right hidden md:table-cell">
                        <span className="text-sm font-semibold" style={{ color: "#FA5022" }}>{row.alma}/mois</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-4">
              Frais d'examen CMA (241€) inclus dans les formations initiales • Frais d'examen (165€) inclus dans la passerelle • Pas de CPF — tarifs accessibles à tous
            </p>
          </motion.div>
        </div>
      </section>

      {/* ============ 1. FORMATIONS INITIALES ============ */}
      <section id="initiales" className="py-10 md:py-20 bg-muted/30 scroll-mt-14">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-foreground mb-2">🚀 Formations Initiales — Devenez Chauffeur</h2>
            <p className="text-muted-foreground max-w-2xl">Obtenez votre carte professionnelle Taxi, VTC ou VMDTR. Disponible en journée, soirée ou e-learning.</p>
          </motion.div>

          {/* Soirée */}
          <div className="flex items-center gap-2 mb-4">
            <Moon className="w-5 h-5 text-indigo-500" />
            <h3 className="text-lg font-bold text-foreground">Format Soirée — 990€</h3>
            <span className="text-xs text-muted-foreground">Compatible avec votre activité</span>
          </div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {initialesSoiree.map(f => <CatalogueCard key={f.id} formation={f} onRegister={openPreReg} />)}
          </motion.div>

          {/* Journée */}
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-amber-500" />
            <h3 className="text-lg font-bold text-foreground">Format Journée — 1 190€</h3>
            <span className="text-xs text-muted-foreground">Formation intensive</span>
          </div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {initialesJournee.map(f => <CatalogueCard key={f.id} formation={f} onRegister={openPreReg} />)}
          </motion.div>
        </div>
      </section>

      {/* ============ TESTIMONIAL BANDEAU ============ */}
      <section className="py-12 md:py-14 bg-muted/50">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 max-w-4xl mx-auto">
            <div className="shrink-0 w-20 h-20 rounded-full bg-primary flex items-center justify-center text-2xl font-black text-primary-foreground">MK</div>
            <div>
              <div className="flex gap-0.5 mb-2">{[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 text-gold fill-gold" />)}</div>
              <blockquote className="text-base md:text-lg text-foreground italic leading-relaxed mb-3">
                "Grâce à ECOLE T3P, j'ai obtenu ma carte VTC du premier coup. La formation en soirée m'a permis de continuer à travailler."
              </blockquote>
              <p className="text-sm text-muted-foreground font-semibold">— Mohamed K., Chauffeur VTC depuis 2023</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 2. FORMATIONS CONTINUES ============ */}
      <section id="continues" className="py-10 md:py-20 bg-white scroll-mt-14">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-3">
            <h2 className="text-2xl md:text-3xl font-black text-foreground mb-2">🔄 Formations Continues</h2>
            <p className="text-muted-foreground max-w-2xl">Renouvelez votre carte professionnelle — 14h obligatoires tous les 5 ans.</p>
          </motion.div>
          <p className="text-xs text-destructive font-bold mb-6 bg-destructive/5 inline-flex px-3 py-1.5 rounded-full border border-destructive/20">
            ⚠️ La formation continue est obligatoire pour le renouvellement de votre carte professionnelle.
          </p>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl">
            {formationsContinues.map(f => <CatalogueCard key={f.id} formation={f} onRegister={openPreReg} compact />)}
          </motion.div>
        </div>
      </section>

      {/* ============ 3. PASSERELLES ============ */}
      <section id="passerelles" className="py-10 md:py-20 bg-muted/30 scroll-mt-14">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-6">
            <h2 className="text-2xl md:text-3xl font-black text-foreground mb-2">🔀 Passerelles</h2>
            <p className="text-muted-foreground max-w-2xl">Vous êtes déjà chauffeur ? Ajoutez une activité à votre carte professionnelle.</p>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl">
            {formationsPasserelles.map(f => <CatalogueCard key={f.id} formation={f} onRegister={openPreReg} compact />)}
          </motion.div>
        </div>
      </section>

      {/* ============ 4. RENOUVELLEMENT & MOBILITÉ ============ */}
      <section id="mobilite" className="py-10 md:py-20 bg-white scroll-mt-14">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-3">
            <h2 className="text-2xl md:text-3xl font-black text-foreground mb-2">📍 Renouvellement & Mobilité Géographique</h2>
            <p className="text-muted-foreground max-w-2xl">Étendez votre zone d'activité taxi à un nouveau département.</p>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl">
            {formationsMobilite.map(f => <CatalogueCard key={f.id} formation={f} onRegister={openPreReg} compact />)}
          </motion.div>
        </div>
      </section>

      {/* ============ 5. RÉCUPÉRATION DE POINTS ============ */}
      <section id="recup-points" className="py-10 md:py-20 bg-muted/30 scroll-mt-14">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-6">
            <h2 className="text-2xl md:text-3xl font-black text-foreground mb-2">🛡️ Stage de Récupération de Points</h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-card border border-border/50 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 max-w-4xl"
          >
            <div className="shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Shield className="w-7 h-7 md:w-8 md:h-8 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base md:text-lg font-bold text-foreground mb-1">{formationRecupPoints.accroche}</h3>
              <p className="text-xs md:text-sm text-muted-foreground mb-2">{formationRecupPoints.duration} — Attestation immédiate</p>
              <div className="flex items-baseline gap-3">
                <span className="text-xl md:text-2xl font-black text-primary">{formationRecupPoints.price}€</span>
                <span className="text-xs font-semibold" style={{ color: "#FA5022" }}>ou 4× {formationRecupPoints.alma4x} <AlmaLogo className="h-3 inline ml-1" /></span>
              </div>
            </div>
            <Button size="lg" className="font-bold shrink-0 btn-cta-orange w-full md:w-auto" onClick={() => openPreReg(formationRecupPoints)}>
              Réserver mon stage <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ============ 6. FORMATIONS COMPLÉMENTAIRES ============ */}
      <section id="complementaires" className="py-10 md:py-20 bg-white scroll-mt-14">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-6">
            <h2 className="text-2xl md:text-3xl font-black text-foreground mb-2">🚀 Boostez votre carrière</h2>
            <p className="text-muted-foreground max-w-2xl">Formations complémentaires pour vous démarquer et développer votre activité.</p>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl">
            {formationsComplementaires.map(f => <CatalogueCard key={f.id} formation={f} onRegister={openPreReg} />)}
          </motion.div>
        </div>
      </section>

      {/* ============ 7. PACKS ============ */}
      <section id="packs" className="py-10 md:py-20 bg-muted/30 scroll-mt-14">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-3 text-center">
            <span className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-4 py-1.5 rounded-full text-sm font-bold mb-4">
              🔥 Économisez jusqu'à 190€
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-foreground mb-2">Nos Packs — Plus vous combinez, plus vous économisez</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Combinez formation initiale + spécialisation et bénéficiez de tarifs préférentiels.</p>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {packs.map(p => <PackCard key={p.id} pack={p} onRegister={openPreRegPack} />)}
          </motion.div>
        </div>
      </section>


      {/* ============ CTA FINAL ============ */}

      {/* ============ CTA FINAL ============ */}
      <section className="py-10 md:py-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(13,33,55,0.95), rgba(27,58,92,0.9))' }}>
        <div className="container-custom relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-3">Pas sûr de quelle formation choisir ?</h2>
            <p className="text-white/70 mb-8">Nos conseillers vous orientent gratuitement en 5 minutes.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" variant="outline" className="font-bold border-white/30 text-white hover:bg-white/10">
                <a href="tel:0188750555"><Phone className="w-4 h-4 mr-2" /> 01 88 75 05 55</a>
              </Button>
              <Button asChild size="lg" className="font-bold btn-cta-orange">
                <Link to="/contact">Être rappelé <ArrowRight className="w-4 h-4 ml-2" /></Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ MOBILE STICKY BAR ============ */}
      {isMobile && !isFooterVisible && (
        <div className="fixed bottom-0 left-0 right-0 lg:hidden flex items-center bg-white border-t border-border" style={{ zIndex: 1000, height: 56, boxShadow: '0 -4px 12px rgba(0,0,0,0.08)' }}>
          <a href="tel:0188750555" className="flex-1 flex items-center justify-center gap-2 text-primary font-bold text-sm border-r border-border" style={{ height: '100%' }}>
            <Phone className="w-4 h-4" /> Appeler
          </a>
          <Link to="/contact" className="flex-1 flex items-center justify-center gap-2 font-bold text-sm text-white" style={{ height: '100%', background: 'hsl(var(--cta))' }}>
            <FileText className="w-4 h-4" /> Devis gratuit
          </Link>
        </div>
      )}

      {/* ============ PRE-REGISTRATION MODAL ============ */}
      <PreRegistrationForm
        isOpen={preRegOpen}
        onClose={() => setPreRegOpen(false)}
        formationTitle={preRegTitle}
        formationDuration={preRegDuration}
      />
    </Layout>
  );
};

export default Formations;
