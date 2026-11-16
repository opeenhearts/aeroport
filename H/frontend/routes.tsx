// H — routes de la feature. frontend/App.tsx importe `routes` : garder ce nom d'export.
// Ajoutez ici vos sous-routes (chemins listés dans docs/CONTRACTS.md ou à vous).
import type { RouteObject } from "react-router-dom";
import MyFlightsPage from "./pages/MyFlightsPage";
import BaggagePage from "./pages/BaggagePage";

export const routes: RouteObject[] = [
  { path: "/mes-vols", element: <MyFlightsPage /> },
  { path: "/bagages/:reservationId?", element: <BaggagePage /> },
];
