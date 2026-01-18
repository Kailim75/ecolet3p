import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");



const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PreRegistrationPayload {
  type: "INSERT";
  table: "pre_registrations";
  record: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    formation_title: string;
    formation_duration: string;
    status: string;
    created_at: string;
  };
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const payload: PreRegistrationPayload = await req.json();
    
    console.log("Received new registration webhook:", payload);

    // Validate payload
    if (payload.type !== "INSERT" || payload.table !== "pre_registrations") {
      console.log("Ignoring non-insert or wrong table event");
      return new Response(JSON.stringify({ message: "Ignored" }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const { record } = payload;
    const adminEmail = "contact@t3p-formation.fr"; // Email admin à notifier

    // Format date
    const createdDate = new Date(record.created_at).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    // Send notification email to admin using Resend API directly
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "T3P Formation <notifications@t3p-formation.fr>",
        to: [adminEmail],
        subject: `🎓 Nouvelle pré-inscription : ${record.first_name} ${record.last_name}`,
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
                  ${record.first_name} ${record.last_name}
                </div>
                <div class="info-row">
                  <span class="label">📧 Email :</span><br>
                  <a href="mailto:${record.email}">${record.email}</a>
                </div>
                <div class="info-row">
                  <span class="label">📱 Téléphone :</span><br>
                  <a href="tel:${record.phone}">${record.phone}</a>
                </div>
                <div class="info-row">
                  <span class="label">📚 Formation souhaitée :</span><br>
                  ${record.formation_title}
                </div>
                <div class="info-row">
                  <span class="label">⏱️ Durée :</span><br>
                  ${record.formation_duration}
                </div>
                <div class="info-row">
                  <span class="label">📅 Date d'inscription :</span><br>
                  ${createdDate}
                </div>
                
                <a href="https://campust3ptest.lovable.app/admin" class="cta">
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
  } catch (error: any) {
    console.error("Error in notify-new-registration function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
