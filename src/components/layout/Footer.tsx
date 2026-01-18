import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-forest text-cream">
      {/* Main Footer */}
      <div className="container-custom py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-10 h-10 rounded-full bg-cream flex items-center justify-center">
                <span className="text-forest text-lg font-bold">T</span>
              </div>
              <span className="text-xl font-black text-cream tracking-tight uppercase">T3P Campus</span>
            </div>
            <p className="text-cream/70 text-sm leading-relaxed mb-6">
              Votre partenaire pour devenir chauffeur professionnel depuis 2014.
            </p>
            <div className="flex gap-3">
              <span className="bg-gold/20 text-gold px-3 py-1.5 rounded text-xs font-semibold">
                RS5635
              </span>
              <span className="bg-gold/20 text-gold px-3 py-1.5 rounded text-xs font-semibold">
                RS5637
              </span>
            </div>
          </div>

          {/* Formations */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-cream mb-5">
              Nos Formations
            </h4>
            <ul className="space-y-3">
              {["Formation TAXI", "Formation VTC", "Formation VMDTR", "Formation Continue"].map((item) => (
                <li key={item}>
                  <Link to="/formations" className="text-cream/70 hover:text-gold transition-colors text-sm">
                    {item}
                  </Link>
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
                { name: "À propos", path: "/a-propos" },
                { name: "Contact", path: "/contact" },
              ].map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="text-cream/70 hover:text-gold transition-colors text-sm">
                    {item.name}
                  </Link>
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
                <a href="mailto:dropacademymontrouge@gmail.com" className="flex items-start gap-3 text-cream/70 hover:text-gold transition-colors text-sm">
                  <Mail className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                  <span className="break-all">dropacademymontrouge@gmail.com</span>
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
            <p>© 2025 T3P Campus - Tous droits réservés</p>
            <div className="flex gap-6">
              <Link to="#" className="hover:text-gold transition-colors">Mentions légales</Link>
              <Link to="#" className="hover:text-gold transition-colors">Confidentialité</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
