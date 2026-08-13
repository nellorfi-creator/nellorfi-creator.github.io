import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy policy | Revenge Gym",
  description: "Informativa sul trattamento dei dati inviati attraverso il modulo contatti di Revenge Gym.",
  alternates: { canonical: "/privacy/" },
};

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <article>
        <p className="eyebrow"><span /> Privacy</p>
        <h1>INFORMATIVA SUL<br /><em>TRATTAMENTO DATI.</em></h1>
        <p>Questa informativa descrive come Revenge Gym tratta i dati inviati tramite il modulo contatti del sito.</p>
        <h2>Dati raccolti</h2>
        <p>Nome e cognome, indirizzo email, numero di telefono, area di interesse e l’eventuale messaggio inserito volontariamente.</p>
        <h2>Finalità e base giuridica</h2>
        <p>I dati vengono utilizzati esclusivamente per rispondere alla richiesta dell’interessato. Il trattamento si basa sul consenso espresso prima dell’invio.</p>
        <h2>Modalità e destinatari</h2>
        <p>Il modulo utilizza il servizio tecnico FormSubmit per recapitare la richiesta via email. I dati non vengono venduti né utilizzati per finalità pubblicitarie automatiche.</p>
        <h2>Conservazione e diritti</h2>
        <p>I dati vengono conservati solo per il tempo necessario a gestire la richiesta. È possibile chiedere accesso, rettifica o cancellazione scrivendo a <a href="mailto:laurogino@tiscali.it">laurogino@tiscali.it</a>.</p>
        <h2>Contatti</h2>
        <p>Revenge Gym · Via Berna 8, 00055 Ladispoli RM · <a href="tel:+393475368488">347 536 8488</a>.</p>
        <Link className="button primary" href="/?skipIntro=1#contatti">← Torna ai contatti</Link>
      </article>
    </main>
  );
}
