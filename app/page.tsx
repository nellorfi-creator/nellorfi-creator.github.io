"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { legMachines } from "@/lib/leg-machines";

const courses = [
  { icon: "↗", title: "Sala Pesi", tag: "Forza · Performance", image: "/photos/live/hero-sala.webp", text: "Una sala completa per costruire forza e massa muscolare con macchinari selezionati e pesi liberi.", description: "Il cuore di Revenge Gym: uno spazio pensato per allenare la forza con libertà, metodo e progressione, dal primo carico fino agli obiettivi più ambiziosi.", features: ["Pesi liberi, panche e postazioni per i fondamentali", "Spazi organizzati per allenarsi con continuità", "Soluzioni adatte a forza, ipertrofia e ricomposizione corporea"], ideal: "Per chi vuole aumentare forza e massa muscolare, migliorare la tecnica e costruire un percorso personale misurabile nel tempo." },
  { icon: "＋", title: "Area Isotonica", tag: "Controllo · Qualità", image: "/media/macchinario-dorso.webp", text: "Attrezzature professionali di marchi selezionati per un allenamento preciso ed efficace.", description: "Macchinari selezionati per guidare il movimento, offrire stabilità e concentrare il lavoro sui gruppi muscolari desiderati con regolazioni semplici e precise.", features: ["Macchine a pacco pesi e plate-loaded", "Traiettorie controllate e numerose possibilità di regolazione", "Brand professionali scelti per solidità e qualità del movimento"], ideal: "Per principianti ed esperti che cercano un gesto controllato, un lavoro muscolare mirato e una progressione facile da gestire." },
  { icon: "⌁", title: "Area Cardio", tag: "Resistenza · Energia", image: "/photos/live/sala-community.webp", text: "Uno spazio dedicato al lavoro cardiovascolare, al riscaldamento e al miglioramento della resistenza.", description: "Un’area dedicata ad attivazione, resistenza e consumo energetico, da utilizzare come allenamento completo oppure in abbinamento al lavoro di forza.", features: ["Attrezzature per riscaldamento e lavoro aerobico", "Intensità adattabile al proprio livello di preparazione", "Ideale prima, dopo o indipendentemente dalla sala pesi"], ideal: "Per migliorare fiato e capacità cardiovascolare, sostenere il controllo del peso o preparare il corpo alla parte principale dell’allenamento." },
  { icon: "◎", title: "Allenamento Libero", tag: "I tuoi obiettivi", image: "/photos/live/boxe-sacchi.webp", text: "Organizza il tuo percorso e allenati con continuità in un ambiente curato, attrezzato e motivante.", description: "Lo spazio in cui costruire la tua routine combinando esercizi, attrezzi e intensità secondo il livello di partenza e il risultato che vuoi raggiungere.", features: ["Libertà di combinare forza, mobilità e condizionamento", "Spazio adatto a circuiti e lavoro a corpo libero", "Allenamento autonomo, flessibile e sempre diverso"], ideal: "Per chi ama gestire il proprio programma, variare gli stimoli e allenarsi seguendo ritmi e obiettivi personali." },
];

const gallery = [
  ["/photos/live/hero-sala.webp", "Sala pesi Revenge Gym"],
  ["/photos/live/sala-community.webp", "Community in sala pesi"],
  ["/photos/live/community-gym.webp", "Allenamento e atmosfera Revenge"],
];

