import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Loader2, Plus, Trash2, Lock, Unlock, Phone, X, CalendarDays } from "lucide-react";
import { parseTimes } from "@/lib/drivingSlots";

const CATEGORIES = ["TAXI", "VTC", "VMDTR"] as const;
const DEFAULT_LOCATION = "ECOLE T3P, 3 rue Corneille, 92120 Montrouge";
const TZ = "Europe/Paris";

interface SlotBooking {
  id: string;
  status: string;
  phone: string;
  created_at: string;
  exam_results: { full_name: string; exam_type: string; dossier_number: string } | null;
}

interface SlotRow {
  id: string;
  starts_at: string;
  duration_minutes: number;
  exam_categories: string[];
  capacity: number;
  location: string;
  is_open: boolean;
  driving_bookings: SlotBooking[];
}

const dayLabel = (iso: string) => {
  const label = new Date(iso).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: TZ });
  return label.charAt(0).toUpperCase() + label.slice(1);
};
const timeLabel = (iso: string) =>
  new Date(iso).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit", timeZone: TZ });
const dayKey = (iso: string) => new Date(iso).toLocaleDateString("fr-CA", { timeZone: TZ });

const DrivingSlotsManager = () => {
  const [slots, setSlots] = useState<SlotRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [date, setDate] = useState("");
  const [times, setTimes] = useState("09:00, 10:00, 11:00, 14:00, 15:00, 16:00");
  const [duration, setDuration] = useState("60");
  const [capacity, setCapacity] = useState("1");
  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const [categories, setCategories] = useState<string[]>(["VTC", "TAXI"]);

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    setLoading(true);
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const { data, error } = await supabase
      .from("driving_slots")
      .select("id, starts_at, duration_minutes, exam_categories, capacity, location, is_open, driving_bookings(id, status, phone, created_at, exam_results(full_name, exam_type, dossier_number))")
      .gte("starts_at", startOfToday.toISOString())
      .order("starts_at");
    if (error) toast.error("Erreur de chargement du planning");
    else setSlots((data as unknown as SlotRow[]) || []);
    setLoading(false);
  };

  const parsedTimes = parseTimes(times);

  const addSlots = async () => {
    const minutes = Number(duration);
    const places = Number(capacity);
    if (!date || !parsedTimes.length || !categories.length || !(minutes >= 15) || !(places >= 1)) {
      toast.error("Date, horaires, durée, places et au moins une catégorie sont obligatoires");
      return;
    }
    setSaving(true);
    // Heure locale du navigateur (France) convertie en UTC
    const rows = parsedTimes.map((t) => ({
      starts_at: new Date(`${date}T${t}:00`).toISOString(),
      duration_minutes: minutes,
      capacity: places,
      exam_categories: categories,
      location: location.trim() || DEFAULT_LOCATION,
    }));
    const { error } = await supabase.from("driving_slots").insert(rows);
    setSaving(false);
    if (error) {
      toast.error("Erreur lors de l'ajout des créneaux");
      return;
    }
    toast.success(`${rows.length} créneau(x) publié(s) le ${new Date(`${date}T12:00:00`).toLocaleDateString("fr-FR")}`);
    fetchSlots();
  };

  const toggleOpen = async (slot: SlotRow) => {
    const { error } = await supabase.from("driving_slots").update({ is_open: !slot.is_open }).eq("id", slot.id);
    if (error) toast.error("Erreur de mise à jour");
    else setSlots((prev) => prev.map((s) => (s.id === slot.id ? { ...s, is_open: !s.is_open } : s)));
  };

  const deleteSlot = async (slot: SlotRow) => {
    const active = slot.driving_bookings.filter((b) => b.status === "booked").length;
    if (!confirm(active
      ? `Ce créneau a ${active} réservation(s). Le supprimer annule ces réservations : pensez à prévenir les élèves. Continuer ?`
      : "Supprimer ce créneau ?")) return;
    const { error } = await supabase.from("driving_slots").delete().eq("id", slot.id);
    if (error) toast.error("Erreur de suppression");
    else setSlots((prev) => prev.filter((s) => s.id !== slot.id));
  };

  const cancelBooking = async (booking: SlotBooking) => {
    if (!confirm(`Annuler la réservation de ${booking.exam_results?.full_name ?? "cet élève"} ? Pensez à le prévenir.`)) return;
    const { error } = await supabase
      .from("driving_bookings")
      .update({ status: "cancelled", cancelled_at: new Date().toISOString() })
      .eq("id", booking.id);
    if (error) toast.error("Erreur d'annulation");
    else fetchSlots();
  };

  const byDay = useMemo(() => {
    const groups = new Map<string, SlotRow[]>();
    for (const s of slots) groups.set(dayKey(s.starts_at), [...(groups.get(dayKey(s.starts_at)) ?? []), s]);
    return [...groups.values()];
  }, [slots]);

  const totalBooked = slots.reduce((n, s) => n + s.driving_bookings.filter((b) => b.status === "booked").length, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">Planning de conduite</h2>
        <p className="text-sm text-muted-foreground">
          Publiez vos créneaux : les admissibles les réservent depuis leur page résultat (ecolet3p.fr/resultats), jusqu'à 3 séances à venir, au plus tard 12 h avant.
        </p>
      </div>

      <div className="bg-card rounded-xl border p-5 space-y-4">
        <p className="font-semibold flex items-center gap-2"><Plus className="w-4 h-4" /> Ajouter des créneaux</p>
        <div className="grid gap-3 md:grid-cols-4">
          <div className="space-y-1">
            <Label htmlFor="slot-date">Date</Label>
            <Input id="slot-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div className="space-y-1 md:col-span-2">
            <Label htmlFor="slot-times">Heures de début</Label>
            <Input id="slot-times" placeholder="09:00, 10:00, 14h30" value={times} onChange={(e) => setTimes(e.target.value)} />
            <p className="text-xs text-muted-foreground">
              {parsedTimes.length ? `${parsedTimes.length} créneau(x) : ${parsedTimes.join(" · ")}` : "Séparez les heures par des virgules"}
            </p>
          </div>
          <div className="space-y-1">
            <Label htmlFor="slot-duration">Durée (minutes)</Label>
            <Input id="slot-duration" inputMode="numeric" value={duration} onChange={(e) => setDuration(e.target.value.replace(/\D/g, ""))} />
          </div>
          <div className="space-y-1">
            <Label>Examen</Label>
            <div className="flex gap-3 h-10 items-center">
              {CATEGORIES.map((c) => (
                <label key={c} className="flex items-center gap-1.5 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={categories.includes(c)}
                    onChange={(e) => setCategories((prev) => (e.target.checked ? [...prev, c] : prev.filter((x) => x !== c)))}
                  />
                  {c}
                </label>
              ))}
            </div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="slot-capacity">Élèves par créneau</Label>
            <Input id="slot-capacity" inputMode="numeric" value={capacity} onChange={(e) => setCapacity(e.target.value.replace(/\D/g, ""))} />
          </div>
          <div className="space-y-1 md:col-span-2">
            <Label htmlFor="slot-location">Lieu de rendez-vous</Label>
            <Input id="slot-location" value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>
        </div>
        <Button onClick={addSlots} disabled={saving || !date || !parsedTimes.length}>
          {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          Publier {parsedTimes.length || ""} créneau(x)
        </Button>
      </div>

      <div className="bg-card rounded-xl border overflow-hidden">
        <div className="flex flex-wrap items-center gap-3 p-4 border-b">
          <CalendarDays className="w-5 h-5 text-primary" />
          <p className="font-semibold">Créneaux à venir ({slots.length}) · {totalBooked} réservation(s)</p>
        </div>
        {loading ? (
          <div className="flex justify-center p-8"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
        ) : byDay.length === 0 ? (
          <p className="p-8 text-center text-muted-foreground">Aucun créneau à venir. Ajoutez vos premières dates ci-dessus.</p>
        ) : (
          <div className="divide-y">
            {byDay.map((day) => (
              <div key={day[0].id} className="p-4 space-y-2">
                <p className="font-semibold">{dayLabel(day[0].starts_at)}</p>
                {day.map((s) => {
                  const active = s.driving_bookings.filter((b) => b.status === "booked");
                  return (
                    <div key={s.id} className={`rounded-lg border p-3 ${s.is_open ? "" : "opacity-60 bg-muted/40"}`}>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono font-semibold">{timeLabel(s.starts_at)}</span>
                        <span className="text-sm text-muted-foreground">{s.duration_minutes} min</span>
                        {s.exam_categories.map((c) => <Badge key={c} variant="secondary">{c}</Badge>)}
                        <Badge variant={active.length >= s.capacity ? "default" : "outline"}>{active.length}/{s.capacity} réservé</Badge>
                        {!s.is_open && <Badge variant="outline">Fermé</Badge>}
                        <span className="text-xs text-muted-foreground">{s.location}</span>
                        <div className="ml-auto flex gap-1">
                          <Button variant="ghost" size="icon" title={s.is_open ? "Fermer aux réservations" : "Rouvrir aux réservations"} onClick={() => toggleOpen(s)}>
                            {s.is_open ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                          </Button>
                          <Button variant="ghost" size="icon" title="Supprimer le créneau" onClick={() => deleteSlot(s)}>
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                      {active.map((b) => (
                        <div key={b.id} className="mt-2 flex flex-wrap items-center gap-3 text-sm bg-green-50 rounded-md px-3 py-2">
                          <span className="font-medium">{b.exam_results?.full_name}</span>
                          <span className="text-muted-foreground">{b.exam_results?.exam_type} · dossier {b.exam_results?.dossier_number}</span>
                          <a href={`tel:${b.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-1 text-primary hover:underline">
                            <Phone className="w-3.5 h-3.5" /> {b.phone}
                          </a>
                          <Button variant="ghost" size="sm" className="ml-auto" onClick={() => cancelBooking(b)}>
                            <X className="w-4 h-4 mr-1" /> Annuler
                          </Button>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DrivingSlotsManager;
