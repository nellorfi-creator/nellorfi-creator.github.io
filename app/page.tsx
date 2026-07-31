"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

const courses = [
  { icon: "↗", title: "Sala Pesi", tag: "Forza · Performance", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=85", text: "Una sala completa per costruire forza e massa muscolare con macchinari selezionati e pesi liberi." },
  { icon: "＋", title: "Area Isotonica", tag: "Controllo · Qualità", image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1200&q=85", text: "Attrezzature Panatta, Hammer Strength, Life Fitness e Precor per un allenamento preciso ed efficace." },
  { icon: "⌁", title: "Area Cardio", tag: "Resistenza · Energia", image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1200&q=85", text: "Uno spazio dedicato al lavoro cardiovascolare, al riscaldamento e al miglioramento della resistenza." },
  { icon: "◎", title: "Allenamento Libero", tag: "I tuoi obiettivi", image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=1200&q=85", text: "Organizza il tuo percorso e allenati con continuità in un ambiente curato, attrezzato e motivante." },
];

const gallery = [
  ["https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=85", "Allenamento funzionale di gruppo"],
  ["https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=1200&q=85", "Atleta durante un workout"],
  ["https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?auto=format&fit=crop&w=1200&q=85", "Allenamento con kettlebell"],
  ["https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=1200&q=85", "Sala attrezzata della palestra"],
  ["https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?auto=format&fit=crop&w=1200&q=85", "Workout ad alta intensità"],
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
];

const introFrames = [
  ["https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=2000&q=90", "RIVINCITA"],
  ["/media/sala-attrezzi.webp", "FORZA"],
  ["/media/macchinario-spalle.webp", "POTENZA"],
  ["/photos/revenge-gym-02.jpg", "ENERGIA"],
  ["/media/ring-boxe.webp", "BOXE"],
  ["/media/macchinario-dorso.webp", "DISCIPLINA"],
  ["/photos/revenge-gym-05.jpg", "CARATTERE"],
  ["/media/sala-attrezzi.webp", "REVENGE GYM"],
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
  const introAudioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("visible")), { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = introVisible ? "hidden" : "";
    if (!introVisible || !introStarted) return;
    const slideTimer = window.setInterval(() => setIntroSlide((slide) => Math.min(slide + 1, introFrames.length - 1)), 720);
    const closingTimer = window.setTimeout(() => setIntroClosing(true), 6400);
    const exitTimer = window.setTimeout(() => { introAudioRef.current?.pause(); setIntroVisible(false); }, 7100);
    return () => {
      window.clearInterval(slideTimer);
      window.clearTimeout(closingTimer);
      window.clearTimeout(exitTimer);
      document.body.style.overflow = "";
    };
  }, [introVisible, introStarted]);

  useEffect(() => {
    if (!activeBrand) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && setActiveBrand(null);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [activeBrand]);

  const closeIntro = () => {
    setIntroClosing(true);
    introAudioRef.current?.pause();
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
          <img key={introStarted ? introSlide : "cover"} src={introStarted ? introFrames[introSlide][0] : "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=2000&q=90"} alt="Sequenza degli spazi e degli allenamenti di Revenge Gym"/>
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
        <button className="intro-skip" type="button" onClick={closeIntro}>Salta intro →</button>
        {introStarted && <div className="intro-progress" aria-hidden="true"><span></span></div>}
        <audio ref={introAudioRef} src="/media/revenge-gym-tour.mp4" loop preload="auto"/>
      </section>}
      <header className="nav-wrap">
        <a href="#home" className="logo" aria-label="Revenge Gym, torna all'inizio"><img src="/brand/revenge-gym-logo.png" alt="Revenge Gym" /></a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Apri menu" aria-expanded={menuOpen}><i></i><i></i></button>
        <nav className={menuOpen ? "open" : ""} aria-label="Navigazione principale">
          {[['La palestra','filosofia'],['Aree','corsi'],['Attrezzatura','attrezzatura'],['Boxe','boxe'],['Gallery','gallery'],['Contatti','contatti']].map(([label,id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}
          <a className="nav-cta" href="#prova" onClick={() => setMenuOpen(false)}>Prova gratuita <span>↗</span></a>
        </nav>
      </header>

      <section className="hero" id="home">
        <div className="hero-media" role="img" aria-label="Atleta che si allena in palestra"></div>
        <div className="hero-shade"></div>
        <div className="hero-content reveal">
          <p className="eyebrow"><span></span> Sala pesi · Ladispoli</p>
          <h1>NON CERCARE<br/>SCUSE. <em>CREA</em><br/>LA TUA <em>RIVINCITA.</em></h1>
          <p className="hero-copy">Una palestra completa, attrezzature di qualità e l’ambiente giusto per allenarti con costanza e superare ogni limite.</p>
          <div className="hero-actions">
            <a href="#prova" className="button primary">Prenota una prova gratuita <span>↗</span></a>
            <a href="#corsi" className="text-link">Scopri la palestra <span>↓</span></a>
          </div>
        </div>
        <div className="hero-stats">
          <div><strong>4</strong><span>Brand premium</span></div><div><strong>100%</strong><span>Allenamento</span></div><div><strong>1</strong><span>Grande community</span></div>
        </div>
        <a href="#filosofia" className="scroll-cue" aria-label="Scorri alla sezione successiva">SCROLL <span>↓</span></a>
      </section>

      <section className="section philosophy" id="filosofia">
        <div className="section-index">01 — FILOSOFIA</div>
        <div className="philosophy-copy reveal">
          <p className="eyebrow"><span></span> Il nostro metodo</p>
          <h2>LA PALESTRA DOVE<br/>CAMBI DAVVERO.</h2>
          <p className="lead">Spazi curati, attrezzature di alto livello e una community che condivide la voglia di migliorarsi.</p>
          <p>Revenge Gym è una palestra completa a Ladispoli, pensata per chi vuole allenarsi seriamente in un ambiente pulito, accogliente e professionale. La sala dispone di macchinari Panatta, Hammer Strength, Life Fitness e Precor.</p>
          <a href="#contatti" className="text-link orange">Conosci la nostra community <span>↗</span></a>
        </div>
        <div className="philosophy-image reveal">
          <img src="/media/sala-attrezzi.webp" alt="Vista panoramica della sala attrezzi di Revenge Gym" loading="lazy" />
          <div className="quote"><span>“</span><p>Non devi essere già in forma per iniziare. Devi solo decidere di iniziare.</p></div>
        </div>
        <div className="real-gym-strip reveal" aria-label="Foto reali di Revenge Gym">
          <figure><img src="/photos/revenge-gym-02.jpg" alt="Allenamento ai cavi nella sala di Revenge Gym" loading="lazy"/><figcaption>Allenamento in sala</figcaption></figure>
          <div className="real-gym-caption"><small>REVENGE GYM · LADISPOLI</small><strong>QUESTA È<br/>LA NOSTRA<br/><em>PALESTRA.</em></strong></div>
          <figure><img src="/photos/revenge-gym-05.jpg" alt="Esercizio con macchinario nella sala pesi di Revenge Gym" loading="lazy"/><figcaption>Spazi reali, risultati reali</figcaption></figure>
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
          {courses.map((course, i) => <article className="course-card reveal" key={course.title}>
            <img src={course.image} alt={course.title} loading="lazy" />
            <div className="course-overlay"></div><span className="course-number">0{i+1}</span>
            <div className="course-content"><span className="course-icon">{course.icon}</span><small>{course.tag}</small><h3>{course.title}</h3><p>{course.text}</p><a href="#prova" aria-label={`Prova ${course.title}`}>Scopri il corso <span>↗</span></a></div>
          </article>)}
        </div>
      </section>

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

      <section className="boxing-section" id="boxe">
        <div className="boxing-media reveal"><img src="/media/ring-boxe.webp" alt="Ring e sala boxe di Revenge Gym" loading="lazy"/><span>RING · SACCHI · TECNICA</span></div>
        <div className="boxing-copy reveal">
          <p className="eyebrow"><span></span> Area Boxe</p>
          <h2>SALI SUL RING.<br/><em>TIRA FUORI IL CARATTERE.</em></h2>
          <p className="lead">Revenge Gym non è solo sala pesi: dispone anche di un’area dedicata alla boxe con ring e sacchi.</p>
          <p>Uno spazio pensato per allenare tecnica, coordinazione, resistenza e sicurezza. Contattaci per conoscere modalità di allenamento e disponibilità.</p>
          <a href="#contatti" className="button primary">Informazioni sulla boxe <span>↗</span></a>
        </div>
      </section>

      <section className="gallery-section" id="gallery">
        <div className="gallery-title reveal"><p className="eyebrow"><span></span> Dentro Revenge Gym</p><h2>SUDORE. ENERGIA.<br/><em>RISULTATI.</em></h2></div>
        <div className="gallery-grid">
          {gallery.map(([src, alt], i) => <figure className={`gallery-item g${i+1} reveal`} key={src}><img src={src} alt={alt} loading="lazy"/><figcaption>{alt}<span>↗</span></figcaption></figure>)}
        </div>
      </section>

      <section className="trial" id="prova">
        <div className="trial-inner reveal"><p className="eyebrow"><span></span> Il primo passo è gratuito</p><h2>LA TUA RIVINCITA<br/>INIZIA <em>OGGI.</em></h2><p>Vieni a conoscere gli spazi e le attrezzature di Revenge Gym. Chiamaci per organizzare la tua prima visita.</p><a href="#contatti" className="button primary">Contatta la palestra <span>↗</span></a></div>
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
          <span className="form-kicker">PRENOTA LA PROVA GRATUITA</span><h3>Pronto a iniziare?</h3>
          <label>Nome e cognome<input required name="name" placeholder="Il tuo nome" /></label>
          <div className="form-row"><label>Email<input required type="email" name="email" placeholder="nome@email.it" /></label><label>Telefono<input required type="tel" name="phone" placeholder="+39" /></label></div>
          <label>Area di interesse<select name="course" defaultValue=""><option value="" disabled>Seleziona un’area</option>{[...courses.map(c => c.title), 'Boxe'].map(area => <option key={area}>{area}</option>)}</select></label>
          <label>Messaggio<textarea name="message" placeholder="Raccontaci il tuo obiettivo..."></textarea></label>
          <label className="privacy"><input required type="checkbox" /> <span>Accetto il trattamento dei dati personali.</span></label>
          <button className="button primary" type="submit">Invia la richiesta <span>↗</span></button>
          {sent && <p className="success" role="status">Richiesta ricevuta! Ti ricontatteremo al più presto.</p>}
        </form>
      </section>

      <footer><a href="#home" className="logo" aria-label="Revenge Gym, torna all'inizio"><img src="/brand/revenge-gym-logo.png" alt="Revenge Gym" /></a><p>Sala pesi · Ladispoli</p><p>© 2026 Revenge Gym. Tutti i diritti riservati.</p><a href="#home" className="back-top" aria-label="Torna all'inizio">↑</a></footer>
    </main>
  );
}
