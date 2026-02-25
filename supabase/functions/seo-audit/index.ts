import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// ── Deterministic SEO Rules (60% of final score) ──────────────────────
interface PageData {
  url: string;
  title: string;
  description: string;
  h1: string;
  hasSchema: string[];
  internalLinks: string[];
  wordCount?: number;
}

interface DeterministicResult {
  score: number;
  issues: { type: "error" | "warning" | "info"; message: string; rule: string }[];
  checks: Record<string, { passed: boolean; score: number; maxScore: number; detail: string }>;
}

function runDeterministicChecks(page: PageData): DeterministicResult {
  const issues: DeterministicResult["issues"] = [];
  const checks: DeterministicResult["checks"] = {};
  let totalScore = 0;
  let maxScore = 0;

  // ── 1. Title (max 20pts) ──
  const titleLen = (page.title || "").length;
  let titleScore = 0;
  if (!page.title || titleLen === 0) {
    issues.push({ type: "error", message: "Balise <title> manquante", rule: "title_missing" });
  } else if (titleLen < 30) {
    titleScore = 8;
    issues.push({ type: "warning", message: `Title trop court (${titleLen} car., min 30)`, rule: "title_short" });
  } else if (titleLen > 60) {
    titleScore = 12;
    issues.push({ type: "warning", message: `Title trop long (${titleLen} car., max 60)`, rule: "title_long" });
  } else {
    titleScore = 20;
  }
  checks.title = { passed: titleScore >= 16, score: titleScore, maxScore: 20, detail: `${titleLen} caractères` };
  totalScore += titleScore;
  maxScore += 20;

  // ── 2. Meta description (max 15pts) ──
  const descLen = (page.description || "").length;
  let descScore = 0;
  if (!page.description || descLen === 0) {
    issues.push({ type: "error", message: "Meta description manquante", rule: "desc_missing" });
  } else if (descLen < 120) {
    descScore = 6;
    issues.push({ type: "warning", message: `Meta description trop courte (${descLen} car., min 120)`, rule: "desc_short" });
  } else if (descLen > 160) {
    descScore = 10;
    issues.push({ type: "warning", message: `Meta description trop longue (${descLen} car., max 160)`, rule: "desc_long" });
  } else {
    descScore = 15;
  }
  checks.description = { passed: descScore >= 12, score: descScore, maxScore: 15, detail: `${descLen} caractères` };
  totalScore += descScore;
  maxScore += 15;

  // ── 3. H1 (max 15pts) ──
  const h1Len = (page.h1 || "").length;
  let h1Score = 0;
  if (!page.h1 || h1Len === 0) {
    issues.push({ type: "error", message: "Balise H1 manquante", rule: "h1_missing" });
  } else {
    h1Score = 10;
    if (page.title && page.h1.toLowerCase().trim() === page.title.toLowerCase().trim()) {
      h1Score = 6;
      issues.push({ type: "warning", message: "H1 identique au title — à différencier", rule: "h1_same_title" });
    } else {
      h1Score = 15;
    }
  }
  checks.h1 = { passed: h1Score >= 12, score: h1Score, maxScore: 15, detail: h1Len > 0 ? `${h1Len} caractères` : "absent" };
  totalScore += h1Score;
  maxScore += 15;

  // ── 4. URL structure (max 10pts) ──
  let urlScore = 10;
  const url = page.url || "";
  if (url.length > 80) {
    urlScore = 5;
    issues.push({ type: "warning", message: "URL trop longue (>80 caractères)", rule: "url_long" });
  }
  if (/[A-Z]/.test(url)) {
    urlScore = Math.min(urlScore, 7);
    issues.push({ type: "info", message: "URL contient des majuscules", rule: "url_uppercase" });
  }
  if (/[?&]/.test(url) && !url.includes("utm_")) {
    urlScore = Math.min(urlScore, 6);
    issues.push({ type: "warning", message: "URL contient des paramètres non-tracking", rule: "url_params" });
  }
  checks.url = { passed: urlScore >= 8, score: urlScore, maxScore: 10, detail: `${url.length} caractères` };
  totalScore += urlScore;
  maxScore += 10;

  // ── 5. JSON-LD structured data (max 15pts) ──
  const schemas = page.hasSchema || [];
  let schemaScore = 0;
  if (schemas.length === 0) {
    issues.push({ type: "error", message: "Aucune donnée structurée JSON-LD détectée", rule: "schema_missing" });
  } else {
    schemaScore = Math.min(schemas.length * 5, 15);
    const recommended = ["FAQPage", "BreadcrumbList"];
    const missing = recommended.filter(s => !schemas.includes(s));
    if (missing.length > 0) {
      issues.push({ type: "info", message: `Schémas recommandés manquants: ${missing.join(", ")}`, rule: "schema_incomplete" });
    }
  }
  checks.schema = { passed: schemaScore >= 10, score: schemaScore, maxScore: 15, detail: schemas.join(", ") || "aucun" };
  totalScore += schemaScore;
  maxScore += 15;

  // ── 6. Internal links (max 10pts) ──
  const links = page.internalLinks || [];
  let linkScore = 0;
  if (links.length === 0) {
    issues.push({ type: "warning", message: "Aucun lien interne vers les pages piliers", rule: "links_missing" });
  } else if (links.length < 3) {
    linkScore = 5;
    issues.push({ type: "info", message: `Seulement ${links.length} lien(s) interne(s) — enrichir le maillage`, rule: "links_few" });
  } else {
    linkScore = 10;
  }
  checks.internalLinks = { passed: linkScore >= 7, score: linkScore, maxScore: 10, detail: `${links.length} lien(s)` };
  totalScore += linkScore;
  maxScore += 10;

  // ── 7. Content depth (max 15pts) ──
  const wordCount = page.wordCount || 0;
  let contentScore = 0;
  if (wordCount > 0) {
    if (wordCount < 300) {
      contentScore = 3;
      issues.push({ type: "warning", message: `Contenu léger (${wordCount} mots, min recommandé 500)`, rule: "content_thin" });
    } else if (wordCount < 800) {
      contentScore = 8;
      issues.push({ type: "info", message: `Contenu correct (${wordCount} mots) — enrichir pour dépasser 1000 mots`, rule: "content_medium" });
    } else {
      contentScore = 15;
    }
  } else {
    contentScore = 8; // Unknown word count, assume average
    issues.push({ type: "info", message: "Nombre de mots non renseigné", rule: "content_unknown" });
  }
  checks.content = { passed: contentScore >= 10, score: contentScore, maxScore: 15, detail: wordCount > 0 ? `${wordCount} mots` : "non renseigné" };
  totalScore += contentScore;
  maxScore += 15;

  const normalizedScore = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;

  return { score: normalizedScore, issues, checks };
}

