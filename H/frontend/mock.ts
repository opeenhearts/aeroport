import type { StatutVol } from "@shared/lib/types";

export interface ReservationMock {
  id: number;
  passager_id: number;
  vol_id: number;
  siege: string | null;
  statut: "confirmee" | "annulee";
  numero: string;
  origine: string;
  destination: string;
  date_heure_depart: string;
  date_heure_arrivee: string;
  statut_vol: StatutVol;
  porte: string | null;
  compagnie: string;
}

export type StatutBagage = "enregistre" | "en_soute" | "sur_tapis" | "recupere";

export interface BagageMock {
  id: number;
  reservation_id: number;
  etiquette: string;
  poids_kg: number;
  tapis: number | null;
  statut: StatutBagage;
}

export const reservationsMock: ReservationMock[] = [
  { id: 1, passager_id: 1, vol_id: 1, siege: "14A", statut: "confirmee", numero: "AT203", origine: "Casablanca", destination: "Paris", date_heure_depart: "2026-11-18T14:30:00", date_heure_arrivee: "2026-11-18T17:45:00", statut_vol: "embarquement", porte: "A12", compagnie: "Royal Air Maroc" },
  { id: 2, passager_id: 1, vol_id: 3, siege: "08C", statut: "confirmee", numero: "IB1972", origine: "Madrid", destination: "Casablanca", date_heure_depart: "2026-10-29T13:30:00", date_heure_arrivee: "2026-10-29T15:10:00", statut_vol: "retarde", porte: "B04", compagnie: "Iberia" },
];

export const bagagesMock: BagageMock[] = [
  { id: 1, reservation_id: 1, etiquette: "BAG-AT203-001", poids_kg: 18.5, tapis: 6, statut: "sur_tapis" },
  { id: 2, reservation_id: 2, etiquette: "BAG-IB1972-001", poids_kg: 16, tapis: null, statut: "en_soute" },
];
