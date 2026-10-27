import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Loader2, Upload, Trash2, FileText, Eye, EyeOff, Link2, Plus, X, AlertTriangle,
} from "lucide-react";
import {
  formatScore, frDateToIso, isoDateToFr, sessionLabelFromDates, type ExamSubject, type ParsedAttestation,
} from "@/lib/examResults";
import { readAttestationPdf, extractPdfPage, type AttestationPage } from "@/lib/attestationPdf";
import { SITE_URL } from "@/lib/siteConfig";

interface ExamResultRow {
  id: string;
  session_label: string;
  dossier_number: string;
  birth_date: string;
  civility: string | null;
  full_name: string;
  exam_type: string;
  global_score: number | null;
  result: string;
  subjects: Json;
  comment: string | null;
  attestation_path: string | null;
  is_published: boolean;
  expires_at: string;
}

const BUCKET = "exam-attestations";

const slugify = (value: string) =>
  value.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const toRow = (p: ParsedAttestation, sessionLabel: string, attestationPath: string | null) => ({
  session_label: sessionLabel,
  dossier_number: p.dossier_number,
  birth_date: p.birth_date,
  civility: p.civility,
  full_name: p.full_name,
  exam_type: p.exam_type,
  department: p.department,
  exam_date: p.exam_date,
  global_score: p.global_score,
  result: p.result,
  subjects: p.subjects as unknown as Json,
  comment: p.comment,
  attestation_path: attestationPath,
  is_published: true,
});

const emptyManual = {
  dossier: "", birth: "", civility: "Monsieur", fullName: "", examType: "VTC Complète", score: "", result: "non_admis", comment: "",
};

