"use client";

import SiteImage from "@/app/components/site-image";
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
  const lightboxRef = useRef<HTMLDivElement>(null);
  const lightboxCloseRef = useRef<HTMLButtonElement>(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const featured = photos.filter((p) => p.featured);
  const strip = photos.filter((p) => !p.featured);

  const syncActive = useCallback((index: number) => {
    activeRef.current = index;
    setActive(index);
  }, []);

  const getClosestIndex = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 0;
    const cards = Array.from(track.children) as HTMLElement[];
    if (!cards.length) return 0;

    const trackCenter = track.getBoundingClientRect().left + track.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;

    cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const dist = Math.abs(rect.left + rect.width / 2 - trackCenter);
      if (dist < bestDist) {
        bestDist = dist;
        best = index;
      }
    });

    return best;
  }, []);

  const scrollTo = useCallback(
    (index: number) => {
      const track = trackRef.current;
      if (!track) return;

      const clamped = Math.max(0, Math.min(strip.length - 1, index));
      const card = track.children[clamped] as HTMLElement | undefined;
      if (!card) return;

      const trackRect = track.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      // Posizione assoluta rispetto allo scroll: centra la card nel viewport del track.
      const target =
        track.scrollLeft + (cardRect.left - trackRect.left) - (track.clientWidth - cardRect.width) / 2;
      const maxLeft = Math.max(0, track.scrollWidth - track.clientWidth);
      const nextLeft = Math.max(0, Math.min(maxLeft, target));

      syncActive(clamped);
      track.scrollTo({ left: nextLeft, behavior: "smooth" });
    },
    [strip.length, syncActive],
  );

  const goPrev = useCallback(() => {
    // Usa il massimo: a fine strip lo stato può dire "ultima" mentre il centro
    // geometrico è ancora sulla penultima — così indietro parte sempre dal punto UI.
    scrollTo(Math.max(activeRef.current, getClosestIndex()) - 1);
  }, [getClosestIndex, scrollTo]);

  const goNext = useCallback(() => {
    scrollTo(Math.max(activeRef.current, getClosestIndex()) + 1);
  }, [getClosestIndex, scrollTo]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        syncActive(getClosestIndex());
      });
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    syncActive(getClosestIndex());
    return () => track.removeEventListener("scroll", onScroll);
  }, [getClosestIndex, strip.length, syncActive]);

  useEffect(() => {
    if (lightbox === null) return;
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    lightboxCloseRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightbox(null);
      if (event.key === "ArrowRight") setLightbox((i) => (i === null ? null : (i + 1) % photos.length));
      if (event.key === "ArrowLeft") setLightbox((i) => (i === null ? null : (i - 1 + photos.length) % photos.length));
      if (event.key === "Tab" && lightboxRef.current) {
        const focusable = Array.from(lightboxRef.current.querySelectorAll<HTMLButtonElement>("button:not([disabled])"));
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      previouslyFocused?.focus();
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
                <SiteImage src={photo.src} alt="" loading={i === 0 ? "eager" : "lazy"} decoding="async" />
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
          <button type="button" onClick={goPrev} disabled={active === 0} aria-label="Round precedente">
            ←
          </button>
          <button type="button" onClick={goNext} disabled={active === strip.length - 1} aria-label="Round successivo">
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
                <SiteImage src={photo.src} alt="" loading="lazy" decoding="async" />
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
        <div ref={lightboxRef} className={styles.lightbox} role="dialog" aria-modal="true" aria-label="Anteprima foto dal ring" onClick={() => setLightbox(null)}>
          <button ref={lightboxCloseRef} type="button" className={styles.lightboxClose} onClick={() => setLightbox(null)} aria-label="Chiudi">
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
            <SiteImage src={photos[lightbox].src} alt={photos[lightbox].label} />
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
