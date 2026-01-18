import { useState, useEffect } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  Search,
  Filter,
  RefreshCw,
  Download,
  Trash2,
  Loader2,
  Calendar,
  Clock,
  User,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Appointment {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  formation_choice: string;
  appointment_date: string;
  appointment_time: string;
  status: string;
  notes: string | null;
  created_at: string;
}

const AppointmentsManager = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("appointments")
        .select("*")
        .order("appointment_date", { ascending: true });

      if (error) throw error;
      setAppointments(data || []);
    } catch (err) {
      console.error("Error fetching appointments:", err);
      toast.error("Erreur lors du chargement des rendez-vous");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("appointments")
        .update({ status: newStatus })
        .eq("id", id);

      if (error) throw error;
      toast.success("Statut mis à jour");
      fetchAppointments();
    } catch (err) {
      console.error("Error updating status:", err);
      toast.error("Erreur lors de la mise à jour");
    }
  };

  const handleDelete = async () => {
    if (!itemToDelete) return;

    try {
      const { error } = await supabase
        .from("appointments")
        .delete()
        .eq("id", itemToDelete);

      if (error) throw error;
      toast.success("Rendez-vous supprimé");
      fetchAppointments();
    } catch (err) {
      console.error("Error deleting:", err);
      toast.error("Erreur lors de la suppression");
    } finally {
      setDeleteDialogOpen(false);
      setItemToDelete(null);
    }
  };

  const exportToCSV = () => {
    if (appointments.length === 0) {
      toast.error("Aucune donnée à exporter");
      return;
    }

    const headers = Object.keys(appointments[0]).join(",");
    const rows = appointments
      .map((item) =>
        Object.values(item)
          .map((v) => `"${v || ""}"`)
          .join(",")
      )
      .join("\n");

    const csv = `${headers}\n${rows}`;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `rendez-vous_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    toast.success("Export réussi");
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-700",
      confirmed: "bg-green-100 text-green-700",
      cancelled: "bg-red-100 text-red-700",
      completed: "bg-blue-100 text-blue-700",
    };

    const labels: Record<string, string> = {
      pending: "En attente",
      confirmed: "Confirmé",
      cancelled: "Annulé",
      completed: "Terminé",
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          styles[status] || "bg-gray-100 text-gray-600"
        }`}
      >
        {labels[status] || status}
      </span>
    );
  };

  const filteredAppointments = appointments.filter((apt) => {
    const matchesSearch =
      apt.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.formation_choice.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || apt.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Stats
  const pendingCount = appointments.filter((a) => a.status === "pending").length;
  const confirmedCount = appointments.filter((a) => a.status === "confirmed").length;
  const todayCount = appointments.filter(
    (a) => a.appointment_date === format(new Date(), "yyyy-MM-dd")
  ).length;

  return (
    <div>
      {/* Stats */}
      <div className="p-4 border-b border-gray-100 grid grid-cols-3 gap-4">
        <div className="bg-yellow-50 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-yellow-700">{pendingCount}</p>
          <p className="text-sm text-yellow-600">En attente</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-green-700">{confirmedCount}</p>
          <p className="text-sm text-green-600">Confirmés</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-blue-700">{todayCount}</p>
          <p className="text-sm text-blue-600">Aujourd'hui</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="p-4 border-b border-gray-100 flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-gray-400" />
          <Input
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[150px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous</SelectItem>
            <SelectItem value="pending">En attente</SelectItem>
            <SelectItem value="confirmed">Confirmé</SelectItem>
            <SelectItem value="cancelled">Annulé</SelectItem>
            <SelectItem value="completed">Terminé</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" size="sm" onClick={fetchAppointments}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Actualiser
        </Button>

        <Button variant="outline" size="sm" onClick={exportToCSV}>
          <Download className="w-4 h-4 mr-2" />
          Exporter CSV
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="p-12 text-center">
            <Loader2 className="w-8 h-8 text-forest animate-spin mx-auto mb-4" />
            <p className="text-warm-gray-600">Chargement...</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Nom
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </div>
                </TableHead>
                <TableHead>Formation</TableHead>
                <TableHead>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Date
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Heure
                  </div>
                </TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAppointments.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-12 text-warm-gray-500"
                  >
                    Aucun rendez-vous trouvé
                  </TableCell>
                </TableRow>
              ) : (
                filteredAppointments.map((apt) => (
                  <TableRow key={apt.id}>
                    <TableCell className="font-medium">
                      {apt.first_name} {apt.last_name}
                    </TableCell>
                    <TableCell>{apt.email}</TableCell>
                    <TableCell>
                      <span className="text-sm">{apt.formation_choice}</span>
                    </TableCell>
                    <TableCell>
                      {format(new Date(apt.appointment_date), "dd MMM yyyy", {
                        locale: fr,
                      })}
                    </TableCell>
                    <TableCell>{apt.appointment_time}</TableCell>
                    <TableCell>
                      <Select
                        value={apt.status}
                        onValueChange={(value) =>
                          handleStatusChange(apt.id, value)
                        }
                      >
                        <SelectTrigger className="w-[130px] h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">En attente</SelectItem>
                          <SelectItem value="confirmed">Confirmé</SelectItem>
                          <SelectItem value="cancelled">Annulé</SelectItem>
                          <SelectItem value="completed">Terminé</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setItemToDelete(apt.id);
                          setDeleteDialogOpen(true);
                        }}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. Êtes-vous sûr de vouloir supprimer
              ce rendez-vous ?
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

export default AppointmentsManager;
