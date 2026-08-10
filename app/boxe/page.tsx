import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Boxe a Ladispoli | Ring e area sacchi · Revenge Gym",
  description: "Scopri l’area Boxe di Revenge Gym a Ladispoli: ring, sacchi, spazio tecnico, preparazione e immagini reali della sala.",
  keywords: ["boxe Ladispoli", "palestra boxe Ladispoli", "ring boxe", "sacchi boxe", "Revenge Gym"],
  openGraph: {
    title: "Revenge Boxing · Il ring non mente",
    description: "Ring, sacchi, tecnica e carattere nell’area Boxe di Revenge Gym a Ladispoli.",
    images: [{ url: "/photos/boxe/ring-revenge.jpg", alt: "Ring dell’area Boxe di Revenge Gym" }],
  },
};

const gallery = [
  ["/photos/boxe/ring-revenge.jpg", "Il ring Revenge"],
  ["/photos/live/boxe-sacco-jab.webp", "Colpi al sacco"],
  ["/photos/boxe/sala-ring-sacchi.jpg", "La sala completa"],
  ["/photos/live/boxe-coach-ring.webp", "Il lavoro dal corner"],
  ["/photos/boxe/sala-sacchi.jpg", "Area sacchi"],
  ["/photos/live/boxe-allenamento.webp", "Allenamento tecnico"],
  ["/photos/live/boxe-cintura.webp", "Esperienza sul ring"],
  ["/photos/boxe/corner-bono-bianco-nero.jpg", "Il corner"],
  ["/photos/live/boxe-corner.webp", "Tra un round e l’altro"],
  ["/photos/live/boxe-evento.webp", "Atmosfera da match"],
  ["/photos/live/boxe-team-lauro.webp", "Team Lauro Boxe"],
  ["/photos/boxe/corner-bono.jpg", "Dopo il combattimento"],
  ["/photos/live/boxe-ring-extra.webp", "Dentro le corde"],
  ["/photos/live/boxe-allenamento-extra.webp", "Seduta di boxe"],
  ["/photos/live/boxe-team-extra.webp", "Squadra e carattere"],
] as const;

const pillars = [
  ["01", "TECNICA", "Guardia, spostamenti, combinazioni e precisione: ogni dettaglio costruisce un gesto più pulito e consapevole."],
  ["02", "CONDIZIONAMENTO", "Fiato, ritmo, coordinazione e capacità di restare presenti quando l’intensità sale."],
  ["03", "CARATTERE", "Costanza, disciplina e controllo. La boxe allena il corpo, ma pretende soprattutto attenzione e rispetto."],
] as const;

