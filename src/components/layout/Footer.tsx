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
