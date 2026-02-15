import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, TrendingUp, Users, Target, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend,
} from "recharts";
import { format, subMonths, startOfMonth, endOfMonth } from "date-fns";
import { fr } from "date-fns/locale";

interface PreReg {
  id: string;
  status: string;
  formation_title: string;
  formation_duration: string;
  created_at: string;
}

interface Appointment {
  id: string;
  status: string;
  formation_choice: string;
  created_at: string;
}

interface Subscriber {
  id: string;
  status: string;
  source: string | null;
  subscribed_at: string;
}

const COLORS = ["#1B5E20", "#F39C12", "#E74C3C", "#3498DB", "#9B59B6", "#1ABC9C"];

const AdminDashboard = () => {
  const [preRegs, setPreRegs] = useState<PreReg[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      const [prRes, apRes, nlRes] = await Promise.all([
        supabase.from("pre_registrations").select("id, status, formation_title, formation_duration, created_at"),
        supabase.from("appointments").select("id, status, formation_choice, created_at"),
        supabase.from("newsletter_subscribers").select("id, status, source, subscribed_at"),
      ]);
      setPreRegs(prRes.data || []);
      setAppointments(apRes.data || []);
      setSubscribers(nlRes.data || []);
      setLoading(false);
    };
    fetchAll();
  }, []);

  // ── KPIs ──
  const kpis = useMemo(() => {
    const totalLeads = preRegs.length + appointments.length;
    const confirmed = preRegs.filter(r => r.status === "confirmed").length +
      appointments.filter(a => a.status === "confirmed").length;
    const conversionRate = totalLeads > 0 ? Math.round((confirmed / totalLeads) * 100) : 0;
    const pendingCount = preRegs.filter(r => r.status === "pending").length +
      appointments.filter(a => a.status === "pending").length;
    const activeSubscribers = subscribers.filter(s => s.status === "active").length;

    return { totalLeads, confirmed, conversionRate, pendingCount, activeSubscribers };
  }, [preRegs, appointments, subscribers]);

  // ── Monthly registrations (last 6 months) ──
  const monthlyData = useMemo(() => {
    const months: { label: string; preRegs: number; rdv: number; newsletter: number }[] = [];
    for (let i = 5; i >= 0; i--) {
      const date = subMonths(new Date(), i);
      const start = startOfMonth(date);
      const end = endOfMonth(date);
      const label = format(date, "MMM yy", { locale: fr });

      const prCount = preRegs.filter(r => {
        const d = new Date(r.created_at);
        return d >= start && d <= end;
      }).length;
      const apCount = appointments.filter(a => {
        const d = new Date(a.created_at);
        return d >= start && d <= end;
      }).length;
      const nlCount = subscribers.filter(s => {
        const d = new Date(s.subscribed_at);
        return d >= start && d <= end;
      }).length;

      months.push({ label, preRegs: prCount, rdv: apCount, newsletter: nlCount });
    }
    return months;
  }, [preRegs, appointments, subscribers]);

  // ── Formation breakdown (pie) ──
  const formationBreakdown = useMemo(() => {
    const map: Record<string, number> = {};
    preRegs.forEach(r => {
      const key = r.formation_title || "Autre";
      map[key] = (map[key] || 0) + 1;
    });
    return Object.entries(map)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([name, value]) => ({ name: name.length > 25 ? name.slice(0, 22) + "…" : name, value }));
  }, [preRegs]);

  // ── Source breakdown (newsletter) ──
  const sourceBreakdown = useMemo(() => {
    const map: Record<string, number> = {};
    subscribers.forEach(s => {
      const key = s.source || "direct";
      map[key] = (map[key] || 0) + 1;
    });
    return Object.entries(map)
      .sort((a, b) => b[1] - a[1])
      .map(([name, value]) => ({ name, value }));
  }, [subscribers]);

  // ── Status funnel ──
  const statusFunnel = useMemo(() => {
    const statuses = ["pending", "contacted", "confirmed", "cancelled"];
    return statuses.map(s => ({
      name: s === "pending" ? "En attente" : s === "contacted" ? "Contacté" : s === "confirmed" ? "Confirmé" : "Annulé",
      value: preRegs.filter(r => r.status === s).length,
    }));
  }, [preRegs]);

  if (loading) {
    return (
      <div className="p-12 text-center">
        <Loader2 className="w-8 h-8 text-forest animate-spin mx-auto mb-4" />
        <p className="text-warm-gray-600">Chargement des statistiques…</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: "Total leads", value: kpis.totalLeads, icon: Users, color: "bg-primary/10 text-primary" },
          { label: "Confirmés", value: kpis.confirmed, icon: Target, color: "bg-green-100 text-green-700" },
          { label: "Taux conversion", value: `${kpis.conversionRate}%`, icon: TrendingUp, color: "bg-accent/10 text-accent" },
          { label: "En attente", value: kpis.pendingCount, icon: BarChart3, color: "bg-yellow-100 text-yellow-700" },
          { label: "Abonnés actifs", value: kpis.activeSubscribers, icon: Users, color: "bg-blue-100 text-blue-700" },
        ].map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-xl p-4 shadow-sm border border-border"
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${kpi.color}`}>
                <kpi.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{kpi.label}</p>
                <p className="text-xl font-bold text-foreground">{kpi.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Monthly Evolution */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-border">
          <h3 className="text-sm font-bold text-foreground mb-4">Inscriptions par mois (6 derniers mois)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={monthlyData} barGap={2}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="label" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="preRegs" name="Pré-inscriptions" fill="#1B5E20" radius={[4, 4, 0, 0]} />
              <Bar dataKey="rdv" name="Rendez-vous" fill="#F39C12" radius={[4, 4, 0, 0]} />
              <Bar dataKey="newsletter" name="Newsletter" fill="#3498DB" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Conversion funnel */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-border">
          <h3 className="text-sm font-bold text-foreground mb-4">Tunnel de conversion (pré-inscriptions)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={statusFunnel} layout="vertical" barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" allowDecimals={false} tick={{ fontSize: 12 }} />
              <YAxis dataKey="name" type="category" width={90} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="value" name="Leads" radius={[0, 4, 4, 0]}>
                {statusFunnel.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Formation popularity */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-border">
          <h3 className="text-sm font-bold text-foreground mb-4">Répartition par formation</h3>
          {formationBreakdown.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-12">Aucune donnée</p>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={formationBreakdown}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  labelLine={false}
                >
                  {formationBreakdown.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Sources */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-border">
          <h3 className="text-sm font-bold text-foreground mb-4">Sources d'acquisition (newsletter)</h3>
          {sourceBreakdown.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-12">Aucune donnée</p>
          ) : (
            <div className="space-y-3 pt-2">
              {sourceBreakdown.map((src, i) => {
                const max = sourceBreakdown[0].value;
                const pct = max > 0 ? (src.value / max) * 100 : 0;
                return (
                  <div key={src.name} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-foreground capitalize">{src.name}</span>
                      <span className="text-muted-foreground">{src.value}</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.8, delay: i * 0.1 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: COLORS[i % COLORS.length] }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
