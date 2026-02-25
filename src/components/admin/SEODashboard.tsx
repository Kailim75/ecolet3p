import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { seoPages, type SEOPageInfo } from "@/data/seoPageData";
import {
  Loader2, Search as SearchIcon, AlertTriangle, CheckCircle, XCircle, Info,
  ArrowRight, Sparkles, RefreshCw, ChevronDown, ChevronUp, TrendingUp, History,
  Bell, BellOff, Settings2, FileDown, Wrench, Check, X, Copy, ClipboardCheck,
} from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

// --- Types ---
interface Issue { type: "error" | "warning" | "info"; message: string; }
interface Recommendation { category: string; current: string; suggested: string; impact: "high" | "medium" | "low"; }
interface PageAudit { url: string; score: number; issues: Issue[]; recommendations: Recommendation[]; }
interface GlobalRec { category: string; message: string; priority: "high" | "medium" | "low"; }
interface AuditResult { overallScore: number; pages: PageAudit[]; globalRecommendations: GlobalRec[]; alertSent?: boolean; }
interface AuditHistory { id: string; overall_score: number; pages_count: number; total_errors: number; total_warnings: number; created_at: string; }
interface SEOFix {
  id: string;
  audit_id: string | null;
  page_url: string;
  fix_type: "metadata" | "jsonld" | "content";
  category: string;
  current_value: string | null;
  proposed_value: string;
  impact: "high" | "medium" | "low";
  ai_explanation: string | null;
  status: "pending" | "approved" | "rejected" | "applied";
  reviewed_at: string | null;
  created_at: string;
}

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

