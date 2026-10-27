import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const ALLOWED_ORIGINS = [
  "https://ecolet3p.fr",
  "https://www.ecolet3p.fr",
  "https://ecolet3p.lovable.app",
  "https://id-preview--4d214708-ccf7-4a10-9cb5-0493cee9937c.lovable.app",
  "http://localhost:8080",
  "http://localhost:5173",
];

const buildCorsHeaders = (origin: string | null) => {
  const allowed = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin",
  };
};

// Mêmes règles anti-énumération que exam-result-lookup (journal partagé)
const MAX_FAILED_ATTEMPTS = 8;
const WINDOW_MINUTES = 60;
// Règles de réservation
const MAX_ACTIVE_BOOKINGS = 3;
const MIN_NOTICE_HOURS = 12;
const CANCEL_NOTICE_HOURS = 24;
const HORIZON_DAYS = 60;

const sha256 = async (value: string) => {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, "0")).join("");
};

const categoryOf = (examType: string) => examType.trim().split(/\s+/)[0]?.toUpperCase() ?? "";

Deno.serve(async (req) => {
  const corsHeaders = buildCorsHeaders(req.headers.get("origin"));
  // Toujours 200 + champ status : supabase.functions.invoke masque le corps des réponses non-2xx
  const reply = (body: Record<string, unknown>) =>
    new Response(JSON.stringify(body), {
      headers: { ...corsHeaders, "Content-Type": "application/json", "Cache-Control": "no-store" },
    });

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, dossierNumber, birthDate, slotId, bookingId, phone } = await req.json();

    const dossier = String(dossierNumber ?? "").replace(/\D/g, "");
    if (!["list", "book", "cancel"].includes(action) || dossier.length < 5 || dossier.length > 10
      || !/^\d{4}-\d{2}-\d{2}$/.test(String(birthDate ?? ""))) {
      return reply({ status: "invalid" });
    }

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const ip = req.headers.get("cf-connecting-ip")
      || req.headers.get("x-forwarded-for")?.split(",")[0].trim()
      || "unknown";
    const ipHash = await sha256(`exam-result-lookup:${ip}`);
    const since = new Date(Date.now() - WINDOW_MINUTES * 60_000).toISOString();

    const { count } = await supabaseAdmin
      .from("exam_result_lookups")
      .select("id", { count: "exact", head: true })
      .eq("ip_hash", ipHash)
      .eq("success", false)
      .gte("created_at", since);
    if ((count ?? 0) >= MAX_FAILED_ATTEMPTS) {
      return reply({ status: "rate_limited" });
    }

    // Identification : résultat d'admissibilité publié, valide et admis
    const today = new Date().toISOString().slice(0, 10);
    const { data: result } = await supabaseAdmin
      .from("exam_results")
      .select("id, exam_type")
      .eq("dossier_number", dossier.padStart(8, "0"))
      .eq("birth_date", birthDate)
      .eq("result", "admis")
      .eq("is_published", true)
      .gte("expires_at", today)
      .order("exam_date", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!result) {
      await supabaseAdmin.from("exam_result_lookups").insert({ ip_hash: ipHash, success: false });
      return reply({ status: "not_found" });
    }

    const category = categoryOf(result.exam_type);

    if (action === "book") {
      const cleanPhone = String(phone ?? "").replace(/[^\d+ ]/g, "").trim();
      if (!slotId || cleanPhone.replace(/\D/g, "").length < 9) {
        return reply({ status: "invalid_phone" });
      }
      const { data: code, error } = await supabaseAdmin.rpc("book_driving_slot", {
        p_slot_id: slotId,
        p_exam_result_id: result.id,
        p_phone: cleanPhone,
        p_max_active: MAX_ACTIVE_BOOKINGS,
        p_min_notice: `${MIN_NOTICE_HOURS} hours`,
      });
      if (error) throw error;
      if (code !== "ok") return reply({ status: code });
    }

    if (action === "cancel") {
      const { data: booking } = await supabaseAdmin
        .from("driving_bookings")
        .select("id, driving_slots(starts_at)")
        .eq("id", bookingId)
        .eq("exam_result_id", result.id)
        .eq("status", "booked")
        .maybeSingle();
      const startsAt = (booking?.driving_slots as { starts_at: string } | null)?.starts_at;
      if (!booking || !startsAt) return reply({ status: "booking_not_found" });
      if (new Date(startsAt).getTime() - Date.now() < CANCEL_NOTICE_HOURS * 3_600_000) {
        return reply({ status: "too_late_to_cancel" });
      }
      const { error } = await supabaseAdmin
        .from("driving_bookings")
        .update({ status: "cancelled", cancelled_at: new Date().toISOString() })
        .eq("id", booking.id);
      if (error) throw error;
    }

    // État à jour : créneaux ouverts de sa catégorie + ses réservations à venir
    const now = Date.now();
    const { data: slots, error: slotsError } = await supabaseAdmin
      .from("driving_slots")
      .select("id, starts_at, duration_minutes, location, capacity, driving_bookings(exam_result_id, status)")
      .eq("is_open", true)
      .contains("exam_categories", [category])
      .gte("starts_at", new Date(now + MIN_NOTICE_HOURS * 3_600_000).toISOString())
      .lte("starts_at", new Date(now + HORIZON_DAYS * 86_400_000).toISOString())
      .order("starts_at");
    if (slotsError) throw slotsError;

    const { data: mine, error: mineError } = await supabaseAdmin
      .from("driving_bookings")
      .select("id, driving_slots(starts_at, duration_minutes, location)")
      .eq("exam_result_id", result.id)
      .eq("status", "booked");
    if (mineError) throw mineError;

    type SlotRef = { starts_at: string; duration_minutes: number; location: string };
    const bookings = (mine ?? [])
      .map((b) => ({ id: b.id, slot: b.driving_slots as SlotRef | null }))
      .filter((b): b is { id: string; slot: SlotRef } => !!b.slot && new Date(b.slot.starts_at).getTime() > now)
      .sort((a, b) => a.slot.starts_at.localeCompare(b.slot.starts_at))
      .map((b) => ({
        id: b.id,
        ...b.slot,
        cancellable: new Date(b.slot.starts_at).getTime() - now >= CANCEL_NOTICE_HOURS * 3_600_000,
      }));

    const available = (slots ?? [])
      .map((s) => {
        const active = (s.driving_bookings as { exam_result_id: string; status: string }[])
          .filter((b) => b.status === "booked");
        return {
          id: s.id,
          starts_at: s.starts_at,
          duration_minutes: s.duration_minutes,
          location: s.location,
          remaining: s.capacity - active.length,
          booked_by_me: active.some((b) => b.exam_result_id === result.id),
        };
      })
      .filter((s) => s.remaining > 0 && !s.booked_by_me)
      .map(({ booked_by_me: _mine, ...s }) => s);

    return reply({
      status: action === "list" ? "ok" : action === "book" ? "booked" : "cancelled",
      category,
      slots: available,
      bookings,
      maxBookings: MAX_ACTIVE_BOOKINGS,
      cancelNoticeHours: CANCEL_NOTICE_HOURS,
    });
  } catch (error) {
    console.error("driving-booking error:", error);
    return reply({ status: "error" });
  }
});
