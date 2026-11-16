# R — Feature CARTE (plan de l'aéroport + services & commerces)

You are working for **R**. Read the root `AGENTS.md` first. Edit ONLY `R/` and `assets/R/`.
Do NOT touch `S/`, `H/`, `W/`, `backend/`, `frontend/` (shared), `docs/`, root configs.

## Files you own (stubbed — keep the names marked ★)
| File | Purpose |
|---|---|
| ★ `R/backend/router.py` | FastAPI router, mounted at `/api/carte` |
| `R/backend/queries.py`, `schemas.py` *(create)* | SQL + Pydantic models |
| `R/backend/directions.py` *(create, optional)* | Navigation calculation (see below) |
| ★ `R/frontend/routes.tsx` | Routes `/carte` and `/services` |
| `R/frontend/pages/MapPage.tsx` | Screen **Plan de l'aéroport** (tab "Carte") |
| `R/frontend/pages/ServicesPage.tsx` | Screen **Services et commerces** |
| `R/frontend/components/*` *(create)* | `AirportMap`, `FilterChips`, `PlaceRow`, `PlaceInfoCard`… |
| `R/frontend/hooks/*` *(create)* | `useEmplacements`, … |
| `R/schema.sql` · `R/seed.sql` | Table `emplacements` + test data (lat/lng) |
| `assets/R/` | Photos of places, icons, indoor plan overlay (served at `/R/<file>`) |

## API to build (`/api/carte/...`)
- `GET /emplacements?type=&terminal_id=&niveau=&q=` → list (name, type, niveau, terminal name, opening hours, image_url, latitude, longitude, porte code + the flight currently assigned to the gate if type = gate).
- `GET /emplacements/{id}` → one place with details.
- `GET /terminaux` → terminals (read from `terminaux`) for the selector.
- Optional: `GET /itineraire?from_lat=&from_lng=&to_id=` → directions (Google Directions API from the backend with a **server** key `GOOGLE_MAPS_SERVER_KEY` in `.env` — ask W to add it to `.env.example` — or compute client-side with the Maps JS Directions service).

## Screen 1 — Plan de l'aéroport (`/carte`) — mockup top-right
- Header "Plan de l'aéroport".
- Search box "Rechercher un lieu…" (filters by name).
- Filter chips: **Tout · Gates · Commerces · Services** (`type`: gate / restaurant+boutique / service). Terminal + level selectors.
- **Google Maps** (`@vis.gl/react-google-maps`: `<APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>`, `<Map mapId={import.meta.env.VITE_GOOGLE_MAP_ID}>`, `<AdvancedMarker>`), centred on the airport, satellite/roadmap, coloured custom markers per type (gate = blue plane, restaurant = orange, boutique, service = green, selected = red pin). Click marker → callout (e.g. "Porte A12 · Terminal 1").
- Zoom +/- and "ma position" (browser geolocation) buttons.
- Bottom info card for the selected place: photo, name, "Terminal 1 • Niveau 2", and for a gate "Vol : AT203", with a chevron.
- **Incoming deep links** (frontend URL query params — frozen in `docs/CONTRACTS.md`): `/carte?porte=<portes.id>` → preselect that gate; `/carte?place=<emplacements.id>` → preselect that place. Read with `useSearchParams`.
- Indoor levels: Google Maps has no indoor floors for custom airports; handle `niveau` as a UI filter on markers (and optionally a `GroundOverlay` of the terminal plan image from `assets/R/`).
- Nice-to-have: "Itinéraire" button → directions line on the map from the user's position to the selected place.

## Screen 2 — Services et commerces (`/services`) — mockup bottom-left
- Header with back arrow. Chips: **Tout · Restaurants · Boutiques · Services**.
- List rows: thumbnail, name, "Terminal 1 • Niveau 1", hours "08:00 – 22:00", chevron. Tap → `navigate("/carte?place=<id>")`.
- "Ouvert / Fermé" from current time vs opening hours (nice-to-have).
- Reached from a button/link on the map screen (e.g. a "Services" shortcut) — you decide where, inside your own page.

## Data
- Your table: `emplacements` (`R/schema.sql`, with `latitude`/`longitude`). You may change it by editing `R/schema.sql` (drop the table locally to re-create).
- READ-only shared tables: `terminaux`, `portes`, `vols`.
- W's admin will CRUD `emplacements` later — keep column names stable; tell the user if you rename one.
- TIME columns come back as `timedelta` from mysql-connector → use `backend.core.serialize.clean_row`.

## Google Maps setup (once)
Create a Google Cloud project → enable **Maps JavaScript API** (+ Places / Directions if used) → create an API key, restrict to `http://localhost:5173/*` → put it in `.env` as `VITE_GOOGLE_MAPS_API_KEY`; create a Map ID (Map Management) for advanced markers → `VITE_GOOGLE_MAP_ID`. Never commit `.env`. If no key is set, show a friendly fallback message instead of a broken map.

## Definition of done
Both screens match the mockup look, filters + search work with seed data, deep links (`?porte=`, `?place=`) work, loading/error/empty states handled, `npm run typecheck` passes, no edits outside `R/` and `assets/R/`.
