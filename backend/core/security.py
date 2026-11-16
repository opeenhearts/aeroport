"""Authentification. PROPRIÉTAIRE : W.

Les autres features utilisent UNIQUEMENT la dépendance FastAPI :

    from fastapi import Depends
    from backend.core.security import CurrentUser, get_current_user

    @router.get("/mes-vols")
    def mes_vols(user: CurrentUser = Depends(get_current_user)):
        ... user["id"] ...

Tant que le login de W n'est pas prêt, get_current_user renvoie l'utilisateur de
démo (Wissal, id 1, passager). Quand W livre le login JWT, la signature ne change pas.
"""
from typing import Annotated, Any

from fastapi import Depends, HTTPException

CurrentUser = dict[str, Any]  # {id, nom, prenom, email, role: 'passager'|'admin'}

DEMO_USER: CurrentUser = {
    "id": 1,
    "nom": "EL BOUAZZAOUI",
    "prenom": "Wissal",
    "email": "wissal@email.com",
    "role": "passager",
}


def get_current_user() -> CurrentUser:
    # TODO (W) : lire le header Authorization: Bearer <JWT> et charger l'utilisateur.
    return DEMO_USER


def require_admin(user: Annotated[CurrentUser, Depends(get_current_user)]) -> CurrentUser:
    if user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Accès réservé aux administrateurs")
    return user
