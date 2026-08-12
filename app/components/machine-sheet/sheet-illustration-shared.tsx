/** Primitive SVG condivise per le schede illustrata gambe. */
import type { ReactNode } from "react";

export type Point = { x: number; y: number };
export type Phase = "down" | "up" | "start" | "end";

export function SheetDefs() {
  return (
    <defs>
      <linearGradient id="bgGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#fcfaf7" />
        <stop offset="100%" stopColor="#efe9e1" />
      </linearGradient>
      <linearGradient id="padLeather" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3d3d3d" />
        <stop offset="45%" stopColor="#262626" />
        <stop offset="100%" stopColor="#141414" />
      </linearGradient>
      <linearGradient id="padHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#fff" stopOpacity="0.14" />
        <stop offset="100%" stopColor="#fff" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="chrome" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#e8e8e8" />
        <stop offset="50%" stopColor="#b8b8b8" />
        <stop offset="100%" stopColor="#888" />
      </linearGradient>
      <linearGradient id="platformFace" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#757575" />
        <stop offset="100%" stopColor="#404040" />
      </linearGradient>
      <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ff7033" />
        <stop offset="100%" stopColor="#e03500" />
      </linearGradient>
      <linearGradient id="limbGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#ff8a4d" />
        <stop offset="100%" stopColor="#ff4d00" />
      </linearGradient>
      <linearGradient id="headGrad" x1="30%" y1="20%" x2="80%" y2="90%">
        <stop offset="0%" stopColor="#ff9a66" />
        <stop offset="100%" stopColor="#ff5500" />
      </linearGradient>
      <filter id="panelShadow" x="-8%" y="-8%" width="116%" height="120%">
        <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#000" floodOpacity="0.1" />
      </filter>
      <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#000" floodOpacity="0.18" />
      </filter>
      <marker id="arrOrange" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
        <path d="M0,0 L8,4 L0,8 Z" fill="#ff4d00" />
      </marker>
    </defs>
  );
}

export function SheetHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <>
      <text x="420" y="38" textAnchor="middle" fill="#111" fontSize="18" fontFamily="Barlow Condensed, sans-serif" fontWeight="900" letterSpacing="2">
        {title}
      </text>
      <text x="420" y="58" textAnchor="middle" fill="#888" fontSize="11" fontFamily="Inter, sans-serif" fontWeight="600">
        {subtitle}
      </text>
    </>
  );
}

export function PhasePanelShell({
  x,
  title,
  subtitle,
  headerFill,
  children,
}: {
  x: number;
  title: string;
  subtitle: string;
  headerFill: string;
  children: ReactNode;
}) {
  return (
    <g transform={`translate(${x}, 78)`} filter="url(#panelShadow)">
      <rect width={384} height={438} rx={14} fill="#fff" stroke="#e4ddd4" strokeWidth="1.5" />
      <path d="M0 14 Q0 0 14 0 H370 Q384 0 384 14 V52 H0 Z" fill={headerFill} />
      <text x={24} y={34} fill="#fff" fontSize="17" fontFamily="Barlow Condensed, sans-serif" fontWeight="900" letterSpacing="1.2">
        {title}
      </text>
      <text x={24} y={50} fill="rgba(255,255,255,0.75)" fontSize="10" fontFamily="Inter, sans-serif" fontWeight="600">
        {subtitle}
      </text>
      {children}
    </g>
  );
}