const FixTypeBadge = ({ type }: { type: string }) => {
  const styles: Record<string, string> = {
    metadata: "bg-purple-50 text-purple-600 border-purple-200",
    jsonld: "bg-indigo-50 text-indigo-600 border-indigo-200",
    content: "bg-emerald-50 text-emerald-600 border-emerald-200",
  };
  const labels: Record<string, string> = { metadata: "Métadonnées", jsonld: "JSON-LD", content: "Contenu" };
  return (
    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border ${styles[type] || styles.metadata}`}>
      {labels[type] || type}
    </span>
  );
};

const IssueIcon = ({ type }: { type: string }) => {
  if (type === "error") return <XCircle className="w-4 h-4 text-red-500 shrink-0" />;
  if (type === "warning") return <AlertTriangle className="w-4 h-4 text-yellow-500 shrink-0" />;
  return <Info className="w-4 h-4 text-blue-500 shrink-0" />;
};

// --- Alert Settings Panel ---
const AlertSettingsPanel = ({
  enabled, threshold, email, onEnabledChange, onThresholdChange, onEmailChange,
}: {
  enabled: boolean; threshold: number; email: string;
  onEnabledChange: (v: boolean) => void; onThresholdChange: (v: number) => void; onEmailChange: (v: string) => void;
}) => (
  <motion.div
    initial={{ opacity: 0, height: 0 }}
    animate={{ opacity: 1, height: "auto" }}
    exit={{ opacity: 0, height: 0 }}
    className="overflow-hidden"
  >
    <div className="bg-white rounded-xl border border-border shadow-sm p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {enabled ? <Bell className="w-4 h-4 text-primary" /> : <BellOff className="w-4 h-4 text-muted-foreground" />}
          <span className="text-sm font-semibold text-foreground">Alertes email automatiques</span>
        </div>
        <Switch checked={enabled} onCheckedChange={onEnabledChange} />
      </div>
      {enabled && (
        <div className="space-y-4 pt-2">
          <div>
            <label className="text-xs font-medium text-muted-foreground block mb-2">
              Seuil d'alerte : <span className="text-foreground font-bold">{threshold}/100</span>
            </label>
            <Slider
              value={[threshold]}
              onValueChange={([v]) => onThresholdChange(v)}
              min={30}
              max={95}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
              <span>30</span>
              <span>Alerte si score &lt; {threshold}</span>
              <span>95</span>
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground block mb-1">Email de notification</label>
            <input
              type="email"
              value={email}
              onChange={e => onEmailChange(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="montrouge@ecolet3p.fr"
            />
          </div>
        </div>
      )}
    </div>
  </motion.div>
);

// --- Score History Chart ---
const ScoreHistoryChart = ({ history, threshold }: { history: AuditHistory[]; threshold?: number }) => {
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
          {threshold && (
            <ReferenceLine
              y={threshold}
              stroke="#ef4444"
              strokeDasharray="6 4"
              label={{ value: `Seuil ${threshold}`, position: "insideTopRight", fontSize: 10, fill: "#ef4444" }}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
      <div className="flex justify-center gap-6 mt-2 text-[10px] text-muted-foreground">
        <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-primary inline-block rounded" /> Score</span>
        <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-red-500 inline-block rounded" /> Erreurs</span>
        <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-yellow-500 inline-block rounded" /> Avertissements</span>
        {threshold && <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-red-500 inline-block rounded border-dashed" /> Seuil alerte</span>}
      </div>
    </motion.div>
  );
};

// --- Fix Card ---
const FixCard = ({ fix, onApprove, onReject, updating }: {
  fix: SEOFix;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  updating: string | null;
}) => {
  const [copied, setCopied] = useState(false);

  const copyValue = () => {
    navigator.clipboard.writeText(fix.proposed_value);
    setCopied(true);
    toast.success("Valeur copiée !");
    setTimeout(() => setCopied(false), 2000);
  };

  const statusStyles: Record<string, string> = {
    pending: "border-yellow-200 bg-yellow-50/30",
    approved: "border-green-200 bg-green-50/30",
    rejected: "border-red-200 bg-red-50/30",
    applied: "border-primary/20 bg-primary/5",
  };
  const statusLabels: Record<string, string> = {
    pending: "⏳ En attente",
    approved: "✅ Approuvé",
    rejected: "❌ Rejeté",
    applied: "🚀 Appliqué",
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-lg border p-4 space-y-3 ${statusStyles[fix.status]}`}
    >
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <FixTypeBadge type={fix.fix_type} />
          <Badge variant="outline" className="text-[10px] capitalize">{fix.category}</Badge>
          <ImpactBadge impact={fix.impact} />
        </div>
        <span className="text-[10px] font-medium text-muted-foreground">{statusLabels[fix.status]}</span>
      </div>

      {fix.ai_explanation && (
        <p className="text-xs text-muted-foreground italic">{fix.ai_explanation}</p>
      )}

      {fix.current_value && (
        <div>
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Actuel</p>
          <div className="text-xs text-foreground bg-red-50 p-2 rounded border border-red-100 line-through opacity-70 whitespace-pre-wrap break-all max-h-32 overflow-auto">
            {fix.current_value}
          </div>
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-1">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Correction proposée</p>
          <button onClick={copyValue} className="text-muted-foreground hover:text-foreground transition-colors">
            {copied ? <ClipboardCheck className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
        <div className="text-xs text-primary font-medium bg-green-50 p-2 rounded border border-green-100 whitespace-pre-wrap break-all max-h-48 overflow-auto">
          {fix.proposed_value}
        </div>
      </div>

      {fix.status === "pending" && (
        <div className="flex items-center gap-2 pt-1">
          <Button
            size="sm"
            onClick={() => onApprove(fix.id)}
            disabled={updating === fix.id}
            className="bg-green-600 hover:bg-green-700 text-white text-xs h-8"
          >
            {updating === fix.id ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : <Check className="w-3 h-3 mr-1" />}
            Approuver
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onReject(fix.id)}
            disabled={updating === fix.id}
            className="text-xs h-8 border-red-200 text-red-600 hover:bg-red-50"
          >
            <X className="w-3 h-3 mr-1" />
            Rejeter
          </Button>
        </div>
      )}
    </motion.div>
  );
};

// --- Fixes Review Panel ---
const FixesReviewPanel = ({ fixes, onApprove, onReject, updating }: {
  fixes: SEOFix[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  updating: string | null;
}) => {
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const pendingCount = fixes.filter(f => f.status === "pending").length;
  const approvedCount = fixes.filter(f => f.status === "approved").length;

  const filtered = filterStatus === "all" ? fixes : fixes.filter(f => f.status === filterStatus);

  // Group by page
  const groupedByPage = filtered.reduce((acc, fix) => {
    if (!acc[fix.page_url]) acc[fix.page_url] = [];
    acc[fix.page_url].push(fix);
    return acc;
  }, {} as Record<string, SEOFix[]>);

  if (fixes.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-border shadow-sm p-5 space-y-4"
    >
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
          <Wrench className="w-4 h-4 text-primary" />
          Corrections IA à valider
          {pendingCount > 0 && (
            <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200 text-[10px]">
              {pendingCount} en attente
            </Badge>
          )}
          {approvedCount > 0 && (
            <Badge className="bg-green-100 text-green-700 border-green-200 text-[10px]">
              {approvedCount} approuvé(s)
            </Badge>
          )}
        </h3>
        <div className="flex gap-1">
          {["all", "pending", "approved", "rejected"].map(s => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`text-[10px] px-2 py-1 rounded-full border transition-colors ${
                filterStatus === s
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-muted-foreground border-border hover:bg-muted/50"
              }`}
            >
              {s === "all" ? "Tous" : s === "pending" ? "En attente" : s === "approved" ? "Approuvés" : "Rejetés"}
            </button>
          ))}
        </div>
      </div>

      {Object.entries(groupedByPage).map(([url, pageFixes]) => (
        <div key={url} className="space-y-2">
          <p className="text-xs font-semibold text-foreground border-b border-border pb-1">{url}</p>
          {pageFixes.map(fix => (
            <FixCard key={fix.id} fix={fix} onApprove={onApprove} onReject={onReject} updating={updating} />
          ))}
        </div>
      ))}
    </motion.div>
  );
};

