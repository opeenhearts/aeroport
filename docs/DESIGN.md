# Design guide (matches `docs/reference/ui-reference.png`)

Mobile-first: a ~448px centred column, lavender-white background, rounded white cards, navy headers, violet accent, bottom tab bar (Accueil · Carte · Recherche · Profil — provided by `Layout.tsx`). The admin is the only desktop-style area (full width + sidebar).

## Tailwind tokens (defined in `tailwind.config.js`)
| Class | Hex | Use |
|---|---|---|
| `bg-navy` / `text-navy` | `#1F2A5C` | screen header bar, primary buttons |
| `accent` | `#5B4BDB` | active tab, "À l'embarquement" badge, highlights |
| `bg-app` | `#EEF1FA` | page background |
| `text-ink` / `text-muted` | `#1B2140` / `#7A819C` | body / secondary text |
| `text-ok` `bg-ok-bg` | `#1E9E5A` / `#DDF4E7` | "À l'heure" |
| `text-late` `bg-late-bg` | `#E8823A` / `#FDEBDD` | "Retardé" |
| `text-cancel` `bg-cancel-bg` | `#D64545` / `#FBE0E0` | "Annulé" |
| `rounded-card` `shadow-card` | 16px / soft shadow | cards |

No hard-coded hex values in components — use tokens (ask W to add a token if one is missing).

## Shared components (`@shared/components/*`)
- `PageHeader` — navy rounded-bottom header with optional back arrow and right slot. First element of every screen.
- `Card` — white rounded card. `StatusBadge` — flight status pill.
- List rows: left logo/thumbnail/icon · bold title + muted second line · right value/badge · chevron (`lucide-react` `ChevronRight`).
- Primary button: `className="w-full rounded-2xl bg-navy py-3 font-semibold text-white"`.
- Quick-access tiles (home): pastel rounded squares with icon + label.
- Icons: `lucide-react`. Language: French. Time `14:30`. Place: `Terminal 1 • Niveau 2`. Route: `Casablanca → Paris`.

## Screen inventory (from the mockup)
1. Accueil (W) · 2. Horaires des vols (S) · 3. Détails du vol (S) · 4. Plan de l'aéroport (R)
5. Services et commerces (R) · 6. Bagages (H) · 7. Espace passager (W) · 8. Admin tableau de bord (W)
(+ Mes vols (H): not in the mockup — same list-card style as Horaires des vols.)
