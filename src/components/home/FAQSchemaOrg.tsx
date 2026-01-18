import { useEffect } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaOrgProps {
  faqs: FAQItem[];
}

const FAQSchemaOrg = ({ faqs }: FAQSchemaOrgProps) => {
  useEffect(() => {
    // Create the JSON-LD script element
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "faq-schema";

    const schemaData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer,
        },
      })),
    };

    script.textContent = JSON.stringify(schemaData);

    // Remove existing script if present
    const existingScript = document.getElementById("faq-schema");
    if (existingScript) {
      existingScript.remove();
    }

    // Append to head
    document.head.appendChild(script);

    // Cleanup on unmount
    return () => {
      const scriptToRemove = document.getElementById("faq-schema");
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [faqs]);

  return null; // This component doesn't render anything visible
};

export default FAQSchemaOrg;
