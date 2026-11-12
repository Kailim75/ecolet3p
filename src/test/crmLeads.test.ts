import { describe, it, expect, vi } from "vitest";
import { buildPayload, pushBatch, validateEndpoint, interpretResponse, type PushDeps, type OutboxRow } from "../../supabase/functions/_shared/crmLeads";

const ENDPOINT = "https://zhgbbujqapcigmduuqiy.supabase.co/functions/v1/receive-website-lead";
const created = "2026-11-12T10:00:00.000Z";

describe("mapping", () => {
  it("pre-registration keeps title, duration, session and message; no VTC default", () => {
    const r = buildPayload("pre_registrations", { id: "p1", created_at: created, first_name: "Lea", last_name: "Martin", email: "l@m.fr", phone: "0600", formation_title: "Formation continue VTC", formation_duration: "14 heures", message: "Rappel le soir", status: "pending" },
      { start_date: "2026-11-30", end_date: "2026-12-01", start_time: "09:30:00", end_time: "17:30:00" });
    expect(r).toEqual({ payload: { source_site: "ecolet3p.fr", source_table: "pre_registrations", source_id: "p1", created_at: created,
      first_name: "Lea", last_name: "Martin", email: "l@m.fr", phone: "0600", formation_title: "Formation continue VTC",
      message: "Rappel le soir", session_requested: "14 heures — Session du 30/11/2026 au 01/12/2026, 09:30–17:30" } });
  });
  it("contact request splits name and leaves missing formation null", () => {
    const r = buildPayload("contact_requests", { id: "c1", created_at: created, full_name: "Jean De La Tour", email: "j@x.fr", phone: "07", formation: null, message: "Infos", status: "new" });
    expect("payload" in r && r.payload).toMatchObject({ first_name: "Jean", last_name: "De La Tour", formation_title: null, message: "Infos" });
    const t = buildPayload("contact_requests", { id: "c2", created_at: created, full_name: "A B", email: "a@b.fr", phone: "07", formation: "taxi", status: "new" });
    expect("payload" in t && t.payload.formation_title).toBe("Formation Taxi");
  });
  it("appointment carries date/time and never invents a phone", () => {
    const r = buildPayload("appointments", { id: "a1", created_at: created, first_name: "Ali", last_name: "Ben", email: "a@b.fr", formation_choice: "vmdtr", appointment_date: "2026-11-20", appointment_time: "14:00:00", notes: null, status: "pending" });
    expect("payload" in r && r.payload).toMatchObject({ phone: null, formation_title: "Formation VMDTR (taxi moto)", session_requested: "Rendez-vous le 20/11/2026 à 14:00" });
  });
  it("simulation sends contact and profession only, no revenue data", () => {
    const r = buildPayload("simulations", { id: "s1", created_at: created, first_name: "Sam", email: "s@x.fr", phone: null, profession: "vtc", monthly_revenue: 5000 });
    expect("payload" in r && r.payload).toMatchObject({ formation_title: null, message: "Simulateur de revenus — profession : vtc" });
    expect(JSON.stringify(r)).not.toContain("5000");
    expect(buildPayload("simulations", { id: "s2", created_at: created, profession: "vtc" })).toEqual({ skip: "no_contact" });
  });
  it("ignores tests and cancelled requests", () => {
    expect(buildPayload("contact_requests", { id: "c", created_at: created, full_name: "Paul TEST TECHNIQUE", email: "p@x.fr", status: "new" })).toEqual({ skip: "test" });
    expect(buildPayload("contact_requests", { id: "c", created_at: created, full_name: "NE PAS TRAITER", email: "a@x.fr", status: "new" })).toEqual({ skip: "test" });
    expect(buildPayload("pre_registrations", { id: "p", created_at: created, first_name: "Kati", email: "testads12112026@gmail.com", status: "pending" })).toEqual({ skip: "test" });
    expect(buildPayload("pre_registrations", { id: "p", created_at: created, first_name: "Lea", status: "cancelled" })).toEqual({ skip: "cancelled" });
    expect(buildPayload("appointments", { id: "a", created_at: created, first_name: "Lea", status: "annulé" })).toEqual({ skip: "cancelled" });
    expect(buildPayload("contact_requests", { id: "c", created_at: created, full_name: "Céleste Contest", status: "new" })).not.toHaveProperty("skip");
  });
});

