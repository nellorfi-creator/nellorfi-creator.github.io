"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { legMachines, legZone, muscleMap, sampleSession } from "@/lib/leg-machines";
import styles from "./page.module.css";

const bodyZones = [
  { label: "Gambe", href: "/macchine/gambe", ready: true },
  { label: "Petto", href: "#", ready: false },
  { label: "Dorso", href: "#", ready: false },
  { label: "Spalle", href: "#", ready: false },
  { label: "Braccia", href: "#", ready: false },
];

export default function LegsShowcase() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [zonesOpen, setZonesOpen] = useState(false);
  const [active, setActive] = useState(legMachines[0].id);

  useEffect(() => {
    const onScroll = () => {
      const current = legMachines.find((machine) => {
        const el = document.getElementById(machine.id);
        if (!el) return false;
        const box = el.getBoundingClientRect();
        return box.top <= 180 && box.bottom > 180;
      });
      if (current) setActive(current.id);
    };
    const onHash = () => {
      const id = window.location.hash.slice(1);
      if (legMachines.some((m) => m.id === id)) {
        setActive(id);
        document.getElementById(id)?.scrollIntoView();
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("hashchange", onHash);
    onHash();
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", onHash);
    };
  }, []);

  return (
    <main className={styles.page} id="top">
      <header className={styles.nav}>
        <Link href="/?skipIntro=1#home" className={styles.logo} aria-label="Revenge Gym, home">
          <img src="/brand/revenge-gym-logo.png" alt="Revenge Gym" />
        </Link>
        <button
          className={styles.menuToggle}
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Apri menu"
        >
          <i></i>
          <i></i>
        </button>
        <nav className={menuOpen ? styles.open : ""} aria-label="Menu allenamento gambe">
          <Link className={styles.siteLink} href="/?skipIntro=1#filosofia" onClick={() => setMenuOpen(false)}>
            La palestra
          </Link>
          <Link className={styles.siteLink} href="/?skipIntro=1#corsi" onClick={() => setMenuOpen(false)}>
            Aree
          </Link>
          <div className={`${styles.zoneMenu} ${zonesOpen ? styles.zoneOpen : ""}`}>
            <button
              type="button"
              className={styles.zoneTrigger}
              aria-expanded={zonesOpen}
              onClick={() => setZonesOpen(!zonesOpen)}
            >
              Per zona <span>▾</span>
            </button>
            <div className={styles.zonePanel} role="menu">
              {bodyZones.map((zone) =>
                zone.ready ? (
                  <Link key={zone.label} href={zone.href} role="menuitem" onClick={() => { setZonesOpen(false); setMenuOpen(false); }}>
                    {zone.label}
                  </Link>
                ) : (
                  <span key={zone.label} className={styles.zoneSoon} role="menuitem" aria-disabled="true">
                    {zone.label} <i>presto</i>
                  </span>
                ),
              )}
            </div>
          </div>
          <Link className={styles.siteLink} href="/nuove-macchine" onClick={() => setMenuOpen(false)}>
            Nuove macchine
          </Link>
          <span className={styles.navDivider} aria-hidden="true"></span>
          {legMachines.map((machine) => (
            <a
              key={machine.id}
              href={`#${machine.id}`}
              className={active === machine.id ? styles.active : ""}
              onClick={() => {
                setActive(machine.id);
                setMenuOpen(false);
              }}
            >
              {machine.number}
            </a>
          ))}
          <Link href="/?skipIntro=1#contatti" className={styles.contact} onClick={() => setMenuOpen(false)}>
            Chiedi info <span>↗</span>
          </Link>
        </nav>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroMedia} aria-hidden="true"></div>
        <div className={styles.heroShade}></div>
        <div className={styles.heroGlow} aria-hidden="true"></div>
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>
            <span></span> {legZone.eyebrow}
          </p>
          <h1>
            COSTRUISCI
            <br />
            LE TUE
            <br />
            <em>GAMBE.</em>
          </h1>
          <p>{legZone.heroLead}</p>
          <div className={styles.heroActions}>
            <a href="#macchine" className={styles.primary}>
              Vedi le macchine <span>↓</span>
            </a>
            <a href="#sessione" className={styles.ghost}>
              Schema di seduta
            </a>
          </div>
        </div>
        <div className={styles.heroStats}>
          <div>
            <strong>04</strong>
            <span>Macchine dedicate</span>
          </div>
          <div>
            <strong>03</strong>
            <span>Già in sala</span>
          </div>
          <div>
            <strong>01</strong>
            <span>In arrivo</span>
          </div>
        </div>
      </section>

      <section className={styles.intro}>
        <div className={styles.introCopy}>
          <p className={styles.eyebrow}>
            <span></span> Perché questa zona
          </p>
          <h2>
            NON È SOLO
            <br />
            <em>CARICO.</em>
          </h2>
          <p>{legZone.intro}</p>
        </div>
        <div className={styles.muscleMap}>
          {muscleMap.map((item) => (
            <article key={item.code}>
              <span>{item.code}</span>
              <strong>{item.name}</strong>
              <p>{item.role}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.index} id="macchine">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>
            <span></span> Selezione Revenge
          </p>
          <h2>
            MACCHINE
            <br />
            <em>GAMBE.</em>
          </h2>
          <p>
            Quattro postazioni selezionate dal catalogo in sala. Ogni scheda include ruolo allenante, cue tecnici e
            indicazioni di programmazione. Le gallery fotografiche dal vivo saranno collegate quando arriveranno gli
            scatti del team.
          </p>
        </div>
        <div className={styles.machineGrid}>
          {legMachines.map((machine) => (
            <a
              key={machine.id}
              href={`#${machine.id}`}
              className={`${styles.machineCard} ${machine.incoming ? styles.incomingCard : ""}`}
            >
              <div className={styles.cardMedia}>
                <img src={machine.image} alt="" />
              </div>
              <div className={styles.cardBody}>
                <span>{machine.number}</span>
                <small>{machine.brand}</small>
                <strong>{machine.name}</strong>
                <p>{machine.tagline}</p>
                <i>{machine.status} ↘</i>
              </div>
            </a>
          ))}
        </div>
      </section>

      {legMachines.map((machine) => (
        <article
          key={machine.id}
          className={`${styles.profile} ${machine.incoming ? styles.incomingProfile : ""}`}
          id={machine.id}
        >
          <div className={styles.profileHero}>
            <div className={styles.profileCopy}>
              <span>
                {machine.number} · {machine.status.toUpperCase()}
              </span>
              <small>{machine.brand}</small>
              <h2>
                {machine.name.includes(" ") ? (
                  <>
                    {machine.name.split(" ").slice(0, -1).join(" ")}
                    <br />
                    <em>{machine.name.split(" ").slice(-1)}.</em>
                  </>
                ) : (
                  <em>{machine.name}.</em>
                )}
              </h2>
              <p>{machine.tagline}</p>
              <b>{machine.focus}</b>
            </div>
            <figure className={styles.productPhoto}>
              <img src={machine.image} alt={machine.alt} />
              <figcaption>{machine.brand} · riferimento prodotto</figcaption>
            </figure>
          </div>

          <div className={styles.profileBody}>
            <section className={styles.leadSection}>
              <p>{machine.lead}</p>
              <div className={styles.focusBadge}>
                <span>FOCUS ALLENANTE</span>
                <strong>{machine.focus}</strong>
              </div>
            </section>

            <div className={styles.contentGrid}>
              <section>
                <small>01 · MUSCOLI</small>
                <h3>
                  COSA LAVORA
                  <br />
                  DAVVERO.
                </h3>
                <div className={styles.dualList}>
                  <div>
                    <b>PRINCIPALI</b>
                    {machine.primaryMuscles.map((item) => (
                      <p key={item}>{item}</p>
                    ))}
                  </div>
                  <div>
                    <b>IN ASSISTENZA</b>
                    {machine.secondaryMuscles.map((item) => (
                      <p key={item}>{item}</p>
                    ))}
                  </div>
                </div>
              </section>
              <section className={styles.darkPanel}>
                <small>02 · RUOLO IN SALA</small>
                <h3>
                  DOVE SI
                  <br />
                  INSERISCE.
                </h3>
                <ul>
                  {machine.trainingRole.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            </div>

            <div className={styles.contentGrid}>
              <section className={styles.accentPanel}>
                <small>03 · CUE TECNICI</small>
                <h3>
                  ESECUZIONE
                  <br />
                  PROFESSIONALE.
                </h3>
                <ul>
                  {machine.cues.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
              <section>
                <small>04 · PROGRAMMAZIONE</small>
                <h3>
                  COME USARLA
                  <br />
                  NELLA SETTIMANA.
                </h3>
                <ul>
                  {machine.programming.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            </div>

            <div className={styles.contentGrid}>
              <section className={styles.errorPanel}>
                <small>05 · ERRORI DA EVITARE</small>
                <h3>
                  CONTROLLO,
                  <br />
                  NON FRETTA.
                </h3>
                <ul>
                  {machine.errors.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
              <section className={styles.gallerySlot}>
                <small>06 · GALLERY IN SALA</small>
                <h3>
                  FOTO
                  <br />
                  <em>IN ARRIVO.</em>
                </h3>
                <p>{machine.galleryNote}</p>
                <div className={styles.galleryPlaceholders} aria-hidden="true">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </section>
            </div>

            <section className={styles.trainer}>
              <div>
                <small>CONSIGLI DEL TRAINER</small>
                <h3>
                  QUALITÀ PRIMA
                  <br />
                  <em>DEL CARICO.</em>
                </h3>
              </div>
              <blockquote>“{machine.trainer}”</blockquote>
            </section>
          </div>
        </article>
      ))}

      <section className={styles.session} id="sessione">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>
            <span></span> Esempio di seduta
          </p>
          <h2>
            UN GIORNO
            <br />
            <em>GAMBE.</em>
          </h2>
          <p>
            Schema indicativo per chi allena gli arti inferiori con le macchine Revenge. Adatta serie, carichi e
            recuperi al tuo livello — e chiedi allo staff se stai riprendendo dopo un fermo o un infortunio.
          </p>
        </div>
        <div className={styles.sessionGrid}>
          {sampleSession.map((block) => (
            <article key={block.step}>
              <span>{block.step}</span>
              <strong>{block.title}</strong>
              <p>{block.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.cta}>
        <p className={styles.eyebrow}>
          <span></span> Provalo in sala
        </p>
        <h2>
          LEGGERE AIUTA.
          <br />
          <em>SPINGERE CAMBIA TUTTO.</em>
        </h2>
        <p>Vieni a Revenge Gym e fai costruire la tua progressione gambe con lo staff.</p>
        <Link href="/?skipIntro=1#contatti" className={styles.primary}>
          Chiedi info <span>↗</span>
        </Link>
      </section>

      <footer className={styles.footer}>
        <Link href="/?skipIntro=1#home" className={styles.logo} aria-label="Revenge Gym home">
          <img src="/brand/revenge-gym-logo.png" alt="Revenge Gym" />
        </Link>
        <p>Allenamento · Gambe · Ladispoli</p>
        <p>© 2026 Revenge Gym</p>
        <a href="#top" className={styles.backTop} aria-label="Torna su">
          ↑
        </a>
      </footer>
    </main>
  );
}
