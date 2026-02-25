import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface Redirect {
  from_path: string;
  to_path: string;
}

// Routes définies dans App.tsx — ne jamais rediriger depuis ces chemins
const PROTECTED_ROUTES = new Set([
  "/",
  "/formations",
  "/formations/taxi",
  "/formations/vtc",
  "/formations/vmdtr",
  "/formations/mobilite",
  "/formations/continue-taxi",
  "/formations/continue-vtc",
  "/formations/continue-vmdtr",
  "/formations/renouvellement",
  "/formations/villes",
  "/formations/montrouge",
  "/formations/anglais-professionnel",
  "/formations/formule-soiree",
  "/stage-recuperation-points",
  "/renouvellement-carte-professionnelle",
  "/guide-formation",
  "/guide-formation/pdf",
  "/paiement",
  "/calendrier-examens",
  "/services/location-vehicule-examen",
  "/passerelle-vtc-taxi",
  "/formation-accessibilite-pmr",
  "/accompagnement-gestion-activite",
  "/aide-administrative-creation-entreprise",
  "/audit-rentabilite",
  "/audit-rentabilite-chauffeur",
  "/a-propos",
  "/contact",
  "/blog",
  "/mentions-legales",
  "/politique-de-confidentialite",
  "/unsubscribe",
  "/admin",
  "/admin-login",
  "/admin-signup",
  "/charte-graphique",
  "/logo-preview",
  "/logo-export",
  "/logo-institutionnel",
  "/templates",
]);

const RedirectHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [redirects, setRedirects] = useState<Redirect[]>([]);

  useEffect(() => {
    const loadRedirects = async () => {
      const { data } = await supabase
        .from("seo_redirects")
        .select("from_path, to_path")
        .eq("is_active", true);

      if (data) setRedirects(data);
    };
    loadRedirects();
  }, []);

  useEffect(() => {
    if (redirects.length === 0) return;

    // Skip if current path is a protected app route
    if (PROTECTED_ROUTES.has(location.pathname)) return;

    const match = redirects.find(r => r.from_path === location.pathname);
    if (match) {
      navigate(match.to_path, { replace: true });
    }
  }, [location.pathname, redirects, navigate]);

  return null;
};

export default RedirectHandler;
