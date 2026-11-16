# Database contract (MySQL)

Create/refresh everything with `python -m backend.init_db` (order: `backend/db/tables.sql` → `R,S,H,W/schema.sql` → `backend/db/data.sql` → `R,S,H,W/seed.sql`; safe to re-run).

## Tables & who may write
| Table | Defined in | Owner (writes) | Readers |
|---|---|---|---|
| `utilisateurs`, `passagers` | `backend/db/tables.sql` | W | all |
| `compagnies`, `avions`, `terminaux`, `portes` | `backend/db/tables.sql` | W (admin) | all |
| `vols` | `backend/db/tables.sql` | W (admin) | S, H, R (gate → flight), W |
| `reservations` | `backend/db/tables.sql` | W (admin) | H, W |
| `emplacements` | `R/schema.sql` | R (W admin CRUD allowed, no schema change) | R, W |
| `favoris` | `S/schema.sql` | S | S, H, W |
| `bagages` | `H/schema.sql` | H | H |

Only the owner changes a table's schema; others SELECT only (except the explicit W-admin exception).

## Core columns (read these, never rename)
- `vols`: `id, numero, compagnie_id, avion_id, origine, destination, type('depart'|'arrivee'), date_heure_depart, date_heure_arrivee, porte_id, terminal_arrivee, statut`
- `compagnies`: `id, code, nom, logo_url` · `avions`: `id, modele, immatriculation, capacite`
- `terminaux`: `id, nom` · `portes`: `id, terminal_id, code, niveau`
- `reservations`: `id, passager_id, vol_id, siege, statut('confirmee'|'annulee')` · `passagers`: `id, utilisateur_id, passeport, telephone`
- `utilisateurs`: `id, nom, prenom, email, mot_de_passe_hash, role('passager'|'admin')`
- `emplacements`: `id, terminal_id, porte_id, type('gate'|'restaurant'|'boutique'|'service'), nom, niveau, ouverture, fermeture, description, image_url, latitude, longitude`
- `favoris`: `utilisateur_id, vol_id` · `bagages`: `id, reservation_id, etiquette, poids_kg, tapis, statut('enregistre'|'en_soute'|'sur_tapis'|'recupere')`

## Seed-id ranges (avoid collisions between teammates' test data)
`backend/db/data.sql` uses ids 1–99. Extra rows a feature adds to a shared table: R 100–199 · S 200–299 · H 300–399. Always `INSERT IGNORE`.

## Typical query
```python
from backend.core.db import query
from backend.core.serialize import clean_row

rows = query(
    """SELECT v.*, c.nom AS compagnie, p.code AS porte, t.nom AS terminal
       FROM vols v
       JOIN compagnies c ON c.id = v.compagnie_id
       LEFT JOIN portes p ON p.id = v.porte_id
       LEFT JOIN terminaux t ON t.id = p.terminal_id
       WHERE v.type = %s ORDER BY v.date_heure_depart""",
    ("depart",),
)
return [clean_row(r) for r in rows]
```