// ── Main handler ──────────────────────────────────────────
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

    // ── Step 1: Run deterministic checks on all pages ──
    const deterministicResults = new Map<string, DeterministicResult>();
    for (const page of pages) {
      deterministicResults.set(page.url, runDeterministicChecks(page));
    }

    // ── Step 2: AI semantic analysis (focused prompt, lighter) ──
    const semanticPrompt = `Tu es un expert SEO francophone. Analyse la QUALITÉ SÉMANTIQUE uniquement (pas les aspects techniques déjà mesurés) de ces pages d'un centre de formation Taxi/VTC/VMDTR à Montrouge (92).

Pour chaque page, évalue sur 100 :
- Pertinence du mot-clé principal dans title/H1/description
- Intention de recherche bien ciblée
- Qualité rédactionnelle du title et de la description (incitation au clic)
- Cohérence entre title, H1 et description
- Potentiel de cannibalisation avec d'autres pages

Réponds UNIQUEMENT avec un JSON valide (sans markdown, sans backticks) :
{
  "pages": [
    {
      "url": string,
      "semanticScore": number (0-100),
      "insights": [{ "type": "error" | "warning" | "info", "message": string }],
      "recommendations": [{ "category": string, "current": string, "suggested": string, "impact": "high" | "medium" | "low" }]
    }
  ],
  "globalRecommendations": [{ "category": string, "message": string, "priority": "high" | "medium" | "low" }]
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
          { role: "system", content: semanticPrompt },
          { role: "user", content: `Données des pages :\n${JSON.stringify(pages, null, 2)}` },
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

    let aiResult: any = { pages: [], globalRecommendations: [] };
    if (content) {
      try {
        const cleaned = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
        aiResult = JSON.parse(cleaned);
      } catch {
        console.error("Failed to parse AI response:", content);
      }
    }

    // ── Step 3: Merge scores (60% deterministic + 40% semantic) ──
    const DETERMINISTIC_WEIGHT = 0.6;
    const SEMANTIC_WEIGHT = 0.4;

    const mergedPages = pages.map((page: PageData) => {
      const det = deterministicResults.get(page.url)!;
      const aiPage = aiResult.pages?.find((p: any) => p.url === page.url);
      const semanticScore = aiPage?.semanticScore ?? 75; // default if AI didn't return this page

      const finalScore = Math.round(det.score * DETERMINISTIC_WEIGHT + semanticScore * SEMANTIC_WEIGHT);

      // Merge issues: deterministic + AI insights
      const allIssues = [
        ...det.issues.map(i => ({ type: i.type, message: `[Règle] ${i.message}` })),
        ...(aiPage?.insights || []).map((i: any) => ({ type: i.type, message: `[IA] ${i.message}` })),
      ];

      return {
        url: page.url,
        score: finalScore,
        deterministicScore: det.score,
        semanticScore,
        checks: det.checks,
        issues: allIssues,
        recommendations: aiPage?.recommendations || [],
      };
    });

    const overallScore = mergedPages.length > 0
      ? Math.round(mergedPages.reduce((s: number, p: any) => s + p.score, 0) / mergedPages.length)
      : 0;

    const totalErrors = mergedPages.reduce(
      (sum: number, p: any) => sum + (p.issues?.filter((i: any) => i.type === "error").length || 0), 0
    );
    const totalWarnings = mergedPages.reduce(
      (sum: number, p: any) => sum + (p.issues?.filter((i: any) => i.type === "warning").length || 0), 0
    );

    // ── Step 4: Cannibalization detection via AI ──
    let cannibalizationGroups: any[] = [];
    try {
      const pageSummaries = pages.map((p: PageData) => ({
        url: p.url,
        title: p.title,
        h1: p.h1,
        description: p.description,
      }));

      const canniPrompt = `Tu es un expert SEO. Analyse ces pages d'un site de formation Taxi/VTC/VMDTR et détecte les GROUPES DE CANNIBALISATION : des pages qui ciblent la même intention de recherche ou le même mot-clé principal et se font concurrence dans les SERPs.