export function PhaseConnector() {
  return (
    <g transform="translate(408, 290)">
      <circle r="22" fill="#fff" stroke="#ff4d00" strokeWidth="2.5" filter="url(#softShadow)" />
      <path d="M-10 0 L10 0 M6 -5 L10 0 L6 5" fill="none" stroke="#ff4d00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

export function SheetLegend() {
  return (
    <g transform="translate(36, 528)" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="700">
      <circle cx={8} cy={0} r={8} fill="url(#bodyGrad)" stroke="#111" strokeWidth="1.2" />
      <text x={22} y={4} fill="#555">Manichino · assetto corretto</text>
      <rect x={210} y={-8} width={16} height={16} rx={3} fill="url(#chrome)" stroke="#444" strokeWidth="1.2" />
      <text x={232} y={4} fill="#555">Macchina · parti principali</text>
      <rect x={420} y={-8} width={16} height={16} rx={8} fill="#ff4d00" opacity={0.35} stroke="#ff4d00" strokeWidth="1.2" />
      <text x={442} y={4} fill="#555">Zone muscolari attive</text>
      <line x1={620} y1={0} x2={648} y2={0} stroke="#ff4d00" strokeWidth="2" strokeDasharray="4 3" />
      <text x={656} y={4} fill="#555">Punti chiave</text>
    </g>
  );
}

export function Floor() {
  return (
    <>
      <rect x={0} y={332} width={352} height={4} rx={2} fill="#ddd" />
      <line x1={0} y1={336} x2={352} y2={336} stroke="#ccc" strokeWidth="1" strokeDasharray="6 8" />
    </>
  );
}

export function WeightStack({ x = 16, y = 48 }: { x?: number; y?: number }) {
  return (
    <g filter="url(#softShadow)">
      <rect x={x} y={y} width={44} height={288} rx={6} fill="url(#chrome)" stroke="#666" strokeWidth="1.5" />
      <rect x={x + 6} y={y + 10} width={32} height={112} rx={4} fill="#f2f2f2" stroke="#bbb" strokeWidth="1" />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <g key={i}>
          <rect x={x + 8} y={y + 16 + i * 14} width={28} height={10} rx={2} fill={i % 2 === 0 ? "#ff4d00" : "#232323"} />
          <rect x={x + 8} y={y + 16 + i * 14} width={28} height={3} rx={1} fill="#fff" opacity={0.12} />
        </g>
      ))}
    </g>
  );
}

export function Callout({
  anchor,
  x,
  y,
  title,
  note,
  tone = "dark",
  align = "start",
}: {
  anchor: [number, number];
  x: number;
  y: number;
  title: string;
  note: string;
  tone?: "dark" | "accent";
  align?: "start" | "middle";
}) {
  const [ax, ay] = anchor;
  const accent = tone === "accent";
  const boxW = align === "middle" ? 118 : 128;
  const boxX = align === "middle" ? x - boxW / 2 : x;

  return (
    <g fontFamily="Inter, sans-serif">
      <path d={`M${ax} ${ay} L${align === "middle" ? x : boxX + 8} ${y - 8}`} fill="none" stroke={accent ? "#ff4d00" : "#444"} strokeWidth="1.2" />
      <circle cx={ax} cy={ay} r={3.5} fill={accent ? "#ff4d00" : "#444"} stroke="#fff" strokeWidth="1" />
      <rect x={boxX} y={y - 18} width={boxW} height={38} rx={8} fill="#fff" stroke={accent ? "#ff4d00" : "#ccc"} strokeWidth={1.5} filter="url(#softShadow)" />
      <text x={align === "middle" ? x : boxX + 10} y={y} textAnchor={align} fill={accent ? "#ff4d00" : "#111"} fontSize="9.5" fontWeight="800" letterSpacing="0.7">
        {title}
      </text>
      <text x={align === "middle" ? x : boxX + 10} y={y + 13} textAnchor={align} fill="#777" fontSize="8.5" fontWeight="600">
        {note}
      </text>
    </g>
  );
}

export function Limb({ from, to, width }: { from: Point; to: Point; width: number }) {
  return (
    <>
      <line x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke="#111" strokeWidth={width + 4} strokeLinecap="round" />
      <line x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke="url(#limbGrad)" strokeWidth={width} strokeLinecap="round" />
      <line x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke="#fff" strokeWidth={2} strokeLinecap="round" opacity={0.15} />
    </>
  );
}

export function Joint({ x, y, r }: { x: number; y: number; r: number }) {
  return (
    <>
      <circle cx={x} cy={y} r={r + 1.5} fill="#111" />
      <circle cx={x} cy={y} r={r} fill="#f5f0ea" />
      <circle cx={x - 2} cy={y - 2} r={r / 3} fill="#fff" opacity={0.7} />
    </>
  );
}

export function Head({ cx, cy }: { cx: number; cy: number }) {
  return (
    <>
      <ellipse cx={cx} cy={cy} rx={17} ry={18} fill="url(#headGrad)" stroke="#111" strokeWidth="2" />
      <ellipse cx={cx - 4} cy={cy - 6} rx={5} ry={4} fill="#fff" opacity={0.25} />
    </>
  );
}

