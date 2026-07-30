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

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [introVisible, setIntroVisible] = useState(true);
  const [introClosing, setIntroClosing] = useState(false);
  const [introSound, setIntroSound] = useState(false);
  const introAudioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("visible")), { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = introVisible ? "hidden" : "";
    if (!introVisible) return;
    const closingTimer = window.setTimeout(() => setIntroClosing(true), 10500);
    const exitTimer = window.setTimeout(() => {
      introAudioRef.current?.pause();
      setIntroVisible(false);
    }, 11200);
    return () => {
      window.clearTimeout(closingTimer);
      window.clearTimeout(exitTimer);
      document.body.style.overflow = "";
    };
  }, [introVisible]);

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

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
    event.currentTarget.reset();
  };

  return (
    <main>
      {introVisible && <section className={`intro-screen${introClosing ? " is-closing" : ""}`} aria-label="Presentazione Revenge Gym">
        <div className="intro-backdrop" role="img" aria-label="Atleta durante un allenamento intenso"></div>
        <div className="intro-shade"></div>
        <div className="intro-logo logo"><span>R</span> REVENGE <b>GYM</b></div>
        <button className={`intro-audio${introSound ? " active" : ""}`} type="button" onClick={toggleIntroSound} aria-pressed={introSound}>
          <i>{introSound ? "▮▮" : "▶"}</i> {introSound ? "Musica attiva" : "Attiva musica"}
        </button>
        <div className="intro-content">
          <p className="intro-kicker"><span></span> Ladispoli · Sala pesi · Boxe</p>
          <h2>LA TUA<br/><em>RIVINCITA</em><br/>INIZIA QUI.</h2>
          <p>Forza. Disciplina. Carattere.</p>
          <button className="button primary" type="button" onClick={closeIntro}>Entra nella palestra <span>↗</span></button>
        </div>
        <button className="intro-skip" type="button" onClick={closeIntro}>Salta intro →</button>
        <div className="intro-progress" aria-hidden="true"><span></span></div>
        <audio ref={introAudioRef} src="/media/revenge-gym-tour.mp4" loop preload="auto"/>
      </section>}
      <header className="nav-wrap">
        <a href="#home" className="logo" aria-label="Revenge Gym, torna all'inizio"><span>R</span> REVENGE <b>GYM</b></a>
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
          {['PANATTA','HAMMER STRENGTH','LIFE FITNESS','PRECOR'].map((brand, i) => <div key={brand}><span>0{i+1}</span><strong>{brand}</strong><small>Performance equipment</small></div>)}
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
          <div className="map-placeholder"><iframe title="Mappa di Revenge Gym a Ladispoli" loading="lazy" src="https://www.google.com/maps?q=Via%20Berna%208%2C%2000055%20Ladispoli%20RM&output=embed"></iframe></div>
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

      <footer><a href="#home" className="logo"><span>R</span> REVENGE <b>GYM</b></a><p>Sala pesi · Ladispoli</p><p>© 2026 Revenge Gym. Tutti i diritti riservati.</p><a href="#home" className="back-top" aria-label="Torna all'inizio">↑</a></footer>
    </main>
  );
}
