"use client";

import { useState } from "react";
import Link from "next/link";
import type { LegMachine } from "@/lib/leg-machines";
import MobileSwipeBack from "@/app/components/mobile-swipe-back";
import styles from "./page.module.css";

const bodyZones = [
  { label: "Gambe", href: "/macchine/gambe", ready: true },
  { label: "Petto", href: "/macchine/petto", ready: true },
  { label: "Dorso", href: "#", ready: false },
  { label: "Spalle", href: "#", ready: false },
  { label: "Braccia", href: "#", ready: false },
];

type Props = { machine: LegMachine; prev: LegMachine; next: LegMachine };

export default function ChestMachineDetail({ machine, prev, next }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [zonesOpen, setZonesOpen] = useState(false);
  const nameParts = machine.name.split(" ");
  const last = nameParts.pop() ?? machine.name;
  const first = nameParts.join(" ");

  return (
    <main className={styles.page} id="top">
      <MobileSwipeBack />
      <header className={styles.nav}>
        <Link href="/?skipIntro=1#home" className={styles.logo} aria-label="Revenge Gym, home"><img src="/brand/revenge-gym-logo.png" alt="Revenge Gym" /></Link>
        <button className={styles.menuToggle} type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Apri menu"><i></i><i></i></button>
        <nav className={menuOpen ? styles.open : ""} aria-label="Menu scheda macchina petto">
          <Link className={styles.siteLink} href="/macchine/petto" onClick={() => setMenuOpen(false)}>← Petto</Link>
          <div className={`${styles.zoneMenu} ${zonesOpen ? styles.zoneOpen : ""}`}>
            <button type="button" className={styles.zoneTrigger} aria-expanded={zonesOpen} onClick={() => setZonesOpen(!zonesOpen)}>Per zona <span>▾</span></button>
            <div className={styles.zonePanel} role="menu"><div className={styles.zonePanelInner}>
              {bodyZones.map((zone) => zone.ready ? <Link key={zone.label} href={zone.href} role="menuitem" onClick={() => { setZonesOpen(false); setMenuOpen(false); }}>{zone.label}</Link> : <span key={zone.label} className={styles.zoneSoon} role="menuitem" aria-disabled="true">{zone.label} <i>presto</i></span>)}
            </div></div>
          </div>
          <Link className={styles.siteLink} href="/nuove-macchine" onClick={() => setMenuOpen(false)}>Nuove macchine</Link>
          <Link href="/?skipIntro=1#contatti" className={styles.contact} onClick={() => setMenuOpen(false)}>Chiedi info <span>↗</span></Link>
        </nav>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroCopy}><span>{machine.number} · {machine.category.toUpperCase()}</span><small>{machine.brand}</small><h1>{first ? <>{first}<br /><em>{last}.</em></> : <em>{last}.</em>}</h1><p>{machine.tagline}</p><b>{machine.focus}</b></div>
        <figure className={styles.heroPhoto}><img src={machine.image} alt={machine.alt} /><figcaption>Revenge Gym · Ladispoli</figcaption></figure>
      </section>

      <div className={styles.body}>
        <section className={styles.brandBlock}><small>01 · LA MACCHINA</small><h2>PERCHÉ QUESTA<br /><em>POSTAZIONE.</em></h2>{machine.brandNote.map((paragraph) => <p key={paragraph.slice(0, 48)}>{paragraph}</p>)}</section>
        <section className={styles.leadBlock}><small>02 · ALLENAMENTO PETTO</small><h2>COME SI USA<br /><em>IN SALA.</em></h2>{machine.lead.map((paragraph) => <p key={paragraph.slice(0, 48)}>{paragraph}</p>)}</section>
        <section className={styles.qualityBlock}><small>STANDARD REVENGE</small><h2>QUALITÀ,<br /><em>NON PREZZO.</em></h2><p>{machine.qualityEdge}</p></section>
        <div className={styles.grid2}>
          <section><small>03 · MUSCOLI</small><h3>COSA LAVORA<br />DAVVERO.</h3><div className={styles.dual}><div><b>PRINCIPALI</b>{machine.primaryMuscles.map((item) => <p key={item}>{item}</p>)}</div><div><b>IN ASSISTENZA</b>{machine.secondaryMuscles.map((item) => <p key={item}>{item}</p>)}</div></div></section>
          <section className={styles.dark}><small>04 · RUOLO</small><h3>DOVE SI<br />INSERISCE.</h3><ul>{machine.trainingRole.map((item) => <li key={item}>{item}</li>)}</ul></section>
        </div>
        <div className={styles.grid2}>
          <section className={styles.accent}><small>05 · CUE TECNICI</small><h3>ESECUZIONE<br />PROFESSIONALE.</h3><ul>{machine.cues.map((item) => <li key={item}>{item}</li>)}</ul></section>
          <section><small>06 · PROGRAMMAZIONE</small><h3>COME USARLA<br />NELLA SETTIMANA.</h3><ul>{machine.programming.map((item) => <li key={item}>{item}</li>)}</ul></section>
        </div>
        <div className={styles.grid2}>
          <section className={styles.error}><small>07 · ERRORI</small><h3>CONTROLLO,<br />NON FRETTA.</h3><ul>{machine.errors.map((item) => <li key={item}>{item}</li>)}</ul></section>
          <section className={styles.trainer}><small>CONSIGLI DEL TRAINER</small><blockquote>“{machine.trainer}”</blockquote></section>
        </div>
      </div>

      <nav className={styles.pager} aria-label="Altre macchine petto">
        <Link href={`/macchine/petto/${prev.id}`}><span>← Precedente</span><strong>{prev.name}</strong></Link>
        <Link href="/macchine/petto" className={styles.pagerHome}>Tutto il petto</Link>
        <Link href={`/macchine/petto/${next.id}`} className={styles.pagerNext}><span>Successiva →</span><strong>{next.name}</strong></Link>
      </nav>
      <footer className={styles.footer}><Link href="/?skipIntro=1#home" className={styles.logo} aria-label="Revenge Gym home"><img src="/brand/revenge-gym-logo.png" alt="Revenge Gym" /></Link><p>{machine.brand} · Petto</p><p className={styles.footerLegal}><span>© 2026 Revenge Gym</span><span className={styles.byNello} style={{ textTransform: "none" }}>© by nello 2026</span></p></footer>
    </main>
  );
}
