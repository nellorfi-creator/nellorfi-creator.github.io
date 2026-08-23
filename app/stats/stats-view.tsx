"use client";

import SiteImage from "@/app/components/site-image";
import { COUNTER_WORKER_URL } from "@/lib/legal";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

type Counts = {
  uniqueToday: number | null;
  uniqueHistorical: number;
  pageViews: number;
};

const STORAGE_KEY = "revenge-gym-stats";
const PASSWORD_SHA256 = "70afe8772142c0a0b773a50f3aed28e60473a6d585d060c563807e4fe3358e18";

async function sha256Hex(value: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function formatCount(value: number | null) {
  return value === null ? "—" : value.toLocaleString("it-IT");
}

export default function StatsView() {
  const [password, setPassword] = useState("");
  const [counts, setCounts] = useState<Counts | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (!stored) return;
    void loadCounts(stored);
  }, []);

  async function loadCounts(value: string) {
    setLoading(true);
    setError("");
    try {
      if ((await sha256Hex(value)) !== PASSWORD_SHA256) {
        sessionStorage.removeItem(STORAGE_KEY);
        setCounts(null);
        setError("Password non corretta.");
        return;
      }

      const statsResponse = await fetch(`${COUNTER_WORKER_URL}/stats`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ password: value }),
      });
      if (statsResponse.ok) {
        const payload = await statsResponse.json() as Partial<Counts>;
        if (
          typeof payload.uniqueToday !== "number" ||
          typeof payload.uniqueHistorical !== "number" ||
          typeof payload.pageViews !== "number"
        ) {
          throw new Error("invalid");
        }
        sessionStorage.setItem(STORAGE_KEY, value);
        setCounts({
          uniqueToday: payload.uniqueToday,
          uniqueHistorical: payload.uniqueHistorical,
          pageViews: payload.pageViews,
        });
        setPassword("");
        return;
      }

      const visitsResponse = await fetch(`${COUNTER_WORKER_URL}/visits`, {
        method: "GET",
        headers: { Accept: "application/json" },
      });
      if (!visitsResponse.ok) throw new Error("unavailable");
      const visits = await visitsResponse.json() as { uniqueVisitors?: number; pageViews?: number };
      if (
        typeof visits.uniqueVisitors !== "number" ||
        typeof visits.pageViews !== "number"
      ) {
        throw new Error("invalid");
      }
      sessionStorage.setItem(STORAGE_KEY, value);
      setCounts({
        uniqueToday: null,
        uniqueHistorical: visits.uniqueVisitors,
        pageViews: visits.pageViews,
      });
      setPassword("");
    } catch {
      setCounts(null);
      setError("Accesso non riuscito. Riprova.");
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void loadCounts(password);
  }

  function logout() {
    sessionStorage.removeItem(STORAGE_KEY);
    setCounts(null);
    setPassword("");
    setError("");
  }

  return (
    <main className="stats-page">
      <header className="stats-header">
        <Link href="/?skipIntro=1#home" aria-label="Revenge Gym, torna alla home">
          <SiteImage src="/brand/revenge-gym-logo.png" alt="Revenge Gym" />
        </Link>
        <Link href="/?skipIntro=1#home">← Home</Link>
      </header>
      <section>
        <p className="eyebrow"><span /> Interno</p>
        <h1>VISITE<br /><em>DEL SITO.</em></h1>
        {counts ? (
          <>
            <div className="stats-grid">
              <article>
                <small>Visite uniche giornaliere</small>
                <strong>{formatCount(counts.uniqueToday)}</strong>
                <p>Persone diverse che hanno aperto il sito oggi, fuso orario di Roma.</p>
              </article>
              <article>
                <small>Visite uniche storiche</small>
                <strong>{formatCount(counts.uniqueHistorical)}</strong>
                <p>Da quando abbiamo aperto il sito: una persona conta una volta al giorno.</p>
              </article>
              <article>
                <small>Visite totali</small>
                <strong>{formatCount(counts.pageViews)}</strong>
                <p>Tutte le aperture, anche dello stesso utente nello stesso giorno.</p>
              </article>
            </div>
            <button className="button light" type="button" onClick={logout}>Esci</button>
          </>
        ) : (
          <form className="stats-lock" onSubmit={onSubmit}>
            <label>
              Password
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </label>
            <button className="button primary" type="submit" disabled={loading}>
              {loading ? "Accesso…" : "Entra"}
            </button>
            {error ? <p className="form-error" role="alert">{error}</p> : null}
          </form>
        )}
      </section>
    </main>
  );
}
