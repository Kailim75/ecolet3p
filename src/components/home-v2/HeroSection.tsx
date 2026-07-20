import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Eye, Trophy, Star, FileSearch } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

/**
 * Small CountUp hook — animates a number from 0 → target on mount.
 * Respects prefers-reduced-motion (jumps to target instantly).
 */
const useCountUp = (target: number, duration = 1600, startDelay = 800) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setValue(target);
      return;
    }

    let rafId = 0;
    let startTs = 0;
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);

    const timer = window.setTimeout(() => {
      const step = (ts: number) => {
        if (!startTs) startTs = ts;
        const p = Math.min((ts - startTs) / duration, 1);
        setValue(Math.round(ease(p) * target));
        if (p < 1) rafId = requestAnimationFrame(step);
      };
      rafId = requestAnimationFrame(step);
    }, startDelay);

    return () => {
      window.clearTimeout(timer);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [target, duration, startDelay]);

  return value;
};

/**
 * Splits a title string into <span class="hero-word"> tokens with
 * staggered animation-delay. Preserves the special "${price}€" token
 * so it can be highlighted with a gold underline.
 */
const SignatureTitle = ({ text }: { text: string }) => {
  const tokens = useMemo(() => text.split(/(\s+)/), [text]);
  let wordIndex = 0;

  return (
    <>
      {tokens.map((tok, i) => {
        if (/^\s+$/.test(tok)) return <span key={i}>{tok}</span>;

        const delay = `${0.15 + wordIndex * 0.08}s`;
        wordIndex += 1;

        // Highlight any price-like token (e.g. "990€", "1190€") in gold.
        const isPrice = /\d+€/.test(tok);

        return (
          <span
            key={i}
            className="hero-word"
            style={{ animationDelay: delay }}
          >
            {isPrice ? (
              <span className="hero-gold-underline text-gold">{tok}</span>
            ) : (
              tok
            )}
          </span>
        );
      })}
    </>
  );
};

