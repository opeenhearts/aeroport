// PROPRIETAIRE : W. Les alias @R @S @H @W pointent vers <LETTRE>/frontend.
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

const r = (p: string) => path.resolve(__dirname, p);

export default defineConfig({
  plugins: [react()],
  publicDir: "assets", // assets/R/plan.png -> servi sur /R/plan.png
  resolve: {
    alias: {
      "@shared": r("frontend/shared"),
      "@R": r("R/frontend"),
      "@S": r("S/frontend"),
      "@H": r("H/frontend"),
      "@W": r("W/frontend"),
    },
  },
  server: {
    port: 5173,
    proxy: { "/api": "http://localhost:8000" },
  },
});
