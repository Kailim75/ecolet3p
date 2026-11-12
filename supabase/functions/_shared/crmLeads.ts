// Pure logic for the ecolet3p.fr -> CRM lead link. No Deno/Node globals: unit-tested with vitest.

export type SourceTable = "pre_registrations" | "contact_requests" | "appointments" | "simulations";
export type Row = Record<string, unknown>;

export interface CrmLeadPayload {
  source_site: "ecolet3p.fr";
  source_table: SourceTable;
  source_id: string;
  created_at: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  formation_title: string | null;
  message: string | null;
  session_requested: string | null;
}

export interface OutboxRow { id: string; source_table: SourceTable; source_id: string; lock_token: string; attempts: number }

const str = (v: unknown): string | null => {
  if (v === null || v === undefined) return null;
  const s = String(v).trim();
  return s ? s : null;
};

const join = (parts: Array<string | null>, sep = " — ") => {
  const kept = parts.filter((p): p is string => !!p);
  return kept.length ? kept.join(sep) : null;
};

export function isTestLead(...values: unknown[]): boolean {
  return values.some((v) => {
    const s = str(v);
    return !!s && (/(^|[^\p{L}])test([^\p{L}]|$)/iu.test(s) || /ne\s+pas\s+traiter/i.test(s));
  });
}

export function isCancelled(status: unknown): boolean {
  const s = (str(status) ?? "").toLowerCase();
  return ["cancelled", "canceled", "annulé", "annule", "annulée", "annulee"].includes(s);
}

// Contact form / quote codes -> labels. Unknown values are passed through; never default to VTC.
const FORMATION_LABELS: Record<string, string> = {
  taxi: "Formation Taxi",
  vtc: "Formation VTC",
  vmdtr: "Formation VMDTR (taxi moto)",
  mobilite: "Passerelle / mobilité",
  continue: "Formation continue",
  "continue-vtc": "Formation continue VTC",
  "continue-taxi": "Formation continue Taxi",
  "continue-vmdtr": "Formation continue VMDTR",
  "recup-points": "Récupération de points",
};
export const formationLabel = (v: unknown) => {
  const s = str(v);
  return s ? FORMATION_LABELS[s.toLowerCase()] ?? s : null;
};

const fmtDate = (v: unknown) => {
  const s = str(v);
  if (!s || !/^\d{4}-\d{2}-\d{2}/.test(s)) return s;
  const [y, m, d] = s.slice(0, 10).split("-");
  return `${d}/${m}/${y}`;
};
const fmtTime = (v: unknown) => str(v)?.slice(0, 5) ?? null;

export function sessionLabel(session: Row | null | undefined): string | null {
  if (!session) return null;
  const start = fmtDate(session.start_date);
  const end = fmtDate(session.end_date);
  const period = start && end && end !== start ? `du ${start} au ${end}` : start ? `le ${start}` : null;
  const hours = fmtTime(session.start_time) && fmtTime(session.end_time)
    ? `${fmtTime(session.start_time)}–${fmtTime(session.end_time)}` : null;
  return join([period ? `Session ${period}` : null, hours], ", ");
}

function splitName(full: unknown): [string | null, string | null] {
  const s = str(full);
  if (!s) return [null, null];
  const [first, ...rest] = s.split(/\s+/);
  return [first, rest.length ? rest.join(" ") : null];
}

export type BuildResult = { skip: "cancelled" | "test" | "no_contact" | "missing" } | { payload: CrmLeadPayload };

/** Builds the exact contract payload from the source row, re-checking cancel/test at send time. */
export function buildPayload(table: SourceTable, row: Row | null, session?: Row | null): BuildResult {
  if (!row) return { skip: "missing" };
  const base = { source_site: "ecolet3p.fr" as const, source_table: table, source_id: String(row.id), created_at: new Date(String(row.created_at)).toISOString() };

  if (table === "pre_registrations") {
    if (isCancelled(row.status)) return { skip: "cancelled" };
    if (isTestLead(row.first_name, row.last_name, row.email, row.message)) return { skip: "test" };
    const duration = str(row.formation_duration);
    return { payload: { ...base,
      first_name: str(row.first_name), last_name: str(row.last_name), email: str(row.email), phone: str(row.phone),
      formation_title: str(row.formation_title), message: str(row.message),
      session_requested: join([duration === "Devis demandé" ? "Demande de devis" : duration, sessionLabel(session)]),
    } };
  }
  if (table === "contact_requests") {
    if (isCancelled(row.status)) return { skip: "cancelled" };
    if (isTestLead(row.full_name, row.email, row.message)) return { skip: "test" };
    const [first, last] = splitName(row.full_name);
    return { payload: { ...base, first_name: first, last_name: last, email: str(row.email), phone: str(row.phone),
      formation_title: formationLabel(row.formation), message: str(row.message), session_requested: null } };
  }
  if (table === "appointments") {
    if (isCancelled(row.status)) return { skip: "cancelled" };
    if (isTestLead(row.first_name, row.last_name, row.email, row.notes)) return { skip: "test" };
    const when = join([fmtDate(row.appointment_date), fmtTime(row.appointment_time)], " à ");
    return { payload: { ...base, first_name: str(row.first_name), last_name: str(row.last_name), email: str(row.email),
      phone: null, formation_title: formationLabel(row.formation_choice), message: str(row.notes),
      session_requested: when ? `Rendez-vous le ${when}` : null } };
  }
  // simulations: contact + profession + origin only; never revenue figures
  if (!str(row.email) && !str(row.phone)) return { skip: "no_contact" };
  if (isTestLead(row.first_name, row.last_name, row.email)) return { skip: "test" };
  return { payload: { ...base, first_name: str(row.first_name), last_name: str(row.last_name), email: str(row.email),
    phone: str(row.phone), formation_title: null,
    message: join(["Simulateur de revenus", str(row.profession) ? `profession : ${str(row.profession)}` : null]),
    session_requested: null } };
}

