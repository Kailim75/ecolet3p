import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

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
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const { pageAudit, auditId } = await req.json();

    if (!pageAudit || !pageAudit.url) {
      return new Response(
        JSON.stringify({ error: "pageAudit with url is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const systemPrompt = `Tu es un expert SEO technique francophone. On te donne l'audit d'une page web d'un centre de formation Taxi/VTC/VMDTR à Montrouge (92).

Tu dois générer des corrections CONCRÈTES et APPLICABLES pour chaque problème détecté. Pour chaque fix, fournis :
- Le type : "metadata" (title, description, OG), "jsonld" (données structurées), ou "content" (texte, H1, contenu)
- La catégorie précise (title, description, h1, og_title, og_description, faq_schema, course_schema, breadcrumb, content_length, internal_linking, etc.)
- La valeur actuelle exacte
- La valeur corrigée proposée (prête à copier-coller)
- L'impact (high/medium/low)
- Une explication courte de pourquoi cette correction améliore le SEO

IMPORTANT: Les corrections doivent être directement applicables. Pour les metadata, donne le texte exact. Pour le JSON-LD, donne le JSON complet corrigé. Pour le contenu, donne le texte de remplacement.

Réponds UNIQUEMENT avec un JSON valide, sans markdown, sans backticks.`;

    const userPrompt = `Génère les corrections SEO pour cette page :

URL: ${pageAudit.url}
Score: ${pageAudit.score}/100

Problèmes détectés:
${JSON.stringify(pageAudit.issues, null, 2)}

Recommandations existantes:
${JSON.stringify(pageAudit.recommendations, null, 2)}

Format de réponse attendu:
{
  "fixes": [
    {
      "fix_type": "metadata" | "jsonld" | "content",
      "category": string,
      "current_value": string,
      "proposed_value": string,
      "impact": "high" | "medium" | "low",
      "explanation": string
    }
  ]
}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Limite de requêtes atteinte, réessayez dans quelques minutes." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Crédits IA insuffisants." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(
        JSON.stringify({ error: "Erreur du service IA" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return new Response(
        JSON.stringify({ error: "Réponse IA vide" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    let parsed;
    try {
      const cleaned = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      parsed = JSON.parse(cleaned);
    } catch {
      console.error("Failed to parse AI fix response:", content);
      return new Response(
        JSON.stringify({ error: "Impossible de parser la réponse IA", raw: content }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Save fixes to database
    if (parsed.fixes?.length && auditId) {
      const supabaseAdmin = createClient(
        Deno.env.get("SUPABASE_URL")!,
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
      );

      const rows = parsed.fixes.map((f: any) => ({
        audit_id: auditId,
        page_url: pageAudit.url,
        fix_type: f.fix_type,
        category: f.category,
        current_value: f.current_value || null,
        proposed_value: f.proposed_value,
        impact: f.impact || "medium",
        ai_explanation: f.explanation || null,
        status: "pending",
      }));

      const { error: insertErr } = await supabaseAdmin.from("seo_fixes").insert(rows);
      if (insertErr) console.error("Failed to save fixes:", insertErr);
    }

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("seo-fix-proposal error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
