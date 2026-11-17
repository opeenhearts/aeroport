import { useMemo } from "react";
import { bagagesMock, reservationsMock } from "../mock";

export function useBagages(reservationId?: string) {
  return useMemo(() => {
    const reservations = reservationsMock;
    const requestedId = reservationId === undefined ? undefined : Number(reservationId);
    const selectedReservation = requestedId === undefined
      ? [...reservations]
          .filter((reservation) => new Date(reservation.date_heure_depart).getTime() >= Date.now())
          .sort((a, b) => Date.parse(a.date_heure_depart) - Date.parse(b.date_heure_depart))[0] ?? reservations[0]
      : reservations.find((reservation) => reservation.id === requestedId);
    const bags = selectedReservation
      ? bagagesMock.filter((bag) => bag.reservation_id === selectedReservation.id)
      : [];

    return { bags, reservations, selectedReservation, loading: false, error: null as string | null };
  }, [reservationId]);
}
