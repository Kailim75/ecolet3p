import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Eye, Loader2, RefreshCw, RotateCcw } from "lucide-react";
import { SOURCE_COLUMNS, isCrmSourceTable } from "./crmSourceFields";

interface OutboxRow {
  id: string;
  source_table: string;
  source_id: string;
  status: string;
  crm_result: string | null;
  attempts: number;
  last_attempt_at: string | null;
  last_error: string | null;
  created_at: string;
}

const OUTBOX_LIMIT = 100;
const SOURCE_LABELS: Record<string, string> = {
  pre_registrations: "Pré-inscription",
  contact_requests: "Contact",
  appointments: "Rendez-vous",
  simulations: "Simulateur",
};
const STATUS_LABELS: Record<string, string> = {
  pending: "En attente", processing: "En cours", sent: "Envoyé",
  needs_review: "À vérifier", failed: "Échec", ignored: "Ignoré",
};
// Only technical failures can be retried; needs_review would return the same CRM outcome (idempotency).
const RETRYABLE = ["failed"];

const fmt = (v: string | null) =>
  v ? new Date(v).toLocaleString("fr-FR", { timeZone: "Europe/Paris", dateStyle: "short", timeStyle: "short" }) : "—";
const fmtDate = (v: unknown) => (typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v) ? v.split("-").reverse().join("/") : v ? String(v) : null);
const t = (v: unknown) => (v === null || v === undefined || v === "" ? null : String(v));

type Field = [string, string | null];
function toFields(table: string, r: Record<string, unknown>, session: Record<string, unknown> | null): Field[] {
  const name = table === "contact_requests" ? t(r.full_name) : [t(r.first_name), t(r.last_name)].filter(Boolean).join(" ") || null;
  const base: Field[] = [["Nom", name], ["Email", t(r.email)], ["Téléphone", t(r.phone)]];
  if (table === "pre_registrations") {
    const sess = session
      ? `Du ${fmtDate(session.start_date)} au ${fmtDate(session.end_date ?? session.start_date)}, ${t(session.start_time)?.slice(0, 5)}–${t(session.end_time)?.slice(0, 5)}${session.notes ? ` (${session.notes})` : ""}`
      : null;
    return [...base, ["Formation", t(r.formation_title)], ["Détail demandé", t(r.formation_duration)], ["Session", sess], ["Message", t(r.message)], ["Statut", t(r.status)]];
  }
  if (table === "contact_requests") return [...base, ["Formation", t(r.formation)], ["Message", t(r.message)], ["Statut", t(r.status)]];
  if (table === "appointments") return [...base, ["Formation", t(r.formation_choice)],
    ["Rendez-vous", [fmtDate(r.appointment_date), t(r.appointment_time)?.slice(0, 5)].filter(Boolean).join(" à ") || null], ["Notes", t(r.notes)], ["Statut", t(r.status)]];
  return [...base, ["Profession", t(r.profession)], ["Origine", t(r.source)]];
}

