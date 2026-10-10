"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { GA_MEASUREMENT_ID } from "@/lib/site";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const INTERACTION_EVENTS = ["pointerdown", "keydown", "scroll", "touchstart"] as const;

let pendingPath = "/";
let scheduleArmed = false;

function loadGtag(pagePath: string) {
  if (typeof window.gtag === "function") {
    window.gtag("config", GA_MEASUREMENT_ID, { page_path: pagePath });
    return;
  }

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("consent", "default", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: pagePath,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
}

function scheduleGtag(pagePath: string) {
  pendingPath = pagePath;
  if (typeof window.gtag === "function") {
    window.gtag("config", GA_MEASUREMENT_ID, { page_path: pagePath });
    return;
  }
  if (scheduleArmed) return;
  scheduleArmed = true;

  let fallback = 0;
  const start = () => {
    INTERACTION_EVENTS.forEach((eventName) => window.removeEventListener(eventName, start));
    window.clearTimeout(fallback);
    loadGtag(pendingPath);
  };
  INTERACTION_EVENTS.forEach((eventName) => {
    window.addEventListener(eventName, start, { passive: true });
  });
  fallback = window.setTimeout(start, 15000);
}

export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    scheduleGtag(pathname);
  }, [pathname]);

  return null;
}
