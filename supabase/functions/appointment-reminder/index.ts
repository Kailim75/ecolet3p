import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  console.log("=== appointment-reminder function called ===");

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Get tomorrow's date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];

    console.log("Checking appointments for:", tomorrowStr);

    // Fetch confirmed appointments for tomorrow
    const { data: appointments, error } = await supabase
      .from('appointments')
      .select('*')
      .eq('appointment_date', tomorrowStr)
      .eq('status', 'confirmed');

    if (error) {
      console.error("Error fetching appointments:", error);
      throw error;
    }

    console.log(`Found ${appointments?.length || 0} confirmed appointments for tomorrow`);

    if (!appointments || appointments.length === 0) {
      return new Response(
        JSON.stringify({ success: true, message: "No appointments to remind", count: 0 }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    let sentCount = 0;
    const errors: string[] = [];

    for (const apt of appointments) {
      try {
        // Format the date for display
        const dateObj = new Date(apt.appointment_date);
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
                <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">Campus T3P</h1>
                <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 14px;">Formation VTC & TAXI</p>
              </div>
              
              <!-- Content -->
              <div style="padding: 40px 30px;">
                <div style="text-align: center; margin-bottom: 30px;">
                  <div style="width: 70px; height: 70px; background-color: #FFF3E0; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                    <span style="font-size: 35px;">⏰</span>
                  </div>
                  <h2 style="color: #F57C00; margin: 0 0 10px 0; font-size: 24px;">Rappel : Rendez-vous demain !</h2>
                </div>
                
                <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
                  Bonjour <strong>${apt.first_name} ${apt.last_name}</strong>,
                </p>
                
                <p style="color: #555; font-size: 15px; line-height: 1.6; margin-bottom: 25px;">
                  Nous vous rappelons que vous avez rendez-vous <strong>demain</strong> au Campus T3P pour découvrir nos formations.
                </p>
                
                <!-- Appointment Details Card -->
                <div style="background-color: #FFF8E1; border-radius: 12px; padding: 25px; margin-bottom: 30px; border-left: 4px solid #F57C00;">
                  <h3 style="color: #E65100; margin: 0 0 20px 0; font-size: 18px;">📅 Votre rendez-vous</h3>
                  
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="padding: 8px 0; color: #666; font-size: 14px; width: 40%;">Date :</td>
                      <td style="padding: 8px 0; color: #333; font-size: 14px; font-weight: 600;">${formattedDate}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #666; font-size: 14px;">Heure :</td>
                      <td style="padding: 8px 0; color: #333; font-size: 14px; font-weight: 600;">${apt.appointment_time}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #666; font-size: 14px;">Formation :</td>
                      <td style="padding: 8px 0; color: #333; font-size: 14px; font-weight: 600;">${apt.formation_choice}</td>
                    </tr>
                  </table>
                </div>

                <!-- Location -->
                <div style="background-color: #E8F5E9; border-radius: 12px; padding: 20px; margin-bottom: 30px;">
                  <h4 style="color: #1B4332; margin: 0 0 15px 0; font-size: 16px;">📍 Lieu du rendez-vous</h4>
                  <p style="color: #333; font-size: 14px; line-height: 1.6; margin: 0 0 10px 0;">
                    <strong>Campus T3P Montrouge</strong><br>
                    21 Rue Hoche, 92120 Montrouge
                  </p>
                  <p style="color: #666; font-size: 13px; margin: 0;">
                    🚇 Métro : Mairie de Montrouge (Ligne 4)
                  </p>
                </div>
                
                <p style="color: #555; font-size: 15px; line-height: 1.6; margin-bottom: 25px;">
                  En cas d'empêchement, merci de nous prévenir :
                </p>
                
                <div style="text-align: center; margin-bottom: 30px;">
                  <a href="tel:0975180535" style="display: inline-block; background-color: #1B4332; color: #ffffff; text-decoration: none; padding: 14px 30px; border-radius: 8px; font-weight: 600; font-size: 15px;">
                    📞 09 75 18 05 35
                  </a>
                </div>
                
                <p style="color: #555; font-size: 15px; line-height: 1.6; text-align: center;">
                  À demain ! 👋
                </p>
              </div>
              
              <!-- Footer -->
              <div style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #eee;">
                <p style="color: #1B4332; font-weight: bold; margin: 0 0 5px 0; font-size: 16px;">Campus T3P Montrouge</p>
                <p style="color: #666; margin: 0 0 15px 0; font-size: 13px;">21 Rue Hoche, 92120 Montrouge</p>
                <p style="color: #888; margin: 0; font-size: 12px;">
                  Formations certifiées RS5635 & RS5637
                </p>
              </div>
            </div>
          </body>
          </html>
        `;

        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: "T3P Formation <onboarding@resend.dev>",
            to: [apt.email],
            subject: "⏰ Rappel : Votre rendez-vous demain au Campus T3P",
            html: emailHtml,
          }),
        });

        const emailResult = await res.json();
        console.log(`Reminder sent to ${apt.email}:`, emailResult);
        sentCount++;
      } catch (emailError: any) {
        console.error(`Failed to send reminder to ${apt.email}:`, emailError);
        errors.push(`${apt.email}: ${emailError.message}`);
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Sent ${sentCount} reminders`, 
        count: sentCount,
        errors: errors.length > 0 ? errors : undefined 
      }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in appointment-reminder function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
