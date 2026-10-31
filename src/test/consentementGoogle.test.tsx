import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { analytics, initGA, syncAnalyticsConsent } from "@/lib/analytics";
import { COOKIE_CONSENT_KEY, persistCookieConsent, readCookieConsent } from "@/lib/cookieConsent";
import CookieConsent from "@/components/CookieConsent";
import Footer from "@/components/layout/Footer";

/**
 * Audit du 31/10/2026 : « analytics seuls » chargeait Google Ads (cookie _gcl_au, page vue
 * Google Ads), « marketing seul » envoyait une page vue GA4, et le consentement n'était pas une
 * commande gtag (gcd « non défini »). Ces tests verrouillent la séparation des deux accords.
 */
const GTM_SRC = "googletagmanager.com/gtm.js?id=GTM-KRJWD5VH"; // conteneur GTM = GA4 uniquement
const ADS_SRC = "googletagmanager.com/gtag/js?id=AW-18546542995";

const scripts = () => Array.from(document.querySelectorAll("script")).map((s) => s.src);
const gtmCharge = () => scripts().some((src) => src.includes(GTM_SRC));
const googleAdsCharge = () => scripts().some((src) => src.includes(ADS_SRC));

// Commandes gtag (objets arguments) présentes dans dataLayer, converties en tableaux.
const commandes = () =>
  (window.dataLayer ?? [])
    .filter((e) => Object.prototype.toString.call(e) === "[object Arguments]")
    .map((e) => Array.from(e as unknown as ArrayLike<unknown>));
const consentement = (type: "default" | "update") =>
  commandes().filter((c) => c[0] === "consent" && c[1] === type).map((c) => c[2] as Record<string, unknown>);
const indexCommande = (pred: (c: unknown[]) => boolean) =>
  (window.dataLayer ?? []).findIndex(
    (e) => Object.prototype.toString.call(e) === "[object Arguments]" && pred(Array.from(e as unknown as ArrayLike<unknown>)),
  );

const choisir = (analyticsAccepte: boolean, marketing: boolean) =>
  localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify({ essential: true, analytics: analyticsAccepte, marketing }));

