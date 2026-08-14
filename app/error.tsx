"use client";

import Link from "next/link";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="legal-page">
      <article>
        <p className="eyebrow"><span /> Errore</p>
        <h1>QUALCOSA È<br /><em>ANDATO STORTO.</em></h1>
        <p>Riprova, oppure torna alla home di Revenge Gym.</p>
        <button className="button primary" type="button" onClick={reset}>Riprova</button>
        <Link className="button primary" href="/?skipIntro=1#home">Torna alla home</Link>
      </article>
    </main>
  );
}
