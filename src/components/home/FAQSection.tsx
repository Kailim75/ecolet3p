import { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import FAQSchemaOrg from "./FAQSchemaOrg";
const faqs = [
  {
    question: "Qu'est-ce que la carte professionnelle T3P ?",
    answer: "La carte professionnelle T3P (Transport Public Particulier de Personnes) est un document obligatoire pour exercer les métiers de chauffeur VTC, taxi ou conducteur de véhicule motorisé à deux ou trois roues. Elle atteste de vos compétences et de votre aptitude à exercer."
  },
  {
    question: "Combien de temps dure la formation ?",
    answer: "La durée varie selon la formation choisie. La formation VTC dure environ 250 heures, tandis que la formation Taxi nécessite environ 300 heures. Nous proposons également des formations accélérées et des stages de perfectionnement."
  },
  {
    question: "Quelles sont les options de financement disponibles ?",
    answer: "Nous proposons plusieurs facilités de paiement pour rendre nos formations accessibles : paiement en 4 fois sans frais, échelonnement personnalisé selon votre situation. Notre équipe vous accompagne pour trouver la solution adaptée à votre budget."
  },
  {
    question: "Quel est le taux de réussite de vos formations ?",
    answer: "Notre taux de réussite est de 94% aux examens officiels. Ce résultat exceptionnel est le fruit de notre méthodologie pédagogique éprouvée, de nos formateurs experts et de notre accompagnement personnalisé tout au long du parcours."
  },
  {
    question: "Comment se déroule l'inscription ?",
    answer: "L'inscription se fait en 3 étapes simples : 1) Prenez rendez-vous pour un entretien personnalisé, 2) Constituez votre dossier avec notre aide, 3) Démarrez votre formation à la date de votre choix. Nous vous guidons à chaque étape."
  },
  {
    question: "Proposez-vous un accompagnement après la formation ?",
    answer: "Absolument ! Notre accompagnement ne s'arrête pas à l'obtention de votre carte. Nous vous aidons dans vos démarches administratives, la création de votre entreprise si vous le souhaitez, et nous restons disponibles pour répondre à vos questions."
  }
];

const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

const FAQSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const decorY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <section 
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      style={{ backgroundColor: "#FBF7EF" }}
    >
      {/* Schema.org JSON-LD for SEO */}
      <FAQSchemaOrg faqs={faqs} />
      {/* Background decorations */}
      <motion.div 
        className="absolute top-20 left-10 w-32 h-32 rounded-full opacity-20"
        style={{ 
          backgroundColor: "#D4A853",
          y: backgroundY,
          filter: "blur(40px)"
        }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-48 h-48 rounded-full opacity-15"
        style={{ 
          backgroundColor: "#1B4D3E",
          y: decorY,
          filter: "blur(60px)"
        }}
      />
      <motion.div 
        className="absolute top-1/2 right-1/4 w-24 h-24 rounded-full opacity-10"
        style={{ 
          backgroundColor: "#D4A853",
          y: backgroundY,
          filter: "blur(30px)"
        }}
      />

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainerVariants}
        >
          <motion.span 
            className="badge-livementor mb-6 inline-flex items-center gap-2"
            variants={staggerItemVariants}
          >
            <HelpCircle className="w-4 h-4" />
            Questions Fréquentes
          </motion.span>
          <motion.h2 
            className="section-title mb-6"
            variants={staggerItemVariants}
          >
            VOUS AVEZ DES QUESTIONS ?
          </motion.h2>
          <motion.p 
            className="section-subtitle mx-auto"
            variants={staggerItemVariants}
          >
            Retrouvez les réponses aux questions les plus fréquemment posées 
            par nos futurs apprenants.
          </motion.p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div 
          className="max-w-3xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainerVariants}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={staggerItemVariants}
              >
                <AccordionItem 
                  value={`item-${index}`}
                  className="bg-card rounded-xl border border-border px-6 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <AccordionTrigger className="text-left py-5 hover:no-underline group">
                    <span className="flex items-center gap-4 text-forest font-semibold text-base md:text-lg">
                      <span 
                        className="flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold shrink-0"
                        style={{ backgroundColor: "rgba(27, 77, 62, 0.1)", color: "#1B4D3E" }}
                      >
                        {index + 1}
                      </span>
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 pt-0">
                    <motion.p 
                      className="text-muted-foreground leading-relaxed pl-12"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      {faq.answer}
                    </motion.p>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        {/* CTA */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <p className="text-muted-foreground mb-4">
            Vous ne trouvez pas la réponse à votre question ?
          </p>
          <motion.a
            href="/contact"
            className="btn-secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Contactez-nous</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
