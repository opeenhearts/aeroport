"""Point d'entrée API : `uvicorn backend.main:app --reload` (depuis la racine du repo).

PROPRIÉTAIRE : W. Déjà câblé : chaque feature expose `router` dans
<LETTRE>/backend/router.py ; personne d'autre n'a besoin de modifier ce fichier.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from H.backend.router import router as h_router
from R.backend.router import router as r_router
from S.backend.router import router as s_router
from W.backend.router import router as w_router

app = FastAPI(title="Aéroport International API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(w_router, prefix="/api/w", tags=["W · accueil/profil/admin"])
app.include_router(r_router, prefix="/api/carte", tags=["R · carte"])
app.include_router(s_router, prefix="/api/vols", tags=["S · recherche"])
app.include_router(h_router, prefix="/api/mes-vols", tags=["H · mes vols/bagages"])


@app.get("/api/health", tags=["core"])
def health():
    return {"status": "ok"}
