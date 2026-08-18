import type { Metadata } from "next";
import Link from "next/link";
import SiteImage from "@/app/components/site-image";
import { LEGAL_ADDRESS_LINE, LEGAL_ENTITY } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Privacy policy | Revenge Gym",
  description: "Informativa sul trattamento dei dati e sul contatore statistico del sito Revenge Gym.",
  alternates: { canonical: "/privacy/" },
};

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <header className="legal-header">
        <Link href="/?skipIntro=1#home" aria-label="Revenge Gym, torna alla home">
          <SiteImage src="/brand/revenge-gym-logo.png" alt="Revenge Gym" />
        </Link>
        <Link href="/?skipIntro=1#contatti">← Torna ai contatti</Link>
      </header>
      <article>
        <p className="eyebrow"><span /> Privacy</p>
        <h1>INFORMATIVA SUL<br /><em>TRATTAMENTO DATI.</em></h1>
        <p>Questa informativa descrive come {LEGAL_ENTITY.legalName}, titolare del trattamento, tratta i dati inviati tramite il modulo contatti e i dati tecnici utilizzati dal contatore del sito {LEGAL_ENTITY.brand}.</p>
        <h2>Titolare</h2>
        <p>Titolare del trattamento è {LEGAL_ENTITY.legalName}, C.F. {LEGAL_ENTITY.taxId}, {LEGAL_ADDRESS_LINE}.</p>
        <h2>Dati raccolti</h2>
        <p>Nome e cognome, indirizzo email, numero di telefono, area di interesse e l’eventuale messaggio inserito volontariamente.</p>
        <h2>Finalità e base giuridica</h2>
        <p>I dati vengono utilizzati esclusivamente per rispondere alla richiesta dell’interessato. Il trattamento si basa sul consenso espresso prima dell’invio.</p>
        <h2>Modalità e destinatari</h2>
        <p>Il modulo utilizza il servizio tecnico FormSubmit per recapitare la richiesta via email. I dati non vengono venduti né utilizzati per finalità pubblicitarie automatiche. FormSubmit tratta il contenuto della richiesta al solo fine della consegna all’indirizzo della palestra.</p>
        <h2>Mappa e servizi di terze parti</h2>
        <p>La pagina contatti può mostrare una mappa incorporata di Google Maps, erogata da Google Ireland Ltd. L’uso della mappa può comportare il trasferimento di dati tecnici (incluso l’indirizzo IP) verso Google, secondo l’informativa disponibile su policies.google.com.</p>
        <h2>Contatore delle visite</h2>
        <p>La homepage mostra il numero complessivo di visualizzazioni e di visitatori giornalieri. A ogni apertura viene registrata una visualizzazione, mentre lo stesso indirizzo viene contato al massimo una volta per ciascun giorno. Per distinguere le visite giornaliere, l’indirizzo IP viene trasformato immediatamente in un codice non leggibile mediante una chiave privata: l’IP originale non viene conservato. Il contatore non utilizza cookie e i dati tecnici sono archiviati tramite Cloudflare esclusivamente per produrre queste statistiche aggregate.</p>
        <h2>Conservazione e diritti</h2>
        <p>I dati vengono conservati solo per il tempo necessario a gestire la richiesta. È possibile chiedere accesso, rettifica o cancellazione scrivendo a <a href="mailto:laurogino@tiscali.it">laurogino@tiscali.it</a>.</p>
        <h2>Contatti</h2>
        <p>{LEGAL_ENTITY.legalName} · {LEGAL_ENTITY.brand} · C.F. {LEGAL_ENTITY.taxId} · {LEGAL_ADDRESS_LINE} · <a href="tel:+393475368488">347 536 8488</a>.</p>
        <Link className="button primary" href="/?skipIntro=1#contatti">← Torna ai contatti</Link>
      </article>
    </main>
  );
}
