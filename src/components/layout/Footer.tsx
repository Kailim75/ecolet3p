import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Star, ChevronDown } from "lucide-react";


// ── SILO 1 : Formations initiales ────────────────────────────────────────────
const siloFormationsInitiales = [
  { name: "Formation VTC — 990€", path: "/formations/vtc" },
  { name: "Formation Taxi — 990€", path: "/formations/taxi" },
  { name: "Formation VMDTR Moto-Taxi", path: "/formations/vmdtr" },
  { name: "Passerelle Taxi ↔ VTC (14h)", path: "/passerelle-vtc-taxi" },
  { name: "Toutes les formations", path: "/formations" },
];

// ── SILO 2 : Renouvellement & Services ───────────────────────────────────────
const siloServices = [
  { name: "Guide renouvellement →", path: "/formations/renouvellement" },
  { name: "Renouvellement VTC", path: "/formations/continue-vtc" },
  { name: "Renouvellement Taxi", path: "/formations/continue-taxi" },
  { name: "Renouvellement VMDTR", path: "/formations/continue-vmdtr" },
  { name: "Récupération de points", path: "/stage-recuperation-points" },
  { name: "Accessibilité PMR", path: "/formation-accessibilite-pmr" },
  { name: "Location véhicule examen", path: "/services/location-vehicule-examen" },
  { name: "Aide administrative entreprise", path: "/aide-administrative-creation-entreprise" },
  { name: "Gestion d'activité", path: "/accompagnement-gestion-activite" },
];

// ── SILO 3 : Blog Transport ───────────────────────────────────────────────────
const siloBlog = [
  { name: "Devenir chauffeur VTC 2026", path: "/blog/comment-devenir-chauffeur-vtc-2026" },
  { name: "Devenir chauffeur Taxi 2026", path: "/blog/comment-devenir-chauffeur-taxi-2026" },
  { name: "VMDTR : guide du moto-taxi", path: "/blog/formation-vmdtr-2026-devenir-conducteur-moto-taxi" },
  { name: "VTC vs Taxi vs VMDTR 2026", path: "/blog/vtc-taxi-vmdtr-2026-quel-metier-choisir" },
  { name: "Financement formation T3P", path: "/blog/financement-formation-taxi-vtc" },
  { name: "Tous les articles →", path: "/blog" },
];

