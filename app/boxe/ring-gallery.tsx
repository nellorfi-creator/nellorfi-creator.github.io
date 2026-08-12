"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./ring-gallery.module.css";

export type RingPhoto = {
  src: string;
  label: string;
  round: string;
  variant: "portrait" | "landscape" | "square";
  featured?: boolean;
};

type RingGalleryProps = {
  photos: RingPhoto[];
};

export default function RingGallery({ photos }: RingGalleryProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const featured = photos.filter((p) => p.featured);
  const strip = photos.filter((p) => !p.featured);

  const scrollTo = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[index] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const cards = Array.from(track.children) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
            const idx = cards.indexOf(entry.target as HTMLElement);
            if (idx >= 0) setActive(idx);
          }
        }
      },
      { root: track, threshold: [0.55, 0.75] },
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [strip.length]);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightbox(null);
      if (event.key === "ArrowRight") setLightbox((i) => (i === null ? null : (i + 1) % photos.length));
      if (event.key === "ArrowLeft") setLightbox((i) => (i === null ? null : (i - 1 + photos.length) % photos.length));
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, photos.length]);

  const openLightbox = (globalIndex: number) => setLightbox(globalIndex);

  return (
    <div className={styles.wrap} data-swipe-lock>
      {featured.length > 0 && (
        <div className={styles.heroBento} aria-hidden={false}>
          {featured.map((photo, i) => {
            const globalIndex = photos.indexOf(photo);
            return (
              <button
                key={photo.src}
                type="button"
                className={`${styles.heroTile} ${styles[`hero${i + 1}`]} ${styles[photo.variant]}`}
                onClick={() => openLightbox(globalIndex)}
                aria-label={`${photo.label}, round ${photo.round}`}
              >
                <img src={photo.src} alt="" loading={i === 0 ? "eager" : "lazy"} decoding="async" />
                <span className={styles.heroRound}>{photo.round}</span>
                <span className={styles.heroLabel}>{photo.label}</span>
              </button>
            );
          })}
        </div>
      )}

      <div className={styles.stripHead}>
        <div className={styles.stripMeta}>
          <span className={styles.stripKicker}>Round by round</span>
          <strong>{String(active + 1).padStart(2, "0")}</strong>
          <span className={styles.stripSep}>/</span>
          <span>{String(strip.length).padStart(2, "0")}</span>
        </div>
        <div className={styles.stripNav}>
          <button type="button" onClick={() => scrollTo(Math.max(0, active - 1))} disabled={active === 0} aria-label="Round precedente">
            ←
          </button>
          <button type="button" onClick={() => scrollTo(Math.min(strip.length - 1, active + 1))} disabled={active === strip.length - 1} aria-label="Round successivo">
            →
          </button>
        </div>
      </div>

      <div className={styles.perforation} aria-hidden="true">
        {Array.from({ length: 28 }).map((_, i) => (
          <span key={i} />
        ))}
      </div>

      <div className={styles.track} ref={trackRef} data-swipe-lock>
        {strip.map((photo, index) => {
          const globalIndex = photos.indexOf(photo);
          return (
            <button
              key={photo.src}
              type="button"
              className={`${styles.card} ${styles[photo.variant]} ${index === active ? styles.cardActive : ""} ${index % 2 === 1 ? styles.cardStagger : ""}`}
              onClick={() => openLightbox(globalIndex)}
              aria-label={`${photo.label}, round ${photo.round}`}
              aria-current={index === active ? "true" : undefined}
            >
              <span className={styles.cardRound} aria-hidden="true">
                {photo.round}
              </span>
              <div className={styles.cardFrame}>
                <img src={photo.src} alt="" loading="lazy" decoding="async" />
              </div>
              <span className={styles.cardTape} aria-hidden="true" />
              <figcaption>
                <span>R{photo.round}</span>
                {photo.label}
              </figcaption>
            </button>
          );
        })}
      </div>

      <div className={styles.progress} aria-hidden="true">
        {strip.map((photo, index) => (
          <button
            key={photo.src}
            type="button"
            className={index === active ? styles.progressActive : ""}
            onClick={() => scrollTo(index)}
            aria-label={`Vai al round ${photo.round}`}
          />
        ))}
      </div>

      {lightbox !== null && (
        <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label="Anteprima foto dal ring" onClick={() => setLightbox(null)}>
          <button type="button" className={styles.lightboxClose} onClick={() => setLightbox(null)} aria-label="Chiudi">
            ×
          </button>
          <button
            type="button"
            className={styles.lightboxPrev}
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((i) => (i === null ? null : (i - 1 + photos.length) % photos.length));
            }}
            aria-label="Foto precedente"
          >
            ←
          </button>
          <figure onClick={(e) => e.stopPropagation()}>
            <img src={photos[lightbox].src} alt={photos[lightbox].label} />
            <figcaption>
              <span>ROUND {photos[lightbox].round}</span>
              {photos[lightbox].label}
            </figcaption>
          </figure>
          <button
            type="button"
            className={styles.lightboxNext}
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((i) => (i === null ? null : (i + 1) % photos.length));
            }}
            aria-label="Foto successiva"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}
