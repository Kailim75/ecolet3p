import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import promo1 from "@/assets/center/groupe-promotion-1.jpg";
import promo2 from "@/assets/center/groupe-promotion-2.jpg";

/**
 * Preuve par l'image : de vraies promotions dans nos vraies salles.
 * Volontairement sans bouton d'action — cette section installe la confiance,
 * la conversion est portée par le héros et la section finale.
 */
const RealProofSection = () => (
  <section className="section-padding bg-background">
    <div className="container-custom">
      <div className="text-center mb-10">
        <h2 className="section-title mb-3">Nos promotions, en vrai</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Pas d'images de banque : nos stagiaires, nos salles, notre centre de Montrouge.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <figure className="rounded-2xl overflow-hidden border border-border bg-card">
          <img
            src={promo1}
            alt="Promotion Taxi & VTC — remise des attestations à l'ECOLE T3P Montrouge"
            width={1200}
            height={800}
            loading="lazy"
            className="w-full h-64 md:h-80 object-cover"
          />
          <figcaption className="px-4 py-3 text-sm text-muted-foreground">
            Promotion Taxi &amp; VTC — remise des attestations
          </figcaption>
        </figure>
        <figure className="rounded-2xl overflow-hidden border border-border bg-card">
          <img
            src={promo2}
            alt="Stagiaires en formation dans les salles de l'ECOLE T3P, 3 rue Corneille à Montrouge"
            width={1200}
            height={800}
            loading="lazy"
            className="w-full h-64 md:h-80 object-cover"
          />
          <figcaption className="px-4 py-3 text-sm text-muted-foreground">
            En formation, dans nos salles du 3 rue Corneille
          </figcaption>
        </figure>
      </div>

      <div className="max-w-2xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-center gap-3 sm:gap-6 text-center sm:text-left">
        <span className="inline-flex items-center gap-2 text-sm text-foreground font-semibold">
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">4</span>
          Métro Mairie de Montrouge — à 8 minutes à pied du centre
        </span>
        <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 text-primary" />
          3 rue Corneille, 92120 Montrouge
        </span>
        <Link to="/contact" className="text-sm font-semibold text-primary hover:text-accent transition-colors">
          Venir nous voir →
        </Link>
      </div>
    </div>
  </section>
);

export default RealProofSection;
