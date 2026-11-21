"use client";

import SiteImage from "@/app/components/site-image";
import { useEffect, useId, useRef, useState } from "react";
import styles from "./page.module.css";

const YOUTUBE_ID = "Gj9lVEstCVE";
const YOUTUBE_WATCH_URL = `https://www.youtube.com/watch?v=${YOUTUBE_ID}`;

const VIDEO_CHAPTERS = [
  { id: "setup-1", num: "01", label: "Regola rulli", time: 3.4, end: 4.65 },
  { id: "setup-2", num: "02", label: "Impugna in piedi", time: 4.7, end: 6.0 },
  { id: "setup-3", num: "03", label: "Siediti in pre-stretch", time: 6.05, end: 7.3 },
  { id: "rep-1", num: "04", label: "Tirata & ROX™", time: 7.35, end: 13.7 },
  { id: "rep-2", num: "05", label: "Fissa vs ROC-IT®", time: 13.75, end: 20.1 },
] as const;

type Point = [number, number];

function rot2d([x, y]: Point, [px, py]: Point, deg: number): Point {
  const rad = (deg * Math.PI) / 180;
  const c = Math.cos(rad);
  const s = Math.sin(rad);
  const dx = x - px;
  const dy = y - py;
  return [px + dx * c - dy * s, py + dx * s + dy * c];
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function clamp(v: number, min = 0, max = 1) {
  return v < min ? min : v > max ? max : v;
}

function solve2Bone(a: Point, b: Point, l1: number, l2: number, bendSign = 1): Point {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const d = clamp(Math.hypot(dx, dy), Math.abs(l1 - l2) + 0.001, l1 + l2 - 0.001);
  const cosA = clamp((l1 * l1 + d * d - l2 * l2) / (2 * l1 * d), -1, 1);
  const base = Math.atan2(dy, dx);
  const ang = base + bendSign * Math.acos(cosA);
  return [a[0] + Math.cos(ang) * l1, a[1] + Math.sin(ang) * l1];
}

function fmt(n: number) {
  return n.toFixed(1);
}

export default function HoistRocItLab() {
  const tabBaseId = useId();
  const sliderId = useId();
  const [mediaTab, setMediaTab] = useState<"animated" | "youtube">("animated");
  const [ytPlaying, setYtPlaying] = useState(false);
  const [videoSound, setVideoSound] = useState(false);
  const [videoPaused, setVideoPaused] = useState(false);
  const [activeChapter, setActiveChapter] = useState<string>(VIDEO_CHAPTERS[0].id);

  // Interactive kinematic simulator state
  const [pullPct, setPullPct] = useState(35);
  const [autoSim, setAutoSim] = useState(true);
  const [showFixedGhost, setShowFixedGhost] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const labRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = labRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Autoplay/pause animated MP4 cleanly when visible in viewport
  useEffect(() => {
    const video = videoRef.current;
    if (!video || mediaTab !== "animated") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (inView && !videoPaused && !reduced) {
      void video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }, [inView, mediaTab, videoPaused]);

  // Smooth 60fps auto-oscillation for the kinematic simulator when autoSim is active
  useEffect(() => {
    if (!autoSim || !inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = (now - start) / 1000;
      // 5.2s smooth breath cycle with brief pause at peak contraction
      const wave = 0.5 - 0.5 * Math.cos((elapsed * 2 * Math.PI) / 5.2);
      const shaped = Math.pow(wave, 0.88);
      setPullPct(Math.round(shaped * 100));
      raf = window.requestAnimationFrame(tick);
    };
    raf = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf);
  }, [autoSim, inView]);

  const jumpToChapter = (time: number, id: string) => {
    setMediaTab("animated");
    setActiveChapter(id);
    setVideoPaused(false);
    window.requestAnimationFrame(() => {
      const video = videoRef.current;
      if (!video) return;
      video.currentTime = time;
      void video.play().catch(() => undefined);
    });
  };

  const toggleAudio = async () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.muted) {
      video.muted = false;
      video.volume = 0.65;
      try {
        await video.play();
        setVideoSound(true);
        setVideoPaused(false);
      } catch {
        video.muted = true;
        setVideoSound(false);
      }
    } else {
      video.muted = true;
      setVideoSound(false);
    }
  };

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      setVideoPaused(false);
      void video.play().catch(() => undefined);
    } else {
      setVideoPaused(true);
      video.pause();
    }
  };

  const onTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    const t = video.currentTime;
    const found = VIDEO_CHAPTERS.find((c) => t >= c.time - 0.15 && t < c.end);
    if (found && found.id !== activeChapter) {
      setActiveChapter(found.id);
    }
  };

  // --- Kinematic Math (US Patent 7,361,125 B2) ---
  const p = clamp(pullPct / 100);
  const carrPiv: Point = [355, 498];
  const armPiv: Point = [505, 178];
  const thetaCarr = -14.0 * p;
  const thetaArm = -43.0 * p;

  const cRearBase = rot2d([262, 466], carrPiv, thetaCarr);
  const cMid = rot2d([355, 464], carrPiv, thetaCarr);
  const cFrontBoom = rot2d([452, 488], carrPiv, thetaCarr);
  const cSeatPost = rot2d([282, 396], carrPiv, thetaCarr);
  const cRollerBase = rot2d([338, 402], carrPiv, thetaCarr);
  const cRollerCenter = rot2d([343, 342], carrPiv, thetaCarr);
  const cSeatL = rot2d([244, 396], carrPiv, thetaCarr);
  const cSeatR = rot2d([320, 388], carrPiv, thetaCarr);
  const cFootTop = rot2d([472, 460], carrPiv, thetaCarr);
  const cFootBot = rot2d([488, 498], carrPiv, thetaCarr);
  const cLinkAttach = rot2d([402, 472], carrPiv, thetaCarr);
  const armCrank = rot2d([505, 242], armPiv, thetaArm * 0.42);

  const hip = rot2d([282, 370], carrPiv, thetaCarr);
  const knee = rot2d([382, 366], carrPiv, thetaCarr);
  const ankle = rot2d([458, 472], carrPiv, thetaCarr);
  const toe = rot2d([480, 462], carrPiv, thetaCarr);

  const torsoDeg = lerp(11.0, -13.5, p);
  const tRad = (torsoDeg * Math.PI) / 180;
  const shoulder: Point = [
    hip[0] + Math.sin(tRad) * 130 - 3 * p,
    hip[1] - Math.cos(tRad) * 130 + 6 * p,
  ];
  const head: Point = [
    shoulder[0] + Math.sin(tRad * 0.75) * 42 + 3,
    shoulder[1] - Math.cos(tRad * 0.75) * 42,
  ];

  const armElbowNode = rot2d([404, 80], armPiv, thetaArm);
  const armTip = rot2d([306, 86], armPiv, thetaArm);
  const armCounter = rot2d([548, 204], armPiv, thetaArm);
  const grip: Point = [armTip[0] - 6 * p, armTip[1] + 28];
  const elbow = solve2Bone(shoulder, grip, 80, 78, 1);

  // Fixed-machine ghost comparison coordinates
  const gHip: Point = [282, 372];
  const gArch = 18 * p;
  const gMid = rot2d([300 + 14 * p, 306], gHip, -gArch * 0.5);
  const gSh = rot2d([292, 240], gHip, -gArch);
  const gHead = rot2d([298, 196], gHip, -gArch * 1.12);

  // Handle full trajectory path for visual reference
  const handleArcD = Array.from({ length: 17 }, (_, i) => {
    const pk = i / 16;
    const tip = rot2d([306, 86], armPiv, -43 * pk);
    const gx = tip[0] - 6 * pk;
    const gy = tip[1] + 28;
    return `${i === 0 ? "M" : "L"}${fmt(gx)} ${fmt(gy)}`;
  }).join(" ");

  const stackLift = -82 * p;
  const latRecruitment = Math.round(lerp(38, 98, p));
  const coreRecruitment = Math.round(lerp(30, 88, p));
  const phaseBadge =
    p < 0.18
      ? "PRE-STRETCH DORSALE (+11°)"
      : p < 0.82
        ? "TRAZIONE & OSCILLAZIONE ROX™"
        : "PICCO AL MENTO (-14° CHIN-UP)";

  return (
    <section className={styles.rocLab} ref={labRef} aria-label="Laboratorio biomeccanico e guida video HOIST RS-1201">
      {/* HEADER */}
      <div className={styles.rocLabHead}>
        <div>
          <small>ESPERIENZA INTERATTIVA · REVENGE MOTION LAB</small>
          <h3>
            GUARDA, PROVA E CAPISCI<br />
            <em>IL SISTEMA ROC-IT®.</em>
          </h3>
        </div>
        <p>
          Abbiamo realizzato una guida animata su misura per mostrarti come si regola e come si utilizza la{" "}
          <strong>HOIST RS-1201</strong>, affiancata al video ufficiale della casa madre e a un simulatore
          cinematico interattivo.
        </p>
      </div>

      {/* PART 1: DUAL MEDIA CINEMA */}
      <div className={styles.cinemaCard}>
        <div className={styles.cinemaTabs} role="tablist" aria-label="Sorgente video dimostrativo">
          <button
            id={`${tabBaseId}-tab-anim`}
            type="button"
            role="tab"
            aria-selected={mediaTab === "animated"}
            aria-controls={`${tabBaseId}-panel-anim`}
            className={mediaTab === "animated" ? styles.cinemaTabActive : styles.cinemaTab}
            onClick={() => setMediaTab("animated")}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <polygon points="6 4 20 12 6 20 6 4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
            </svg>
            Guida Animata Revenge · Come si usa
          </button>
          <button
            id={`${tabBaseId}-tab-yt`}
            type="button"
            role="tab"
            aria-selected={mediaTab === "youtube"}
            aria-controls={`${tabBaseId}-panel-yt`}
            className={mediaTab === "youtube" ? styles.cinemaTabActive : styles.cinemaTab}
            onClick={() => setMediaTab("youtube")}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <rect x="2" y="4" width="20" height="16" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
              <polygon points="10 8.5 16 12 10 15.5 10 8.5" fill="currentColor" />
            </svg>
            Video Ufficiale HOIST · YouTube
          </button>
        </div>

        {mediaTab === "animated" ? (
          <div id={`${tabBaseId}-panel-anim`} role="tabpanel" aria-labelledby={`${tabBaseId}-tab-anim`}>
            <div className={styles.cinemaStage}>
              <video
                ref={videoRef}
                className={styles.cinemaVideo}
                src="/media/new-machines/hoist-rs-1201-guida-animata.mp4"
                poster="/media/new-machines/hoist-rs-1201-guida-poster.jpg"
                muted
                loop
                playsInline
                preload="metadata"
                onTimeUpdate={onTimeUpdate}
                aria-label="Video animato biomeccanico: come utilizzare la HOIST Fitness RS-1201 Lat Pulldown"
              />
              <div className={styles.cinemaOverlayControls}>
                <button
                  type="button"
                  className={styles.cinemaControlBtn}
                  onClick={togglePlayPause}
                  aria-label={videoPaused ? "Avvia guida animata" : "Metti in pausa guida animata"}
                >
                  {videoPaused ? "▶ Riproduci" : "▮▮ Pausa"}
                </button>
                <button
                  type="button"
                  className={`${styles.cinemaControlBtn} ${videoSound ? styles.cinemaControlActive : ""}`}
                  onClick={toggleAudio}
                  aria-pressed={videoSound}
                >
                  {videoSound ? "♪ Audio attivo" : "♪ Attiva audio"}
                </button>
              </div>
            </div>

            <div className={styles.chapterBar} aria-label="Capitoli della guida animata">
              {VIDEO_CHAPTERS.map((ch) => (
                <button
                  key={ch.id}
                  type="button"
                  className={activeChapter === ch.id ? styles.chapterBtnActive : styles.chapterBtn}
                  onClick={() => jumpToChapter(ch.time, ch.id)}
                >
                  <span>{ch.num}</span>
                  <strong>{ch.label}</strong>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div id={`${tabBaseId}-panel-yt`} role="tabpanel" aria-labelledby={`${tabBaseId}-tab-yt`}>
            <div className={styles.cinemaStage}>
              {ytPlaying ? (
                <iframe
                  className={styles.cinemaIframe}
                  src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0`}
                  title="HOIST Fitness RS-1201 Lat Pulldown — Video ufficiale YouTube"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              ) : (
                <div className={styles.ytPosterFacade}>
                  <SiteImage
                    src="/media/new-machines/hoist-rs-1201-guida-poster.jpg"
                    alt="Anteprima video ufficiale HOIST Fitness RS-1201 Lat Pulldown"
                    loading="lazy"
                  />
                  <div className={styles.ytPosterShade} />
                  <div className={styles.ytPosterCenter}>
                    <span className={styles.ytKicker}>CANALE UFFICIALE HOIST FITNESS</span>
                    <h4>HOIST RS-1201 LAT PULLDOWN IN AZIONE</h4>
                    <button
                      type="button"
                      className={styles.ytPlayBtn}
                      onClick={() => setYtPlaying(true)}
                    >
                      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                        <polygon points="7 5 19 12 7 19 7 5" fill="currentColor" />
                      </svg>
                      Avvia il video YouTube
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className={styles.ytFooterBar}>
              <span>Dimostrazione ufficiale dal canale HOIST Fitness · Modello RS-1201 ROC-IT® Selectorized</span>
              <a href={YOUTUBE_WATCH_URL} target="_blank" rel="noopener noreferrer">
                Guarda su YouTube <span>↗</span>
              </a>
            </div>
          </div>
        )}
      </div>

      {/* PART 2: INTERACTIVE KINEMATIC SIMULATOR */}
      <div className={styles.simCard}>
        <div className={styles.simHeader}>
          <div>
            <small>SIMULATORE CINEMATICO · BREVETTO US 7,361,125 B2</small>
            <h4>MUOVI TU IL LEVERAGGIO ROC-IT®</h4>
          </div>
          <div className={styles.simToolbar}>
            <button
              type="button"
              className={`${styles.simToggleBtn} ${autoSim ? styles.simToggleOn : ""}`}
              aria-pressed={autoSim}
              onClick={() => setAutoSim(!autoSim)}
            >
              {autoSim ? "▮▮ Ferma simulazione" : "▶ Movimento continuo"}
            </button>
            <button
              type="button"
              className={`${styles.simToggleBtn} ${showFixedGhost ? styles.simToggleDanger : ""}`}
              aria-pressed={showFixedGhost}
              onClick={() => setShowFixedGhost(!showFixedGhost)}
            >
              {showFixedGhost ? "✓ Confronto macchina fissa attivo" : "Mostra confronto macchina fissa"}
            </button>
          </div>
        </div>

        <div className={styles.simGrid}>
          <div className={styles.simCanvasWrap}>
            <svg
              viewBox="0 0 760 560"
              className={styles.simSvg}
              role="img"
              aria-label={`Schema cinematico HOIST RS-1201 al ${pullPct}% di trazione: seduta inclinata di -${fmt(14 * p)} gradi`}
            >
              <defs>
                <radialGradient id="hoistStageGlow" cx="46%" cy="52%" r="54%">
                  <stop offset="0%" stopColor="#ff4d00" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#090909" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="steelTube" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#e2e8f0" />
                  <stop offset="55%" stopColor="#94a3b8" />
                  <stop offset="100%" stopColor="#64748b" />
                </linearGradient>
              </defs>

              <rect width="760" height="560" fill="#0b0c0f" rx="12" />
              <rect width="760" height="560" fill="url(#hoistStageGlow)" rx="12" />

              {/* Subtle technical grid */}
              {[120, 240, 360, 480, 600].map((gx) => (
                <line key={`gx-${gx}`} x1={gx} y1={0} x2={gx} y2={560} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
              ))}
              {[110, 220, 330, 440].map((gy) => (
                <line key={`gy-${gy}`} x1={0} y1={gy} x2={760} y2={gy} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
              ))}

              {/* Floor */}
              <line x1="48" y1="532" x2="712" y2="532" stroke="#525866" strokeWidth="3" />

              {/* Ghost Fixed Machine Comparison */}
              {showFixedGhost && (
                <g opacity="0.88">
                  <line x1="246" y1="396" x2="322" y2="394" stroke="rgba(148,163,184,0.35)" strokeWidth="10" strokeLinecap="round" />
                  <path
                    d={`M ${fmt(gHip[0])} ${fmt(gHip[1])} Q ${fmt(gMid[0])} ${fmt(gMid[1])} ${fmt(gSh[0])} ${fmt(gSh[1])}`}
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="15"
                    strokeLinecap="round"
                    strokeDasharray="6 6"
                  />
                  <circle cx={fmt(gHead[0])} cy={fmt(gHead[1])} r="17" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="4 4" />
                  {p > 0.32 && (
                    <g>
                      <circle cx={fmt(gMid[0])} cy={fmt(gMid[1])} r="16" fill="rgba(239,68,68,0.18)" stroke="#ef4444" strokeWidth="2" />
                      <text x="54" y="42" fill="#f87171" fontSize="11" fontWeight="800" letterSpacing="0.8">
                        TRATTEGGIO ROSSO: SEDUTA FISSA (IPERESTENSIONE LOMBARE)
                      </text>
                    </g>
                  )}
                </g>
              )}

              {/* Stationary Base & Strut */}
              <line x1="168" y1="522" x2="684" y2="522" stroke="url(#steelTube)" strokeWidth="11" strokeLinecap="round" />
              <line x1="355" y1="522" x2={fmt(carrPiv[0])} y2={fmt(carrPiv[1])} stroke="#94a3b8" strokeWidth="14" strokeLinecap="round" />
              <path
                d={`M 466 520 Q 492 365 ${fmt(armPiv[0])} ${fmt(armPiv[1])}`}
                fill="none"
                stroke="url(#steelTube)"
                strokeWidth="13"
                strokeLinecap="round"
              />
              <line x1="490" y1="318" x2="596" y2="318" stroke="#94a3b8" strokeWidth="9" />
              <line x1={fmt(armPiv[0])} y1={fmt(armPiv[1])} x2="596" y2="154" stroke="#94a3b8" strokeWidth="9" />

              {/* Weight Stack Tower (157 kg) */}
              <rect x="596" y="124" width="90" height="398" rx="9" fill="#181a20" stroke="#94a3b8" strokeWidth="2.5" />
              <line x1="622" y1="146" x2="622" y2="512" stroke="#cbd5e1" strokeWidth="2.5" opacity="0.65" />
              <line x1="660" y1="146" x2="660" y2="512" stroke="#cbd5e1" strokeWidth="2.5" opacity="0.65" />
              <line x1="641" y1="142" x2="641" y2={fmt(344 + stackLift)} stroke="#ff6a2a" strokeWidth="2.5" />
              {Array.from({ length: 12 }, (_, i) => {
                const moving = i < 7;
                const py = 344 + i * 13 + (moving ? stackLift : 0);
                const fill = moving && i === 6 ? "#ff4d00" : moving ? "#475569" : "#272a34";
                return <rect key={i} x="607" y={fmt(py)} width="68" height="9.5" rx="2" fill={fill} />;
              })}
              <rect x="591" y="114" width="100" height="24" rx="5" fill="#111318" stroke="#64748b" strokeWidth="1.5" />
              <text x="641" y="130" textAnchor="middle" fill="#f8fafc" fontSize="9.5" fontWeight="900" letterSpacing="1.4">
                HOIST · 157 KG
              </text>

              {/* 4-Bar Synchronizing Linkage */}
              <line x1={fmt(armPiv[0])} y1={fmt(armPiv[1])} x2={fmt(armCrank[0])} y2={fmt(armCrank[1])} stroke="#cbd5e1" strokeWidth="8" strokeLinecap="round" />
              <line x1={fmt(armCrank[0])} y1={fmt(armCrank[1])} x2={fmt(cLinkAttach[0])} y2={fmt(cLinkAttach[1])} stroke="#ff4d00" strokeWidth="6.5" strokeLinecap="round" />

              {/* Rocking Carriage (ROX™) */}
              <path
                d={`M ${fmt(cRearBase[0])} ${fmt(cRearBase[1])} Q ${fmt(cMid[0])} ${fmt(cMid[1])} ${fmt(cFrontBoom[0])} ${fmt(cFrontBoom[1])}`}
                fill="none"
                stroke="url(#steelTube)"
                strokeWidth="12"
                strokeLinecap="round"
              />
              <line x1={fmt(cRearBase[0])} y1={fmt(cRearBase[1])} x2={fmt(cSeatPost[0])} y2={fmt(cSeatPost[1])} stroke="#cbd5e1" strokeWidth="10" strokeLinecap="round" />
              <line x1={fmt(cSeatPost[0])} y1={fmt(cSeatPost[1])} x2={fmt(cRollerBase[0])} y2={fmt(cRollerBase[1])} stroke="#94a3b8" strokeWidth="8" strokeLinecap="round" />
              <line x1={fmt(cRollerBase[0])} y1={fmt(cRollerBase[1])} x2={fmt(cRollerCenter[0])} y2={fmt(cRollerCenter[1])} stroke="#cbd5e1" strokeWidth="7" strokeLinecap="round" />
              <line x1={fmt(cFootTop[0])} y1={fmt(cFootTop[1])} x2={fmt(cFootBot[0])} y2={fmt(cFootBot[1])} stroke="#1e293b" strokeWidth="12" strokeLinecap="round" />
              <line x1={fmt(cSeatL[0])} y1={fmt(cSeatL[1])} x2={fmt(cSeatR[0])} y2={fmt(cSeatR[1])} stroke="#94a3b8" strokeWidth="15" strokeLinecap="round" />

              {/* Pull Trajectory Arc */}
              <path d={handleArcD} fill="none" stroke="rgba(255,77,0,0.48)" strokeWidth="2.5" strokeDasharray="5 5" />

              {/* Athlete Body */}
              <line x1={fmt(hip[0])} y1={fmt(hip[1])} x2={fmt(knee[0])} y2={fmt(knee[1])} stroke="#3b4252" strokeWidth="24" strokeLinecap="round" />
              <line x1={fmt(knee[0])} y1={fmt(knee[1])} x2={fmt(ankle[0])} y2={fmt(ankle[1])} stroke="#333947" strokeWidth="18" strokeLinecap="round" />
              <line x1={fmt(ankle[0])} y1={fmt(ankle[1])} x2={fmt(toe[0])} y2={fmt(toe[1])} stroke="#ff4d00" strokeWidth="11" strokeLinecap="round" />
              <line x1={fmt(hip[0])} y1={fmt(hip[1])} x2={fmt(shoulder[0])} y2={fmt(shoulder[1])} stroke="#434c5e" strokeWidth="30" strokeLinecap="round" />

              {/* Active Muscle Highlights (Latissimus Dorsi + Core LPHC) */}
              <line
                x1={fmt(lerp(hip[0], shoulder[0], 0.24) - 7)}
                y1={fmt(lerp(hip[1], shoulder[1], 0.24))}
                x2={fmt(shoulder[0] - 8)}
                y2={fmt(shoulder[1] + 6)}
                stroke="#ff4d00"
                strokeWidth="14"
                strokeLinecap="round"
                opacity={fmt(lerp(0.35, 0.95, p))}
              />
              <line
                x1={fmt(lerp(hip[0], shoulder[0], 0.22) + 9)}
                y1={fmt(lerp(hip[1], shoulder[1], 0.22))}
                x2={fmt(lerp(hip[0], shoulder[0], 0.62) + 9)}
                y2={fmt(lerp(hip[1], shoulder[1], 0.62))}
                stroke="#fbbf24"
                strokeWidth="9"
                strokeLinecap="round"
                opacity={fmt(lerp(0.28, 0.85, p))}
              />
              {/* Spine Neutral Axis */}
              <line x1={fmt(hip[0])} y1={fmt(hip[1])} x2={fmt(shoulder[0])} y2={fmt(shoulder[1])} stroke="rgba(255,255,255,0.55)" strokeWidth="1.8" strokeDasharray="4 3" />

              {/* Head & Pulling Arm */}
              <circle cx={fmt(head[0])} cy={fmt(head[1])} r="18" fill="#4c566a" stroke="#e2e8f0" strokeWidth="2" />
              <line x1={fmt(shoulder[0])} y1={fmt(shoulder[1])} x2={fmt(elbow[0])} y2={fmt(elbow[1])} stroke="#4c566a" strokeWidth="18" strokeLinecap="round" />
              <line x1={fmt(elbow[0])} y1={fmt(elbow[1])} x2={fmt(grip[0])} y2={fmt(grip[1])} stroke="#4c566a" strokeWidth="14" strokeLinecap="round" />

              {/* Thigh Roller Pad locking legs */}
              <circle cx={fmt(cRollerCenter[0])} cy={fmt(cRollerCenter[1])} r="15" fill="#94a3b8" stroke="#111827" strokeWidth="2.5" />

              {/* Overhead Counter-Balanced Arm */}
              <path
                d={`M ${fmt(armCounter[0])} ${fmt(armCounter[1])} L ${fmt(armPiv[0])} ${fmt(armPiv[1])} Q ${fmt(armElbowNode[0])} ${fmt(armElbowNode[1])} ${fmt(armTip[0])} ${fmt(armTip[1])}`}
                fill="none"
                stroke="url(#steelTube)"
                strokeWidth="12"
                strokeLinecap="round"
              />
              <circle cx={fmt(armCounter[0])} cy={fmt(armCounter[1])} r="11" fill="#334155" stroke="#cbd5e1" strokeWidth="2" />
              <line x1={fmt(armTip[0])} y1={fmt(armTip[1])} x2={fmt(grip[0])} y2={fmt(grip[1])} stroke="#1e293b" strokeWidth="7" strokeLinecap="round" />
              <circle cx={fmt(grip[0])} cy={fmt(grip[1])} r="7" fill="#ff4d00" stroke="#fff" strokeWidth="2" />

              {/* Highlighted Mechanical Pivots */}
              <circle cx={fmt(carrPiv[0])} cy={fmt(carrPiv[1])} r="9" fill="#ff4d00" stroke="#111" strokeWidth="2.5" />
              <circle cx={fmt(armPiv[0])} cy={fmt(armPiv[1])} r="9" fill="#ff4d00" stroke="#111" strokeWidth="2.5" />

              {/* Labels */}
              <text x={fmt(carrPiv[0])} y="550" textAnchor="middle" fill="#ff6a2a" fontSize="10.5" fontWeight="800" letterSpacing="1.1">
                FULCRO ROX™ (-{fmt(14 * p)}°)
              </text>
              <text x="150" y="454" fill="#fbbf24" fontSize="11" fontWeight="800" letterSpacing="0.8">
                ASSETTO BUSTO: {torsoDeg >= 0 ? `+${fmt(torsoDeg)}°` : `${fmt(torsoDeg)}°`}
              </text>
            </svg>

            {/* Interactive Scrubber */}
            <div className={styles.simScrubberBox}>
              <div className={styles.simScrubberLabels}>
                <label htmlFor={sliderId}>CURSORE DI TRAZIONE INTERATTIVO</label>
                <strong>{phaseBadge}</strong>
              </div>
              <input
                id={sliderId}
                type="range"
                min={0}
                max={100}
                value={pullPct}
                className={styles.simRange}
                onChange={(e) => {
                  setAutoSim(false);
                  setPullPct(Number(e.target.value));
                }}
              />
              <div className={styles.simPresets}>
                <button type="button" onClick={() => { setAutoSim(false); setPullPct(0); }}>
                  0% · Pre-Stretch (+11°)
                </button>
                <button type="button" onClick={() => { setAutoSim(false); setPullPct(50); }}>
                  50% · Centro corsa (-7°)
                </button>
                <button type="button" onClick={() => { setAutoSim(false); setPullPct(100); }}>
                  100% · Chiusura al mento (-14°)
                </button>
              </div>
            </div>
          </div>

          {/* Live Telemetry Side Readout */}
          <div className={styles.simMetrics}>
            <div className={styles.simMetricBox}>
              <span>CORSA TRAZIONE</span>
              <strong>{pullPct}%</strong>
              <div className={styles.simMeter}><i style={{ width: `${pullPct}%` }} /></div>
              <p>Il braccio controbilanciato scende lungo l’arco fisiologico davanti al viso.</p>
            </div>
            <div className={styles.simMetricBox}>
              <span>OSCILLAZIONE SEDUTA ROX™</span>
              <strong>-{fmt(14 * p)}°</strong>
              <div className={styles.simMeter}><i className={styles.simMeterAmber} style={{ width: `${pullPct}%` }} /></div>
              <p>La seduta bascula all’indietro mantenendo spalle, colonna e bacino sempre allineati.</p>
            </div>
            <div className={styles.simMetricBox}>
              <span>GRANDE DORSALE &amp; TRAPEZI</span>
              <strong>{latRecruitment}%</strong>
              <div className={styles.simMeter}><i style={{ width: `${latRecruitment}%` }} /></div>
              <p>Massimo allungamento iniziale e contrazione profonda guidando i gomiti ai fianchi.</p>
            </div>
            <div className={styles.simMetricBox}>
              <span>CORE &amp; TUTELA LOMBARE</span>
              <strong>{coreRecruitment}%</strong>
              <div className={styles.simMeter}><i className={styles.simMeterGreen} style={{ width: `${coreRecruitment}%` }} /></div>
              <p>Lo spostamento controllato del baricentro attiva il complesso lombo-pelvico (LPHC) evitando di spezzare la schiena.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
