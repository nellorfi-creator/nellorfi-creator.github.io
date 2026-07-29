"use client";

import { FormEvent, useEffect, useState } from "react";

const courses = [
  { icon: "↗", title: "Functional Training", tag: "Forza · Resistenza", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=85", text: "Classi coinvolgenti e scalabili per diventare più forte, veloce e resistente, qualunque sia il tuo livello." },
  { icon: "＋", title: "Weightlifting", tag: "Tecnica · Potenza", image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1200&q=85", text: "Tecnica, controllo e potenza. Impara i sollevamenti olimpici con una progressione seguita dai nostri coach." },
  { icon: "⌁", title: "Open Box", tag: "Il tuo ritmo", image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1200&q=85", text: "Il tuo spazio per allenarti in autonomia, perfezionare le skill e seguire una programmazione personale." },
  { icon: "◎", title: "Personal Training", tag: "Obiettivi · Metodo", image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=1200&q=85", text: "Un percorso individuale costruito sui tuoi obiettivi, con attenzione totale a tecnica, recupero e risultati." },
];

const schedule = {
  Lun: ["07:00 — Functional", "13:00 — Open Box", "18:00 — Functional", "19:00 — Weightlifting", "20:00 — Functional"],
  Mar: ["07:00 — Functional", "13:00 — Open Box", "18:00 — Weightlifting", "19:00 — Functional", "20:00 — Functional"],
  Mer: ["07:00 — Functional", "13:00 — Open Box", "18:00 — Functional", "19:00 — Weightlifting", "20:00 — Functional"],
  Gio: ["07:00 — Functional", "13:00 — Open Box", "18:00 — Weightlifting", "19:00 — Functional", "20:00 — Functional"],
  Ven: ["07:00 — Functional", "13:00 — Open Box", "18:00 — Functional", "19:00 — Weightlifting", "20:00 — Team WOD"],
  Sab: ["09:00 — Functional", "10:00 — Team WOD", "11:00 — Open Box"],
};

const gallery = [
  ["https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=85", "Allenamento funzionale di gruppo"],
  ["https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=1200&q=85", "Atleta durante un workout"],
  ["https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?auto=format&fit=crop&w=1200&q=85", "Allenamento con kettlebell"],
  ["https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=1200&q=85", "Spazio attrezzato del box"],
  ["https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?auto=format&fit=crop&w=1200&q=85", "Workout ad alta intensità"],
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDay, setActiveDay] = useState<keyof typeof schedule>("Lun");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("visible")), { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
    event.currentTarget.reset();
  };

  return (
    <main>
      <header className="nav-wrap">
        <a href="#home" className="logo" aria-label="Revenge Box, torna all'inizio"><span>R</span> REVENGE <b>BOX</b></a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Apri menu" aria-expanded={menuOpen}><i></i><i></i></button>
        <nav className={menuOpen ? "open" : ""} aria-label="Navigazione principale">
          {[['Filosofia','filosofia'],['Corsi','corsi'],['Orari','orari'],['Gallery','gallery'],['Contatti','contatti']].map(([label,id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}
          <a className="nav-cta" href="#prova" onClick={() => setMenuOpen(false)}>Prova gratuita <span>↗</span></a>
        </nav>
      </header>

      <section className="hero" id="home">
        <div className="hero-media" role="img" aria-label="Atleta che si allena in palestra"></div>
        <div className="hero-shade"></div>
        <div className="hero-content reveal">
          <p className="eyebrow"><span></span> Functional training · Ladispoli</p>
          <h1>NON CERCARE<br/>SCUSE. <em>CREA</em><br/>LA TUA <em>RIVINCITA.</em></h1>
          <p className="hero-copy">Più di un allenamento. Un metodo, una community e il posto giusto per superare ogni limite.</p>
          <div className="hero-actions">
            <a href="#prova" className="button primary">Prenota una prova gratuita <span>↗</span></a>
            <a href="#corsi" className="text-link">Scopri i corsi <span>↓</span></a>
          </div>
        </div>
        <div className="hero-stats">
          <div><strong>4</strong><span>Discipline</span></div><div><strong>6/7</strong><span>Giorni attivi</span></div><div><strong>100%</strong><span>Community</span></div>
        </div>
        <a href="#filosofia" className="scroll-cue" aria-label="Scorri alla sezione successiva">SCROLL <span>↓</span></a>
      </section>

      <section className="section philosophy" id="filosofia">
        <div className="section-index">01 — FILOSOFIA</div>
        <div className="philosophy-copy reveal">
          <p className="eyebrow"><span></span> Il nostro metodo</p>
          <h2>IL BOX DOVE<br/>CAMBI DAVVERO.</h2>
          <p className="lead">Qui non sei un numero. Sei parte di una squadra che si allena, cresce e festeggia ogni progresso insieme.</p>
          <p>Revenge Box nasce per creare un’esperienza di allenamento completa: coaching attento, programmazione intelligente e un ambiente autentico dove sentirti subito a casa. Ogni workout è adattabile, ogni obiettivo è personale.</p>
          <a href="#contatti" className="text-link orange">Conosci la nostra community <span>↗</span></a>
        </div>
        <div className="philosophy-image reveal">
          <img src="https://images.unsplash.com/photo-1526401485004-2aa7c67f9c33?auto=format&fit=crop&w=1400&q=85" alt="Community che si allena insieme" loading="lazy" />
          <div className="quote"><span>“</span><p>Non devi essere già in forma per iniziare. Devi solo decidere di iniziare.</p></div>
        </div>
      </section>

      <section className="section courses" id="corsi">
        <div className="section-heading reveal">
          <div><p className="eyebrow"><span></span> Trova il tuo workout</p><h2>ALLENATI.<br/><em>EVOLVI.</em></h2></div>
          <p>Quattro modi di allenarti. Un solo obiettivo: portarti oltre quello che pensavi possibile.</p>
        </div>
        <div className="course-grid">
          {courses.map((course, i) => <article className="course-card reveal" key={course.title}>
            <img src={course.image} alt={course.title} loading="lazy" />
            <div className="course-overlay"></div><span className="course-number">0{i+1}</span>
            <div className="course-content"><span className="course-icon">{course.icon}</span><small>{course.tag}</small><h3>{course.title}</h3><p>{course.text}</p><a href="#prova" aria-label={`Prova ${course.title}`}>Scopri il corso <span>↗</span></a></div>
          </article>)}
        </div>
      </section>

      <section className="section schedule-section" id="orari">
        <div className="section-heading reveal"><div><p className="eyebrow"><span></span> Planning settimanale</p><h2>IL TUO MOMENTO.<br/><em>OGNI GIORNO.</em></h2></div><p>Scegli la classe più adatta ai tuoi ritmi. I posti sono limitati per garantirti coaching e qualità.</p></div>
        <div className="schedule reveal">
          <div className="day-tabs" role="tablist" aria-label="Giorni della settimana">
            {(Object.keys(schedule) as Array<keyof typeof schedule>).map(day => <button key={day} role="tab" aria-selected={activeDay === day} className={activeDay === day ? "active" : ""} onClick={() => setActiveDay(day)}>{day}</button>)}
          </div>
          <div className="class-list" role="tabpanel">
            {schedule[activeDay].map((item, i) => { const [time, name] = item.split(" — "); return <div className="class-row" key={item}><span className="class-time">{time}</span><strong>{name}</strong><span className="availability">{i === 1 ? "Open training" : "Posti disponibili"}</span><a href="#prova" aria-label={`Prenota ${name} alle ${time}`}>Prenota <b>↗</b></a></div> })}
          </div>
        </div>
        <p className="schedule-note">* Planning dimostrativo. Contattaci per confermare gli orari aggiornati.</p>
      </section>

      <section className="gallery-section" id="gallery">
        <div className="gallery-title reveal"><p className="eyebrow"><span></span> Dentro il box</p><h2>SUDORE. ENERGIA.<br/><em>RISULTATI.</em></h2></div>
        <div className="gallery-grid">
          {gallery.map(([src, alt], i) => <figure className={`gallery-item g${i+1} reveal`} key={src}><img src={src} alt={alt} loading="lazy"/><figcaption>{alt}<span>↗</span></figcaption></figure>)}
        </div>
      </section>

      <section className="trial" id="prova">
        <div className="trial-inner reveal"><span className="outline-word">REVEN</span><p className="eyebrow"><span></span> Il primo passo è gratuito</p><h2>LA TUA RIVINCITA<br/>INIZIA <em>OGGI.</em></h2><p>Vieni a conoscerci, prova un allenamento e scopri cosa significa davvero far parte di Revenge Box.</p><a href="#contatti" className="button light">Prenota la tua prova <span>↗</span></a></div>
      </section>

      <section className="section contact" id="contatti">
        <div className="contact-info reveal">
          <p className="eyebrow"><span></span> Parliamone</p><h2>CI VEDIAMO<br/>AL <em>BOX.</em></h2>
          <div className="info-list">
            <div><small>Dove siamo</small><p>Via da definire, Ladispoli (RM)</p><a href="https://maps.google.com/?q=Ladispoli" target="_blank" rel="noreferrer">Apri in Google Maps ↗</a></div>
            <div><small>Contatti</small><p><a href="tel:+390000000000">+39 000 000 0000</a><br/><a href="mailto:info@revengebox.it">info@revengebox.it</a></p></div>
            <div><small>Seguici</small><p className="socials"><a href="https://www.facebook.com/search/top?q=revengebox" target="_blank" rel="noreferrer">Facebook ↗</a><a href="#">Instagram ↗</a></p></div>
          </div>
          <div className="map-placeholder"><iframe title="Mappa di Ladispoli" loading="lazy" src="https://www.google.com/maps?q=Ladispoli%2C%20RM&output=embed"></iframe></div>
        </div>
        <form className="contact-form reveal" onSubmit={submitForm}>
          <span className="form-kicker">PRENOTA LA PROVA GRATUITA</span><h3>Pronto a iniziare?</h3>
          <label>Nome e cognome<input required name="name" placeholder="Il tuo nome" /></label>
          <div className="form-row"><label>Email<input required type="email" name="email" placeholder="nome@email.it" /></label><label>Telefono<input required type="tel" name="phone" placeholder="+39" /></label></div>
          <label>Corso di interesse<select name="course" defaultValue=""><option value="" disabled>Seleziona un corso</option>{courses.map(c => <option key={c.title}>{c.title}</option>)}</select></label>
          <label>Messaggio<textarea name="message" placeholder="Raccontaci il tuo obiettivo..."></textarea></label>
          <label className="privacy"><input required type="checkbox" /> <span>Accetto il trattamento dei dati personali.</span></label>
          <button className="button primary" type="submit">Invia la richiesta <span>↗</span></button>
          {sent && <p className="success" role="status">Richiesta ricevuta! Ti ricontatteremo al più presto.</p>}
        </form>
      </section>

      <footer><a href="#home" className="logo"><span>R</span> REVENGE <b>BOX</b></a><p>Functional training · Ladispoli</p><p>© 2026 Revenge Box. Tutti i diritti riservati.</p><a href="#home" className="back-top" aria-label="Torna all'inizio">↑</a></footer>
    </main>
  );
}
