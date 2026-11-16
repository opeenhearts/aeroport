# AGENTS.md — READ THIS FIRST (every AI coding agent, every session)

Project: **Gestion d'un aéroport** — a mobile-style airport app for passengers + an admin section.
UI text is in **French**. Target look: `docs/reference/ui-reference.png` (open and study it before building any screen).

## Stack
| Layer | Tech |
|---|---|
| Frontend | **React 18 + TypeScript** (Vite), **Tailwind CSS 3**, react-router-dom 6, lucide-react icons |
| Backend | **Python + FastAPI** (uvicorn), mysql-connector-python, Pydantic |
| Database | **MySQL** |
| Maps | **Google Maps Platform** (`@vis.gl/react-google-maps` in the frontend; Places/Directions/Geocoding may be called from the backend if needed) |
| Collaboration | **GitHub**, one branch per person |

## 1. Team & ownership (STRICT)
4 people, 4 folders. The folder name is the owner's first letter. Each folder contains that person's **backend part, frontend part and SQL**:

```
<L>/AGENTS.md          feature spec for that person (read it)
<L>/backend/router.py  FastAPI router  (+ any extra .py you add: queries.py, schemas.py, services.py…)
<L>/frontend/          routes.tsx, pages/, components/, hooks/ …
<L>/schema.sql         tables owned by this feature
<L>/seed.sql           test data for this feature
assets/<L>/            images (served at /<L>/file.png)
```

| Folder | Owner | Feature | Screens (from the mockup) |
|---|---|---|---|
| `R/` | **R** | **Carte** (map) | Plan de l'aéroport (Google Maps) · Services et commerces |
| `S/` | **S** | **Recherche** | Horaires des vols (Départs/Arrivées, filtres, recherche) · Détails du vol |
| `H/` | **H** | **Mes vols** | Mes vols · Bagages (tapis de livraison) |
| `W/` | **W** | **Menu / Profil / Admin** | Accueil · Espace passager (profil) · Admin (tableau de bord, vols, passagers, réservations…) · auth |

