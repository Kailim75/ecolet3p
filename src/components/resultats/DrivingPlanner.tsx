import { useEffect, useMemo, useState } from "react";
import { CalendarCheck, Clock, Loader2, MapPin, Phone, X, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { trackLeadConversion } from "@/lib/trackConversion";

export interface LookupCredentials {
  dossierNumber: string;
  birthDate: string; // AAAA-MM-JJ
}

interface Slot {
  id: string;
  starts_at: string;
  duration_minutes: number;
  location: string;
  remaining: number;
}

interface Booking {
  id: string;
  starts_at: string;
  duration_minutes: number;
  location: string;
  cancellable: boolean;
}

interface PlannerState {
  slots: Slot[];
  bookings: Booking[];
  maxBookings: number;
  cancelNoticeHours: number;
}

const TZ = "Europe/Paris";
const dayLabel = (iso: string) => {
  const label = new Date(iso).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", timeZone: TZ });
  return label.charAt(0).toUpperCase() + label.slice(1);
};
const timeLabel = (iso: string) =>
  new Date(iso).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit", timeZone: TZ });
const endLabel = (iso: string, minutes: number) => timeLabel(new Date(new Date(iso).getTime() + minutes * 60_000).toISOString());
const dayKey = (iso: string) => new Date(iso).toLocaleDateString("fr-CA", { timeZone: TZ });

const MESSAGES: Record<string, string> = {
  booked: "Séance réservée. Nous vous attendons !",
  cancelled: "Séance annulée.",
  full: "Ce créneau vient d'être pris. Choisissez-en un autre.",
  already_booked: "Vous avez déjà réservé ce créneau.",
  max_bookings: "Vous avez atteint le nombre maximum de séances à venir. Annulez-en une ou attendez qu'elle soit passée.",
  too_late: "Ce créneau est trop proche pour être réservé en ligne. Appelez-nous.",
  too_late_to_cancel: "Annulation impossible en ligne à moins de 24 h. Appelez-nous au 01 88 75 05 55.",
  slot_closed: "Ce créneau n'est plus disponible.",
  slot_not_found: "Ce créneau n'est plus disponible.",
  wrong_category: "Ce créneau n'est pas prévu pour votre examen.",
  invalid_phone: "Indiquez un numéro de téléphone valide pour que nous puissions vous joindre.",
  rate_limited: "Trop de tentatives. Réessayez dans une heure ou appelez-nous.",
  error: "Le service est momentanément indisponible. Réessayez dans quelques minutes.",
};

const DrivingPlanner = ({ credentials }: { credentials: LookupCredentials }) => {
  const [state, setState] = useState<PlannerState | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);
  const [selected, setSelected] = useState<Slot | null>(null);
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  const call = async (body: Record<string, unknown>) => {
    const { data, error } = await supabase.functions.invoke("driving-booking", {
      body: { ...credentials, ...body },
    });
    if (error || !data?.status) return { status: "error" } as { status: string } & Partial<PlannerState>;
    return data as { status: string } & Partial<PlannerState>;
  };

  const apply = (data: { status: string } & Partial<PlannerState>) => {
    if (data.slots && data.bookings) {
      setState({
        slots: data.slots,
        bookings: data.bookings,
        maxBookings: data.maxBookings ?? 3,
        cancelNoticeHours: data.cancelNoticeHours ?? 24,
      });
    }
  };

  useEffect(() => {
    (async () => {
      const data = await call({ action: "list" });
      apply(data);
      if (data.status !== "ok") setMessage({ ok: false, text: MESSAGES[data.status] ?? MESSAGES.error });
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [credentials.dossierNumber, credentials.birthDate]);

  const byDay = useMemo(() => {
    const groups = new Map<string, Slot[]>();
    for (const slot of state?.slots ?? []) {
      const key = dayKey(slot.starts_at);
      groups.set(key, [...(groups.get(key) ?? []), slot]);
    }
    return [...groups.values()];
  }, [state]);

  const book = async () => {
    if (!selected) return;
    setBusy(selected.id);
    const data = await call({ action: "book", slotId: selected.id, phone });
    apply(data);
    if (data.status === "booked") trackLeadConversion();
    setMessage({ ok: data.status === "booked", text: MESSAGES[data.status] ?? MESSAGES.error });
    if (data.status === "booked" || data.status === "full" || data.status === "slot_closed") setSelected(null);
    setBusy(null);
  };

  const cancel = async (booking: Booking) => {
    setBusy(booking.id);
    const data = await call({ action: "cancel", bookingId: booking.id });
    apply(data);
    setMessage({ ok: data.status === "cancelled", text: MESSAGES[data.status] ?? MESSAGES.error });
    setBusy(null);
  };

  const limitReached = !!state && state.bookings.length >= state.maxBookings;

  return (
    <section className="rounded-xl border border-green-200 bg-green-50/40 p-4 sm:p-5 space-y-4" aria-labelledby="planner-title">
      <div>
        <h3 id="planner-title" className="text-lg font-bold text-foreground flex items-center gap-2">
          <CalendarCheck className="w-5 h-5 text-green-600" aria-hidden /> Organiser ma conduite
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Réservez vos séances de conduite préparatoire à l'épreuve pratique
          {state ? ` (jusqu'à ${state.maxBookings} séances à venir)` : ""}.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-6"><Loader2 className="w-6 h-6 animate-spin text-green-600" /></div>
      ) : (
        <>
          {message && (
            <div className={`flex items-start gap-2 rounded-lg p-3 text-sm ${message.ok ? "bg-green-100 text-green-900" : "bg-amber-50 text-amber-900 border border-amber-200"}`} role="status">
              {message.ok ? <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" /> : <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />}
              <p>{message.text}</p>
            </div>
          )}

          {state && state.bookings.length > 0 && (
            <div className="space-y-2">
              <p className="font-semibold text-sm">Mes séances</p>
              {state.bookings.map((b) => (
                <div key={b.id} className="flex flex-wrap items-center gap-3 rounded-lg border bg-white p-3">
                  <div className="flex-1 min-w-[180px]">
                    <p className="font-medium">{dayLabel(b.starts_at)}</p>
                    <p className="text-sm text-muted-foreground">
                      <Clock className="w-3.5 h-3.5 inline mr-1 -mt-0.5" />{timeLabel(b.starts_at)} – {endLabel(b.starts_at, b.duration_minutes)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <MapPin className="w-3.5 h-3.5 inline mr-1 -mt-0.5" />{b.location}
                    </p>
                  </div>
                  {b.cancellable ? (
                    <Button variant="ghost" size="sm" onClick={() => cancel(b)} disabled={busy === b.id}>
                      {busy === b.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <X className="w-4 h-4 mr-1" />} Annuler
                    </Button>
                  ) : (
                    <span className="text-xs text-muted-foreground">Annulation : appelez-nous</span>
                  )}
                </div>
              ))}
            </div>
          )}

          {state && (byDay.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Aucun créneau disponible pour le moment. De nouvelles dates sont ajoutées régulièrement ; vous pouvez aussi nous appeler au{" "}
              <a href="tel:+33188750555" className="font-medium text-primary hover:underline">01 88 75 05 55</a>.
            </p>
          ) : limitReached ? (
            <p className="text-sm text-muted-foreground">
              Vous avez réservé le maximum de séances à venir. Vous pourrez en réserver d'autres après vos premières séances.
            </p>
          ) : (
            <div className="space-y-3">
              <p className="font-semibold text-sm">Créneaux disponibles</p>
              {byDay.map((slots) => (
                <div key={slots[0].id}>
                  <p className="text-sm font-medium mb-1.5">{dayLabel(slots[0].starts_at)}</p>
                  <div className="flex flex-wrap gap-2">
                    {slots.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => { setSelected(s); setMessage(null); }}
                        aria-pressed={selected?.id === s.id}
                        className={`rounded-lg border px-3 py-2 text-sm transition-colors ${selected?.id === s.id ? "border-green-600 bg-green-600 text-white" : "bg-white hover:border-green-600"}`}
                      >
                        {timeLabel(s.starts_at)} – {endLabel(s.starts_at, s.duration_minutes)}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {selected && (
                <div className="rounded-lg border bg-white p-4 space-y-3">
                  <p className="text-sm">
                    <span className="font-semibold">{dayLabel(selected.starts_at)}</span>, {timeLabel(selected.starts_at)} – {endLabel(selected.starts_at, selected.duration_minutes)}
                    <span className="block text-muted-foreground"><MapPin className="w-3.5 h-3.5 inline mr-1" />{selected.location}</span>
                  </p>
                  <div className="space-y-1.5">
                    <Label htmlFor="planner-phone">Téléphone (pour vous joindre en cas de changement)</Label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Input
                        id="planner-phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder="06 12 34 56 78"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                      <Button onClick={book} disabled={busy === selected.id} className="bg-green-600 hover:bg-green-700 shrink-0">
                        {busy === selected.id ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Phone className="w-4 h-4 mr-2" />}
                        Réserver ce créneau
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </section>
  );
};

export default DrivingPlanner;
