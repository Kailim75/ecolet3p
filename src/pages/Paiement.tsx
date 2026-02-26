import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Shield, Zap, FileX, CreditCard, CheckCircle, Lock,
  ArrowRight, Clock, Smartphone, Home, BadgeCheck
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import AlmaLogo from "@/components/logo/AlmaLogo";


const smoothEase = [0.22, 1, 0.36, 1] as const;

const steps = [
  {
    number: "1",
    icon: CreditCard,
    title: "Choisissez votre échéancier",
    description:
      "Sur la fiche tarif de votre formation, sélectionnez le nombre de mensualités : 1×, 2×, 3× ou 4× sans frais. Le montant de chaque échéance s'affiche instantanément.",
  },
  {
    number: "2",
    icon: Smartphone,
    title: "Remplissez le formulaire sécurisé",
    description:
      "Entrez vos coordonnées (nom, e-mail, téléphone). Alma vérifie votre éligibilité en quelques secondes, sans justificatif ni paperasse.",
  },
  {
    number: "3",
    icon: BadgeCheck,
    title: "Validez et démarrez votre formation",
    description:
      "Une fois le paiement accepté, vous recevez immédiatement votre confirmation d'inscription. Votre place est réservée et votre formation peut commencer.",
  },
];

const advantages = [
  {
    icon: Shield,
    title: "0 € de frais",
    description: "Aucun surcoût : le prix affiché est le prix payé. Pas de frais de dossier, pas d'intérêts.",
  },
  {
    icon: Zap,
    title: "Réponse immédiate",
    description: "L'éligibilité est vérifiée en temps réel. Vous savez en quelques secondes si votre demande est acceptée.",
  },
  {
    icon: FileX,
    title: "Sans justificatif",
    description: "Aucun document à fournir : ni fiche de paie, ni relevé bancaire, ni avis d'imposition.",
  },
  {
    icon: Lock,
    title: "100 % sécurisé",
    description: "Le paiement est opéré sur les serveurs certifiés PCI-DSS d'Alma. Vos données bancaires ne transitent jamais par notre site.",
  },
  {
    icon: Clock,
    title: "Prélèvement automatique",
    description: "Chaque échéance est prélevée automatiquement à date fixe. Vous n'avez rien à faire après la validation initiale.",
  },
  {
    icon: CheckCircle,
    title: "Inscription garantie",
    description: "Dès la première échéance validée, votre place est réservée. Pas d'attente, pas de risque de session complète.",
  },
];

const pricingExamples = [
  { formation: "Formation Soirée (33 h)", price: 990, installments: 4 },
  { formation: "Formation Journée (63 h)", price: 1190, installments: 4 },
];

const faqs = [
  {
    question: "Qui peut bénéficier du paiement en plusieurs fois ?",
    answer:
      "Toute personne majeure résidant en France métropolitaine et titulaire d'une carte bancaire Visa ou Mastercard peut utiliser le paiement Alma. Il n'y a aucun revenu minimum requis.",
  },
  {
    question: "Y a-t-il des frais supplémentaires ?",
    answer:
      "Non, aucun. Le paiement en 2×, 3× ou 4× est strictement sans frais. Le montant total payé est exactement le prix de la formation affiché sur notre site.",
  },
  {
    question: "Comment fonctionne le prélèvement ?",
    answer:
      "La première échéance est prélevée au moment de la validation. Les échéances suivantes sont prélevées automatiquement tous les 30 jours sur la même carte bancaire.",
  },
  {
    question: "Que se passe-t-il si ma demande est refusée ?",
    answer:
      "Si Alma ne peut pas valider votre demande, vous pouvez régler en une seule fois par carte bancaire ou nous contacter au 01 88 75 05 55 pour trouver une solution adaptée.",
  },
  {
    question: "Puis-je rembourser par anticipation ?",
    answer:
      "Oui, vous pouvez à tout moment rembourser le solde restant sans pénalité. Contactez directement le service client Alma pour procéder au remboursement anticipé.",
  },
  {
    question: "Quelles formations sont éligibles au paiement en plusieurs fois ?",
    answer:
      "Toutes nos formations initiales (Taxi, VTC, VMDTR) en formule Journée ou Soirée sont éligibles au paiement en 2×, 3× ou 4× sans frais via Alma.",
  },
];

