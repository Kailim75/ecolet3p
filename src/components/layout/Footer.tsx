import React, { useState } from "react";
import { Phone, Mail, MapPin, Clock, Star, Facebook, Instagram, ChevronDown } from "lucide-react";
import PrefetchLink from "@/components/ui/PrefetchLink";
import { EcoleT3PMonogram } from "@/components/logo/EcoleT3PInstitutional";

const formationsLinks = [
  { name: "Formation TAXI", path: "/formations/taxi" },
  { name: "Formation VTC", path: "/formations/vtc" },
  { name: "Formation VMDTR", path: "/formations/vmdtr" },
  { name: "Continue TAXI (14h)", path: "/formations/continue-taxi" },
  { name: "Continue VTC (14h)", path: "/formations/continue-vtc" },
  { name: "Mobilité Taxi", path: "/formations/mobilite" },
  { name: "Récupération de points", path: "/formations/recuperation-points" },
];

const usefulLinks = [
  { name: "Blog", path: "/blog" },
  { name: "FAQ", path: "/#faq" },
  { name: "Pourquoi ECOLE T3P", path: "/a-propos" },
  { name: "Contact", path: "/contact" },
  { name: "Mentions légales", path: "/mentions-legales" },
  { name: "Politique de confidentialité", path: "/politique-de-confidentialite" },
  { name: "Location véhicule examen", path: "/services/location-vehicule-examen" },
];

interface AccordionSectionProps {
  title: string;
  children: React.ReactNode;
}

