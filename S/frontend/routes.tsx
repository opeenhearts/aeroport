// S — routes de la feature. frontend/App.tsx importe `routes` : garder ce nom d'export.
// Ajoutez ici vos sous-routes (chemins listés dans docs/CONTRACTS.md ou à vous).
import type { RouteObject } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import FlightDetailsPage from "./pages/FlightDetailsPage";

export const routes: RouteObject[] = [
  { path: "/recherche", element: <SearchPage /> },
  { path: "/vols/:id", element: <FlightDetailsPage /> },
];
