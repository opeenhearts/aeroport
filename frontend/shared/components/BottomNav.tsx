import { Home, MapPin, Search, User } from "lucide-react";
import { NavLink } from "react-router-dom";

const TABS = [
  { to: "/", label: "Accueil", Icon: Home },
  { to: "/carte", label: "Carte", Icon: MapPin },
  { to: "/recherche", label: "Recherche", Icon: Search },
  { to: "/profil", label: "Profil", Icon: User },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-1/2 z-30 flex w-full max-w-md -translate-x-1/2 rounded-t-2xl bg-white px-2 pb-2 pt-1 shadow-[0_-2px_12px_rgba(31,42,92,.12)]">
      {TABS.map(({ to, label, Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === "/"}
          className={({ isActive }) =>
            `flex flex-1 flex-col items-center gap-0.5 py-1 text-xs ${isActive ? "font-semibold text-accent" : "text-muted"}`
          }
        >
          <Icon size={22} />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
