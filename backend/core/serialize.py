"""Les lignes MySQL contiennent datetime/time/Decimal ; FastAPI sait les sérialiser
si on renvoie des modèles Pydantic ou des dicts simples. Aide pour les dicts bruts."""
from datetime import date, datetime, time, timedelta
from decimal import Decimal


def clean(value):
    if isinstance(value, (datetime, date, time)):
        return value.isoformat()
    if isinstance(value, timedelta):  # colonnes TIME renvoyées en timedelta par mysql-connector
        total = int(value.total_seconds())
        return f"{total // 3600:02d}:{total % 3600 // 60:02d}"
    if isinstance(value, Decimal):
        return float(value)
    return value


def clean_row(row: dict) -> dict:
    return {k: clean(v) for k, v in row.items()}
