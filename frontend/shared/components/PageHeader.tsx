import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

/** Bandeau bleu marine en haut de chaque ecran. `back` affiche la fleche retour. */
export default function PageHeader({ title, back = false, right }: { title: string; back?: boolean; right?: ReactNode }) {
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-20 flex items-center gap-3 rounded-b-2xl bg-navy px-4 py-4 text-white">
      {back && (
        <button aria-label="Retour" onClick={() => navigate(-1)}>
          <ArrowLeft size={22} />
        </button>
      )}
      <h1 className="flex-1 text-lg font-bold">{title}</h1>
      {right}
    </header>
  );
}
