import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

type Res = { data: unknown; error: unknown };
const h = vi.hoisted(() => ({ outbox: [] as Res[], source: [] as Res[], session: [] as Res[], selects: [] as string[][], updates: 0, invokes: 0 }));

vi.mock("@/integrations/supabase/client", () => {
  const builder = (table: string) => {
    const b: Record<string, unknown> = {};
    const chain = () => b;
    b.select = (cols: string) => { h.selects.push([table, cols]); return b; };
    b.order = chain; b.eq = chain; b.in = chain;
    b.update = () => { h.updates++; return b; };
    b.limit = async () => h.outbox.shift();
    b.maybeSingle = async () => (table === "formation_sessions" ? h.session.shift() : h.source.shift());
    return b;
  };
  return { supabase: { from: (t: string) => builder(t), functions: { invoke: async () => { h.invokes++; return { data: {}, error: null }; } } } };
});
vi.mock("sonner", () => ({ toast: { error: vi.fn(), success: vi.fn() } }));

import CrmOutboxManager from "@/components/admin/CrmOutboxManager";

const base = { crm_result: null, attempts: 1, last_attempt_at: null, last_error: null, created_at: "2026-11-12T10:00:00Z" };
const review = { ...base, id: "o1", source_table: "pre_registrations", source_id: "p1", status: "needs_review" };
const failed = { ...base, id: "o2", source_table: "contact_requests", source_id: "c1", status: "failed" };
const sim = { ...base, id: "o3", source_table: "simulations", source_id: "s1", status: "needs_review" };

beforeEach(() => { h.outbox = []; h.source = []; h.session = []; h.selects = []; h.updates = 0; h.invokes = 0; });

describe("CrmOutboxManager", () => {
  it("offers Reprendre only for failed rows, manual handling for needs_review, and the 100-row scope", async () => {
    h.outbox.push({ data: [review, failed], error: null });
    render(<CrmOutboxManager />);
    expect(await screen.findByText("Traitement manuel requis")).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /Reprendre/ })).toHaveLength(1);
    expect(screen.getAllByRole("button", { name: /Voir la demande/ })).toHaveLength(2);
    expect(screen.getByText(/100 dernières demandes/)).toBeInTheDocument();
    expect(h.selects[0][1]).toContain("source_id");
  });

  it("shows an error with Réessayer instead of an empty queue", async () => {
    h.outbox.push({ data: null, error: { message: "boom" } }, { data: [failed], error: null });
    render(<CrmOutboxManager />);
    expect(await screen.findByText("Impossible de charger la file CRM.")).toBeInTheDocument();
    expect(screen.queryByText("Aucune demande dans la file.")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Réessayer" }));
    expect(await screen.findByRole("button", { name: /Reprendre/ })).toBeInTheDocument();
  });

  it("opens a read-only dialog with whitelisted source data and session, without sending or updating", async () => {
    h.outbox.push({ data: [review], error: null });
    h.source.push({ data: { id: "p1", first_name: "Lea", last_name: "Martin", email: "l@m.fr", phone: "0600", formation_title: "Formation continue VTC", formation_duration: "14 heures", message: "Je veux préparer le test VTC", session_id: "s9", status: "pending" }, error: null });
    h.session.push({ data: { start_date: "2026-11-30", end_date: "2026-12-01", start_time: "09:30:00", end_time: "17:30:00", notes: null }, error: null });
    render(<CrmOutboxManager />);
    fireEvent.click(await screen.findByRole("button", { name: /Voir la demande/ }));
    expect(await screen.findByText("Lea Martin")).toBeInTheDocument();
    expect(screen.getByText("Je veux préparer le test VTC")).toBeInTheDocument();
    expect(screen.getByText("Du 30/11/2026 au 01/12/2026, 09:30–17:30")).toBeInTheDocument();
    expect(screen.getByText(/À traiter manuellement/)).toBeInTheDocument();
    const src = h.selects.find(([t]) => t === "pre_registrations")![1];
    expect(src).not.toContain("*");
    expect(h.updates).toBe(0);
    expect(h.invokes).toBe(0);
  });

  it("never requests simulation financial columns", async () => {
    h.outbox.push({ data: [sim], error: null });
    h.source.push({ data: { id: "s1", first_name: "Sam", email: "s@x.fr", profession: "vtc" }, error: null });
    render(<CrmOutboxManager />);
    fireEvent.click(await screen.findByRole("button", { name: /Voir la demande/ }));
    expect(await screen.findByText("Sam")).toBeInTheDocument();
    const cols = h.selects.find(([t]) => t === "simulations")![1];
    for (const f of ["revenue", "charges", "net", "projection", "scenario", "roi", "fare"]) expect(cols).not.toContain(f);
  });

  it("shows a dialog load error with Réessayer", async () => {
    h.outbox.push({ data: [review], error: null });
    h.source.push({ data: null, error: { message: "x" } }, { data: { id: "p1", first_name: "Lea", last_name: "M", email: "l@m.fr", status: "pending" }, error: null });
    render(<CrmOutboxManager />);
    fireEvent.click(await screen.findByRole("button", { name: /Voir la demande/ }));
    expect(await screen.findByText("Impossible de charger la demande.")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Réessayer" }));
    await waitFor(() => expect(screen.getByText("Lea M")).toBeInTheDocument());
  });
});
