-- Tables de la feature CARTE (R). Seul R modifie ce fichier.
CREATE TABLE IF NOT EXISTS emplacements (
  id INT AUTO_INCREMENT PRIMARY KEY,
  terminal_id INT NOT NULL,
  porte_id INT NULL,                         -- renseigné si type = 'gate'
  type ENUM('gate','restaurant','boutique','service') NOT NULL,
  nom VARCHAR(100) NOT NULL,
  niveau INT NOT NULL DEFAULT 1,
  ouverture TIME NULL,
  fermeture TIME NULL,
  description VARCHAR(255),
  image_url VARCHAR(255),
  latitude DOUBLE NOT NULL,                  -- coordonnées Google Maps
  longitude DOUBLE NOT NULL,
  FOREIGN KEY (terminal_id) REFERENCES terminaux(id),
  FOREIGN KEY (porte_id) REFERENCES portes(id)
);
