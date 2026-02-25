import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { seoPages, type SEOPageInfo } from "@/data/seoPageData";
import {
  Loader2, Search as SearchIcon, AlertTriangle, CheckCircle, XCircle, Info,
  ArrowRight, Sparkles, RefreshCw, ChevronDown, ChevronUp, TrendingUp, History,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

// --- Types ---
interface Issue { type: "error" | "warning" | "info"; message: string; }
interface Recommendation { category: string; current: string; suggested: string; impact: "high" | "medium" | "low"; }
interface PageAudit { url: string; score: number; issues: Issue[]; recommendations: Recommendation[]; }
interface GlobalRec { category: string; message: string; priority: "high" | "medium" | "low"; }
interface AuditResult { overallScore: number; pages: PageAudit[]; globalRecommendations: GlobalRec[]; }
interface AuditHistory { id: string; overall_score: number; pages_count: number; total_errors: number; total_warnings: number; created_at: string; }

// --- Small Components ---
const ScoreBadge = ({ score }: { score: number }) => {
  const color =
    score >= 80 ? "bg-green-100 text-green-700 border-green-200" :
    score >= 60 ? "bg-yellow-100 text-yellow-700 border-yellow-200" :
    "bg-red-100 text-red-700 border-red-200";
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-sm font-bold border ${color}`}>
      {score}/100
    </span>
  );
};

const ImpactBadge = ({ impact }: { impact: string }) => {
  const styles: Record<string, string> = {
    high: "bg-red-50 text-red-600 border-red-200",
    medium: "bg-yellow-50 text-yellow-600 border-yellow-200",
    low: "bg-blue-50 text-blue-600 border-blue-200",
  };
  const labels: Record<string, string> = { high: "Impact élevé", medium: "Impact moyen", low: "Impact faible" };
  return (
    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border ${styles[impact] || styles.low}`}>
      {labels[impact] || impact}
    </span>
  );
};

const IssueIcon = ({ type }: { type: string }) => {
  if (type === "error") return <XCircle className="w-4 h-4 text-red-500 shrink-0" />;
  if (type === "warning") return <AlertTriangle className="w-4 h-4 text-yellow-500 shrink-0" />;
  return <Info className="w-4 h-4 text-blue-500 shrink-0" />;
};

// --- Score History Chart ---
const ScoreHistoryChart = ({ history }: { history: AuditHistory[] }) => {
  if (history.length === 0) return null;

  const chartData = history
    .slice()
    .reverse()
    .map(h => ({
      date: format(new Date(h.created_at), "dd MMM", { locale: fr }),
      score: h.overall_score,
      errors: h.total_errors,
      warnings: h.total_warnings,
    }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-border shadow-sm p-5"
    >
      <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
        <TrendingUp className="w-4 h-4 text-primary" />
        Évolution du score SEO
      </h3>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
          <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--background))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              fontSize: "12px",
            }}
          />
          <Line type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={2.5} dot={{ r: 4 }} name="Score" />
          <Line type="monotone" dataKey="errors" stroke="#ef4444" strokeWidth={1.5} dot={{ r: 3 }} name="Erreurs" />
          <Line type="monotone" dataKey="warnings" stroke="#eab308" strokeWidth={1.5} dot={{ r: 3 }} name="Avert." />
        </LineChart>
      </ResponsiveContainer>
      <div className="flex justify-center gap-6 mt-2 text-[10px] text-muted-foreground">
        <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-primary inline-block rounded" /> Score</span>
        <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-red-500 inline-block rounded" /> Erreurs</span>
        <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-yellow-500 inline-block rounded" /> Avertissements</span>
      </div>
    </motion.div>
  );
};