const equipmentBrands = [
  {
    name: "PANATTA", origin: "Apiro, Marche · Italia", since: "Dal 1973",
    intro: "Una storia italiana nata dalla passione di Rudi Panatta per la cultura fisica e la biomeccanica applicata all’allenamento.",
    history: "Dai primi pesi costruiti artigianalmente fino a un ciclo produttivo completamente controllato in Italia: progettazione, prototipazione, saldatura, verniciatura, assemblaggio e collaudo avvengono negli stabilimenti di Apiro, nelle Marche.",
    highlights: ["Progettazione e produzione Made in Italy", "Ricerca biomeccanica interna", "Macchine isotoniche, cardio e plate-loaded", "Controllo diretto dell’intero processo produttivo"],
    relevance: "In sala significa avere macchine progettate con particolare attenzione alla traiettoria del movimento, alle regolazioni e al lavoro muscolare mirato.",
    source: "https://www.panattasport.com/it/azienda/", sourceLabel: "Storia ufficiale Panatta",
  },
  {
    name: "HAMMER STRENGTH", origin: "Stati Uniti", since: "Dal 1989",
    intro: "Il marchio creato da Gary Jones per portare nella sala pesi movimenti ispirati alla prestazione degli atleti.",
    history: "Hammer Strength nacque combinando la progettazione di Gary Jones con il confronto diretto con atleti e preparatori, tra cui quelli dei Cincinnati Bengals. Nel 1997 il marchio entrò nel gruppo Life Fitness, ampliandone l’offerta dedicata alla forza.",
    highlights: ["Tecnologia Iso-Lateral per allenare i due lati in modo indipendente", "Macchine plate-loaded e strutture per la forza", "Progettazione orientata a gesti fluidi e naturali", "Test di durata oltre gli standard di settore"],
    relevance: "È un riferimento per chi cerca un allenamento di forza intenso, stabile e progressivo, con la libertà di caricare dischi e lavorare anche unilateralmente.",
    source: "https://www.lifefitness.com/en-us/brands/hammer-strength", sourceLabel: "Profilo ufficiale Hammer Strength",
  },
  {
    name: "LIFE FITNESS", origin: "Illinois · Stati Uniti", since: "Radici dal 1968",
    intro: "La sua storia comincia con la Lifecycle, una delle attrezzature che ha contribuito a trasformare il cardio indoor.",
    history: "L’idea della Lifecycle risale al 1968; l’azienda fu costituita nel 1977 e negli anni successivi estese la propria esperienza dalle bike a tapis roulant, cardio, forza e soluzioni digitali per le palestre di tutto il mondo.",
    highlights: ["Esperienza storica nel cardio professionale", "Attrezzature per forza e allenamento funzionale", "Console e soluzioni connesse", "Gamma pensata per utilizzo commerciale intensivo"],
    relevance: "La presenza di Life Fitness completa la sala con attrezzature intuitive e affidabili, adatte sia a chi comincia sia a chi si allena con continuità.",
    source: "https://www.lifefitness.com/en-us", sourceLabel: "Sito ufficiale Life Fitness",
  },
  {
    name: "PRECOR", origin: "Washington · Stati Uniti", since: "Dal 1980",
    intro: "Un marchio costruito intorno a ergonomia, affidabilità e movimenti capaci di seguire il corpo dell’utilizzatore.",
    history: "Fondata nel 1980 come Precision Corporation, lanciò il primo vogatore nel 1981 e assunse il nome Precor nel 1983. Nel 1995 presentò il primo Elliptical Fitness Crosstrainer EFX; in seguito introdusse l’Adaptive Motion Trainer e console cardio connesse.",
    highlights: ["Pioniere dell’ellittica EFX", "Cardio, forza e functional training", "Movimenti ergonomici e regolazioni intuitive", "Attrezzature progettate per semplicità e affidabilità"],
    relevance: "È particolarmente apprezzata nelle aree cardio e nei percorsi in cui comfort, fluidità del gesto e facilità d’uso sono essenziali.",
    source: "https://www.precor.com/en-US/about-us", sourceLabel: "Storia ufficiale Precor",
  },
  {
    name: "HOIST FITNESS", origin: "San Diego, California · Stati Uniti", since: "Dal 1977",
    intro: "Un marchio statunitense specializzato in attrezzature per la forza, riconoscibile per la ricerca applicata alla meccanica del movimento.",
    history: "La storia inizia nel 1977 con Coast Health Studio; nel 1980 apre lo stabilimento di Solana Beach e nel 1985 arriva il primo circuito di macchine selectorized. Oggi HOIST sviluppa soluzioni professionali e home fitness, dalle linee a pacco pesi e plate-loaded alle panche, ai rack e alle bike.",
    highlights: ["Macchine professionali per la forza", "Linee selectorized e plate-loaded", "Sistemi ROC-IT con movimento dinamico del sedile", "Gamma per club, centri sportivi e preparazione atletica"],
    relevance: "A Revenge Gym amplia le possibilità di lavorare sulla forza con postazioni solide e regolabili, utili per impostare il gesto con controllo e progredire gradualmente con il carico.",
    source: "https://www.hoistfitness.com/pages/about", sourceLabel: "Storia ufficiale HOIST Fitness",
  },
  {
    name: "NAUTILUS", origin: "Stati Uniti", since: "Dal 1970",
    intro: "Uno dei nomi che hanno segnato la storia moderna delle macchine per la forza e dell’allenamento a resistenza variabile.",
    history: "L’eredità Nautilus nasce dal lavoro di Arthur Jones e dalla macchina presentata nel 1970, sviluppata per rendere la resistenza più coerente lungo l’arco del movimento. Il marchio è poi diventato un riferimento della sala pesi moderna; l’attuale offerta professionale comprende linee selectorized, plate-loaded, panche, rack e sistemi a cavi.",
    highlights: ["Tradizione legata alla resistenza variabile", "Progettazione orientata alla biomeccanica", "Macchine selectorized e plate-loaded", "Soluzioni per forza guidata e allenamento funzionale"],
    relevance: "In sala offre un lavoro muscolare guidato e leggibile, con regolazioni che aiutano utenti di esperienza diversa a trovare una posizione efficace e una progressione controllata.",
    source: "https://shop.corehandf.com/collections/nautilus", sourceLabel: "Profilo ufficiale Nautilus Professional",
  },
  {
    name: "STAR TRAC", origin: "California · Stati Uniti", since: "Dal 1979",
    intro: "Un marchio professionale noto soprattutto per il cardio e per avere unito robustezza, facilità d’uso ed esperienza digitale.",
    history: "Le origini risalgono al 1979, quando Jim Doody fondò Unisen e iniziò a progettare componenti elettronici per tapis roulant. Nel 1987 arrivò Star Trac 2000, il primo tapis roulant commerciale alimentato in corrente continua sviluppato esclusivamente per gli health club; seguirono cardio, indoor cycling, console integrate e soluzioni connesse. Dal 2011 il marchio fa parte di Core Health & Fitness.",
    highlights: ["Cardio professionale per uso intensivo", "Tapis roulant, bike e cross trainer", "Console e tracciamento dei dati di allenamento", "Progettazione attenta anche alla gestione da parte del club"],
    relevance: "Contribuisce a rendere più completa l’area cardio, offrendo strumenti adatti al riscaldamento, al lavoro aerobico e a sedute di resistenza con intensità facilmente modulabile.",
    source: "https://www.corehandf.com/pages/complete-line-of-cardio", sourceLabel: "Gamma ufficiale Star Trac",
  },
  {
    name: "GYMLECO", origin: "Stoccolma · Svezia", since: "Dal 1994",
    intro: "Un produttore scandinavo nato con l’obiettivo di creare macchine per la forza compatte, funzionali e semplici da mantenere.",
    history: "Dopo gli studi di ingegneria e l’esperienza nel bodybuilding, Kari Jernvall progettò in Svezia le prime tre macchine nel 1994. L’interesse raccolto alla prima esposizione del 1995 portò all’ampliamento della gamma; dal 2005 iniziò l’espansione nordica e nel 2018 la partecipazione a FIBO accelerò la presenza internazionale.",
    highlights: ["Progettazione e produzione svedese", "Ingombri studiati per sfruttare bene lo spazio", "Macchine per forza, pesi liberi e accessori", "Costruzione orientata a durata e manutenzione ridotta"],
    relevance: "Aggiunge alla sala macchine essenziali e robuste, pensate per offrire un movimento diretto e sfruttare in modo efficiente lo spazio senza rinunciare alla qualità del lavoro.",
    source: "https://gymleco.com/pages/our-history", sourceLabel: "Storia ufficiale Gymleco",
  },
  {
    name: "GYM EQUIPE", origin: "Origine non verificata", since: "Attrezzature professionali",
    intro: "Una presenza meno documentata online rispetto ai grandi gruppi internazionali, ma riconoscibile nella dotazione della palestra per le sue macchine dedicate alla forza.",
    history: "Il nome Gym Equipe compare su attrezzature professionali per l’allenamento muscolare; tra i riferimenti pubblicamente rintracciabili figurano macchine leg curl e leg extension. Non emerge però un sito ufficiale certo né una storia societaria documentata: per correttezza non attribuiamo al marchio una sede, un anno di fondazione o tecnologie proprietarie non verificabili.",
    highlights: ["Macchine guidate per la muscolazione", "Postazioni leg curl e leg extension documentate online", "Lavoro mirato su distretti specifici", "Presenza dichiarata nella dotazione di Revenge Gym"],
    relevance: "Completa la varietà delle stazioni disponibili e permette di inserire esercizi guidati e mirati all’interno di percorsi di forza, ipertrofia e condizionamento generale.",
    source: "https://www.google.com/search?q=%22Gym+Equipe%22+attrezzature+palestra", sourceLabel: "Ricerca web Gym Equipe · sito ufficiale non reperito",
  },
];

