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

    const { pages, alertConfig } = await req.json();

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

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Calculate totals
    const totalErrors = parsed.pages?.reduce(
      (sum: number, p: any) => sum + (p.issues?.filter((i: any) => i.type === "error").length || 0), 0
    ) || 0;
    const totalWarnings = parsed.pages?.reduce(
      (sum: number, p: any) => sum + (p.issues?.filter((i: any) => i.type === "warning").length || 0), 0
    ) || 0;

    // Save audit to database
    try {
      await supabaseAdmin.from("seo_audits").insert({
        overall_score: parsed.overallScore || 0,
        pages_count: parsed.pages?.length || 0,
        total_errors: totalErrors,
        total_warnings: totalWarnings,
        audit_data: parsed,
      });
    } catch (saveErr) {
      console.error("Failed to save audit:", saveErr);
    }

    // Send alert email if score is below threshold
    let alertSent = false;
    if (alertConfig && parsed.overallScore < alertConfig.threshold) {
      try {
        const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
        if (RESEND_API_KEY && alertConfig.email) {
          const topErrors = parsed.pages
            ?.filter((p: any) => p.issues?.some((i: any) => i.type === "error"))
            .slice(0, 5)
            .map((p: any) => `• ${p.url} (${p.score}/100) — ${p.issues.filter((i: any) => i.type === "error").map((i: any) => i.message).join(", ")}`)
            .join("\n") || "Aucune erreur critique détaillée.";

          const emailRes = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${RESEND_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: "ECOLE T3P SEO <montrouge@ecolet3p.fr>",
              to: [alertConfig.email],
              subject: `⚠️ Alerte SEO — Score ${parsed.overallScore}/100 (seuil : ${alertConfig.threshold})`,
              html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                  <h2 style="color: #dc2626;">⚠️ Alerte SEO — Score en dessous du seuil</h2>
                  <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
                    <tr>
                      <td style="padding: 8px 16px; background: #fef2f2; border-radius: 8px;">
                        <strong style="font-size: 28px; color: #dc2626;">${parsed.overallScore}/100</strong>
                        <br/><span style="color: #6b7280; font-size: 13px;">Score global (seuil configuré : ${alertConfig.threshold})</span>
                      </td>
                      <td style="padding: 8px 16px; text-align: center;">
                        <strong style="font-size: 20px; color: #dc2626;">${totalErrors}</strong> erreurs<br/>
                        <strong style="font-size: 20px; color: #ca8a04;">${totalWarnings}</strong> avertissements
                      </td>
                    </tr>
                  </table>
                  <h3 style="margin-top: 24px;">Pages les plus impactées :</h3>
                  <pre style="background: #f9fafb; padding: 16px; border-radius: 8px; font-size: 12px; line-height: 1.6; white-space: pre-wrap;">${topErrors}</pre>
                  <p style="color: #6b7280; font-size: 13px; margin-top: 24px;">
                    ${parsed.pages?.length || 0} pages analysées le ${new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                  </p>
                  <p style="color: #9ca3af; font-size: 11px;">Cet email est envoyé automatiquement par le système d'audit SEO d'ECOLE T3P.</p>
                </div>
              `,
            }),
          });

          if (emailRes.ok) {
            alertSent = true;
            console.log("SEO alert email sent to", alertConfig.email);

            // Log the alert email
            try {
              await supabaseAdmin.from("email_logs").insert({
                email_type: "seo_alert",
                recipient_email: alertConfig.email,
                subject: `⚠️ Alerte SEO — Score ${parsed.overallScore}/100`,
                status: "sent",
                metadata: { score: parsed.overallScore, threshold: alertConfig.threshold, totalErrors, totalWarnings },
              });
            } catch (logErr) {
              console.error("Failed to log alert email:", logErr);
            }
          } else {
            console.error("Failed to send SEO alert:", await emailRes.text());
          }
        }
      } catch (alertErr) {
        console.error("Alert email error:", alertErr);
      }
    }

    return new Response(JSON.stringify({ ...parsed, alertSent }), {
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
