"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

const machines = [
  { id: "pressa-life-fitness", number: "01", name: "Pressa Orizzontale", brand: "Life Fitness", status: "Disponibile", ready: true, image: "/media/new-machines/life-fitness-leg-press.jpg", alt: "Pressa orizzontale Axiom Life Fitness" },
  { id: "leg-curl-extension", number: "02", name: "Leg Curl / Leg Extension", brand: "Panatta", status: "Disponibile", ready: true, image: "/media/new-machines/panatta-dual-leg-extension-curl.webp", alt: "Dual Leg Extension e Seated Leg Curling Panatta 1SCD080" },
  { id: "hack-squat", number: "03", name: "Hack Squat", brand: "Gymleco", status: "Disponibile", ready: false, image: "/media/new-machines/gymleco-hacklift.png", alt: "Hacklift 244 Gymleco" },
  { id: "biceps-curl", number: "04", name: "Biceps Curl", brand: "Star Trac", status: "Disponibile", ready: false, image: "/photos/revenge-gym-06.jpg", alt: "Area allenamento Revenge Gym", illustrative: true },
  { id: "lateral-raise", number: "05", name: "Lateral Raise", brand: "Nautilus", status: "Disponibile", ready: false, image: "/media/new-machines/nautilus-lateral-raise.png", alt: "Nautilus Inspiration Deltoid Raise" },
  { id: "back-row", number: "06", name: "Back Row", brand: "Marca da confermare", status: "Disponibile", ready: false, image: "/media/macchinario-dorso.webp", alt: "Macchinario per il dorso nella sala Revenge Gym", illustrative: true },
  { id: "incline-chest-press", number: "07", name: "Incline Chest Press", brand: "Hoist Fitness", status: "Disponibile", ready: false, image: "/media/new-machines/hoist-incline-chest-press.jpg", alt: "Incline Chest Press RPL-5303 Hoist Fitness" },
  { id: "super-vertical-leg-press", number: "08", name: "Super Vertical Leg Press", brand: "Panatta", status: "In arrivo", ready: false, incoming: true, image: "/photos/revenge-gym-02.jpg", alt: "Sala Revenge Gym pronta ad accogliere la nuova macchina Panatta", illustrative: true },
];

const primaryMuscles = ["Quadricipite femorale", "Grande gluteo", "Bicipite femorale", "Semitendinoso", "Semimembranoso"];
const secondaryMuscles = ["Gastrocnemio e soleo", "Adduttori", "Core", "Muscolatura lombare profonda"];
const purposes = ["Aumentare la forza delle gambe", "Sviluppare massa muscolare", "Migliorare la stabilità degli arti inferiori", "Incrementare la potenza atletica", "Allenarsi in sicurezza anche con carichi importanti"];
const biomechanics = ["Favorire l’estensione dell’anca", "Migliorare la contrazione dei quadricipiti", "Mantenere un movimento naturale", "Ridurre lo stress articolare", "Distribuire il carico lungo l’escursione"];
const advantages = ["Minore compressione diretta sulla colonna", "Maggiore sicurezza quando ci si allena da soli", "Possibilità di gestire carichi elevati", "Nessun problema di equilibrio", "Lavoro mirato sulla muscolatura delle gambe"];
const errors = ["Sollevare il bacino dallo schienale", "Staccare la zona lombare", "Bloccare violentemente le ginocchia", "Usare un carico eccessivo", "Scendere oltre la propria mobilità", "Accelerare o perdere il controllo"];
const footPositions = [
  ["Centrali", "Lavoro equilibrato"], ["Bassi", "Maggiore enfasi sui quadricipiti"], ["Alti", "Maggiore coinvolgimento di glutei e femorali"], ["Larghi", "Più lavoro per gli adduttori"], ["Stretti", "Maggiore enfasi sulla parte esterna del quadricipite"],
];
const panattaBenefits = ["Sviluppo equilibrato di quadricipiti e femorali", "Maggiore controllo del ginocchio", "Incremento di forza e massa muscolare", "Supporto alla preparazione per corsa, ciclismo e sport di squadra", "Movimento stabile e facilmente regolabile"];
const panattaErrors = ["Usare slancio o un carico che altera la postura", "Disallineare il ginocchio rispetto al perno", "Bloccare con violenza le ginocchia in estensione", "Sollevare il bacino durante il curl", "Abbandonare il peso nella fase di ritorno"];

