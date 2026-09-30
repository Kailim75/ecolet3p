import DynamicSEOHead from "@/components/seo/DynamicSEOHead";
import SeoH1Text from "@/components/seo/SeoH1Text";
import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, BookOpen, Building2, CheckCircle2, ListChecks, MonitorSmartphone, Timer } from "lucide-react";
import tarifs from "@/data/tarifs.json";
import t3pCampus from "@/data/t3pCampus.json";

const fmt = (n: number) => n.toLocaleString("fr-FR");

/**
 * La page qui présente T3P Campus, la préparation en ligne de l'école, et
 * renvoie vers www.t3pcampus.com.
 *
 * Deux publics : l'élève du centre, qui s'y entraîne entre deux cours, et le
 * candidat éloigné de Montrouge, qui y suit la formation en ligne. Les
 * chiffres et prix de la plateforme viennent de src/data/t3pCampus.json, ceux
 * du présentiel de src/data/tarifs.json : rien n'est écrit en dur.
 */
const PreparationExamenEnLigne = () => {
  const contenus = [
    { icon: ListChecks, titre: `${fmt(t3pCampus.questions)} questions corrigées`, texte: "Des QCM au format de l'examen, annales comprises. Chaque réponse est corrigée avec sa fiche de cours." },
    { icon: BookOpen, titre: `${t3pCampus.fiches} fiches de cours`, texte: "L'essentiel à retenir, des cas pratiques, les pièges de l'examen, épreuve par épreuve." },
    { icon: Timer, titre: `${t3pCampus.examensBlancs} examens blancs chronométrés`, texte: "Chaque épreuve dans les conditions du jour J : même durée, même nombre de questions, même barème." },
  ];

  const etapes = [
    "Vous vous testez gratuitement sur dix questions, sans créer de compte.",
    "Vous créez votre compte et choisissez votre parcours : Taxi, VTC, VMDTR ou passerelle.",
    "Le centre vous appelle pour signer votre contrat de formation. Rien n'est prélevé à l'inscription.",
    "Votre formation s'ouvre après le délai de renonciation prévu par le code du travail, ou tout de suite si vous le demandez.",
    "Vous passez l'examen : les frais d'inscription sont déjà compris dans votre prix.",
  ];

  const faqs = [
    {
      question: "Faut-il être élève du centre de Montrouge ?",
      reponse: "Non. Les élèves du centre y ont accès pendant leur formation, et toute personne qui prépare l'examen peut s'y inscrire, où qu'elle habite. La préparation Taxi porte sur la réglementation et le territoire parisiens.",
    },
    {
      question: "Les questions ressemblent-elles à celles de l'examen ?",
      reponse: "Oui : des questions à choix multiples, comme à l'examen, avec les annales des épreuves du tronc commun et des épreuves spécifiques, complétées par des questions rédigées et relues par les formateurs de Montrouge.",
    },
    {
      question: "Peut-on payer en plusieurs fois ?",
      reponse: `Oui. La formation en ligne se règle en une fois ou en 4 × ${t3pCampus.mensualiteFormationEnLigne} € sans frais, comme les formations en salle, avec notre partenaire Alma.`,
    },
    {
      question: "Quelle différence avec la formation en salle ?",
      reponse: `En salle, à Montrouge, vous suivez ${tarifs.dureeInitialeHeures} heures de cours avec un formateur, en journée ou en soirée, pour ${fmt(tarifs.initiale)} € tout compris. En ligne, vous avancez à votre rythme sur la même banque de questions et les mêmes fiches, avec un suivi à distance, pour ${fmt(t3pCampus.prixFormationEnLigne)} € frais d'examen compris.`,
    },
  ];

  return (
    <Layout>
      <DynamicSEOHead
        pageUrl="/preparation-examen-en-ligne"
        defaultTitle="Préparation en ligne à l’examen Taxi, VTC | ECOLE T3P"
        defaultDescription="Entraînez-vous à l’examen T3P sur T3P Campus : questions corrigées, fiches de cours, examens blancs. Essai gratuit de 10 questions, sans compte."
      />

      {/* En-tête : sous l'en-tête fixe du site */}
      <section className="pt-[120px] pb-10 md:pt-[136px] md:pb-14 lg:pt-[144px] bg-secondary">
        <div className="container-custom">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-wider text-accent mb-4">T3P Campus, le site d'entraînement de l'école</p>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-5 text-primary">
              <SeoH1Text path="/preparation-examen-en-ligne" />
            </h1>
            <p className="text-base md:text-lg text-muted-foreground mb-8">
              Les élèves du centre s'entraînent sur T3P Campus entre deux cours. Un candidat qui ne peut pas venir à Montrouge
              y suit une formation complète, à distance, avec contrat de formation et frais d'examen compris, corrigée par les
              mêmes formateurs.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href={t3pCampus.urlEssai} className="btn-cta-orange inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold">
                Essai gratuit : {t3pCampus.questionsEssai} questions, sans compte
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <a href={t3pCampus.url} className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary px-6 py-3 font-semibold text-primary hover:bg-card transition-colors">
                Ouvrir T3P Campus
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Ce qu'on y trouve */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <h2 className="section-title text-center mb-10">Ce que vous trouvez sur T3P Campus</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {contenus.map((c) => (
              <div key={c.titre} className="p-6 bg-card rounded-2xl border border-border">
                <div className="w-11 h-11 rounded-lg bg-secondary flex items-center justify-center mb-4">
                  <c.icon className="w-5 h-5 text-primary" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{c.titre}</h3>
                <p className="text-sm text-muted-foreground">{c.texte}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-8">
            Le contenu est relu et validé par les formateurs du centre. Il suit la même progression que les cours de Montrouge.
          </p>
        </div>
      </section>

      {/* Deux façons de se préparer */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <h2 className="section-title text-center mb-3">Deux façons de préparer l'examen</h2>
          <p className="section-subtitle mx-auto text-center mb-10">Le même centre, les mêmes formateurs, deux formats.</p>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="p-6 md:p-8 bg-card rounded-2xl border border-border">
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="w-6 h-6 text-primary" aria-hidden="true" />
                <h3 className="text-xl font-bold text-foreground">En salle, à Montrouge</h3>
              </div>
              <p className="text-3xl font-bold text-primary mb-1">{fmt(tarifs.initiale)} €</p>
              <p className="text-sm text-muted-foreground mb-5">
                Formation initiale, {tarifs.dureeInitialeHeures} heures, frais d'examen compris. Passerelle : {fmt(tarifs.passerelle)} €.
              </p>
              <ul className="space-y-2 text-sm text-foreground mb-6">
                {["Un formateur devant vous, en journée ou en soirée", "Le véhicule d'examen fourni", "L'accès à T3P Campus pendant la formation"].map((l) => (
                  <li key={l} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" aria-hidden="true" />
                    {l}
                  </li>
                ))}
              </ul>
              <Link to="/formations" className="inline-flex items-center gap-2 font-semibold text-primary hover:underline">
                Voir les formations en salle <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="p-6 md:p-8 bg-card rounded-2xl border-2 border-primary">
              <div className="flex items-center gap-3 mb-4">
                <MonitorSmartphone className="w-6 h-6 text-primary" aria-hidden="true" />
                <h3 className="text-xl font-bold text-foreground">En ligne, sur T3P Campus</h3>
              </div>
              <p className="text-3xl font-bold text-primary mb-1">{fmt(t3pCampus.prixFormationEnLigne)} €</p>
              <p className="text-sm text-muted-foreground mb-5">
                Formation initiale en ligne, frais d'examen compris, ou 4 × {t3pCampus.mensualiteFormationEnLigne} € sans frais.
                Passerelle : {fmt(t3pCampus.prixPasserelleEnLigne)} €.
              </p>
              <ul className="space-y-2 text-sm text-foreground mb-6">
                {[
                  "Contrat de formation et suivi pédagogique à distance",
                  "Nous gérons votre inscription à l'examen",
                  `Ou l'accès seul, pour réviser sans contrat : ${t3pCampus.prixAcces} € pour ${t3pCampus.dureeAccesMois} mois`,
                ].map((l) => (
                  <li key={l} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" aria-hidden="true" />
                    {l}
                  </li>
                ))}
              </ul>
              <a href={t3pCampus.url} className="inline-flex items-center gap-2 font-semibold text-primary hover:underline">
                S'inscrire sur T3P Campus <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Comment ça se passe */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <h2 className="section-title text-center mb-10">Comment se passe la formation en ligne</h2>
          <ol className="max-w-3xl mx-auto space-y-4">
            {etapes.map((e, i) => (
              <li key={e} className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border">
                <span className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0" aria-hidden="true">
                  {i + 1}
                </span>
                <span className="text-sm md:text-base text-foreground pt-1.5">{e}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Questions fréquentes */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <h2 className="section-title text-center mb-10">Questions fréquentes</h2>
          <Accordion type="single" collapsible className="max-w-3xl mx-auto space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem key={f.question} value={`faq-${i}`} className="bg-card rounded-xl border border-border px-5">
                <AccordionTrigger className="text-left text-sm font-medium">{f.question}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">{f.reponse}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Appel final */}
      <section className="py-14 bg-[hsl(var(--cta)/0.1)]">
        <div className="container-custom text-center">
          <h2 className="section-title mb-4">Testez-vous avant de vous décider</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            {t3pCampus.questionsEssai} vraies questions d'examen, corrigées tout de suite. Aucun compte, aucune carte bancaire.
          </p>
          <a href={t3pCampus.urlEssai} className="btn-cta-orange inline-flex items-center justify-center gap-2 rounded-xl px-8 py-3.5 font-semibold">
            Commencer l'essai gratuit
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default PreparationExamenEnLigne;
