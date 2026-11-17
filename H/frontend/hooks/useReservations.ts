import { useMemo } from "react";
import { reservationsMock } from "../mock";

export function useReservations() {
  return useMemo(() => ({
    reservations: reservationsMock,
    upcoming: reservationsMock.filter((r) => new Date(r.date_heure_depart).getTime() >= Date.now()),
    past: reservationsMock.filter((r) => new Date(r.date_heure_depart).getTime() < Date.now()),
    loading: false,
    error: null as string | null,
  }), []);
}
