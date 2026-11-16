// PROPRIETAIRE : W. Deja cable : chaque feature exporte `routes` dans <LETTRE>/frontend/routes.tsx.
import type { RouteObject } from "react-router-dom";
import { routes as hRoutes } from "@H/routes";
import { routes as rRoutes } from "@R/routes";
import { routes as sRoutes } from "@S/routes";
import { routes as wRoutes } from "@W/routes";
import Layout from "@shared/components/Layout";

export const routes: RouteObject[] = [
  { element: <Layout />, children: [...wRoutes, ...rRoutes, ...sRoutes, ...hRoutes] },
];
