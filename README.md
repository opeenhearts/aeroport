# Gestion Aéroport

Application mobile-style de gestion d'un aéroport (passagers + administration).
**React + TypeScript + Tailwind** (frontend) · **Python + FastAPI** (backend) · **MySQL** · **Google Maps Platform** · GitHub.
Maquette de référence : [docs/reference/ui-reference.png](docs/reference/ui-reference.png).

## Équipe & dossiers

| Dossier | Responsable | Feature |
|---|---|---|
| `R/` | R | Carte : plan de l'aéroport (Google Maps), services et commerces |
| `S/` | S | Recherche : horaires des vols, détails du vol |
| `H/` | H | Mes vols : réservations, bagages |
| `W/` | W | Accueil, profil, authentification, administration (+ socle partagé) |

Chaque dossier contient **sa partie backend, sa partie frontend et son SQL**. Chacun ne modifie **que** son dossier.
Règles complètes (lues aussi par les IA) : [AGENTS.md](AGENTS.md) · prompts de démarrage : [docs/PROMPTS.md](docs/PROMPTS.md).

## Lancer le projet

```bash
pip install -r requirements.txt
npm install
cp .env.example .env                  # DB_*, JWT_SECRET, VITE_GOOGLE_MAPS_API_KEY, VITE_GOOGLE_MAP_ID
python -m backend.init_db             # crée la base, les tables et les données de test (MySQL démarré)
uvicorn backend.main:app --reload     # API  → http://localhost:8000/docs
npm run dev                           # App  → http://localhost:5173
```

## Structure

```
backend/        FastAPI : main.py, core/ (db, security), db/ (tables.sql, data.sql), init_db.py   (W)
frontend/       React : App.tsx, main.tsx, shared/ (components, lib)                              (W)
R/ S/ H/ W/     une feature par dossier
  ├─ AGENTS.md        spec de la feature (lue par l'IA)
  ├─ backend/         router.py (+ queries, schemas…)
  ├─ frontend/        routes.tsx, pages/, components/, hooks/
  ├─ schema.sql       tables de la feature
  └─ seed.sql         données de test
assets/<LETTRE>/ images de chaque feature (servies sur /<LETTRE>/fichier.png)
docs/           CONTRACTS.md · DB_CONTRACT.md · DESIGN.md · PROMPTS.md · reference/
AGENTS.md       règles pour les IA (CLAUDE.md, GEMINI.md, .cursorrules… pointent dessus)
```