// Endpoint must be HTTPS, on an allowed host, pointing at receive-website-lead.
export function validateEndpoint(raw: string | undefined | null): URL | null {
  if (!raw) return null;
  let url: URL;
  try { url = new URL(raw); } catch { return null; }
  if (url.protocol !== "https:" || url.username || url.password) return null;
  const host = url.hostname.toLowerCase();
  const allowed = host === "t3pcampus.net" || host.endsWith(".t3pcampus.net") || /^[a-z0-9]{20}\.supabase\.co$/.test(host);
  if (!allowed || !url.pathname.replace(/\/+$/, "").endsWith("/receive-website-lead")) return null;
  return url;
}

export type Outcome = { outcome: "sent" | "needs_review" | "ignored" | "retry"; crm_result?: string; error?: string };

/** Interprets the CRM HTTP response. Non-2xx or unknown results are never marked delivered. */
export function interpretResponse(status: number, body: unknown): Outcome {
  if (status < 200 || status >= 300) return { outcome: "retry", error: `http_${status}` };
  const b = (body ?? {}) as Record<string, unknown>;
  const result = String(b.result ?? b.status ?? "").toLowerCase();
  if (result === "inserted" || result === "matched") return { outcome: "sent", crm_result: result };
  if (result === "needs_review") return { outcome: "needs_review", crm_result: result };
  if (result === "ignored") return { outcome: "ignored", crm_result: result };
  return { outcome: "retry", error: "bad_response" };
}

export interface PushDeps {
  claim(limit: number, leaseSeconds: number): Promise<OutboxRow[]>;
  complete(id: string, lockToken: string, o: Outcome): Promise<void>;
  loadSource(table: SourceTable, id: string): Promise<Row | null>;
  loadSession(id: string): Promise<Row | null>;
  fetch: typeof fetch;
}

export interface PushConfig { endpoint?: string | null; token?: string | null; batch?: number; leaseSeconds?: number; timeoutMs?: number }

export type PushSummary = { status: "not_configured" } | { status: "ok"; processed: number; sent: number; review: number; ignored: number; retry: number };

export async function pushBatch(deps: PushDeps, cfg: PushConfig): Promise<PushSummary> {
  const url = validateEndpoint(cfg.endpoint);
  const token = cfg.token?.trim();
  if (!url || !token) return { status: "not_configured" }; // fail closed, nothing claimed

  const rows = await deps.claim(Math.min(cfg.batch ?? 10, 25), cfg.leaseSeconds ?? 300);
  const s = { status: "ok" as const, processed: rows.length, sent: 0, review: 0, ignored: 0, retry: 0 };
  for (const row of rows) {
    let o: Outcome;
    try {
      const source = await deps.loadSource(row.source_table, row.source_id);
      const session = row.source_table === "pre_registrations" && source?.session_id
        ? await deps.loadSession(String(source.session_id)) : null;
      const built = buildPayload(row.source_table, source, session);
      if ("skip" in built) {
        o = { outcome: "ignored", crm_result: `local_${built.skip}` };
      } else {
        const ctrl = new AbortController();
        const timer = setTimeout(() => ctrl.abort(), cfg.timeoutMs ?? 8000);
        try {
          const res = await deps.fetch(url.toString(), {
            method: "POST", signal: ctrl.signal, redirect: "error",
            headers: { "Content-Type": "application/json", "x-website-token": token },
            body: JSON.stringify(built.payload),
          });
          let body: unknown = null;
          try { body = await res.json(); } catch { /* non-JSON */ }
          o = interpretResponse(res.status, body);
        } catch (e) {
          o = { outcome: "retry", error: (e as Error)?.name === "AbortError" ? "timeout" : "network_error" };
        } finally { clearTimeout(timer); }
      }
    } catch {
      o = { outcome: "retry", error: "internal_error" };
    }
    await deps.complete(row.id, row.lock_token, o);
    if (o.outcome === "sent") s.sent++; else if (o.outcome === "needs_review") s.review++;
    else if (o.outcome === "ignored") s.ignored++; else s.retry++;
  }
  return s;
}
