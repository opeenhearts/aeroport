# Prompts to start each teammate's AI coder

Each person: `git clone`, `git checkout -b feature/<branch>`, open the folder in their AI tool (Claude Code reads `CLAUDE.md` → `AGENTS.md` automatically; Gemini / Cursor / Copilot have pointer files too), then paste **their** prompt below as the first message.

Setup (everyone, once): `pip install -r requirements.txt` · `npm install` · copy `.env.example` → `.env` (MySQL creds, Google Maps key for R) · `python -m backend.init_db` · `uvicorn backend.main:app --reload` · `npm run dev`.

---

## R — Carte (branch `feature/R-carte`)
```
I am R. I'm building the CARTE feature of our airport management app. Stack: React + TypeScript + Tailwind (Vite) frontend, Python FastAPI backend, MySQL, Google Maps Platform. UI in French.
Before anything else read, in this order: AGENTS.md, R/AGENTS.md, docs/CONTRACTS.md, docs/DB_CONTRACT.md, docs/DESIGN.md, and look at the mockup docs/reference/ui-reference.png (my screens: "Plan de l'aéroport" top-right and "Services et commerces" bottom-left).
Rules: you may ONLY create/edit files inside R/ and assets/R/ (my folder holds both my backend/ and frontend/ parts plus schema.sql/seed.sql). Never touch S/, H/, W/, backend/, frontend/ (shared), docs/ or root configs — if I need something there, tell me exactly what to ask the owner (W). backend/main.py and frontend/App.tsx already import R/backend/router.py (`router`, mounted at /api/carte) and R/frontend/routes.tsx (`routes`) — keep those names.
Task: build both screens exactly as specified in R/AGENTS.md: FastAPI endpoints under /api/carte (emplacements with filters/search, terminaux), the Google Maps screen (react-google-maps, custom markers by type, search, chips Tout/Gates/Commerces/Services, terminal & level selectors, info card, deep links /carte?porte=ID and /carte?place=ID) and the Services et commerces list. Use the shared PageHeader/Card components and Tailwind tokens, and the seed data in R/seed.sql (add more places and photos in assets/R/). Handle loading/error/empty states and a fallback if the Maps key is missing.
Start by giving me a short plan (endpoints, files, components), then implement step by step, running `npm run typecheck` and testing the API at http://localhost:8000/docs.
```

## S — Recherche (branch `feature/S-recherche`)
```
I am S. I'm building the RECHERCHE feature of our airport management app. Stack: React + TypeScript + Tailwind (Vite) frontend, Python FastAPI backend, MySQL. UI in French.
Before anything else read, in this order: AGENTS.md, S/AGENTS.md, docs/CONTRACTS.md, docs/DB_CONTRACT.md, docs/DESIGN.md, and look at the mockup docs/reference/ui-reference.png (my screens: "Horaires des vols" and "Détails du vol", top row).
Rules: you may ONLY create/edit files inside S/ and assets/S/ (my folder holds both my backend/ and frontend/ parts plus schema.sql/seed.sql). Never touch R/, H/, W/, backend/, frontend/ (shared), docs/ or root configs — if I need something there, tell me exactly what to ask the owner (W). backend/main.py and frontend/App.tsx already import S/backend/router.py (`router`, mounted at /api/vols) and S/frontend/routes.tsx (`routes`) — keep those names.
Task: build both screens as specified in S/AGENTS.md: FastAPI endpoints (list/search/filter flights, flight detail, compagnies, favourite toggle) and the screens (Départs/Arrivées tabs, date + status filters, search by flight/city/airline/gate with ?q= prefill, flight cards with StatusBadge, details page with favourite star and "Voir sur la carte" → /carte?porte=ID). Use the shared components/tokens and the seed flights (add more in S/seed.sql with ids 200-299). Handle loading/error/empty states.
Start by giving me a short plan (endpoints, files, components), then implement step by step, running `npm run typecheck` and testing the API at http://localhost:8000/docs.
```

## H — Mes vols (branch `feature/H-mes-vols`)
```
I am H. I'm building the MES VOLS feature (bookings + baggage) of our airport management app. Stack: React + TypeScript + Tailwind (Vite) frontend, Python FastAPI backend, MySQL. UI in French.
Before anything else read, in this order: AGENTS.md, H/AGENTS.md, docs/CONTRACTS.md, docs/DB_CONTRACT.md, docs/DESIGN.md, and look at the mockup docs/reference/ui-reference.png (my screen: "Bagages", bottom row; "Mes vols" follows the same card style as the flight list).
Rules: you may ONLY create/edit files inside H/ and assets/H/ (my folder holds both my backend/ and frontend/ parts plus schema.sql/seed.sql). Never touch R/, S/, W/, backend/, frontend/ (shared), docs/ or root configs — if I need something there, tell me exactly what to ask the owner (W). backend/main.py and frontend/App.tsx already import H/backend/router.py (`router`, mounted at /api/mes-vols) and H/frontend/routes.tsx (`routes`) — keep those names.
Task: build both screens as specified in H/AGENTS.md: FastAPI endpoints scoped to the current user via get_current_user (reservations with flight info, bagages) and the screens (Mes vols upcoming/past with status badges and links to /vols/:id; Bagages with the big "Tapis n° X" pill, status stepper, empty states). Use the shared components/tokens and the seed in H/seed.sql (add more with ids 300-399).
Start by giving me a short plan (endpoints, files, components), then implement step by step, running `npm run typecheck` and testing the API at http://localhost:8000/docs.
```

## W — Menu / Profil / Admin + shared core (branch `feature/W-menu-admin`)
```
I am W. I'm building the MENU / PROFIL / ADMIN part of our airport management app, and I also own the shared files. Stack: React + TypeScript + Tailwind (Vite) frontend, Python FastAPI backend, MySQL, Google Maps. UI in French.
Before anything else read, in this order: AGENTS.md, W/AGENTS.md, docs/CONTRACTS.md, docs/DB_CONTRACT.md, docs/DESIGN.md, and look at the mockup docs/reference/ui-reference.png (my screens: "Accueil" top-left, "Espace passager" bottom row, "Admin / Tableau de bord" bottom-right).
Rules: I may edit W/, assets/W/ and the shared files (backend/main.py, backend/core, backend/db, frontend/App.tsx, frontend/shared, root configs, docs/) — but NEVER R/, S/ or H/ (other people's features). Shared names are contracts (see docs/CONTRACTS.md): add, don't rename. backend/main.py and frontend/App.tsx already import W/backend/router.py (`router`, mounted at /api/w) and W/frontend/routes.tsx (`routes`) — keep those names.
Task: build Accueil (greeting, next-flight card, 6 quick-access tiles linking to /recherche, /carte, /bagages, /mes-vols, /profil), Espace passager (profile list, logout), real JWT login (replace the demo user in backend/core/security.py without changing get_current_user's signature; /login page; token in localStorage "token"), and the Admin section (/admin layout with sidebar, KPI tiles, donut chart, top gates, CRUD for vols/passagers/réservations/compagnies/avions/portes/terminaux/emplacements/utilisateurs) protected by require_admin on the API and by role in the frontend.
Start by giving me a short plan (endpoints, files, components), then implement step by step, running `npm run typecheck` and testing the API at http://localhost:8000/docs.
```
