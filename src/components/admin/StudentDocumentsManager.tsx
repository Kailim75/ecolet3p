import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Loader2, Upload, Trash2, FileText, Eye, EyeOff, BookOpen } from "lucide-react";

const BUCKET = "exam-attestations";
const CATEGORIES = ["TAXI", "VTC", "VMDTR"] as const;
const AUDIENCES: Record<string, string> = { admis: "Admis", non_admis: "Non admis", all: "Tous" };

interface StudentDocument {
  id: string;
  title: string;
  description: string | null;
  file_path: string;
  audience: string;
  exam_categories: string[];
  sort_order: number;
  is_published: boolean;
}

const slugify = (value: string) =>
  value.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^A-Za-z0-9._-]+/g, "_");

const StudentDocumentsManager = () => {
  const [docs, setDocs] = useState<StudentDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [audience, setAudience] = useState("admis");
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchDocs();
  }, []);

  const fetchDocs = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("student_documents")
      .select("id, title, description, file_path, audience, exam_categories, sort_order, is_published")
      .order("sort_order")
      .order("created_at");
    if (error) toast.error("Erreur de chargement des documents");
    else setDocs(data || []);
    setLoading(false);
  };

  const upload = async () => {
    if (!file || !title.trim()) {
      toast.error("Choisissez un PDF et donnez-lui un titre");
      return;
    }
    setUploading(true);
    const path = `documents/${Date.now()}-${slugify(file.name)}`;
    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(path, file, { contentType: "application/pdf" });
    if (uploadError) {
      setUploading(false);
      toast.error("Erreur d'envoi du fichier");
      return;
    }
    const { error } = await supabase.from("student_documents").insert({
      title: title.trim(),
      description: description.trim() || null,
      file_path: path,
      audience,
      exam_categories: categories,
      sort_order: docs.length,
    });
    setUploading(false);
    if (error) {
      await supabase.storage.from(BUCKET).remove([path]);
      toast.error("Erreur d'enregistrement du document");
      return;
    }
    toast.success("Document mis à disposition");
    setFile(null);
    setTitle("");
    setDescription("");
    fetchDocs();
  };

  const togglePublished = async (doc: StudentDocument) => {
    const { error } = await supabase.from("student_documents").update({ is_published: !doc.is_published }).eq("id", doc.id);
    if (error) toast.error("Erreur de mise à jour");
    else setDocs((prev) => prev.map((d) => (d.id === doc.id ? { ...d, is_published: !d.is_published } : d)));
  };

  const remove = async (doc: StudentDocument) => {
    if (!confirm(`Supprimer « ${doc.title} » ?`)) return;
    await supabase.storage.from(BUCKET).remove([doc.file_path]);
    const { error } = await supabase.from("student_documents").delete().eq("id", doc.id);
    if (error) toast.error("Erreur de suppression");
    else setDocs((prev) => prev.filter((d) => d.id !== doc.id));
  };

  const open = async (doc: StudentDocument) => {
    const { data, error } = await supabase.storage.from(BUCKET).createSignedUrl(doc.file_path, 60);
    if (error || !data) toast.error("Fichier introuvable");
    else window.open(data.signedUrl, "_blank", "noopener");
  };

  return (
    <div className="bg-card rounded-xl border p-5 space-y-4">
      <div>
        <p className="font-semibold flex items-center gap-2"><BookOpen className="w-5 h-5 text-primary" /> Documents élèves</p>
        <p className="text-sm text-muted-foreground">
          Affichés sur la page résultat selon le résultat (admis / non admis) et l'examen. Sans examen coché : pour tous.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-4 md:items-end">
        <div className="space-y-1">
          <Label htmlFor="doc-file">Fichier PDF</Label>
          <Input
            id="doc-file"
            type="file"
            accept="application/pdf"
            onChange={(e) => {
              const f = e.target.files?.[0] ?? null;
              setFile(f);
              if (f && !title) setTitle(f.name.replace(/\.pdf$/i, "").replace(/[_-]+/g, " "));
            }}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="doc-title">Titre affiché</Label>
          <Input id="doc-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Fiche épreuve pratique VTC" />
        </div>
        <div className="space-y-1 md:col-span-2">
          <Label htmlFor="doc-description">Description (facultatif)</Label>
          <Input id="doc-description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Barème, déroulé, check-list du jour J" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="doc-audience">Pour</Label>
          <select id="doc-audience" className="h-10 w-full rounded-md border bg-background px-3 text-sm" value={audience} onChange={(e) => setAudience(e.target.value)}>
            {Object.entries(AUDIENCES).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </div>
        <div className="space-y-1 md:col-span-2">
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
        <Button onClick={upload} disabled={uploading || !file}>
          {uploading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}
          Mettre à disposition
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center p-4"><Loader2 className="w-5 h-5 animate-spin text-primary" /></div>
      ) : docs.length === 0 ? (
        <p className="text-sm text-muted-foreground">Aucun document pour l'instant.</p>
      ) : (
        <div className="divide-y border rounded-lg">
          {docs.map((d) => (
            <div key={d.id} className={`flex flex-wrap items-center gap-2 p-3 ${d.is_published ? "" : "opacity-50"}`}>
              <FileText className="w-4 h-4 text-primary" />
              <span className="font-medium">{d.title}</span>
              <Badge variant={d.audience === "non_admis" ? "destructive" : "default"}>{AUDIENCES[d.audience]}</Badge>
              {(d.exam_categories.length ? d.exam_categories : ["Tous examens"]).map((c) => <Badge key={c} variant="secondary">{c}</Badge>)}
              <div className="ml-auto flex gap-1">
                <Button variant="ghost" size="icon" title="Ouvrir" onClick={() => open(d)}><FileText className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon" title={d.is_published ? "Masquer" : "Publier"} onClick={() => togglePublished(d)}>
                  {d.is_published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </Button>
                <Button variant="ghost" size="icon" title="Supprimer" onClick={() => remove(d)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentDocumentsManager;
