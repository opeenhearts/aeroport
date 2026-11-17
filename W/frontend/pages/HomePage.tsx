
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Plane,
  Bell,
  Search,
  Luggage,
  UserRound,
  Info,
  Clock,
  Map as MapIcon,
  ChevronRight,
  ArrowRight,
  X,
} from "lucide-react";

import { vols, portes, compagnies } from "../../../frontend/mock";

function formatCountdown(departure: Date, now: number): string {
  const difference = departure.getTime() - now;

  if (difference <= 0) return "Départ imminent";

  const totalMinutes = Math.ceil(difference / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0) {
    return `${hours} h ${minutes} min`;
  }

  return `${totalMinutes} min`;
}

const shortcuts = [
  {
    label: "Horaires des vols",
    Icon: Clock,
    background: "#E5EAFB",
    color: "#3156C8",
    to: "/recherche",
  },
  {
    label: "Plan de l'aéroport",
    Icon: MapIcon,
    background: "#EDE4FA",
    color: "#7946C8",
    to: "/carte",
  },
  {
    label: "Bagages",
    Icon: Luggage,
    background: "#FCEBD9",
    color: "#E69A22",
    to: "/bagages",
  },
  {
    label: "Mes vols",
    Icon: Plane,
    background: "#E1F2E9",
    color: "#15945C",
    to: "/mes-vols",
  },
  {
    label: "Mon profil",
    Icon: UserRound,
    background: "#F9E3EF",
    color: "#D94B91",
    to: "/profil",
  },
  {
    label: "Infos utiles",
    Icon: Info,
    background: "#DFF2F5",
    color: "#2395A8",
    to: "/services",
  },
];

