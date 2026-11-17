import { Check, Luggage, Plane, PlaneTakeoff } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "@shared/components/Card";
import PageHeader from "@shared/components/PageHeader";
import BaggageStatusStepper from "../components/BaggageStatusStepper";
import ConveyorPill from "../components/ConveyorPill";
import { useBagages } from "../hooks/useBagages";

export default function BaggagePage() {
  const { reservationId } = useParams();
  const navigate = useNavigate();
  const { bags, reservations, selectedReservation, loading, error } = useBagages(reservationId);
  const bag = bags[0];

  return (
    <>
      <PageHeader title="Bagages" back />
      <main className="space-y-4 p-4">
        {loading && <p className="py-8 text-center text-muted">Chargement de vos bagages…</p>}
        {error && <p role="alert" className="rounded-card bg-cancel-bg p-4 text-cancel">{error}</p>}

        {!loading && !error && reservations.length > 1 && (
          <label className="block text-sm font-semibold text-ink">
            Choisir un vol
            <select
              className="mt-2 w-full rounded-2xl border-0 bg-white p-3 text-ink shadow-card"
              value={selectedReservation?.id ?? ""}
              onChange={(event) => navigate(event.target.value ? `/bagages/${event.target.value}` : "/bagages")}
            >
              {reservations.map((reservation) => (
                <option key={reservation.id} value={reservation.id}>
                  {reservation.numero} · {reservation.origine} → {reservation.destination}
                </option>
              ))}
            </select>
          </label>
        )}

        {!loading && !error && reservations.length === 0 && (
          <Card className="py-10 text-center">
            <Luggage size={42} className="mx-auto mb-3 text-muted" />
            <h2 className="font-bold text-ink">Aucune réservation</h2>
            <p className="mt-1 text-sm text-muted">Vos informations de bagages apparaîtront ici.</p>
          </Card>
        )}

        {!loading && !error && reservations.length > 0 && !selectedReservation && (
          <Card className="py-10 text-center">
            <Luggage size={42} className="mx-auto mb-3 text-muted" />
            <h2 className="font-bold text-ink">Réservation introuvable</h2>
            <p className="mt-1 text-sm text-muted">Choisissez un vol pour consulter le suivi de vos bagages.</p>
          </Card>
        )}

        {!loading && !error && selectedReservation && !bag && (
          <Card className="py-10 text-center">
            <Luggage size={42} className="mx-auto mb-3 text-accent" />
            <h2 className="font-bold text-ink">Aucun bagage enregistré</h2>
            <p className="mt-1 text-sm text-muted">Le suivi des bagages du vol {selectedReservation.numero} apparaîtra ici.</p>
          </Card>
        )}

        {!loading && !error && selectedReservation && bag && (
          <>
            <Card className="overflow-hidden px-5 py-6 text-center">
              <div
                aria-label="Illustration d'une valise et d'un avion"
                className="relative mx-auto mb-5 flex h-28 max-w-[280px] items-center justify-center"
              >
                <div className="absolute inset-x-5 top-1/2 border-t-2 border-dashed border-accent/30" />
                <Luggage size={58} strokeWidth={1.8} className="relative z-10 rounded-xl bg-white p-1 text-accent" />
                <Plane size={34} className="absolute right-0 top-2 rotate-12 bg-white p-1 text-accent/70" />
                <PlaneTakeoff size={23} className="absolute bottom-1 left-0 -rotate-12 bg-white p-1 text-accent/70" />
              </div>
              <h2 className="text-lg font-bold text-ink">Vol {selectedReservation.numero}</h2>
              <p className="mt-1 text-sm text-muted">Votre tapis est disponible au :</p>
              <div className="mt-4">
                {bag.tapis === null ? (
                  <p className="rounded-2xl bg-late-bg px-4 py-3 font-bold text-late">Tapis pas encore attribué</p>
                ) : (
                  <ConveyorPill tapis={bag.tapis} />
                )}
              </div>
              {bag.tapis === null ? (
                <p className="mx-auto mt-4 max-w-xs text-sm text-muted">Le numéro du tapis sera affiché dès qu’il sera attribué.</p>
              ) : (
                <p className="mx-auto mt-4 flex max-w-xs items-start justify-center gap-2 text-sm text-ink">
                  <Check size={18} className="mt-0.5 shrink-0 text-ok" />
                  Retrouvez vos bagages au niveau des arrivées.
                </p>
              )}
            </Card>

            <Card>
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="font-bold text-ink">Suivi du bagage</h3>
                <span className="truncate text-xs text-muted">{bag.etiquette}</span>
              </div>
              <BaggageStatusStepper statut={bag.statut} />
            </Card>
          </>
        )}
      </main>
    </>
  );
}
