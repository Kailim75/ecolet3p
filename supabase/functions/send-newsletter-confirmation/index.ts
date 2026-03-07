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

interface NewsletterConfirmationRequest {
  email: string;
  source?: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Received newsletter confirmation request");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, source = "blog" }: NewsletterConfirmationRequest = await req.json();
    
    console.log(`Sending confirmation email to: ${email} (source: ${source})`);

    // Get the unsubscribe token for this subscriber
    const supabaseAdmin = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

    const { data: subscriber, error: fetchError } = await supabaseAdmin
      .from("newsletter_subscribers")
      .select("unsubscribe_token")
      .eq("email", email)
      .maybeSingle();

    if (fetchError) {
      console.error("Error fetching subscriber:", fetchError);
    }

    const unsubscribeToken = subscriber?.unsubscribe_token || "";
    const unsubscribeUrl = `https://ecolet3p.fr/unsubscribe?token=${unsubscribeToken}`;
    const emailSubject = "Bienvenue dans notre newsletter !";

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
                    <td style="background: linear-gradient(135deg, #1a3a32 0%, #2d5a4a 100%); padding: 40px 30px; text-align: center;">
                      <h1 style="color: #d4af37; margin: 0; font-size: 28px; font-weight: bold;">ECOLE T3P</h1>
                      <p style="color: #f5f5f0; margin: 10px 0 0; font-size: 14px; opacity: 0.9;">Centre de formation Taxi, VTC & VMDTR</p>
                    </td>
                  </tr>
                  
                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px 30px;">
                      <h2 style="color: #1a3a32; margin: 0 0 20px; font-size: 24px;">Merci pour votre inscription ! 🎉</h2>
                      
                      <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                        Vous êtes maintenant inscrit(e) à notre newsletter. Vous recevrez régulièrement :
                      </p>
                      
                      <ul style="color: #4a5568; font-size: 16px; line-height: 1.8; margin: 0 0 25px; padding-left: 20px;">
                        <li>Les dernières actualités du secteur VTC et Taxi</li>
                        <li>Des conseils pratiques pour réussir votre carrière</li>
                        <li>Des informations sur nos formations et sessions</li>
                        <li>Des guides exclusifs pour les chauffeurs professionnels</li>
                      </ul>
                      
                      <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin: 0 0 30px;">
                        Nous sommes ravis de vous compter parmi nos abonnés !
                      </p>
                      
                      <!-- CTA Button -->
                      <table role="presentation" style="width: 100%;">
                        <tr>
                          <td style="text-align: center;">
                            <a href="https://ecolet3p.fr/formations" style="display: inline-block; background-color: #d4af37; color: #1a3a32; text-decoration: none; padding: 14px 30px; border-radius: 8px; font-weight: bold; font-size: 16px;">
                              Découvrir nos formations
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #f7fafc; padding: 25px 30px; text-align: center; border-top: 1px solid #e2e8f0;">
                      <p style="color: #718096; font-size: 14px; margin: 0 0 10px;">
                        ECOLE T3P - Centre de formation professionnelle
                      </p>
                      <p style="color: #a0aec0; font-size: 12px; margin: 0 0 15px;">
                        Vous recevez cet email car vous vous êtes inscrit(e) à notre newsletter.
                      </p>
                      <a href="${unsubscribeUrl}" style="color: #718096; font-size: 12px; text-decoration: underline;">
                        Se désinscrire de la newsletter
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

    console.log("Email sent successfully:", emailResponse);

    // Log email to database
    const resendId = emailResponse.data?.id || null;
    await supabaseAdmin.from("email_logs").insert({
      email_type: "newsletter_confirmation",
      recipient_email: email,
      subject: emailSubject,
      status: resendId ? "sent" : "failed",
      resend_id: resendId,
      error_message: emailResponse.error?.message || null,
      metadata: { source },
    });

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-newsletter-confirmation function:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
