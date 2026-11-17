
import { Home, MapPin, Search, Plane, User } from "lucide-react";
import { NavLink } from "react-router-dom";

const TABS = [
  { to: "/", label: "Accueil", Icon: Home },
  { to: "/carte", label: "Carte", Icon: MapPin },
  { to: "/recherche", label: "Recherche", Icon: Search },
  { to: "/mes-vols", label: "Mes vols", Icon: Plane },
  { to: "/profil", label: "Profil", Icon: User },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-1/2 z-30 flex w-full max-w-md -translate-x-1/2 border-t border-gray-100 bg-white px-1 pb-3 pt-2">
      {TABS.map(({ to, label, Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === "/"}
          className={({ isActive }) =>
            `flex flex-1 flex-col items-center justify-center gap-1 py-1 text-[10px] ${
              isActive
                ? "font-bold text-[#17316D]"
                : "font-medium text-[#9293A2]"
            }`
          }
        >
          <Icon size={21} strokeWidth={2} />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