function LeadDialog({ row, onClose }: { row: OutboxRow | null; onClose: () => void }) {
  const [state, setState] = useState<{ s: "loading" } | { s: "error" } | { s: "missing" } | { s: "ok"; fields: Field[] }>({ s: "loading" });
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    if (!row) return;
    let alive = true;
    setState({ s: "loading" });
    (async () => {
      if (!isCrmSourceTable(row.source_table)) { setState({ s: "error" }); return; }
      const { data, error } = await supabase.from(row.source_table).select(SOURCE_COLUMNS[row.source_table]).eq("id", row.source_id).maybeSingle();
      if (!alive) return;
      if (error) { setState({ s: "error" }); return; }
      if (!data) { setState({ s: "missing" }); return; }
      const rec = data as unknown as Record<string, unknown>;
      let session: Record<string, unknown> | null = null;
      if (row.source_table === "pre_registrations" && rec.session_id) {
        const res = await supabase.from("formation_sessions").select("start_date, end_date, start_time, end_time, notes").eq("id", String(rec.session_id)).maybeSingle();
        if (!alive) return;
        if (res.error) { setState({ s: "error" }); return; }
        session = res.data as Record<string, unknown> | null;
      }
      setState({ s: "ok", fields: toFields(row.source_table, rec, session) });
    })();
    return () => { alive = false; };
  }, [row, retry]);

  return (
    <Dialog open={!!row} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{row ? SOURCE_LABELS[row.source_table] ?? row.source_table : ""} — demande</DialogTitle>
          <DialogDescription>
            Lecture seule. {row?.status === "needs_review" ? "À traiter manuellement : contactez la personne ou rapprochez-la dans le CRM. Ne pas relancer l'envoi." : ""}
          </DialogDescription>
        </DialogHeader>
        {state.s === "loading" && <p className="flex items-center gap-2 text-sm"><Loader2 className="w-4 h-4 animate-spin" /> Chargement de la demande…</p>}
        {state.s === "error" && (
          <div className="space-y-2 text-sm">
            <p role="alert" className="text-destructive">Impossible de charger la demande.</p>
            <Button size="sm" variant="outline" onClick={() => setRetry((n) => n + 1)}>Réessayer</Button>
          </div>
        )}
        {state.s === "missing" && <p className="text-sm text-muted-foreground">La demande d'origine n'existe plus.</p>}
        {state.s === "ok" && (
          <dl className="grid grid-cols-[8rem_1fr] gap-x-3 gap-y-2 text-sm">
            {state.fields.map(([k, v]) => (
              <div key={k} className="contents">
                <dt className="text-muted-foreground">{k}</dt>
                <dd className="whitespace-pre-wrap break-words">{v ?? "—"}</dd>
              </div>
            ))}
            <dt className="text-muted-foreground">Référence</dt><dd className="break-all text-xs">{row?.source_id}</dd>
          </dl>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default function CrmOutboxManager() {
  const [rows, setRows] = useState<OutboxRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);
  const [viewing, setViewing] = useState<OutboxRow | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("crm_lead_outbox")
      .select("id, source_table, source_id, status, crm_result, attempts, last_attempt_at, last_error, created_at")
      .order("created_at", { ascending: false })
      .limit(OUTBOX_LIMIT);
    setLoadError(!!error);
    if (!error) setRows((data as OutboxRow[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { pending: 0, sent: 0, needs_review: 0, failed: 0 };
    rows.forEach((r) => {
      const k = r.status === "processing" ? "pending" : r.status;
      if (k in c) c[k]++;
    });
    return c;
  }, [rows]);

  const requeue = async (row: OutboxRow) => {
    setBusy(row.id);
    const { error } = await supabase
      .from("crm_lead_outbox")
      .update({ status: "pending", attempts: 0, next_attempt_at: new Date().toISOString(), last_error: null })
      .eq("id", row.id)
      .in("status", RETRYABLE);
    setBusy(null);
    if (error) toast.error("Reprise refusée");
    else { toast.success("Demande remise en file"); load(); }
  };

  const pushNow = async () => {
    setBusy("push");
    const { data, error } = await supabase.functions.invoke("push-crm-leads", { body: {} });
    setBusy(null);
    if (error) toast.error("Liaison CRM non configurée ou indisponible");
    else toast.success(`Envoyées : ${data?.sent ?? 0}, à reprendre : ${data?.retry ?? 0}`);
    load();
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">Liaison CRM</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={load} disabled={loading}>
            <RefreshCw className="w-4 h-4 mr-1" /> Actualiser
          </Button>
          <Button size="sm" onClick={pushNow} disabled={busy === "push"}>
            {busy === "push" && <Loader2 className="w-4 h-4 mr-1 animate-spin" />} Envoyer maintenant
          </Button>
        </div>
      </div>
      {loading ? (
        <Loader2 className="w-5 h-5 animate-spin" aria-label="Chargement" />
      ) : loadError ? (
        <div className="space-y-2 rounded-lg border border-border p-3 text-sm">
          <p role="alert" className="text-destructive">Impossible de charger la file CRM.</p>
          <Button size="sm" variant="outline" onClick={load}>Réessayer</Button>
        </div>
      ) : (
        <>
          <p className="text-xs text-muted-foreground">
            Compteurs calculés sur les {OUTBOX_LIMIT} dernières demandes{rows.length < OUTBOX_LIMIT ? ` (${rows.length} au total)` : ""}.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {(["pending", "sent", "needs_review", "failed"] as const).map((k) => (
              <div key={k} className="rounded-lg border border-border p-3">
                <div className="text-xs text-muted-foreground">{STATUS_LABELS[k]}</div>
                <div className="text-xl font-semibold">{counts[k]}</div>
              </div>
            ))}
          </div>
          {rows.length === 0 ? (
            <p className="text-sm text-muted-foreground">Aucune demande dans la file.</p>
          ) : (
            <div className="divide-y divide-border rounded-lg border border-border">
              {rows.map((r) => (
                <div key={r.id} className="flex flex-wrap items-center gap-3 p-3 text-sm">
                  <span className="w-28 font-medium">{SOURCE_LABELS[r.source_table] ?? r.source_table}</span>
                  <Badge variant="secondary">{STATUS_LABELS[r.status] ?? r.status}</Badge>
                  <span className="text-muted-foreground">Reçue {fmt(r.created_at)}</span>
                  <span className="text-muted-foreground">Dernier essai {fmt(r.last_attempt_at)} ({r.attempts})</span>
                  {(r.last_error || r.crm_result) && (
                    <span className="text-xs text-muted-foreground">{r.last_error ?? r.crm_result}</span>
                  )}
                  {r.status === "needs_review" && (
                    <span className="text-xs font-medium">Traitement manuel requis</span>
                  )}
                  <div className="ml-auto flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => setViewing(r)}>
                      <Eye className="w-4 h-4 mr-1" /> Voir la demande
                    </Button>
                    {RETRYABLE.includes(r.status) && (
                      <Button variant="outline" size="sm" disabled={busy === r.id} onClick={() => requeue(r)}>
                        <RotateCcw className="w-4 h-4 mr-1" /> Reprendre
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
      <LeadDialog row={viewing} onClose={() => setViewing(null)} />
    </div>
  );
}
