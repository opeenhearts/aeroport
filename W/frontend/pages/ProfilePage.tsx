
import {
  Settings,
  UserRound,
  Plane,
  Heart,
  Ticket,
  History,
  Pencil,
  LogOut,
  ChevronRight,
  ShieldCheck,
  Mail,
  Phone,
  CreditCard,
  CalendarDays,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import PageHeader from "@shared/components/PageHeader";
import Card from "@shared/components/Card";
import StatusBadge from "@shared/components/StatusBadge";

import {
  utilisateurs,
  passagers,
  reservations,
  vols,
  compagnies,
} from "../../../frontend/mock";

// Profil du passager connecté (données de démonstration)
export default function ProfilePage() {
  const navigate = useNavigate();

  const utilisateur = utilisateurs.find(
    (u) => u.id === 1
  );

  const passager = passagers.find(
    (p) => p.utilisateur_id === utilisateur?.id
  );

  const mesReservations = reservations.filter(
    (r) => r.passager_id === passager?.id
  );

  const initiales = utilisateur
    ? `${utilisateur.prenom[0]}${utilisateur.nom[0]}`
    : "P";

  const menuItems = [
    {
      label: "Mes vols",
      description: "Consultez vos prochains vols",
      icon: Plane,
    },
    {
      label: "Mes favoris",
      description: "Vos destinations préférées",
      icon: Heart,
    },
    {
      label: "Mes réservations",
      description: "Retrouvez vos réservations",
      icon: Ticket,
    },
    {
      label: "Historique des vols",
      description: "Consultez vos voyages précédents",
      icon: History,
    },
  ];

  const handleComingSoon = (feature: string) => {
    alert(`${feature} : fonctionnalité bientôt disponible.`);
  };

  return (
    <div className="min-h-screen bg-app pb-6">
      <PageHeader
        title="Mon profil"
        right={
          <button
            type="button"
            onClick={() => handleComingSoon("Paramètres")}
            aria-label="Paramètres"
            className="rounded-full p-2 transition hover:bg-white/10"
          >
            <Settings size={21} />
          </button>
        }
      />

      <main className="space-y-5 p-4">

        {/* IDENTITÉ DU PASSAGER */}
        <Card className="overflow-hidden !p-0">
          <div className="bg-navy px-5 pb-6 pt-7 text-center text-white">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-4 border-white/20 bg-accent text-2xl font-bold">
              {initiales}
            </div>

            <h2 className="mt-3 text-xl font-bold">
              {utilisateur?.prenom} {utilisateur?.nom}
            </h2>

            <p className="mt-1 text-sm text-white/70">
              {utilisateur?.email}
            </p>

            <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium">
              <ShieldCheck size={14} />
              Compte passager
            </div>
          </div>

          <div className="grid grid-cols-2 divide-x divide-gray-100 px-3 py-4">
            <div className="text-center">
              <p className="text-xs text-muted">Réservations</p>
              <p className="mt-1 text-xl font-bold text-navy">
                {mesReservations.length}
              </p>
            </div>

            <div className="text-center">
              <p className="text-xs text-muted">Voyages</p>
              <p className="mt-1 text-xl font-bold text-navy">
                {mesReservations.length}
              </p>
            </div>
          </div>
        </Card>

        {/* INFORMATIONS PERSONNELLES */}
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-bold text-ink">
              Informations personnelles
            </h2>

            <button
              type="button"
              onClick={() => handleComingSoon("Modification du profil")}
              className="flex items-center gap-1 text-sm font-semibold text-accent"
            >
              <Pencil size={14} />
              Modifier
            </button>
          </div>

          <Card className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-app p-2.5 text-accent">
                <UserRound size={19} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-muted">Nom complet</p>
                <p className="text-sm font-semibold text-ink">
                  {utilisateur?.prenom} {utilisateur?.nom}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-app p-2.5 text-accent">
                <Mail size={19} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-muted">Adresse e-mail</p>
                <p className="break-all text-sm font-semibold text-ink">
                  {utilisateur?.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-app p-2.5 text-accent">
                <Phone size={19} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-muted">Téléphone</p>
                <p className="text-sm font-semibold text-ink">
                  {passager?.telephone ?? "Non renseigné"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-app p-2.5 text-accent">
                <CreditCard size={19} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-muted">Numéro de passeport</p>
                <p className="text-sm font-semibold text-ink">
                  {passager?.passeport ?? "Non renseigné"}
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* ESPACE VOYAGEUR */}
        <section>
          <h2 className="mb-3 font-bold text-ink">
            Mon espace voyageur
          </h2>

          <Card className="!p-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() =>
                    handleComingSoon(item.label)
                  }
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-app ${
                    index !== menuItems.length - 1
                      ? "border-b border-gray-100"
                      : ""
                  }`}
                >
                  <div className="rounded-xl bg-app p-2.5 text-accent">
                    <Icon size={19} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-ink">
                      {item.label}
                    </p>
                    <p className="text-xs text-muted">
                      {item.description}
                    </p>
                  </div>

                  <ChevronRight size={18} className="text-muted" />
                </button>
              );
            })}
          </Card>
        </section>

        {/* MES RÉSERVATIONS */}
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-bold text-ink">
              Mes réservations
            </h2>

            <span className="text-xs text-muted">
              {mesReservations.length} réservation(s)
            </span>
          </div>

          {mesReservations.length > 0 ? (
            <div className="space-y-3">
              {mesReservations.map((reservation) => {
                const vol = vols.find(
                  (v) => v.id === reservation.vol_id
                );

                const compagnie = compagnies.find(
                  (c) => c.id === vol?.compagnie_id
                );

                if (!vol) return null;

                return (
                  <Card key={reservation.id}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted">
                          {compagnie?.nom}
                        </p>
                        <p className="mt-1 font-bold text-navy">
                          {vol.numero}
                        </p>
                      </div>

                      <span className="rounded-full bg-ok-bg px-3 py-1 text-xs font-semibold text-ok">
                        {reservation.statut === "confirmee"
                          ? "Confirmée"
                          : reservation.statut}
                      </span>
                    </div>

                    <div className="my-4 flex items-center justify-between gap-2">
                      <div>
                        <p className="text-sm font-bold text-ink">
                          {vol.origine}
                        </p>
                      </div>

                      <div className="flex flex-1 items-center justify-center gap-2 text-accent">
                        <div className="h-px flex-1 bg-gray-200" />
                        <Plane size={17} />
                        <div className="h-px flex-1 bg-gray-200" />
                      </div>

                      <div>
                        <p className="text-sm font-bold text-ink">
                          {vol.destination}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-3">
                      <div className="flex items-center gap-2 text-xs text-muted">
                        <CalendarDays size={15} />
                        {new Date(
                          vol.date_heure_depart
                        ).toLocaleDateString("fr-FR")}
                      </div>

                      <div className="text-xs text-muted">
                        Siège :{" "}
                        <span className="font-bold text-navy">
                          {reservation.siege}
                        </span>
                      </div>

                      <StatusBadge statut={vol.statut} />
                    </div>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card>
              <p className="text-center text-sm text-muted">
                Vous n'avez aucune réservation pour le moment.
              </p>
            </Card>
          )}
        </section>

        {/* DÉCONNEXION */}
        <button
          type="button"
          onClick={() =>
            handleComingSoon("Déconnexion")
          }
          className="flex w-full items-center justify-center gap-2 rounded-card border border-red-100 bg-white py-4 text-sm font-semibold text-cancel transition hover:bg-red-50"
        >
          <LogOut size={18} />
          Se déconnecter
        </button>

        <p className="pb-2 text-center text-xs text-muted">
          Airport Management · Espace passager
        </p>

      </main>
    </div>
  );
}