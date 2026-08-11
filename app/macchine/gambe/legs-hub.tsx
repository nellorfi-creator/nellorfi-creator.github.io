"use client";

import { useState } from "react";
import Link from "next/link";
import { legMachines, legZone } from "@/lib/leg-machines";
import styles from "./page.module.css";
import MobileSwipeBack from "@/app/components/mobile-swipe-back";

const bodyZones = [
  { label: "Gambe", href: "/macchine/gambe", ready: true },
  { label: "Petto", href: "/macchine/petto", ready: true },
  { label: "Dorso", href: "#", ready: false },
  { label: "Spalle", href: "#", ready: false },
  { label: "Braccia", href: "#", ready: false },
];

export default function LegsHub() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [zonesOpen, setZonesOpen] = useState(false);
  const loop = [...legMachines, ...legMachines];

  return (
    <main className={styles.page} id="top">
      <MobileSwipeBack />
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
            <button type="button" className={styles.zoneTrigger} aria-expanded={zonesOpen} onClick={() => setZonesOpen(!zonesOpen)}>
              Per zona <span>▾</span>
            </button>
            <div className={styles.zonePanel} role="menu">
              <div className={styles.zonePanelInner}>
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
          </div>
          <Link className={styles.siteLink} href="/nuove-macchine" onClick={() => setMenuOpen(false)}>
            Nuove macchine
          </Link>
          <Link href="/?skipIntro=1#contatti" className={styles.contact} onClick={() => setMenuOpen(false)}>
            Chiedi info <span>↗</span>
          </Link>
        </nav>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroShade} aria-hidden="true"></div>
        <img className={styles.heroAthlete} src="/photos/athletes/gambe-athlete-hero.webp" alt="Atleta dedicata all’allenamento delle gambe" />
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>
            <span></span> {legZone.eyebrow}
          </p>
          <h1>
            {legZone.heroTitle[0]}
            <br />
            {legZone.heroTitle[1]}
            <br />
            <em>{legZone.heroTitle[2]}</em>
          </h1>
          <p>{legZone.heroLead}</p>
          <div className={styles.heroMeta}>
            <div>
              <strong>{String(legMachines.length).padStart(2, "0")}</strong>
              <span>Macchine in area</span>
            </div>
            <div>
              <strong>01</strong>
              <span>Passa · pausa · click</span>
            </div>
          </div>
        </div>

        <div className={styles.marqueeWrap} aria-label="Galleria macchine gambe">
          <p className={styles.marqueeHint}>Scorri con lo sguardo · ferma al passaggio · click per la scheda</p>
          <div className={styles.marquee}>
            <div className={styles.marqueeTrack}>
              {loop.map((machine, index) => (
                <Link
                  key={`${machine.id}-${index}`}
                  href={`/macchine/gambe/${machine.id}`}
                  className={styles.marqueeCard}
                  aria-label={`${machine.name} · ${machine.brand}`}
                >
                  <img src={machine.image} alt="" />
                  <span>
                    <small>{machine.brand}</small>
                    <b>{machine.name}</b>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.manifesto} id="qualita">
        <div className={styles.manifestoCopy}>
          <p className={styles.eyebrow}>
            <span></span> Perché Revenge
          </p>
          <h2>
            {legZone.manifestoTitle[0]}
            <br />
            <em>{legZone.manifestoTitle[1]}</em>
          </h2>
        </div>
        <div className={styles.manifestoText}>
          {legZone.manifesto.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className={styles.index} id="elenco">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>
            <span></span> Catalogo completo
          </p>
          <h2>
            SCEGLI LA
            <br />
            <em>MACCHINA.</em>
          </h2>
          <p>
            Ventuno postazioni fotografate in sala per gli arti inferiori. Brand professionali, testi tecnici corposo, focus su chi allena per qualità — non per trovare l’abbonamento più basso della zona.
          </p>
        </div>
        <div className={styles.grid}>
          {legMachines.map((machine) => (
            <Link key={machine.id} href={`/macchine/gambe/${machine.id}`} className={styles.gridCard}>
              <div className={styles.gridMedia}>
                <img src={machine.image} alt="" />
              </div>
              <div className={styles.gridBody}>
                <span>{machine.number}</span>
                <small>{machine.brand}</small>
                <strong>{machine.name}</strong>
                <p>{machine.tagline}</p>
                <i>{machine.category} ↘</i>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.cta}>
        <p className={styles.eyebrow}>
          <span></span> In sala
        </p>
        <h2>
          LEGGERE AIUTA.
          <br />
          <em>SPINGERE CAMBIA TUTTO.</em>
        </h2>
        <p>Vieni a Revenge Gym e costruisci la tua progressione gambe con lo staff.</p>
        <Link href="/?skipIntro=1#contatti" className={styles.primary}>
          Chiedi info <span>↗</span>
        </Link>
      </section>

      <footer className={styles.footer}>
        <Link href="/?skipIntro=1#home" className={styles.logo} aria-label="Revenge Gym home">
          <img src="/brand/revenge-gym-logo.png" alt="Revenge Gym" />
        </Link>
        <p>Allenamento · Gambe · Ladispoli</p>
        <p className={styles.footerLegal}>
          <span>© 2026 Revenge Gym</span>
          <span className={styles.byNello} style={{ textTransform: "none" }}>© by nello 2026</span>
        </p>
        <a href="#top" className={styles.backTop} aria-label="Torna su">
          ↑
        </a>
      </footer>
    </main>
  );
}
