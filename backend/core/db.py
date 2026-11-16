"""Accès MySQL partagé. PROPRIÉTAIRE : W (noms stables = contrat).

    from backend.core.db import query, query_one, execute
    vols = query("SELECT * FROM vols WHERE statut = %s", ("retarde",))
    execute("UPDATE vols SET statut = %s WHERE id = %s", ("annule", 3))

Toujours des requêtes paramétrées (%s) — jamais de f-string avec des données utilisateur.
"""
import os

import mysql.connector
from dotenv import load_dotenv

load_dotenv()


def get_connection(database: bool = True):
    kwargs = dict(
        host=os.getenv("DB_HOST", "localhost"),
        user=os.getenv("DB_USER", "root"),
        password=os.getenv("DB_PASSWORD", ""),
        charset="utf8mb4",
    )
    if database:
        kwargs["database"] = os.getenv("DB_NAME", "aeroport")
    return mysql.connector.connect(**kwargs)


def query(sql: str, params: tuple = ()) -> list[dict]:
    """SELECT -> liste de dicts (DATETIME/TIME/Decimal : voir backend.core.serialize)."""
    conn = get_connection()
    try:
        cur = conn.cursor(dictionary=True)
        cur.execute(sql, params)
        return cur.fetchall()
    finally:
        conn.close()


def query_one(sql: str, params: tuple = ()) -> dict | None:
    rows = query(sql, params)
    return rows[0] if rows else None


def execute(sql: str, params: tuple = ()) -> int:
    """INSERT/UPDATE/DELETE -> lastrowid (INSERT) ou rowcount."""
    conn = get_connection()
    try:
        cur = conn.cursor()
        cur.execute(sql, params)
        conn.commit()
        return cur.lastrowid or cur.rowcount
    finally:
        conn.close()
