"use client";

import { type RefObject, useEffect } from "react";

type ViewportVideoOptions = {
  paused?: boolean;
  threshold?: number;
  volume?: number;
  playbackRate?: number;
  src?: string;
  poster?: string;
  /** `idle` aspetta il load della pagina; `visible` parte solo vicino al viewport. */
  load?: "visible" | "idle";
};

export function useViewportVideo(
  ref: RefObject<HTMLVideoElement | null>,
  { paused = false, threshold = 0.18, volume, playbackRate, src, poster, load = "visible" }: ViewportVideoOptions = {},
) {
  useEffect(() => {
    const video = ref.current;
    if (!video || !src || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    if (volume !== undefined) video.volume = volume;
    if (playbackRate !== undefined) video.playbackRate = playbackRate;

    let disposed = false;
    let inView = false;
    let armed = false;
    let idleHandle = 0;
    let timer: ReturnType<typeof globalThis.setTimeout> | undefined;

    const sync = () => {
      if (!armed || disposed) return;
      if (document.hidden || paused || !inView) video.pause();
      else void video.play().catch(() => undefined);
    };

    const arm = () => {
      if (disposed || armed) return;
      armed = true;
      if (poster) video.poster = poster;
      const source = document.createElement("source");
      source.src = src;
      source.type = "video/mp4";
      video.appendChild(source);
      video.load();
      sync();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = Boolean(entry?.isIntersecting && entry.intersectionRatio >= threshold);
        if (load === "visible" && inView) arm();
        sync();
      },
      { rootMargin: "320px 0px", threshold: [0, 0.1, threshold, 0.35, 0.5, 0.75, 1] },
    );
    observer.observe(video);

    const onLoad = () => {
      if ("requestIdleCallback" in window) idleHandle = window.requestIdleCallback(() => arm(), { timeout: 2500 });
      else timer = globalThis.setTimeout(arm, 1500);
    };
    if (load === "idle") {
      if (document.readyState === "complete") onLoad();
      else window.addEventListener("load", onLoad, { once: true });
    }

    document.addEventListener("visibilitychange", sync);
    return () => {
      disposed = true;
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("load", onLoad);
      if (idleHandle) window.cancelIdleCallback(idleHandle);
      if (timer) globalThis.clearTimeout(timer);
      video.pause();
      video.querySelectorAll("source").forEach((node) => node.remove());
    };
  }, [load, paused, playbackRate, poster, ref, src, threshold, volume]);
}
