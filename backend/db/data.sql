-- Données de test PARTAGÉES (reprend la maquette). PROPRIÉTAIRE : W.
-- Ids fixes + INSERT IGNORE => relançable sans doublons.

INSERT IGNORE INTO utilisateurs (id, nom, prenom, email, mot_de_passe_hash, role) VALUES
 (1, 'EL BOUAZZAOUI', 'Wissal', 'wissal@email.com', 'demo', 'passager'),
 (2, 'Admin', 'Admin', 'admin@aeroport.com', 'demo', 'admin');

INSERT IGNORE INTO compagnies (id, code, nom) VALUES
 (1, 'AT', 'Royal Air Maroc'), (2, 'AF', 'Air France'),
 (3, 'IB', 'Iberia'),          (4, 'EK', 'Emirates');

INSERT IGNORE INTO avions (id, modele, immatriculation, capacite) VALUES
 (1, 'Boeing 737', 'CN-ROA', 160), (2, 'Airbus A320', 'F-HBNA', 180),
 (3, 'Airbus A321', 'EC-MXY', 200), (4, 'Boeing 777', 'A6-ENA', 354);

INSERT IGNORE INTO terminaux (id, nom) VALUES (1, 'Terminal 1'), (2, 'Terminal 2');

INSERT IGNORE INTO portes (id, terminal_id, code, niveau) VALUES
 (1, 1, 'A12', 2), (2, 1, 'A10', 2), (3, 2, 'B04', 1), (4, 2, 'B06', 1);

INSERT IGNORE INTO vols
 (id, numero, compagnie_id, avion_id, origine, destination, type,
  date_heure_depart, date_heure_arrivee, porte_id, terminal_arrivee, statut) VALUES
 (1, 'AT203',   1, 1, 'Casablanca', 'Paris',      'depart',  '2026-11-16 14:30:00', '2026-11-16 17:45:00', 1, 'Terminal 2', 'embarquement'),
 (2, 'AF1496',  2, 2, 'Paris',      'Casablanca', 'arrivee', '2026-11-16 12:50:00', '2026-11-16 14:50:00', 2, 'Terminal 1', 'a_l_heure'),
 (3, 'IB1972',  3, 3, 'Madrid',     'Casablanca', 'arrivee', '2026-11-16 13:30:00', '2026-11-16 15:10:00', 3, 'Terminal 1', 'retarde'),
 (4, 'EK752',   4, 4, 'Dubai',      'Casablanca', 'arrivee', '2026-11-16 09:00:00', '2026-11-16 16:00:00', 4, 'Terminal 2', 'a_l_heure');

INSERT IGNORE INTO passagers (id, utilisateur_id, passeport, telephone) VALUES
 (1, 1, 'P1234567', '+212600000000');

INSERT IGNORE INTO reservations (id, passager_id, vol_id, siege, statut) VALUES
 (1, 1, 1, '14A', 'confirmee');
