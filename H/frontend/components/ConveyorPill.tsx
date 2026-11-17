import { Luggage } from "lucide-react";

export default function ConveyorPill({ tapis }: { tapis: number }) {
  return <div className="flex items-center justify-center gap-3 rounded-2xl bg-accent/10 px-4 py-3 text-navy"><Luggage size={27} /><span className="text-2xl font-extrabold">Tapis n° {tapis}</span></div>;
}
