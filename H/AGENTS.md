# H — Feature MES VOLS (+ bagages)

You are working for **H**. Read the root `AGENTS.md` first. Edit ONLY `H/` and `assets/H/`.
Do NOT touch `R/`, `S/`, `W/`, `backend/`, `frontend/` (shared), `docs/`, root configs.

## Files you own (stubbed — keep the names marked ★)
| File | Purpose |
|---|---|
| ★ `H/backend/router.py` | FastAPI router, mounted at `/api/mes-vols` |
| `H/backend/queries.py`, `schemas.py` *(create)* | SQL + Pydantic models |
| ★ `H/frontend/routes.tsx` | Routes `/mes-vols` and `/bagages/:reservationId?` |
| `H/frontend/pages/MyFlightsPage.tsx` | Screen **Mes vols** (from Accueil tile + Profil → "Mes vols") |
| `H/frontend/pages/BaggagePage.tsx` | Screen **Bagages** (from Accueil tile "Bagages") |
| `H/frontend/components/*` *(create)* | `BookingCard`, `BaggageStatusStepper`, `ConveyorPill`… |
| `H/frontend/hooks/*` *(create)* | `useReservations`, `useBagages` |
| `H/schema.sql` · `H/seed.sql` | Table `bagages` + test data |
| `assets/H/` | Illustrations (suitcase, dotted-path background) — served at `/H/<file>` |

## API to build (`/api/mes-vols/...`) — always scoped to `get_current_user()`
- `GET /` → current user's reservations joined with `passagers`, `vols`, `compagnies`, `portes`, `terminaux` (flight number, route, date/time, seat, status, gate). Split upcoming vs past on the frontend or with `?periode=a_venir|passe`.
- `GET /bagages?reservation_id=` → bags of the user (tapis, statut, étiquette, flight). Without `reservation_id`, default to the next upcoming reservation.
- Optional: `GET /favoris` → flights favourited in S's `favoris` table (READ only).
- A user must never see another user's data: always filter by `passagers.utilisateur_id = user["id"]`.

## Screen — Bagages (`/bagages/:reservationId?`) — mockup bottom row, 2nd screen
- Header "Bagages".
- Illustration: blue suitcase + plane on a dotted flight path.
- "Vol AT203" + "Votre tapis est disponible au :" and a big highlighted pill **Tapis n° 6** (`bagages.tapis`).
- Green check + "Retrouvez vos bagages au niveau des arrivées."
- No `tapis` yet → "Tapis pas encore attribué". Show a status stepper `enregistre → en_soute → sur_tapis → recupere`. Several bookings → selector. No bag → empty state.

## Screen — Mes vols (`/mes-vols`)
- Header "Mes vols". Upcoming / Passés sections: card with flight number, route, date/time, seat, status badge (`StatusBadge` shared).
- Tap a booking → `navigate("/vols/" + vol_id)` (S's screen).
- Per booking a "Bagages" button → `navigate("/bagages/" + reservation_id)`.
- Optional "Favoris" tab (S's `favoris`, read only). Not in the mockup: follow the same list-card style as Horaires des vols.

## Data
- READ shared tables: `reservations`, `passagers`, `vols`, `compagnies`, `portes`, `terminaux`, and S's `favoris`. Writes to `reservations` belong to W's admin.
- You OWN and write: `bagages`.
- Test data: `backend/db/data.sql` has user 1 (Wissal) with reservation 1 on AT203; `H/seed.sql` adds a bag at tapis 6. Add more with `INSERT IGNORE`, ids 300–399.

## Definition of done
Both screens match the mockup; data is per-user; empty/loading/error states; links to S's details work; `npm run typecheck` passes; no edits outside `H/` and `assets/H/`.
