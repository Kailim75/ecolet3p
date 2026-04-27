import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

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
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
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

const handler = async (req: Request): Promise<Response> => {
  const origin = req.headers.get("origin");
  const corsHeaders = buildCorsHeaders(origin);

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!isAllowedOrigin(origin)) {
      return new Response(JSON.stringify({ error: "Origin not allowed" }), {
        status: 403,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    if (!RESEND_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      return new Response(JSON.stringify({ error: "Notification service not configured" }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const payload = await req.json().catch(() => ({}));
    const preregistrationId =
      typeof payload?.preregistrationId === "string"
        ? payload.preregistrationId
        : typeof payload?.record?.id === "string"
          ? payload.record.id
          : null;

    if (!preregistrationId) {
      return new Response(JSON.stringify({ error: "Missing preregistrationId" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const adminEmail = "montrouge@ecolet3p.fr";
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const { data: record, error: preregistrationError } = await supabase
      .from("pre_registrations")
      .select("id, first_name, last_name, email, phone, formation_title, formation_duration, status, created_at, admin_notification_sent_at")
      .eq("id", preregistrationId)
      .maybeSingle();

    if (preregistrationError) {
      console.error("Failed to load pre-registration:", preregistrationError);
      return new Response(JSON.stringify({ error: "Unable to load pre-registration" }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    if (!record) {
      return new Response(JSON.stringify({ error: "Pre-registration not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    if (record.admin_notification_sent_at) {
      return new Response(JSON.stringify({ success: true, status: "already_sent" }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Format date
    const createdDate = new Date(record.created_at).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const safeFirstName = escapeHtml(record.first_name);
    const safeLastName = escapeHtml(record.last_name);
    const safeEmail = escapeHtml(record.email);
    const safePhone = escapeHtml(record.phone);
    const safeFormationTitle = escapeHtml(record.formation_title);
    const safeFormationDuration = escapeHtml(record.formation_duration);
    const emailSubject = `🎓 Nouvelle pré-inscription : ${record.first_name} ${record.last_name}`;

    // Send notification email to admin using Resend API directly
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "ECOLE T3P <montrouge@ecolet3p.fr>",
        to: [adminEmail],
        subject: emailSubject,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #1B4D3E, #2D6A4F); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
              .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
              .info-row { padding: 10px 0; border-bottom: 1px solid #eee; }
              .label { font-weight: bold; color: #1B4D3E; }
              .cta { display: inline-block; background: #D4AF37; color: #1B4D3E; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin-top: 20px; }
              .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0;">🎓 Nouvelle Pré-inscription</h1>
                <p style="margin: 5px 0 0;">Un nouveau prospect s'est inscrit sur le site</p>
              </div>
              <div class="content">
                <div class="info-row">
                  <span class="label">👤 Nom complet :</span><br>
                  ${safeFirstName} ${safeLastName}
                </div>
                <div class="info-row">
                  <span class="label">📧 Email :</span><br>
                  <a href="mailto:${safeEmail}">${safeEmail}</a>
                </div>
                <div class="info-row">
                  <span class="label">📱 Téléphone :</span><br>
                  <a href="tel:${safePhone}">${safePhone}</a>
                </div>
                <div class="info-row">
                  <span class="label">📚 Formation souhaitée :</span><br>
                  ${safeFormationTitle}
                </div>
                <div class="info-row">
                  <span class="label">⏱️ Durée :</span><br>
                  ${safeFormationDuration}
                </div>
                <div class="info-row">
                  <span class="label">📅 Date d'inscription :</span><br>
                  ${escapeHtml(createdDate)}
                </div>
                
                <a href="https://ecolet3p.fr/admin" class="cta">
                  Voir dans l'admin →
                </a>
              </div>
              <div class="footer">
                <p>Cette notification a été envoyée automatiquement par T3P Formation</p>
              </div>
            </div>
          </body>
          </html>
        `,
      }),
    });

    const emailData = await emailResponse.json();
    console.log("Notification email sent successfully:", emailData);

    await supabase.from("email_logs").insert({
      email_type: "admin_notification_registration",
      recipient_email: adminEmail,
      subject: emailSubject,
      status: emailData.id ? "sent" : "failed",
      resend_id: emailData.id || null,
      error_message: emailData.error?.message || null,
      metadata: { 
        registration_id: record.id,
        first_name: record.first_name,
        last_name: record.last_name,
        email: record.email,
        formation_title: record.formation_title
      },
    });

    if (!emailResponse.ok) {
      return new Response(
        JSON.stringify({ error: emailData?.error?.message || "Failed to send notification" }),
        {
          status: 502,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    await supabase
      .from("pre_registrations")
      .update({ admin_notification_sent_at: new Date().toISOString() })
      .eq("id", record.id);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Notification sent",
        emailId: emailData?.id 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: unknown) {
    console.error("Error in notify-new-registration function:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
