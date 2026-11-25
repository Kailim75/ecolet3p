import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Loader2, Upload, FileText, AlertTriangle } from "lucide-react";
import { readPdfPageTexts, extractPdfPages } from "@/lib/attestationPdf";
import { groupConvocationPages, type ParsedConvocation } from "@/lib/convocations";
import { isoDateToFr } from "@/lib/examResults";

const BUCKET = "exam-attestations";

interface AdmisRow {
  id: string;
  dossier_number: string;
  full_name: string;
  email: string | null;
}

interface ImportRow {
  pageIndexes: number[];
  parsed: ParsedConvocation | null;
  match: AdmisRow | null;
  selected: boolean;
}

/** Import du PDF de convocations CMA : date, heure, lieu et PDF rattachés à chaque admissible. */
const ConvocationsImporter = ({ onImported }: { onImported: () => void }) => {
  const [bytes, setBytes] = useState<Uint8Array | null>(null);
  const [fileName, setFileName] = useState("");
  const [rows, setRows] = useState<ImportRow[]>([]);
  const [reading, setReading] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [progress, setProgress] = useState(0);

  const reset = () => {
    setBytes(null);
    setFileName("");
    setRows([]);
    setProgress(0);
  };

  const onFile = async (file: File | undefined) => {
    if (!file) return;
    setReading(true);
    try {
      const data = new Uint8Array(await file.arrayBuffer());
      const groups = groupConvocationPages(await readPdfPageTexts(data));
      const { data: admis, error } = await supabase
        .from("exam_results")
        .select("id, dossier_number, full_name, email")
        .eq("result", "admis");
      if (error) throw error;
      setRows(groups.map((g) => {
        const match = g.parsed ? (admis ?? []).find((a) => a.dossier_number === g.parsed!.dossier_number) ?? null : null;
        // Hors Paris : traité à part par l'école, décoché par défaut
        return { ...g, match, selected: !!match && g.parsed?.department === "75" };
      }));
      setBytes(data);
      setFileName(file.name);
      if (!groups.some((g) => g.parsed)) toast.error("Aucune convocation reconnue dans ce PDF");
    } catch (err) {
      console.error(err);
      toast.error("Impossible de lire ce PDF");
    }
    setReading(false);
  };

  const selected = rows.filter((r) => r.selected && r.parsed && r.match);

  const publish = async () => {
    if (!bytes || !selected.length) return;
    setPublishing(true);
    setProgress(0);
    let failures = 0;
    for (const row of selected) {
      const c = row.parsed!;
      const admis = row.match!;
      try {
        const path = `convocations/${c.dossier_number}.pdf`;
        const pdf = await extractPdfPages(bytes, row.pageIndexes, "Convocation à l'examen d'admission");
        const { error: uploadError } = await supabase.storage
          .from(BUCKET)
          .upload(path, new Blob([pdf as BlobPart], { type: "application/pdf" }), { upsert: true, contentType: "application/pdf" });
        if (uploadError) throw uploadError;
        const { error } = await supabase.from("practical_exams").upsert({
          exam_result_id: admis.id,
          exam_date: c.exam_date,
          exam_time: c.exam_time,
          department: c.department,
          location: c.location,
          notes: c.notes,
          convocation_path: path,
        }, { onConflict: "exam_result_id" });
        if (error) throw error;
        // E-mail de la convocation seulement si l'école n'en a pas déjà saisi un
        if (!admis.email && c.email) {
          await supabase.from("exam_results").update({ email: c.email }).eq("id", admis.id);
        }
      } catch (err) {
        console.error(err);
        failures++;
      }
      setProgress((n) => n + 1);
    }
    setPublishing(false);
    if (failures) {
      toast.error(`${failures} convocation(s) non publiée(s) — voir la console`);
    } else {
      toast.success(`${selected.length} convocation(s) publiée(s)`);
      reset();
    }
    onImported();
  };

  return (
    <div className="bg-card rounded-xl border p-5 space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <FileText className="w-5 h-5 text-primary" />
        <div>
          <p className="font-semibold">Importer les convocations CMA (examen pratique)</p>
          <p className="text-xs text-muted-foreground">
            Chaque convocation est rattachée à l'admissible par son n° de dossier : date, heure et lieu sont mis à jour et l'élève télécharge sa convocation sur /resultats.
          </p>
        </div>
        <label className="ml-auto">
          <input
            type="file"
            accept="application/pdf"
            className="hidden"
            aria-label="PDF de convocations"
            disabled={reading || publishing}
            onChange={(e) => { onFile(e.target.files?.[0]); e.target.value = ""; }}
          />
          <span className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground cursor-pointer hover:bg-primary/90">
            {reading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            Choisir le PDF
          </span>
        </label>
      </div>

      {rows.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            {fileName} · {rows.filter((r) => r.parsed).length} convocation(s) · {rows.filter((r) => r.match).length} rattachée(s) à un élève du site.
            Les convocations hors Paris (75) sont décochées : cochez-les seulement si vous voulez ouvrir la réservation à ces élèves.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-muted-foreground border-b">
                  <th className="py-2 pr-2"></th><th className="py-2 pr-2">Candidat</th><th className="py-2 pr-2">Épreuve</th>
                  <th className="py-2 pr-2">Examen</th><th className="py-2 pr-2">Lieu</th><th className="py-2">Élève sur le site</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={r.pageIndexes.join("-")} className={`border-b last:border-0 ${r.match ? "" : "text-muted-foreground"}`}>
                    <td className="py-2 pr-2">
                      <input
                        type="checkbox"
                        aria-label={`Publier la convocation de ${r.parsed?.full_name ?? "page " + (r.pageIndexes[0] + 1)}`}
                        disabled={!r.match || !r.parsed}
                        checked={r.selected}
                        onChange={(e) => setRows((prev) => prev.map((x, j) => (j === i ? { ...x, selected: e.target.checked } : x)))}
                      />
                    </td>
                    <td className="py-2 pr-2">
                      <span className="font-medium text-foreground">{r.parsed?.full_name ?? `Page ${r.pageIndexes[0] + 1} non reconnue`}</span>
                      {r.parsed && <span className="block text-xs">{r.parsed.dossier_number} · p. {r.pageIndexes.map((p) => p + 1).join("+")}</span>}
                    </td>
                    <td className="py-2 pr-2">{r.parsed?.exam_type}</td>
                    <td className="py-2 pr-2 whitespace-nowrap">{r.parsed && `${isoDateToFr(r.parsed.exam_date)} · ${r.parsed.exam_time}`}</td>
                    <td className="py-2 pr-2">
                      {r.parsed && <Badge variant={r.parsed.department === "75" ? "secondary" : "outline"}>{r.parsed.department}</Badge>}
                    </td>
                    <td className="py-2">
                      {r.match
                        ? r.match.full_name
                        : <span className="inline-flex items-center gap-1 text-xs text-amber-700"><AlertTriangle className="w-3.5 h-3.5" /> Pas sur le site</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex gap-2">
            <Button onClick={publish} disabled={publishing || !selected.length}>
              {publishing
                ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Publication {progress}/{selected.length}</>
                : <>Publier {selected.length} convocation(s)</>}
            </Button>
            <Button variant="ghost" onClick={reset} disabled={publishing}>Annuler</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConvocationsImporter;