// --- Page Card ---
const PageCard = ({ page, audit }: { page: SEOPageInfo; audit?: PageAudit }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-4 flex items-center justify-between gap-3 text-left hover:bg-muted/30 transition-colors"
      >
        <div className="flex items-center gap-3 min-w-0">
          {audit ? <ScoreBadge score={audit.score} /> : <span className="text-xs text-muted-foreground">—</span>}
          <div className="min-w-0">
            <p className="font-medium text-sm text-foreground truncate">{page.url}</p>
            <p className="text-xs text-muted-foreground truncate">{page.title}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {audit && (
            <div className="flex gap-1">
              {audit.issues.filter(i => i.type === "error").length > 0 && (
                <Badge variant="destructive" className="text-[10px] px-1.5">
                  {audit.issues.filter(i => i.type === "error").length} erreur(s)
                </Badge>
              )}
              {audit.issues.filter(i => i.type === "warning").length > 0 && (
                <Badge variant="secondary" className="text-[10px] px-1.5 bg-yellow-100 text-yellow-700">
                  {audit.issues.filter(i => i.type === "warning").length} avert.
                </Badge>
              )}
            </div>
          )}
          {open ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-4 border-t border-border pt-3">
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Title ({page.title.length} car.)</p>
                  <p className="text-xs text-foreground bg-muted/50 p-2 rounded">{page.title}</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Description ({page.description.length} car.)</p>
                  <p className="text-xs text-foreground bg-muted/50 p-2 rounded">{page.description}</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">H1</p>
                  <p className="text-xs text-foreground bg-muted/50 p-2 rounded">{page.h1}</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Schémas JSON-LD</p>
                  <div className="flex flex-wrap gap-1">
                    {page.hasSchema.map(s => (
                      <Badge key={s} variant="outline" className="text-[10px]">{s}</Badge>
                    ))}
                  </div>
                </div>
              </div>

              {audit && audit.issues.length > 0 && (
                <div>
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Problèmes détectés</p>
                  <div className="space-y-1.5">
                    {audit.issues.map((issue, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs">
                        <IssueIcon type={issue.type} />
                        <span className="text-foreground">{issue.message}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {audit && audit.recommendations.length > 0 && (
                <div>
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    <Sparkles className="w-3 h-3 inline mr-1" />
                    Recommandations IA
                  </p>
                  <div className="space-y-3">
                    {audit.recommendations.map((rec, i) => (
                      <div key={i} className="bg-muted/30 rounded-lg p-3 space-y-1.5">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-[10px] capitalize">{rec.category}</Badge>
                          <ImpactBadge impact={rec.impact} />
                        </div>
                        {rec.current && (
                          <div className="text-xs">
                            <span className="text-muted-foreground">Actuel : </span>
                            <span className="text-foreground line-through opacity-60">{rec.current}</span>
                          </div>
                        )}
                        {rec.suggested && (
                          <div className="text-xs flex items-start gap-1.5">
                            <ArrowRight className="w-3 h-3 text-primary mt-0.5 shrink-0" />
                            <span className="text-primary font-medium">{rec.suggested}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {!audit && (
                <p className="text-xs text-muted-foreground italic">Lancez l'audit IA pour obtenir des recommandations pour cette page.</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Main Dashboard ---
const SEODashboard = () => {
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const [history, setHistory] = useState<AuditHistory[]>([]);
  const [historyLoading, setHistoryLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setHistoryLoading(true);
    try {
      const { data, error } = await supabase
        .from("seo_audits")
        .select("id, overall_score, pages_count, total_errors, total_warnings, created_at")
        .order("created_at", { ascending: false })
        .limit(20);

      if (error) throw error;
      setHistory(data || []);
    } catch (err) {
      console.error("Error fetching SEO history:", err);
    } finally {
      setHistoryLoading(false);
    }
  };

  const runAudit = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("seo-audit", {
        body: { pages: seoPages },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      setAuditResult(data);
      toast.success("Audit SEO terminé !");
      // Refresh history after audit
      fetchHistory();
    } catch (err: any) {
      console.error("SEO audit error:", err);
      toast.error(err.message || "Erreur lors de l'audit SEO");
    } finally {
      setLoading(false);
    }
  };

  const filteredPages = seoPages.filter(
    p => p.url.toLowerCase().includes(filter.toLowerCase()) || p.title.toLowerCase().includes(filter.toLowerCase())
  );

  const getPageAudit = (url: string) => auditResult?.pages?.find(p => p.url === url);

  const totalErrors = auditResult?.pages?.reduce(
    (sum, p) => sum + (p.issues?.filter(i => i.type === "error").length || 0), 0
  ) || 0;
  const totalWarnings = auditResult?.pages?.reduce(
    (sum, p) => sum + (p.issues?.filter(i => i.type === "warning").length || 0), 0
  ) || 0;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Dashboard SEO
          </h2>
          <p className="text-sm text-muted-foreground">{seoPages.length} pages analysées • Recommandations IA</p>
        </div>
        <Button onClick={runAudit} disabled={loading} className="bg-primary hover:bg-primary/90">
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Analyse en cours…
            </>
          ) : (
            <>
              <RefreshCw className="w-4 h-4 mr-2" />
              Lancer l'audit IA
            </>
          )}
        </Button>
      </div>

      {/* Score History Chart */}
      {!historyLoading && history.length > 0 && (
        <ScoreHistoryChart history={history} />
      )}

      {/* History summary */}
      {!historyLoading && history.length > 0 && !auditResult && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-muted/30 rounded-xl p-4 border border-border"
        >
          <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
            <History className="w-4 h-4 text-muted-foreground" />
            Derniers audits
          </h3>
          <div className="space-y-2">
            {history.slice(0, 5).map(h => (
              <div key={h.id} className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">
                  {format(new Date(h.created_at), "dd MMM yyyy à HH:mm", { locale: fr })}
                </span>
                <div className="flex items-center gap-3">
                  <ScoreBadge score={h.overall_score} />
                  <span className="text-red-500">{h.total_errors} err.</span>
                  <span className="text-yellow-500">{h.total_warnings} avert.</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Score overview */}
      {auditResult && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          <div className="bg-white rounded-xl p-4 border border-border shadow-sm text-center">
            <p className="text-3xl font-bold text-primary">{auditResult.overallScore}</p>
            <p className="text-xs text-muted-foreground mt-1">Score global</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-border shadow-sm text-center">
            <p className="text-3xl font-bold text-foreground">{auditResult.pages?.length || 0}</p>
            <p className="text-xs text-muted-foreground mt-1">Pages auditées</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-border shadow-sm text-center">
            <p className="text-3xl font-bold text-red-600">{totalErrors}</p>
            <p className="text-xs text-muted-foreground mt-1">Erreurs</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-border shadow-sm text-center">
            <p className="text-3xl font-bold text-yellow-600">{totalWarnings}</p>
            <p className="text-xs text-muted-foreground mt-1">Avertissements</p>
          </div>
        </motion.div>
      )}

      {/* Global recommendations */}
      {auditResult?.globalRecommendations && auditResult.globalRecommendations.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-primary/5 border border-primary/20 rounded-xl p-5"
        >
          <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            Recommandations globales IA
          </h3>
          <div className="space-y-2">
            {auditResult.globalRecommendations.map((rec, i) => (
              <div key={i} className="flex items-start gap-3 text-sm">
                <ImpactBadge impact={rec.priority} />
                <div>
                  <span className="font-medium text-foreground">{rec.category}</span>
                  <span className="text-muted-foreground"> — {rec.message}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Search */}
      <div className="relative max-w-sm">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Filtrer par URL ou titre…"
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-sm border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {/* Pages list */}
      <div className="space-y-3">
        {filteredPages.map(page => (
          <PageCard key={page.url} page={page} audit={getPageAudit(page.url)} />
        ))}
      </div>
    </div>
  );
};

export default SEODashboard;