const introFrames = [
  ["/photos/live/hero-sala.webp", "RIVINCITA"],
  ["/media/sala-attrezzi.webp", "FORZA"],
  ["/media/macchinario-spalle.webp", "POTENZA"],
  ["/photos/live/sala-community.webp", "ENERGIA"],
  ["/photos/live/boxe-coach-ring.webp", "BOXE"],
  ["/media/macchinario-dorso.webp", "DISCIPLINA"],
  ["/photos/live/boxe-sacchi.webp", "CARATTERE"],
  ["/photos/live/hero-sala.webp", "REVENGE GYM"],
];

const gymZones = [
  { id: "free", number: "01", title: "Pesi liberi", subtitle: "Forza e fondamentali", className: "zone-free", image: "/photos/live/hero-sala.webp", text: "L’area dedicata a bilancieri, manubri e panche: il punto di partenza per costruire forza, tecnica e massa muscolare.", equipment: ["Panche e postazioni regolabili", "Manubri e bilancieri", "Spazio per i principali esercizi multiarticolari"] },
  { id: "isotonic", number: "02", title: "Isotonica", subtitle: "Movimento guidato", className: "zone-isotonic", image: "/media/macchinario-dorso.webp", text: "Macchinari professionali che guidano la traiettoria e permettono di concentrare il lavoro sul gruppo muscolare scelto.", equipment: ["Macchine Panatta e Hammer Strength", "Postazioni per dorso, petto, spalle e gambe", "Regolazioni adatte a livelli diversi"] },
  { id: "cardio", number: "03", title: "Cardio", subtitle: "Fiato e resistenza", className: "zone-cardio", image: "/photos/live/sala-community.webp", text: "Una zona per riscaldarsi, migliorare la capacità cardiovascolare o completare la seduta con un lavoro aerobico.", equipment: ["Attrezzature cardio professionali", "Intensità facilmente regolabile", "Utilizzabile prima o dopo la sala pesi"] },
  { id: "boxing", number: "04", title: "Boxe", subtitle: "Tecnica e carattere", className: "zone-boxing", image: "/photos/live/boxe-sacchi.webp", text: "Uno spazio distinto dedicato alla boxe, dove allenare tecnica, coordinazione, condizionamento e sicurezza.", equipment: ["Ring", "Sacchi", "Spazio per tecnica e preparazione atletica"] },
];

