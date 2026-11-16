import type { StatutVol } from "@shared/lib/types";

const STYLES: Record<StatutVol, { label: string; cls: string }> = {
  a_l_heure: { label: "À l'heure", cls: "text-ok bg-ok-bg" },
  retarde: { label: "Retardé", cls: "text-late bg-late-bg" },
  annule: { label: "Annulé", cls: "text-cancel bg-cancel-bg" },
  embarquement: { label: "À l'embarquement", cls: "text-white bg-accent" },
};

export default function StatusBadge({ statut }: { statut: StatutVol }) {
  const s = STYLES[statut];
  return <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${s.cls}`}>{s.label}</span>;
}
