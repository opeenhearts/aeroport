-- Tables PARTAGÉES (core). PROPRIÉTAIRE : W. Ne pas modifier sans accord de W.
-- Les tables propres à une feature sont dans <LETTRE>/schema.sql.
-- Voir docs/DB_CONTRACT.md pour le détail et qui lit / écrit quoi.

CREATE TABLE IF NOT EXISTS utilisateurs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  prenom VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  mot_de_passe_hash VARCHAR(255) NOT NULL,
  role ENUM('passager','admin') NOT NULL DEFAULT 'passager'
);

CREATE TABLE IF NOT EXISTS compagnies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(3) NOT NULL UNIQUE,      -- AT, AF, IB, EK
  nom VARCHAR(100) NOT NULL,
  logo_url VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS avions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  modele VARCHAR(100) NOT NULL,         -- Boeing 737
  immatriculation VARCHAR(20) UNIQUE,
  capacite INT
);

CREATE TABLE IF NOT EXISTS terminaux (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(50) NOT NULL              -- Terminal 1
);

CREATE TABLE IF NOT EXISTS portes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  terminal_id INT NOT NULL,
  code VARCHAR(10) NOT NULL,            -- A12
  niveau INT NOT NULL DEFAULT 1,
  FOREIGN KEY (terminal_id) REFERENCES terminaux(id),
  UNIQUE (terminal_id, code)
);

CREATE TABLE IF NOT EXISTS vols (
  id INT AUTO_INCREMENT PRIMARY KEY,
  numero VARCHAR(10) NOT NULL UNIQUE,   -- AT203
  compagnie_id INT NOT NULL,
  avion_id INT,
  origine VARCHAR(100) NOT NULL,
  destination VARCHAR(100) NOT NULL,
  type ENUM('depart','arrivee') NOT NULL,
  date_heure_depart DATETIME NOT NULL,
  date_heure_arrivee DATETIME NOT NULL,
  porte_id INT,
  terminal_arrivee VARCHAR(50),
  statut ENUM('a_l_heure','retarde','annule','embarquement') NOT NULL DEFAULT 'a_l_heure',
  FOREIGN KEY (compagnie_id) REFERENCES compagnies(id),
  FOREIGN KEY (avion_id) REFERENCES avions(id),
  FOREIGN KEY (porte_id) REFERENCES portes(id)
);

CREATE TABLE IF NOT EXISTS passagers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  utilisateur_id INT NOT NULL,
  passeport VARCHAR(30),
  telephone VARCHAR(30),
  FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id)
);

CREATE TABLE IF NOT EXISTS reservations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  passager_id INT NOT NULL,
  vol_id INT NOT NULL,
  siege VARCHAR(5),
  statut ENUM('confirmee','annulee') NOT NULL DEFAULT 'confirmee',
  FOREIGN KEY (passager_id) REFERENCES passagers(id),
  FOREIGN KEY (vol_id) REFERENCES vols(id)
);