const magazineArticles = [
  { category: "INIZIARE", time: "4 min", title: "La prima volta in sala pesi: cosa aspettarsi", excerpt: "Niente ansia e nessuna gara: ecco come affrontare il primo allenamento con ordine e sicurezza.", image: "/photos/live/hero-sala.webp", intro: "Entrare per la prima volta in sala pesi può sembrare complicato. In realtà basta partire con poche idee chiare: conoscere gli spazi, scegliere carichi gestibili e dare priorità alla tecnica.", paragraphs: ["Indossa abbigliamento comodo, porta acqua e un asciugamano. Prima di iniziare, dedica qualche minuto a capire dove si trovano le diverse aree e come si regolano le attrezzature.", "Nelle prime sedute non serve provare ogni macchina. Un allenamento semplice e completo permette di imparare i movimenti senza accumulare fatica inutile.", "Il carico giusto è quello che consente di completare ogni ripetizione in modo controllato. La progressione arriverà con la continuità: il primo obiettivo è costruire una routine sostenibile."], takeaway: "La prima seduta serve a prendere confidenza, non a dimostrare quanto sei forte." },
  { category: "METODO", time: "5 min", title: "Allenarsi tre volte a settimana: una base concreta", excerpt: "Come distribuire forza, recupero e continuità quando il tempo non è infinito.", image: "/photos/live/sala-community.webp", intro: "Tre allenamenti settimanali sono una frequenza solida per moltissime persone: lasciano spazio al recupero e permettono di stimolare con regolarità tutto il corpo.", paragraphs: ["Una soluzione semplice è alternare sedute complete, distribuendo in ogni giornata esercizi per gambe, spinta e tirata. In questo modo ogni gruppo muscolare viene allenato più volte senza concentrare tutto in una sola seduta.", "Lascia almeno un giorno di recupero tra due allenamenti impegnativi e mantieni una durata che puoi sostenere anche nelle settimane più piene.", "Annotare esercizi, serie e carichi aiuta a capire se stai migliorando. Piccoli progressi ripetuti nel tempo valgono più di una singola seduta estrema."], takeaway: "Il programma migliore non è il più complicato: è quello che riesci a seguire con costanza." },
  { category: "TECNICA", time: "6 min", title: "Macchine o pesi liberi? Non devi scegliere", excerpt: "Due strumenti diversi che possono convivere nello stesso allenamento e completarsi a vicenda.", image: "/media/macchinario-spalle.webp", intro: "Pesi liberi e macchine non sono avversari. Offrono stimoli diversi e, combinati con criterio, permettono di costruire un allenamento più completo.", paragraphs: ["Bilancieri e manubri richiedono stabilizzazione e libertà di movimento. Sono strumenti versatili, particolarmente utili per sviluppare tecnica e coordinazione nei movimenti fondamentali.", "Le macchine guidano maggiormente la traiettoria e aiutano a concentrare il lavoro su un distretto specifico. Possono essere utili per imparare a percepire il muscolo e continuare una seduta in modo controllato.", "La scelta dipende dall’obiettivo, dall’esperienza e dalle caratteristiche personali. Nella stessa scheda è normale iniziare con un esercizio libero e proseguire con uno o più esercizi guidati."], takeaway: "Gli strumenti cambiano; ciò che conta è usarli con tecnica, progressione e uno scopo preciso." },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [introVisible, setIntroVisible] = useState(true);
  const [introClosing, setIntroClosing] = useState(false);
  const [introStarted, setIntroStarted] = useState(false);
  const [introSlide, setIntroSlide] = useState(0);
  const [introSound, setIntroSound] = useState(false);
  const [activeBrand, setActiveBrand] = useState<(typeof equipmentBrands)[number] | null>(null);
  const [activeArea, setActiveArea] = useState<(typeof courses)[number] | null>(null);
  const [activeZone, setActiveZone] = useState(gymZones[0]);
  const [activeArticle, setActiveArticle] = useState<(typeof magazineArticles)[number] | null>(null);
  const introAudioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const skipRequested = new URLSearchParams(window.location.search).get("skipIntro") === "1";
    const alreadySeen = window.sessionStorage.getItem("revenge-intro-seen") === "1";
    if (!skipRequested && !alreadySeen) return;
    const skipTimer = window.setTimeout(() => setIntroVisible(false), 0);
    return () => window.clearTimeout(skipTimer);
  }, []);

  useEffect(() => {
    const items = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("visible")), { threshold: 0.08, rootMargin: "0px 0px -8% 0px" });
    items.forEach((item) => observer.observe(item));
    const failsafe = window.setTimeout(() => items.forEach((item) => item.classList.add("visible")), 1800);
    return () => { observer.disconnect(); window.clearTimeout(failsafe); };
  }, []);

  useEffect(() => {
    if (!introVisible || !introStarted) return;
    const slideTimer = window.setInterval(() => setIntroSlide((slide) => Math.min(slide + 1, introFrames.length - 1)), 720);
    const closingTimer = window.setTimeout(() => setIntroClosing(true), 6400);
    const exitTimer = window.setTimeout(() => {
      introAudioRef.current?.pause();
      window.sessionStorage.setItem("revenge-intro-seen", "1");
      setIntroVisible(false);
    }, 7100);
    return () => {
      window.clearInterval(slideTimer);
      window.clearTimeout(closingTimer);
      window.clearTimeout(exitTimer);
    };
  }, [introVisible, introStarted]);

  useEffect(() => {
    if (!introVisible && !activeBrand && !activeArea && !activeArticle) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [introVisible, activeBrand, activeArea, activeArticle]);

  useEffect(() => {
    if (!activeBrand && !activeArea && !activeArticle) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setActiveBrand(null);
      setActiveArea(null);
      setActiveArticle(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [activeBrand, activeArea, activeArticle]);

  const closeIntro = () => {
    setIntroClosing(true);
    introAudioRef.current?.pause();
    window.sessionStorage.setItem("revenge-intro-seen", "1");
    window.setTimeout(() => setIntroVisible(false), 700);
  };

  const toggleIntroSound = async () => {
    const audio = introAudioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.volume = 0.48;
      await audio.play();
      setIntroSound(true);
    } else {
      audio.pause();
      setIntroSound(false);
    }
  };

  const startIntro = async () => {
    const audio = introAudioRef.current;
    if (audio) {
      audio.volume = 0.55;
      try { await audio.play(); setIntroSound(true); } catch { setIntroSound(false); }
    }
    setIntroStarted(true);
  };

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
    event.currentTarget.reset();
  };

  return (
    <main>
      {introVisible && <section className={`intro-screen${introClosing ? " is-closing" : ""}`} aria-label="Presentazione Revenge Gym">
        <div className={`intro-frames${introStarted ? " is-running" : ""}`}>
          <img key={introStarted ? introSlide : "cover"} src={introStarted ? introFrames[introSlide][0] : "/photos/live/hero-sala.webp"} alt="Sequenza degli spazi e degli allenamenti di Revenge Gym"/>
        </div>
        <div className="intro-shade"></div>
        <div className="intro-logo logo"><img src="/brand/revenge-gym-logo.png" alt="Revenge Gym" /></div>
        {introStarted && <button className={`intro-audio${introSound ? " active" : ""}`} type="button" onClick={toggleIntroSound} aria-pressed={introSound}>
          <i>{introSound ? "▮▮" : "▶"}</i> {introSound ? "Musica attiva" : "Attiva musica"}
        </button>}
        {!introStarted ? <div className="intro-content intro-launch">
          <p className="intro-kicker"><span></span> Ladispoli · Sala pesi · Boxe</p>
          <h2>LA TUA<br/><em>RIVINCITA</em><br/>INIZIA QUI.</h2>
          <p>Alza il volume. Entra nell’esperienza.</p>
          <button className="button primary intro-start" type="button" onClick={startIntro}><i>▶</i> Avvia con musica</button>
        </div> : <div className="intro-flash" aria-live="polite"><strong key={introSlide}>{introFrames[introSlide][1]}</strong><span>{String(introSlide + 1).padStart(2,"0")} / {String(introFrames.length).padStart(2,"0")}</span></div>}
        <button className="intro-skip" type="button" onClick={closeIntro}>Salta intro <span>→</span></button>
        {introStarted && <div className="intro-progress" aria-hidden="true"><span></span></div>}
        <audio ref={introAudioRef} src="/media/revenge-gym-tour.mp4" loop preload="auto"/>
      </section>}
      <header className="nav-wrap">
        <a href="#home" className="logo" aria-label="Revenge Gym, torna all'inizio"><img src="/brand/revenge-gym-logo.png" alt="Revenge Gym" /></a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Apri menu" aria-expanded={menuOpen}><i></i><i></i></button>
        <nav className={menuOpen ? "open" : ""} aria-label="Navigazione principale">
          {[['La palestra','#filosofia'],['Aree','#corsi'],['Mappa','#mappa'],['Boxe','/boxe/'],['Gallery','#gallery'],['Magazine','#magazine']].map(([label,href]) => <Link key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</Link>)}
          <div className="nav-flyout">
            <button type="button" className="nav-flyout-trigger" aria-haspopup="true">Per zona <span>▾</span></button>
            <div className="nav-flyout-panel" role="menu">
              <div className="nav-flyout-panel-inner">
                <Link href="/macchine/gambe" role="menuitem" onClick={() => setMenuOpen(false)}>Gambe</Link>
                <span className="nav-flyout-soon" role="menuitem" aria-disabled="true">Petto <i>presto</i></span>
                <span className="nav-flyout-soon" role="menuitem" aria-disabled="true">Dorso <i>presto</i></span>
                <span className="nav-flyout-soon" role="menuitem" aria-disabled="true">Spalle <i>presto</i></span>
                <span className="nav-flyout-soon" role="menuitem" aria-disabled="true">Braccia <i>presto</i></span>
              </div>
            </div>
          </div>
          <Link href="/nuove-macchine" onClick={() => setMenuOpen(false)}>Nuove macchine</Link>
          <a className="nav-cta" href="#contatti" onClick={() => setMenuOpen(false)}>Chiedi info <span>↗</span></a>
        </nav>
      </header>

      <div className="machine-ticker" aria-label="Anteprima macchinari Revenge Gym" role="presentation">
        <div className="machine-ticker-track">
          {[...legMachines, ...legMachines].map((machine, index) => (
            <div className="machine-ticker-item" key={`${machine.id}-${index}`} aria-hidden="true">
              <img src={machine.image} alt="" />
              <span>{machine.name}</span>
            </div>
          ))}
        </div>
      </div>

      <section className="hero" id="home">
        <div className="hero-media" role="img" aria-label="Sala attrezzi di Revenge Gym a Ladispoli"></div>
        <div className="hero-shade"></div>
        <div className="hero-content reveal">
          <p className="eyebrow"><span></span> Sala pesi · Ladispoli</p>
          <h1>NON CERCARE<br/>SCUSE. <em>CREA</em><br/>LA TUA <em>RIVINCITA.</em></h1>
          <p className="hero-copy">Una palestra completa, attrezzature di qualità e l’ambiente giusto per allenarti con costanza e superare ogni limite.</p>
          <div className="hero-actions">
            <a href="#contatti" className="button primary">Chiedi info <span>↗</span></a>
            <a href="#corsi" className="text-link">Scopri la palestra <span>↓</span></a>
          </div>
        </div>
        <div className="hero-stats">
          <div><strong>9</strong><span>Brand professionali</span></div><div><strong>100%</strong><span>Allenamento</span></div><div><strong>1</strong><span>Grande community</span></div>
        </div>
        <a href="#filosofia" className="scroll-cue" aria-label="Scorri alla sezione successiva">SCROLL <span>↓</span></a>
      </section>

      <section className="section philosophy" id="filosofia">
        <div className="section-index">01 — FILOSOFIA</div>
        <div className="philosophy-copy reveal">
          <p className="eyebrow"><span></span> Il nostro metodo</p>
          <h2>LA PALESTRA DOVE<br/>CAMBI DAVVERO.</h2>
          <p className="lead">Spazi curati, attrezzature di alto livello e una community che condivide la voglia di migliorarsi.</p>
          <p>Revenge Gym è una palestra completa a Ladispoli, pensata per chi vuole allenarsi seriamente in un ambiente pulito, accogliente e professionale. La sala riunisce macchinari Panatta, Hammer Strength, Life Fitness, Precor, Hoist Fitness, Nautilus, Star Trac, Gymleco e Gym Equipe.</p>
          <a href="#contatti" className="text-link orange">Conosci la nostra community <span>↗</span></a>
        </div>
        <div className="philosophy-image reveal">
          <img src="/media/sala-attrezzi.webp" alt="Vista panoramica della sala attrezzi di Revenge Gym" loading="lazy" />
          <div className="quote"><span>“</span><p>Non devi essere già in forma per iniziare. Devi solo decidere di iniziare.</p></div>
        </div>
        <div className="owners-spotlight reveal" aria-label="I titolari di Revenge Gym">
          <figure className="owners-photo">
            <img src="/photos/live/boxe-coppia.webp" alt="Gino e Stefania, titolari di Revenge Gym" loading="lazy" />
          </figure>
          <div className="owners-copy">
            <p className="eyebrow"><span></span> I titolari</p>
            <h3>GINO & STEFANIA.<br/><em>REVENGE GYM.</em></h3>
            <p>La palestra di Ladispoli guidata da chi ci crede ogni giorno: cura degli spazi, attenzione alle persone e la stessa passione per l’allenamento che si respira in sala.</p>
            <small>LADISPOLI · SALA PESI · BOXE</small>
          </div>
        </div>
        <div className="real-gym-strip reveal" aria-label="Foto reali di Revenge Gym">
          <figure><img src="/photos/live/sala-community.webp" alt="Community in sala pesi di Revenge Gym" loading="lazy"/><figcaption>Community in sala</figcaption></figure>
          <div className="real-gym-caption"><small>REVENGE GYM · LADISPOLI</small><strong>QUESTA È<br/>LA NOSTRA<br/><em>PALESTRA.</em></strong></div>
          <figure><img src="/photos/live/boxe-sacchi.webp" alt="Area boxe con sacchi a Revenge Gym" loading="lazy"/><figcaption>Sala boxe · sacchi e ring</figcaption></figure>
        </div>
        <div className="gym-video reveal">
          <div className="gym-video-copy"><small>TOUR DELLA PALESTRA</small><h3>ENTRA IN<br/><em>REVENGE GYM.</em></h3><p>Scopri gli ambienti, le aree di allenamento e l’atmosfera della palestra prima ancora di venirci a trovare.</p></div>
          <video controls playsInline preload="metadata" poster="/media/sala-attrezzi.webp" aria-label="Video degli ambienti di Revenge Gym">
            <source src="/media/revenge-gym-tour.mp4" type="video/mp4"/>
            Il tuo browser non supporta la riproduzione video.
          </video>
        </div>
      </section>

      <section className="section courses" id="corsi">
        <div className="section-heading reveal">
          <div><p className="eyebrow"><span></span> Tutto ciò che ti serve</p><h2>ALLENATI.<br/><em>EVOLVI.</em></h2></div>
          <p>Spazi e attrezzature per costruire un allenamento completo, efficace e adatto ai tuoi obiettivi.</p>
        </div>
        <div className="course-grid">
          {courses.map((course, i) => <button type="button" className="course-card reveal" key={course.title} onClick={() => setActiveArea(course)} aria-label={`Scopri l’area ${course.title}`}>
            <img src={course.image} alt={course.title} loading="lazy" />
            <div className="course-overlay"></div><span className="course-number">0{i+1}</span>
            <div className="course-content"><span className="course-icon">{course.icon}</span><small>{course.tag}</small><h3>{course.title}</h3><p>{course.text}</p><span className="course-open">Scopri l’area <span>↗</span></span></div>
          </button>)}
        </div>
      </section>

      {activeArea && <div className="brand-drawer-layer" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setActiveArea(null)}>
        <aside className="brand-drawer area-drawer" role="dialog" aria-modal="true" aria-labelledby="area-drawer-title">
          <button className="brand-drawer-close" type="button" onClick={() => setActiveArea(null)} aria-label="Chiudi approfondimento">×</button>
          <div className="brand-drawer-head area-drawer-head" style={{ backgroundImage: `linear-gradient(0deg,rgba(8,8,8,.96),rgba(8,8,8,.18) 75%),url(${activeArea.image})` }}><span>LE AREE · REVENGE GYM</span><small>{activeArea.tag}</small><h2 id="area-drawer-title" className={activeArea.title.length > 12 ? "brand-title-long" : undefined}>{activeArea.title}</h2><p>{activeArea.description}</p></div>
          <div className="brand-drawer-body">
            <section><small>COSA TROVI</small><ul>{activeArea.features.map(item => <li key={item}>{item}</li>)}</ul></section>
            <section className="brand-relevance"><small>IDEALE PER</small><p>{activeArea.ideal}</p></section>
            <a className="brand-source" href="#contatti" onClick={() => setActiveArea(null)}>Chiedi info <span>↗</span></a>
          </div>
        </aside>
      </div>}

      <section className="section schedule-section" id="attrezzatura">
        <div className="section-heading reveal"><div><p className="eyebrow"><span></span> Qualità in sala</p><h2>MACCHINARI<br/><em>SELEZIONATI.</em></h2></div><p>Una dotazione completa con alcuni dei marchi più riconosciuti nel mondo del fitness e della preparazione fisica.</p></div>
        <div className="brand-grid reveal">
          {equipmentBrands.map((brand, i) => <button type="button" key={brand.name} onClick={() => setActiveBrand(brand)} aria-label={`Scopri storia e caratteristiche di ${brand.name}`}><span>0{i+1}</span><strong>{brand.name}</strong><small>{brand.since}</small><i>Scopri il marchio ↗</i></button>)}
        </div>
        <div className="equipment-gallery reveal" aria-label="Attrezzature di Revenge Gym">
          {[
            ['/media/sala-attrezzi.webp', 'Sala attrezzi completa di Revenge Gym'],
            ['/media/macchinario-spalle.webp', 'Allenamento su macchinario professionale per le spalle'],
            ['/media/macchinario-dorso.webp', 'Allenamento su macchinario professionale per il dorso']
          ].map(([src, alt], i) => <figure key={src}><img src={src} alt={alt} loading="lazy"/><span>0{i+1}</span></figure>)}
        </div>
        <p className="schedule-note">La dotazione può essere aggiornata nel tempo. Vieni a vedere la palestra dal vivo.</p>

        <div className="gym-map reveal" id="mappa">
          <div className="gym-map-copy">
            <p className="eyebrow"><span></span> Esplora gli spazi</p>
            <h3>DENTRO<br/><em>REVENGE.</em></h3>
            <p>Seleziona una zona della palestra per scoprire cosa trovi e come può entrare nel tuo allenamento.</p>
            <div className="gym-map-detail" aria-live="polite">
              <small>{activeZone.number} · {activeZone.subtitle}</small>
              <strong>{activeZone.title}</strong>
              <p>{activeZone.text}</p>
              <ul>{activeZone.equipment.map(item => <li key={item}>{item}</li>)}</ul>
            </div>
          </div>
          <div className="floor-plan" aria-label="Mappa interattiva delle aree di Revenge Gym">
            <div className="floor-plan-label">INGRESSO <span>→</span></div>
            {gymZones.map(zone => <button key={zone.id} type="button" className={`floor-zone ${zone.className}${activeZone.id === zone.id ? " active" : ""}`} onClick={() => setActiveZone(zone)} aria-pressed={activeZone.id === zone.id}>
              <span>{zone.number}</span><strong>{zone.title}</strong><small>{zone.subtitle}</small>
            </button>)}
            <div className="floor-core">REVENGE<br/><span>GYM</span></div>
          </div>
        </div>
      </section>

      {activeBrand && <div className="brand-drawer-layer" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setActiveBrand(null)}>
        <aside className="brand-drawer" role="dialog" aria-modal="true" aria-labelledby="brand-drawer-title">
          <button className="brand-drawer-close" type="button" onClick={() => setActiveBrand(null)} aria-label="Chiudi approfondimento">×</button>
          <div className="brand-drawer-head"><span>BRAND PROFILE · REVENGE GYM</span><small>{activeBrand.origin}</small><h2 id="brand-drawer-title" className={activeBrand.name.length > 12 ? "brand-title-long" : undefined}>{activeBrand.name}</h2><p>{activeBrand.intro}</p></div>
          <div className="brand-drawer-body">
            <section><small>LA STORIA</small><p>{activeBrand.history}</p></section>
            <section><small>COSA LO DISTINGUE</small><ul>{activeBrand.highlights.map(item => <li key={item}>{item}</li>)}</ul></section>
            <section className="brand-relevance"><small>PERCHÉ È IN REVENGE GYM</small><p>{activeBrand.relevance}</p></section>
            <a className="brand-source" href={activeBrand.source} target="_blank" rel="noreferrer">{activeBrand.sourceLabel} <span>↗</span></a>
          </div>
        </aside>
      </div>}

      <section className="gallery-section" id="gallery">
        <div className="gallery-title reveal"><p className="eyebrow"><span></span> Dentro Revenge Gym</p><h2>SUDORE. ENERGIA.<br/><em>RISULTATI.</em></h2></div>
        <div className="gallery-grid">
          {gallery.map(([src, alt], i) => <figure className={`gallery-item g${i+1} reveal`} key={src}><img src={src} alt={alt} loading="lazy"/><figcaption>{alt}<span>↗</span></figcaption></figure>)}
        </div>
      </section>

      <section className="section magazine" id="magazine">
        <div className="section-heading reveal"><div><p className="eyebrow"><span></span> Revenge Journal</p><h2>ALLENATI<br/><em>CON METODO.</em></h2></div><p>Guide semplici per orientarti in palestra, capire gli strumenti e costruire un percorso che duri nel tempo.</p></div>
        <div className="magazine-grid">
          {magazineArticles.map((article, i) => <article className={`article-card article-${i + 1} reveal`} key={article.title}>
            <button type="button" onClick={() => setActiveArticle(article)} aria-label={`Leggi: ${article.title}`}>
              <div className="article-image"><img src={article.image} alt="" loading="lazy"/><span>0{i + 1}</span></div>
              <div className="article-copy"><small>{article.category} · {article.time} di lettura</small><h3>{article.title}</h3><p>{article.excerpt}</p><b>Leggi l’articolo <span>↗</span></b></div>
            </button>
          </article>)}
        </div>
      </section>

      {activeArticle && <div className="brand-drawer-layer" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setActiveArticle(null)}>
        <article className="brand-drawer article-drawer" role="dialog" aria-modal="true" aria-labelledby="article-drawer-title">
          <button className="brand-drawer-close" type="button" onClick={() => setActiveArticle(null)} aria-label="Chiudi articolo">×</button>
          <div className="article-drawer-hero"><img src={activeArticle.image} alt=""/><div><small>{activeArticle.category} · {activeArticle.time} di lettura</small><h2 id="article-drawer-title">{activeArticle.title}</h2></div></div>
          <div className="article-drawer-body"><p className="article-lead">{activeArticle.intro}</p>{activeArticle.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}<blockquote><small>DA RICORDARE</small>{activeArticle.takeaway}</blockquote><a href="#contatti" onClick={() => setActiveArticle(null)} className="button primary">Chiedi info <span>↗</span></a></div>
        </article>
      </div>}

      <section className="trial" id="info">
        <div className="trial-inner reveal"><p className="eyebrow"><span></span> Informazioni e iscrizioni</p><h2>HAI DOMANDE?<br/>SCRIVICI <em>ORA.</em></h2><p>Orari, abbonamenti, aree della palestra o la boxe: dicci cosa ti serve sapere. Ti rispondiamo noi e ti aiutiamo a capire come allenarti da Revenge Gym.</p><a href="#contatti" className="button primary">Chiedi info <span>↗</span></a></div>
      </section>

      <section className="section contact" id="contatti">
        <div className="contact-info reveal">
          <p className="eyebrow"><span></span> Parliamone</p><h2>CI VEDIAMO<br/>IN <em>PALESTRA.</em></h2>
          <div className="info-list">
            <div><small>Dove siamo</small><p>Via Berna, 8<br/>00055 Ladispoli RM</p><a href="https://maps.google.com/?q=Via+Berna+8+00055+Ladispoli+RM" target="_blank" rel="noreferrer">Apri in Google Maps ↗</a></div>
            <div><small>Contatti</small><p><a href="tel:+393475368488">347 536 8488</a><br/><a href="mailto:laurogino@tiscali.it">laurogino@tiscali.it</a></p></div>
            <div><small>Seguici</small><p className="socials"><a href="https://www.facebook.com/Revengebox/directory_basic_info?locale=it_IT" target="_blank" rel="noreferrer">Facebook ↗</a><a href="https://www.facebook.com/messages/t/Revengebox/" target="_blank" rel="noreferrer">Messenger ↗</a></p></div>
          </div>
          <div className="map-placeholder">
            <div className="map-label"><span>●</span><div><strong>REVENGE GYM</strong><small>Via Berna 8 · Ladispoli</small></div></div>
            <iframe title="Mappa di Revenge Gym a Ladispoli" loading="lazy" src="https://www.google.com/maps?q=Revenge%20Gym%2C%20Via%20Berna%208%2C%2000055%20Ladispoli%20RM&z=14&output=embed" referrerPolicy="no-referrer-when-downgrade"></iframe>
            <a className="map-open" href="https://www.google.com/maps/search/?api=1&query=Revenge%20Gym%2C%20Via%20Berna%208%2C%2000055%20Ladispoli%20RM" target="_blank" rel="noreferrer">Apri la mappa <span>↗</span></a>
          </div>
        </div>
        <form className="contact-form reveal" onSubmit={submitForm}>
          <span className="form-kicker">RICHIEDI INFORMAZIONI</span><h3>Scrivici, ti rispondiamo noi</h3>
          <label>Nome e cognome<input required name="name" placeholder="Il tuo nome" /></label>
          <div className="form-row"><label>Email<input required type="email" name="email" placeholder="nome@email.it" /></label><label>Telefono<input required type="tel" name="phone" placeholder="+39" /></label></div>
          <label>Area di interesse<select name="course" defaultValue=""><option value="" disabled>Seleziona un’area</option>{[...courses.map(c => c.title), 'Boxe'].map(area => <option key={area}>{area}</option>)}</select></label>
          <label>Messaggio<textarea name="message" placeholder="Dicci cosa vuoi sapere: orari, abbonamenti, obiettivi..."></textarea></label>
          <label className="privacy"><input required type="checkbox" /> <span>Accetto il trattamento dei dati personali.</span></label>
          <button className="button primary" type="submit">Chiedi info <span>↗</span></button>
          {sent && <p className="success" role="status">Richiesta ricevuta! Ti richiamiamo al più presto.</p>}
        </form>
      </section>

      <footer>
        <a href="#home" className="logo" aria-label="Revenge Gym, torna all'inizio"><img src="/brand/revenge-gym-logo.png" alt="Revenge Gym" /></a>
        <p>Sala pesi · Ladispoli</p>
        <p className="footer-legal">
          <span>© 2026 Revenge Gym. Tutti i diritti riservati.</span>
          <span className="by-nello">by nello 2026</span>
        </p>
        <a href="#home" className="back-top" aria-label="Torna all'inizio">↑</a>
      </footer>
    </main>
  );
}
