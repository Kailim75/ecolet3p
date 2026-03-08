import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { record } = await req.json();

    if (!record?.email || !record?.full_name) {
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
                <tr><td style="padding: 8px 0; font-weight: bold; width: 140px;">Nom :</td><td>${record.full_name}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Email :</td><td><a href="mailto:${record.email}">${record.email}</a></td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Téléphone :</td><td><a href="tel:${record.phone}">${record.phone}</a></td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Formation :</td><td>${formationLabel}</td></tr>
                ${record.message ? `<tr><td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Message :</td><td>${record.message}</td></tr>` : ""}
              </table>
              <hr style="margin: 16px 0; border: none; border-top: 1px solid #e5e7eb;" />
              <p style="font-size: 12px; color: #6b7280;">Reçu le ${new Date().toLocaleDateString("fr-FR")} à ${new Date().toLocaleTimeString("fr-FR")}</p>
            </div>
          </div>
        `,
      }),
    });

    const emailData = await emailRes.json();

    // Log the email
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    await supabase.from("email_logs").insert({
      email_type: "contact_request_notification",
      recipient_email: "montrouge@ecolet3p.fr",
      subject: `Nouvelle demande de contact — ${record.full_name}`,
      status: emailRes.ok ? "sent" : "failed",
      resend_id: emailData?.id || null,
      error_message: emailRes.ok ? null : JSON.stringify(emailData),
      metadata: { contact_request_id: record.id },
    });

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
