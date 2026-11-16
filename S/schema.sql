-- Tables de la feature RECHERCHE (S). Seul S modifie ce fichier.
CREATE TABLE IF NOT EXISTS favoris (
  utilisateur_id INT NOT NULL,
  vol_id INT NOT NULL,
  PRIMARY KEY (utilisateur_id, vol_id),
  FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id),
  FOREIGN KEY (vol_id) REFERENCES vols(id)
);
