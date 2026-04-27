import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const DEFAULT_ALLOWED_ORIGINS = [
  "https://ecolet3p.fr",
  "https://www.ecolet3p.fr",
  "http://localhost:3000",
  "http://localhost:4173",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:4173",
];

const ALLOWED_ORIGINS = new Set(
  [
    ...DEFAULT_ALLOWED_ORIGINS,
    ...String(Deno.env.get("ALLOWED_ORIGINS") || "")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean),
  ],
);

const resolveCorsOrigin = (origin: string | null) =>
  origin && ALLOWED_ORIGINS.has(origin) ? origin : DEFAULT_ALLOWED_ORIGINS[0];

const buildCorsHeaders = (origin: string | null) => ({
  "Access-Control-Allow-Origin": resolveCorsOrigin(origin),
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Vary": "Origin",
});

const isAllowedOrigin = (origin: string | null) => !origin || ALLOWED_ORIGINS.has(origin);

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

serve(async (req) => {
  const corsHeaders = buildCorsHeaders(req.headers.get("origin"));

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const origin = req.headers.get("origin");
    if (!isAllowedOrigin(origin)) {
      return new Response(
        JSON.stringify({ success: false, code: "origin_not_allowed", error: "Origin not allowed" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const payload = await req.json().catch(() => ({}));
    const secret = typeof payload?.secret === "string" ? payload.secret : "";
    const legacyUserId = typeof payload?.userId === "string" ? payload.userId : null;
    const email = typeof payload?.email === "string" ? payload.email.trim().toLowerCase() : "";
    const password = typeof payload?.password === "string" ? payload.password : "";

    if (!secret) {
      return new Response(
        JSON.stringify({ success: false, code: "missing_secret", error: "Clé secrète requise" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const adminSecret = Deno.env.get("ADMIN_SIGNUP_SECRET");
    if (!adminSecret || secret !== adminSecret) {
      await delay(800);
      return new Response(
        JSON.stringify({ success: false, code: "invalid_secret", error: "Création du compte refusée" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !serviceRoleKey) {
      return new Response(
        JSON.stringify({ success: false, error: "Configuration serveur incomplète" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);
    let userId = legacyUserId;
    let createdUserId: string | null = null;

    if (!userId) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(email)) {
        return new Response(
          JSON.stringify({ success: false, code: "invalid_email", error: "Email invalide" }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      if (password.length < 8) {
        return new Response(
          JSON.stringify({ success: false, code: "weak_password", error: "Mot de passe trop court" }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const { data: createUserData, error: createUserError } = await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      });

      if (createUserError) {
        const isEmailAlreadyUsed = /already (been )?registered|already exists/i.test(createUserError.message);
        return new Response(
          JSON.stringify({
            success: false,
            code: isEmailAlreadyUsed ? "email_exists" : "user_creation_failed",
            error: isEmailAlreadyUsed ? "Cet email est déjà utilisé" : createUserError.message,
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      userId = createUserData.user?.id ?? null;
      createdUserId = userId;
    }

    if (!userId) {
      return new Response(
        JSON.stringify({ success: false, code: "missing_user_id", error: "Impossible de déterminer l'utilisateur" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { error: roleError } = await supabaseAdmin
      .from("user_roles")
      .upsert({ user_id: userId, role: "admin" }, { onConflict: "user_id,role", ignoreDuplicates: true });

    if (roleError) {
      console.error("Error inserting admin role:", roleError);
      if (createdUserId) {
        await supabaseAdmin.auth.admin.deleteUser(createdUserId).catch((cleanupError) => {
          console.error("Error cleaning up admin user after role failure:", cleanupError);
        });
      }

      return new Response(
        JSON.stringify({ success: false, code: "role_assignment_failed", error: "Erreur lors de l'attribution du rôle" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, userId }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    console.error("create-admin-user error:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Erreur interne" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
