import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, source } = await req.json();
    if (!email) throw new Error("Email is required");

    console.log(`Sending lead magnet guide to: ${email} (source: ${source})`);

    const supabaseAdmin = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

    // Get unsubscribe token
    const { data: subscriber } = await supabaseAdmin
      .from("newsletter_subscribers")
      .select("unsubscribe_token")
      .eq("email", email)
      .maybeSingle();

    const unsubscribeToken = subscriber?.unsubscribe_token || "";
    const unsubscribeUrl = `https://www.ecolet3p.fr/unsubscribe?token=${unsubscribeToken}`;
    const guideUrl = "https://www.ecolet3p.fr/guide-formation";
    const emailSubject = "📘 Votre guide : Les 7 étapes pour devenir chauffeur T3P en 2026";

    const emailResponse = await resend.emails.send({
      from: "ECOLE T3P <montrouge@ecolet3p.fr>",
      to: [email],
      subject: emailSubject,
      html: `
        <!DOCTYPE html>
        <html lang="fr">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f0;">
          <table role="presentation" style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 40px 20px;">
                <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                  <!-- Header -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #1B4332 0%, #2d5a4a 100%); padding: 40px 30px; text-align: center;">
                      <h1 style="color: #d4af37; margin: 0; font-size: 28px; font-weight: bold;">ECOLE T3P</h1>
                      <p style="color: #f5f5f0; margin: 10px 0 0; font-size: 14px; opacity: 0.9;">Votre guide gratuit est prêt !</p>
                    </td>
                  </tr>
                  
                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px 30px;">
                      <h2 style="color: #1B4332; margin: 0 0 20px; font-size: 22px;">📘 Les 7 étapes pour devenir chauffeur Taxi ou VTC en 2026</h2>
                      
                      <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                        Merci pour votre intérêt ! Voici votre guide complet pour réussir votre reconversion dans le transport de personnes.
                      </p>
                      
                      <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin: 0 0 10px; font-weight: bold;">
                        Dans ce guide, vous découvrirez :
                      </p>
                      
                      <ul style="color: #4a5568; font-size: 15px; line-height: 1.8; margin: 0 0 25px; padding-left: 20px;">
                        <li>✅ Les prérequis et conditions d'accès à l'examen</li>
                        <li>✅ Le programme détaillé de la formation T3P</li>
                        <li>✅ Les solutions de financement (CPF, Pôle Emploi, OPCO…)</li>
                        <li>✅ Les étapes de création d'entreprise</li>
                        <li>✅ Le déroulement de l'examen CMA</li>
                        <li>✅ Les revenus moyens d'un chauffeur (2 500 à 3 500 €/mois)</li>
                        <li>✅ Nos conseils pour réussir du premier coup (taux de réussite : 94%)</li>
                      </ul>
                      
                      <!-- CTA Button -->
                      <table role="presentation" style="width: 100%;">
                        <tr>
                          <td style="text-align: center; padding: 10px 0 25px;">
                            <a href="${guideUrl}" style="display: inline-block; background-color: #E8793A; color: #ffffff; text-decoration: none; padding: 16px 36px; border-radius: 8px; font-weight: bold; font-size: 17px;">
                              📖 Consulter le guide complet
                            </a>
                          </td>
                        </tr>
                      </table>
                      
                      <div style="background-color: #f0fdf4; border-left: 4px solid #1B4332; padding: 16px 20px; border-radius: 0 8px 8px 0; margin: 0 0 20px;">
                        <p style="color: #1B4332; font-size: 15px; line-height: 1.6; margin: 0;">
                          <strong>💡 Prochaine étape ?</strong><br>
                          Réservez un entretien gratuit avec notre équipe pour vérifier votre éligibilité et choisir la formation adaptée à votre projet.
                        </p>
                      </div>
                      
                      <table role="presentation" style="width: 100%;">
                        <tr>
                          <td style="text-align: center;">
                            <a href="https://www.ecolet3p.fr/contact" style="display: inline-block; background-color: #1B4332; color: #ffffff; text-decoration: none; padding: 14px 30px; border-radius: 8px; font-weight: bold; font-size: 15px;">
                              Prendre rendez-vous →
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #f7fafc; padding: 25px 30px; text-align: center; border-top: 1px solid #e2e8f0;">
                      <p style="color: #718096; font-size: 14px; margin: 0 0 5px;">
                        ECOLE T3P — Centre de formation Taxi, VTC & VMDTR
                      </p>
                      <p style="color: #a0aec0; font-size: 12px; margin: 0 0 5px;">
                        3 rue Corneille, 92120 Montrouge · 01 88 75 05 55
                      </p>
                      <p style="color: #a0aec0; font-size: 12px; margin: 0 0 15px;">
                        Vous recevez cet email car vous avez téléchargé notre guide.
                      </p>
                      <a href="${unsubscribeUrl}" style="color: #718096; font-size: 12px; text-decoration: underline;">
                        Se désinscrire
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    console.log("Lead magnet guide email sent:", emailResponse);

    // Log email
    const resendId = emailResponse.data?.id || null;
    await supabaseAdmin.from("email_logs").insert({
      email_type: "lead_magnet_guide",
      recipient_email: email,
      subject: emailSubject,
      status: resendId ? "sent" : "failed",
      resend_id: resendId,
      error_message: emailResponse.error?.message || null,
      metadata: { source },
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-lead-magnet-guide:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