const Paiement = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <Layout>
      <Helmet>
        <title>Paiement en 2×, 3×, 4× sans frais | ECOLE T3P</title>
        <meta
          name="description"
          content="Payez votre formation Taxi, VTC ou VMDTR en 2, 3 ou 4 fois sans frais avec Alma. 0 € de frais, réponse immédiate, sans justificatif. ECOLE T3P Montrouge."
        />
        <link rel="canonical" href="https://www.ecolet3p.fr/paiement" />
        <meta property="og:title" content="Paiement en plusieurs fois sans frais | ECOLE T3P" />
        <meta property="og:description" content="Financez votre formation T3P en 2×, 3× ou 4× sans frais grâce à notre partenaire Alma. Réponse immédiate, sans justificatif." />
        <meta property="og:url" content="https://www.ecolet3p.fr/paiement" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* Breadcrumb */}
      <div className="bg-muted/30 py-3 border-b">
        <div className="container mx-auto px-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/" className="flex items-center gap-1">
                    <Home className="h-4 w-4" />
                    Accueil
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Paiement en plusieurs fois</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Hero */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/5 overflow-hidden relative">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: smoothEase }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="text-2xl font-black text-primary">ÉCOLE <span className="text-accent">T3P</span></span>
              <span className="text-xl font-bold text-muted-foreground">×</span>
              <AlmaLogo className="h-10" />
            </div>

            <h1 className="text-3xl lg:text-5xl font-bold mb-6 leading-tight">
              Payez votre formation en{" "}
              <span className="text-primary">2×, 3× ou 4× sans frais</span>
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Grâce à notre partenariat avec Alma, financez votre formation Taxi, VTC ou VMDTR
              en toute sérénité. Aucun frais supplémentaire, réponse immédiate, zéro paperasse.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <Button size="lg" asChild>
                <Link to="/formations">
                  <ArrowRight className="mr-2 h-5 w-5" />
                  Voir nos formations
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="tel:+33188750555">📞 01 88 75 05 55</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3 étapes */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <Badge className="mb-4">Simple et rapide</Badge>
            <h2 className="text-2xl lg:text-4xl font-bold mb-4">Comment ça marche ?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              En trois étapes simples, votre formation est financée et votre place réservée.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="relative text-center p-6 rounded-2xl border border-border/40 bg-card shadow-sm"
                >
                  <div
                    className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                    style={{ backgroundColor: "#FA5022" }}
                  >
                    {step.number}
                  </div>
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mt-4 mb-4"
                    style={{ backgroundColor: "rgba(250,80,34,0.08)" }}
                  >
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <Badge className="mb-4">Vos garanties</Badge>
            <h2 className="text-2xl lg:text-4xl font-bold mb-4">
              Pourquoi choisir le paiement Alma ?
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {advantages.map((adv, i) => {
              const Icon = adv.icon;
              return (
                <motion.div
                  key={adv.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="p-6 rounded-2xl border border-border/40 bg-card"
                >
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                    style={{ backgroundColor: "rgba(250,80,34,0.08)" }}
                  >
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2">{adv.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{adv.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tableau récapitulatif */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <Badge className="mb-4">Tarifs</Badge>
            <h2 className="text-2xl lg:text-4xl font-bold mb-4">
              Exemples de mensualités
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Voici un aperçu des échéances pour nos formations initiales. Le même tarif s'applique
              aux parcours Taxi, VTC et VMDTR.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto overflow-x-auto">
            <table className="w-full text-sm border border-border/60 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-primary/5">
                  <th className="text-left p-4 font-bold">Formation</th>
                  <th className="text-center p-4 font-bold">1×</th>
                  <th className="text-center p-4 font-bold">2×</th>
                  <th className="text-center p-4 font-bold">3×</th>
                  <th className="text-center p-4 font-bold">
                    4×{" "}
                    <span className="text-xs text-white px-1.5 py-0.5 rounded ml-1" style={{ backgroundColor: "#FA5022" }}>
                      populaire
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {pricingExamples.map((ex) => (
                  <tr key={ex.formation} className="border-t border-border/40">
                    <td className="p-4 font-medium">{ex.formation}</td>
                    <td className="text-center p-4">{ex.price} €</td>
                    <td className="text-center p-4">{(ex.price / 2).toFixed(2)} €</td>
                    <td className="text-center p-4">{(ex.price / 3).toFixed(2)} €</td>
                    <td className="text-center p-4 font-bold text-primary">
                      {(ex.price / 4).toFixed(2)} €/mois
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <Badge className="mb-4">FAQ</Badge>
            <h2 className="text-2xl lg:text-4xl font-bold mb-4">
              Questions fréquentes sur le paiement
            </h2>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="border border-border/40 rounded-xl px-6 bg-card"
                >
                  <AccordionTrigger className="text-left font-semibold text-sm md:text-base py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-16 lg:py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">
              Prêt à démarrer votre formation ?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Choisissez votre parcours et payez à votre rythme. Votre avenir professionnel commence ici.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link to="/formations/taxi">Formation Taxi</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/formations/vtc">Formation VTC</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/formations/vmdtr">Formation VMDTR</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Paiement;
