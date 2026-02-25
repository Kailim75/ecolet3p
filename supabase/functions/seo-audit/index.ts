import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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

    const { pages } = await req.json();

    if (!pages || !Array.isArray(pages)) {
      return new Response(
        JSON.stringify({ error: "pages array is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const systemPrompt = `Tu es un expert SEO francophone spécialisé dans les centres de formation professionnelle.
Tu analyses les données SEO d'un site web de formation Taxi/VTC/VMDTR situé à Montrouge (92).

Pour chaque page fournie, tu dois:
1. Attribuer un score SEO de 0 à 100
2. Identifier les problèmes critiques (erreurs bloquantes)
3. Identifier les avertissements (améliorations recommandées)
4. Générer des recommandations concrètes et actionnables

Critères d'évaluation:
- Title: 30-60 caractères, contient le mot-clé principal
- Meta description: 120-160 caractères, incitative, contient le mot-clé
- H1: unique, contient le mot-clé principal, différent du title
- URL: courte, descriptive, sans paramètres inutiles
- Maillage interne: liens vers les pages piliers (taxi, vtc, vmdtr)
- Données structurées: présence de JSON-LD (FAQPage, Course, BreadcrumbList)

Réponds UNIQUEMENT avec un JSON valide, sans markdown, sans backticks.`;

    const userPrompt = `Analyse ces pages SEO et retourne un JSON avec cette structure exacte:
{
  "overallScore": number,
  "pages": [
    {
      "url": string,
      "score": number,
      "issues": [{ "type": "error" | "warning" | "info", "message": string }],
      "recommendations": [{ "category": "title" | "description" | "h1" | "linking" | "schema" | "content", "current": string, "suggested": string, "impact": "high" | "medium" | "low" }]
    }
  ],
  "globalRecommendations": [{ "category": string, "message": string, "priority": "high" | "medium" | "low" }]
}

Données des pages:
${JSON.stringify(pages, null, 2)}`;

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
          JSON.stringify({ error: "Crédits IA insuffisants. Ajoutez des crédits dans Settings > Workspace > Usage." }),
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

    // Parse the JSON from the AI response (strip potential markdown fences)
    let parsed;
    try {
      const cleaned = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      parsed = JSON.parse(cleaned);
    } catch {
      console.error("Failed to parse AI response:", content);
      return new Response(
        JSON.stringify({ error: "Impossible de parser la réponse IA", raw: content }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("seo-audit error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