export default function MachineShowcase() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMachine, setActiveMachine] = useState(machines[0].id);

  useEffect(() => {
    const updateActive = () => {
      const current = machines.find((machine) => {
        const element = document.getElementById(machine.id);
        if (!element) return false;
        const box = element.getBoundingClientRect();
        return box.top <= 170 && box.bottom > 170;
      });
      if (current) setActiveMachine(current.id);
    };
    window.addEventListener("scroll", updateActive, { passive: true });
    updateActive();
    return () => window.removeEventListener("scroll", updateActive);
  }, []);

  const goBack = () => {
    if (window.history.length > 1) window.history.back();
    else window.location.href = "/?skipIntro=1#home";
  };

  return <main className={styles.page} id="top">
    <header className={styles.nav}>
      <Link href="/?skipIntro=1#home" className={styles.logo} aria-label="Revenge Gym, torna alla home senza intro"><img src="/brand/revenge-gym-logo.png" alt="Revenge Gym" /></Link>
      <button className={styles.menuToggle} type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Apri menu di navigazione"><i></i><i></i></button>
      <nav className={menuOpen ? styles.open : ""} aria-label="Menu nuove macchine">
        <button className={styles.back} type="button" onClick={goBack}>← Indietro</button>
        <Link className={styles.siteLink} href="/?skipIntro=1#home">Home</Link>
        <Link className={styles.siteLink} href="/?skipIntro=1#filosofia">La palestra</Link>
        <Link className={styles.siteLink} href="/?skipIntro=1#attrezzatura">Attrezzature</Link>
        <Link className={styles.siteLink} href="/?skipIntro=1#magazine">Magazine</Link>
        <span className={styles.navDivider} aria-hidden="true"></span>
        {machines.map((machine) => <a className={activeMachine === machine.id ? styles.active : ""} key={machine.id} href={`#${machine.id}`} onClick={() => setMenuOpen(false)}>{machine.number}</a>)}
        <Link href="/?skipIntro=1#contatti" className={styles.contact}>Contatti ↗</Link>
      </nav>
    </header>

    <section className={styles.hero}>
      <div className={styles.heroMedia}></div><div className={styles.heroShade}></div>
      <div className={styles.heroContent}>
        <p className={styles.eyebrow}><span></span> Nuovi arrivi · Settembre 2025 — oggi</p>
        <h1>PIÙ SCELTA.<br/><em>PIÙ FORZA.</em><br/>PIÙ REVENGE.</h1>
        <p>Otto nuove protagoniste della sala: sette già disponibili e una grande novità Panatta in arrivo.</p>
        <a href="#machine-index" className={styles.primary}>Scopri le macchine <span>↓</span></a>
      </div>
      <div className={styles.heroStats}><div><strong>07</strong><span>Già in sala</span></div><div><strong>01</strong><span>In arrivo</span></div></div>
    </section>

    <section className={styles.index} id="machine-index">
      <div className={styles.sectionIntro}><p className={styles.eyebrow}><span></span> La sala si evolve</p><h2>ULTIME<br/><em>MACCHINE.</em></h2><p>Seleziona una macchina per raggiungere la sua scheda. I contenuti tecnici vengono pubblicati soltanto dopo verifica.</p></div>
      <div className={styles.machineMenu}>
        {machines.map((machine) => <a key={machine.id} href={`#${machine.id}`} className={machine.incoming ? styles.incomingCard : ""}>
          <img src={machine.image} alt="" />
          <span>{machine.number}</span><small>{machine.brand}</small><strong>{machine.name}</strong><i>{machine.status} ↘</i>
        </a>)}
      </div>
    </section>

    <article className={styles.profile} id="pressa-life-fitness">
      <div className={styles.profileHero}>
        <div><span>01 · DISPONIBILE IN SALA</span><small>LIFE FITNESS</small><h2>PRESSA<br/><em>ORIZZONTALE.</em></h2><p>Sicurezza, potenza e massima efficacia per l’allenamento completo degli arti inferiori.</p></div>
        <figure className={styles.productPhoto}><img src="/media/new-machines/life-fitness-leg-press.jpg" alt="Pressa orizzontale Axiom Life Fitness"/><figcaption>Immagine ufficiale Life Fitness · configurazione indicativa</figcaption></figure>
      </div>
      <div className={styles.profileBody}>
        <section className={styles.leadSection}><p>La Pressa Orizzontale Life Fitness è una delle macchine più apprezzate nelle palestre professionali. Il movimento guidato permette di sviluppare forza, massa muscolare e stabilità, limitando il carico diretto sulla colonna rispetto a molti esercizi con bilanciere e lasciando l’atleta libero di concentrarsi sulla spinta.</p><div className={styles.rating}><span>VALUTAZIONE COMPLESSIVA</span><strong>5/5</strong><i>★★★★★</i></div></section>

        <div className={styles.contentGrid}>
          <section><small>01 · MUSCOLI COINVOLTI</small><h3>UNA SPINTA,<br/>TUTTA LA GAMBA.</h3><div className={styles.dualList}><div><b>PRINCIPALI</b>{primaryMuscles.map(item => <p key={item}>{item}</p>)}</div><div><b>SECONDARI</b>{secondaryMuscles.map(item => <p key={item}>{item}</p>)}</div></div></section>
          <section className={styles.darkPanel}><small>02 · A COSA SERVE</small><h3>FORZA CHE<br/>DIVENTA POTENZA.</h3><ul>{purposes.map(item => <li key={item}>{item}</li>)}</ul></section>
        </div>

        <section className={styles.howItWorks}><div><small>03 · COME FUNZIONA</small><h3>TRAIETTORIA GUIDATA.<br/><em>CONTROLLO TOTALE.</em></h3></div><div><p>L’atleta si accomoda sul sedile regolabile mantenendo schiena e bacino aderenti allo schienale. I piedi poggiano sulla pedana; da qui si estendono contemporaneamente ginocchia e anche, tornando poi alla posizione iniziale con un movimento lento e controllato.</p><p>La traiettoria guidata riduce le oscillazioni indesiderate e rende l’esecuzione precisa e fluida, dal principiante all’atleta esperto.</p></div></section>

        <div className={styles.contentGrid}>
          <section className={styles.accentPanel}><small>04 · BIOMECCANICA</small><h3>PROGETTATA<br/>INTORNO AL CORPO.</h3><ul>{biomechanics.map(item => <li key={item}>{item}</li>)}</ul></section>
          <section><small>05 · VANTAGGI</small><h3>UN COMPLEMENTO<br/>ALLO SQUAT.</h3><p>Non sostituisce completamente lo squat libero, ma permette di accumulare lavoro sulle gambe in un contesto stabile e controllato.</p><ul>{advantages.map(item => <li key={item}>{item}</li>)}</ul></section>
        </div>

        <section className={styles.positions}><div><small>06 · POSIZIONE DEI PIEDI</small><h3>CAMBIA L’APPOGGIO.<br/><em>CAMBIA L’ENFASI.</em></h3></div><div className={styles.positionGrid}>{footPositions.map(([title,text], index) => <div key={title}><span>0{index+1}</span><strong>{title}</strong><p>{text}</p></div>)}</div></section>

        <div className={styles.contentGrid}>
          <section><small>07 · POSIZIONE CORRETTA</small><h3>PRIMA LA TECNICA.</h3><ul><li>Schiena e bacino sempre aderenti</li><li>Piedi circa alla larghezza delle spalle</li><li>Punte leggermente aperte</li><li>Ginocchia allineate ai piedi</li><li>Nessun blocco violento delle ginocchia</li></ul></section>
          <section className={styles.errorPanel}><small>08 · ERRORI DA EVITARE</small><h3>CONTROLLO,<br/>NON FRETTA.</h3><ul>{errors.map(item => <li key={item}>{item}</li>)}</ul></section>
        </div>

        <section className={styles.trainer}><div><small>CONSIGLI DEL TRAINER</small><h3>QUALITÀ PRIMA<br/><em>DEL CARICO.</em></h3></div><blockquote>“Esegui il movimento lentamente, evita rimbalzi e aumenta il peso soltanto quando riesci a mantenere schiena, bacino e ginocchia nella posizione corretta.”</blockquote></section>
        <section className={styles.safety}><strong>NOTA DI SICUREZZA</strong><p>Regolazioni, carico e ampiezza del movimento devono essere adattati alla persona. In caso di dolore, infortunio o recupero funzionale, chiedi indicazioni a un professionista qualificato.</p><a href="https://www.lifefitness.com.au/product/axiom-series-leg-press/" target="_blank" rel="noreferrer">Approfondisci sul sito Life Fitness <span>↗</span></a></section>
      </div>
    </article>

    <article className={`${styles.profile} ${styles.panattaProfile}`} id="leg-curl-extension">
      <div className={styles.profileHero}>
        <div><span>02 · DISPONIBILE IN SALA</span><small>PANATTA</small><h2>LEG CURL /<br/><em>LEG EXTENSION.</em></h2><p>Due esercizi fondamentali, un’unica postazione: lavoro completo sulla parte anteriore e posteriore della coscia.</p></div>
        <figure className={styles.productPhoto}><img src="/media/new-machines/panatta-dual-leg-extension-curl.webp" alt="Dual Leg Extension e Seated Leg Curling Panatta 1SCD080"/><figcaption>Panatta 1SCD080 · immagine ufficiale di prodotto</figcaption></figure>
      </div>
      <div className={styles.profileBody}>
        <section className={styles.leadSection}><p>La Dual Leg Extension / Seated Leg Curling Panatta riunisce in una sola macchina l’estensione e la flessione del ginocchio. Permette così di allenare quadricipiti e ischiocrurali con una postazione compatta, regolabile e progettata per accompagnare il movimento in modo naturale.</p><div className={styles.rating}><span>VALUTAZIONE COMPLESSIVA</span><strong>5/5</strong><i>★★★★★</i></div></section>
        <div className={styles.contentGrid}>
          <section><small>01 · DUE ESERCIZI</small><h3>DAVANTI E DIETRO.<br/>STESSO OBIETTIVO.</h3><div className={styles.dualList}><div><b>LEG EXTENSION</b><p>Retto femorale</p><p>Vasto laterale</p><p>Vasto mediale</p><p>Vasto intermedio</p></div><div><b>LEG CURL</b><p>Bicipite femorale</p><p>Semitendinoso</p><p>Semimembranoso</p><p>Gastrocnemio, in assistenza</p></div></div></section>
          <section className={styles.darkPanel}><small>02 · PERCHÉ ABBINARLI</small><h3>EQUILIBRIO<br/>MUSCOLARE.</h3><p>Allenare entrambe le catene contribuisce a costruire cosce complete e a migliorare il controllo dell’articolazione. Non è una garanzia contro dolore o infortuni, ma evita di concentrare tutto il lavoro soltanto sul quadricipite.</p><ul>{panattaBenefits.map(item => <li key={item}>{item}</li>)}</ul></section>
        </div>
        <section className={styles.howItWorks}><div><small>03 · SISTEMA PANATTA</small><h3>CAM E SMART SWITCH.<br/><em>CAMBIO RAPIDO.</em></h3></div><div><p>Il braccio di esercizio ruota per selezionare Leg Extension o Seated Leg Curling. La cam modula la resistenza lungo l’escursione, mentre il contrappeso riduce il peso a vuoto della leva e facilita l’avvio.</p><p>La scheda ufficiale indica schienale regolabile in profondità e inclinazione, rullo superiore regolabile in altezza, rullo di spinta regolabile e scelta dell’angolo iniziale per entrambe le configurazioni.</p></div></section>
        <div className={styles.contentGrid}>
          <section className={styles.accentPanel}><small>04 · REGOLAZIONE</small><h3>ALLINEA.<br/>POI ALLENA.</h3><ul><li>Allinea il ginocchio all’asse di rotazione</li><li>Regola schienale e profondità del sedile</li><li>Posiziona correttamente i rulli</li><li>Scegli un’escursione compatibile con la tua mobilità</li><li>Blocca bene le cosce nella configurazione prevista</li></ul></section>
          <section><small>05 · DATI UFFICIALI</small><h3>COMPATTA E<br/>PROFESSIONALE.</h3><ul><li>Ingombro: 110 × 170 × 180 cm</li><li>Peso macchina: 240 kg</li><li>Pacco pesi standard: 80 kg</li><li>Pacco pesi opzionale: 100 kg</li><li>Incremento graduale disponibile: 2,5 kg</li></ul></section>
        </div>
        <section className={styles.positions}><div><small>06 · ESECUZIONE</small><h3>LENTA NEL RITORNO.<br/><em>PRECISA NELLO SFORZO.</em></h3></div><div className={styles.exerciseSteps}><div><b>LEG EXTENSION</b><p>Estendi le gambe senza slancio e fermati prima di forzare il blocco del ginocchio. Ritorna lentamente mantenendo il busto stabile.</p></div><div><b>LEG CURL</b><p>Fletti le ginocchia mantenendo bacino e busto aderenti. Contrai i femorali, poi accompagna la leva nella fase di ritorno.</p></div><div><b>RESPIRAZIONE</b><p>Espira durante la fase di sforzo e inspira nel ritorno, senza trattenere inutilmente il respiro.</p></div></div></section>
        <div className={styles.contentGrid}>
          <section><small>07 · A CHI È ADATTA</small><h3>VERSATILE PER<br/>OGNI LIVELLO.</h3><p>La traiettoria guidata e le regolazioni la rendono utilizzabile da principianti, sportivi e atleti esperti. Nei percorsi riabilitativi o in presenza di dolore serve sempre la supervisione di personale sanitario qualificato.</p></section>
          <section className={styles.errorPanel}><small>08 · ERRORI DA EVITARE</small><h3>NIENTE SLANCIO.<br/>NIENTE COMPENSI.</h3><ul>{panattaErrors.map(item => <li key={item}>{item}</li>)}</ul></section>
        </div>
        <section className={styles.trainer}><div><small>CONSIGLI DEL TRAINER</small><h3>TECNICA<br/><em>IMPECCABILE.</em></h3></div><blockquote>“Regola la macchina prima di caricarla. Ogni ripetizione deve restare controllata: aumenta il peso soltanto quando allineamento e postura non cambiano.”</blockquote></section>
        <section className={styles.safety}><strong>FONTE E SICUREZZA</strong><p>Carico, assetto ed escursione vanno adattati alla persona. Le caratteristiche tecniche riportate provengono dalla pagina ufficiale del modello Panatta.</p><a href="https://www.panattasport.com/it/sec/dual-leg-extension-seated-leg-curling/" target="_blank" rel="noreferrer">Scheda ufficiale Panatta <span>↗</span></a></section>
      </div>
    </article>

    {machines.slice(2).map((machine) => <section className={`${styles.upcomingProfile} ${machine.incoming ? styles.incomingProfile : ""}`} id={machine.id} key={machine.id}>
      <span>{machine.number}</span><figure><img src={machine.image} alt={machine.alt}/>{machine.illustrative && <figcaption>Immagine provvisoria · foto specifica in aggiornamento</figcaption>}</figure><div><small>{machine.brand} · {machine.status}</small><h2>{machine.name}</h2><p>{machine.incoming ? "Una nuova macchina è in arrivo a Revenge Gym. La scheda tecnica completa sarà pubblicata dopo l’installazione e la verifica della configurazione effettiva." : "La macchina è già nella dotazione di Revenge Gym. La scheda dettagliata sarà inserita non appena il contenuto tecnico sarà verificato."}</p></div><i>{machine.ready ? "Scheda completa" : "Scheda in preparazione"}</i>
    </section>)}

    <section className={styles.cta}><p className={styles.eyebrow}><span></span> Vieni a provarle</p><h2>LEGGERE AIUTA.<br/><em>ALLENARSI CAMBIA TUTTO.</em></h2><p>Scopri dal vivo le nuove macchine e chiedi allo staff come inserirle nel tuo allenamento.</p><Link href="/#contatti" className={styles.primary}>Contatta Revenge Gym <span>↗</span></Link></section>
    <footer className={styles.footer}><Link href="/?skipIntro=1#home"><img src="/brand/revenge-gym-logo.png" alt="Revenge Gym" /></Link><p>Via Berna 8 · Ladispoli</p><a href="#top">Torna su ↑</a></footer>
  </main>;
}
