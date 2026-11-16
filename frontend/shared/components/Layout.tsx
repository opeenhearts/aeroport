import { Outlet, useLocation } from "react-router-dom";
import BottomNav from "./BottomNav";

/** Cadre mobile (448px) + barre d'onglets. L'admin (/admin) est pleine largeur, sans barre. */
export default function Layout() {
  const { pathname } = useLocation();
  if (pathname.startsWith("/admin")) return <Outlet />;
  return (
    <div className="mx-auto min-h-screen max-w-md pb-20">
      <Outlet />
      <BottomNav />
    </div>
  );
}
