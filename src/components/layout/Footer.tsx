import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Footer = () => {
  const trainings = [
    { name: "Formation TAXI", path: "/formations" },
    { name: "Formation VTC", path: "/formations" },
    { name: "Formation VMDTR", path: "/formations" },
    { name: "Récupération de points", path: "/formations" },
    { name: "Voir toutes les formations", path: "/formations" },
  ];

  const links = [
    { name: "Accueil", path: "/" },
    { name: "Nos formations", path: "/formations" },
    { name: "À propos", path: "/a-propos" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <footer className="bg-foreground text-white">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">T3P Campus</h3>
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              Centre de formation professionnelle pour chauffeurs TAXI, VTC et VMDTR. 
              Plus de 10 ans d'expérience et 10 000+ apprenants formés.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <span className="bg-accent text-accent-foreground px-2 py-1 rounded text-xs font-semibold">
                96% de réussite
              </span>
            </div>
          </div>

          {/* Formations */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Formations</h3>
            <ul className="space-y-2">
              {trainings.map((training) => (
                <li key={training.name}>
                  <Link
                    to={training.path}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {training.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-white/70">
                <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <span>3 rue Corneille<br />92120 Montrouge</span>
              </li>
              <li>
                <a
                  href="tel:0188750555"
                  className="flex items-center gap-3 text-sm text-white/70 hover:text-white transition-colors"
                >
                  <Phone className="w-5 h-5 text-accent" />
                  01 88 75 05 55
                </a>
              </li>
              <li>
                <a
                  href="mailto:dropacademymontrouge@gmail.com"
                  className="flex items-center gap-3 text-sm text-white/70 hover:text-white transition-colors"
                >
                  <Mail className="w-5 h-5 text-accent" />
                  dropacademymontrouge@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/70">
                <Clock className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <span>Lun-Ven: 9h30-12h30 / 13h30-18h00</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/60">
              © 2025 T3P Campus - Tous droits réservés
            </p>
            <div className="flex items-center gap-4 text-sm text-white/60">
              <Link to="/mentions-legales" className="hover:text-white transition-colors">
                Mentions légales
              </Link>
              <span>|</span>
              <Link to="/politique-confidentialite" className="hover:text-white transition-colors">
                Politique de confidentialité
              </Link>
            </div>
          </div>
          <div className="text-center mt-4">
            <p className="text-xs text-white/50">
              Centre de formation professionnelle • Certifications RS5635 & RS5637
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
