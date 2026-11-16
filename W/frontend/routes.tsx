// W — routes de la feature. frontend/App.tsx importe `routes` : garder ce nom d'export.
// Ajoutez ici vos sous-routes (chemins listés dans docs/CONTRACTS.md ou à vous).
import type { RouteObject } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";

export const routes: RouteObject[] = [
  { path: "/", element: <HomePage /> },
  { path: "/profil", element: <ProfilePage /> },
  { path: "/admin", element: <AdminDashboardPage /> },
];
