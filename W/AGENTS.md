# W — Feature MENU / PROFIL / ADMIN (+ shared core owner)

You are working for **W**. Read the root `AGENTS.md` first. You own `W/`, `assets/W/` **and the shared files**:
`backend/` (main.py, core/, db/, init_db.py), `frontend/` (App.tsx, main.tsx, shared/), root configs (`package.json`, `vite.config.ts`, `tailwind.config.js`, `tsconfig.json`, `requirements.txt`, `.env.example`), `docs/`, `AGENTS.md`.
You must NOT edit `R/`, `S/`, `H/`. Other people's code depends on your shared names (`backend.core.db`, `backend.core.security`, `@shared/*`, route paths): see `docs/CONTRACTS.md` — adding is fine, renaming/removing is a breaking change → announce it.

## Files you own (stubbed — keep the names marked ★)
| File | Purpose |
|---|---|
| ★ `W/backend/router.py` | FastAPI router, mounted at `/api/w` (home data, profile, auth, admin) |
| `W/backend/auth.py`, `admin.py`, `queries.py`, `schemas.py` *(create)* | login (JWT), admin CRUD, SQL |
| ★ `W/frontend/routes.tsx` | Routes `/`, `/profil`, `/admin/*`, `/login` |
| `W/frontend/pages/HomePage.tsx` | **Accueil** |
| `W/frontend/pages/ProfilePage.tsx` | **Espace passager** |
| `W/frontend/pages/admin/*` | **Admin**: `AdminDashboardPage` (stub) + vols, passagers, réservations, compagnies, avions, portes, terminaux, emplacements, utilisateurs, `AdminLayout` (sidebar) |
| `W/frontend/pages/LoginPage.tsx` *(create)* | Login |
| `backend/db/tables.sql`, `backend/db/data.sql`, `backend/init_db.py` | Shared core DB |
| `backend/core/security.py` | `get_current_user` (currently returns a demo user) → implement real JWT without changing its signature |

## Screen — Accueil (`/`) — mockup top-left
- Hero banner (airport photo in `assets/W/`, logo "Aéroport International", 🔔).
- "Bonjour {prenom} ! / Bon voyage ✈️" (from `/api/w/me`).
- Search box "Rechercher un vol, une porte…" → on submit `navigate("/recherche?q=" + text)`.
- Card **Votre prochain vol** (flight number, route, departure time, gate, badge "À l'embarquement", "Embarquement dans 42 min" computed). Tap → `/vols/:id`. Endpoint: `GET /api/w/prochain-vol` (your own SQL on `reservations`/`vols`).
- **Accès rapide** (6 tiles): Horaires des vols → `/recherche`, Plan de l'aéroport → `/carte`, Bagages → `/bagages`, Mes vols → `/mes-vols`, Mon profil → `/profil`, Infos utiles (your own simple section). "Tout voir" link.

## Screen — Espace passager (`/profil`) — mockup bottom row, 3rd screen
- Avatar + name + email card; list: Mes vols (→ `/mes-vols`), Mes favoris, Mes réservations (→ `/mes-vols`), Historique des vols, Mon profil (edit), Se déconnecter. ⚙️ settings.

## Screen — Admin (`/admin/*`) — mockup bottom-right, role `admin` only
- Full-width layout with dark sidebar: Tableau de bord, Vols, Compagnies, Avions, Portes, Terminaux, Emplacements, Utilisateurs, Déconnexion (`Layout.tsx` already hides the mobile tab bar under `/admin`).
- Dashboard: KPI tiles (Vols au total, Départs, Arrivées, Retardés — computed from `vols`), donut "Statistiques des vols" (À l'heure / Retardés / Annulés — add a chart lib e.g. recharts), "Top portes".
- CRUD (list / add / edit / delete) for vols, passagers, réservations, compagnies, avions, portes, terminaux, utilisateurs, and R's `emplacements` (allowed as an admin tool, documented columns only, never alter its schema). Protect every admin endpoint with `Depends(require_admin)` and the frontend routes by role.

## Shared-core duties
- Keep `docs/CONTRACTS.md`, `docs/DB_CONTRACT.md`, `docs/DESIGN.md` up to date; add shared components/types teammates ask for.
- Login: real JWT auth (`POST /api/w/login`, `GET /api/w/me`), store token in `localStorage["token"]` (the `api` client already sends it). `get_current_user()` keeps its signature. Hash passwords (the seed uses the placeholder `demo`).
- Keep `python -m backend.init_db` and `npm run build` green on `main`.

## Definition of done
Home, profile and admin match the mockup; home tiles reach every other feature; admin gated by role (backend + frontend); `npm run typecheck` passes; no edits in `R/`, `S/`, `H/`.
