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
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Vary": "Origin",
});

const isAllowedOrigin = (origin: string | null) => !origin || ALLOWED_ORIGINS.has(origin);

const escapeHtml = (value: string | null | undefined) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const formatMultilineHtml = (value: string | null | undefined) =>
  escapeHtml(value).replace(/\r?\n/g, "<br />");

Deno.serve(async (req) => {
  const origin = req.headers.get("origin");
  const corsHeaders = buildCorsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!isAllowedOrigin(origin)) {
      return new Response(
        JSON.stringify({ error: "Origin not allowed" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const payload = await req.json().catch(() => ({}));
    const contactRequestId =
      typeof payload?.contactRequestId === "string"
        ? payload.contactRequestId
        : typeof payload?.record?.id === "string"
          ? payload.record.id
          : null;

    if (!contactRequestId) {
      return new Response(
        JSON.stringify({ error: "Missing contactRequestId" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !supabaseKey) {
      return new Response(
        JSON.stringify({ error: "Database service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data: record, error: contactError } = await supabase
      .from("contact_requests")
      .select("id, full_name, email, phone, formation, message, created_at, admin_notification_sent_at")
      .eq("id", contactRequestId)
      .maybeSingle();

    if (contactError) {
      console.error("Failed to load contact request:", contactError);
      return new Response(
        JSON.stringify({ error: "Unable to load contact request" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!record) {
      return new Response(
        JSON.stringify({ error: "Contact request not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (record.admin_notification_sent_at) {
      return new Response(
        JSON.stringify({ success: true, status: "already_sent" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!record.email || !record.full_name) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY not configured");
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const formationLabels: Record<string, string> = {
      taxi: "Formation Taxi",
      vtc: "Formation VTC",
      vmdtr: "Formation VMDTR",
      continue: "Formation Continue",
      mobilite: "Formation Mobilité",
      "recup-points": "Récupération de points",
    };

    const formationLabel = record.formation
      ? formationLabels[record.formation] || record.formation
      : "Non spécifiée";

    const safeFullName = escapeHtml(record.full_name);
    const safeEmail = escapeHtml(record.email);
    const safePhone = escapeHtml(record.phone);
    const safeFormation = escapeHtml(formationLabel);
    const safeMessage = formatMultilineHtml(record.message);
    const formattedReceivedAt = new Date(record.created_at ?? new Date().toISOString()).toLocaleString("fr-FR");

    // Send notification email to admin
    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "ECOLE T3P <montrouge@ecolet3p.fr>",
        to: ["montrouge@ecolet3p.fr"],
        subject: `📩 Nouvelle demande de contact — ${record.full_name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #1B4332; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
              <h2 style="margin: 0;">Nouvelle demande de contact</h2>
            </div>
            <div style="padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; font-weight: bold; width: 140px;">Nom :</td><td>${safeFullName}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Email :</td><td><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Téléphone :</td><td><a href="tel:${safePhone}">${safePhone}</a></td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Formation :</td><td>${safeFormation}</td></tr>
                ${record.message ? `<tr><td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Message :</td><td>${safeMessage}</td></tr>` : ""}
              </table>
              <hr style="margin: 16px 0; border: none; border-top: 1px solid #e5e7eb;" />
              <p style="font-size: 12px; color: #6b7280;">Reçu le ${escapeHtml(formattedReceivedAt)}</p>
            </div>
          </div>
        `,
      }),
    });

    const emailData = await emailRes.json().catch(() => null);

    // Log the email
    await supabase.from("email_logs").insert({
      email_type: "contact_request_notification",
      recipient_email: "montrouge@ecolet3p.fr",
      subject: `Nouvelle demande de contact — ${record.full_name}`,
      status: emailRes.ok ? "sent" : "failed",
      resend_id: emailData?.id || null,
      error_message: emailRes.ok ? null : JSON.stringify(emailData),
      metadata: { contact_request_id: record.id },
    });

    if (!emailRes.ok) {
      console.error("Resend contact notification failed:", emailData);
      return new Response(
        JSON.stringify({ error: "Failed to send notification email" }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    await supabase
      .from("contact_requests")
      .update({ admin_notification_sent_at: new Date().toISOString() })
      .eq("id", record.id);

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    console.error("Error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
