import SiteImage from "@/app/components/site-image";
import LegalIdentity from "@/app/components/legal-identity";
import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";
import MobileSwipeBack from "@/app/components/mobile-swipe-back";
import RingGallery, { type RingPhoto } from "./ring-gallery";

const safariInline = { "webkit-playsinline": "true" } as const;

export const metadata: Metadata = {
  title: "Boxe a Ladispoli | Ring e area sacchi · Revenge Gym",
  description: "Scopri l’area Boxe di Revenge Gym a Ladispoli: ring, sacchi, spazio tecnico, preparazione e immagini reali della sala.",
  alternates: { canonical: "/boxe/" },
  keywords: ["boxe Ladispoli", "palestra boxe Ladispoli", "ring boxe", "sacchi boxe", "Revenge Gym"],
  openGraph: {
    title: "Revenge Boxing · Il ring non mente",
    description: "Ring, sacchi, tecnica e carattere nell’area Boxe di Revenge Gym a Ladispoli.",
    images: [{ url: "/photos/boxe/ring-revenge.jpg", alt: "Ring dell’area Boxe di Revenge Gym" }],
  },
};

const gallery: RingPhoto[] = [
  { src: "/photos/boxe/ring-gallery/ring-15.webp", label: "Il lavoro dal corner", round: "15", variant: "landscape", featured: true },
  { src: "/photos/boxe/ring-gallery/ring-01.webp", label: "In guardia sul ring", round: "01", variant: "portrait", featured: true },
  { src: "/photos/boxe/ring-gallery/ring-14.webp", label: "Allenamento tecnico", round: "14", variant: "landscape", featured: true },
  { src: "/photos/boxe/ring-gallery/ring-10.webp", label: "Atmosfera da match", round: "10", variant: "landscape", featured: true },
  { src: "/photos/boxe/ring-gallery/ring-02.webp", label: "Pronti al gong", round: "02", variant: "square" },
  { src: "/photos/boxe/ring-gallery/ring-03.webp", label: "Focus e controllo", round: "03", variant: "portrait" },
  { src: "/photos/boxe/ring-gallery/ring-04.webp", label: "Dentro le corde", round: "04", variant: "portrait" },
  { src: "/photos/boxe/ring-gallery/ring-05.webp", label: "Il corner", round: "05", variant: "landscape" },
  { src: "/photos/boxe/ring-gallery/ring-06.webp", label: "Sul ring", round: "06", variant: "portrait" },
  { src: "/photos/boxe/ring-gallery/ring-07.webp", label: "Colpi al sacco", round: "07", variant: "portrait" },
  { src: "/photos/boxe/ring-gallery/ring-08.webp", label: "Tecnica e ritmo", round: "08", variant: "portrait" },
  { src: "/photos/boxe/ring-gallery/ring-09.webp", label: "Sotto fatica", round: "09", variant: "portrait" },
  { src: "/photos/boxe/ring-gallery/ring-11.webp", label: "Tra un round e l’altro", round: "11", variant: "portrait" },
  { src: "/photos/boxe/ring-gallery/ring-12.webp", label: "Presenza sul ring", round: "12", variant: "portrait" },
  { src: "/photos/boxe/ring-gallery/ring-13.webp", label: "Carattere Revenge", round: "13", variant: "portrait" },
];

const pillars = [
  ["01", "TECNICA", "Guardia, spostamenti, combinazioni e precisione: ogni dettaglio costruisce un gesto più pulito e consapevole."],
  ["02", "CONDIZIONAMENTO", "Fiato, ritmo, coordinazione e capacità di restare presenti quando l’intensità sale."],
  ["03", "CARATTERE", "Costanza, disciplina e controllo. La boxe allena il corpo, ma pretende soprattutto attenzione e rispetto."],
] as const;

