# Cross-feature contracts

Features never import each other's code (no `@S/...` from R, no `from S.backend...` in H). They talk through **(1) shared helpers owned by W, (2) URLs, (3) shared DB tables**. Names below are frozen; changing one = announce to the whole team (W owns this file).

## 1. Shared helpers (owner: W)
**Backend** (`from backend.core...`)
| Import | What |
|---|---|
| `backend.core.db` → `query(sql, params)`, `query_one`, `execute` | MySQL access (parameterised `%s`) |
| `backend.core.security` → `get_current_user`, `require_admin`, `CurrentUser` | FastAPI dependencies; user = `{id, nom, prenom, email, role}` |
| `backend.core.serialize` → `clean_row(row)` | datetime/time/Decimal → JSON-safe |

**Frontend** (`from "@shared/..."`)
| Import | What |
|---|---|
| `@shared/lib/api` → `api.get/post/put/delete` | HTTP client (adds the JWT, base `/api`) |
| `@shared/lib/types` → `Vol`, `StatutVol`, `User` | shared TS types |
| `@shared/components/PageHeader` (`title`, `back`, `right`) · `Card` · `StatusBadge` (`statut`) | shared UI |

## 2. API prefixes (set in `backend/main.py`)
| Prefix | Owner |
|---|---|
| `/api/w` | W — auth, me, prochain-vol, profile, admin |
| `/api/carte` | R — emplacements, terminaux, itinéraire |
| `/api/vols` | S — flights search/detail, compagnies, favoris |
| `/api/mes-vols` | H — reservations, bagages |

Other features may **call another feature's endpoint only if listed here**. Currently shared endpoints: none (everyone reads shared DB tables directly — see `DB_CONTRACT.md`).

## 3. Frontend routes & URL parameters (navigation = plain URLs)
| Route | Screen | Owner | Params |
|---|---|---|---|
| `/` | Accueil | W | |
| `/profil` | Espace passager | W | |
| `/login` | Login | W | |
| `/admin`, `/admin/*` | Admin | W | |
| `/carte` | Plan de l'aéroport | R | `?porte=<portes.id>` preselect a gate · `?place=<emplacements.id>` preselect a place |
| `/services` | Services et commerces | R | |
| `/recherche` | Horaires des vols | S | `?q=<text>` prefilled search · `?type=depart\|arrivee` |
| `/vols/:id` | Détails du vol | S | `:id` = `vols.id` |
| `/mes-vols` | Mes vols | H | |
| `/bagages/:reservationId?` | Bagages | H | optional `reservations.id` |

Examples: `navigate("/carte?porte=" + vol.porte_id)` · `navigate("/vols/" + id)` · `navigate("/recherche?q=AT203")`.
Each feature registers its routes in `<L>/frontend/routes.tsx`; sub-routes under your own paths are free, new top-level paths need W.

## 4. Flight status values (`vols.statut`)
`a_l_heure` (green) · `retarde` (orange) · `annule` (red) · `embarquement` (violet, "À l'embarquement"). Always render with the shared `StatusBadge`.

## 5. Adding something new
- New npm/pip package → append to `package.json` / `requirements.txt` and tell the team to reinstall.
- New shared helper, component, type, Tailwind colour or shared table → ask W. New table for your own feature → your `<L>/schema.sql`.
- New `.env` variable → ask W to add it to `.env.example`.
