
import {
  LayoutDashboard,
  Plane,
  Users,
  Ticket,
  Building2,
  PlaneTakeoff,
  DoorOpen,
  Layers,
  MapPin,
  LogOut,
  Bell,
  Search,
  ChevronRight,
  TrendingUp,
  Clock,
  CalendarDays,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

import StatusBadge from "@shared/components/StatusBadge";

import {
  vols,
  passagers,
  reservations,
  compagnies,
  avions,
  portes,
  terminaux,
  utilisateurs,
} from "../../../../frontend/mock";

const navigation = [
  { label: "Tableau de bord", path: "/admin", icon: LayoutDashboard },
  { label: "Vols", path: "/admin/vols", icon: Plane },
  { label: "Passagers", path: "/admin/passagers", icon: Users },
  { label: "Réservations", path: "/admin/reservations", icon: Ticket },
  { label: "Compagnies", path: "/admin/compagnies", icon: Building2 },
  { label: "Avions", path: "/admin/avions", icon: PlaneTakeoff },
  { label: "Portes", path: "/admin/portes", icon: DoorOpen },
  { label: "Terminaux", path: "/admin/terminaux", icon: Layers },
  { label: "Emplacements", path: "/admin/emplacements", icon: MapPin },
  { label: "Utilisateurs", path: "/admin/utilisateurs", icon: Users },
];

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const formatTime = (date: string) =>
  new Date(date).toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });

