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
const MAX_ACTIVE_BOOKINGS = 1;
const MIN_NOTICE_HOURS = 12;
const HORIZON_DAYS = 60;
// Séance de conduite : dans les N jours qui précèdent l'examen pratique, jamais le jour même ni après
const BOOKING_WINDOW_DAYS = 15;
// Renvoyée dans chaque réponse : permet de vérifier quelle version est déployée
const FUNCTION_VERSION = "2026-11-22.2-reservation-definitive";
// E-mails de confirmation (même expéditeur que les autres e-mails du site)
const EMAIL_FROM = "ECOLE T3P <montrouge@ecolet3p.fr>";
const SCHOOL_EMAIL = "montrouge@ecolet3p.fr";

const sha256 = async (value: string) => {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, "0")).join("");
};

const categoryOf = (examType: string) => examType.trim().split(/\s+/)[0]?.toUpperCase() ?? "";

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));

const TZ = "Europe/Paris";
const capitalize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);
const longDay = (iso: string) =>
  capitalize(new Date(iso).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: TZ }))
    .replace(/ 1 /, " 1er ");
const hour = (iso: string) =>
  new Date(iso).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit", timeZone: TZ }).replace(":", " h ");

interface ConfirmationData {
  fullName: string;
  slotStart: string;
  slotMinutes: number;
  slotLocation: string;
  examDate: string;
  examTime: string | null;
  examLocation: string | null;
}

const confirmationHtml = (d: ConfirmationData) => {
  const slotEnd = new Date(new Date(d.slotStart).getTime() + d.slotMinutes * 60_000).toISOString();
  const exam = `${longDay(`${d.examDate}T12:00:00Z`)}${d.examTime ? ` à ${d.examTime.slice(0, 5).replace(":", " h ")}` : ""}`;
  return `<!DOCTYPE html>
<html lang="fr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;background-color:#f5f5f5;">
  <div style="max-width:600px;margin:0 auto;background-color:#ffffff;">
    <div style="background:linear-gradient(135deg,#1B4332 0%,#2D5A45 100%);padding:32px 30px;text-align:center;">
      <h1 style="color:#ffffff;margin:0;font-size:26px;">ECOLE T3P</h1>
      <p style="color:rgba(255,255,255,0.9);margin:8px 0 0;font-size:14px;">Formation Taxi, VTC &amp; VMDTR</p>
    </div>
    <div style="padding:32px 30px;">
      <h2 style="color:#1B4332;margin:0 0 20px;font-size:22px;">Votre séance de conduite est confirmée</h2>
      <p style="color:#333;font-size:16px;line-height:1.6;">Bonjour <strong>${escapeHtml(d.fullName)}</strong>,</p>
      <p style="color:#555;font-size:15px;line-height:1.6;">Votre séance de conduite préparatoire à l'épreuve pratique est réservée :</p>
      <div style="background-color:#f8f9fa;border-radius:12px;padding:20px 24px;margin:20px 0;border-left:4px solid #1B4332;">
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tr><td style="padding:6px 0;color:#666;width:40%;">Séance de conduite</td><td style="padding:6px 0;color:#333;font-weight:600;">${longDay(d.slotStart)}, de ${hour(d.slotStart)} à ${hour(slotEnd)}</td></tr>
          <tr><td style="padding:6px 0;color:#666;">Lieu de rendez-vous</td><td style="padding:6px 0;color:#333;font-weight:600;">${escapeHtml(d.slotLocation)}</td></tr>
          <tr><td style="padding:6px 0;color:#666;">Votre examen pratique</td><td style="padding:6px 0;color:#333;font-weight:600;">${exam}${d.examLocation ? `<br>${escapeHtml(d.examLocation)}` : ""}</td></tr>
        </table>
      </div>
      <div style="background-color:#FFF4E5;border:1px solid #F57C00;border-radius:12px;padding:16px 20px;margin-bottom:24px;">
        <p style="color:#B45309;font-size:15px;font-weight:700;margin:0 0 6px;">Réservation définitive</p>
        <p style="color:#555;font-size:14px;line-height:1.6;margin:0;">Cette confirmation est définitive : le planning ne peut pas être modifié. Merci de vous présenter à l'heure, muni de votre permis de conduire.</p>
      </div>
      <p style="color:#555;font-size:14px;line-height:1.6;">Une question ? Appelez-nous au <a href="tel:0188750555" style="color:#1B4332;font-weight:600;">01 88 75 05 55</a>.</p>
    </div>
    <div style="background-color:#f8f9fa;padding:24px;text-align:center;border-top:1px solid #eee;">
      <p style="color:#1B4332;font-weight:bold;margin:0 0 4px;font-size:15px;">ECOLE T3P Montrouge</p>
      <p style="color:#666;margin:0;font-size:13px;">3 rue Corneille, 92120 Montrouge</p>
    </div>
  </div>
</body></html>`;
};

