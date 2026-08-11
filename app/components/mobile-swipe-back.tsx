"use client";

import { useEffect, useState } from "react";

type MobileSwipeBackProps = {
  onSwipe?: () => void;
  edgeOnly?: boolean;
  label?: string;
};

export default function MobileSwipeBack({ onSwipe, edgeOnly = false, label = "Torna indietro" }: MobileSwipeBackProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!window.matchMedia("(max-width: 900px), (pointer: coarse)").matches) return;

    let startX = 0;
    let startY = 0;
    let tracking = false;
    let triggered = false;
    const threshold = 92;

    const isInteractive = (target: EventTarget | null) =>
      target instanceof Element && Boolean(target.closest("input, textarea, select, video, iframe, [data-swipe-lock]"));

    const touchStart = (event: TouchEvent) => {
      if (event.touches.length !== 1 || isInteractive(event.target)) return;
      const touch = event.touches[0];
      if (edgeOnly && touch.clientX > 34) return;
      startX = touch.clientX;
      startY = touch.clientY;
      tracking = true;
      triggered = false;
    };

    const touchMove = (event: TouchEvent) => {
      if (!tracking) return;
      const touch = event.touches[0];
      const deltaX = touch.clientX - startX;
      const deltaY = Math.abs(touch.clientY - startY);
      if (deltaX < 0 || deltaY > Math.abs(deltaX) * 0.75) {
        if (deltaY > 18) tracking = false;
        setProgress(0);
        return;
      }
      setProgress(Math.min(deltaX / threshold, 1));
      if (deltaX >= threshold && !triggered) {
        triggered = true;
        navigator.vibrate?.(18);
      }
    };

    const touchEnd = () => {
      if (tracking && triggered) {
        if (onSwipe) onSwipe();
        else if (window.history.length > 1) window.history.back();
        else window.location.href = "/?skipIntro=1#home";
      }
      tracking = false;
      triggered = false;
      setProgress(0);
    };

    window.addEventListener("touchstart", touchStart, { passive: true });
    window.addEventListener("touchmove", touchMove, { passive: true });
    window.addEventListener("touchend", touchEnd, { passive: true });
    window.addEventListener("touchcancel", touchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", touchStart);
      window.removeEventListener("touchmove", touchMove);
      window.removeEventListener("touchend", touchEnd);
      window.removeEventListener("touchcancel", touchEnd);
    };
  }, [edgeOnly, onSwipe]);

  return <div className={`swipe-back-cue${progress > 0 ? " visible" : ""}${progress >= 1 ? " ready" : ""}`} style={{ "--swipe-progress": progress } as React.CSSProperties} aria-hidden="true"><span>←</span><small>{label}</small></div>;
}
