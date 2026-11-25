import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Loader2, Pencil, Trash2, Check, X, CalendarDays } from "lucide-react";

const TZ = "Europe/Paris";

interface AdmisRow {
  id: string;
  full_name: string;
  exam_type: string;
  dossier_number: string;
  session_label: string;
  email: string | null;
}

interface PracticalRow {
  id: string;
  exam_result_id: string;
  exam_date: string;
  exam_time: string | null;
  department: string | null;
  location: string | null;
  notes: string | null;
  convocation_path: string | null;
}

interface BookingRow {
  exam_result_id: string;
  driving_slots: { starts_at: string } | null;
}

interface Draft {
  exam_date: string;
  exam_time: string;
  department: string;
  location: string;
  notes: string;
  email: string;
}

const emptyDraft: Draft = { exam_date: "", exam_time: "", department: "75", location: "", notes: "", email: "" };

const shortDate = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("fr-FR", { weekday: "short", day: "2-digit", month: "2-digit", year: "numeric" });
const slotLabel = (iso: string) =>
  new Date(iso).toLocaleString("fr-FR", { weekday: "short", day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit", timeZone: TZ });

const PracticalExamsManager = () => {
  const [admis, setAdmis] = useState<AdmisRow[]>([]);
  const [practicals, setPracticals] = useState<PracticalRow[]>([]);
  const [bookings, setBookings] = useState<BookingRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [saving, setSaving] = useState(false);
  const [onlyScheduled, setOnlyScheduled] = useState(false);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    const [resultsRes, practicalRes, bookingRes] = await Promise.all([
      supabase.from("exam_results").select("id, full_name, exam_type, dossier_number, session_label, email").eq("result", "admis").order("full_name"),
      supabase.from("practical_exams").select("id, exam_result_id, exam_date, exam_time, department, location, notes, convocation_path"),
      supabase.from("driving_bookings").select("exam_result_id, driving_slots(starts_at)").eq("status", "booked"),
    ]);
    if (resultsRes.error || practicalRes.error || bookingRes.error) {
      toast.error("Erreur de chargement des examens pratiques");
    } else {
      setAdmis(resultsRes.data || []);
      setPracticals(practicalRes.data || []);
      setBookings((bookingRes.data as unknown as BookingRow[]) || []);
    }
    setLoading(false);
  };

  const rows = useMemo(() => {
    const now = Date.now();
    return admis
      .map((a) => ({
        ...a,
        practical: practicals.find((p) => p.exam_result_id === a.id) ?? null,
        booking: bookings
          .filter((b) => b.exam_result_id === a.id && b.driving_slots && new Date(b.driving_slots.starts_at).getTime() > now)
          .map((b) => b.driving_slots!.starts_at)
          .sort()[0] ?? null,
      }))
      .filter((r) => !onlyScheduled || r.practical)
      .sort((x, y) => (x.practical?.exam_date ?? "9999").localeCompare(y.practical?.exam_date ?? "9999") || x.full_name.localeCompare(y.full_name));
  }, [admis, practicals, bookings, onlyScheduled]);

  const scheduled = rows.filter((r) => r.practical).length;
  const withoutBooking = rows.filter((r) => r.practical && !r.booking && r.practical.exam_date >= new Date().toISOString().slice(0, 10)).length;

  const startEdit = (row: AdmisRow, p: PracticalRow | null) => {
    setEditing(row.id);
    setDraft(p
      ? { exam_date: p.exam_date, exam_time: p.exam_time?.slice(0, 5) ?? "", department: p.department ?? "", location: p.location ?? "", notes: p.notes ?? "", email: row.email ?? "" }
      : { ...emptyDraft, email: row.email ?? "" });
  };

  const save = async (examResultId: string) => {
    if (!draft.exam_date) {
      toast.error("La date d'examen est obligatoire");
      return;
    }
    const email = draft.email.trim().toLowerCase();
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Adresse e-mail invalide");
      return;
    }
    setSaving(true);
    const { error: emailError } = await supabase.from("exam_results").update({ email: email || null }).eq("id", examResultId);
    if (emailError) {
      setSaving(false);
      toast.error("Erreur d'enregistrement de l'e-mail");
      return;
    }
    const { error } = await supabase.from("practical_exams").upsert({
      exam_result_id: examResultId,
      exam_date: draft.exam_date,
      exam_time: draft.exam_time || null,
      department: draft.department.trim() || null,
      location: draft.location.trim() || null,
      notes: draft.notes.trim() || null,
    }, { onConflict: "exam_result_id" });
    setSaving(false);
    if (error) {
      toast.error("Erreur d'enregistrement");
      return;
    }
    setEditing(null);
    fetchAll();
  };

  const remove = async (p: PracticalRow, name: string) => {
    if (!confirm(`Retirer l'examen pratique de ${name} ? Il ne pourra plus réserver de conduite en ligne.`)) return;
    const { error } = await supabase.from("practical_exams").delete().eq("id", p.id);
    if (error) toast.error("Erreur de suppression");
    else fetchAll();
  };

  return (
    <div className="bg-card rounded-xl border overflow-hidden">
      <div className="flex flex-wrap items-center gap-3 p-4 border-b">
        <CalendarDays className="w-5 h-5 text-primary" />
        <div>
          <p className="font-semibold">Examens pratiques</p>
          <p className="text-xs text-muted-foreground">
            L'élève voit sa date sur /resultats et peut réserver une séance de conduite (définitive) dans les 15 jours qui précèdent ; il reçoit une confirmation à son e-mail. Sans date, pas de réservation en ligne.
          </p>
        </div>
        <div className="ml-auto flex items-center gap-3 text-sm">
          <Badge variant="secondary">{scheduled} date(s) saisie(s)</Badge>
          {withoutBooking > 0 && <Badge variant="destructive">{withoutBooking} sans séance réservée</Badge>}
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input type="checkbox" checked={onlyScheduled} onChange={(e) => setOnlyScheduled(e.target.checked)} />
            Avec date seulement
          </label>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center p-8"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
      ) : rows.length === 0 ? (
        <p className="p-8 text-center text-muted-foreground">Aucun admissible enregistré.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-muted-foreground border-b">
                <th className="p-3">Candidat</th><th className="p-3">Examen pratique</th><th className="p-3">Lieu</th>
                <th className="p-3">Séance de conduite</th><th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => editing === r.id ? (
                <tr key={r.id} className="border-b bg-muted/30">
                  <td className="p-3 align-top">
                    <span className="font-medium">{r.full_name}</span>
                    <span className="block text-xs text-muted-foreground">{r.exam_type} · {r.dossier_number}</span>
                  </td>
                  <td className="p-3 align-top">
                    <div className="flex gap-2">
                      <Input type="date" value={draft.exam_date} onChange={(e) => setDraft({ ...draft, exam_date: e.target.value })} className="w-40" aria-label="Date de l'examen" />
                      <Input type="time" value={draft.exam_time} onChange={(e) => setDraft({ ...draft, exam_time: e.target.value })} className="w-28" aria-label="Heure de l'examen" />
                    </div>
                  </td>
                  <td className="p-3 align-top" colSpan={2}>
                    <div className="grid gap-2 sm:grid-cols-[80px_1fr]">
                      <Input value={draft.department} onChange={(e) => setDraft({ ...draft, department: e.target.value })} placeholder="Dépt" aria-label="Département" />
                      <Input value={draft.location} onChange={(e) => setDraft({ ...draft, location: e.target.value })} placeholder="Adresse du centre d'examen" aria-label="Lieu" />
                      <Input value={draft.notes} onChange={(e) => setDraft({ ...draft, notes: e.target.value })} placeholder="Consignes d'arrivée (facultatif)" aria-label="Consignes" className="sm:col-span-2" />
                      <Input type="email" value={draft.email} onChange={(e) => setDraft({ ...draft, email: e.target.value })} placeholder="E-mail de l'élève (confirmation de réservation)" aria-label="E-mail" className="sm:col-span-2" />
                    </div>
                  </td>
                  <td className="p-3 align-top">
                    <div className="flex justify-end gap-1">
                      <Button size="icon" variant="ghost" title="Enregistrer" onClick={() => save(r.id)} disabled={saving}>
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4 text-green-600" />}
                      </Button>
                      <Button size="icon" variant="ghost" title="Annuler" onClick={() => setEditing(null)}><X className="w-4 h-4" /></Button>
                    </div>
                  </td>
                </tr>
              ) : (
                <tr key={r.id} className={`border-b last:border-0 ${r.practical ? "" : "text-muted-foreground"}`}>
                  <td className="p-3">
                    <span className="font-medium text-foreground">{r.full_name}</span>
                    <span className="block text-xs text-muted-foreground">{r.exam_type} · {r.dossier_number} · {r.session_label}</span>
                    <span className="block text-xs text-muted-foreground">{r.email || "Pas d'e-mail : pas de confirmation envoyée"}</span>
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    {r.practical
                      ? <>{shortDate(r.practical.exam_date)}{r.practical.exam_time && ` · ${r.practical.exam_time.slice(0, 5)}`}</>
                      : "—"}
                  </td>
                  <td className="p-3">
                    {r.practical ? <>{r.practical.location || "Selon convocation"}{r.practical.department && ` (${r.practical.department})`}</> : "—"}
                    {r.practical?.convocation_path && <Badge variant="secondary" className="ml-1">Convocation</Badge>}
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    {r.booking
                      ? <Badge>{slotLabel(r.booking)}</Badge>
                      : r.practical ? <span className="text-xs text-destructive">Pas encore réservée</span> : "—"}
                  </td>
                  <td className="p-3">
                    <div className="flex justify-end gap-1">
                      <Button size="icon" variant="ghost" title={r.practical ? "Modifier" : "Ajouter la date d'examen"} onClick={() => startEdit(r, r.practical)}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      {r.practical && (
                        <Button size="icon" variant="ghost" title="Retirer" onClick={() => remove(r.practical!, r.full_name)}>
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PracticalExamsManager;