// deno-lint-ignore no-explicit-any
const sendEmail = async (supabaseAdmin: any, emailType: string, to: string, subject: string, html: string, metadata: Record<string, unknown>) => {
  const apiKey = Deno.env.get("RESEND_API_KEY");
  if (!apiKey) return false;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ from: EMAIL_FROM, to: [to], subject, html }),
    });
    const body = await res.json();
    await supabaseAdmin.from("email_logs").insert({
      email_type: emailType,
      recipient_email: to,
      subject,
      status: body.id ? "sent" : "failed",
      resend_id: body.id || null,
      error_message: body.error?.message || body.message || null,
      metadata,
    });
    return !!body.id;
  } catch (error) {
    console.error("driving-booking email error:", error);
    return false;
  }
};

/** Date du jour à Paris (AAAA-MM-JJ) d'un instant donné */
const parisDay = (iso: string | number) =>
  new Date(iso).toLocaleDateString("fr-CA", { timeZone: "Europe/Paris" });

/** AAAA-MM-JJ décalé de n jours */
const shiftDay = (day: string, days: number) => {
  const d = new Date(`${day}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
};

Deno.serve(async (req) => {
  const corsHeaders = buildCorsHeaders(req.headers.get("origin"));
  // Toujours 200 + champ status : supabase.functions.invoke masque le corps des réponses non-2xx
  const reply = (body: Record<string, unknown>) =>
    new Response(JSON.stringify({ ...body, version: FUNCTION_VERSION }), {
      headers: { ...corsHeaders, "Content-Type": "application/json", "Cache-Control": "no-store" },
    });

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, dossierNumber, birthDate, slotId, bookingId, phone } = await req.json();

    // N° de dossier : chiffres de tête seulement (les convocations d'admission ajoutent un suffixe, ex. 00062036PA1)
    const dossier = String(dossierNumber ?? "").trim().match(/^\d+/)?.[0] ?? "";
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
      .select("id, exam_type, full_name, email")
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

    // Sans examen pratique enregistré (ou département traité à part), pas de réservation en ligne
    const { data: practical } = await supabaseAdmin
      .from("practical_exams")
      .select("exam_date, exam_time, department, location, notes")
      .eq("exam_result_id", result.id)
      .maybeSingle();
    if (!practical) {
      return reply({ status: "no_exam" });
    }
    const windowStart = shiftDay(practical.exam_date, -BOOKING_WINDOW_DAYS);
    const inWindow = (startsAt: string) => {
      const day = parisDay(startsAt);
      return day >= windowStart && day < practical.exam_date;
    };

    let emailSent = false;
    if (action === "book") {
      const cleanPhone = String(phone ?? "").replace(/[^\d+ ]/g, "").trim();
      if (!slotId || cleanPhone.replace(/\D/g, "").length < 9) {
        return reply({ status: "invalid_phone" });
      }
      const { data: slot } = await supabaseAdmin
        .from("driving_slots")
        .select("starts_at, duration_minutes, location")
        .eq("id", slotId)
        .maybeSingle();
      if (!slot) return reply({ status: "slot_not_found" });
      if (!inWindow(slot.starts_at)) return reply({ status: "outside_window" });
      const { data: code, error } = await supabaseAdmin.rpc("book_driving_slot", {
        p_slot_id: slotId,
        p_exam_result_id: result.id,
        p_phone: cleanPhone,
        p_max_active: MAX_ACTIVE_BOOKINGS,
        p_min_notice: `${MIN_NOTICE_HOURS} hours`,
      });
      if (error) throw error;
      if (code !== "ok") return reply({ status: code });

      // Confirmation par e-mail à l'élève (si l'école a saisi son adresse) et copie à l'école.
      // Un échec d'envoi n'annule pas la réservation.
      const confirmation: ConfirmationData = {
        fullName: result.full_name,
        slotStart: slot.starts_at,
        slotMinutes: slot.duration_minutes,
        slotLocation: slot.location,
        examDate: practical.exam_date,
        examTime: practical.exam_time,
        examLocation: practical.location,
      };
      const html = confirmationHtml(confirmation);
      const metadata = { exam_result_id: result.id, slot_id: slotId, slot_start: slot.starts_at };
      emailSent = result.email
        ? await sendEmail(supabaseAdmin, "driving_booking_confirmation", result.email, "Votre séance de conduite est confirmée – ECOLE T3P", html, metadata)
        : false;
      await sendEmail(
        supabaseAdmin,
        "driving_booking_admin",
        SCHOOL_EMAIL,
        `Nouvelle réservation de conduite : ${result.full_name} (${longDay(slot.starts_at)}, ${hour(slot.starts_at)})`,
        html.replace("<h2", `<p style="color:#555;font-size:14px;">Copie école · téléphone de l'élève : ${escapeHtml(cleanPhone)}</p><h2`),
        metadata,
      );
    }

    // Réservation définitive : pas d'annulation en ligne (l'école peut annuler depuis l'admin)
    if (action === "cancel") {
      return reply({ status: "booking_final" });
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
        final: true,
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
      .filter((s) => s.remaining > 0 && !s.booked_by_me && inWindow(s.starts_at))
      .map(({ booked_by_me: _mine, ...s }) => s);

    return reply({
      status: action === "list" ? "ok" : "booked",
      category,
      slots: available,
      bookings,
      maxBookings: MAX_ACTIVE_BOOKINGS,
      emailSent,
      practicalExam: practical,
    });
  } catch (error) {
    console.error("driving-booking error:", error);
    return reply({ status: "error" });
  }
});
