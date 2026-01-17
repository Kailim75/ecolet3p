import { Link } from "react-router-dom";
import { GraduationCap, Mail, Phone, MapPin, Facebook, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">T3P Campus</span>
            </Link>
            <p className="text-background/70 text-sm leading-relaxed">
              Votre partenaire formation pour développer vos compétences et booster votre carrière professionnelle.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Liens rapides</h4>
            <ul className="space-y-3">
              {[
                { name: "Accueil", path: "/" },
                { name: "Formations", path: "/formations" },
                { name: "À propos", path: "/a-propos" },
                { name: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-background/70 hover:text-accent transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-background/70">
                <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <span>123 Avenue de la Formation<br />75001 Paris, France</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-background/70">
                <Phone className="w-5 h-5 text-accent shrink-0" />
                <a href="tel:+33123456789" className="hover:text-accent transition-colors">
                  +33 1 23 45 67 89
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-background/70">
                <Mail className="w-5 h-5 text-accent shrink-0" />
                <a href="mailto:contact@t3pcampus.fr" className="hover:text-accent transition-colors">
                  contact@t3pcampus.fr
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4">Suivez-nous</h4>
            <div className="flex gap-4">
              {[
                { icon: Facebook, href: "#", label: "Facebook" },
                { icon: Linkedin, href: "#", label: "LinkedIn" },
                { icon: Twitter, href: "#", label: "Twitter" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-accent transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-background/60">
            © {new Date().getFullYear()} T3P Campus. Tous droits réservés.
          </p>
          <div className="flex gap-6 text-sm text-background/60">
            <a href="#" className="hover:text-accent transition-colors">Mentions légales</a>
            <a href="#" className="hover:text-accent transition-colors">Politique de confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
