"use client";

import SiteImage from "@/app/components/site-image";
import LegalIdentity from "@/app/components/legal-identity";
import NelloCredit from "@/app/components/nello-credit";
import { useEffect, useState } from "react";
import Link from "next/link";
import MobileSwipeBack from "@/app/components/mobile-swipe-back";
import { bodyZones } from "@/lib/body-zones";
import type { Machine, MachineArea, MachineZone } from "@/lib/machines";

type Props = {
  area: MachineArea;
  areaLabel: string;
  machines: Machine[];
  zone: MachineZone;
  styles: Record<string, string>;
  athleteSrc: string;
  athleteAlt: string;
  catalogIntro: string;
  ctaEm: string;
  ctaText: string;
};

export default function MachineHub({
  area,
  areaLabel,
  machines,
  zone,
  styles,
  athleteSrc,
  athleteAlt,
  catalogIntro,
  ctaEm,
  ctaText,
}: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [zonesOpen, setZonesOpen] = useState(false);
  const singleMachine = machines.length === 1;
  const loop = singleMachine ? machines : [...machines, ...machines];
  const closeMenu = () => {
    setZonesOpen(false);
    setMenuOpen(false);
  };

  useEffect(() => {
    document.body.classList.toggle("menu-lock", menuOpen);
    return () => document.body.classList.remove("menu-lock");
  }, [menuOpen]);

  return (
    <main className={styles.page} id="top">
      <MobileSwipeBack />
      <header className={styles.nav}>
        <Link href="/?skipIntro=1#home" className={styles.logo} aria-label="Revenge Gym, home">
          <SiteImage src="/brand/revenge-gym-logo.png" alt="Revenge Gym" />
        </Link>
        <button
          className={styles.menuToggle}
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Chiudi menu" : "Apri menu"}
        >
          <i></i>
          <i></i>
        </button>
        <nav className={menuOpen ? styles.open : ""} aria-label={`Menu allenamento ${areaLabel.toLowerCase()}`}>
          <Link className={styles.siteLink} href="/?skipIntro=1#filosofia" onClick={() => setMenuOpen(false)}>
            La palestra
          </Link>
          <Link className={styles.siteLink} href="/?skipIntro=1#corsi" onClick={() => setMenuOpen(false)}>
            Aree
          </Link>
          <div className={`${styles.zoneMenu} ${zonesOpen ? styles.zoneOpen : ""}`}>
            <button type="button" className={styles.zoneTrigger} aria-expanded={zonesOpen} onClick={() => setZonesOpen(!zonesOpen)}>
              Per gruppi muscolari <span>▾</span>
            </button>
            <div className={styles.zonePanel} role="menu">
              <div className={styles.zonePanelInner}>
                {bodyZones.map((zoneItem) => (
                  <Link key={zoneItem.label} href={zoneItem.href} role="menuitem" onClick={closeMenu}>
                    {zoneItem.label}
                  </Link>
                ))}
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
        <SiteImage className={styles.heroAthlete} src={athleteSrc} alt={athleteAlt} />
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>
            <span></span> {zone.eyebrow}
          </p>
          <h1>
            {zone.heroTitle[0]}
            <br />
            {zone.heroTitle[1]}
            <br />
            <em>{zone.heroTitle[2]}</em>
          </h1>
          <p>{zone.heroLead}</p>
          <div className={styles.heroMeta}>
            <div>
              <strong>{String(machines.length).padStart(2, "0")}</strong>
              <span>Macchine in area</span>
            </div>
            <div>
              <strong>01</strong>
              <span>{singleMachine ? "Apri la scheda" : "Scorri · apri la scheda"}</span>
            </div>
          </div>
        </div>
        <div className={styles.marqueeWrap} aria-label={`Galleria macchine ${areaLabel.toLowerCase()}`}>
          {!singleMachine && <p className={styles.marqueeHint}>Scorri · tocca per la scheda</p>}
          <div className={`${styles.marquee}${singleMachine && styles.marqueeStatic ? ` ${styles.marqueeStatic}` : ""}`}>
            <div className={styles.marqueeTrack}>
              {loop.map((machine, index) => (
                <Link
                  key={`${machine.id}-${index}`}
                  href={`/macchine/${area}/${machine.id}`}
                  className={styles.marqueeCard}
                  aria-label={`${machine.name} · ${machine.brand}`}
                >
                  <SiteImage src={machine.image} alt="" />
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
            {zone.manifestoTitle[0]}
            <br />
            <em>{zone.manifestoTitle[1]}</em>
          </h2>
        </div>
        <div className={styles.manifestoText}>
          {zone.manifesto.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className={styles.index} id="elenco">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>
            <span></span> {singleMachine ? "In questa area" : "Catalogo completo"}
          </p>
          <h2>
            {singleMachine ? (
              <>
                LA MACCHINA
                <br />
                <em>DELL’AREA.</em>
              </>
            ) : (
              <>
                SCEGLI LA
                <br />
                <em>MACCHINA.</em>
              </>
            )}
          </h2>
          <p>{catalogIntro}</p>
        </div>
        <div className={styles.grid}>
          {machines.map((machine) => (
            <Link key={machine.id} href={`/macchine/${area}/${machine.id}`} className={styles.gridCard}>
              <div className={styles.gridMedia}>
                <SiteImage src={machine.image} alt="" />
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
          <em>{ctaEm}</em>
        </h2>
        <p>{ctaText}</p>
        <Link href="/?skipIntro=1#contatti" className={styles.primary}>
          Chiedi info <span>↗</span>
        </Link>
      </section>

      <footer className={styles.footer}>
        <Link href="/?skipIntro=1#home" className={styles.logo} aria-label="Revenge Gym home">
          <SiteImage src="/brand/revenge-gym-logo.png" alt="Revenge Gym" />
        </Link>
        <p>Allenamento · {areaLabel} · Ladispoli</p>
        <p className={styles.footerLegal}>
          <LegalIdentity />
          <NelloCredit className={styles.byNello} />
        </p>
        <a href="#top" className={styles.backTop} aria-label="Torna su">
          ↑
        </a>
      </footer>
    </main>
  );
}