const ExamResultsManager = () => {
  const [rows, setRows] = useState<ExamResultRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [sessionFilter, setSessionFilter] = useState("all");

  // Import PDF
  const [pdfBytes, setPdfBytes] = useState<Uint8Array | null>(null);
  const [pdfName, setPdfName] = useState("");
  const [pages, setPages] = useState<AttestationPage[]>([]);
  const [importSession, setImportSession] = useState("");
  const [parsing, setParsing] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [progress, setProgress] = useState(0);

  // Saisie manuelle (non-admis sans attestation)
  const [showManual, setShowManual] = useState(false);
  const [manual, setManual] = useState(emptyManual);
  const [manualSession, setManualSession] = useState("");
  const [savingManual, setSavingManual] = useState(false);

  useEffect(() => {
    fetchRows();
  }, []);

  const fetchRows = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("exam_results")
      .select("id, session_label, dossier_number, birth_date, civility, full_name, exam_type, global_score, result, subjects, comment, attestation_path, is_published, expires_at")
      .order("session_label", { ascending: false })
      .order("result")
      .order("full_name");
    if (error) {
      toast.error("Erreur de chargement des résultats");
    } else {
      setRows(data || []);
    }
    setLoading(false);
  };

  const sessions = useMemo(() => [...new Set(rows.map((r) => r.session_label))], [rows]);
  const visibleRows = sessionFilter === "all" ? rows : rows.filter((r) => r.session_label === sessionFilter);
  const recognized = pages.filter((p) => p.parsed) as (AttestationPage & { parsed: ParsedAttestation })[];

  const onPdfSelected = async (file: File | undefined) => {
    if (!file) return;
    setParsing(true);
    setPages([]);
    try {
      const bytes = new Uint8Array(await file.arrayBuffer());
      const parsed = await readAttestationPdf(bytes);
      setPdfBytes(bytes);
      setPdfName(file.name);
      setPages(parsed);
      setImportSession(sessionLabelFromDates(parsed.map((p) => p.parsed?.exam_date ?? null)));
      if (!parsed.some((p) => p.parsed)) toast.error("Aucune attestation reconnue dans ce PDF");
    } catch (err) {
      console.error(err);
      toast.error("Impossible de lire ce PDF");
    }
    setParsing(false);
  };

  const resetImport = () => {
    setPdfBytes(null);
    setPdfName("");
    setPages([]);
    setImportSession("");
    setProgress(0);
  };

  const publishImport = async () => {
    if (!pdfBytes || !importSession.trim() || !recognized.length) return;
    setPublishing(true);
    setProgress(0);
    const sessionLabel = importSession.trim();
    const folder = slugify(sessionLabel);
    let failures = 0;

    for (const page of recognized) {
      try {
        const path = `${folder}/${page.parsed.dossier_number}.pdf`;
        const single = await extractPdfPage(pdfBytes, page.pageIndex);
        const { error: uploadError } = await supabase.storage
          .from(BUCKET)
          .upload(path, new Blob([single], { type: "application/pdf" }), { upsert: true, contentType: "application/pdf" });
        if (uploadError) throw uploadError;
        const { error } = await supabase
          .from("exam_results")
          .upsert(toRow(page.parsed, sessionLabel, path), { onConflict: "session_label,dossier_number" });
        if (error) throw error;
      } catch (err) {
        console.error(err);
        failures++;
      }
      setProgress((n) => n + 1);
    }

    setPublishing(false);
    if (failures) {
      toast.error(`${failures} résultat(s) non publié(s) — voir la console`);
    } else {
      toast.success(`${recognized.length} résultats publiés pour la session ${sessionLabel}`);
      resetImport();
    }
    fetchRows();
  };

  const saveManual = async () => {
    const birthDate = frDateToIso(manual.birth);
    const dossier = manual.dossier.replace(/\D/g, "");
    const score = manual.score ? Number(manual.score.replace(",", ".")) : null;
    if (!manualSession.trim() || dossier.length < 5 || !birthDate || !manual.fullName.trim() || (score != null && Number.isNaN(score))) {
      toast.error("Session, n° de dossier, date de naissance (JJ/MM/AAAA) et nom sont obligatoires");
      return;
    }
    setSavingManual(true);
    const { error } = await supabase.from("exam_results").upsert({
      session_label: manualSession.trim(),
      dossier_number: dossier.padStart(8, "0"),
      birth_date: birthDate,
      civility: manual.civility,
      full_name: manual.fullName.trim(),
      exam_type: manual.examType.trim(),
      global_score: score,
      result: manual.result,
      comment: manual.comment.trim() || null,
      is_published: true,
    }, { onConflict: "session_label,dossier_number" });
    setSavingManual(false);
    if (error) {
      toast.error("Erreur lors de l'enregistrement");
      return;
    }
    toast.success("Résultat enregistré");
    setManual(emptyManual);
    fetchRows();
  };

  const togglePublished = async (row: ExamResultRow) => {
    const { error } = await supabase.from("exam_results").update({ is_published: !row.is_published }).eq("id", row.id);
    if (error) toast.error("Erreur de mise à jour");
    else setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, is_published: !r.is_published } : r)));
  };

  const deleteRow = async (row: ExamResultRow) => {
    if (!confirm(`Supprimer le résultat de ${row.full_name} ?`)) return;
    if (row.attestation_path) await supabase.storage.from(BUCKET).remove([row.attestation_path]);
    const { error } = await supabase.from("exam_results").delete().eq("id", row.id);
    if (error) toast.error("Erreur de suppression");
    else setRows((prev) => prev.filter((r) => r.id !== row.id));
  };

  const openAttestation = async (path: string) => {
    const { data, error } = await supabase.storage.from(BUCKET).createSignedUrl(path, 60);
    if (error || !data) toast.error("Attestation introuvable");
    else window.open(data.signedUrl, "_blank", "noopener");
  };

  const copyPublicLink = async () => {
    await navigator.clipboard.writeText(`${SITE_URL}/resultats`);
    toast.success("Lien copié : à donner aux candidats");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-foreground">Résultats d'examen</h2>
          <p className="text-sm text-muted-foreground">
            Les candidats consultent leur résultat sur <strong>ecolet3p.fr/resultats</strong> avec leur n° de dossier et leur date de naissance.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={copyPublicLink}>
            <Link2 className="w-4 h-4 mr-2" /> Copier le lien
          </Button>
          <Button variant="outline" size="sm" onClick={() => setShowManual((v) => !v)}>
            {showManual ? <X className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />} Saisie manuelle
          </Button>
        </div>
      </div>

      {/* Import des attestations CMA */}
      <div className="bg-card rounded-xl border p-5 space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <FileText className="w-5 h-5 text-primary" />
          <p className="font-semibold">Importer le PDF d'attestations de la CMA</p>
          <label className="ml-auto">
            <input
              type="file"
              accept="application/pdf"
              className="hidden"
              disabled={parsing || publishing}
              onChange={(e) => { onPdfSelected(e.target.files?.[0]); e.target.value = ""; }}
            />
            <span className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground cursor-pointer hover:bg-primary/90">
              {parsing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
              Choisir le PDF
            </span>
          </label>
        </div>
        <p className="text-sm text-muted-foreground">
          Une page par candidat : chaque attestation est lue, découpée et rattachée à son n° de dossier.
        </p>

        {pages.length > 0 && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-end gap-3">
              <div className="space-y-1">
                <Label htmlFor="import-session">Session</Label>
                <Input id="import-session" value={importSession} onChange={(e) => setImportSession(e.target.value)} className="w-56" />
              </div>
              <p className="text-sm text-muted-foreground pb-2">
                {pdfName} · {recognized.length}/{pages.length} page(s) reconnue(s)
              </p>
            </div>

            {pages.length > recognized.length && (
              <p className="flex items-center gap-2 text-sm text-amber-700">
                <AlertTriangle className="w-4 h-4" />
                Page(s) non reconnue(s) ignorée(s) : {pages.filter((p) => !p.parsed).map((p) => p.pageIndex + 1).join(", ")}
              </p>
            )}

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-muted-foreground border-b">
                    <th className="py-2 pr-2">Page</th><th className="py-2 pr-2">Candidat</th><th className="py-2 pr-2">N° dossier</th>
                    <th className="py-2 pr-2">Naissance</th><th className="py-2 pr-2">Épreuve</th><th className="py-2 pr-2 text-right">Note</th><th className="py-2">Résultat</th>
                  </tr>
                </thead>
                <tbody>
                  {recognized.map(({ pageIndex, parsed: p }) => (
                    <tr key={pageIndex} className="border-b last:border-0">
                      <td className="py-2 pr-2 text-muted-foreground">{pageIndex + 1}</td>
                      <td className="py-2 pr-2 font-medium">{p.full_name}</td>
                      <td className="py-2 pr-2 font-mono">{p.dossier_number}</td>
                      <td className="py-2 pr-2">{isoDateToFr(p.birth_date)}</td>
                      <td className="py-2 pr-2">{p.exam_type}</td>
                      <td className="py-2 pr-2 text-right">{formatScore(p.global_score)}</td>
                      <td className="py-2">
                        <Badge variant={p.result === "admis" ? "default" : "destructive"}>
                          {p.result === "admis" ? "Admis" : "Non admis"}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex gap-2">
              <Button onClick={publishImport} disabled={publishing || !importSession.trim() || !recognized.length}>
                {publishing
                  ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Publication {progress}/{recognized.length}</>
                  : <>Publier {recognized.length} résultat(s)</>}
              </Button>
              <Button variant="ghost" onClick={resetImport} disabled={publishing}>Annuler</Button>
            </div>
          </div>
        )}
      </div>

      {showManual && (
        <div className="bg-card rounded-xl border p-5 space-y-4">
          <p className="font-semibold">Ajouter un résultat sans attestation (ex. non-admis)</p>
          <div className="grid gap-3 md:grid-cols-4">
            <div className="space-y-1"><Label>Session</Label><Input placeholder="Septembre 2026" value={manualSession} onChange={(e) => setManualSession(e.target.value)} /></div>
            <div className="space-y-1"><Label>N° de dossier</Label><Input inputMode="numeric" value={manual.dossier} onChange={(e) => setManual({ ...manual, dossier: e.target.value })} /></div>
            <div className="space-y-1"><Label>Date de naissance</Label><Input placeholder="JJ/MM/AAAA" value={manual.birth} onChange={(e) => setManual({ ...manual, birth: e.target.value })} /></div>
            <div className="space-y-1">
              <Label>Civilité</Label>
              <select className="h-10 w-full rounded-md border bg-background px-3 text-sm" value={manual.civility} onChange={(e) => setManual({ ...manual, civility: e.target.value })}>
                <option>Monsieur</option><option>Madame</option>
              </select>
            </div>
            <div className="space-y-1 md:col-span-2"><Label>Nom complet</Label><Input placeholder="Prénom NOM" value={manual.fullName} onChange={(e) => setManual({ ...manual, fullName: e.target.value })} /></div>
            <div className="space-y-1"><Label>Épreuve</Label><Input value={manual.examType} onChange={(e) => setManual({ ...manual, examType: e.target.value })} /></div>
            <div className="space-y-1"><Label>Note globale /20</Label><Input inputMode="decimal" placeholder="8,71" value={manual.score} onChange={(e) => setManual({ ...manual, score: e.target.value })} /></div>
            <div className="space-y-1">
              <Label>Résultat</Label>
              <select className="h-10 w-full rounded-md border bg-background px-3 text-sm" value={manual.result} onChange={(e) => setManual({ ...manual, result: e.target.value })}>
                <option value="non_admis">Non admis</option><option value="admis">Admis</option>
              </select>
            </div>
            <div className="space-y-1 md:col-span-3"><Label>Commentaire (visible par le candidat)</Label><Input placeholder="Note éliminatoire : Gestion (4/20)" value={manual.comment} onChange={(e) => setManual({ ...manual, comment: e.target.value })} /></div>
          </div>
          <Button onClick={saveManual} disabled={savingManual}>
            {savingManual && <Loader2 className="w-4 h-4 mr-2 animate-spin" />} Enregistrer
          </Button>
        </div>
      )}

      {/* Résultats publiés */}
      <div className="bg-card rounded-xl border overflow-hidden">
        <div className="flex flex-wrap items-center gap-3 p-4 border-b">
          <p className="font-semibold">Résultats enregistrés ({visibleRows.length})</p>
          <select className="ml-auto h-9 rounded-md border bg-background px-3 text-sm" value={sessionFilter} onChange={(e) => setSessionFilter(e.target.value)}>
            <option value="all">Toutes les sessions</option>
            {sessions.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        {loading ? (
          <div className="flex justify-center p-8"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
        ) : visibleRows.length === 0 ? (
          <p className="p-8 text-center text-muted-foreground">Aucun résultat enregistré.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-muted-foreground border-b">
                  <th className="p-3">Candidat</th><th className="p-3">N° dossier</th><th className="p-3">Naissance</th>
                  <th className="p-3">Épreuve</th><th className="p-3 text-right">Note</th><th className="p-3">Résultat</th><th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {visibleRows.map((r) => {
                  const eliminated = (r.subjects as unknown as ExamSubject[]).filter((s) => s.score < s.eliminatory_below);
                  return (
                    <tr key={r.id} className={`border-b last:border-0 ${r.is_published ? "" : "opacity-50"}`}>
                      <td className="p-3">
                        <span className="font-medium">{r.full_name}</span>
                        <span className="block text-xs text-muted-foreground">{r.session_label}</span>
                      </td>
                      <td className="p-3 font-mono">{r.dossier_number}</td>
                      <td className="p-3">{isoDateToFr(r.birth_date)}</td>
                      <td className="p-3">{r.exam_type}</td>
                      <td className="p-3 text-right">{formatScore(r.global_score)}</td>
                      <td className="p-3">
                        <Badge variant={r.result === "admis" ? "default" : "destructive"}>{r.result === "admis" ? "Admis" : "Non admis"}</Badge>
                        {(r.comment || eliminated.length > 0) && <span className="block text-xs text-muted-foreground mt-1">{r.comment}</span>}
                      </td>
                      <td className="p-3">
                        <div className="flex justify-end gap-1">
                          {r.attestation_path && (
                            <Button variant="ghost" size="icon" title="Voir l'attestation" onClick={() => openAttestation(r.attestation_path!)}>
                              <FileText className="w-4 h-4" />
                            </Button>
                          )}
                          <Button variant="ghost" size="icon" title={r.is_published ? "Masquer" : "Publier"} onClick={() => togglePublished(r)}>
                            {r.is_published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                          </Button>
                          <Button variant="ghost" size="icon" title="Supprimer" onClick={() => deleteRow(r)}>
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamResultsManager;
