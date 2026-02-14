import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import FAQSchemaOrg from "./FAQSchemaOrg";
import AlmaPaymentButton from "@/components/formations/AlmaPaymentButton";

const faqs = [
  {
    question: "Êtes-vous éligibles au CPF ?",
    answer: "Nous avons fait le choix de rester indépendants du CPF pour préserver notre liberté pédagogique et la qualité de notre accompagnement. Notre priorité est votre réussite, pas votre dossier de financement.",
    hasAlmaButton: false,
  },
  {
    question: "Comment fonctionne le paiement en 4× ?",
    answer: "Grâce à notre partenaire Alma, vous réglez en 4 mensualités de 247,50€ sans aucun frais. La décision est immédiate, sans justificatif. Vous pouvez simuler votre échéancier directement sur cette page.",
    hasAlmaButton: true,
  },
  {
    question: "Que se passe-t-il si je rate l'examen ?",
    answer: "Si vous ne réussissez pas l'examen, nous vous réaccompagnons gratuitement jusqu'à la prochaine session disponible. Aucun frais pédagogique supplémentaire. Cette garantie est valable pour tous nos candidats assidus.",
    hasAlmaButton: false,
  },
  {
    question: "Combien de stagiaires par session ?",
    answer: "12 maximum. C'est notre standard pédagogique pour garantir un suivi individuel.",
    hasAlmaButton: false,
  },
  {
    question: "Puis-je financer via mon employeur ou un OPCO ?",
    answer: "Oui, nous établissons des conventions de formation. Contactez-nous pour un devis adapté.",
    hasAlmaButton: false,
  },
];

const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const FAQSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const decorY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <section
      ref={sectionRef}
      className="py-10 md:py-20 px-4 md:px-8 relative overflow-hidden"
      style={{ backgroundColor: "#F5F0E8" }}
    >
      <FAQSchemaOrg faqs={faqs} />

      {/* Background decorations */}
      <div className="hidden md:block">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 rounded-full opacity-20"
          style={{ backgroundColor: "#E8793A", y: backgroundY, filter: "blur(40px)" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-48 h-48 rounded-full opacity-15"
          style={{ backgroundColor: "#1B4332", y: decorY, filter: "blur(60px)" }}
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-8 md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainerVariants}
        >
          <motion.span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-4 border"
            style={{ backgroundColor: "rgba(27,67,50,0.06)", color: "#1B4332", borderColor: "rgba(27,67,50,0.12)" }}
            variants={staggerItemVariants}
          >
            <HelpCircle className="w-4 h-4" />
            Questions Fréquentes
          </motion.span>
          <motion.h2
            className="text-[22px] md:text-[36px] font-black mb-3"
            style={{ color: "#1B4332" }}
            variants={staggerItemVariants}
          >
            Vous avez des questions ?
          </motion.h2>
          <motion.p
            className="text-sm md:text-base max-w-xl mx-auto"
            style={{ color: "#666" }}
            variants={staggerItemVariants}
          >
            Retrouvez les réponses aux questions les plus fréquemment posées par nos futurs apprenants.
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
          <Accordion type="single" collapsible defaultValue="item-0" className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div key={index} variants={staggerItemVariants}>
                <AccordionItem
                  value={`item-${index}`}
                  className="bg-white rounded-xl border px-4 md:px-6 overflow-hidden transition-shadow duration-300 hover:shadow-md"
                  style={{ borderColor: "rgba(27,67,50,0.10)" }}
                >
                  <AccordionTrigger className="text-left py-4 md:py-5 hover:no-underline">
                    <span className="flex items-center gap-3 md:gap-4 font-semibold text-sm md:text-lg" style={{ color: "#1B4332" }}>
                      <span
                        className="flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full text-xs md:text-sm font-bold shrink-0"
                        style={{ backgroundColor: "rgba(27,67,50,0.1)", color: "#1B4332" }}
                      >
                        {index + 1}
                      </span>
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 md:pb-5 pt-0">
                    <p className="leading-relaxed pl-10 md:pl-12 text-sm md:text-base" style={{ color: "#666" }}>
                      {faq.answer}
                    </p>
                    {faq.hasAlmaButton && (
                      <div className="pl-10 md:pl-12 mt-3 max-w-xs">
                        <AlmaPaymentButton formationTitle="Formation T3P" price={990} />
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