const AccordionSection = ({ title, children }: AccordionSectionProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10 md:border-0">
      {/* Mobile: accordion toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 md:hidden"
      >
        <h4 className="text-sm font-bold uppercase tracking-wider text-white">{title}</h4>
        <ChevronDown className={`w-5 h-5 text-white/60 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {/* Mobile: collapsible content */}
      <div className={`overflow-hidden transition-all duration-300 md:!max-h-none md:!opacity-100 ${open ? "max-h-96 opacity-100 pb-4" : "max-h-0 opacity-0"} md:block`}>
        {/* Desktop: static title */}
        <h4 className="hidden md:block text-sm font-bold uppercase tracking-wider text-white mb-5">{title}</h4>
        {children}
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-forest text-white">
      {/* Main Footer */}
      <div className="container-custom py-10 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 md:gap-10 lg:gap-8">
          {/* Col 1: Logo + Address — always visible */}
          <div className="pb-6 md:pb-0">
            <div className="flex items-center gap-3 mb-5">
              <EcoleT3PMonogram className="w-9 h-9" theme="dark" />
              <div className="flex flex-col">
                <span className="text-xl font-serif font-bold text-white tracking-wide">ÉCOLE T3P</span>
                <span className="text-[9px] text-white/60 tracking-wider">Centre de formation agréé Préfecture</span>
              </div>
            </div>
            <ul className="space-y-3 mb-5">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold mt-1 shrink-0" />
                <span className="text-white/70 text-sm">
                  3 rue Corneille,<br />92120 Montrouge
                </span>
              </li>
              <li>
                <a href="tel:0188750555" className="flex items-center gap-3 text-white/70 hover:text-gold transition-colors text-sm">
                  <Phone className="w-4 h-4 text-gold shrink-0" />
                  01 88 75 05 55
                </a>
              </li>
              <li>
                <a href="mailto:montrouge@ecolet3p.fr" className="flex items-start gap-3 text-white/70 hover:text-gold transition-colors text-sm">
                  <Mail className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                  <span className="break-all">montrouge@ecolet3p.fr</span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-gold mt-1 shrink-0" />
                <span className="text-white/70 text-sm">
                  Lun-Ven: 9h30-12h30<br />13h30-18h00
                </span>
              </li>
            </ul>

            {/* Google Reviews — visible on mobile too */}
            <div className="bg-white/10 rounded-xl p-4 border border-white/10 md:hidden">
              <div className="flex items-center gap-2 mb-1">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                  ))}
                </div>
                <span className="text-white font-bold text-sm">5.0/5</span>
                <span className="text-white/60 text-xs">— 359 avis</span>
              </div>
              <a
                href="https://www.google.com/maps/place/ECOLE+T3P"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold text-xs font-semibold hover:underline inline-block"
              >
                Voir sur Google →
              </a>
            </div>
          </div>

          {/* Col 2: Formations — accordion on mobile */}
          <AccordionSection title="Formations">
            <ul className="space-y-3">
              {formationsLinks.map((item) => (
                <li key={item.name}>
                  <PrefetchLink to={item.path} className="text-white/70 hover:text-gold transition-colors text-sm">
                    {item.name}
                  </PrefetchLink>
                </li>
              ))}
            </ul>
          </AccordionSection>

          {/* Col 3: Liens Utiles — accordion on mobile */}
          <AccordionSection title="Liens Utiles">
            <ul className="space-y-3">
              {usefulLinks.map((item) => (
                <li key={item.name}>
                  <PrefetchLink to={item.path} className="text-white/70 hover:text-gold transition-colors text-sm">
                    {item.name}
                  </PrefetchLink>
                </li>
              ))}
            </ul>
          </AccordionSection>

          {/* Col 4: Social + Google Badge */}
          <div className="pt-4 md:pt-0">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-5">
              Suivez-nous
            </h4>
            <div className="flex gap-3 mb-6">
              <a
                href="https://www.facebook.com/dropacademymontrouge"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-gold/20 flex items-center justify-center transition-colors"
                aria-label="Suivre ECOLE T3P sur Facebook"
              >
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://www.instagram.com/ecolet3p"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-gold/20 flex items-center justify-center transition-colors"
                aria-label="Suivre ECOLE T3P sur Instagram"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
            </div>

            {/* Google Reviews Badge — desktop only (shown inline on mobile above) */}
            <div className="hidden md:block bg-white/10 rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                  ))}
                </div>
                <span className="text-white font-bold text-sm">5.0/5</span>
              </div>
              <p className="text-white/70 text-xs">
                359 avis vérifiés Google
              </p>
              <a
                href="https://www.google.com/maps/place/ECOLE+T3P"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold text-xs font-semibold hover:underline mt-1 inline-block"
              >
                Voir sur Google →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Payment logos bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-4">
          <div className="flex items-center justify-center gap-3 opacity-60">
            <span className="text-xs text-white/70">Paiement sécurisé par</span>
            <svg viewBox="0 0 100 32" className="h-5" aria-label="Alma">
              <path d="M10.8 25H7.2L13.6 7h4l6.4 18h-3.6l-1.4-4.2h-7L10.8 25zm5-14.4L12.6 18h6.4l-3.2-7.4zM27.2 25V7h3.2v18h-3.2zM34.8 25V7H38v7.4L44.8 7h4l-7.2 7.8L49 25h-4l-5.4-8.2L38 18.6V25h-3.2zM51.6 25V7h4.8l4.4 12.6L65.2 7H70v18h-3.2V11.4L62.2 25h-2.8l-4.6-13.6V25h-3.2z" fill="#FA5022"/>
              <rect x="76" y="7" width="24" height="18" rx="9" fill="#FA5022"/>
              <path d="M85.8 20.6c-.8 0-1.5-.2-2.1-.5a3.5 3.5 0 01-1.4-1.4c-.3-.6-.5-1.3-.5-2.1 0-.8.2-1.5.5-2.1.4-.6.8-1.1 1.4-1.4.6-.3 1.3-.5 2.1-.5.6 0 1.1.1 1.5.3.5.2.8.5 1.1.9v-1h2v7.6h-2v-1c-.3.4-.7.7-1.1.9-.5.2-1 .3-1.5.3zm.4-2c.6 0 1.1-.2 1.5-.6.4-.4.6-.9.6-1.6 0-.6-.2-1.2-.6-1.5-.4-.4-.9-.6-1.5-.6s-1.1.2-1.5.6c-.4.4-.6.9-.6 1.5 0 .7.2 1.2.6 1.6.4.4.9.6 1.5.6z" fill="white"/>
            </svg>
            <span className="text-white/30">|</span>
            {/* Visa */}
            <svg viewBox="0 0 48 16" className="h-5" aria-label="Visa">
              <path d="M19.5 1.6l-3.2 12.8h-2.6l3.2-12.8h2.6zm13.1 8.3l1.4-3.8.8 3.8h-2.2zm2.9 4.5h2.4L35.8 1.6h-2.2c-.5 0-.9.3-1.1.7l-3.8 11.7h2.7l.5-1.5h3.2l.4 1.5zm-6.7-4.2c0-3.4-4.6-3.6-4.6-5.1 0-.5.4-.9 1.4-.9.8 0 1.5.1 2.1.4l.4-1.7c-.6-.2-1.4-.4-2.4-.4-2.5 0-4.3 1.3-4.3 3.3 0 1.4 1.3 2.2 2.3 2.7 1 .5 1.4.8 1.4 1.3 0 .7-.8 1-1.6 1-.9 0-1.7-.2-2.4-.5l-.4 1.8c.7.3 1.6.5 2.7.5 2.7 0 4.4-1.3 4.4-3.4zM13.5 1.6L9.4 14.4H6.6L4.7 3.9c-.1-.5-.2-.6-.6-.8C3.4 2.8 2.4 2.4 1.5 2.2l.1-.6h4.3c.6 0 1 .4 1.1 1l1.1 5.7 2.6-6.7h2.8z" fill="white"/>
            </svg>
            {/* Mastercard */}
            <svg viewBox="0 0 32 20" className="h-5" aria-label="Mastercard">
              <circle cx="11" cy="10" r="7" fill="#EB001B" opacity="0.8"/>
              <circle cx="21" cy="10" r="7" fill="#F79E1B" opacity="0.8"/>
              <path d="M16 4.6c1.8 1.3 3 3.3 3 5.4s-1.2 4.1-3 5.4c-1.8-1.3-3-3.3-3-5.4s1.2-4.1 3-5.4z" fill="#FF5F00" opacity="0.8"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6">
          <div className="flex flex-col items-center gap-3 text-xs md:text-sm text-white/60">
            <div className="flex flex-col md:flex-row items-center gap-1 md:gap-4 text-center">
              <p>© 2026 ECOLE T3P - Tous droits réservés</p>
              <span className="hidden md:inline">|</span>
              <p>SIRET : 94856480200023</p>
            </div>
            <div className="flex gap-6">
              <PrefetchLink to="/mentions-legales" className="hover:text-gold transition-colors py-2">Mentions légales</PrefetchLink>
              <PrefetchLink to="/politique-de-confidentialite" className="hover:text-gold transition-colors py-2">Confidentialité</PrefetchLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
