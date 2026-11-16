"""S — API recherche. Voir S/AGENTS.md. Préfixe : /api/vols (défini dans backend/main.py)."""
from fastapi import APIRouter

router = APIRouter()


@router.get("/ping")
def ping():
    return {"feature": "S", "status": "à construire"}
