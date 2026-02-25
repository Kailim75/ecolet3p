import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2, Plus, Trash2, ArrowRight, ExternalLink, ToggleLeft, ToggleRight,
} from "lucide-react";

interface Redirect {
  id: string;
  from_path: string;
  to_path: string;
  redirect_type: number;
  is_active: boolean;
  source: string;
  cannibalization_keyword: string | null;
  notes: string | null;
  hit_count: number;
  created_at: string;
}

const RedirectsManager = () => {
  const [redirects, setRedirects] = useState<Redirect[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [newFrom, setNewFrom] = useState("");
  const [newTo, setNewTo] = useState("");
  const [newNotes, setNewNotes] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchRedirects();
  }, []);

  const fetchRedirects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("seo_redirects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching redirects:", error);
      toast.error("Erreur lors du chargement des redirections");
    } else {
      setRedirects((data as Redirect[]) || []);
    }
    setLoading(false);
  };

  const addRedirect = async () => {
    if (!newFrom.trim() || !newTo.trim()) {
      toast.error("Les chemins source et destination sont requis");
      return;
    }
    setAdding(true);
    const { error } = await supabase.from("seo_redirects").insert({
      from_path: newFrom.trim(),
      to_path: newTo.trim(),
      notes: newNotes.trim() || null,
      source: "manual",
    });

    if (error) {
      if (error.code === "23505") {
        toast.error("Une redirection existe déjà pour ce chemin");
      } else {
        toast.error("Erreur lors de l'ajout");
      }
    } else {
      toast.success("Redirection ajoutée !");
      setNewFrom("");
      setNewTo("");
      setNewNotes("");
      setShowForm(false);
      fetchRedirects();
    }
    setAdding(false);
  };

  const toggleActive = async (id: string, currentlyActive: boolean) => {
    const { error } = await supabase
      .from("seo_redirects")
      .update({ is_active: !currentlyActive })
      .eq("id", id);

    if (error) {
      toast.error("Erreur lors de la mise à jour");
    } else {
      setRedirects(prev =>
        prev.map(r => (r.id === id ? { ...r, is_active: !currentlyActive } : r))
      );
      toast.success(!currentlyActive ? "Redirection activée" : "Redirection désactivée");
    }
  };

  const deleteRedirect = async (id: string) => {
    const { error } = await supabase.from("seo_redirects").delete().eq("id", id);

    if (error) {
      toast.error("Erreur lors de la suppression");
    } else {
      setRedirects(prev => prev.filter(r => r.id !== id));
      toast.success("Redirection supprimée");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  const activeCount = redirects.filter(r => r.is_active).length;
  const canniCount = redirects.filter(r => r.source === "cannibalization").length;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h3 className="text-sm font-bold text-foreground">Redirections SEO (301)</h3>
          <p className="text-xs text-muted-foreground">
            {redirects.length} redirection{redirects.length > 1 ? "s" : ""} •{" "}
            {activeCount} active{activeCount > 1 ? "s" : ""} •{" "}
            {canniCount} depuis cannibalisation
          </p>
        </div>
        <Button size="sm" onClick={() => setShowForm(!showForm)} variant="outline">
          <Plus className="w-3.5 h-3.5 mr-1" />
          Ajouter
        </Button>
      </div>

      {/* Add form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-muted/30 rounded-lg border border-border p-4 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block mb-1">
                    Chemin source
                  </label>
                  <input
                    value={newFrom}
                    onChange={e => setNewFrom(e.target.value)}
                    placeholder="/blog/ancien-article"
                    className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block mb-1">
                    Destination
                  </label>
                  <input
                    value={newTo}
                    onChange={e => setNewTo(e.target.value)}
                    placeholder="/blog/nouvel-article"
                    className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
              <input
                value={newNotes}
                onChange={e => setNewNotes(e.target.value)}
                placeholder="Notes (optionnel)"
                className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={addRedirect} disabled={adding}>
                  {adding ? <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" /> : <Plus className="w-3.5 h-3.5 mr-1" />}
                  Créer
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setShowForm(false)}>
                  Annuler
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Redirects list */}
      {redirects.length === 0 ? (
        <div className="text-center py-8 text-sm text-muted-foreground">
          Aucune redirection configurée. Lancez un audit SEO avec détection de cannibalisation pour créer des redirections automatiquement.
        </div>
      ) : (
        <div className="space-y-2">
          {redirects.map(r => (
            <motion.div
              key={r.id}
              layout
              className={`rounded-lg border p-3 flex items-center gap-3 ${
                r.is_active ? "border-border bg-white" : "border-border/50 bg-muted/20 opacity-60"
              }`}
            >
              <button
                onClick={() => toggleActive(r.id, r.is_active)}
                className="shrink-0"
                title={r.is_active ? "Désactiver" : "Activer"}
              >
                {r.is_active ? (
                  <ToggleRight className="w-5 h-5 text-green-600" />
                ) : (
                  <ToggleLeft className="w-5 h-5 text-muted-foreground" />
                )}
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-mono text-red-600 truncate">{r.from_path}</span>
                  <ArrowRight className="w-3 h-3 text-muted-foreground shrink-0" />
                  <span className="text-xs font-mono text-green-700 truncate">{r.to_path}</span>
                </div>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <Badge variant="outline" className="text-[9px]">
                    {r.redirect_type}
                  </Badge>
                  {r.source === "cannibalization" && (
                    <Badge className="bg-amber-100 text-amber-700 border-amber-200 text-[9px]">
                      Cannibalisation
                    </Badge>
                  )}
                  {r.cannibalization_keyword && (
                    <span className="text-[9px] text-muted-foreground italic">« {r.cannibalization_keyword} »</span>
                  )}
                  {r.hit_count > 0 && (
                    <span className="text-[9px] text-muted-foreground">{r.hit_count} hit{r.hit_count > 1 ? "s" : ""}</span>
                  )}
                </div>
              </div>

              <button
                onClick={() => deleteRedirect(r.id)}
                className="shrink-0 text-muted-foreground hover:text-red-600 transition-colors"
                title="Supprimer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RedirectsManager;
