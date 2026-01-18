import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <span className="text-2xl font-bold">T3P</span>
              <span className="text-2xl font-medium text-gray-400 ml-1">Campus</span>
            </Link>
            <p className="text-gray-400 leading-relaxed mb-4">
              Votre partenaire pour devenir chauffeur professionnel depuis 2014.
            </p>
            <div className="flex gap-2">
              <span className="bg-white/10 text-xs font-semibold px-3 py-1.5 rounded-full">
                RS5635
              </span>
              <span className="bg-white/10 text-xs font-semibold px-3 py-1.5 rounded-full">
                RS5637
              </span>
            </div>
          </div>

          {/* Formations */}
          <div>
            <h4 className="font-bold text-lg mb-4">Nos Formations</h4>
            <nav className="space-y-3">
              <Link to="/formations" className="block text-gray-400 hover:text-orange-400 transition-colors">
                Formation TAXI
              </Link>
              <Link to="/formations" className="block text-gray-400 hover:text-orange-400 transition-colors">
                Formation VTC
              </Link>
              <Link to="/formations" className="block text-gray-400 hover:text-orange-400 transition-colors">
                Formation VMDTR
              </Link>
              <Link to="/formations" className="block text-gray-400 hover:text-orange-400 transition-colors">
                Formation Continue
              </Link>
              <Link to="/formations" className="block text-orange-400 font-medium hover:text-orange-300 transition-colors">
                Voir toutes →
              </Link>
            </nav>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Liens Utiles</h4>
            <nav className="space-y-3">
              <Link to="/" className="block text-gray-400 hover:text-orange-400 transition-colors">
                Accueil
              </Link>
              <Link to="/a-propos" className="block text-gray-400 hover:text-orange-400 transition-colors">
                À propos
              </Link>
              <Link to="/contact" className="block text-gray-400 hover:text-orange-400 transition-colors">
                Contact
              </Link>
              <Link to="/formations" className="block text-gray-400 hover:text-orange-400 transition-colors">
                FAQ
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-4">Nous Contacter</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">
                  3 rue Corneille<br />
                  92120 Montrouge
                </span>
              </div>
              <a href="tel:0188750555" className="flex items-center gap-3 text-gray-400 hover:text-orange-400 transition-colors">
                <Phone className="w-5 h-5 text-orange-400 flex-shrink-0" />
                01 88 75 05 55
              </a>
              <a href="mailto:dropacademymontrouge@gmail.com" className="flex items-start gap-3 text-gray-400 hover:text-orange-400 transition-colors">
                <Mail className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                <span className="break-all">dropacademymontrouge@gmail.com</span>
              </a>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">
                  Lun-Ven: 9h30-12h30<br />
                  13h30-18h00
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <p>© 2025 T3P Campus - Tous droits réservés</p>
            <div className="flex items-center gap-6">
              <Link to="/mentions-legales" className="hover:text-orange-400 transition-colors">
                Mentions légales
              </Link>
              <Link to="/confidentialite" className="hover:text-orange-400 transition-colors">
                Confidentialité
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
