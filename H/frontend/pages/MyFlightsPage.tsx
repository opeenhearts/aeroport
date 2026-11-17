import { Plane, Ticket } from "lucide-react";
import PageHeader from "@shared/components/PageHeader";
import BookingCard from "../components/BookingCard";
import { useReservations } from "../hooks/useReservations";

export default function MyFlightsPage() {
  const { upcoming, past, loading, error } = useReservations();
  return <>
    <PageHeader title="Mes vols" />
    <main className="space-y-6 p-4">
      {loading && <p className="py-8 text-center text-muted">Chargement de vos réservations…</p>}
      {error && <p role="alert" className="rounded-card bg-cancel-bg p-4 text-cancel">{error}</p>}
      {!loading && !error && <>
        <section aria-labelledby="upcoming-heading" className="space-y-3">
          <h2 id="upcoming-heading" className="flex items-center gap-2 font-bold text-ink"><Plane size={18} className="text-accent" /> À venir <span className="text-sm font-normal text-muted">({upcoming.length})</span></h2>
          {upcoming.length ? <div className="space-y-3">{upcoming.map((reservation) => <BookingCard key={reservation.id} reservation={reservation} />)}</div> : <p className="rounded-card bg-white p-5 text-center text-sm text-muted shadow-card">Aucun vol à venir.</p>}
        </section>
        <section aria-labelledby="past-heading" className="space-y-3">
          <h2 id="past-heading" className="flex items-center gap-2 font-bold text-ink"><Ticket size={18} className="text-muted" /> Passés <span className="text-sm font-normal text-muted">({past.length})</span></h2>
          {past.length ? <div className="space-y-3">{past.map((reservation) => <BookingCard key={reservation.id} reservation={reservation} />)}</div> : <p className="rounded-card bg-white p-5 text-center text-sm text-muted shadow-card">Aucun vol passé.</p>}
        </section>
      </>}
    </main>
  </>;
}