Critères de cannibalisation :
- Mots-clés principaux quasi-identiques dans title/H1
- Même intention de recherche (informationnelle, transactionnelle, navigationnelle)
- Chevauchement sémantique fort entre descriptions
- Pages qui pourraient être fusionnées ou mieux différenciées

NE signale PAS comme cannibalisation :
- Des pages ciblant des professions différentes (taxi vs vtc vs vmdtr)
- Des pages avec des intentions clairement distinctes (formation initiale vs continue)
- Des pages géo-locales distinctes (villes différentes)

Réponds UNIQUEMENT avec un JSON valide (sans markdown, sans backticks) :
{
  "groups": [
    {
      "keyword": "mot-clé principal en compétition",
      "severity": "high" | "medium" | "low",
      "pages": [
        { "url": string, "title": string, "overlap_reason": string }
      ],
      "recommendation": "action recommandée pour résoudre la cannibalisation"
    }
  ]
}

Si aucune cannibalisation n'est détectée, retourne { "groups": [] }.`;

      const canniResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: canniPrompt },
            { role: "user", content: JSON.stringify(pageSummaries) },
          ],
        }),
      });

      if (canniResponse.ok) {
        const canniData = await canniResponse.json();
        const canniContent = canniData.choices?.[0]?.message?.content;
        if (canniContent) {
          try {
            const cleaned = canniContent.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
            const canniResult = JSON.parse(cleaned);
            cannibalizationGroups = canniResult.groups || [];
          } catch {
            console.error("Failed to parse cannibalization response:", canniContent);
          }
        }
      } else {
        console.error("Cannibalization AI call failed:", canniResponse.status);
      }
    } catch (canniErr) {
      console.error("Cannibalization detection error:", canniErr);
    }

    const parsed = {
      overallScore,
      pages: mergedPages,
      globalRecommendations: aiResult.globalRecommendations || [],
      cannibalization: cannibalizationGroups,
      methodology: {
        deterministicWeight: DETERMINISTIC_WEIGHT,
        semanticWeight: SEMANTIC_WEIGHT,
        rules: ["title_length", "description_length", "h1_presence", "h1_uniqueness", "url_structure", "schema_presence", "internal_links", "content_depth"],
      },
    };

    // ── Save to database ──
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    try {
      await supabaseAdmin.from("seo_audits").insert({
        overall_score: parsed.overallScore,
        pages_count: mergedPages.length,
        total_errors: totalErrors,
        total_warnings: totalWarnings,
        audit_data: parsed,
      });
    } catch (saveErr) {
      console.error("Failed to save audit:", saveErr);
    }

    // ── Send alert email if below threshold ──
    let alertSent = false;
    if (alertConfig && parsed.overallScore < alertConfig.threshold) {
      try {
        const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
        if (RESEND_API_KEY && alertConfig.email) {
          const topErrors = mergedPages
            .filter((p: any) => p.issues?.some((i: any) => i.type === "error"))
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
                  <h2 style="color: #dc2626;">⚠️ Alerte SEO — Score hybride en dessous du seuil</h2>
                  <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
                    <tr>
                      <td style="padding: 8px 16px; background: #fef2f2; border-radius: 8px;">
                        <strong style="font-size: 28px; color: #dc2626;">${parsed.overallScore}/100</strong>
                        <br/><span style="color: #6b7280; font-size: 13px;">Score hybride (60% règles + 40% IA)</span>
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
                    ${mergedPages.length} pages analysées le ${new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                  </p>
                  <p style="color: #9ca3af; font-size: 11px;">Cet email est envoyé automatiquement par le système d'audit SEO hybride d'ECOLE T3P.</p>
                </div>
              `,
            }),
          });

          if (emailRes.ok) {
            alertSent = true;
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
