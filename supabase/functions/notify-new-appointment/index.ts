import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AppointmentNotification {
  firstName: string;
  lastName: string;
  email: string;
  formationChoice: string;
  appointmentDate: string;
  appointmentTime: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("=== notify-new-appointment function called ===");

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: AppointmentNotification = await req.json();
    console.log("Appointment notification data:", data);

    const { firstName, lastName, email, formationChoice, appointmentDate, appointmentTime } = data;
    const adminEmail = "montrouge@ecolet3p.fr";

    // Format the date for display
    const dateObj = new Date(appointmentDate);
    const formattedDate = dateObj.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    const emailSubject = `📅 Nouvelle demande de RDV : ${firstName} ${lastName} - ${formattedDate}`;

    const emailHtml = `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #1B4332 0%, #2D5A45 100%); padding: 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px;">📅 Nouvelle demande de RDV</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 14px;">ECOLE T3P - Dashboard Admin</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 30px;">
            <div style="background-color: #E3F2FD; border-radius: 12px; padding: 20px; margin-bottom: 25px; border-left: 4px solid #1976D2;">
              <h3 style="color: #1565C0; margin: 0 0 5px 0; font-size: 16px;">⏰ Action requise</h3>
              <p style="color: #1976D2; margin: 0; font-size: 14px;">
                Un visiteur souhaite prendre rendez-vous. Contactez-le pour confirmer.
              </p>
            </div>
            
            <!-- Contact Info -->
            <div style="background-color: #f8f9fa; border-radius: 12px; padding: 25px; margin-bottom: 25px;">
              <h3 style="color: #1B4332; margin: 0 0 20px 0; font-size: 18px;">👤 Informations du contact</h3>
              
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; color: #666; font-size: 14px; width: 35%; border-bottom: 1px solid #eee;">Nom complet</td>
                  <td style="padding: 10px 0; color: #333; font-size: 14px; font-weight: 600; border-bottom: 1px solid #eee;">${firstName} ${lastName}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #666; font-size: 14px; border-bottom: 1px solid #eee;">Email</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                    <a href="mailto:${email}" style="color: #1976D2; text-decoration: none; font-weight: 600;">${email}</a>
                  </td>
                </tr>
              </table>
            </div>

            <!-- Appointment Details -->
            <div style="background-color: #FFF8E1; border-radius: 12px; padding: 25px; margin-bottom: 25px; border-left: 4px solid #F57C00;">
              <h3 style="color: #E65100; margin: 0 0 20px 0; font-size: 18px;">📋 Détails du rendez-vous souhaité</h3>
              
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; color: #666; font-size: 14px; width: 35%;">Formation</td>
                  <td style="padding: 10px 0; color: #333; font-size: 14px; font-weight: 600;">${formationChoice}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #666; font-size: 14px;">Date souhaitée</td>
                  <td style="padding: 10px 0; color: #333; font-size: 14px; font-weight: 600;">${formattedDate}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #666; font-size: 14px;">Heure souhaitée</td>
                  <td style="padding: 10px 0; color: #333; font-size: 14px; font-weight: 600;">${appointmentTime}</td>
                </tr>
              </table>
            </div>
            
            <!-- CTA -->
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://www.ecolet3p.fr/admin" style="display: inline-block; background-color: #1B4332; color: #ffffff; text-decoration: none; padding: 14px 30px; border-radius: 8px; font-weight: 600; font-size: 15px;">
                Voir dans le Dashboard
              </a>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #f0f0f0; padding: 20px; text-align: center; border-top: 1px solid #ddd;">
            <p style="color: #888; margin: 0; font-size: 12px;">
              Email automatique - ECOLE T3P Montrouge
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    console.log("Sending admin notification to:", adminEmail);

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "ECOLE T3P <montrouge@ecolet3p.fr>",
        to: [adminEmail],
        subject: emailSubject,
        html: emailHtml,
      }),
    });

    const emailResponse = await res.json();
    console.log("Admin notification sent:", emailResponse);

    // Log email to database
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);
    await supabase.from("email_logs").insert({
      email_type: "admin_notification_appointment",
      recipient_email: adminEmail,
      subject: emailSubject,
      status: emailResponse.id ? "sent" : "failed",
      resend_id: emailResponse.id || null,
      error_message: emailResponse.error?.message || null,
      metadata: { firstName, lastName, email, formationChoice, appointmentDate, appointmentTime },
    });

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in notify-new-appointment function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
