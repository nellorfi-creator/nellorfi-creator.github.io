import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pagina non trovata | Revenge Gym",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="legal-page">
      <article>
        <p className="eyebrow"><span /> 404</p>
        <h1>PAGINA NON<br /><em>TROVATA.</em></h1>
        <p>L’indirizzo non esiste o è stato spostato. Torna alla home o scrivici dalla pagina contatti.</p>
        <Link className="button primary" href="/?skipIntro=1#home">Torna alla home</Link>
      </article>
    </main>
  );
}
