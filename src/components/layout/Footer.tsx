import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Star, ChevronDown } from "lucide-react";

const formationsLinks = [
  { name: "Formation VTC", path: "/formations/vtc" },
  { name: "Formation TAXI", path: "/formations/taxi" },
  { name: "Formation VMDTR", path: "/formations/vmdtr" },
  { name: "Renouvellement VTC", path: "/formations/continue-vtc" },
  { name: "Renouvellement TAXI", path: "/formations/continue-taxi" },
  { name: "Passerelle Taxi ↔ VTC", path: "/formations/mobilite" },
  { name: "Récupération de points", path: "/formations/recuperation-points" },
];

const usefulLinks = [
  { name: "Paiement en plusieurs fois", path: "/paiement" },
  { name: "Blog", path: "/blog" },
  { name: "À propos", path: "/a-propos" },
  { name: "Contact", path: "/contact" },
  { name: "Mentions légales", path: "/mentions-legales" },
  { name: "Politique de confidentialité", path: "/politique-de-confidentialite" },
];

const AccordionSection = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10 md:border-0">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-4 md:hidden">
        <h4 className="text-sm font-bold uppercase tracking-wider text-white">{title}</h4>
        <ChevronDown className={`w-5 h-5 text-white/60 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 md:!max-h-none md:!opacity-100 ${open ? "max-h-96 opacity-100 pb-4" : "max-h-0 opacity-0"} md:block`}>
        <h4 className="hidden md:block text-sm font-bold uppercase tracking-wider text-white mb-5">{title}</h4>
        {children}
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="container-custom py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 md:gap-10">
          {/* Col 1: Info */}
          <div className="pb-6 md:pb-0">
            <h3 className="text-xl font-bold text-white mb-4">ECOLE T3P</h3>
            <ul className="space-y-3 mb-5">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-accent mt-1 shrink-0" />
                <span className="text-white/70 text-sm">3 rue Corneille,<br />92120 Montrouge</span>
              </li>
              <li>
                <a href="tel:0188750555" className="flex items-center gap-3 text-white/70 hover:text-accent transition-colors text-sm">
                  <Phone className="w-4 h-4 text-accent shrink-0" />
                  01 88 75 05 55
                </a>
              </li>
              <li>
                <a href="mailto:montrouge@ecolet3p.fr" className="flex items-start gap-3 text-white/70 hover:text-accent transition-colors text-sm">
                  <Mail className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                  montrouge@ecolet3p.fr
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-accent mt-1 shrink-0" />
                <span className="text-white/70 text-sm">Lun-Ven: 9h30-18h00</span>
              </li>
            </ul>
            {/* Google Reviews */}
            <div className="bg-white/10 rounded-lg p-3 border border-white/10">
              <div className="flex items-center gap-2 mb-1">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
                <span className="text-white font-bold text-sm">5.0/5</span>
              </div>
              <p className="text-white/60 text-xs">359 avis Google</p>
              <a href="https://www.google.com/maps/place/ECOLE+T3P" target="_blank" rel="noopener noreferrer" className="text-accent text-xs font-semibold hover:underline mt-1 inline-block">
                Voir sur Google Maps →
              </a>
            </div>
          </div>

          {/* Col 2: Formations */}
          <AccordionSection title="Formations">
            <ul className="space-y-3">
              {formationsLinks.map(l => (
                <li key={l.name}><Link to={l.path} className="text-white/70 hover:text-accent transition-colors text-sm">{l.name}</Link></li>
              ))}
            </ul>
          </AccordionSection>

          {/* Col 3: Liens */}
          <AccordionSection title="Liens Utiles">
            <ul className="space-y-3">
              {usefulLinks.map(l => (
                <li key={l.name}><Link to={l.path} className="text-white/70 hover:text-accent transition-colors text-sm">{l.name}</Link></li>
              ))}
            </ul>
          </AccordionSection>

          {/* Col 4: Alma + Paiement */}
          <div className="pt-4 md:pt-0">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-5">Paiement</h4>
            <p className="text-white/70 text-sm mb-3">
              Paiement en 4x sans frais avec Alma. CB, Visa, Mastercard acceptés.
            </p>
            <div className="flex items-center gap-3 opacity-70">
              <span className="text-xs text-white/50">Alma</span>
              <span className="text-white/30">|</span>
              <span className="text-xs text-white/50">Visa</span>
              <span className="text-white/30">|</span>
              <span className="text-xs text-white/50">Mastercard</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6">
          <div className="flex flex-col items-center gap-2 text-xs text-white/50 text-center">
            <p>© 2026 ECOLE T3P - Tous droits réservés | SIRET : 94856480200023</p>
            <div className="flex gap-4">
              <Link to="/mentions-legales" className="hover:text-accent transition-colors">Mentions légales</Link>
              <Link to="/politique-de-confidentialite" className="hover:text-accent transition-colors">Confidentialité</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
