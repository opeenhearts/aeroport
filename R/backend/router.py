"""R — API carte. Voir R/AGENTS.md. Préfixe : /api/carte (défini dans backend/main.py)."""
from fastapi import APIRouter

router = APIRouter()


@router.get("/ping")
def ping():
    return {"feature": "R", "status": "à construire"}
