-- Données de test CARTE (R). Coordonnées autour de l'aéroport Mohammed V (Casablanca).
INSERT IGNORE INTO emplacements (id, terminal_id, porte_id, type, nom, niveau, ouverture, fermeture, latitude, longitude) VALUES
 (1, 1, 1,    'gate',       'Porte A12',            2, NULL,       NULL,       33.3675, -7.5898),
 (2, 1, NULL, 'restaurant', 'Starbucks',            1, '08:00:00', '22:00:00', 33.3669, -7.5905),
 (3, 1, NULL, 'boutique',   'Duty Free',            2, '08:00:00', '22:00:00', 33.3672, -7.5890),
 (4, 2, NULL, 'restaurant', 'Restaurant Le Voyage', 1, '07:00:00', '22:00:00', 33.3660, -7.5880),
 (5, 1, NULL, 'service',    'Pharmacie',            1, '08:00:00', '21:00:00', 33.3667, -7.5895);
