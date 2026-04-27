import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const DEFAULT_ALLOWED_ORIGINS = [
  "https://ecolet3p.fr",
  "https://www.ecolet3p.fr",
  "http://localhost:3000",
  "http://localhost:4173",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:4173",
];

const resolveCorsOrigin = (origin: string | null) =>
  origin && DEFAULT_ALLOWED_ORIGINS.includes(origin) ? origin : DEFAULT_ALLOWED_ORIGINS[0];

const corsHeaders = (origin: string | null) => ({
  "Access-Control-Allow-Origin": resolveCorsOrigin(origin),
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Vary": "Origin",
});

serve(async (req) => {
  const headers = corsHeaders(req.headers.get("origin"));

  if (req.method === "OPTIONS") {
    return new Response(null, { headers });
  }

  return new Response(
    JSON.stringify({
      valid: false,
      error: "Cette fonction n'est plus disponible. Utilisez create-admin-user.",
    }),
    { status: 410, headers: { ...headers, "Content-Type": "application/json" } }
  );
});
