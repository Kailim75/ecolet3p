import { createClient } from "npm:@supabase/supabase-js@2";
import { pushBatch, type Outcome, type SourceTable } from "../_shared/crmLeads.ts";

const ALLOWED_ORIGINS = [
  "https://ecolet3p.fr",
  "https://www.ecolet3p.fr",
  "https://ecolet3p.lovable.app",
  "https://id-preview--4d214708-ccf7-4a10-9cb5-0493cee9937c.lovable.app",
  "http://localhost:8080",
];
const cors = (origin: string | null) => ({
  "Access-Control-Allow-Origin": origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-cron-token",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Vary": "Origin",
});

const SOURCE_COLUMNS: Record<SourceTable, string> = {
  pre_registrations: "id, created_at, first_name, last_name, email, phone, formation_title, formation_duration, session_id, message, status",
  contact_requests: "id, created_at, full_name, email, phone, formation, message, status",
  appointments: "id, created_at, first_name, last_name, email, formation_choice, appointment_date, appointment_time, notes, status",
  simulations: "id, created_at, first_name, last_name, email, phone, profession",
};

const timingSafeEqual = (a: string, b: string) => {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
};

Deno.serve(async (req) => {
  const headers = { ...cors(req.headers.get("origin")), "Content-Type": "application/json" };
  const reply = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers });
  if (req.method === "OPTIONS") return new Response(null, { headers });
  if (req.method !== "POST") return reply({ error: "method_not_allowed" }, 405);

  const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, { auth: { persistSession: false } });

  // Authorisation: real admin JWT, or the scheduler token (inactive while CRM_PUSH_CRON_TOKEN is unset).
  let authorized = false;
  const cronSecret = Deno.env.get("CRM_PUSH_CRON_TOKEN");
  const cronHeader = req.headers.get("x-cron-token");
  if (cronSecret && cronSecret.length >= 32 && cronHeader && timingSafeEqual(cronHeader, cronSecret)) {
    authorized = true;
  } else {
    const auth = req.headers.get("Authorization") ?? "";
    if (auth.startsWith("Bearer ")) {
      const { data, error } = await admin.auth.getClaims(auth.slice(7));
      const sub = data?.claims?.sub;
      if (!error && sub && data.claims.role === "authenticated") {
        const { data: role } = await admin.from("user_roles").select("id").eq("user_id", sub).eq("role", "admin").maybeSingle();
        authorized = !!role;
      }
    }
  }
  if (!authorized) return reply({ error: "unauthorized" }, 401);

  try {
    const summary = await pushBatch({
      claim: async (limit, lease) => {
        const { data, error } = await admin.rpc("crm_claim_leads", { p_limit: limit, p_lease_seconds: lease });
        if (error) throw new Error("claim_failed");
        return data ?? [];
      },
      complete: async (id, lockToken, o: Outcome) => {
        const { error } = await admin.rpc("crm_complete_lead", {
          p_id: id, p_lock_token: lockToken, p_outcome: o.outcome, p_crm_result: o.crm_result ?? null, p_error: o.error ?? null,
        });
        if (error) console.error("crm_complete_failed", id);
      },
      loadSource: async (table, id) => {
        const { data, error } = await admin.from(table).select(SOURCE_COLUMNS[table]).eq("id", id).maybeSingle();
        if (error) throw new Error("source_failed");
        return data as Record<string, unknown> | null;
      },
      loadSession: async (id) => {
        const { data } = await admin.from("formation_sessions").select("start_date, end_date, start_time, end_time").eq("id", id).maybeSingle();
        return data as Record<string, unknown> | null;
      },
      fetch,
    }, { endpoint: Deno.env.get("CRM_LEADS_ENDPOINT"), token: Deno.env.get("CRM_LEADS_TOKEN") });
    // Counts only: no PII, no secrets
    console.log("push-crm-leads", JSON.stringify(summary));
    return reply(summary, summary.status === "not_configured" ? 503 : 200);
  } catch {
    console.error("push-crm-leads failed");
    return reply({ error: "internal_error" }, 500);
  }
});
