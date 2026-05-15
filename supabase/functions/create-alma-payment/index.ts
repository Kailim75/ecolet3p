import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const ALLOWED_ORIGINS = [
  "https://ecolet3p.fr",
  "https://www.ecolet3p.fr",
  "https://ecolet3p.lovable.app",
  "https://id-preview--4d214708-ccf7-4a10-9cb5-0493cee9937c.lovable.app",
  "http://localhost:8080",
  "http://localhost:5173",
];

const buildCorsHeaders = (origin: string | null) => {
  const allowed = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Vary": "Origin",
  };
};

// Use production API by default; switch to sandbox if the key starts with sk_test_
function getAlmaBaseUrl(apiKey: string): string {
  return apiKey.startsWith('sk_test_')
    ? 'https://api.sandbox.getalma.eu'
    : 'https://api.getalma.eu';
}

serve(async (req) => {
  const corsHeaders = buildCorsHeaders(req.headers.get("origin"));

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const ALMA_API_KEY = Deno.env.get('ALMA_API_KEY');
    if (!ALMA_API_KEY) {
      throw new Error('ALMA_API_KEY is not configured');
    }

    const {
      amount,
      installments_count,
      formation_title,
      customer_first_name,
      customer_last_name,
      customer_email,
      customer_phone,
      return_url,
      cancel_url,
    } = await req.json();

    if (!amount || !installments_count) {
      return new Response(
        JSON.stringify({ error: 'amount and installments_count are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const baseUrl = getAlmaBaseUrl(ALMA_API_KEY);

    const almaPayload = {
      payment: {
        purchase_amount: Math.round(amount * 100), // Alma expects cents
        installments_count,
        return_url: return_url || 'https://ecolet3p.fr/formations?payment=success',
        customer_cancel_url: cancel_url || 'https://ecolet3p.fr/formations?payment=cancelled',
        locale: 'fr',
        custom_data: {
          formation_title: formation_title || '',
        },
      },
      customer: {
        first_name: customer_first_name || '',
        last_name: customer_last_name || '',
        email: customer_email || '',
        phone: customer_phone || '',
      },
    };

    const almaResponse = await fetch(`${baseUrl}/v1/payments`, {
      method: 'POST',
      headers: {
        'Authorization': `Alma-Auth ${ALMA_API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(almaPayload),
    });

    const almaData = await almaResponse.json();

    if (!almaResponse.ok) {
      console.error('Alma API error:', JSON.stringify(almaData));
      return new Response(
        JSON.stringify({ error: 'Alma payment creation failed', details: almaData }),
        { status: almaResponse.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        payment_id: almaData.id,
        payment_url: almaData.url,
        state: almaData.state,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    console.error('Error creating Alma payment:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