const reinitialiser = () => {
  localStorage.clear();
  document.head.querySelectorAll("script").forEach((s) => s.remove());
  delete (window as Partial<Window>).dataLayer;
  delete (window as Partial<Window>).gtag;
  document.cookie.split(";").forEach((c) => {
    const nom = c.split("=")[0].trim();
    if (nom) document.cookie = `${nom}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  });
};

describe("mode de consentement Google", () => {
  beforeEach(reinitialiser);
  afterEach(() => {
    cleanup();
    reinitialiser();
  });

  it("profil vierge : consentement par défaut refusé, aucune balise, rien d'envoyé", () => {
    initGA();
    expect(consentement("default")).toEqual([
      expect.objectContaining({
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
        analytics_storage: "denied",
      }),
    ]);
    expect(consentement("update")).toEqual([]);
    expect(gtmCharge()).toBe(false);
    expect(googleAdsCharge()).toBe(false);
    expect(commandes().some((c) => c[0] === "config")).toBe(false);
  });

  it("« analytics seuls » charge GA4 (GTM) mais jamais Google Ads", () => {
    choisir(true, false);
    initGA();
    expect(gtmCharge()).toBe(true);
    expect(googleAdsCharge()).toBe(false);
    expect(commandes().some((c) => c[0] === "config" && String(c[1]).startsWith("AW-"))).toBe(false);
    expect(consentement("update")).toEqual([
      { analytics_storage: "granted", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" },
    ]);
  });

  it("« marketing seul » charge Google Ads mais jamais GA4 (GTM)", () => {
    choisir(false, true);
    initGA();
    expect(googleAdsCharge()).toBe(true);
    expect(gtmCharge()).toBe(false);
    expect(window.dataLayer.some((e) => (e as Record<string, unknown>).event === "gtm.js")).toBe(false);
    expect(consentement("update")).toEqual([
      { analytics_storage: "denied", ad_storage: "granted", ad_user_data: "granted", ad_personalization: "granted" },
    ]);
  });

  it("le consentement par défaut précède le chargement de GTM et la configuration Google Ads", () => {
    choisir(true, true);
    initGA();
    const defaut = indexCommande((c) => c[0] === "consent" && c[1] === "default");
    const miseAJour = indexCommande((c) => c[0] === "consent" && c[1] === "update");
    const configAds = indexCommande((c) => c[0] === "config");
    const gtm = window.dataLayer.findIndex((e) => (e as Record<string, unknown>).event === "gtm.js");
    expect(defaut).toBe(0);
    expect(miseAJour).toBeGreaterThan(defaut);
    expect(gtm).toBeGreaterThan(miseAJour);
    expect(configAds).toBeGreaterThan(miseAJour);
    expect(consentement("default")).toHaveLength(1);
  });

  it("refus total : aucune balise chargée", () => {
    choisir(false, false);
    initGA();
    expect(gtmCharge()).toBe(false);
    expect(googleAdsCharge()).toBe(false);
  });

  it("les événements GA4 (dont form_submit) n'existent qu'avec l'accord « mesure d'audience »", () => {
    choisir(false, true);
    initGA();
    analytics.trackFormSubmission("contact");
    expect(window.dataLayer.some((e) => (e as Record<string, unknown>).event === "form_submit")).toBe(false);

    reinitialiser();
    choisir(true, false);
    initGA();
    analytics.trackFormSubmission("contact");
    expect(window.dataLayer.filter((e) => (e as Record<string, unknown>).event === "form_submit")).toHaveLength(1);
  });

  it("retrait d'un accord : mise à jour refusée, cookies effacés, rechargement demandé", () => {
    choisir(true, true);
    initGA();
    document.cookie = "_ga=GA1.1.123; path=/";
    document.cookie = "_ga_132135YEV7=GS1.1; path=/";
    document.cookie = "_gcl_au=1.1.1; path=/";

    const prefs = persistCookieConsent({ essential: true, analytics: false, marketing: false });
    expect(syncAnalyticsConsent(prefs)).toBe(true);
    expect(consentement("update").slice(-1)[0]).toEqual({
      analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied",
    });
    expect(document.cookie).not.toMatch(/_ga|_gcl_/);
  });

  it("un nouvel accord ne demande pas de rechargement", () => {
    initGA();
    expect(syncAnalyticsConsent(persistCookieConsent({ essential: true, analytics: true, marketing: false }))).toBe(false);
    expect(gtmCharge()).toBe(true);
  });
});

describe("form_submit automatique de GA4", () => {
  afterEach(cleanup);

  it("l'événement submit natif ne remonte plus jusqu'au document (mesure améliorée)", () => {
    initGA();
    const ecouteDocument = vi.fn();
    const ecouteFormulaire = vi.fn((e: Event) => e.preventDefault());
    document.addEventListener("submit", ecouteDocument);
    const form = document.createElement("form");
    form.addEventListener("submit", ecouteFormulaire);
    document.body.appendChild(form);

    form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));

    expect(ecouteFormulaire).toHaveBeenCalledTimes(1);
    expect(ecouteDocument).not.toHaveBeenCalled();
    document.removeEventListener("submit", ecouteDocument);
    form.remove();
  });
});

describe("revenir sur son choix", () => {
  beforeEach(reinitialiser);
  afterEach(() => {
    cleanup();
    reinitialiser();
  });

  it("« Gérer les cookies » du pied de page rouvre le bandeau sur le choix en cours", () => {
    choisir(true, false);
    render(
      <MemoryRouter>
        <CookieConsent />
        <Footer />
      </MemoryRouter>,
    );
    expect(screen.queryByText(/Nous respectons votre vie privée/)).toBeNull();

    act(() => {
      fireEvent.click(screen.getByRole("button", { name: "Gérer les cookies" }));
    });
    expect(screen.getByText(/Nous respectons votre vie privée/)).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: "Cookies analytiques" })).toBeChecked();
    expect(screen.getByRole("checkbox", { name: "Cookies marketing" })).not.toBeChecked();

    fireEvent.click(screen.getByRole("checkbox", { name: "Cookies analytiques" }));
    fireEvent.click(screen.getByRole("button", { name: "Enregistrer" }));
    expect(readCookieConsent()).toMatchObject({ analytics: false, marketing: false });
  });
});