describe("endpoint and response rules", () => {
  it("accepts only the exact verified CRM endpoint", () => {
    expect(validateEndpoint(ENDPOINT)).not.toBeNull();
    for (const bad of [
      "https://crm.t3pcampus.net/receive-website-lead",
      "https://abcdefghijklmnopqrst.supabase.co/functions/v1/receive-website-lead",
      "https://x.zhgbbujqapcigmduuqiy.supabase.co/functions/v1/receive-website-lead",
      ENDPOINT + "?a=1", ENDPOINT + "#f", ENDPOINT + "/",
      ENDPOINT.replace(".co/", ".co:443/"), ENDPOINT.replace(".co/", ".co:8443/"),
      ENDPOINT.replace("https://", "https://u:p@"), " " + ENDPOINT,
    ]) expect(validateEndpoint(bad), bad).toBeNull();
    expect(validateEndpoint(ENDPOINT.replace("https", "http"))).toBeNull();
    expect(validateEndpoint("https://evil.example.com/receive-website-lead")).toBeNull();
    expect(validateEndpoint("https://t3pcampus.net/other")).toBeNull();
    expect(validateEndpoint(undefined)).toBeNull();
  });
  it("never marks non-2xx or unknown answers as delivered", () => {
    expect(interpretResponse(500, { result: "inserted" }).outcome).toBe("retry");
    expect(interpretResponse(200, { result: "weird" }).outcome).toBe("retry");
    expect(interpretResponse(200, { result: "matched" }).outcome).toBe("sent");
    expect(interpretResponse(200, { result: "needs_review" }).outcome).toBe("needs_review");
    expect(interpretResponse(200, { result: "ignored" }).outcome).toBe("ignored");
    expect(interpretResponse(200, { status: "inserted" }).outcome).toBe("retry");
  });
  it("is compatible with the exact CRM answer {result, reference, rejeu}", () => {
    expect(interpretResponse(200, { result: "inserted", reference: "L-1", rejeu: false })).toEqual({ outcome: "sent", crm_result: "inserted" });
    expect(interpretResponse(200, { result: "matched", reference: "L-1", rejeu: true })).toEqual({ outcome: "sent", crm_result: "matched" });
    expect(interpretResponse(201, { result: "needs_review", reference: "L-2", rejeu: false }).outcome).toBe("needs_review");
    expect(interpretResponse(200, { result: "ignored", reference: null, rejeu: false }).outcome).toBe("ignored");
  });
});

describe("test markers counter-examples (real leads are kept)", () => {
  const keep = (r: unknown) => expect(r).not.toHaveProperty("skip");
  it("never ignores the word test in a normal message or names containing these letters", () => {
    keep(buildPayload("pre_registrations", { id: "p", created_at: created, first_name: "Lea", email: "l@m.fr", message: "Je veux préparer le test VTC", status: "pending" }));
    keep(buildPayload("contact_requests", { id: "c", created_at: created, full_name: "Ana", email: "a@x.fr", message: "Test de positionnement ?", status: "new" }));
    keep(buildPayload("appointments", { id: "a", created_at: created, first_name: "Ali", email: "a@x.fr", notes: "test", status: "pending" }));
    keep(buildPayload("contact_requests", { id: "c", created_at: created, full_name: "Céleste Contest", email: "c@x.fr", status: "new" }));
    keep(buildPayload("contact_requests", { id: "c", created_at: created, full_name: "Jean Testard", email: "testard@x.fr", status: "new" }));
    keep(buildPayload("contact_requests", { id: "c", created_at: created, full_name: "Paul Test", email: "p@x.fr", status: "new" }));
    keep(buildPayload("contact_requests", { id: "c", created_at: created, full_name: "Ana", email: "a@x.fr", message: "NE PAS TRAITER svp rappel", status: "new" }));
  });
});

function makeDeps(rows: OutboxRow[], fetchImpl: PushDeps["fetch"], source: Record<string, unknown> | null = { id: "c1", created_at: created, full_name: "Jean Real", email: "j@x.fr", phone: "07", status: "new" }) {
  const complete = vi.fn(async () => {});
  const claim = vi.fn(async () => rows);
  return { deps: { claim, complete, loadSource: vi.fn(async () => source), loadSession: vi.fn(async () => null), fetch: fetchImpl } as PushDeps, complete, claim };
}
const row: OutboxRow = { id: "o1", source_table: "contact_requests", source_id: "c1", lock_token: "lt", attempts: 1 };
const json = (status: number, body: unknown) => new Response(JSON.stringify(body), { status });

