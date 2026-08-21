"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { GA_MEASUREMENT_ID } from "@/lib/site";

const STORAGE_KEY = "rg-ga-consent";

type Consent = "granted" | "denied";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

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

export default function Analytics() {
  const pathname = usePathname();
  const [consent, setConsent] = useState<Consent | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "granted" || stored === "denied") setConsent(stored);
    setReady(true);
  }, []);

  useEffect(() => {
    if (consent !== "granted") return;
    loadGtag(pathname);
  }, [consent, pathname]);

  function choose(value: Consent) {
    window.localStorage.setItem(STORAGE_KEY, value);
    setConsent(value);
  }

  if (!ready || consent !== null) return null;

  return (
    <div className="ga-banner" role="dialog" aria-label="Consenso alle statistiche di visita">
      <p>
        Usiamo Google Analytics solo se accetti, per capire quali pagine vengono aperte.
        Niente pubblicità.{" "}
        <Link href="/privacy/">Privacy</Link>
      </p>
      <div className="ga-banner-actions">
        <button type="button" className="ga-banner-decline" onClick={() => choose("denied")}>
          Rifiuta
        </button>
        <button type="button" className="ga-banner-accept" onClick={() => choose("granted")}>
          Accetta
        </button>
      </div>
    </div>
  );
}
