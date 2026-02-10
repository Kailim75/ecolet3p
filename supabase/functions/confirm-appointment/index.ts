import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AppointmentConfirmationRequest {
  firstName: string;
  lastName: string;
  email: string;
  formationChoice: string;
  appointmentDate: string;
  appointmentTime: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("=== confirm-appointment function called ===");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: AppointmentConfirmationRequest = await req.json();
    console.log("Appointment data received:", data);

    const { firstName, lastName, email, formationChoice, appointmentDate, appointmentTime } = data;

    // Format the date for display
    const dateObj = new Date(appointmentDate);
    const formattedDate = dateObj.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

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
          <div style="background: linear-gradient(135deg, #1B4332 0%, #2D5A45 100%); padding: 40px 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">ECOLE T3P</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 14px;">Formation Taxi, VTC & VMDTR</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 30px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <div style="width: 70px; height: 70px; background-color: #E8F5E9; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                <span style="font-size: 35px;">📅</span>
              </div>
              <h2 style="color: #1B4332; margin: 0 0 10px 0; font-size: 24px;">Demande de rendez-vous reçue !</h2>
            </div>
            
            <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
              Bonjour <strong>${firstName} ${lastName}</strong>,
            </p>
            
            <p style="color: #555; font-size: 15px; line-height: 1.6; margin-bottom: 25px;">
              Nous avons bien reçu votre demande de rendez-vous pour découvrir notre campus et en savoir plus sur nos formations. Voici le récapitulatif :
            </p>
            
            <!-- Appointment Details Card -->
            <div style="background-color: #f8f9fa; border-radius: 12px; padding: 25px; margin-bottom: 30px; border-left: 4px solid #1B4332;">
              <h3 style="color: #1B4332; margin: 0 0 20px 0; font-size: 18px;">📋 Détails du rendez-vous</h3>
              
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 14px; width: 40%;">Formation :</td>
                  <td style="padding: 8px 0; color: #333; font-size: 14px; font-weight: 600;">${formationChoice}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 14px;">Date souhaitée :</td>
                  <td style="padding: 8px 0; color: #333; font-size: 14px; font-weight: 600;">${formattedDate}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 14px;">Heure souhaitée :</td>
                  <td style="padding: 8px 0; color: #333; font-size: 14px; font-weight: 600;">${appointmentTime}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 14px;">Lieu :</td>
                  <td style="padding: 8px 0; color: #333; font-size: 14px; font-weight: 600;">3 rue Corneille, 92120 Montrouge</td>
                </tr>
              </table>
            </div>
            
            <!-- Next Steps -->
            <div style="background-color: #FFF8E1; border-radius: 12px; padding: 20px; margin-bottom: 30px;">
              <h4 style="color: #F57C00; margin: 0 0 10px 0; font-size: 16px;">⏳ Prochaines étapes</h4>
              <p style="color: #666; font-size: 14px; line-height: 1.6; margin: 0;">
                Notre équipe va examiner votre demande et vous <strong>contactera par téléphone</strong> dans les 24h pour confirmer votre rendez-vous.
              </p>
            </div>
            
            <p style="color: #555; font-size: 15px; line-height: 1.6; margin-bottom: 25px;">
              Si vous avez des questions en attendant, n'hésitez pas à nous contacter :
            </p>
            
            <div style="text-align: center; margin-bottom: 30px;">
              <a href="tel:0188750555" style="display: inline-block; background-color: #1B4332; color: #ffffff; text-decoration: none; padding: 14px 30px; border-radius: 8px; font-weight: 600; font-size: 15px;">
                📞 01 88 75 05 55
              </a>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #eee;">
            <p style="color: #1B4332; font-weight: bold; margin: 0 0 5px 0; font-size: 16px;">ECOLE T3P Montrouge</p>
            <p style="color: #666; margin: 0 0 15px 0; font-size: 13px;">3 rue Corneille, 92120 Montrouge</p>
            <p style="color: #888; margin: 0; font-size: 12px;">
              Formations certifiées RS5635 & RS5637
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    console.log("Sending confirmation email to:", email);

    const emailSubject = "✅ Demande de rendez-vous reçue - ECOLE T3P";

    // Send email using Resend API directly
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "ECOLE T3P <montrouge@ecolet3p.fr>",
        to: [email],
        subject: emailSubject,
        html: emailHtml,
      }),
    });

    const emailResponse = await res.json();
    console.log("Email sent successfully:", emailResponse);

    // Log email to database
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);
    await supabase.from("email_logs").insert({
      email_type: "appointment_confirmation",
      recipient_email: email,
      subject: emailSubject,
      status: emailResponse.id ? "sent" : "failed",
      resend_id: emailResponse.id || null,
      error_message: emailResponse.error?.message || null,
      metadata: { firstName, lastName, formationChoice, appointmentDate, appointmentTime },
    });

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in confirm-appointment function:", error);
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