describe("pushBatch", () => {
  it("refuses closed without configuration and claims nothing", async () => {
    const f = vi.fn();
    const { deps, claim } = makeDeps([row], f as never);
    expect(await pushBatch(deps, { endpoint: ENDPOINT, token: "" })).toEqual({ status: "not_configured" });
    expect(await pushBatch(deps, { endpoint: "http://x/receive-website-lead", token: "t" })).toEqual({ status: "not_configured" });
    expect(claim).not.toHaveBeenCalled();
    expect(f).not.toHaveBeenCalled();
  });
  it("sends the exact contract with the token header and marks sent", async () => {
    const f = vi.fn(async () => json(200, { result: "inserted" }));
    const { deps, complete } = makeDeps([row], f as never);
    await pushBatch(deps, { endpoint: ENDPOINT, token: "tok" });
    const [, init] = f.mock.calls[0] as unknown as [string, RequestInit];
    expect((init.headers as Record<string, string>)["x-website-token"]).toBe("tok");
    expect(Object.keys(JSON.parse(String(init.body))).sort()).toEqual(["created_at", "email", "first_name", "formation_title", "last_name", "message", "phone", "session_requested", "source_id", "source_site", "source_table"]);
    expect(complete).toHaveBeenCalledWith("o1", "lt", { outcome: "sent", crm_result: "inserted" });
  });
  it("schedules a retry on HTTP error, network error and timeout", async () => {
    for (const [impl, err] of [
      [async () => json(503, {}), "http_503"],
      [async () => { throw new TypeError("x"); }, "network_error"],
      [(_u: string, init: RequestInit) => new Promise((_, rej) => init.signal!.addEventListener("abort", () => rej(Object.assign(new Error("a"), { name: "AbortError" })))), "timeout"],
    ] as const) {
      const { deps, complete } = makeDeps([row], impl as never);
      await pushBatch(deps, { endpoint: ENDPOINT, token: "tok", timeoutMs: 20 });
      expect(complete).toHaveBeenCalledWith("o1", "lt", { outcome: "retry", error: err });
    }
  });
  it("ignores a request cancelled before sending without calling the CRM", async () => {
    const f = vi.fn();
    const { deps, complete } = makeDeps([row], f as never, { id: "c1", created_at: created, full_name: "Jean", status: "cancelled" });
    await pushBatch(deps, { endpoint: ENDPOINT, token: "tok" });
    expect(f).not.toHaveBeenCalled();
    expect(complete).toHaveBeenCalledWith("o1", "lt", { outcome: "ignored", crm_result: "local_cancelled" });
  });
  it("replays the same source id on retry (CRM idempotency key unchanged)", async () => {
    const f = vi.fn(async () => json(200, { result: "matched" }));
    const { deps } = makeDeps([row], f as never);
    await pushBatch(deps, { endpoint: ENDPOINT, token: "tok" });
    await pushBatch(deps, { endpoint: ENDPOINT, token: "tok" });
    const ids = f.mock.calls.map((c) => JSON.parse(String((c as unknown as [string, RequestInit])[1].body)).source_id);
    expect(ids).toEqual(["c1", "c1"]);
  });
  it("caps the batch size", async () => {
    const { deps, claim } = makeDeps([], vi.fn() as never);
    await pushBatch(deps, { endpoint: ENDPOINT, token: "tok", batch: 500 });
    expect(claim).toHaveBeenCalledWith(25, 300);
  });
});

describe("no silent truncation", () => {
  it("keeps long messages intact and holds over-limit leads for review without calling the CRM", async () => {
    const msg9999 = "a".repeat(9999);
    const ok = buildPayload("contact_requests", { id: "c1", created_at: created, full_name: "Jean Real", email: "j@x.fr", message: msg9999, status: "new" });
    expect("payload" in ok && ok.payload.message).toBe(msg9999);
    const f = vi.fn();
    const long = makeDeps([row], f as unknown as PushDeps["fetch"], { id: "c1", created_at: created, full_name: "Jean Real", email: "j@x.fr", message: "a".repeat(10001), status: "new" });
    const s = await pushBatch(long.deps, { endpoint: ENDPOINT, token: "t" });
    expect(f).not.toHaveBeenCalled();
    expect(long.complete).toHaveBeenCalledWith("o1", "lt", expect.objectContaining({ outcome: "needs_review", crm_result: "local_too_long" }));
    expect(s).toMatchObject({ sent: 0, review: 1 });
    const f2 = vi.fn();
    const sess = makeDeps([{ ...row, source_table: "pre_registrations", source_id: "p1" }], f2 as unknown as PushDeps["fetch"], { id: "p1", created_at: created, first_name: "Lea", email: "l@m.fr", formation_duration: "x".repeat(2001), status: "pending" });
    await pushBatch(sess.deps, { endpoint: ENDPOINT, token: "t" });
    expect(f2).not.toHaveBeenCalled();
    expect(sess.complete).toHaveBeenCalledWith("o1", "lt", expect.objectContaining({ outcome: "needs_review" }));
  });
});