export default function BoxePage() {
  return (
    <main className={styles.page}>
      <MobileSwipeBack />
      <header className={styles.nav}>
        <Link className={styles.logo} href="/?skipIntro=1#home" aria-label="Revenge Gym home">
          <SiteImage src="/brand/revenge-gym-logo.png" alt="Revenge Gym" />
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
          <a className={styles.primary} href="#spazio">Scopri lo spazio <span>↓</span></a>
          <div className={styles.fpiBadge} aria-label="Revenge Gym affiliata alla Federazione Pugilistica Italiana">
            <SiteImage src="/photos/boxe/fpi-logo-rotondo-grande.jpg" alt="Federazione Pugilistica Italiana" />
            <div><strong>AFFILIATA FPI</strong></div>
          </div>
          <figure className={styles.heroPhoto}>
            <SiteImage
              src="/photos/live/gino-corner-bono.webp"
              alt="Corner Revenge Boxing: istruzioni tra un round e l’altro"
              loading="eager"
              decoding="async"
            />
          </figure>
        </div>
        <div className={styles.heroFacts}>
          <div><strong>01</strong><span>Ring</span></div>
          <div><strong>02</strong><span>Area sacchi</span></div>
          <div><strong>03</strong><span>Spazio tecnico</span></div>
        </div>
      </section>

      <div className={styles.marquee} aria-hidden="true">
        <div className={styles.marqueeTrack}>
          <span>TECNICA · RITMO · DISCIPLINA · CONTROLLO · CARATTERE · REVENGE BOXING · </span>
          <span>TECNICA · RITMO · DISCIPLINA · CONTROLLO · CARATTERE · REVENGE BOXING · </span>
        </div>
      </div>

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
        <figure className={styles.spaceMain}><SiteImage src="/photos/boxe/sala-ring-sacchi.jpg" alt="Sala boxe di Revenge Gym con ring e sacchi"/><figcaption>La sala · Ring e area sacchi</figcaption></figure>
        <figure><SiteImage src="/photos/boxe/ring-revenge.jpg" alt="Ring Revenge Boxing"/><figcaption>Il ring</figcaption></figure>
        <figure><SiteImage src="/photos/boxe/sala-sacchi.jpg" alt="Sacchi dell’area boxe di Revenge Gym"/><figcaption>Lo spazio tecnico</figcaption></figure>
      </section>

      <section className={styles.method} id="metodo">
        <SiteImage
          className={styles.methodAthlete}
          src="/photos/boxe/atleta-pugile-guardia-v2.webp"
          alt="Pugile in guardia, area Boxe Revenge Gym"
          loading="lazy"
          decoding="async"
        />
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
        <div className={styles.videoHead}>
          <SiteImage
            className={styles.videoAthlete}
            src="/photos/boxe/atleta-pugile-pugno.webp"
            alt="Pugile in azione, Revenge Boxing"
            loading="lazy"
            decoding="async"
          />
          <div className={styles.videoIntro}>
            <div>
              <p className={styles.eyebrow}><span /> Guarda lo spazio</p>
              <h2>DENTRO<br/><em>REVENGE BOXING.</em></h2>
            </div>
            <p>Tre sguardi reali dentro Revenge Boxing: la sala, il ring e l’energia del lavoro tecnico in azione.</p>
          </div>
        </div>
        <div className={styles.videoGrid}>
          <article><div className={styles.player}><video controls playsInline {...safariInline} preload="metadata" poster="/photos/boxe/sala-ring-sacchi.jpg"><source src="/media/boxe/tour-sala-sacchi.mp4" type="video/mp4"/></video></div><div><span>01 · TOUR</span><h3>LA SALA E I SACCHI.</h3></div></article>
          <article><div className={styles.player}><video controls playsInline {...safariInline} preload="metadata" poster="/photos/boxe/ring-revenge.jpg"><source src="/media/boxe/tour-ring.mp4" type="video/mp4"/></video></div><div><span>02 · RING</span><h3>DENTRO LE CORDE.</h3></div></article>
          <article className={styles.videoPortrait}><div className={styles.player}><video controls playsInline {...safariInline} preload="metadata" poster="/media/boxe-ring-non-mente-poster.jpg"><source src="/media/boxe-ring-non-mente.mp4" type="video/mp4"/></video></div><div><span>03 · IN AZIONE</span><h3>IL RING NON MENTE.</h3></div></article>
        </div>
      </section>

      <section className={styles.corner}>
        <figure><SiteImage src="/photos/boxe/corner-bono-bianco-nero.jpg" alt="Boxeur e uomo del corner dopo un incontro"/></figure>
        <div>
          <p className={styles.eyebrow}><span /> Identità</p>
          <h2>IL CORNER.<br/><em>LA PRESENZA.</em></h2>
          <p className={styles.lead}>La boxe non è mai soltanto il momento del colpo. È ascolto, preparazione, esperienza e fiducia costruita round dopo round.</p>
          <p>Ogni immagine dal ring porta con sé lavoro invisibile: sedute, correzioni, fatica, recupero e la lucidità necessaria per restare concentrati.</p>
        </div>
        <figure className={styles.cornerColor}><SiteImage src="/photos/boxe/corner-bono.jpg" alt="Boxeur con il suo corner dopo il combattimento"/></figure>
      </section>

      <section className={styles.gallery} id="gallery">
        <div className={styles.galleryHead}>
          <div><p className={styles.eyebrow}><span /> Dentro Revenge Boxing</p><h2>FOTO DAL RING.<br/><em>NESSUNA POSA.</em></h2></div>
          <p>La sala, il lavoro, gli atleti e il corner. Scorri round dopo round: niente posa, solo l’energia vera di Revenge Boxing.</p>
        </div>
        <SiteImage
          className={styles.galleryAthlete}
          src="/photos/boxe/atleta-pugile-jab.webp"
          alt="Pugile in jab, Revenge Boxing"
          loading="lazy"
          decoding="async"
        />
        <RingGallery photos={gallery} />
      </section>

      <section className={styles.cta}>
        <div><p className={styles.eyebrow}><span /> Informazioni</p><h2>VUOI CONOSCERE<br/><em>L’AREA BOXE?</em></h2><p>Vieni a vedere dal vivo il ring, i sacchi e lo spazio Revenge Boxing.</p></div>
        <Link className={styles.primary} href="/?skipIntro=1#contatti">Chiedi informazioni <span>↗</span></Link>
      </section>

      <footer className={styles.footer}>
        <Link className={styles.logo} href="/?skipIntro=1#home"><SiteImage src="/brand/revenge-gym-logo.png" alt="Revenge Gym"/></Link>
        <p>Via Berna, 8 · Ladispoli RM</p>
        <p className="footer-legal">
          <LegalIdentity />
        </p>
        <a href="#top" aria-label="Torna in alto">↑</a>
      </footer>
    </main>
  );
}
