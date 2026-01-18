import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface UnsubscribeRequest {
  token: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Received unsubscribe request");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { token }: UnsubscribeRequest = await req.json();

    // Validate token format (UUID)
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!token || !uuidRegex.test(token)) {
      console.log("Invalid token format:", token);
      return new Response(
        JSON.stringify({ success: false, error: "Token invalide" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log(`Processing unsubscribe for token: ${token}`);

    // Use service role to bypass RLS for this operation
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Find subscriber by token
    const { data: subscriber, error: findError } = await supabaseAdmin
      .from("newsletter_subscribers")
      .select("id, email, status")
      .eq("unsubscribe_token", token)
      .maybeSingle();

    if (findError) {
      console.error("Error finding subscriber:", findError);
      throw findError;
    }

    if (!subscriber) {
      console.log("No subscriber found for token:", token);
      return new Response(
        JSON.stringify({ success: false, error: "Lien de désinscription invalide ou expiré" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    if (subscriber.status === "unsubscribed") {
      console.log("Subscriber already unsubscribed:", subscriber.email);
      return new Response(
        JSON.stringify({ success: true, message: "Vous êtes déjà désinscrit(e)" }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Update status to unsubscribed
    const { error: updateError } = await supabaseAdmin
      .from("newsletter_subscribers")
      .update({ status: "unsubscribed" })
      .eq("id", subscriber.id);

    if (updateError) {
      console.error("Error updating subscriber:", updateError);
      throw updateError;
    }

    console.log("Successfully unsubscribed:", subscriber.email);

    return new Response(
      JSON.stringify({ success: true, message: "Vous avez été désinscrit(e) avec succès" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in unsubscribe-newsletter function:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Une erreur est survenue" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