// ── Liens institutionnels ─────────────────────────────────────────────────────
const siloInstitutionnel = [
  { name: "Paiement en plusieurs fois", path: "/paiement" },
  { name: "À propos d'ECOLE T3P", path: "/a-propos" },
  { name: "Contact", path: "/contact" },
  { name: "Mentions juridiques", path: "/mentions-juridiques" },
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
      <div className={`overflow-hidden transition-all duration-300 md:!max-h-none md:!opacity-100 ${open ? "max-h-[500px] opacity-100 pb-4" : "max-h-0 opacity-0"} md:block`}>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-0 md:gap-8">

          {/* Col 1 : Info centre — 2 colonnes sur lg */}
          <div className="pb-6 md:pb-0 lg:col-span-1">
            <img src="/images/ecole-t3p-logo-white.svg" alt="ÉCOLE T3P — Centre de Formation Agréé" className="h-14 w-auto mb-4 block" loading="lazy" decoding="async" />
            <p className="text-white/60 text-xs mb-4 leading-relaxed">
              Centre de formation agréé Préfecture des Hauts-de-Seine.<br />
              Agrément n° 23/007 — Depuis 2014.
            </p>
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
              <p className="text-white/60 text-xs">359 avis Google vérifiés</p>
              <a
                href="https://www.google.com/maps/place/ECOLE+T3P"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent text-xs font-semibold hover:underline mt-1 inline-block"
              >
                Voir sur Google Maps →
              </a>
            </div>
          </div>

          {/* Col 2 : SILO Formations initiales */}
          <AccordionSection title="Formations initiales">
            <ul className="space-y-2.5">
              {siloFormationsInitiales.map(l => (
                <li key={l.name}>
                  <Link to={l.path} className="text-white/70 hover:text-accent transition-colors text-sm">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </AccordionSection>

          {/* Col 3 : SILO Renouvellement & Services */}
          <AccordionSection title="Renouvellement & Services">
            <ul className="space-y-2.5">
              {siloServices.map(l => (
                <li key={l.name}>
                  <Link to={l.path} className="text-white/70 hover:text-accent transition-colors text-sm">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </AccordionSection>

          {/* Col 4 : SILO Blog Transport */}
          <AccordionSection title="Blog Transport">
            <ul className="space-y-2.5">
              {siloBlog.map(l => (
                <li key={l.name}>
                  <Link to={l.path} className="text-white/70 hover:text-accent transition-colors text-sm">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </AccordionSection>

          {/* Col 5 : Paiement + Institutionnel */}
          <div className="pt-4 md:pt-0">
            <h4 className="hidden md:block text-sm font-bold uppercase tracking-wider text-white mb-5">Informations</h4>
            <ul className="space-y-2.5 mb-6">
              {siloInstitutionnel.map(l => (
                <li key={l.name}>
                  <Link to={l.path} className="text-white/70 hover:text-accent transition-colors text-sm">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="border-t border-white/10 pt-4">
              <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-2">Paiement</p>
              <p className="text-white/70 text-xs mb-3 leading-relaxed">
                4× sans frais avec Alma.<br />CB, Visa, Mastercard acceptés.
              </p>
              <div className="flex items-center gap-2 opacity-60">
                <span className="text-xs text-white/50 border border-white/20 rounded px-2 py-0.5">Alma</span>
                <span className="text-xs text-white/50 border border-white/20 rounded px-2 py-0.5">Visa</span>
                <span className="text-xs text-white/50 border border-white/20 rounded px-2 py-0.5">MC</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Zone locale — maillage interne villes */}
      <div className="border-t border-white/10">
        <div className="container-custom py-4">
          <p className="text-white/40 text-xs text-center mb-2 font-semibold uppercase tracking-wider">Zones desservies</p>
          <p className="text-white/30 text-xs text-center leading-relaxed max-w-4xl mx-auto">
            <Link to="/formations/montrouge" className="hover:text-accent/70 transition-colors">Montrouge</Link> ·{" "}
            <Link to="/formations/bagneux" className="hover:text-accent/70 transition-colors">Bagneux</Link> ·{" "}
            <Link to="/formations/malakoff" className="hover:text-accent/70 transition-colors">Malakoff</Link> ·{" "}
            <Link to="/formations/vanves" className="hover:text-accent/70 transition-colors">Vanves</Link> ·{" "}
            <Link to="/formations/chatillon" className="hover:text-accent/70 transition-colors">Châtillon</Link> ·{" "}
            <Link to="/formations/issy-les-moulineaux" className="hover:text-accent/70 transition-colors">Issy-les-Moulineaux</Link> ·{" "}
            <Link to="/formations/clamart" className="hover:text-accent/70 transition-colors">Clamart</Link> ·{" "}
            <Link to="/formations/paris-14" className="hover:text-accent/70 transition-colors">Paris 14e</Link> ·{" "}
            <Link to="/formations/antony" className="hover:text-accent/70 transition-colors">Antony</Link> ·{" "}
            <Link to="/formations/boulogne-billancourt" className="hover:text-accent/70 transition-colors">Boulogne-Billancourt</Link> ·{" "}
            <Link to="/formations/creteil" className="hover:text-accent/70 transition-colors">Créteil</Link> ·{" "}
            <Link to="/formations/villejuif" className="hover:text-accent/70 transition-colors">Villejuif</Link> ·{" "}
            <Link to="/formations/gentilly" className="hover:text-accent/70 transition-colors">Gentilly</Link> ·{" "}
            <Link to="/formations/ivry-sur-seine" className="hover:text-accent/70 transition-colors">Ivry-sur-Seine</Link> ·{" "}
            <Link to="/formations/fontenay-aux-roses" className="hover:text-accent/70 transition-colors">Fontenay-aux-Roses</Link> ·{" "}
            <Link to="/formations/meudon" className="hover:text-accent/70 transition-colors">Meudon</Link> ·{" "}
            <Link to="/formations/villes" className="hover:text-accent/70 transition-colors font-semibold">Voir toutes les villes →</Link>
          </p>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6">
          <div className="flex flex-col items-center gap-2 text-xs text-white/50 text-center">
            <p>© 2026 ECOLE T3P - Tous droits réservés | SIRET : 94856480200023</p>
            <div className="flex gap-4">
              <Link to="/mentions-juridiques" className="hover:text-accent transition-colors">Mentions juridiques</Link>
              <Link to="/politique-de-confidentialite" className="hover:text-accent transition-colors">Confidentialité</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