export default function HomePage() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [now, setNow] = useState(Date.now());

  // Update the countdown every 30 seconds.
  useEffect(() => {
    const interval = window.setInterval(() => {
      setNow(Date.now());
    }, 30000);

    return () => window.clearInterval(interval);
  }, []);

  // Find the next upcoming departure.
  const flight = useMemo(() => {
    return [...vols]
      .filter((item) => {
        const departure = new Date(item.date_heure_depart).getTime();

        return item.type === "depart" && departure > now;
      })
      .sort(
        (a, b) =>
          new Date(a.date_heure_depart).getTime() -
          new Date(b.date_heure_depart).getTime()
      )[0] ?? null;
  }, [now]);

  const departureDate = flight
    ? new Date(flight.date_heure_depart)
    : null;

  const gate = flight?.porte_id
    ? portes.find((item) => item.id === flight.porte_id)
    : undefined;

  const airline = flight
    ? compagnies.find((item) => item.id === flight.compagnie_id)
    : undefined;

  const departureTime = departureDate
    ? departureDate.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "--:--";

  const statusLabel = !flight
    ? ""
    : flight.statut === "retarde"
      ? "Retardé"
      : flight.statut === "annule"
        ? "Annulé"
        : flight.statut === "embarquement"
          ? "Embarquement"
          : "À l'heure";

  const statusColor = !flight
    ? ""
    : flight.statut === "retarde"
      ? "bg-orange-500"
      : flight.statut === "annule"
        ? "bg-red-500"
        : flight.statut === "embarquement"
          ? "bg-[#7046D4]"
          : "bg-emerald-600";

  const countdown =
    flight && departureDate
      ? flight.statut === "embarquement"
        ? "Embarquement en cours"
        : formatCountdown(departureDate, now)
      : "";

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    navigate(
      search.trim()
        ? `/recherche?q=${encodeURIComponent(search.trim())}`
        : "/recherche"
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#F5F3FC] pb-28">

      {/* AIRPORT HEADER */}
      <header
        className="relative min-h-[335px] overflow-hidden bg-cover bg-center px-5 pb-20 pt-5 text-white"
        style={{
          backgroundImage: `
            linear-gradient(
              180deg,
              rgba(18, 22, 54, 0.55) 0%,
              rgba(23, 31, 73, 0.38) 45%,
              rgba(23, 31, 73, 0.75) 100%
            ),
            url('/W/images/Screenshot%202026-11-17%20005938.png')
          `,
        }}
      >
        <div className="relative z-10">

          {/* LOGO AND NOTIFICATIONS */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Plane
                size={29}
                className="shrink-0 rotate-[-12deg] text-[#FFC84A]"
                strokeWidth={2.5}
              />

             <div className="leading-tight">
               <p className="text-[13px] font-semibold tracking-wide">
                Aéroport International
              </p>
              <p className="text-[13px] font-semibold tracking-wide">
               Mohammed V de Casablanca
              </p>
           </div>
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => setShowNotifications(!showNotifications)}
                aria-label="Notifications"
                className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/15 transition hover:bg-white/25"
              >
                <Bell size={21} />

                <span className="absolute right-[8px] top-[7px] h-2.5 w-2.5 rounded-full border-2 border-[#27305D] bg-red-500" />
              </button>

              {showNotifications && (
                <div className="absolute right-0 top-12 z-30 w-64 rounded-2xl bg-white p-4 text-[#172653] shadow-xl">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="font-bold">Notifications</p>

                    <button
                      type="button"
                      onClick={() => setShowNotifications(false)}
                      aria-label="Fermer"
                    >
                      <X size={17} />
                    </button>
                  </div>

                  <p className="text-sm text-[#85879A]">
                    Vous retrouverez ici les notifications concernant vos
                    vols et votre voyage.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* WELCOME MESSAGE */}
          <div className="mt-9">
            <h1 className="text-[27px] font-bold leading-tight tracking-tight">
              Bonjour Wissal !
            </h1>

            <p className="mt-1 text-[17px] font-medium text-white/95">
              Bon voyage ✈
            </p>
          </div>

          {/* SEARCH BAR */}
          <form
            onSubmit={handleSearch}
            className="mt-6 flex h-[51px] w-full items-center gap-3 rounded-full bg-white px-4 shadow-lg"
          >
            <Search size={20} className="shrink-0 text-[#85879A]" />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Rechercher un vol, une porte…"
              className="min-w-0 flex-1 bg-transparent text-sm text-[#172653] outline-none placeholder:text-[#999AAA]"
            />

            <button
              type="submit"
              aria-label="Rechercher"
              className="text-[#7046D4]"
            >
              <ArrowRight size={19} />
            </button>
          </form>
        </div>
      </header>

      {/* PAGE CONTENT */}
      <main className="relative z-20 mx-auto -mt-[59px] w-full max-w-md px-2">

        {/* UPCOMING FLIGHT */}
        {flight && departureDate ? (
          <Link
            to="/mes-vols"
            className="block overflow-hidden rounded-[25px] bg-white shadow-[0_8px_28px_rgba(31,42,92,0.13)] transition active:scale-[0.99]"
          >
            <div className="p-5">

              {/* CARD HEADER */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-2">
                  <Plane
                    size={21}
                    className="shrink-0 text-[#E99A19]"
                    strokeWidth={2.5}
                  />

                  <h2 className="text-[15px] font-bold text-[#172653]">
                    Votre prochain vol
                  </h2>
                </div>

                <span
                  className={`shrink-0 rounded-full px-3 py-1.5 text-[10px] font-semibold text-white ${statusColor}`}
                >
                  {statusLabel}
                </span>
              </div>

              {/* FLIGHT INFORMATION */}
              <div className="mt-5 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[27px] font-extrabold leading-none tracking-tight text-[#172653]">
                    {flight.numero}
                  </p>

                  {airline && (
                    <p className="mt-1 text-[11px] font-medium text-[#85879A]">
                      {airline.nom}
                    </p>
                  )}

                  <p className="mt-2 text-[13px] font-medium text-[#25366B]">
                    {flight.origine}
                    <span className="mx-1">→</span>
                    {flight.destination}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-1">
                  <div className="text-right">
                    <p className="text-[11px] font-medium text-[#85879A]">
                      Départ
                    </p>

                    <p className="mt-0.5 text-[25px] font-extrabold leading-none text-[#172653]">
                      {departureTime}
                    </p>

                    <p className="mt-2 text-[12px] font-semibold text-[#25366B]">
                      Porte {gate?.code ?? "À confirmer"}
                    </p>
                  </div>

                  <ChevronRight
                    size={19}
                    className="mt-5 text-[#85879A]"
                  />
                </div>
              </div>
            </div>

            {/* BOARDING COUNTDOWN */}
            <div className="flex min-h-[48px] flex-wrap items-center justify-center gap-2 bg-[#FCEBD9] px-3 py-3">
              <Clock size={17} className="shrink-0 text-[#E99A19]" />

              <span className="text-[12px] font-medium text-[#6D5B48]">
                {flight.statut === "embarquement"
                  ? "Statut du vol"
                  : "Départ dans"}
              </span>

              <span className="text-[13px] font-extrabold text-[#E18B12]">
                {countdown}
              </span>
            </div>
          </Link>
        ) : (
          <div className="rounded-[25px] bg-white p-6 text-center shadow-[0_8px_28px_rgba(31,42,92,0.13)]">
            <Plane
              size={28}
              className="mx-auto text-[#7046D4]"
            />

            <h2 className="mt-3 text-[16px] font-bold text-[#172653]">
              Aucun vol à venir
            </h2>

            <p className="mt-1 text-[13px] text-[#85879A]">
              Consultez les horaires pour découvrir les prochains départs.
            </p>

            <Link
              to="/recherche"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#7046D4]"
            >
              Consulter les vols
              <ArrowRight size={16} />
            </Link>
          </div>
        )}

        {/* QUICK ACCESS */}
        <section className="mt-7">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-[20px] font-extrabold tracking-tight text-[#172653]">
              Accès rapide
            </h2>

            <Link
              to="/services"
              className="flex items-center gap-1 text-[12px] font-semibold text-[#3156C8]"
            >
              Tout voir
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* SIX SHORTCUTS */}
          <div className="grid grid-cols-3 gap-3">
            {shortcuts.map((item) => {
              const Icon = item.Icon;

              return (
                <Link
                  key={item.label}
                  to={item.to}
                  className="flex min-h-[112px] flex-col items-center justify-center gap-3 rounded-[20px] px-2 py-4 text-center shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md active:scale-[0.97]"
                  style={{ backgroundColor: item.background }}
                >
                  <Icon
                    size={29}
                    strokeWidth={2}
                    style={{ color: item.color }}
                  />

                  <span className="text-[11px] font-semibold leading-[1.35] text-[#172653]">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