// --- Page Card ---
const PageCard = ({ page, audit, onGenerateFixes, generatingFix }: {
  page: SEOPageInfo;
  audit?: PageAudit;
  onGenerateFixes: (pageAudit: PageAudit) => void;
  generatingFix: string | null;
}) => {
  const [open, setOpen] = useState(false);
  const hasIssues = audit && (audit.issues.length > 0 || audit.recommendations.length > 0);

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

              {/* Generate fixes button */}
              {audit && hasIssues && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onGenerateFixes(audit)}
                  disabled={generatingFix === audit.url}
                  className="border-primary/30 text-primary hover:bg-primary/5"
                >
                  {generatingFix === audit.url ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                      Génération des corrections…
                    </>
                  ) : (
                    <>
                      <Wrench className="w-3.5 h-3.5 mr-1.5" />
                      Générer les corrections IA
                    </>
                  )}
                </Button>
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
  const [alertEnabled, setAlertEnabled] = useState(() => localStorage.getItem("seo_alert_enabled") === "true");
  const [alertThreshold, setAlertThreshold] = useState(() => parseInt(localStorage.getItem("seo_alert_threshold") || "70", 10));
  const [alertEmail, setAlertEmail] = useState(() => localStorage.getItem("seo_alert_email") || "montrouge@ecolet3p.fr");
  const [showAlertSettings, setShowAlertSettings] = useState(false);
  const [fixes, setFixes] = useState<SEOFix[]>([]);
  const [generatingFix, setGeneratingFix] = useState<string | null>(null);
  const [updatingFix, setUpdatingFix] = useState<string | null>(null);
  const [lastAuditId, setLastAuditId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem("seo_alert_enabled", String(alertEnabled));
    localStorage.setItem("seo_alert_threshold", String(alertThreshold));
    localStorage.setItem("seo_alert_email", alertEmail);
  }, [alertEnabled, alertThreshold, alertEmail]);

  useEffect(() => {
    fetchHistory();
    fetchFixes();
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
      if (data && data.length > 0) setLastAuditId(data[0].id);
    } catch (err) {
      console.error("Error fetching SEO history:", err);
    } finally {
      setHistoryLoading(false);
    }
  };

  const fetchFixes = async () => {
    try {
      const { data, error } = await supabase
        .from("seo_fixes")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);

      if (error) throw error;
      setFixes((data as SEOFix[]) || []);
    } catch (err) {
      console.error("Error fetching fixes:", err);
    }
  };

  const runAudit = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("seo-audit", {
        body: {
          pages: seoPages,
          alertConfig: alertEnabled ? { threshold: alertThreshold, email: alertEmail } : undefined,
        },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      setAuditResult(data);

      if (data.alertSent) {
        toast.warning(`Score ${data.overallScore}/100 < seuil ${alertThreshold} — alerte email envoyée à ${alertEmail}`);
      } else {
        toast.success("Audit SEO terminé !");
      }
      fetchHistory();
    } catch (err: any) {
      console.error("SEO audit error:", err);
      toast.error(err.message || "Erreur lors de l'audit SEO");
    } finally {
      setLoading(false);
    }
  };

  const generateFixesForPage = async (pageAudit: PageAudit) => {
    setGeneratingFix(pageAudit.url);
    try {
      const { data, error } = await supabase.functions.invoke("seo-fix-proposal", {
        body: { pageAudit, auditId: lastAuditId },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      toast.success(`${data.fixes?.length || 0} corrections générées pour ${pageAudit.url}`);
      fetchFixes();
    } catch (err: any) {
      console.error("Fix generation error:", err);
      toast.error(err.message || "Erreur lors de la génération des corrections");
    } finally {
      setGeneratingFix(null);
    }
  };

  const updateFixStatus = async (fixId: string, status: "approved" | "rejected") => {
    setUpdatingFix(fixId);
    try {
      const newStatus = status === "approved" ? "applied" : status;
      const { error } = await supabase
        .from("seo_fixes")
        .update({ status: newStatus, reviewed_at: new Date().toISOString() })
        .eq("id", fixId);

      if (error) throw error;

      // When approving a metadata fix, upsert the override into seo_overrides
      if (status === "approved") {
        const fix = fixes.find(f => f.id === fixId);
        if (fix && fix.fix_type === "metadata") {
          // Map category to field name
          const categoryToField: Record<string, string> = {
            title: "title",
            description: "description",
            h1: "h1",
            og_title: "og_title",
            og_description: "og_description",
            meta_title: "title",
            meta_description: "description",
          };
          const field = categoryToField[fix.category] || fix.category;

          const { error: upsertErr } = await supabase
            .from("seo_overrides")
            .upsert(
              {
                page_url: fix.page_url,
                field,
                value: fix.proposed_value,
                source_fix_id: fix.id,
              },
              { onConflict: "page_url,field" }
            );

          if (upsertErr) {
            console.error("Failed to apply override:", upsertErr);
            toast.error("Correction approuvée mais erreur lors de l'application");
          } else {
            toast.success("Correction appliquée en production ! 🚀");
          }
        } else {
          toast.success("Correction approuvée ✅ (application manuelle requise pour ce type)");
        }
      } else {
        // If rejecting, also remove any existing override for this fix
        const fix = fixes.find(f => f.id === fixId);
        if (fix) {
          await supabase
            .from("seo_overrides")
            .delete()
            .eq("source_fix_id", fixId);
        }
        toast.success("Correction rejetée ❌");
      }

      setFixes(prev => prev.map(f => f.id === fixId ? { ...f, status: newStatus as any, reviewed_at: new Date().toISOString() } : f));
    } catch (err: any) {
      console.error("Fix update error:", err);
      toast.error("Erreur lors de la mise à jour");
    } finally {
      setUpdatingFix(null);
    }
  };

  const exportPDF = () => {
    if (!auditResult) {
      toast.error("Lancez d'abord un audit avant d'exporter.");
      return;
    }

    const doc = new jsPDF({ orientation: "landscape" });
    const now = format(new Date(), "dd/MM/yyyy HH:mm");

    doc.setFontSize(18);
    doc.setTextColor(30, 70, 50);
    doc.text("Rapport d'audit SEO — ECOLE T3P", 14, 18);
    doc.setFontSize(10);
    doc.setTextColor(120, 120, 120);
    doc.text(`Généré le ${now} • ${auditResult.pages?.length || 0} pages analysées`, 14, 25);

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Score global : ${auditResult.overallScore}/100`, 14, 35);
    doc.text(`Erreurs : ${totalErrors}   |   Avertissements : ${totalWarnings}`, 14, 42);

    const tableData = (auditResult.pages || []).map(p => {
      const errors = p.issues?.filter(i => i.type === "error").length || 0;
      const warnings = p.issues?.filter(i => i.type === "warning").length || 0;
      const topRec = p.recommendations?.[0]?.suggested || "—";
      return [p.url, `${p.score}/100`, String(errors), String(warnings), topRec.slice(0, 80)];
    });

    autoTable(doc, {
      startY: 48,
      head: [["URL", "Score", "Erreurs", "Avert.", "Recommandation principale"]],
      body: tableData,
      styles: { fontSize: 8, cellPadding: 2 },
      headStyles: { fillColor: [30, 70, 50], textColor: 255, fontSize: 9 },
      columnStyles: {
        0: { cellWidth: 70 },
        1: { cellWidth: 20, halign: "center" },
        2: { cellWidth: 18, halign: "center" },
        3: { cellWidth: 18, halign: "center" },
        4: { cellWidth: "auto" },
      },
      alternateRowStyles: { fillColor: [245, 245, 240] },
    });

    if (auditResult.globalRecommendations?.length) {
      doc.addPage();
      doc.setFontSize(14);
      doc.setTextColor(30, 70, 50);
      doc.text("Recommandations globales IA", 14, 18);

      const recData = auditResult.globalRecommendations.map(r => [
        r.priority === "high" ? "🔴 Élevé" : r.priority === "medium" ? "🟡 Moyen" : "🔵 Faible",
        r.category,
        r.message,
      ]);

      autoTable(doc, {
        startY: 24,
        head: [["Priorité", "Catégorie", "Recommandation"]],
        body: recData,
        styles: { fontSize: 9, cellPadding: 3 },
        headStyles: { fillColor: [30, 70, 50], textColor: 255 },
        columnStyles: { 0: { cellWidth: 25 }, 1: { cellWidth: 35 } },
      });
    }

    // Add approved fixes section
    const approvedFixes = fixes.filter(f => f.status === "approved");
    if (approvedFixes.length > 0) {
      doc.addPage();
      doc.setFontSize(14);
      doc.setTextColor(30, 70, 50);
      doc.text("Corrections approuvées", 14, 18);

      const fixData = approvedFixes.map(f => [
        f.page_url,
        f.fix_type === "metadata" ? "Méta" : f.fix_type === "jsonld" ? "JSON-LD" : "Contenu",
        f.category,
        (f.proposed_value || "").slice(0, 100),
      ]);

      autoTable(doc, {
        startY: 24,
        head: [["Page", "Type", "Catégorie", "Correction"]],
        body: fixData,
        styles: { fontSize: 8, cellPadding: 2 },
        headStyles: { fillColor: [30, 70, 50], textColor: 255 },
        columnStyles: { 0: { cellWidth: 60 }, 3: { cellWidth: "auto" } },
      });
    }

    doc.save(`audit-seo-ecolet3p-${format(new Date(), "yyyy-MM-dd")}.pdf`);
    toast.success("PDF exporté !");
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
        <div className="flex items-center gap-2">
          {auditResult && (
            <Button variant="outline" size="sm" onClick={exportPDF}>
              <FileDown className="w-4 h-4 mr-1.5" />
              Export PDF
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAlertSettings(!showAlertSettings)}
            className={alertEnabled ? "border-primary/50 text-primary" : ""}
          >
            <Settings2 className="w-4 h-4 mr-1.5" />
            Alertes
            {alertEnabled && (
              <Badge className="ml-1.5 text-[9px] px-1 py-0 bg-primary/10 text-primary border-primary/20">{alertThreshold}</Badge>
            )}
          </Button>
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
      </div>

      {/* Alert settings */}
      <AnimatePresence>
        {showAlertSettings && (
          <AlertSettingsPanel
            enabled={alertEnabled}
            threshold={alertThreshold}
            email={alertEmail}
            onEnabledChange={setAlertEnabled}
            onThresholdChange={setAlertThreshold}
            onEmailChange={setAlertEmail}
          />
        )}
      </AnimatePresence>

      {/* Score History Chart */}
      {!historyLoading && history.length > 0 && (
        <ScoreHistoryChart history={history} threshold={alertEnabled ? alertThreshold : undefined} />
      )}

      {/* Fixes Review Panel */}
      <FixesReviewPanel
        fixes={fixes}
        onApprove={(id) => updateFixStatus(id, "approved")}
        onReject={(id) => updateFixStatus(id, "rejected")}
        updating={updatingFix}
      />

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
                  {alertEnabled && h.overall_score < alertThreshold && (
                    <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
                  )}
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
          <PageCard
            key={page.url}
            page={page}
            audit={getPageAudit(page.url)}
            onGenerateFixes={generateFixesForPage}
            generatingFix={generatingFix}
          />
        ))}
      </div>
    </div>
  );
};

export default SEODashboard;
