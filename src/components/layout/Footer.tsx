import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, ArrowRight, Award, Shield } from "lucide-react";

const Footer = () => {
  const trainings = [
    { name: "Formation TAXI", path: "/formations" },
    { name: "Formation VTC", path: "/formations" },
    { name: "Formation VMDTR", path: "/formations" },
    { name: "Formation TPMR", path: "/formations" },
    { name: "Formation Continue", path: "/formations" },
  ];

  const links = [
    { name: "Accueil", path: "/" },
    { name: "À propos", path: "/a-propos" },
    { name: "Nos formations", path: "/formations" },
    { name: "Contact", path: "/contact" },
    { name: "FAQ", path: "/contact" },
  ];

  return (
    <footer className="relative overflow-hidden">
      {/* Main Footer */}
      <div className="section-dark">
        {/* Decorative gradient orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl" />

        <div className="container-custom relative py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
            {/* Brand */}
            <div className="lg:col-span-4 space-y-6">
              <Link to="/" className="inline-flex items-baseline group">
                <span className="text-3xl font-black text-white">T3P</span>
                <span className="text-2xl font-medium text-white/60 ml-1">Campus</span>
              </Link>
              
              <p className="text-white/50 text-sm leading-relaxed max-w-sm">
                Votre partenaire pour devenir chauffeur professionnel. Centre de formation d'excellence 
                pour les métiers du transport de personnes depuis 2014.
              </p>
              
              {/* Certifications */}
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2">
                  <Award className="w-4 h-4 text-orange-400" />
                  <span className="text-xs font-semibold text-white/80">RS5635</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2">
                  <Shield className="w-4 h-4 text-blue-400" />
                  <span className="text-xs font-semibold text-white/80">RS5637</span>
                </div>
              </div>
            </div>

            {/* Formations */}
            <div className="lg:col-span-2">
              <h4 className="font-bold text-white mb-6">Nos Formations</h4>
              <ul className="space-y-3">
                {trainings.map((training) => (
                  <li key={training.name}>
                    <Link
                      to={training.path}
                      className="text-sm text-white/50 hover:text-orange-400 transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                      {training.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    to="/formations"
                    className="text-sm font-semibold text-orange-400 hover:text-orange-300 transition-colors duration-300 flex items-center gap-2"
                  >
                    Voir toutes nos formations
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Liens */}
            <div className="lg:col-span-2">
              <h4 className="font-bold text-white mb-6">Liens Utiles</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-sm text-white/50 hover:text-white transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="lg:col-span-4">
              <h4 className="font-bold text-white mb-6">Nous Contacter</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500/20 transition-colors duration-300">
                    <MapPin className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <p className="text-sm text-white/80 font-medium">3 rue Corneille</p>
                    <p className="text-sm text-white/50">92120 Montrouge</p>
                  </div>
                </li>
                <li>
                  <a
                    href="tel:0188750555"
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500/20 transition-colors duration-300">
                      <Phone className="w-5 h-5 text-orange-400" />
                    </div>
                    <span className="text-sm text-white/80 font-semibold group-hover:text-orange-400 transition-colors duration-300">
                      01 88 75 05 55
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:dropacademymontrouge@gmail.com"
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500/20 transition-colors duration-300">
                      <Mail className="w-5 h-5 text-orange-400" />
                    </div>
                    <span className="text-sm text-white/80 group-hover:text-orange-400 transition-colors duration-300">
                      dropacademymontrouge@gmail.com
                    </span>
                  </a>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <p className="text-sm text-white/80 font-medium">Lun-Ven</p>
                    <p className="text-sm text-white/50">9h30-12h30 / 13h30-18h00</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-950 border-t border-white/5">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/40">
              © 2025 T3P Campus - Tous droits réservés
            </p>
            <p className="text-xs text-white/30 text-center">
              Centre de formation professionnelle • Certifications RS5635 & RS5637
            </p>
            <div className="flex gap-6 text-sm text-white/40">
              <Link to="/mentions-legales" className="hover:text-white transition-colors duration-300">
                Mentions légales
              </Link>
              <Link to="/confidentialite" className="hover:text-white transition-colors duration-300">
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
