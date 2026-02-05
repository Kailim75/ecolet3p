import React from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import PrefetchLink from "@/components/ui/PrefetchLink";
import { EcoleT3PIcon } from "@/components/logo/EcoleT3PLogo";

const Footer = () => {
  return (
    <footer className="bg-forest text-cream">
      {/* Main Footer */}
      <div className="container-custom py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-5">
              <EcoleT3PIcon className="w-10 h-10" theme="white" />
              <span className="text-xl font-black text-cream tracking-tight uppercase">ECOLE T3P</span>
            </div>
            <p className="text-cream/70 text-sm leading-relaxed mb-4">
              Centre de formation agréé pour chauffeurs professionnels TAXI, VTC et VMDTR.
            </p>
            <p className="text-cream/50 text-xs">
              Conformément à la réglementation en vigueur
            </p>
          </div>

          {/* Formations */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-cream mb-5">
              Formations
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Formation TAXI", path: "/formations/taxi" },
                { name: "Formation VTC", path: "/formations/vtc" },
                { name: "Formation VMDTR", path: "/formations/vmdtr" },
                { name: "Formations Continues", path: "/formations/continue-taxi" },
                { name: "Mobilité Taxi", path: "/formations/mobilite" },
                { name: "Récupération de points", path: "/formations/recuperation-points" }
              ].map((item) => (
                <li key={item.name}>
                  <PrefetchLink to={item.path} className="text-cream/70 hover:text-gold transition-colors text-sm">
                    {item.name}
                  </PrefetchLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-cream mb-5">
              Liens Utiles
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Accueil", path: "/" },
                { name: "Pourquoi ECOLE T3P", path: "/a-propos" },
                { name: "Location véhicule examen", path: "/services/location-vehicule-examen" },
                { name: "Contact", path: "/contact" },
              ].map((item) => (
                <li key={item.name}>
                  <PrefetchLink to={item.path} className="text-cream/70 hover:text-gold transition-colors text-sm">
                    {item.name}
                  </PrefetchLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-cream mb-5">
              Nous Contacter
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold mt-1 shrink-0" />
                <span className="text-cream/70 text-sm">
                  3 rue Corneille,<br />92120 Montrouge
                </span>
              </li>
              <li>
                <a href="tel:0188750555" className="flex items-center gap-3 text-cream/70 hover:text-gold transition-colors text-sm">
                  <Phone className="w-4 h-4 text-gold shrink-0" />
                  01 88 75 05 55
                </a>
              </li>
              <li>
                <a href="mailto:montrouge@ecolet3p.fr" className="flex items-start gap-3 text-cream/70 hover:text-gold transition-colors text-sm">
                  <Mail className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                  <span className="break-all">montrouge@ecolet3p.fr</span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-gold mt-1 shrink-0" />
                <span className="text-cream/70 text-sm">
                  Lun-Ven: 9h30-12h30<br />13h30-18h00
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-cream/10">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-cream/50">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
              <p>© 2025 ECOLE T3P - Tous droits réservés</p>
              <span className="hidden md:inline">|</span>
              <p>SIRET : 94856480200023</p>
              <span className="hidden md:inline">|</span>
              <p>Centre de formation agréé</p>
            </div>
            <div className="flex gap-6">
              <PrefetchLink to="/mentions-legales" className="hover:text-gold transition-colors">Mentions légales</PrefetchLink>
              <PrefetchLink to="/politique-de-confidentialite" className="hover:text-gold transition-colors">Confidentialité</PrefetchLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
