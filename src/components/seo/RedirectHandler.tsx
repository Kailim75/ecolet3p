import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface Redirect {
  from_path: string;
  to_path: string;
}

const RedirectHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [redirects, setRedirects] = useState<Redirect[]>([]);

  // Load redirects once on mount
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

  // Check current path against redirects
  useEffect(() => {
    if (redirects.length === 0) return;

    const match = redirects.find(r => r.from_path === location.pathname);
    if (match) {
      // Increment hit counter (fire-and-forget)
      supabase
        .from("seo_redirects")
        .update({ hit_count: undefined }) // We'll use RPC instead
        .eq("from_path", match.from_path);

      navigate(match.to_path, { replace: true });
    }
  }, [location.pathname, redirects, navigate]);

  return null;
};

export default RedirectHandler;
