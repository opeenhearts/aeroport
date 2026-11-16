# S — Feature RECHERCHE (horaires des vols + détails du vol)

You are working for **S**. Read the root `AGENTS.md` first. Edit ONLY `S/` and `assets/S/`.
Do NOT touch `R/`, `H/`, `W/`, `backend/`, `frontend/` (shared), `docs/`, root configs.

## Files you own (stubbed — keep the names marked ★)
| File | Purpose |
|---|---|
| ★ `S/backend/router.py` | FastAPI router, mounted at `/api/vols` |
| `S/backend/queries.py`, `schemas.py` *(create)* | SQL + Pydantic models |
| ★ `S/frontend/routes.tsx` | Routes `/recherche` and `/vols/:id` |
| `S/frontend/pages/SearchPage.tsx` | Screen **Horaires des vols** (tab "Recherche") |
| `S/frontend/pages/FlightDetailsPage.tsx` | Screen **Détails du vol** |
| `S/frontend/components/*` *(create)* | `FlightCard`, `DepartureArrivalTabs`, `FilterBar`, `FlightRoute`… |
| `S/frontend/hooks/*` *(create)* | `useVols`, `useVol`, `useFavori` |
| `S/schema.sql` · `S/seed.sql` | Table `favoris` + test data |
| `assets/S/` | Airline logos (served at `/S/<file>`) |

## API to build (`/api/vols/...`)
- `GET /?type=depart|arrivee&date=YYYY-MM-DD&statut=&compagnie_id=&q=` → flights with compagnie name, porte code, terminal (join `vols`, `compagnies`, `portes`, `terminaux`), sorted by time. `q` matches number, origin/destination, airline, gate code.
- `GET /{id}` → one flight with avion model, duration, gate, terminals, `is_favori` for the current user.
- `GET /compagnies` → airlines for the filter dropdown.
- `POST /{id}/favori` and `DELETE /{id}/favori` → toggle in `favoris` (current user via `get_current_user`).
- ⚠ Route order in FastAPI: declare `/compagnies` before `/{id}`.

## Screen 1 — Horaires des vols (`/recherche`) — mockup top row, 2nd screen
- Header "Horaires des vols" (+ filter icon).
- Segmented control **Départs | Arrivées**; dropdown date ("Aujourd'hui", other days); dropdown **Tous** = filter by statut / compagnie.
- Search box "Rechercher un vol, une porte…". The home screen (W) links to `/recherche?q=<text>` — read `q` from the query string and prefill.
- Flight cards: airline logo/code, flight number (AT203), airline name, route "Casablanca → Paris", time (14:30), `StatusBadge` (shared), chevron. Tap → `navigate("/vols/" + id)`.

## Screen 2 — Détails du vol (`/vols/:id`) — mockup top row, 3rd screen
- Back arrow + "Détails du vol" + ⭐ favourite toggle.
- Airline logo + name, flight number, status badge.
- Route block: Casablanca 14:30 · Terminal 1 • Porte A12 → Paris 17:45 · Terminal 2.
- Info list: Embarquement (30 min before departure), Type d'avion, Durée du vol (arrivée − départ).
- Notice card: "Veuillez vous présenter à la porte au moins 30 min avant le départ."
- Primary button **Voir sur la carte** → `navigate("/carte?porte=" + vol.porte_id)` (R's screen handles it). Hide/disable if no gate.
- Handle unknown id (404) with a friendly message + link back to `/recherche`.

## Data
- READ shared tables: `vols`, `compagnies`, `avions`, `portes`, `terminaux`. Never write to them (W's admin does).
- You OWN and write: `favoris`.
- Seed flights live in `backend/db/data.sql` (W's): AT203, AF1496, IB1972, EK752. Add richer test data in `S/seed.sql` with `INSERT IGNORE` and ids 200–299.
- Use the shared types `Vol`, `StatutVol` from `@shared/lib/types` (if you need a field that is missing, define an extended type in your folder and tell the user to ask W).

## Definition of done
Both screens match the mockup; Départs/Arrivées, date, status and text search work; favourites persist; "Voir sur la carte" deep-links to R's map; loading/error/empty states; `npm run typecheck` passes; no edits outside `S/` and `assets/S/`.
