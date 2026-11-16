"""H — API mes vols / bagages. Voir H/AGENTS.md. Préfixe : /api/mes-vols (défini dans backend/main.py)."""
from fastapi import APIRouter

router = APIRouter()


@router.get("/ping")
def ping():
    return {"feature": "H", "status": "à construire"}