export default function BoxePage() {
  return (
    <main className={styles.page}>
      <header className={styles.nav}>
        <Link className={styles.logo} href="/?skipIntro=1#home" aria-label="Revenge Gym home">
          <img src="/brand/revenge-gym-logo.png" alt="Revenge Gym" />
        </Link>
        <nav aria-label="Navigazione Boxe">
          <Link className={styles.homeLink} href="/?skipIntro=1#home">Torna alla home</Link>
          <a href="#spazio">Lo spazio</a>
          <a href="#metodo">Il metodo</a>
          <a href="#video">Video</a>
          <a href="#gallery">Gallery</a>
          <Link className={styles.back} href="/?skipIntro=1#contatti">Chiedi info <span>↗</span></Link>
        </nav>
      </header>

      <section className={styles.hero} id="top">
        <div className={styles.heroMedia} aria-hidden="true" />
        <div className={styles.heroShade} aria-hidden="true" />
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}><span /> Revenge Boxing · Ladispoli</p>
          <h1>IL RING<br/><em>NON MENTE.</em></h1>
          <p className={styles.heroLead}>Qui non contano le scorciatoie. Contano presenza, tecnica e carattere.</p>
          <a className={styles.primary} href="#spazio">Entra nell’area Boxe <span>↓</span></a>
        </div>
        <div className={styles.fpiBadge} aria-label="Revenge Gym affiliata alla Federazione Pugilistica Italiana">
          <img src="/photos/boxe/fpi-logo.jpg" alt="Federazione Pugilistica Italiana" />
          <div><small>Affiliazione ufficiale</small><strong>AFFILIATA FPI</strong></div>
        </div>
        <div className={styles.heroFacts}>
          <div><strong>01</strong><span>Ring</span></div>
          <div><strong>02</strong><span>Area sacchi</span></div>
          <div><strong>03</strong><span>Spazio tecnico</span></div>
        </div>
      </section>

      <div className={styles.marquee} aria-hidden="true"><span>TECNICA · RITMO · DISCIPLINA · CONTROLLO · CARATTERE · REVENGE BOXING · </span></div>

      <section className={styles.manifesto} id="spazio">
        <div>
          <p className={styles.eyebrow}><span /> Uno spazio vero</p>
          <h2>NON UN ANGOLO.<br/><em>UNA SALA BOXE.</em></h2>
        </div>
        <div className={styles.manifestoCopy}>
          <p className={styles.lead}>Revenge Gym non è soltanto sala pesi. Al suo interno vive un’area distinta, costruita intorno a ring, sacchi e spazio per il lavoro tecnico.</p>
          <p>È un ambiente in cui allenare coordinazione, condizionamento e qualità del gesto. Il ring dà una direzione; i sacchi permettono di trasformare intenzione e tecnica in ritmo, precisione e continuità.</p>
        </div>
      </section>

      <section className={styles.spaceShowcase}>
        <figure className={styles.spaceMain}><img src="/photos/boxe/sala-ring-sacchi.jpg" alt="Sala boxe di Revenge Gym con ring e sacchi"/><figcaption>La sala · Ring e area sacchi</figcaption></figure>
        <figure><img src="/photos/boxe/ring-revenge.jpg" alt="Ring Revenge Boxing"/><figcaption>Il ring</figcaption></figure>
        <figure><img src="/photos/boxe/sala-sacchi.jpg" alt="Sacchi dell’area boxe di Revenge Gym"/><figcaption>Lo spazio tecnico</figcaption></figure>
      </section>

      <section className={styles.method} id="metodo">
        <div className={styles.methodHead}>
          <p className={styles.eyebrow}><span /> Il lavoro</p>
          <h2>OGNI ROUND<br/><em>HA UNO SCOPO.</em></h2>
          <p>La boxe è ripetizione intelligente: si costruiscono fondamentali, si affina il controllo e si impara a mantenere qualità anche sotto fatica.</p>
        </div>
        <div className={styles.pillars}>
          {pillars.map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>

      <section className={styles.videos} id="video">
        <div className={styles.videoIntro}>
          <p className={styles.eyebrow}><span /> Guarda lo spazio</p>
          <h2>DENTRO<br/><em>REVENGE BOXING.</em></h2>
          <p>Tre sguardi reali dentro Revenge Boxing: la sala, il ring e l’energia del lavoro tecnico in azione.</p>
        </div>
        <div className={styles.videoGrid}>
          <article><div className={styles.player}><video controls playsInline preload="metadata" poster="/photos/boxe/sala-ring-sacchi.jpg"><source src="/media/boxe/tour-sala-sacchi.mp4" type="video/mp4"/></video></div><div><span>01 · TOUR</span><h3>LA SALA E I SACCHI.</h3></div></article>
          <article><div className={styles.player}><video controls playsInline preload="metadata" poster="/photos/boxe/ring-revenge.jpg"><source src="/media/boxe/tour-ring.mp4" type="video/mp4"/></video></div><div><span>02 · RING</span><h3>DENTRO LE CORDE.</h3></div></article>
          <article><div className={styles.player}><video controls playsInline preload="metadata" poster="/media/boxe-ring-non-mente-poster.jpg"><source src="/media/boxe-ring-non-mente.mp4" type="video/mp4"/></video></div><div><span>03 · IN AZIONE</span><h3>IL RING NON MENTE.</h3></div></article>
        </div>
      </section>

      <section className={styles.corner}>
        <figure><img src="/photos/boxe/corner-bono-bianco-nero.jpg" alt="Boxeur e uomo del corner dopo un incontro"/></figure>
        <div>
          <p className={styles.eyebrow}><span /> Identità</p>
          <h2>IL CORNER.<br/><em>LA PRESENZA.</em></h2>
          <p className={styles.lead}>La boxe non è mai soltanto il momento del colpo. È ascolto, preparazione, esperienza e fiducia costruita round dopo round.</p>
          <p>Ogni immagine dal ring porta con sé lavoro invisibile: sedute, correzioni, fatica, recupero e la lucidità necessaria per restare concentrati.</p>
        </div>
        <figure className={styles.cornerColor}><img src="/photos/boxe/corner-bono.jpg" alt="Boxeur con il suo corner dopo il combattimento"/></figure>
      </section>

      <section className={styles.gallery} id="gallery">
        <div className={styles.galleryHead}>
          <div><p className={styles.eyebrow}><span /> Dentro Revenge Boxing</p><h2>FOTO DAL RING.<br/><em>NESSUNA POSA.</em></h2></div>
          <p>La sala, il lavoro, gli atleti e il corner. Immagini reali di un’identità che fa parte di Revenge Gym.</p>
        </div>
        <div className={styles.galleryGrid}>
          {gallery.map(([src, label], index) => <figure className={index === 0 || index === 5 || index === 10 ? styles.wide : ""} key={src}><img src={src} alt={label} loading="lazy"/><figcaption><span>{String(index + 1).padStart(2,"0")}</span>{label}</figcaption></figure>)}
        </div>
      </section>

      <section className={styles.cta}>
        <div><p className={styles.eyebrow}><span /> Informazioni</p><h2>VUOI CONOSCERE<br/><em>L’AREA BOXE?</em></h2><p>Vieni a vedere dal vivo il ring, i sacchi e lo spazio Revenge Boxing.</p></div>
        <Link className={styles.primary} href="/?skipIntro=1#contatti">Chiedi informazioni <span>↗</span></Link>
      </section>

      <footer className={styles.footer}>
        <Link className={styles.logo} href="/?skipIntro=1#home"><img src="/brand/revenge-gym-logo.png" alt="Revenge Gym"/></Link>
        <p>Via Berna, 8 · Ladispoli RM</p>
        <p>© 2026 Revenge Gym</p>
        <a href="#top" aria-label="Torna in alto">↑</a>
      </footer>
    </main>
  );
}
