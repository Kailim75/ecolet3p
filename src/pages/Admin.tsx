import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Users, Mail, FileText, LogOut, Download, Trash2, 
  RefreshCw, Search, Filter, ChevronDown, Loader2,
  CheckCircle, XCircle, Clock, BookOpen, Calendar, Send
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
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import FormationsManager from "@/components/admin/FormationsManager";
import SessionsManager from "@/components/admin/SessionsManager";
import AppointmentsManager from "@/components/admin/AppointmentsManager";
import EmailLogsManager from "@/components/admin/EmailLogsManager";

type Tab = "newsletter" | "preregistrations" | "formations" | "sessions" | "appointments" | "emails";

interface NewsletterSubscriber {
  id: string;
  email: string;
  status: string;
  source: string | null;
  subscribed_at: string;
}

interface PreRegistration {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  formation_title: string;
  formation_duration: string;
  status: string;
  created_at: string;
}

const Admin = () => {
  const { user, isAdmin, isLoading, signOut } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<Tab>("newsletter");
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [preRegistrations, setPreRegistrations] = useState<PreRegistration[]>([]);
  const [appointments, setAppointments] = useState<{ id: string; status: string }[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{ id: string; type: Tab } | null>(null);

  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) {
      navigate("/admin-login");
    }
  }, [user, isAdmin, isLoading, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchData();
      fetchAppointmentsStats();
    }
  }, [user, isAdmin, activeTab]);

  const fetchAppointmentsStats = async () => {
    try {
      const { data, error } = await supabase
        .from("appointments")
        .select("id, status");
      
      if (error) throw error;
      setAppointments(data || []);
    } catch (err) {
      console.error("Error fetching appointments stats:", err);
    }
  };

  const fetchData = async () => {
    setIsDataLoading(true);
    try {
      if (activeTab === "newsletter") {
        const { data, error } = await supabase
          .from("newsletter_subscribers")
          .select("*")
          .order("subscribed_at", { ascending: false });

        if (error) throw error;
        setSubscribers(data || []);
      } else {
        const { data, error } = await supabase
          .from("pre_registrations")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setPreRegistrations(data || []);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      toast.error("Erreur lors du chargement des données");
    } finally {
      setIsDataLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string, type: Tab) => {
    try {
      const table = type === "newsletter" ? "newsletter_subscribers" : "pre_registrations";
      const { error } = await supabase
        .from(table)
        .update({ status: newStatus })
        .eq("id", id);

      if (error) throw error;
      
      toast.success("Statut mis à jour");
      fetchData();
    } catch (err) {
      console.error("Error updating status:", err);
      toast.error("Erreur lors de la mise à jour");
    }
  };

  const handleDelete = async () => {
    if (!itemToDelete) return;

    try {
      const table = itemToDelete.type === "newsletter" ? "newsletter_subscribers" : "pre_registrations";
      const { error } = await supabase
        .from(table)
        .delete()
        .eq("id", itemToDelete.id);

      if (error) throw error;
      
      toast.success("Supprimé avec succès");
      fetchData();
    } catch (err) {
      console.error("Error deleting:", err);
      toast.error("Erreur lors de la suppression");
    } finally {
      setDeleteDialogOpen(false);
      setItemToDelete(null);
    }
  };

  const exportToCSV = () => {
    const data = activeTab === "newsletter" ? subscribers : preRegistrations;
    
    if (data.length === 0) {
      toast.error("Aucune donnée à exporter");
      return;
    }

    const headers = Object.keys(data[0]).join(",");
    const rows = data.map(item => 
      Object.values(item).map(v => `"${v || ""}"`).join(",")
    ).join("\n");
    
    const csv = `${headers}\n${rows}`;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${activeTab}_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast.success("Export réussi");
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin-login");
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      active: "bg-green-100 text-green-700",
      unsubscribed: "bg-gray-100 text-gray-600",
      pending: "bg-yellow-100 text-yellow-700",
      contacted: "bg-blue-100 text-blue-700",
      confirmed: "bg-green-100 text-green-700",
      cancelled: "bg-red-100 text-red-700",
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status] || "bg-gray-100 text-gray-600"}`}>
        {status}
      </span>
    );
  };

  const filteredSubscribers = subscribers.filter(sub => {
    const matchesSearch = sub.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || sub.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredPreRegistrations = preRegistrations.filter(reg => {
    const matchesSearch = 
      reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.last_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || reg.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-forest animate-spin" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-forest text-cream py-4 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gold/20 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Administration</h1>
              <p className="text-cream/70 text-sm">Campus T3P</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-cream/70 text-sm hidden md:block">{user?.email}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSignOut}
              className="text-cream hover:bg-cream/10"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-forest/10 rounded-xl flex items-center justify-center">
                <Mail className="w-6 h-6 text-forest" />
              </div>
              <div>
                <p className="text-warm-gray-600 text-sm">Abonnés Newsletter</p>
                <p className="text-2xl font-bold text-forest">
                  {subscribers.filter(s => s.status === "active").length}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-gold" />
              </div>
              <div>
                <p className="text-warm-gray-600 text-sm">Pré-inscriptions</p>
                <p className="text-2xl font-bold text-forest">{preRegistrations.length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-warm-gray-600 text-sm">Rendez-vous</p>
                <p className="text-2xl font-bold text-forest">{appointments.length}</p>
                <p className="text-xs text-yellow-600">
                  {appointments.filter(a => a.status === "pending").length} en attente
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-warm-gray-600 text-sm">En attente (total)</p>
                <p className="text-2xl font-bold text-forest">
                  {preRegistrations.filter(r => r.status === "pending").length + appointments.filter(a => a.status === "pending").length}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="border-b border-gray-100">
            <div className="flex">
              <button
                onClick={() => { setActiveTab("newsletter"); setSearchTerm(""); setStatusFilter("all"); }}
                className={`px-6 py-4 font-medium transition-colors ${
                  activeTab === "newsletter"
                    ? "text-forest border-b-2 border-forest bg-forest/5"
                    : "text-warm-gray-600 hover:text-forest"
                }`}
              >
                <Mail className="w-4 h-4 inline-block mr-2" />
                Newsletter
              </button>
              <button
                onClick={() => { setActiveTab("preregistrations"); setSearchTerm(""); setStatusFilter("all"); }}
                className={`px-6 py-4 font-medium transition-colors ${
                  activeTab === "preregistrations"
                    ? "text-forest border-b-2 border-forest bg-forest/5"
                    : "text-warm-gray-600 hover:text-forest"
                }`}
              >
                <FileText className="w-4 h-4 inline-block mr-2" />
                Pré-inscriptions
              </button>
              <button
                onClick={() => { setActiveTab("formations"); setSearchTerm(""); setStatusFilter("all"); }}
                className={`px-6 py-4 font-medium transition-colors ${
                  activeTab === "formations"
                    ? "text-forest border-b-2 border-forest bg-forest/5"
                    : "text-warm-gray-600 hover:text-forest"
                }`}
              >
                <BookOpen className="w-4 h-4 inline-block mr-2" />
                Formations
              </button>
              <button
                onClick={() => { setActiveTab("sessions"); setSearchTerm(""); setStatusFilter("all"); }}
                className={`px-6 py-4 font-medium transition-colors ${
                  activeTab === "sessions"
                    ? "text-forest border-b-2 border-forest bg-forest/5"
                    : "text-warm-gray-600 hover:text-forest"
                }`}
              >
                <Calendar className="w-4 h-4 inline-block mr-2" />
                Sessions
              </button>
              <button
                onClick={() => { setActiveTab("appointments"); setSearchTerm(""); setStatusFilter("all"); }}
                className={`px-6 py-4 font-medium transition-colors ${
                  activeTab === "appointments"
                    ? "text-forest border-b-2 border-forest bg-forest/5"
                    : "text-warm-gray-600 hover:text-forest"
                }`}
              >
                <Clock className="w-4 h-4 inline-block mr-2" />
                Rendez-vous
              </button>
              <button
                onClick={() => { setActiveTab("emails"); setSearchTerm(""); setStatusFilter("all"); }}
                className={`px-6 py-4 font-medium transition-colors ${
                  activeTab === "emails"
                    ? "text-forest border-b-2 border-forest bg-forest/5"
                    : "text-warm-gray-600 hover:text-forest"
                }`}
              >
                <Send className="w-4 h-4 inline-block mr-2" />
                Emails
              </button>
            </div>
          </div>

          {/* Tab content */}
          {activeTab === "formations" ? (
            <FormationsManager />
          ) : activeTab === "sessions" ? (
            <SessionsManager />
          ) : activeTab === "appointments" ? (
            <AppointmentsManager />
          ) : activeTab === "emails" ? (
            <div className="p-6">
              <EmailLogsManager />
            </div>
          ) : (
            <>
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
                    {activeTab === "newsletter" ? (
                      <>
                        <SelectItem value="active">Actif</SelectItem>
                        <SelectItem value="unsubscribed">Désinscrit</SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="pending">En attente</SelectItem>
                        <SelectItem value="contacted">Contacté</SelectItem>
                        <SelectItem value="confirmed">Confirmé</SelectItem>
                        <SelectItem value="cancelled">Annulé</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>

                <Button variant="outline" size="sm" onClick={fetchData}>
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
            {isDataLoading ? (
              <div className="p-12 text-center">
                <Loader2 className="w-8 h-8 text-forest animate-spin mx-auto mb-4" />
                <p className="text-warm-gray-600">Chargement...</p>
              </div>
            ) : activeTab === "newsletter" ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Date d'inscription</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubscribers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-12 text-warm-gray-500">
                        Aucun abonné trouvé
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredSubscribers.map((sub) => (
                      <TableRow key={sub.id}>
                        <TableCell className="font-medium">{sub.email}</TableCell>
                        <TableCell>{sub.source || "-"}</TableCell>
                        <TableCell>
                          <Select
                            value={sub.status}
                            onValueChange={(value) => handleStatusChange(sub.id, value, "newsletter")}
                          >
                            <SelectTrigger className="w-[130px] h-8">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="active">Actif</SelectItem>
                              <SelectItem value="unsubscribed">Désinscrit</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          {new Date(sub.subscribed_at).toLocaleDateString("fr-FR", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setItemToDelete({ id: sub.id, type: "newsletter" });
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
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Téléphone</TableHead>
                    <TableHead>Formation</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPreRegistrations.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-12 text-warm-gray-500">
                        Aucune pré-inscription trouvée
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredPreRegistrations.map((reg) => (
                      <TableRow key={reg.id}>
                        <TableCell className="font-medium">
                          {reg.first_name} {reg.last_name}
                        </TableCell>
                        <TableCell>{reg.email}</TableCell>
                        <TableCell>{reg.phone}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium text-sm">{reg.formation_title}</p>
                            <p className="text-xs text-warm-gray-500">{reg.formation_duration}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Select
                            value={reg.status}
                            onValueChange={(value) => handleStatusChange(reg.id, value, "preregistrations")}
                          >
                            <SelectTrigger className="w-[130px] h-8">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">En attente</SelectItem>
                              <SelectItem value="contacted">Contacté</SelectItem>
                              <SelectItem value="confirmed">Confirmé</SelectItem>
                              <SelectItem value="cancelled">Annulé</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          {new Date(reg.created_at).toLocaleDateString("fr-FR", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setItemToDelete({ id: reg.id, type: "preregistrations" });
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
            </>
          )}
        </div>
      </main>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. Êtes-vous sûr de vouloir supprimer cet élément ?
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

export default Admin;
