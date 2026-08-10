"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

const machines = [
  { id: "pressa-life-fitness", number: "01", name: "Pressa Orizzontale", brand: "Life Fitness", status: "Disponibile", ready: true, image: "/media/new-machines/life-fitness-leg-press.webp", alt: "Pressa orizzontale Axiom Life Fitness" },
  { id: "leg-curl-extension", number: "02", name: "Leg Curl / Leg Extension", brand: "Panatta", status: "Disponibile", ready: true, image: "/media/new-machines/panatta-dual-leg-extension-curl.webp", alt: "Dual Leg Extension e Seated Leg Curling Panatta 1SCD080" },
  { id: "hack-squat", number: "03", name: "Hack Squat", brand: "Gymleco", status: "Disponibile", ready: true, image: "/media/new-machines/gymleco-hacklift.webp", alt: "Hacklift 244 Gymleco" },
  { id: "biceps-curl", number: "04", name: "Biceps Curl", brand: "Star Trac", status: "Disponibile", ready: true, image: "/media/new-machines/startrac-impact-biceps-curl.webp", alt: "Star Trac Impact Biceps Curl LA-S5301" },
  { id: "lateral-raise", number: "05", name: "Lateral Raise", brand: "Nautilus", status: "Disponibile", ready: true, image: "/media/new-machines/nautilus-lateral-raise.webp", alt: "Nautilus Inspiration Deltoid Raise IPDR5" },
  { id: "back-row", number: "06", name: "Back Row", brand: "Modello da confermare", status: "Disponibile", ready: true, image: "/media/macchinario-dorso.webp", alt: "Area di allenamento dorsale nella sala Revenge Gym", illustrative: true },
  { id: "incline-chest-press", number: "07", name: "Incline Chest Press", brand: "Hoist Fitness", status: "Disponibile", ready: true, image: "/media/new-machines/hoist-incline-chest-press.webp", alt: "Incline Chest Press ROC-IT RPL-5303 Hoist Fitness" },
  { id: "super-vertical-leg-press", number: "08", name: "Super Vertical Leg Press", brand: "Panatta", status: "In arrivo", ready: true, incoming: true, image: "/media/new-machines/panatta-super-vertical-leg-press.webp", alt: "Super Vertical Leg Press Panatta 1FW093" },
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
const hackPurposes = ["Sviluppare forza e massa negli arti inferiori", "Sovraccaricare lo schema di squat in un contesto guidato", "Concentrare il lavoro su quadricipiti e glutei", "Allenare la spinta senza dover stabilizzare un bilanciere", "Gestire progressioni di carico con una base stabile"];
const hackErrors = ["Staccare schiena o bacino dal supporto", "Far collassare le ginocchia verso l’interno", "Perdere l’appoggio completo del piede", "Rimbalzare nella parte bassa del movimento", "Usare una profondità o un carico non controllabili", "Bloccare violentemente le ginocchia in alto"];
const bicepsPurposes = ["Sviluppare forza nei flessori del gomito", "Aumentare il volume muscolare delle braccia", "Ridurre gli slanci grazie all’appoggio del braccio", "Controllare con precisione la fase eccentrica", "Completare il lavoro dopo trazioni e rematori"];
const bicepsErrors = ["Sollevare i gomiti dal cuscino", "Muovere il busto per avviare la ripetizione", "Stringere le maniglie più del necessario", "Accorciare l’escursione per usare più peso", "Lasciare ricadere il pacco pesi", "Perdere l’allineamento tra gomito e fulcro"];
const lateralPurposes = ["Sviluppare il deltoide laterale", "Aumentare forza e controllo nell’abduzione del braccio", "Allenare un lato alla volta o entrambi insieme", "Ridurre lo slancio grazie alla posizione seduta", "Completare il lavoro dopo esercizi di spinta e tirata"];
const lateralErrors = ["Sollevare le spalle verso le orecchie", "Spingere con mani e avambracci invece che guidare dai gomiti", "Usare un carico che riduce l’escursione controllabile", "Inarcare la schiena o staccare il busto dal supporto", "Lasciare ricadere le leve nella fase di ritorno", "Forzare l’altezza delle braccia oltre il proprio comfort"];
const rowPurposes = ["Sviluppare forza nella trazione orizzontale", "Allenare dorsali, romboidi e trapezio medio", "Migliorare il controllo delle scapole sotto carico", "Completare il lavoro di Lat Machine e trazioni", "Bilanciare nel programma i movimenti di spinta"];
const rowErrors = ["Usare lo slancio del busto per iniziare la trazione", "Sollevare le spalle e irrigidire il collo", "Arrotondare eccessivamente la zona lombare", "Tirare soltanto con mani e avambracci", "Accorciare la corsa per utilizzare più peso", "Abbandonare le leve nella fase di ritorno"];
const hoistPurposes = ["Sviluppare la forza nella spinta inclinata", "Allenare la porzione clavicolare del grande pettorale", "Coinvolgere deltoide anteriore e tricipite", "Lavorare con entrambe le braccia o un lato alla volta", "Progredire con dischi in un movimento guidato"];
const hoistErrors = ["Caricare dischi in modo diverso sui due lati senza intenzione", "Perdere il contatto con schienale e seduta", "Portare i gomiti in una posizione scomoda per le spalle", "Bloccare violentemente i gomiti a fine spinta", "Rimbalzare nella posizione di partenza", "Aggiungere peso prima di controllare il movimento dinamico"];
const verticalPurposes = ["Sviluppare forza nell’estensione di anche e ginocchia", "Aumentare il volume di lavoro per quadricipiti e glutei", "Allenare le gambe lungo una traiettoria guidata", "Variare l’assetto attraverso pedana e schienale regolabili", "Gestire progressioni a dischi con finecorsa di sicurezza"];
const verticalErrors = ["Staccare bacino o schiena dal supporto", "Scendere oltre l’escursione che si riesce a controllare", "Far collassare le ginocchia verso l’interno", "Perdere l’appoggio stabile dell’intero piede", "Rimbalzare nella parte bassa del movimento", "Bloccare violentemente le ginocchia o inseguire il carico massimo"];

export default function MachineShowcase() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMachine, setActiveMachine] = useState(machines[0].id);

  useEffect(() => {
    const updateFromHash = () => {
      const id = window.location.hash.slice(1);
      if (machines.some((machine) => machine.id === id)) setActiveMachine(id);
    };
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
    window.addEventListener("hashchange", updateFromHash);
    updateFromHash();
    updateActive();
    const initialCheck = window.requestAnimationFrame(() => {
      updateFromHash();
      const id = window.location.hash.slice(1);
      if (machines.some((machine) => machine.id === id)) document.getElementById(id)?.scrollIntoView();
    });
    return () => {
      window.cancelAnimationFrame(initialCheck);
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("hashchange", updateFromHash);
    };
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
        <button className={styles.back} type="button" onClick={() => { goBack(); setMenuOpen(false); }}>← Indietro</button>
        <Link className={styles.siteLink} href="/?skipIntro=1#filosofia" onClick={() => setMenuOpen(false)}>La palestra</Link>
        <Link className={styles.siteLink} href="/?skipIntro=1#corsi" onClick={() => setMenuOpen(false)}>Aree</Link>
        <Link className={styles.siteLink} href="/?skipIntro=1#mappa" onClick={() => setMenuOpen(false)}>Mappa</Link>
        <Link className={styles.siteLink} href="/boxe/" onClick={() => setMenuOpen(false)}>Boxe</Link>
        <Link className={styles.siteLink} href="/?skipIntro=1#gallery" onClick={() => setMenuOpen(false)}>Gallery</Link>
        <Link className={styles.siteLink} href="/?skipIntro=1#magazine" onClick={() => setMenuOpen(false)}>Magazine</Link>
        <Link className={styles.siteLink} href="/macchine/gambe" onClick={() => setMenuOpen(false)}>Gambe</Link>
        <span className={styles.navDivider} aria-hidden="true"></span>
        {machines.map((machine) => <a className={activeMachine === machine.id ? styles.active : ""} key={machine.id} href={`#${machine.id}`} onClick={() => { setActiveMachine(machine.id); setMenuOpen(false); }}>{machine.number}</a>)}
        <Link href="/?skipIntro=1#contatti" className={styles.contact} onClick={() => setMenuOpen(false)}>Chiedi info <span>↗</span></Link>
      </nav>
    </header>

    <section className={styles.hero}>
      <div className={styles.heroMedia}></div><div className={styles.heroShade}></div>
      <div className={styles.heroContent}>
        <p className={styles.eyebrow}><span></span> Nuovi arrivi · Settembre 2025</p>
        <h1>PIÙ SCELTA.<br/><em>PIÙ FORZA.</em><br/>PIÙ <em>REVENGE.</em></h1>
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
        <figure className={styles.productPhoto}><img src="/media/new-machines/life-fitness-leg-press.webp" alt="Pressa orizzontale Axiom Life Fitness"/><figcaption>Immagine ufficiale Life Fitness · configurazione indicativa</figcaption></figure>
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

    <article className={`${styles.profile} ${styles.panattaProfile}`} id="hack-squat">
      <div className={styles.profileHero}>
        <div><span>03 · DISPONIBILE IN SALA</span><small>GYMLECO · MODELLO 244</small><h2>HACK<br/><em>SQUAT.</em></h2><p>Una traiettoria guidata e una struttura compatta per costruire gambe forti con stabilità e controllo.</p></div>
        <figure className={styles.productPhoto}><img src="/media/new-machines/gymleco-hacklift.webp" alt="Hacklift 244 Gymleco, macchina professionale per hack squat"/><figcaption>Gymleco 244 Hacklift · fotografia ufficiale del modello</figcaption></figure>
      </div>
      <div className={styles.profileBody}>
        <section className={styles.leadSection}><p>La Gymleco 244 Hacklift, chiamata anche Hack Squat dal produttore, guida il corpo lungo una traiettoria inclinata mentre schiena, testa e spalle restano sostenute. La struttura aperta e la grande pedana regolabile permettono di concentrarsi sulla spinta di gambe e anche, modulando posizione dei piedi e profondità in base alla propria mobilità.</p><div className={styles.rating}><span>VALUTAZIONE COMPLESSIVA</span><strong>5/5</strong><i>★★★★★</i></div></section>

        <div className={styles.contentGrid}>
          <section><small>01 · MUSCOLI COINVOLTI</small><h3>SPINTA SOLIDA.<br/>GAMBE COMPLETE.</h3><div className={styles.dualList}><div><b>PRINCIPALI</b><p>Quadricipite femorale</p><p>Grande gluteo</p></div><div><b>IN ASSISTENZA</b><p>Ischiocrurali</p><p>Adduttori</p><p>Gastrocnemio e soleo</p><p>Muscolatura del tronco</p></div></div></section>
          <section className={styles.darkPanel}><small>02 · A COSA SERVE</small><h3>FORZA CHE<br/>RESTA GUIDATA.</h3><ul>{hackPurposes.map(item => <li key={item}>{item}</li>)}</ul></section>
        </div>

        <section className={styles.howItWorks}><div><small>03 · COME FUNZIONA</small><h3>APPOGGIA. SBLOCCA.<br/><em>SPINGI.</em></h3></div><div><p>Posiziona schiena e testa sui supporti, porta le spalle sotto le imbottiture e sistema entrambi i piedi sulla pedana. Dopo aver liberato i fermi, scendi flettendo insieme anche e ginocchia senza perdere il contatto con lo schienale.</p><p>Inverti il movimento spingendo attraverso l’intero piede. In alto conserva una leggera flessione controllata, poi riaggancia i fermi prima di uscire dalla macchina.</p></div></section>

        <div className={styles.contentGrid}>
          <section className={styles.accentPanel}><small>04 · PROGETTO GYMLECO</small><h3>COMPATTA.<br/>ROBUSTA. FLUIDA.</h3><ul><li>Struttura aperta e ingombro contenuto</li><li>Grande pedana gommata e regolabile</li><li>Appoggi per spalle e testa</li><li>Carrello solido su traiettoria inclinata</li><li>Caricamento libero con dischi</li></ul></section>
          <section><small>05 · DATI UFFICIALI</small><h3>MODELLO<br/>244 HACKLIFT.</h3><ul><li>Ingombro: 195 × 80 × 145 cm</li><li>Peso macchina: 137,5 kg</li><li>Peso del carrello: circa 47,5 kg</li><li>Inclinazione del carrello: 45°</li><li>Carico percepito a vuoto dichiarato: circa 33,5 kg</li></ul></section>
        </div>

        <section className={styles.positions}><div><small>06 · POSIZIONE DEI PIEDI</small><h3>CAMBIA L’APPOGGIO.<br/><em>MODULA IL LAVORO.</em></h3></div><div className={styles.positionGrid}>{footPositions.map(([title,text], index) => <div key={title}><span>0{index+1}</span><strong>{title}</strong><p>{text}</p></div>)}</div><p className={styles.positionNote}>Le variazioni di appoggio cambiano soprattutto angoli articolari, comfort e contributo relativo dei muscoli: non isolano completamente una singola porzione della coscia. Scegli sempre una posizione che mantenga piede stabile e ginocchio ben controllato.</p></section>

        <div className={styles.contentGrid}>
          <section><small>07 · HACK SQUAT O SQUAT LIBERO?</small><h3>DUE STRUMENTI.<br/>NON DUE RIVALI.</h3><p>Lo squat con bilanciere richiede maggiore stabilizzazione e gestione libera della traiettoria. L’Hack Squat offre invece appoggi e percorso guidato: facilita il lavoro vicino alla fatica, ma non rende automaticamente sicuri carichi o profondità eccessivi.</p><ul><li>Più stabilità esterna durante la serie</li><li>Meno richiesta di equilibrio</li><li>Progressione semplice da misurare</li><li>Ottimo complemento, non sostituto obbligato</li></ul></section>
          <section className={styles.errorPanel}><small>08 · ERRORI DA EVITARE</small><h3>CONTROLLO<br/>FINO IN FONDO.</h3><ul>{hackErrors.map(item => <li key={item}>{item}</li>)}</ul></section>
        </div>

        <section className={styles.trainer}><div><small>CONSIGLI DEL TRAINER</small><h3>PROFONDITÀ<br/><em>GUADAGNATA.</em></h3></div><blockquote>“Riscalda anche e ginocchia, scegli un appoggio stabile e scendi soltanto fin dove mantieni schiena, piedi e ginocchia sotto controllo. Il carico viene dopo.”</blockquote></section>
        <section className={styles.safety}><strong>FONTE E SICUREZZA</strong><p>I dati costruttivi provengono dalla scheda Gymleco del modello 244. Regola pedana, carico e profondità sulle tue caratteristiche; in presenza di dolore chiedi una valutazione qualificata.</p><a href="https://gymleco.com/products/244-hacklift" target="_blank" rel="noreferrer">Scheda ufficiale Gymleco <span>↗</span></a></section>
      </div>
    </article>

    <article className={`${styles.profile} ${styles.panattaProfile}`} id="biceps-curl">
      <div className={styles.profileHero}>
        <div><span>04 · DISPONIBILE IN SALA</span><small>STAR TRAC · IMPACT STRENGTH</small><h2>BICEPS<br/><em>CURL.</em></h2><p>Appoggio stabile, movimento guidato e controllo continuo per un lavoro preciso sui flessori del gomito.</p></div>
        <figure className={styles.productPhoto}><img src="/media/new-machines/startrac-impact-biceps-curl.webp" alt="Star Trac Impact Biceps Curl LA-S5301"/><figcaption>Star Trac Impact LA-S5301 · immagine dal catalogo del modello</figcaption></figure>
      </div>
      <div className={styles.profileBody}>
        <section className={styles.leadSection}><p>La Star Trac Impact Biceps Curl LA-S5301 è una macchina selectorized dedicata alla flessione del gomito. Sedile regolabile, appoggio per le braccia e movimento bilaterale o unilaterale aiutano a limitare le compensazioni e a concentrare l’attenzione sulla qualità di ogni ripetizione.</p><div className={styles.rating}><span>VALUTAZIONE COMPLESSIVA</span><strong>5/5</strong><i>★★★★★</i></div></section>

        <div className={styles.contentGrid}>
          <section><small>01 · MUSCOLI COINVOLTI</small><h3>UN GESTO.<br/>PIÙ FLESSORI.</h3><div className={styles.dualList}><div><b>PRINCIPALI</b><p>Bicipite brachiale</p><p>Brachiale</p></div><div><b>IN ASSISTENZA</b><p>Brachioradiale</p><p>Flessori dell’avambraccio</p><p>Muscoli della presa</p><p>Deltoide anteriore, in stabilizzazione</p></div></div></section>
          <section className={styles.darkPanel}><small>02 · A COSA SERVE</small><h3>PIÙ CONTROLLO.<br/>MENO SLANCIO.</h3><ul>{bicepsPurposes.map(item => <li key={item}>{item}</li>)}</ul></section>
        </div>

        <section className={styles.howItWorks}><div><small>03 · COME FUNZIONA</small><h3>GOMITI STABILI.<br/><em>CURVA PULITA.</em></h3></div><div><p>Regola il sedile finché la parte superiore delle braccia poggia comodamente sul cuscino e i gomiti risultano coerenti con l’asse della macchina. Afferra le maniglie senza irrigidire polsi e spalle.</p><p>Fletti i gomiti senza sollevarli, raggiungi la chiusura controllabile e ritorna lentamente. Le leve consentono di lavorare con entrambe le braccia o concentrarsi su un lato alla volta.</p></div></section>

        <div className={styles.contentGrid}>
          <section className={styles.accentPanel}><small>04 · IMPACT STRENGTH</small><h3>SEMPLICE DA<br/>REGOLARE.</h3><ul><li>Sedile con regolazione a scatti</li><li>Impugnature ergonomiche</li><li>Movimento unilaterale o bilaterale</li><li>Selezione del carico Lock N Load</li><li>Incrementi fini da 5 lb</li></ul></section>
          <section><small>05 · DATI DEL MODELLO</small><h3>LA-S5301<br/>BICEPS CURL.</h3><ul><li>Ingombro: circa 117 × 119 × 152 cm</li><li>Pacco pesi: circa 91 kg</li><li>Peso di spedizione dichiarato: circa 209 kg</li><li>Linea: Star Trac Impact Strength</li><li>Tipologia: macchina a carico selezionabile</li></ul></section>
        </div>

        <section className={styles.positions}><div><small>06 · ESECUZIONE</small><h3>SALI CON INTENZIONE.<br/><em>SCENDI CON CONTROLLO.</em></h3></div><div className={styles.exerciseSteps}><div><b>PREPARAZIONE</b><p>Regola sedile e carico, appoggia bene le braccia e mantieni piedi, bacino e busto stabili.</p></div><div><b>FASE DI SALITA</b><p>Espira mentre fletti i gomiti. Evita di portare le spalle in avanti o di staccare i gomiti dal supporto.</p></div><div><b>FASE DI RITORNO</b><p>Inspira e accompagna lentamente le leve fino a recuperare una posizione distesa ma ancora controllata.</p></div></div></section>

        <div className={styles.contentGrid}>
          <section><small>07 · MACCHINA O MANUBRI?</small><h3>STRUMENTI<br/>COMPLEMENTARI.</h3><p>Manubri e bilancieri richiedono libertà di traiettoria e maggiore stabilizzazione. La macchina offre invece appoggi e resistenza guidata: è utile per accumulare lavoro mirato, ma non “isola completamente” il bicipite e non sostituisce ogni altra variante.</p><ul><li>Ottima dopo trazioni o rematori</li><li>Utile nelle superserie braccia</li><li>Adatta a progressioni facilmente misurabili</li><li>Valida sia all’inizio sia a fine seduta</li></ul></section>
          <section className={styles.errorPanel}><small>08 · ERRORI DA EVITARE</small><h3>IL PESO NON<br/>DEVE COMANDARE.</h3><ul>{bicepsErrors.map(item => <li key={item}>{item}</li>)}</ul></section>
        </div>

        <section className={styles.trainer}><div><small>CONSIGLI DEL TRAINER</small><h3>TENSIONE<br/><em>FINO ALL’ULTIMO.</em></h3></div><blockquote>“Scegli un carico che non sposti gomiti, spalle o busto. La parte più utile della ripetizione è spesso il ritorno lento, non la salita ottenuta con slancio.”</blockquote></section>
        <section className={styles.safety}><strong>FONTE E SICUREZZA</strong><p>Serie e codice sono riferiti alla Star Trac Impact LA-S5301 documentata nel catalogo. Interrompi l’esercizio in caso di dolore a gomito, polso o spalla e chiedi assistenza allo staff.</p><a href="https://img.athleticbusiness.com/files/base/abmedia/all/document/2013/12/ab.startrac-catalog4.pdf" target="_blank" rel="noreferrer">Catalogo Star Trac Impact <span>↗</span></a></section>
      </div>
    </article>

    <article className={`${styles.profile} ${styles.panattaProfile}`} id="lateral-raise">
      <div className={styles.profileHero}>
        <div><span>05 · DISPONIBILE IN SALA</span><small>NAUTILUS · INSPIRATION IPDR5</small><h2>LATERAL<br/><em>RAISE.</em></h2><p>Movimento guidato, assetto regolabile e lavoro unilaterale per costruire spalle forti con precisione.</p></div>
        <figure className={styles.productPhoto}><img src="/media/new-machines/nautilus-lateral-raise.webp" alt="Nautilus Inspiration Deltoid Raise IPDR5"/><figcaption>Nautilus Inspiration IPDR5 · immagine ufficiale del modello</figcaption></figure>
      </div>
      <div className={styles.profileBody}>
        <section className={styles.leadSection}><p>La Nautilus Inspiration Deltoid Raise IPDR5 è una macchina selectorized progettata per allenare soprattutto il deltoide laterale, con il contributo del deltoide anteriore. La seduta, il sostegno del busto e i bracci indipendenti creano una postazione stabile, aiutando l’atleta a concentrarsi sulla traiettoria e sul controllo di ogni ripetizione.</p><div className={styles.rating}><span>VALUTAZIONE COMPLESSIVA</span><strong>5/5</strong><i>★★★★★</i></div></section>

        <div className={styles.contentGrid}>
          <section><small>01 · MUSCOLI COINVOLTI</small><h3>LARGHEZZA E<br/>CONTROLLO.</h3><div className={styles.dualList}><div><b>PRINCIPALI</b><p>Deltoide laterale</p><p>Deltoide anteriore</p></div><div><b>IN ASSISTENZA</b><p>Sovraspinato</p><p>Trapezio superiore</p><p>Muscoli della cuffia dei rotatori</p><p>Core e stabilizzatori scapolari</p></div></div></section>
          <section className={styles.darkPanel}><small>02 · A COSA SERVE</small><h3>SPALLE FORTI.<br/>GESTO PRECISO.</h3><ul>{lateralPurposes.map(item => <li key={item}>{item}</li>)}</ul></section>
        </div>

        <section className={styles.howItWorks}><div><small>03 · COME FUNZIONA</small><h3>GUIDA DAI GOMITI.<br/><em>CONTROLLA IL RITORNO.</em></h3></div><div><p>Regola il sedile e il cuscino di stabilizzazione del busto, poi appoggia gli avambracci sui rulli mantenendo le spalle rilassate. Le impugnature servono a stabilizzare la posizione, non a tirare la leva con le mani.</p><p>Solleva lateralmente i gomiti entro un’ampiezza confortevole, fermati brevemente e accompagna il ritorno senza lasciare cadere il pacco pesi. I bracci indipendenti consentono un’esecuzione bilaterale o unilaterale.</p></div></section>

        <div className={styles.contentGrid}>
          <section className={styles.accentPanel}><small>04 · PROGETTO NAUTILUS</small><h3>REGOLABILE.<br/>INTUITIVA.</h3><ul><li>Movimento unilaterale indipendente</li><li>Supporti flottanti per il posizionamento delle braccia</li><li>Cuscino di stabilizzazione del busto regolabile</li><li>Asse di rotazione evidenziato per facilitare l’allineamento</li><li>Sedile ergonomico assistito a gas</li><li>Selezione del carico Lock N Load</li></ul></section>
          <section><small>05 · DATI UFFICIALI</small><h3>MODELLO<br/>IPDR5.</h3><ul><li>Ingombro: 132 × 119 × 163 cm</li><li>Pacco pesi: 91 kg</li><li>Peso complessivo: 280 kg</li><li>Peso di spedizione: 311 kg</li><li>Incrementi fini del carico: 5 lb</li></ul></section>
        </div>

        <section className={styles.positions}><div><small>06 · ESECUZIONE</small><h3>STABILE NEL BUSTO.<br/><em>FLUIDA NELLE BRACCIA.</em></h3></div><div className={styles.exerciseSteps}><div><b>PREPARAZIONE</b><p>Regola sedile, sostegno del busto e carico. Mantieni piedi stabili e allinea le spalle con il movimento delle leve.</p></div><div><b>FASE DI SALITA</b><p>Espira e porta i gomiti verso l’esterno senza alzare le spalle. Fermati prima che postura o comfort peggiorino.</p></div><div><b>FASE DI RITORNO</b><p>Inspira e accompagna lentamente le leve. Mantieni tensione e non far urtare il pacco pesi tra le ripetizioni.</p></div></div></section>

        <div className={styles.contentGrid}>
          <section><small>07 · MACCHINA O MANUBRI?</small><h3>DUE MODI DI<br/>ALLENARE LE SPALLE.</h3><p>Le alzate con manubri lasciano libera la traiettoria e richiedono più stabilizzazione. La Nautilus offre invece sostegni e resistenza guidata, rendendo più semplice ripetere il gesto e misurare la progressione. Nessuna variante è universalmente superiore: possono convivere nello stesso programma.</p><ul><li>Utile come esercizio specifico per le spalle</li><li>Adatta al lavoro unilaterale</li><li>Facile da inserire in superserie</li><li>Efficace anche con carichi moderati e controllati</li></ul></section>
          <section className={styles.errorPanel}><small>08 · ERRORI DA EVITARE</small><h3>NON LASCIARE<br/>CHE COMANDI IL PESO.</h3><ul>{lateralErrors.map(item => <li key={item}>{item}</li>)}</ul></section>
        </div>

        <section className={styles.trainer}><div><small>CONSIGLI DEL TRAINER</small><h3>GOMITI GUIDA.<br/><em>TRAPEZIO CALMO.</em></h3></div><blockquote>“Scegli un carico che ti permetta di sentire il deltoide senza stringere il collo. Guida il movimento dai gomiti e rendi la discesa lenta quanto la salita.”</blockquote></section>
        <section className={styles.safety}><strong>FONTE E SICUREZZA</strong><p>Modello e caratteristiche tecniche sono verificati sulla pagina ufficiale Nautilus/Core Health &amp; Fitness. Assetto, carico e ampiezza devono rispettare mobilità e comfort individuali; in caso di dolore alla spalla, interrompi l’esercizio e chiedi assistenza qualificata.</p><a href="https://shop.corehandf.com/products/nautilus-inspiration-deltoid-raise" target="_blank" rel="noreferrer">Scheda ufficiale Nautilus <span>↗</span></a></section>
      </div>
    </article>

    <article className={`${styles.profile} ${styles.panattaProfile}`} id="back-row">
      <div className={styles.profileHero}>
        <div><span>06 · DISPONIBILE IN SALA</span><small>BACK ROW · MODELLO IN VERIFICA</small><h2>BACK<br/><em>ROW.</em></h2><p>Trazione orizzontale guidata per allenare la schiena con stabilità, controllo e intenzione.</p></div>
        <figure className={`${styles.productPhoto} ${styles.illustrativePhoto}`}><img src="/media/macchinario-dorso.webp" alt="Area di allenamento dorsale nella sala Revenge Gym"/><figcaption>Foto della sala · immagine specifica della Back Row in aggiornamento</figcaption></figure>
      </div>
      <div className={styles.profileBody}>
        <section className={styles.leadSection}><p>La Back Row riproduce il gesto del rematore attraverso una trazione orizzontale guidata. A seconda della configurazione può offrire un appoggio toracico, leve indipendenti e più impugnature: elementi che aiutano a stabilizzare il busto e a concentrare il lavoro sulla muscolatura della schiena senza trasformare ogni ripetizione in uno slancio.</p><div className={styles.rating}><span>VALUTAZIONE COMPLESSIVA</span><strong>5/5</strong><i>★★★★★</i></div></section>

        <div className={styles.contentGrid}>
          <section><small>01 · MUSCOLI COINVOLTI</small><h3>DAL DORSALE<br/>ALLE SCAPOLE.</h3><div className={styles.dualList}><div><b>PRINCIPALI</b><p>Grande dorsale</p><p>Romboidi</p><p>Trapezio medio e inferiore</p></div><div><b>IN ASSISTENZA</b><p>Deltoide posteriore</p><p>Grande rotondo</p><p>Bicipite e brachiale</p><p>Brachioradiale</p><p>Core e stabilizzatori del tronco</p></div></div></section>
          <section className={styles.darkPanel}><small>02 · A COSA SERVE</small><h3>FORZA CHE<br/>TIRA VERSO DI TE.</h3><ul>{rowPurposes.map(item => <li key={item}>{item}</li>)}</ul></section>
        </div>

        <section className={styles.howItWorks}><div><small>03 · COME FUNZIONA</small><h3>PETTO STABILE.<br/><em>GOMITI INDIETRO.</em></h3></div><div><p>Regola il sedile affinché le maniglie risultino coerenti con la traiettoria desiderata e, se presente, sistema il supporto toracico a contatto leggero con il petto. Mantieni piedi stabili, polsi neutri e colonna in posizione naturale.</p><p>Inizia la trazione portando i gomiti indietro senza alzare le spalle. Avvicina le scapole entro un movimento controllabile, fai una breve pausa e torna lentamente fino a distendere le braccia senza perdere l’assetto del busto.</p></div></section>

        <div className={styles.contentGrid}>
          <section className={styles.accentPanel}><small>04 · BIOMECCANICA</small><h3>TRAZIONE<br/>ORIZZONTALE.</h3><ul><li>Estensione della spalla durante la tirata</li><li>Flessione del gomito con bicipite e brachiale in assistenza</li><li>Retrazione controllata delle scapole</li><li>Ritorno eccentrico lento e continuo</li><li>Busto stabile per limitare compensazioni</li></ul></section>
          <section><small>05 · CONFIGURAZIONE</small><h3>IL MODELLO<br/>FA LA DIFFERENZA.</h3><p>Le Back Row professionali non sono tutte uguali. Marca e modello della macchina Revenge Gym devono ancora essere confermati; per questo non attribuiamo dati costruttivi non verificati.</p><ul><li>Carico selezionabile o a dischi</li><li>Leve unite oppure indipendenti</li><li>Una o più prese disponibili</li><li>Supporto toracico fisso o regolabile</li><li>Traiettoria convergente o lineare</li></ul></section>
        </div>

        <section className={styles.positions}><div><small>06 · IMPUGNATURE</small><h3>CAMBIA LA PRESA.<br/><em>CAMBIA L’ASSETTO.</em></h3></div><div className={styles.exerciseSteps}><div><b>PRESA NEUTRA</b><p>Palmi rivolti uno verso l’altro e gomiti vicini al busto: una posizione spesso confortevole per una trazione completa.</p></div><div><b>PRESA PRONA</b><p>Palmi verso il basso e gomiti più aperti possono aumentare l’enfasi relativa sulla parte alta della schiena e sul deltoide posteriore.</p></div><div><b>PRESA SUPINA</b><p>Palmi verso l’alto aumentano il contributo dei flessori del gomito. Usala soltanto se polsi e spalle restano comodi.</p></div></div><p className={styles.positionNote}>Le differenze dipendono anche da larghezza, altezza delle maniglie e traiettoria del modello. Nessuna presa isola completamente un singolo muscolo.</p></section>

        <div className={styles.contentGrid}>
          <section><small>07 · BACK ROW O LAT MACHINE?</small><h3>DUE DIREZIONI.<br/>UNA SCHIENA COMPLETA.</h3><p>La Back Row sviluppa la trazione orizzontale; Lat Machine e trazioni lavorano invece lungo una direzione prevalentemente verticale. Sono schemi complementari e possono essere inseriti nella stessa seduta o distribuiti nella settimana.</p><ul><li>Back Row per la tirata verso il busto</li><li>Lat Machine per la tirata dall’alto</li><li>Progressioni di carico facili da misurare</li><li>Volume da adattare al resto del programma</li></ul></section>
          <section className={styles.errorPanel}><small>08 · ERRORI DA EVITARE</small><h3>TIRA CON IL DORSO.<br/>NON CON LO SLANCIO.</h3><ul>{rowErrors.map(item => <li key={item}>{item}</li>)}</ul></section>
        </div>

        <section className={styles.trainer}><div><small>CONSIGLI DEL TRAINER</small><h3>GOMITI INDIETRO.<br/><em>RITORNO LENTO.</em></h3></div><blockquote>“Apri il petto senza inarcare la schiena, guida la tirata dai gomiti e lascia che le braccia si distendano di nuovo senza perdere il controllo delle scapole.”</blockquote></section>
        <section className={styles.safety}><strong>TECNICA E SICUREZZA</strong><p>La scheda descrive il movimento della Back Row; marca, modello e dati tecnici della macchina saranno aggiunti dopo verifica. Regola carico ed escursione sulle tue capacità e interrompi l’esercizio in caso di dolore.</p><a href="https://www.acefitness.org/resources/everyone/exercise-library/168/seated-row/" target="_blank" rel="noreferrer">Tecnica Seated Row · ACE <span>↗</span></a></section>
      </div>
    </article>

    <article className={`${styles.profile} ${styles.panattaProfile}`} id="incline-chest-press">
      <div className={styles.profileHero}>
        <div><span>07 · DISPONIBILE IN SALA</span><small>HOIST FITNESS · ROC-IT RPL-5303</small><h2>INCLINE<br/><em>CHEST PRESS.</em></h2><p>Una spinta inclinata dinamica, convergente e caricata a dischi per allenare il torace superiore.</p></div>
        <figure className={styles.productPhoto}><img src="/media/new-machines/hoist-incline-chest-press.webp" alt="Incline Chest Press ROC-IT RPL-5303 Hoist Fitness"/><figcaption>Hoist ROC-IT RPL-5303 · immagine ufficiale del modello</figcaption></figure>
      </div>
      <div className={styles.profileBody}>
        <section className={styles.leadSection}><p>La Hoist ROC-IT RPL-5303 è una Incline Chest Press professionale a dischi. Durante la spinta la seduta oscilla all’indietro, mantenendo l’utilizzatore allineato con i bracci di pressione e riproducendo la posizione inclinata. Le leve indipendenti e convergenti permettono un lavoro bilaterale o unilaterale con una traiettoria guidata.</p><div className={styles.rating}><span>VALUTAZIONE COMPLESSIVA</span><strong>5/5</strong><i>★★★★★</i></div></section>

        <div className={styles.contentGrid}>
          <section><small>01 · MUSCOLI COINVOLTI</small><h3>SPINTA ALTA.<br/>TORACE COMPLETO.</h3><div className={styles.dualList}><div><b>PRINCIPALI</b><p>Grande pettorale, porzione clavicolare</p><p>Grande pettorale, porzione sternale</p></div><div><b>IN ASSISTENZA</b><p>Deltoide anteriore</p><p>Tricipite brachiale</p><p>Dentato anteriore</p><p>Muscoli stabilizzatori della spalla</p></div></div></section>
          <section className={styles.darkPanel}><small>02 · A COSA SERVE</small><h3>FORZA LUNGO<br/>UNA NUOVA LINEA.</h3><ul>{hoistPurposes.map(item => <li key={item}>{item}</li>)}</ul></section>
        </div>

        <section className={styles.howItWorks}><div><small>03 · TECNOLOGIA ROC-IT</small><h3>SPINGI AVANTI.<br/><em>IL CORPO ARRETRA.</em></h3></div><div><p>All’inizio le maniglie si trovano circa all’altezza del petto. Durante la spinta il sistema ROC-IT accompagna la seduta all’indietro, modificando dinamicamente l’assetto del corpo mentre i bracci convergono.</p><p>Hoist progetta questo movimento per mantenere una postura stabile e confortevole lungo la corsa. I bracci controbilanciati riducono il peso iniziale percepito e facilitano un avvio controllato anche prima di aggiungere molti dischi.</p></div></section>

        <div className={styles.contentGrid}>
          <section className={styles.accentPanel}><small>04 · PROGETTO HOIST</small><h3>DINAMICA.<br/>INDIPENDENTE.</h3><ul><li>Tecnologia dinamica ROC-IT</li><li>Bracci di spinta indipendenti e convergenti</li><li>Leve controbilanciate per una partenza più leggera</li><li>Impugnature sagomate con più posizioni</li><li>Caricamento con dischi</li><li>Alloggiamenti integrati per riporre i pesi</li></ul></section>
          <section><small>05 · DATI UFFICIALI</small><h3>MODELLO<br/>RPL-5303.</h3><ul><li>Ingombro: 230 × 133 × 183 cm</li><li>Peso macchina: 193 kg</li><li>Capacità massima di esercizio: 204 kg</li><li>Capacità massima di stoccaggio: 327 kg</li><li>Capacità massima complessiva: 363 kg</li></ul></section>
        </div>

        <section className={styles.positions}><div><small>06 · ESECUZIONE</small><h3>PETTO APERTO.<br/><em>SPINTA CONTROLLATA.</em></h3></div><div className={styles.exerciseSteps}><div><b>PREPARAZIONE</b><p>Carica i due lati in modo equilibrato, regola la seduta e scegli la presa che consente a polsi, gomiti e spalle di restare comodi.</p></div><div><b>FASE DI SPINTA</b><p>Espira e spingi senza staccarti dagli appoggi. Segui il movimento della seduta e termina senza bloccare violentemente i gomiti.</p></div><div><b>FASE DI RITORNO</b><p>Inspira e accompagna lentamente le leve. Fermati nella profondità in cui mantieni controllo e comfort della spalla.</p></div></div></section>

        <div className={styles.contentGrid}>
          <section><small>07 · MACCHINA O PANCA INCLINATA?</small><h3>GUIDATA O LIBERA.<br/>ENTRAMBE UTILI.</h3><p>Manubri e bilanciere richiedono stabilizzazione e gestione libera della traiettoria. La Hoist guida il movimento e consente di lavorare senza dover portare i pesi in posizione. Questo non rende una variante superiore in assoluto: sono strumenti complementari.</p><ul><li>Utile come primo esercizio o dopo la panca</li><li>Adatta a progressioni con piccoli incrementi di dischi</li><li>Possibile lavoro unilaterale</li><li>Ottima in abbinamento a una Back Row</li></ul></section>
          <section className={styles.errorPanel}><small>08 · ERRORI DA EVITARE</small><h3>SEGUI LA MACCHINA.<br/>NON COMBATTERLA.</h3><ul>{hoistErrors.map(item => <li key={item}>{item}</li>)}</ul></section>
        </div>

        <section className={styles.trainer}><div><small>CONSIGLI DEL TRAINER</small><h3>PRIMA IL RITMO.<br/><em>POI I DISCHI.</em></h3></div><blockquote>“Impara prima il movimento della seduta con poco carico. Mantieni petto aperto, polsi neutri e una discesa lenta: aggiungi dischi soltanto quando la traiettoria resta fluida.”</blockquote></section>
        <section className={styles.safety}><strong>FONTE E SICUREZZA</strong><p>Modello, caratteristiche e capacità sono verificati sulla scheda ufficiale Hoist. I limiti dichiarati non sono un obiettivo di allenamento: carico, presa ed escursione devono essere adattati alla persona.</p><a href="https://www.hoistfitness.com/products/rpl-5303-incline-chest-press" target="_blank" rel="noreferrer">Scheda ufficiale Hoist <span>↗</span></a></section>
      </div>
    </article>

    <article className={`${styles.profile} ${styles.panattaProfile}`} id="super-vertical-leg-press">
      <div className={styles.profileHero}>
        <div><span>08 · IN ARRIVO A REVENGE GYM</span><small>PANATTA · FREEWEIGHT SPECIAL 1FW093</small><h2>SUPER VERTICAL<br/><em>LEG PRESS.</em></h2><p>La nuova protagonista dell’area gambe è in arrivo: traiettoria guidata, regolazioni evolute e caricamento a dischi.</p></div>
        <figure className={styles.productPhoto}><img src="/media/new-machines/panatta-super-vertical-leg-press.webp" alt="Super Vertical Leg Press Panatta 1FW093"/><figcaption>Panatta 1FW093 · immagine del modello · macchina in arrivo</figcaption></figure>
      </div>
      <div className={styles.profileBody}>
        <section className={styles.leadSection}><p>La Panatta Super Vertical Leg Press 1FW093 entrerà prossimamente nella dotazione di Revenge Gym. È una pressa professionale a dischi nella quale l’atleta spinge il carrello lungo una traiettoria quasi verticale, con schienale, pedana e finecorsa regolabili. La scheda descrive il modello ufficiale; configurazione e optional presenti in palestra saranno confermati dopo l’installazione.</p><div className={styles.rating}><span>VALUTAZIONE TECNICA</span><strong>5/5</strong><i>★★★★★</i></div></section>

        <div className={styles.contentGrid}>
          <section><small>01 · MUSCOLI COINVOLTI</small><h3>SPINTA VERTICALE.<br/>GAMBE COMPLETE.</h3><div className={styles.dualList}><div><b>PRINCIPALI</b><p>Quadricipite femorale</p><p>Grande gluteo</p></div><div><b>IN ASSISTENZA</b><p>Ischiocrurali</p><p>Adduttori</p><p>Gastrocnemio e soleo</p><p>Muscoli stabilizzatori del tronco</p></div></div></section>
          <section className={styles.darkPanel}><small>02 · A COSA SERVE</small><h3>FORZA CHE<br/>SALE IN VERTICALE.</h3><ul>{verticalPurposes.map(item => <li key={item}>{item}</li>)}</ul></section>
        </div>

        <section className={styles.howItWorks}><div><small>03 · COME FUNZIONA</small><h3>REGOLA. SBLOCCA.<br/><em>SPINGI.</em></h3></div><div><p>Dopo aver scelto inclinazione dello schienale, assetto della pedana e altezza dei finecorsa, l’atleta si posiziona mantenendo bacino e schiena aderenti al supporto. La leva di sicurezza facilita lo sblocco iniziale del carrello.</p><p>La discesa deve fermarsi prima che bacino, piedi o ginocchia perdano posizione. Da lì si spinge attraverso l’intero piede, tornando verso l’alto senza bloccare violentemente le ginocchia e riagganciando il sistema prima di uscire.</p></div></section>

        <div className={styles.contentGrid}>
          <section className={styles.accentPanel}><small>04 · PROGETTO PANATTA</small><h3>REGOLAZIONI<br/>AD ALTA INTENSITÀ.</h3><ul><li>Schienale regolabile su 3 inclinazioni</li><li>Pedana antiscivolo 80 × 60 cm</li><li>Pedana regolabile su 4 inclinazioni</li><li>Finecorsa di sicurezza su 5 posizioni</li><li>Leva per facilitare l’inizio del movimento</li><li>Controbilanciamento e porta dischi aggiuntivi disponibili come optional</li></ul></section>
          <section><small>05 · DATI UFFICIALI</small><h3>MODELLO<br/>1FW093.</h3><ul><li>Ingombro: 205 × 205 × 205 cm</li><li>Peso macchina: 350 kg</li><li>Carico massimo dichiarato: 800 kg</li><li>Peso a vuoto del carrello: 90 kg</li><li>Linea: Panatta FreeWeight Special</li></ul></section>
        </div>

        <section className={styles.positions}><div><small>06 · POSIZIONE DEI PIEDI</small><h3>UNA GRANDE PEDANA.<br/><em>PIÙ ASSETTI POSSIBILI.</em></h3></div><div className={styles.positionGrid}>{footPositions.map(([title,text], index) => <div key={title}><span>0{index+1}</span><strong>{title}</strong><p>{text}</p></div>)}</div><p className={styles.positionNote}>Altezza, larghezza e inclinazione dei piedi modificano soprattutto angoli articolari, comfort e contributo relativo dei muscoli. Non isolano completamente una singola porzione della gamba: scegli sempre un appoggio stabile e compatibile con la tua mobilità.</p></section>

        <div className={styles.contentGrid}>
          <section><small>07 · VERTICALE O ORIZZONTALE?</small><h3>DUE PRESSE.<br/>DUE ESPERIENZE.</h3><p>La pressa orizzontale Life Fitness già presente e la nuova Panatta non sono doppioni. Cambiano orientamento, tipo di carico, regolazioni e sensazione di spinta; possono quindi occupare ruoli diversi nello stesso programma.</p><ul><li>Panatta con caricamento a dischi</li><li>Traiettoria quasi verticale e carrello guidato</li><li>Life Fitness con selezione rapida del carico</li><li>Entrambe da regolare sulla persona</li></ul></section>
          <section className={styles.errorPanel}><small>08 · ERRORI DA EVITARE</small><h3>800 KG È UN LIMITE.<br/>NON UN OBIETTIVO.</h3><ul>{verticalErrors.map(item => <li key={item}>{item}</li>)}</ul></section>
        </div>

        <section className={styles.trainer}><div><small>CONSIGLI DEL TRAINER</small><h3>CONOSCI LA MACCHINA.<br/><em>POI AUMENTA.</em></h3></div><blockquote>“Quando arriverà, impara prima regolazioni, leva di sicurezza e finecorsa con un carico gestibile. Profondità e peso contano soltanto se bacino, piedi e ginocchia restano sotto controllo.”</blockquote></section>
        <section className={styles.safety}><strong>IN ARRIVO · FONTE UFFICIALE</strong><p>La macchina non è ancora utilizzabile in sala. Dati e caratteristiche provengono dalla scheda Panatta del modello 1FW093; colori e optional effettivi saranno verificati dopo consegna e montaggio.</p><a href="https://www.panattasport.com/it/free-weight-special/super-vertical-leg-press/" target="_blank" rel="noreferrer">Scheda ufficiale Panatta <span>↗</span></a></section>
      </div>
    </article>

    <section className={styles.cta}><p className={styles.eyebrow}><span></span> Vieni a conoscerle</p><h2>LEGGERE AIUTA.<br/><em>ALLENARSI CAMBIA TUTTO.</em></h2><p>Scopri dal vivo le nuove macchine e chiedi allo staff come inserirle nel tuo allenamento.</p><Link href="/?skipIntro=1#contatti" className={styles.primary}>Chiedi info <span>↗</span></Link></section>
    <footer className={styles.footer}><Link href="/?skipIntro=1#home" className={styles.logo} aria-label="Revenge Gym, torna alla home"><img src="/brand/revenge-gym-logo.png" alt="Revenge Gym" /></Link><p>Sala pesi · Ladispoli</p><p className={styles.footerLegal}><span>© 2026 Revenge Gym</span><span className={styles.byNello} style={{ textTransform: "none" }}>by nello 2026</span></p><a href="#top" className={styles.backTop} aria-label="Torna all'inizio">↑</a></footer>
  </main>;
}
