"use client";

import { type RefObject, useEffect } from "react";

type ViewportVideoOptions = {
  paused?: boolean;
  threshold?: number;
  volume?: number;
  playbackRate?: number;
};

export function useViewportVideo(
  ref: RefObject<HTMLVideoElement | null>,
  { paused = false, threshold = 0.18, volume, playbackRate }: ViewportVideoOptions = {},
) {
  useEffect(() => {
    const video = ref.current;
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    if (volume !== undefined) video.volume = volume;
    if (playbackRate !== undefined) video.playbackRate = playbackRate;

    let inView = false;
    const sync = () => {
      if (document.hidden || paused || !inView) {
        video.pause();
      } else {
        void video.play().catch(() => undefined);
      }
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting && entry.intersectionRatio >= threshold;
        sync();
      },
      { threshold: [0, 0.1, threshold, 0.35, 0.5, 0.75, 1] },
    );

    observer.observe(video);
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      video.pause();
    };
  }, [paused, playbackRate, ref, threshold, volume]);
}
