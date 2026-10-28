// Copie à jour d'exam-result-lookup (résultat + attestation + documents élèves).
// Nouvelle fonction car Lovable ne redéployait pas la version modifiée de
// l'ancienne ; /resultats l'appelle en priorité et retombe sur l'ancienne.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const ALLOWED_ORIGINS = [
  "https://ecolet3p.fr",
  "https://www.ecolet3p.fr",
  "https://ecolet3p.lovable.app",
  "https://id-preview--4d214708-ccf7-4a10-9cb5-0493cee9937c.lovable.app",
  "http://localhost:8080",
  "http://localhost:5173",
];

const buildCorsHeaders = (origin: string | null) => {
  const allowed = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin",
  };
};

// Tentatives infructueuses autorisées par IP sur la fenêtre glissante
const MAX_FAILED_ATTEMPTS = 8;
const WINDOW_MINUTES = 60;
const SIGNED_URL_SECONDS = 600;
// Renvoyée dans chaque réponse : permet de vérifier quelle version est déployée
const FUNCTION_VERSION = "v2-2026-10-28";

const sha256 = async (value: string) => {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, "0")).join("");
};

Deno.serve(async (req) => {
  const corsHeaders = buildCorsHeaders(req.headers.get("origin"));
  // Toujours 200 + champ status : supabase.functions.invoke masque le corps des réponses non-2xx
  const reply = (body: Record<string, unknown>) =>
    new Response(JSON.stringify({ ...body, version: FUNCTION_VERSION }), {
      headers: { ...corsHeaders, "Content-Type": "application/json", "Cache-Control": "no-store" },
    });

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { dossierNumber, birthDate } = await req.json();

    const dossier = String(dossierNumber ?? "").replace(/\D/g, "");
    if (dossier.length < 5 || dossier.length > 10 || !/^\d{4}-\d{2}-\d{2}$/.test(String(birthDate ?? ""))) {
      return reply({ status: "invalid" });
    }
    const normalizedDossier = dossier.padStart(8, "0");

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const ip = req.headers.get("cf-connecting-ip")
      || req.headers.get("x-forwarded-for")?.split(",")[0].trim()
      || "unknown";
    const ipHash = await sha256(`exam-result-lookup:${ip}`);
    const since = new Date(Date.now() - WINDOW_MINUTES * 60_000).toISOString();

    const { count } = await supabaseAdmin
      .from("exam_result_lookups")
      .select("id", { count: "exact", head: true })
      .eq("ip_hash", ipHash)
      .eq("success", false)
      .gte("created_at", since);

    if ((count ?? 0) >= MAX_FAILED_ATTEMPTS) {
      return reply({ status: "rate_limited", retryAfterMinutes: WINDOW_MINUTES });
    }

    const today = new Date().toISOString().slice(0, 10);
    const { data: rows, error } = await supabaseAdmin
      .from("exam_results")
      .select("session_label, civility, full_name, exam_type, department, exam_date, global_score, result, subjects, comment, attestation_path, dossier_number")
      .eq("dossier_number", normalizedDossier)
      .eq("birth_date", birthDate)
      .eq("is_published", true)
      .gte("expires_at", today)
      .order("exam_date", { ascending: false });

    if (error) throw error;

    await supabaseAdmin.from("exam_result_lookups").insert({ ip_hash: ipHash, success: !!rows?.length });
    // Ménage opportuniste du journal (> 2 jours)
    await supabaseAdmin
      .from("exam_result_lookups")
      .delete()
      .lt("created_at", new Date(Date.now() - 2 * 86_400_000).toISOString());

    if (!rows?.length) {
      return reply({ status: "not_found" });
    }

    const { data: documents } = await supabaseAdmin
      .from("student_documents")
      .select("title, description, file_path, audience, exam_categories")
      .eq("is_published", true)
      .order("sort_order")
      .order("created_at");

    const results = await Promise.all(rows.map(async ({ attestation_path, ...row }) => {
      let attestationUrl: string | null = null;
      if (attestation_path) {
        const { data: signed } = await supabaseAdmin.storage
          .from("exam-attestations")
          .createSignedUrl(attestation_path, SIGNED_URL_SECONDS, {
            download: `Attestation_admissibilite_${row.dossier_number}.pdf`,
          });
        attestationUrl = signed?.signedUrl ?? null;
      }

      // Documents pédagogiques ciblés : public (admis / non admis) et catégorie (TAXI, VTC, VMDTR)
      const category = row.exam_type.trim().split(/\s+/)[0]?.toUpperCase() ?? "";
      const matching = (documents ?? []).filter((d) =>
        (d.audience === "all" || d.audience === row.result)
        && (!d.exam_categories?.length || d.exam_categories.includes(category))
      );
      const docs = (await Promise.all(matching.map(async (d) => {
        const fileName = d.file_path.split("/").pop() ?? "document.pdf";
        const { data: signed } = await supabaseAdmin.storage
          .from("exam-attestations")
          .createSignedUrl(d.file_path, SIGNED_URL_SECONDS, { download: fileName });
        return signed?.signedUrl ? { title: d.title, description: d.description, url: signed.signedUrl } : null;
      }))).filter(Boolean);

      return { ...row, attestationUrl, documents: docs };
    }));

    return reply({ status: "found", results });
  } catch (error) {
    console.error("exam-results-v2 error:", error);
    return reply({ status: "error" });
  }
});
