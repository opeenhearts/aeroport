-- Tables de la feature MES VOLS / BAGAGES (H). Seul H modifie ce fichier.
CREATE TABLE IF NOT EXISTS bagages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  reservation_id INT NOT NULL,
  etiquette VARCHAR(20) NOT NULL UNIQUE,
  poids_kg DECIMAL(5,1),
  tapis INT NULL,                            -- numéro du tapis de livraison
  statut ENUM('enregistre','en_soute','sur_tapis','recupere') NOT NULL DEFAULT 'enregistre',
  FOREIGN KEY (reservation_id) REFERENCES reservations(id)
);
