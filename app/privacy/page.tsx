import type { Metadata } from "next";
import Link from "next/link";
import SiteImage from "@/app/components/site-image";
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_TEL, LEGAL_ADDRESS_LINE, LEGAL_ENTITY } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Privacy policy | Revenge Gym",
  description: "Informativa sul trattamento dei dati personali di ASD Revenge Boxe per il sito Revenge Gym.",
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
        <p>
          Informativa resa ai sensi degli articoli 13 e 14 del Regolamento (UE) 2016/679 (GDPR)
          da {LEGAL_ENTITY.legalName}, titolare del trattamento, per il sito {LEGAL_ENTITY.brand}.
          Ultimo aggiornamento: 21 agosto 2026.
        </p>

        <h2>Titolare</h2>
        <p>
          Titolare del trattamento è {LEGAL_ENTITY.legalName}, C.F. {LEGAL_ENTITY.taxId}, {LEGAL_ADDRESS_LINE}.
          Per esercitare i diritti o chiedere chiarimenti:{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          {" · "}
          <a href={`tel:${CONTACT_PHONE_TEL}`}>{CONTACT_PHONE}</a>.
        </p>
        <p>Non è designato un responsabile della protezione dei dati (DPO), non ricorrendone l’obbligo.</p>

        <h2>Dati trattati e finalità</h2>
        <p><strong>Modulo contatti.</strong> Nome e cognome, email, telefono, area di interesse e messaggio. Finalità: rispondere alla richiesta. Base giuridica: consenso (art. 6, par. 1, lett. a GDPR), espresso prima dell’invio. Il conferimento è facoltativo, ma senza questi dati non possiamo ricontattarti. Il browser invia il modulo a un Worker Cloudflare dell’associazione, non a servizi pubblicitari.</p>
        <p><strong>Contatore visite.</strong> All’apertura della homepage il browser invia una richiesta a un servizio Cloudflare Worker della palestra. L’indirizzo IP viene trasformato subito in un codice (HMAC) e non viene conservato in chiaro. Si registrano un conteggio complessivo delle visualizzazioni e, al massimo una volta al giorno per ciascun codice, una riga di visita. Finalità: statistica aggregata mostrata in homepage. Base giuridica: legittimo interesse (art. 6, par. 1, lett. f GDPR) a misurare l’uso del sito in forma minimizzata, senza cookie e senza profilazione. Il contatore non identifica la persona.</p>
        <p><strong>Google Analytics.</strong> All’apertura di ogni pagina il browser carica Google Analytics 4 (Google Ireland Ltd. / Google LLC). Si registrano pagine visitate, sorgente del traffico (ad esempio Instagram o ricerca Google), tipo di dispositivo e dati tecnici di connessione. Non usiamo questi dati per pubblicità. Base giuridica: legittimo interesse (art. 6, par. 1, lett. f) a misurare l’uso del sito. Puoi opporti scrivendo a {CONTACT_EMAIL} o bloccando i tracker nel browser.</p>
        <p><strong>Google Maps.</strong> La mappa incorporata non parte da sola. Solo se clicchi «Carica Google Maps» il browser si collega a Google Ireland Ltd. e possono essere trasmessi IP, dati del dispositivo e cookie di Google. Base giuridica: consenso. In alternativa il link «Apri in Google Maps» apre Google in una nuova scheda, senza incorporare la mappa.</p>
        <p><strong>Hosting e consegna delle pagine.</strong> Il sito è pubblicato su GitHub Pages. La consultazione delle pagine comporta il trattamento di dati tecnici di connessione (IP, data e ora, risorsa richiesta, user agent) da parte di GitHub e, per modulo e contatore, di Cloudflare. Finalità: erogare il sito e garantirne sicurezza e disponibilità. Base giuridica: legittimo interesse (art. 6, par. 1, lett. f).</p>
        <p><strong>Link a social.</strong> I pulsanti Facebook e Messenger portano a siti di terzi. Il trattamento da quel momento è regolato dalle informative di Meta, non da questa.</p>

        <h2>Destinatari</h2>
        <p>Il modulo è ricevuto da Cloudflare, Inc. (Worker). Per recapitare il messaggio sulla casella della palestra il Worker usa un servizio di consegna email (FormSubmit). I dati del contatore sono archiviati su Cloudflare (Worker e database D1). GitHub Inc. tratta i log tecnici di hosting. Google tratta i dati di Analytics a ogni visita e i dati della mappa solo dopo il click di caricamento. I dati non vengono venduti né usati per pubblicità automatica o profilazione commerciale da parte dell’associazione.</p>

        <h2>Trasferimenti extra UE</h2>
        <p>GitHub ha sede negli Stati Uniti. Cloudflare può trattare dati anche fuori dallo SEE e aderisce, ove applicabile, al Data Privacy Framework UE-USA. FormSubmit, usato solo dal Worker per la consegna del messaggio sulla casella, ha sede negli Stati Uniti; in assenza di un DPA dedicato il trasferimento per quella consegna si basa sulla necessità di evadere la tua richiesta (art. 49, par. 1, lett. b GDPR) e sul consenso all’invio. Google tratta Analytics a ogni visita e, dopo il caricamento della mappa, i dati della mappa, secondo la propria informativa e, ove applicabile, il Data Privacy Framework UE-USA. Puoi evitare il modulo contattandoci per telefono o email.</p>

        <h2>Conservazione</h2>
        <p>Messaggi del modulo: per il tempo necessario a gestire la richiesta e gli eventuali adempimenti successivi, di regola non oltre 12 mesi dalla chiusura del contatto, salvo esigenze difensive. Codici e totali del contatore: per il funzionamento della statistica pubblica, senza scadenza automatica giornaliera. Log di hosting: secondo le policy di GitHub e Cloudflare. Dati di Analytics: presso Google, secondo la sua informativa, a ogni visita. Dati della mappa: presso Google, secondo la sua informativa, e solo dopo il consenso al caricamento.</p>

        <h2>Diritti</h2>
        <p>Puoi chiedere al titolare:</p>
        <ul>
          <li>accesso ai dati (art. 15 GDPR);</li>
          <li>rettifica (art. 16);</li>
          <li>cancellazione (art. 17);</li>
          <li>limitazione del trattamento (art. 18);</li>
          <li>portabilità, se applicabile (art. 20);</li>
          <li>opposizione al trattamento basato sul legittimo interesse (art. 21);</li>
          <li>revoca del consenso in qualsiasi momento, senza pregiudicare i trattamenti già svolti.</li>
        </ul>
        <p>
          Scrivi a <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          Hai anche il diritto di proporre reclamo al Garante per la protezione dei dati personali
          (Piazza Venezia 11, 00187 Roma · <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer">garanteprivacy.it</a>).
        </p>

        <h2>Modifiche</h2>
        <p>Questa informativa può essere aggiornata. La versione vigente è quella pubblicata su questa pagina, con la data di aggiornamento in testa.</p>

        <h2>Contatti</h2>
        <p>
          {LEGAL_ENTITY.legalName} · {LEGAL_ENTITY.brand} · C.F. {LEGAL_ENTITY.taxId} · {LEGAL_ADDRESS_LINE}
          {" · "}
          <a href={`tel:${CONTACT_PHONE_TEL}`}>{CONTACT_PHONE}</a>
          {" · "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
        <Link className="button primary" href="/?skipIntro=1#contatti">← Torna ai contatti</Link>
      </article>
    </main>
  );
}
