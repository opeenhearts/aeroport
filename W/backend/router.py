"""W — API accueil / profil / admin. Voir W/AGENTS.md. Préfixe : /api/w (défini dans backend/main.py)."""
from fastapi import APIRouter

router = APIRouter()


@router.get("/ping")
def ping():
    return {"feature": "W", "status": "à construire"}
