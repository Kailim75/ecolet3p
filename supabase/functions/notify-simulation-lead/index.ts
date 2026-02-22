import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { firstName, lastName, phone, email, profession, monthlyNet } = await req.json();

    const WHATSAPP_TOKEN = Deno.env.get("WHATSAPP_TOKEN");
    const WHATSAPP_PHONE_ID = Deno.env.get("WHATSAPP_PHONE_ID");
    const ADMIN_WHATSAPP = Deno.env.get("ADMIN_WHATSAPP_NUMBER") || "33188750555";

    if (!WHATSAPP_TOKEN || !WHATSAPP_PHONE_ID) {
      console.log("WhatsApp Business API not configured, falling back to email notification");
      
      // Fallback: send email notification via Resend
      const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
      if (RESEND_API_KEY) {
        const { Resend } = await import("npm:resend@2.0.0");
        const resend = new Resend(RESEND_API_KEY);
        
        await resend.emails.send({
          from: "ECOLE T3P <notifications@ecolet3p.fr>",
          to: ["montrouge@ecolet3p.fr"],
          subject: `🎯 Nouveau lead simulateur — ${firstName} ${lastName || ""}`,
          html: `
            <h2>Nouveau lead via le simulateur de revenus</h2>
            <p><strong>Prénom :</strong> ${firstName}</p>
            <p><strong>Nom :</strong> ${lastName || "-"}</p>
            <p><strong>Email :</strong> ${email}</p>
            <p><strong>Téléphone :</strong> ${phone}</p>
            <p><strong>Profession :</strong> ${profession?.toUpperCase()}</p>
            <p><strong>Revenu net estimé :</strong> ${monthlyNet?.toLocaleString("fr-FR")}€/mois</p>
            <hr />
            <p>Ce lead a complété la simulation avancée (Niveau 2). Contactez-le sous 24h.</p>
          `,
        });
      }

      return new Response(JSON.stringify({ success: true, method: "email" }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // WhatsApp Business API notification
    const message = `🎯 *Nouveau lead simulateur*\n\n` +
      `👤 ${firstName} ${lastName || ""}\n` +
      `📧 ${email}\n` +
      `📱 ${phone}\n` +
      `🚗 ${profession?.toUpperCase()}\n` +
      `💰 Net estimé: ${monthlyNet?.toLocaleString("fr-FR")}€/mois\n\n` +
      `_Lead simulation avancée — à contacter sous 24h_`;

    const response = await fetch(
      `https://graph.facebook.com/v18.0/${WHATSAPP_PHONE_ID}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${WHATSAPP_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: ADMIN_WHATSAPP,
          type: "text",
          text: { body: message },
        }),
      }
    );

    const data = await response.json();
    if (!response.ok) {
      throw new Error(`WhatsApp API error [${response.status}]: ${JSON.stringify(data)}`);
    }

    return new Response(JSON.stringify({ success: true, method: "whatsapp" }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Error in notify-simulation-lead:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ success: false, error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
