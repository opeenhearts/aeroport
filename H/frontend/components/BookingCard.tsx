import { Armchair, ArrowRight, ChevronRight, Clock3, Luggage, Plane } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Card from "@shared/components/Card";
import StatusBadge from "@shared/components/StatusBadge";
import type { ReservationMock } from "../mock";

export default function BookingCard({ reservation }: { reservation: ReservationMock }) {
  const navigate = useNavigate();
  const date = new Date(reservation.date_heure_depart);
  const dateLabel = date.toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "long" });
  const timeLabel = date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
  return (
    <Card className="overflow-hidden p-0">
      <button aria-label={`Voir les détails du vol ${reservation.numero}`} className="block w-full p-4 text-left" onClick={() => navigate(`/vols/${reservation.vol_id}`)}>
        <span className="flex items-center justify-between gap-3">
          <span className="flex min-w-0 items-center gap-2"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent"><Plane size={17} /></span><span className="truncate font-bold text-ink">{reservation.numero}</span></span>
          <StatusBadge statut={reservation.statut_vol} />
        </span>
        <span className="mt-4 flex items-center justify-between gap-2">
          <span className="min-w-0 flex-1"><span className="block truncate text-base font-bold text-ink">{reservation.origine}</span><span className="mt-1 block text-xs text-muted">Départ</span></span>
          <span className="flex shrink-0 flex-col items-center gap-1 text-accent"><ArrowRight size={18} /><span className="h-px w-10 bg-accent/20" /></span>
          <span className="min-w-0 flex-1 text-right"><span className="block truncate text-base font-bold text-ink">{reservation.destination}</span><span className="mt-1 block text-xs text-muted">Destination</span></span>
          <ChevronRight size={17} className="ml-1 shrink-0 text-muted" />
        </span>
        <span className="mt-4 grid grid-cols-2 gap-2 rounded-2xl bg-app p-3">
          <span className="flex items-center gap-2"><Clock3 size={16} className="shrink-0 text-accent" /><span><span className="block text-[10px] text-muted">Date et heure</span><span className="block text-xs font-semibold capitalize text-ink">{dateLabel} · {timeLabel}</span></span></span>
          <span className="flex items-center justify-end gap-2"><Armchair size={16} className="shrink-0 text-accent" /><span><span className="block text-[10px] text-muted">Siège</span><span className="block text-xs font-semibold text-ink">{reservation.siege ?? "Non attribué"}</span></span></span>
        </span>
      </button>
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-app px-4 py-3">
        <span className="min-w-0 text-xs text-muted"><span className="block truncate font-semibold text-ink">{reservation.compagnie}</span>{reservation.porte ? <span className="mt-0.5 block">Porte {reservation.porte}</span> : <span className="mt-0.5 block">Porte à confirmer</span>}</span>
        <button className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-navy px-3.5 py-2.5 text-xs font-semibold text-white" onClick={() => navigate(`/bagages/${reservation.id}`)}><Luggage size={15} /> Bagages</button>
      </div>
    </Card>
  );
}
