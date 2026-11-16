"""Crée / met à jour la base : `python -m backend.init_db` (depuis la racine). PROPRIÉTAIRE : W.

Ordre : backend/db/tables.sql -> schema.sql de R,S,H,W -> backend/db/data.sql -> seed.sql de R,S,H,W.
Relançable sans risque (IF NOT EXISTS / INSERT IGNORE).
"""
import os
import re

from backend.core.db import get_connection

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FEATURES = ["R", "S", "H", "W"]


def _statements(path: str) -> list[str]:
    with open(path, encoding="utf-8") as f:
        sql = re.sub(r"--[^\n]*", "", f.read())
    return [s.strip() for s in sql.split(";") if s.strip()]


def _run(cur, path: str) -> None:
    if not os.path.exists(path):
        return
    print("->", os.path.relpath(path, ROOT))
    for stmt in _statements(path):
        cur.execute(stmt)


def main() -> None:
    name = os.getenv("DB_NAME", "aeroport")
    conn = get_connection(database=False)
    cur = conn.cursor()
    cur.execute(f"CREATE DATABASE IF NOT EXISTS `{name}` CHARACTER SET utf8mb4")
    cur.execute(f"USE `{name}`")
    _run(cur, os.path.join(ROOT, "backend", "db", "tables.sql"))
    for f in FEATURES:
        _run(cur, os.path.join(ROOT, f, "schema.sql"))
    _run(cur, os.path.join(ROOT, "backend", "db", "data.sql"))
    for f in FEATURES:
        _run(cur, os.path.join(ROOT, f, "seed.sql"))
    conn.commit()
    conn.close()
    print("OK : base", name, "prête.")


if __name__ == "__main__":
    main()
