"use client";

import { useEffect } from "react";

export default function VersionRefresh() {
  useEffect(() => {
    const currentVersion = process.env.NEXT_PUBLIC_SITE_VERSION;
    if (!currentVersion) return;

    fetch(`/site-version.json?check=${Date.now()}`, { cache: "no-store" })
      .then((response) => response.json())
      .then(({ version }: { version?: string }) => {
        if (!version || version === currentVersion) return;
        const url = new URL(window.location.href);
        if (url.searchParams.get("siteVersion") === version) return;
        url.searchParams.set("siteVersion", version);
        window.location.replace(url.toString());
      })
      .catch(() => undefined);
  }, []);

  return null;
}