**Shared code is owned by W**: `backend/` (main, core, db/tables.sql, db/data.sql, init_db), `frontend/` (App, main, shared/*), root configs (`package.json`, `vite.config.ts`, `tailwind.config.js`, `tsconfig.json`, `requirements.txt`, `.env.example`), `docs/`, `AGENTS.md`.

### Rules
1. **Identify who you are working for** (R, S, H or W) from the user's prompt. If unclear, ASK before touching anything.
2. **Only create/edit files inside your own folder** (`<L>/`) and `assets/<L>/`.
3. **NEVER edit another feature's folder**, even to "fix" or "improve" it. If you need something from another feature, use the documented interface in `docs/CONTRACTS.md`; if it is missing, tell the user what to ask the owner.
4. **Do not edit shared files** (list above). If you need a change (new npm/pip package, new shared table, new shared component, new Tailwind colour), tell the user exactly what to ask W. Exception: you may *append* a dependency line to `requirements.txt` / `package.json` — but tell the user so everyone re-installs.
5. Your DB tables live in `<L>/schema.sql`, test data in `<L>/seed.sql`. Never alter tables defined in `backend/db/tables.sql` or another folder's `schema.sql`; you may only SELECT from them (`docs/DB_CONTRACT.md` says who reads/writes what).
6. `backend/main.py` and `frontend/App.tsx` are already wired: they import `router` from `<L>/backend/router.py` and `routes` from `<L>/frontend/routes.tsx`. **Keep those file and export names.** Add as many extra files as you want inside your folder.
7. Your API prefix is fixed (see §2). Your frontend routes are the ones in `docs/CONTRACTS.md` (you may add sub-routes under your own paths).

## 2. How the app is wired
- **API prefixes** (set in `backend/main.py`): W → `/api/w`, R → `/api/carte`, S → `/api/vols`, H → `/api/mes-vols`. Inside your router, paths are relative (`@router.get("/emplacements")` → `/api/carte/emplacements`). Interactive docs: http://localhost:8000/docs
- **Frontend → backend**: `import { api } from "@shared/lib/api"`; `await api.get<Vol[]>("/vols?type=depart")`. Vite proxies `/api` to `localhost:8000`.
- **Path aliases**: `@shared/*` → `frontend/shared/*`; `@R/*`, `@S/*`, `@H/*`, `@W/*` → that feature's `frontend/`. Never import across features (`@S/...` from R is forbidden) — go through `docs/CONTRACTS.md`.
- **DB access** (backend): `from backend.core.db import query, query_one, execute` — parameterised SQL with `%s`, never f-strings with user input. `backend.core.serialize.clean_row` converts MySQL datetime/time/Decimal for JSON.
- **Current user** (backend): `from backend.core.security import get_current_user, require_admin` as FastAPI dependencies. (Returns a demo user — Wissal, id 1 — until W ships the login.)
- **Shared UI** (frontend): `PageHeader`, `Card`, `StatusBadge` in `@shared/components/*`; shared types in `@shared/lib/types`. Colour tokens are Tailwind classes (`bg-navy`, `text-accent`, `bg-ok-bg`…) — no hard-coded hex. See `docs/DESIGN.md`.
- **Navigation between features** = plain URLs with `useNavigate()` / `<Link>` (e.g. `navigate("/carte?porte=12")`). Params are documented in `docs/CONTRACTS.md`.
- Mobile-first: the app is a ~448px column with a bottom tab bar (Accueil · Carte · Recherche · Profil), provided by `frontend/shared/components/Layout.tsx`. Admin (`/admin/*`) is full width, desktop-style with a sidebar.

## 3. Run it
```bash
pip install -r requirements.txt && npm install
cp .env.example .env            # fill DB_* and VITE_GOOGLE_MAPS_API_KEY
python -m backend.init_db       # creates DB + tables + seed data (needs MySQL running)
uvicorn backend.main:app --reload     # API  → http://localhost:8000/docs
npm run dev                           # app  → http://localhost:5173
npm run typecheck                     # must pass before you commit
```
Run Python commands from the repo root (packages `backend`, `R`, `S`, `H`, `W` are imported from there).

## 4. Code conventions
- TypeScript strict: no `any`; type API responses (put feature-specific types in your own folder, shared ones are W's).
- React: function components + hooks, one component per file, pages in `pages/`, reusable pieces in `components/`, data fetching in `hooks/` or `api.ts` of your folder. Handle **loading, error and empty states** on every screen.
- Backend: one router per feature, split SQL into `queries.py` and Pydantic models into `schemas.py` when the file grows (> ~200 lines). Return typed Pydantic models or `clean_row` dicts. Raise `HTTPException` with clear French messages.
- French for user-visible text; code identifiers may follow the French DB names (`vols`, `portes`, `statut`) — be consistent.
- Comments only where non-obvious. No dead code, files < ~300 lines.
- Secrets only in `.env` (never commit it). The Google Maps key is a browser key: restrict it by HTTP referrer in Google Cloud.

## 5. Git workflow
- Own branch: `feature/R-carte`, `feature/S-recherche`, `feature/H-mes-vols`, `feature/W-menu-admin`.
- Commit often: `R: add terminal filter`. Stage only files in your folder. Open a PR into `main`; folders are disjoint so merges shouldn't conflict — if one does, you touched something that isn't yours.

## 6. Checklist for the AI before coding
1. Read this file → `<L>/AGENTS.md` → `docs/CONTRACTS.md` → `docs/DB_CONTRACT.md` → `docs/DESIGN.md`.
2. Look at `docs/reference/ui-reference.png` for your screens.
3. Reply with a short plan (files to create, endpoints, queries, components) before writing code.
4. When done: `npm run typecheck` passes, the API endpoint works in `/docs`, the screen matches the mockup.
