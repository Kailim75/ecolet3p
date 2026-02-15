import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Pencil, Trash2, Save, X, Loader2, GripVertical,
  Car, Bike, Accessibility, RefreshCw, MapPin, BookOpen,
  CheckCircle, XCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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

interface Formation {
  id: string;
  title: string;
  description: string | null;
  duration: string;
  price: number | null;
  category: string;
  icon: string | null;
  features: string[] | null;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

const ICON_OPTIONS = [
  { value: "Car", label: "Voiture", icon: Car },
  { value: "Bike", label: "Moto", icon: Bike },
  { value: "Accessibility", label: "Accessibilité", icon: Accessibility },
  { value: "RefreshCw", label: "Recyclage", icon: RefreshCw },
  { value: "MapPin", label: "Localisation", icon: MapPin },
  { value: "BookOpen", label: "Livre", icon: BookOpen },
];

const CATEGORY_OPTIONS = [
  { value: "taxi", label: "TAXI" },
  { value: "vtc", label: "VTC" },
  { value: "vmdtr", label: "VMDTR" },
  { value: "tpmr", label: "TPMR" },
  { value: "continue", label: "Formation Continue" },
  { value: "mobilite", label: "Mobilité" },
  { value: "general", label: "Général" },
];

const getIconComponent = (iconName: string | null) => {
  const iconOption = ICON_OPTIONS.find(opt => opt.value === iconName);
  if (iconOption) {
    const IconComp = iconOption.icon;
    return <IconComp className="w-5 h-5" />;
  }
  return <Car className="w-5 h-5" />;
};

const FormationsManager = () => {
  const [formations, setFormations] = useState<Formation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [formationToDelete, setFormationToDelete] = useState<string | null>(null);
  const [editingFormation, setEditingFormation] = useState<Formation | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    price: "",
    category: "general",
    icon: "Car",
    features: "",
    is_active: true,
    display_order: 0,
  });

  useEffect(() => {
    fetchFormations();
  }, []);

  const fetchFormations = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("formations")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      setFormations(data || []);
    } catch (err) {
      console.error("Error fetching formations:", err);
      toast.error("Erreur lors du chargement des formations");
    } finally {
      setIsLoading(false);
    }
  };

  const openCreateDialog = () => {
    setEditingFormation(null);
    setFormData({
      title: "",
      description: "",
      duration: "",
      price: "",
      category: "general",
      icon: "Car",
      features: "",
      is_active: true,
      display_order: formations.length + 1,
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (formation: Formation) => {
    setEditingFormation(formation);
    setFormData({
      title: formation.title,
      description: formation.description || "",
      duration: formation.duration,
      price: formation.price?.toString() || "",
      category: formation.category,
      icon: formation.icon || "Car",
      features: formation.features?.join("\n") || "",
      is_active: formation.is_active,
      display_order: formation.display_order,
    });
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.title.trim() || !formData.duration.trim()) {
      toast.error("Le titre et la durée sont obligatoires");
      return;
    }

    setIsSaving(true);
    try {
      const dataToSave = {
        title: formData.title.trim(),
        description: formData.description.trim() || null,
        duration: formData.duration.trim(),
        price: formData.price ? parseFloat(formData.price) : null,
        category: formData.category,
        icon: formData.icon,
        features: formData.features.split("\n").filter(f => f.trim()),
        is_active: formData.is_active,
        display_order: formData.display_order,
      };

      if (editingFormation) {
        const { error } = await supabase
          .from("formations")
          .update(dataToSave)
          .eq("id", editingFormation.id);

        if (error) throw error;
        toast.success("Formation mise à jour avec succès");
      } else {
        const { error } = await supabase
          .from("formations")
          .insert(dataToSave);

        if (error) throw error;
        toast.success("Formation créée avec succès");
      }

      setIsDialogOpen(false);
      fetchFormations();
    } catch (err) {
      console.error("Error saving formation:", err);
      toast.error("Erreur lors de l'enregistrement");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!formationToDelete) return;

    try {
      const { error } = await supabase
        .from("formations")
        .delete()
        .eq("id", formationToDelete);

      if (error) throw error;
      toast.success("Formation supprimée");
      fetchFormations();
    } catch (err) {
      console.error("Error deleting formation:", err);
      toast.error("Erreur lors de la suppression");
    } finally {
      setIsDeleteDialogOpen(false);
      setFormationToDelete(null);
    }
  };

  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("formations")
        .update({ is_active: !currentStatus })
        .eq("id", id);

      if (error) throw error;
      toast.success(currentStatus ? "Formation désactivée" : "Formation activée");
      fetchFormations();
    } catch (err) {
      console.error("Error toggling status:", err);
      toast.error("Erreur lors de la mise à jour");
    }
  };

  if (isLoading) {
    return (
      <div className="p-12 text-center">
        <Loader2 className="w-8 h-8 text-forest animate-spin mx-auto mb-4" />
        <p className="text-warm-gray-600">Chargement des formations...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-forest">Gestion des Formations</h2>
          <p className="text-sm text-warm-gray-600">{formations.length} formation(s)</p>
        </div>
        <Button onClick={openCreateDialog} className="btn-primary">
          <Plus className="w-4 h-4 mr-2" />
          Nouvelle formation
        </Button>
      </div>

      {/* Formations Grid */}
      <div className="grid gap-4">
        <AnimatePresence>
          {formations.map((formation, index) => (
            <motion.div
              key={formation.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: index * 0.05 }}
              className={`bg-white rounded-xl p-4 border ${
                formation.is_active ? "border-gray-200" : "border-orange-200 bg-orange-50/50"
              } hover:shadow-md transition-shadow`}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                  formation.is_active ? "bg-forest/10 text-forest" : "bg-orange-100 text-orange-600"
                }`}>
                  {getIconComponent(formation.icon)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-forest">{formation.title}</h3>
                      <p className="text-sm text-warm-gray-600 line-clamp-1">
                        {formation.description || "Aucune description"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {!formation.is_active && (
                        <Badge variant="outline" className="text-orange-600 border-orange-300">
                          Inactive
                        </Badge>
                      )}
                      <Badge variant="secondary" className="uppercase text-xs">
                        {CATEGORY_OPTIONS.find(c => c.value === formation.category)?.label || formation.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-3 text-sm text-warm-gray-600">
                    <span className="flex items-center gap-1">
                      <RefreshCw className="w-3.5 h-3.5" />
                      {formation.duration}
                    </span>
                    {formation.price && (
                      <span className="font-medium text-forest">
                        {formation.price.toFixed(2)} €
                      </span>
                    )}
                    {formation.features && formation.features.length > 0 && (
                      <span className="text-warm-gray-400">
                        {formation.features.length} caractéristique(s)
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleActive(formation.id, formation.is_active)}
                    className={formation.is_active ? "text-green-600" : "text-orange-600"}
                  >
                    {formation.is_active ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <XCircle className="w-4 h-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openEditDialog(formation)}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setFormationToDelete(formation.id);
                      setIsDeleteDialogOpen(true);
                    }}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {formations.length === 0 && (
          <div className="text-center py-12 text-warm-gray-500">
            <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Aucune formation trouvée</p>
            <Button onClick={openCreateDialog} variant="outline" className="mt-4">
              <Plus className="w-4 h-4 mr-2" />
              Créer la première formation
            </Button>
          </div>
        )}
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingFormation ? "Modifier la formation" : "Nouvelle formation"}
            </DialogTitle>
            <DialogDescription>
              {editingFormation
                ? "Modifiez les informations de la formation"
                : "Remplissez les informations pour créer une nouvelle formation"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Titre *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Ex: Formation TAXI Initial"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Description de la formation..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Durée *</Label>
                <Input
                  id="duration"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="Ex: Journée (1 semaine)"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Prix (€)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="Ex: 1500.00"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Catégorie</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORY_OPTIONS.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="icon">Icône</Label>
                <Select
                  value={formData.icon}
                  onValueChange={(value) => setFormData({ ...formData, icon: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ICON_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        <div className="flex items-center gap-2">
                          <opt.icon className="w-4 h-4" />
                          {opt.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="features">Caractéristiques (une par ligne)</Label>
              <Textarea
                id="features"
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                placeholder="Réglementation taxi&#10;Gestion clientèle&#10;Sécurité routière"
                rows={4}
              />
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <Label htmlFor="is_active" className="font-medium">Formation active</Label>
                <p className="text-sm text-warm-gray-600">
                  Les formations inactives ne sont pas visibles sur le site
                </p>
              </div>
              <Switch
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="display_order">Ordre d'affichage</Label>
              <Input
                id="display_order"
                type="number"
                value={formData.display_order}
                onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
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
                  {editingFormation ? "Mettre à jour" : "Créer"}
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
            <AlertDialogTitle>Supprimer la formation</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. La formation sera définitivement supprimée.
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

export default FormationsManager;
