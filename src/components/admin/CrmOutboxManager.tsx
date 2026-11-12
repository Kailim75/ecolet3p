import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Loader2, RefreshCw, RotateCcw } from "lucide-react";

interface OutboxRow {
  id: string;
  source_table: string;
  status: string;
  crm_result: string | null;
  attempts: number;
  last_attempt_at: string | null;
  last_error: string | null;
  created_at: string;
}

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
const RETRYABLE = ["failed", "needs_review"];

const fmt = (v: string | null) =>
  v ? new Date(v).toLocaleString("fr-FR", { timeZone: "Europe/Paris", dateStyle: "short", timeStyle: "short" }) : "—";

export default function CrmOutboxManager() {
  const [rows, setRows] = useState<OutboxRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("crm_lead_outbox")
      .select("id, source_table, status, crm_result, attempts, last_attempt_at, last_error, created_at")
      .order("created_at", { ascending: false })
      .limit(100);
    if (error) toast.error("Impossible de charger la file CRM");
    setRows((data as OutboxRow[]) ?? []);
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
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {(["pending", "sent", "needs_review", "failed"] as const).map((k) => (
          <div key={k} className="rounded-lg border border-border p-3">
            <div className="text-xs text-muted-foreground">{STATUS_LABELS[k]}</div>
            <div className="text-xl font-semibold">{counts[k]}</div>
          </div>
        ))}
      </div>
      {loading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : rows.length === 0 ? (
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
              {RETRYABLE.includes(r.status) && (
                <Button className="ml-auto" variant="outline" size="sm" disabled={busy === r.id} onClick={() => requeue(r)}>
                  <RotateCcw className="w-4 h-4 mr-1" /> Reprendre
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
