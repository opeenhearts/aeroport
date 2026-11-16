// PROPRIETAIRE : W. Couleurs = maquette (docs/DESIGN.md). Utiliser ces tokens, pas de hex en dur.
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./frontend/**/*.{ts,tsx}", "./R/frontend/**/*.{ts,tsx}", "./S/frontend/**/*.{ts,tsx}", "./H/frontend/**/*.{ts,tsx}", "./W/frontend/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#1F2A5C", dark: "#161F47" },
        accent: "#5B4BDB",
        app: "#EEF1FA",
        ink: "#1B2140",
        muted: "#7A819C",
        ok: { DEFAULT: "#1E9E5A", bg: "#DDF4E7" },
        late: { DEFAULT: "#E8823A", bg: "#FDEBDD" },
        cancel: { DEFAULT: "#D64545", bg: "#FBE0E0" },
      },
      boxShadow: { card: "0 2px 10px rgba(31,42,92,.08)" },
      borderRadius: { card: "16px" },
    },
  },
  plugins: [],
};