export function SeatedTorso({ backX, topY = 130, bottomY = 252 }: { backX: number; topY?: number; bottomY?: number }) {
  return (
    <>
      <path
        d={`M${backX - 26} ${topY} C${backX - 26} ${topY} ${backX - 28} ${bottomY - 42} ${backX - 26} ${bottomY} L${backX + 10} ${bottomY} C${backX + 12} ${bottomY - 42} ${backX + 10} ${topY} ${backX + 10} ${topY} C${backX - 2} ${topY - 6} ${backX - 26} ${topY} ${backX - 26} ${topY} Z`}
        fill="url(#bodyGrad)"
        stroke="#111"
        strokeWidth="2"
      />
      <path d={`M${backX + 10} ${topY + 4} L${backX + 10} ${bottomY - 4}`} stroke="#fff" strokeWidth="3.5" strokeDasharray="6 5" opacity={0.55} />
      <ellipse cx={backX - 8} cy={bottomY + 12} rx={30} ry={13} fill="#d93600" stroke="#111" strokeWidth="2" />
    </>
  );
}

export function Foot({ x, y }: { x: number; y: number }) {
  return (
    <>
      <ellipse cx={x} cy={y} rx={26} ry={9} fill="#1a1a1a" stroke="#111" strokeWidth="2" />
      <ellipse cx={x - 6} cy={y - 2} rx={10} ry={3} fill="#444" opacity={0.5} />
    </>
  );
}

export function MovementLabel({ x, y, label, direction }: { x: number; y: number; label: string; direction: "down" | "up" }) {
  const accent = direction === "down" ? "#b33020" : "#ff4d00";
  return (
    <g transform={`translate(${x}, ${y})`}>
      {direction === "down" ? (
        <path d="M0 -16 L0 6" stroke={accent} strokeWidth="2.5" markerEnd="url(#arrOrange)" fill="none" />
      ) : (
        <path d="M0 8 L0 -14" stroke={accent} strokeWidth="2.5" markerEnd="url(#arrOrange)" fill="none" />
      )}
      <text x={14} y={-2} fill={accent} fontSize="11" fontFamily="Barlow Condensed, sans-serif" fontWeight="900">
        {label}
      </text>
    </g>
  );
}

export function legKinematics(thighDeg: number, shinDeg: number, hip: Point, thighLen = 76, shinLen = 68) {
  const thighRad = (thighDeg * Math.PI) / 180;
  const knee = {
    x: hip.x + Math.cos(thighRad) * thighLen,
    y: hip.y + Math.sin(thighRad) * thighLen,
  };
  const shinRad = ((thighDeg + shinDeg) * Math.PI) / 180;
  const ankle = {
    x: knee.x + Math.cos(shinRad) * shinLen,
    y: knee.y + Math.sin(shinRad) * shinLen,
  };
  return { knee, ankle };
}

export function TwoPhaseSheet({
  ariaLabel,
  headerTitle,
  headerSubtitle,
  phaseA,
  phaseB,
  renderScene,
}: {
  ariaLabel: string;
  headerTitle: string;
  headerSubtitle: string;
  phaseA: { title: string; subtitle: string; headerFill: string; phase: Phase };
  phaseB: { title: string; subtitle: string; headerFill: string; phase: Phase };
  renderScene: (phase: Phase) => ReactNode;
}) {
  return (
    <svg viewBox="0 0 840 560" role="img" aria-label={ariaLabel} xmlns="http://www.w3.org/2000/svg">
      <SheetDefs />
      <rect width="840" height="560" fill="url(#bgGrad)" rx="12" />
      <SheetHeader title={headerTitle} subtitle={headerSubtitle} />
      <PhasePanelShell x={24} title={phaseA.title} subtitle={phaseA.subtitle} headerFill={phaseA.headerFill}>
        <g transform="translate(16, 68)">{renderScene(phaseA.phase)}</g>
      </PhasePanelShell>
      <PhasePanelShell x={432} title={phaseB.title} subtitle={phaseB.subtitle} headerFill={phaseB.headerFill}>
        <g transform="translate(16, 68)">{renderScene(phaseB.phase)}</g>
      </PhasePanelShell>
      <PhaseConnector />
      <SheetLegend />
    </svg>
  );
}