export default function AdminDashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const totalVols = vols.length;
  const departs = vols.filter((vol) => vol.type === "depart").length;
  const arrivees = vols.filter((vol) => vol.type === "arrivee").length;
  const retards = vols.filter((vol) => vol.statut === "retarde").length;

  const aLHeure = vols.filter(
    (vol) => vol.statut === "a_l_heure"
  ).length;

  const annules = vols.filter(
    (vol) => vol.statut === "annule"
  ).length;

  const boarding = vols.filter(
    (vol) => vol.statut === "embarquement"
  ).length;

  const statistiques = [
    { label: "À l'heure", value: aLHeure, color: "#16A34A" },
    { label: "Retardés", value: retards, color: "#F59E0B" },
    { label: "Annulés", value: annules, color: "#DC2626" },
  ];

  const totalStatistiques = statistiques.reduce(
    (sum, item) => sum + item.value,
    0
  );

  const circumference = 2 * Math.PI * 42;

  let cumulativeOffset = 0;

  const portesClassees = portes
    .map((porte) => ({
      ...porte,
      nombreVols: vols.filter(
        (vol) => vol.porte_id === porte.id
      ).length,
    }))
    .sort((a, b) => b.nombreVols - a.nombreVols);

  const volsRecents = [...vols]
    .sort(
      (a, b) =>
        new Date(b.date_heure_depart).getTime() -
        new Date(a.date_heure_depart).getTime()
    )
    .slice(0, 5);

  const kpis = [
    {
      label: "Vols au total",
      value: totalVols,
      detail: "Tous les vols enregistrés",
      icon: Plane,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Départs",
      value: departs,
      detail: "Vols au départ",
      icon: PlaneTakeoff,
      color: "bg-violet-50 text-violet-600",
    },
    {
      label: "Arrivées",
      value: arrivees,
      detail: "Vols à l'arrivée",
      icon: MapPin,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Vols retardés",
      value: retards,
      detail: "Nécessitent une attention",
      icon: Clock,
      color: "bg-amber-50 text-amber-600",
    },
  ];

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">

      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Fermer le menu"
          onClick={closeSidebar}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-slate-950 text-white transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
          <div>
            <p className="text-lg font-bold tracking-wide">
              AÉROPORT<span className="text-violet-400">.</span>
            </p>
            <p className="mt-0.5 text-xs text-slate-400">
              Administration
            </p>
          </div>

          <button
            type="button"
            onClick={closeSidebar}
            className="rounded-lg p-2 text-slate-400 hover:bg-white/10 lg:hidden"
            aria-label="Fermer"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-5 pb-3 pt-7">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Menu principal
          </p>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/admin"}
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-violet-600 text-white shadow-lg shadow-violet-950/30"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                <Icon size={19} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 font-bold">
              A
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">
                Administrateur
              </p>
              <p className="text-xs text-slate-400">
                admin@aeroport.com
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              alert("La déconnexion sera disponible avec l'authentification.")
            }
            className="mt-3 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-400 transition hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut size={18} />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="min-h-screen lg:ml-64">

        {/* TOP BAR */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              aria-label="Ouvrir le menu"
              className="rounded-lg p-2 hover:bg-slate-100 lg:hidden"
            >
              <Menu size={22} />
            </button>

            <div>
              <h1 className="text-lg font-bold text-slate-900">
                Tableau de bord
              </h1>
              <p className="hidden text-xs text-slate-500 sm:block">
                Vue générale des opérations aéroportuaires
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-500 sm:flex">
              <CalendarDays size={15} />
              {new Date().toLocaleDateString("fr-FR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </div>

            <button
              type="button"
              aria-label="Notifications"
              onClick={() => alert("Aucune nouvelle notification.")}
              className="relative rounded-xl border border-slate-200 p-2.5 text-slate-500 hover:bg-slate-50"
            >
              <Bell size={19} />
              {retards > 0 && (
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
              )}
            </button>

            <div className="hidden h-9 w-9 items-center justify-center rounded-full bg-violet-100 font-bold text-violet-700 sm:flex">
              A
            </div>
          </div>
        </header>

        {/* DASHBOARD BODY */}
        <div className="space-y-7 p-4 sm:p-8">

          {/* WELCOME */}
          <section className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-violet-600">
                Espace administration
              </p>
              <h2 className="mt-1 text-2xl font-bold text-slate-900">
                Bonjour, Administrateur
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Voici un aperçu de l'activité de votre aéroport.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-2.5 text-xs font-semibold text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Données de démonstration
            </div>
          </section>

          {/* KPI CARDS */}
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {kpis.map((kpi) => {
              const Icon = kpi.icon;

              return (
                <div
                  key={kpi.label}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-500">
                      {kpi.label}
                    </span>
                    <div className={`rounded-xl p-2.5 ${kpi.color}`}>
                      <Icon size={20} />
                    </div>
                  </div>

                  <p className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
                    {kpi.value}
                  </p>

                  <p className="mt-2 text-xs text-slate-400">
                    {kpi.detail}
                  </p>
                </div>
              );
            })}
          </section>

          {/* SECONDARY STATS */}
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4">
              <div className="rounded-xl bg-violet-50 p-3 text-violet-600">
                <Users size={21} />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">
                  {passagers.length}
                </p>
                <p className="text-xs text-slate-500">
                  Passagers enregistrés
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4">
              <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                <Ticket size={21} />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">
                  {reservations.length}
                </p>
                <p className="text-xs text-slate-500">
                  Réservations
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4">
              <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
                <Clock size={21} />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">
                  {boarding}
                </p>
                <p className="text-xs text-slate-500">
                  En cours d'embarquement
                </p>
              </div>
            </div>
          </section>

          {/* CHART + GATES */}
          <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">

            {/* FLIGHT STATISTICS */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900">
                    Statistiques des vols
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    Répartition des statuts des vols
                  </p>
                </div>

                <TrendingUp size={20} className="text-violet-500" />
              </div>

              <div className="mt-7 flex flex-col items-center gap-7 sm:flex-row sm:justify-around">
                <div className="relative h-48 w-48 shrink-0">
                  <svg
                    viewBox="0 0 120 120"
                    className="h-full w-full -rotate-90"
                  >
                    <circle
                      cx="60"
                      cy="60"
                      r="42"
                      fill="none"
                      stroke="#F1F5F9"
                      strokeWidth="13"
                    />

                    {statistiques.map((item) => {
                      const segmentLength =
                        totalStatistiques > 0
                          ? (item.value / totalStatistiques) *
                            circumference
                          : 0;

                      const currentOffset = cumulativeOffset;
                      cumulativeOffset += segmentLength;

                      return (
                        <circle
                          key={item.label}
                          cx="60"
                          cy="60"
                          r="42"
                          fill="none"
                          stroke={item.color}
                          strokeWidth="13"
                          strokeDasharray={`${segmentLength} ${circumference - segmentLength}`}
                          strokeDashoffset={-currentOffset}
                          strokeLinecap="butt"
                        />
                      );
                    })}
                  </svg>

                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-slate-900">
                      {totalStatistiques}
                    </span>
                    <span className="text-xs text-slate-500">
                      Vols analysés
                    </span>
                  </div>
                </div>

                <div className="w-full space-y-4 sm:w-auto">
                  {statistiques.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between gap-5"
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm text-slate-600">
                          {item.label}
                        </span>
                      </div>

                      <span className="text-sm font-bold text-slate-900">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {boarding > 0 && (
                <p className="mt-5 border-t border-slate-100 pt-4 text-xs text-slate-500">
                  {boarding} vol(s) en cours d'embarquement ne sont pas inclus dans ce graphique.
                </p>
              )}
            </div>

            {/* TOP GATES */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900">
                    Utilisation des portes
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    Nombre de vols par porte
                  </p>
                </div>

                <DoorOpen size={20} className="text-violet-500" />
              </div>

              <div className="mt-6 space-y-5">
                {portesClassees.slice(0, 5).map((porte) => {
                  const pourcentage =
                    totalVols > 0
                      ? (porte.nombreVols / totalVols) * 100
                      : 0;

                  return (
                    <div key={porte.id}>
                      <div className="mb-2 flex items-center justify-between">
                        <div>
                          <span className="text-sm font-semibold text-slate-800">
                            Porte {porte.code}
                          </span>
                          <span className="ml-2 text-xs text-slate-400">
                            {terminaux.find(
                              (t) => t.id === porte.terminal_id
                            )?.nom}
                          </span>
                        </div>

                        <span className="text-xs font-bold text-slate-600">
                          {porte.nombreVols} vol(s)
                        </span>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-violet-500 transition-all"
                          style={{ width: `${pourcentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* RECENT FLIGHTS */}
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-5 sm:px-6">
              <div>
                <h3 className="font-bold text-slate-900">
                  Derniers vols enregistrés
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  Aperçu des vols programmés
                </p>
              </div>

              <NavLink
                to="/admin/vols"
                className="flex items-center gap-1 text-sm font-semibold text-violet-600 hover:text-violet-800"
              >
                Voir les vols
                <ChevronRight size={16} />
              </NavLink>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[750px] text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Vol</th>
                    <th className="px-6 py-4 font-semibold">Compagnie</th>
                    <th className="px-6 py-4 font-semibold">Destination</th>
                    <th className="px-6 py-4 font-semibold">Date</th>
                    <th className="px-6 py-4 font-semibold">Départ</th>
                    <th className="px-6 py-4 font-semibold">Statut</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {volsRecents.map((vol) => (
                    <tr
                      key={vol.id}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="px-6 py-4 font-bold text-slate-900">
                        {vol.numero}
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {compagnies.find(
                          (c) => c.id === vol.compagnie_id
                        )?.nom ?? "—"}
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {vol.destination}
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {formatDate(vol.date_heure_depart)}
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {formatTime(vol.date_heure_depart)}
                      </td>

                      <td className="px-6 py-4">
                        <StatusBadge statut={vol.statut} />
                      </td>
                    </tr>
                  ))}

                  {volsRecents.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-6 py-10 text-center text-slate-500"
                      >
                        Aucun vol enregistré.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 px-6 py-4 text-xs text-slate-400">
              <span>
                {vols.length} vol(s) · {compagnies.length} compagnies · {avions.length} avions
              </span>
              <span>
                {utilisateurs.length} utilisateur(s) enregistré(s)
              </span>
            </div>
          </section>

          <footer className="pb-3 text-center text-xs text-slate-400">
            Airport Management · Administration
          </footer>
        </div>
      </main>
    </div>
  );
}