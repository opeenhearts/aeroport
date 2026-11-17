
import type {
  Utilisateur,
  Passager,
  Compagnie,
  Avion,
  Vol,
  Reservation,
  Terminal,
  Porte,
} from "@shared/lib/types";

// USERS

export const utilisateurs: Utilisateur[] = [
  {
    id: 1,
    nom: "EL BOUAZZAOUI",
    prenom: "Wissal",
    email: "wissal@email.com",
    role: "passager",
  },
  {
    id: 2,
    nom: "Admin",
    prenom: "Admin",
    email: "admin@aeroport.com",
    role: "admin",
  },
];

// PASSENGERS

export const passagers: Passager[] = [
  {
    id: 1,
    utilisateur_id: 1,
    passeport: "MA123456",
    telephone: "+212600000000",
  },
];

// AIRLINES

export const compagnies: Compagnie[] = [
  { id: 1, code: "AT", nom: "Royal Air Maroc", logo_url: null },
  { id: 2, code: "AF", nom: "Air France", logo_url: null },
  { id: 3, code: "IB", nom: "Iberia", logo_url: null },
  { id: 4, code: "EK", nom: "Emirates", logo_url: null },
];

// AIRCRAFT

export const avions: Avion[] = [
  { id: 1, modele: "Boeing 737", immatriculation: "CN-RGA", capacite: 160 },
  { id: 2, modele: "Airbus A320", immatriculation: "CN-RGB", capacite: 180 },
  { id: 3, modele: "Airbus A321", immatriculation: "F-GTAA", capacite: 220 },
  { id: 4, modele: "Boeing 777", immatriculation: "A6-EQA", capacite: 350 },
];

// TERMINALS

export const terminaux: Terminal[] = [
  { id: 1, nom: "Terminal 1" },
  { id: 2, nom: "Terminal 2" },
];

// GATES

export const portes: Porte[] = [
  { id: 1, terminal_id: 1, code: "A12", niveau: "1" },
  { id: 2, terminal_id: 1, code: "A10", niveau: "1" },
  { id: 3, terminal_id: 2, code: "B04", niveau: "0" },
  { id: 4, terminal_id: 2, code: "B06", niveau: "0" },
];

// FLIGHTS
// Demonstration data only. Dates are intentionally in the future.

export const vols: Vol[] = [
  {
    id: 1,
    numero: "AT205",
    compagnie_id: 1,
    avion_id: 1,
    origine: "Casablanca (CMN)",
    destination: "Paris (CDG)",
    type: "depart",
    date_heure_depart: "2026-11-17T10:30:00",
    date_heure_arrivee: "2026-11-17T14:45:00",
    porte_id: 1,
    terminal_arrivee: "Terminal 2",
    statut: "a_l_heure",
  },
  {
    id: 2,
    numero: "AF1597",
    compagnie_id: 2,
    avion_id: 2,
    origine: "Casablanca (CMN)",
    destination: "Paris (CDG)",
    type: "depart",
    date_heure_depart: "2026-11-17T13:15:00",
    date_heure_arrivee: "2026-11-17T17:30:00",
    porte_id: 2,
    terminal_arrivee: "Terminal 2",
    statut: "embarquement",
  },
  {
    id: 3,
    numero: "IB8792",
    compagnie_id: 3,
    avion_id: 3,
    origine: "Casablanca (CMN)",
    destination: "Madrid (MAD)",
    type: "depart",
    date_heure_depart: "2026-11-18T09:00:00",
    date_heure_arrivee: "2026-11-18T11:20:00",
    porte_id: 3,
    terminal_arrivee: "Terminal 1",
    statut: "retarde",
  },
  {
    id: 4,
    numero: "EK752",
    compagnie_id: 4,
    avion_id: 4,
    origine: "Casablanca (CMN)",
    destination: "Dubai (DXB)",
    type: "depart",
    date_heure_depart: "2026-11-18T15:40:00",
    date_heure_arrivee: "2026-11-18T23:55:00",
    porte_id: 4,
    terminal_arrivee: "Terminal 2",
    statut: "a_l_heure",
  },
];

// RESERVATIONS

export const reservations: Reservation[] = [
  {
    id: 1,
    passager_id: 1,
    vol_id: 1,
    siege: "14A",
    statut: "confirmee",
  },
];