const HeroSection = ({ h1Override }: { h1Override?: string }) => {
  const isMobile = useIsMobile();
  const successRate = useCountUp(94, 1600, 900);

  const titleText = h1Override || "Devenez chauffeur professionnel à partir de 990€.";

  return (
    <section className="relative min-h-screen lg:min-h-[70vh] flex items-center bg-primary pt-20 lg:pt-16 overflow-hidden isolate">
      {/* Background image with subtle Ken Burns zoom */}
      <div className="absolute inset-0 overflow-hidden">
        <picture>
          <source
            type="image/webp"
            srcSet="/images/hero-formation-session-768.webp 768w, /images/hero-formation-session-1200.webp 1200w, /images/hero-formation-session.webp 1344w"
            sizes="100vw"
          />
          <img
            src="/images/hero-formation-session.jpg"
            alt="Session de formation Taxi VTC en salle à l'ECOLE T3P Montrouge"
            width={1344}
            height={768}
            loading="eager"
            decoding="sync"
            className={`w-full h-full object-cover ${isMobile ? "" : "animate-ken-burns"}`}
          />
        </picture>
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/65" />
      {/* Green tint overlay */}
      <div className="absolute inset-0 bg-primary/60" />

      {/* Signature: gold radial glow — desktop only */}
      {!isMobile && (
        <div
          aria-hidden
          className="absolute -left-32 top-1/2 -translate-y-1/2 w-[640px] h-[640px] rounded-full animate-hero-glow pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at center, hsl(var(--gold) / 0.45) 0%, hsl(var(--gold) / 0.15) 35%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      )}

      {/* Signature: subtle film grain */}
      <div aria-hidden className="absolute inset-0 hero-grain pointer-events-none" />

      {/* Bottom fade into next section */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, hsl(var(--background) / 0.15) 60%, hsl(var(--background)) 100%)",
        }}
      />

      <div className="container-custom relative z-10 py-12 lg:py-20">
        <div className="max-w-3xl lg:max-w-[55%]">
          {/* Pre-title eyebrow */}
          <div
            className="hero-word inline-flex items-center gap-2 mb-5 px-3 py-1 rounded-full border border-gold/40 bg-white/5 backdrop-blur-sm"
            style={{ animationDelay: "0s" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
              Centre agréé Préfecture · Montrouge
            </span>
          </div>

          <h1 className="text-[28px] md:text-[40px] lg:text-[56px] font-bold text-white leading-[1.08] mb-6 tracking-tight">
            <SignatureTitle text={titleText} />
          </h1>

          <p
            className="hero-word text-white/85 text-base md:text-lg lg:text-xl mb-8 max-w-2xl leading-relaxed"
            style={{ animationDelay: "1.1s" }}
          >
            Formation VTC, Taxi ou VMDTR. 3 formats au choix : Journée, Soir ou E-learning.
            Accompagnement de A à Z.
          </p>

          <div
            className="hero-word flex flex-col sm:flex-row gap-4"
            style={{ animationDelay: "1.3s" }}
          >
            <Link
              to="/contact"
              className="btn-cta-orange px-8 py-4 text-base font-bold rounded-lg inline-flex items-center justify-center gap-2 group"
            >
              Réserver ma place
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="#formations"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border-2 border-white/80 text-white font-bold text-base hover:bg-white hover:text-primary transition-all duration-300"
            >
              <Eye className="w-5 h-5" />
              Voir les formations
            </a>
          </div>

          <Link
            to="/audit-rentabilite"
            className="hero-word inline-flex items-center gap-2 mt-4 text-accent font-semibold text-sm hover:underline transition-all"
            style={{ animationDelay: "1.5s" }}
          >
            <FileSearch className="w-4 h-4" />
            Audit de rentabilité gratuit →
            <span className="ml-1 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-accent text-accent-foreground rounded-full animate-pulse">
              Nouveau
            </span>
          </Link>

          {/* Badges — inline on mobile */}
          <div className="flex flex-row gap-3 mt-6 lg:hidden">
            <div
              className="bg-white/95 backdrop-blur-sm rounded-2xl p-3 shadow-card-hover flex items-center gap-2.5 flex-1 animate-fade-in-up"
              style={{ animationDelay: "0.6s", animationFillMode: "both" }}
            >
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                <Trophy className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-xl font-bold text-primary leading-none tabular-nums">
                  {successRate}%
                </p>
                <p className="text-[10px] text-muted-foreground font-medium">de réussite</p>
              </div>
            </div>
            <div
              className="bg-white/95 backdrop-blur-sm rounded-2xl p-3 shadow-card-hover flex items-center gap-2.5 flex-1 animate-fade-in-up"
              style={{ animationDelay: "0.9s", animationFillMode: "both" }}
            >
              <div className="flex flex-col items-center gap-0.5">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <span className="text-base font-bold text-primary leading-none">5.0/5</span>
              </div>
              <div>
                <p className="text-xs font-bold text-primary leading-tight">359 avis</p>
                <p className="text-[10px] text-muted-foreground font-medium">Google</p>
              </div>
            </div>
          </div>
        </div>

        {/* Floating badges — desktop only */}
        {!isMobile && (
          <div className="hidden lg:flex absolute right-12 top-1/2 -translate-y-1/2 flex-col gap-3">
            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "1.4s", animationFillMode: "both" }}
            >
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-card-hover flex items-center gap-3 animate-float ring-1 ring-gold/30">
                <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary leading-none tabular-nums">
                    {successRate}%
                  </p>
                  <p className="text-xs text-muted-foreground font-medium">de réussite</p>
                </div>
              </div>
            </div>

            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "1.7s", animationFillMode: "both" }}
            >
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-card-hover flex items-center gap-3 animate-float-delayed">
                <div className="flex flex-col items-center gap-0.5">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <span className="text-lg font-bold text-primary leading-none">5.0/5</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-primary leading-tight">359 avis</p>
                  <p className="text-xs text-muted-foreground font-medium">Google</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
