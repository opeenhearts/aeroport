import { Check } from "lucide-react";
import type { StatutBagage } from "../mock";

const STEPS: { id: StatutBagage; label: string }[] = [
  { id: "enregistre", label: "Enregistré" }, { id: "en_soute", label: "En soute" }, { id: "sur_tapis", label: "Sur le tapis" }, { id: "recupere", label: "Récupéré" },
];

export default function BaggageStatusStepper({ statut }: { statut: StatutBagage }) {
  const active = STEPS.findIndex((step) => step.id === statut);
  return <ol className="grid grid-cols-4 gap-1" aria-label="Progression du bagage">{STEPS.map((step, index) => <li key={step.id} className="flex flex-col items-center gap-2 text-center"><span className={`grid h-8 w-8 place-items-center rounded-full ${index <= active ? "bg-ok-bg text-ok" : "bg-app text-muted"}`}>{index < active ? <Check size={16} /> : <span className="text-xs font-bold">{index + 1}</span>}</span><span className={`text-[10px] leading-tight ${index <= active ? "font-semibold text-ink" : "text-muted"}`}>{step.label}</span></li>)}</ol>;
}
