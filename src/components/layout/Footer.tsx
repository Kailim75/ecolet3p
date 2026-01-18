import { Link } from "react-router-dom";
import { GraduationCap, Mail, Phone, MapPin, Facebook, Linkedin, Twitter, Instagram, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden">
      {/* Main footer */}
      <div className="section-dark">
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />

        <div className="container-custom relative py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
            {/* Brand - Takes 4 columns */}
            <div className="lg:col-span-4 space-y-6">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center shadow-glow">
                  <GraduationCap className="w-7 h-7 text-white" />
                </div>
                <div>
                  <span className="text-xl font-bold text-white block">T3P Campus</span>
                  <span className="text-xs font-medium uppercase tracking-widest text-white/50">
                    Centre de Formation
                  </span>
                </div>
              </Link>
              <p className="text-white/60 leading-relaxed max-w-sm">
                Votre partenaire formation pour développer vos compétences et booster votre carrière professionnelle. 
                Formations certifiantes et reconnues par l'État.
              </p>
              
              {/* Social links */}
              <div className="flex gap-3">
                {[
                  { icon: Facebook, href: "#", label: "Facebook" },
                  { icon: Linkedin, href: "#", label: "LinkedIn" },
                  { icon: Twitter, href: "#", label: "Twitter" },
                  { icon: Instagram, href: "#", label: "Instagram" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-xl bg-white/5 hover:bg-accent flex items-center justify-center transition-all duration-300 text-white/70 hover:text-white"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links - Takes 2 columns */}
            <div className="lg:col-span-2">
              <h4 className="font-semibold text-white mb-6">Navigation</h4>
              <ul className="space-y-4">
                {[
                  { name: "Accueil", path: "/" },
                  { name: "Formations", path: "/formations" },
                  { name: "À propos", path: "/a-propos" },
                  { name: "Contact", path: "/contact" },
                ].map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-white/60 hover:text-accent transition-colors text-sm flex items-center gap-2 group"
                    >
                      <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Formations - Takes 2 columns */}
            <div className="lg:col-span-2">
              <h4 className="font-semibold text-white mb-6">Formations</h4>
              <ul className="space-y-4">
                {[
                  "Développement Web",
                  "Gestion de Projet",
                  "Marketing Digital",
                  "Data Science",
                ].map((item) => (
                  <li key={item}>
                    <Link
                      to="/formations"
                      className="text-white/60 hover:text-accent transition-colors text-sm flex items-center gap-2 group"
                    >
                      <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact - Takes 4 columns */}
            <div className="lg:col-span-4">
              <h4 className="font-semibold text-white mb-6">Contact</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-white/60">123 Avenue de la Formation</p>
                    <p className="text-sm text-white/60">75001 Paris, France</p>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-accent" />
                  </div>
                  <a href="tel:+33123456789" className="text-sm text-white/60 hover:text-accent transition-colors">
                    +33 1 23 45 67 89
                  </a>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <a href="mailto:contact@t3pcampus.fr" className="text-sm text-white/60 hover:text-accent transition-colors">
                    contact@t3pcampus.fr
                  </a>
                </li>
              </ul>

              {/* CTA */}
              <Button asChild className="btn-accent mt-6 rounded-full">
                <Link to="/contact" className="flex items-center gap-2">
                  Prendre rendez-vous
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-foreground border-t border-white/5">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/40">
              © {currentYear} T3P Campus. Tous droits réservés.
            </p>
            <div className="flex gap-6 text-sm text-white/40">
              <a href="#" className="hover:text-accent transition-colors">Mentions légales</a>
              <a href="#" className="hover:text-accent transition-colors">Politique de confidentialité</a>
              <a href="#" className="hover:text-accent transition-colors">CGV</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
