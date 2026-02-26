import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { PROTECTED_ROUTES } from "@/data/protectedRoutes";

interface Redirect {
  from_path: string;
  to_path: string;
}

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
