// R — routes de la feature. frontend/App.tsx importe `routes` : garder ce nom d'export.
// Ajoutez ici vos sous-routes (chemins listés dans docs/CONTRACTS.md ou à vous).
import type { RouteObject } from "react-router-dom";
import MapPage from "./pages/MapPage";
import ServicesPage from "./pages/ServicesPage";

export const routes: RouteObject[] = [
  { path: "/carte", element: <MapPage /> },
  { path: "/services", element: <ServicesPage /> },
];
