import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Pencil, Trash2, Save, X, Loader2, Calendar,
  Clock, MapPin, Users, CheckCircle, XCircle, AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface Formation {
  id: string;
  title: string;
  duration: string;
  price: number | null;
}

interface FormationSession {
  id: string;
  formation_id: string;
  start_date: string;
  end_date: string | null;
  start_time: string;
  end_time: string;
  location: string | null;
  max_participants: number;
  current_participants: number;
  price_override: number | null;
  status: string;
  notes: string | null;
  created_at: string;
  formations?: Formation;
}

const STATUS_OPTIONS = [
  { value: "upcoming", label: "À venir", color: "bg-blue-100 text-blue-700" },
  { value: "ongoing", label: "En cours", color: "bg-green-100 text-green-700" },
  { value: "completed", label: "Terminée", color: "bg-gray-100 text-gray-600" },
  { value: "cancelled", label: "Annulée", color: "bg-red-100 text-red-700" },
];

const SessionsManager = () => {
  const [sessions, setSessions] = useState<FormationSession[]>([]);
  const [formations, setFormations] = useState<Formation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [sessionToDelete, setSessionToDelete] = useState<string | null>(null);
  const [editingSession, setEditingSession] = useState<FormationSession | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [filterFormation, setFilterFormation] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Form state
  const [formData, setFormData] = useState({
    formation_id: "",
    start_date: "",
    end_date: "",
    start_time: "09:00",
    end_time: "17:00",
    location: "Campus T3P - Paris",
    max_participants: 12,
    current_participants: 0,
    price_override: "",
    status: "upcoming",
    notes: "",
  });

  useEffect(() => {
    fetchFormations();
    fetchSessions();
  }, []);

  const fetchFormations = async () => {
    try {
      const { data, error } = await supabase
        .from("formations")
        .select("id, title, duration, price")
        .eq("is_active", true)
        .order("display_order");

      if (error) throw error;
      setFormations(data || []);
    } catch (err) {
      console.error("Error fetching formations:", err);
    }
  };

  const fetchSessions = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("formation_sessions")
        .select(`
          *,
          formations:formation_id (id, title, duration, price)
        `)
        .order("start_date", { ascending: true });

      if (error) throw error;
      setSessions(data || []);
    } catch (err) {
      console.error("Error fetching sessions:", err);
      toast.error("Erreur lors du chargement des sessions");
    } finally {
      setIsLoading(false);
    }
  };

  const openCreateDialog = () => {
    setEditingSession(null);
    setFormData({
      formation_id: formations[0]?.id || "",
      start_date: "",
      end_date: "",
      start_time: "09:00",
      end_time: "17:00",
      location: "Campus T3P - Paris",
      max_participants: 12,
      current_participants: 0,
      price_override: "",
      status: "upcoming",
      notes: "",
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (session: FormationSession) => {
    setEditingSession(session);
    setFormData({
      formation_id: session.formation_id,
      start_date: session.start_date,
      end_date: session.end_date || "",
      start_time: session.start_time,
      end_time: session.end_time,
      location: session.location || "",
      max_participants: session.max_participants,
      current_participants: session.current_participants,
      price_override: session.price_override?.toString() || "",
      status: session.status,
      notes: session.notes || "",
    });
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.formation_id || !formData.start_date) {
      toast.error("La formation et la date de début sont obligatoires");
      return;
    }

    setIsSaving(true);
    try {
      const dataToSave = {
        formation_id: formData.formation_id,
        start_date: formData.start_date,
        end_date: formData.end_date || null,
        start_time: formData.start_time,
        end_time: formData.end_time,
        location: formData.location || null,
        max_participants: formData.max_participants,
        current_participants: formData.current_participants,
        price_override: formData.price_override ? parseFloat(formData.price_override) : null,
        status: formData.status,
        notes: formData.notes || null,
      };

      if (editingSession) {
        const { error } = await supabase
          .from("formation_sessions")
          .update(dataToSave)
          .eq("id", editingSession.id);

        if (error) throw error;
        toast.success("Session mise à jour avec succès");
      } else {
        const { error } = await supabase
          .from("formation_sessions")
          .insert(dataToSave);

        if (error) throw error;
        toast.success("Session créée avec succès");
      }

      setIsDialogOpen(false);
      fetchSessions();
    } catch (err) {
      console.error("Error saving session:", err);
      toast.error("Erreur lors de l'enregistrement");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!sessionToDelete) return;

    try {
      const { error } = await supabase
        .from("formation_sessions")
        .delete()
        .eq("id", sessionToDelete);

      if (error) throw error;
      toast.success("Session supprimée");
      fetchSessions();
    } catch (err) {
      console.error("Error deleting session:", err);
      toast.error("Erreur lors de la suppression");
    } finally {
      setIsDeleteDialogOpen(false);
      setSessionToDelete(null);
    }
  };

  const getStatusBadge = (status: string) => {
    const option = STATUS_OPTIONS.find((s) => s.value === status);
    return option ? (
      <Badge className={option.color}>{option.label}</Badge>
    ) : (
      <Badge variant="secondary">{status}</Badge>
    );
  };

  const getAvailableSpots = (session: FormationSession) => {
    return session.max_participants - session.current_participants;
  };

  const filteredSessions = sessions.filter((session) => {
    const matchFormation = filterFormation === "all" || session.formation_id === filterFormation;
    const matchStatus = filterStatus === "all" || session.status === filterStatus;
    return matchFormation && matchStatus;
  });

  if (isLoading) {
    return (
      <div className="p-12 text-center">
        <Loader2 className="w-8 h-8 text-forest animate-spin mx-auto mb-4" />
        <p className="text-warm-gray-600">Chargement des sessions...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg font-semibold text-forest">Sessions de Formation</h2>
          <p className="text-sm text-warm-gray-600">{sessions.length} session(s) planifiée(s)</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Select value={filterFormation} onValueChange={setFilterFormation}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Toutes les formations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les formations</SelectItem>
              {formations.map((f) => (
                <SelectItem key={f.id} value={f.id}>
                  {f.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Tous les statuts" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              {STATUS_OPTIONS.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={openCreateDialog} className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle session
          </Button>
        </div>
      </div>

      {/* Sessions List */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredSessions.map((session, index) => {
            const formation = session.formations as unknown as Formation;
            const spots = getAvailableSpots(session);
            const isFull = spots <= 0;

            return (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: index * 0.03 }}
                className={`bg-white rounded-xl p-4 border ${
                  session.status === "cancelled"
                    ? "border-red-200 bg-red-50/30"
                    : session.status === "completed"
                    ? "border-gray-200 bg-gray-50/30"
                    : isFull
                    ? "border-orange-200 bg-orange-50/30"
                    : "border-gray-200"
                } hover:shadow-md transition-shadow`}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  {/* Date */}
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="w-14 h-14 rounded-xl bg-forest/10 flex flex-col items-center justify-center">
                      <span className="text-xs text-forest/70 uppercase">
                        {format(new Date(session.start_date), "MMM", { locale: fr })}
                      </span>
                      <span className="text-xl font-bold text-forest">
                        {format(new Date(session.start_date), "dd")}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-semibold text-forest">
                        {formation?.title || "Formation inconnue"}
                      </h3>
                      {getStatusBadge(session.status)}
                      {isFull && session.status === "upcoming" && (
                        <Badge className="bg-orange-100 text-orange-700">Complet</Badge>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-warm-gray-600">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {session.start_time} - {session.end_time}
                      </span>
                      {session.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {session.location}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        {session.current_participants}/{session.max_participants} inscrits
                        {spots > 0 && (
                          <span className="text-green-600 font-medium">
                            ({spots} place{spots > 1 ? "s" : ""})
                          </span>
                        )}
                      </span>
                      {session.price_override && (
                        <span className="font-medium text-forest">
                          {session.price_override.toFixed(0)} €
                        </span>
                      )}
                    </div>

                    {session.end_date && session.end_date !== session.start_date && (
                      <p className="text-xs text-warm-gray-500 mt-1">
                        Du {format(new Date(session.start_date), "dd/MM/yyyy")} au{" "}
                        {format(new Date(session.end_date), "dd/MM/yyyy")}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEditDialog(session)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSessionToDelete(session.id);
                        setIsDeleteDialogOpen(true);
                      }}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {filteredSessions.length === 0 && (
          <div className="text-center py-12 text-warm-gray-500">
            <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Aucune session trouvée</p>
            <Button onClick={openCreateDialog} variant="outline" className="mt-4">
              <Plus className="w-4 h-4 mr-2" />
              Planifier une session
            </Button>
          </div>
        )}
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingSession ? "Modifier la session" : "Nouvelle session"}
            </DialogTitle>
            <DialogDescription>
              {editingSession
                ? "Modifiez les informations de la session"
                : "Planifiez une nouvelle session de formation"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="formation_id">Formation *</Label>
              <Select
                value={formData.formation_id}
                onValueChange={(value) => setFormData({ ...formData, formation_id: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une formation" />
                </SelectTrigger>
                <SelectContent>
                  {formations.map((f) => (
                    <SelectItem key={f.id} value={f.id}>
                      {f.title} ({f.duration})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start_date">Date de début *</Label>
                <Input
                  id="start_date"
                  type="date"
                  value={formData.start_date}
                  onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end_date">Date de fin</Label>
                <Input
                  id="end_date"
                  type="date"
                  value={formData.end_date}
                  onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start_time">Heure de début</Label>
                <Input
                  id="start_time"
                  type="time"
                  value={formData.start_time}
                  onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end_time">Heure de fin</Label>
                <Input
                  id="end_time"
                  type="time"
                  value={formData.end_time}
                  onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Lieu</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Campus T3P - Paris"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="max_participants">Places max</Label>
                <Input
                  id="max_participants"
                  type="number"
                  min="1"
                  value={formData.max_participants}
                  onChange={(e) =>
                    setFormData({ ...formData, max_participants: parseInt(e.target.value) || 1 })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="current_participants">Inscrits actuels</Label>
                <Input
                  id="current_participants"
                  type="number"
                  min="0"
                  value={formData.current_participants}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      current_participants: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price_override">Prix spécifique (€)</Label>
                <Input
                  id="price_override"
                  type="number"
                  step="0.01"
                  value={formData.price_override}
                  onChange={(e) => setFormData({ ...formData, price_override: e.target.value })}
                  placeholder="Laisser vide = prix formation"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Statut</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUS_OPTIONS.map((s) => (
                      <SelectItem key={s.value} value={s.value}>
                        {s.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes internes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Notes visibles uniquement par les admins..."
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Enregistrement...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  {editingSession ? "Mettre à jour" : "Créer"}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer la session</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. La session sera définitivement supprimée.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SessionsManager;
