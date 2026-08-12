/**
 * Schema didascalico premium — pressa orizzontale Life Fitness.
 * Due fasi, manichino stilizzato, macchina dettagliata, callout editoriali.
 */
export default function PressaOrizzontaleIllustration() {
  return (
    <svg
      viewBox="0 0 840 560"
      role="img"
      aria-label="Schema illustrato: discesa e spinta sulla pressa orizzontale"
      xmlns="http://www.w3.org/2000/svg"
    >
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

      <rect width="840" height="560" fill="url(#bgGrad)" rx="12" />

      {/* Header */}
      <text x="420" y="38" textAnchor="middle" fill="#111" fontSize="18" fontFamily="Barlow Condensed, sans-serif" fontWeight="900" letterSpacing="2.2">
        PRESSA ORIZZONTALE — GUIDA VISIVA
      </text>
      <text x="420" y="58" textAnchor="middle" fill="#888" fontSize="11" fontFamily="Inter, sans-serif" fontWeight="600" letterSpacing="0.4">
        Vista laterale · posizione corretta in due fasi
      </text>

      <PhasePanel
        x={24}
        title="① DISCESA"
        subtitle="Gambe piegate · controllo in eccentrica"
        headerFill="#1a1a1a"
        phase="down"
        platformOffset={0}
        thighDeg={-28}
        shinDeg={62}
      />
      <PhasePanel
        x={432}
        title="② SPINTA"
        subtitle="Gambe distese · spinta su tutto il piede"
        headerFill="#ff4d00"
        phase="up"
        platformOffset={-52}
        thighDeg={-4}
        shinDeg={6}
      />

      {/* Connettore centrale */}
      <g transform="translate(408, 290)">
        <circle r="22" fill="#fff" stroke="#ff4d00" strokeWidth="2.5" filter="url(#softShadow)" />
        <path d="M-10 0 L10 0 M6 -5 L10 0 L6 5" fill="none" stroke="#ff4d00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* Legenda */}
      <g transform="translate(36, 528)" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="700">
        <Swatch kind="body" />
        <text x="22" y="4" fill="#555">Manichino · assetto corretto</text>
        <Swatch kind="machine" x={210} />
        <text x="232" y="4" fill="#555">Macchina · parti principali</text>
        <Swatch kind="muscle" x={420} />
        <text x="442" y="4" fill="#555">Zone muscolari attive</text>
        <line x1="620" y1="0" x2="648" y2="0" stroke="#ff4d00" strokeWidth="2" strokeDasharray="4 3" />
        <text x="656" y="4" fill="#555">Contatto lombare</text>
      </g>
    </svg>
  );
}

function Swatch({ kind, x = 0 }: { kind: "body" | "machine" | "muscle"; x?: number }) {
  if (kind === "body") {
    return <circle cx={x + 8} cy={0} r={8} fill="url(#bodyGrad)" stroke="#111" strokeWidth="1.2" />;
  }
  if (kind === "machine") {
    return <rect x={x} y={-8} width={16} height={16} rx={3} fill="url(#chrome)" stroke="#444" strokeWidth="1.2" />;
  }
  return <rect x={x} y={-8} width={16} height={16} rx={8} fill="#ff4d00" opacity={0.35} stroke="#ff4d00" strokeWidth="1.2" />;
}

type PanelProps = {
  x: number;
  title: string;
  subtitle: string;
  headerFill: string;
  phase: "down" | "up";
  platformOffset: number;
  thighDeg: number;
  shinDeg: number;
};

function PhasePanel({ x, title, subtitle, headerFill, phase, platformOffset, thighDeg, shinDeg }: PanelProps) {
  return (
    <g transform={`translate(${x}, 78)`} filter="url(#panelShadow)">
      <rect width={384} height={438} rx={14} fill="#fff" stroke="#e4ddd4" strokeWidth="1.5" />
      <path d={`M0 14 Q0 0 14 0 H370 Q384 0 384 14 V52 H0 Z`} fill={headerFill} />
      <text x={24} y={34} fill="#fff" fontSize="17" fontFamily="Barlow Condensed, sans-serif" fontWeight="900" letterSpacing="1.2">
        {title}
      </text>
      <text x={24} y={50} fill="rgba(255,255,255,0.75)" fontSize="10" fontFamily="Inter, sans-serif" fontWeight="600">
        {subtitle}
      </text>
      <PhaseScene phase={phase} platformOffset={platformOffset} thighDeg={thighDeg} shinDeg={shinDeg} />
    </g>
  );
}

function PhaseScene({
  phase,
  platformOffset,
  thighDeg,
  shinDeg,
}: {
  phase: "down" | "up";
  platformOffset: number;
  thighDeg: number;
  shinDeg: number;
}) {
  const basePlatformY = 292;
  const platformY = basePlatformY + platformOffset;

  const hip = { x: 128, y: 224 };
  const thighLen = 76;
  const shinLen = 68;

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

  const platformX = 188;
  const platformW = 148;
  const footCenterX = platformX + platformW * 0.46;
  const footY = platformY - 6;

  return (
    <g transform="translate(16, 68)">
      {/* Pavimento */}
      <rect x={0} y={332} width={352} height={4} rx={2} fill="#ddd" />
      <line x1={0} y1={336} x2={352} y2={336} stroke="#ccc" strokeWidth="1" strokeDasharray="6 8" />

      {/* Macchina */}
      <MachineFrame platformY={platformY} platformX={platformX} platformW={platformW} />

      {/* Manichino — dietro pedana per profondità parziale */}
      <Mannequin hip={hip} knee={knee} ankle={ankle} footX={footCenterX} footY={footY} phase={phase} />

      {/* Pedana in primo piano */}
      <FootPlate x={platformX} y={platformY} w={platformW} phase={phase} />

      {/* Callout */}
      <Callout anchor={[152, 108]} x={14} y={72} title="SCHIENALE" note="Lombare sempre aderente" tone="dark" />
      <Callout anchor={[132, 302]} x={14} y={318} title="SEDUTA" note="Bacino ben appoggiato" tone="dark" />
      <Callout anchor={[platformX + platformW / 2, platformY + 8]} x={platformX + 18} y={platformY + 44} title="PEDANA" note="Piedi centrati e stabili" tone="dark" align="middle" />
      <Callout anchor={[knee.x + 4, knee.y - 6]} x={knee.x + 36} y={knee.y - 36} title="QUADRICIPITE" note="Spingi da qui" tone="accent" />
    </g>
  );
}

function MachineFrame({ platformY, platformX, platformW }: { platformY: number; platformX: number; platformW: number }) {
  return (
    <g filter="url(#softShadow)">
      {/* Colonna pesi */}
      <rect x={16} y={48} width={44} height={288} rx={6} fill="url(#chrome)" stroke="#666" strokeWidth="1.5" />
      <rect x={22} y={58} width={32} height={112} rx={4} fill="#f2f2f2" stroke="#bbb" strokeWidth="1" />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <g key={i}>
          <rect x={24} y={64 + i * 14} width={28} height={10} rx={2} fill={i % 2 === 0 ? "#ff4d00" : "#232323"} />
          <rect x={24} y={64 + i * 14} width={28} height={3} rx={1} fill="#fff" opacity={0.12} />
        </g>
      ))}
      <text x={38} y={188} textAnchor="middle" fill="#666" fontSize="8" fontFamily="Inter, sans-serif" fontWeight="800" letterSpacing="0.6">
        PESI
      </text>

      {/* Telaio */}
      <path d="M38 336 L38 72 L88 52" fill="none" stroke="#555" strokeWidth="5" strokeLinecap="round" />
      <path d="M38 336 L320 336" fill="none" stroke="#555" strokeWidth="5" strokeLinecap="round" />

      {/* Binario pedana */}
      <rect x={platformX - 8} y={platformY + 34} width={platformW + 36} height={8} rx={4} fill="#aaa" stroke="#777" strokeWidth="1" />
      <rect x={platformX - 8} y={platformY + 36} width={platformW + 36} height={3} rx={1} fill="#fff" opacity={0.35} />

      {/* Braccio di collegamento */}
      <path d={`M88 168 L88 138 L${platformX + platformW - 12} 138 L${platformX + platformW - 12} ${platformY + 18}`} fill="none" stroke="#888" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />

      {/* Schienale imbottito */}
      <path d="M84 322 L112 98 L166 88 L182 308 Z" fill="url(#padLeather)" stroke="#0a0a0a" strokeWidth="1.8" />
      <path d="M96 310 L118 108 L158 102 L170 298 Z" fill="url(#padHighlight)" />
      {/* Cuciture */}
      {[0, 1, 2, 3].map((i) => (
        <line key={i} x1={108 + i * 14} y1={115 + i * 46} x2={122 + i * 14} y2={295 - i * 8} stroke="#fff" strokeWidth="0.6" opacity={0.08} />
      ))}

      {/* Seduta */}
      <path d="M78 302 L186 302 L186 324 L78 324 Z" fill="#242424" stroke="#0a0a0a" strokeWidth="1.8" />
      <rect x={78} y={302} width={108} height={8} fill="#fff" opacity={0.07} />

      {/* Maniglie di sicurezza */}
      <rect x={178} y={248} width={28} height={8} rx={4} fill="url(#chrome)" stroke="#666" strokeWidth="1" />
      <rect x={178} y={262} width={28} height={8} rx={4} fill="url(#chrome)" stroke="#666" strokeWidth="1" />
    </g>
  );
}

function FootPlate({ x, y, w, phase }: { x: number; y: number; w: number; phase: "down" | "up" }) {
  const accent = phase === "down" ? "#b33020" : "#ff4d00";
  return (
    <g>
      <rect x={x} y={y} width={w} height={16} rx={4} fill="url(#platformFace)" stroke="#222" strokeWidth="1.8" />
      {/* Grip texture */}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <rect key={i} x={x + 10 + i * 18} y={y + 4} width={8} height={8} rx={1} fill="#111" opacity={0.25} />
      ))}
      <rect x={x} y={y + 16} width={w} height={28} rx={3} fill="#161616" stroke="#222" strokeWidth="1.5" />
      <rect x={x + 4} y={y + 1} width={w - 8} height={4} rx={2} fill="#fff" opacity={0.18} />

      {/* Freccia movimento */}
      <g transform={`translate(${x + w / 2}, ${y - 18})`}>
        {phase === "down" ? (
          <>
            <path d="M0 -16 L0 6" stroke={accent} strokeWidth="2.5" markerEnd="url(#arrOrange)" fill="none" />
            <text x={14} y={-2} fill={accent} fontSize="11" fontFamily="Barlow Condensed, sans-serif" fontWeight="900">
              DISCESA
            </text>
          </>
        ) : (
          <>
            <path d="M0 8 L0 -14" stroke={accent} strokeWidth="2.5" markerEnd="url(#arrOrange)" fill="none" />
            <text x={14} y={-2} fill={accent} fontSize="11" fontFamily="Barlow Condensed, sans-serif" fontWeight="900">
              SPINTA
            </text>
          </>
        )}
      </g>
    </g>
  );
}

function Mannequin({
  hip,
  knee,
  ankle,
  footX,
  footY,
  phase,
}: {
  hip: { x: number; y: number };
  knee: { x: number; y: number };
  ankle: { x: number; y: number };
  footX: number;
  footY: number;
  phase: "down" | "up";
}) {
  const backX = 168;
  return (
    <g filter="url(#softShadow)">
      {/* Testa */}
      <ellipse cx={138} cy={112} rx={17} ry={18} fill="url(#headGrad)" stroke="#111" strokeWidth="2" />
      <ellipse cx={134} cy={106} rx={5} ry={4} fill="#fff" opacity={0.25} />

      {/* Torso */}
      <path
        d="M118 130 C118 130 116 210 118 252 L152 252 C154 210 152 130 152 130 C140 124 118 130 118 130 Z"
        fill="url(#bodyGrad)"
        stroke="#111"
        strokeWidth="2"
      />

      {/* Contatto schienale */}
      <path d={`M${backX} 134 L${backX} 248`} stroke="#fff" strokeWidth="3.5" strokeDasharray="6 5" opacity={0.55} />

      {/* Bacino */}
      <ellipse cx={135} cy={264} rx={30} ry={13} fill="#d93600" stroke="#111" strokeWidth="2" />

      {/* Braccia — presa maniglie */}
      <path d="M122 168 Q156 188 196 252" fill="none" stroke="url(#limbGrad)" strokeWidth="10" strokeLinecap="round" />
      <path d="M152 168 Q168 196 196 262" fill="none" stroke="url(#limbGrad)" strokeWidth="10" strokeLinecap="round" />
      <circle cx={196} cy={252} r={7} fill="#f5f0ea" stroke="#111" strokeWidth="1.8" />
      <circle cx={196} cy={262} r={7} fill="#f5f0ea" stroke="#111" strokeWidth="1.8" />

      {/* Gamba superiore */}
      <Limb from={hip} to={knee} width={16} />
      {/* Gamba inferiore */}
      <Limb from={knee} to={ankle} width={14} />

      {/* Articolazioni */}
      <Joint x={hip.x} y={hip.y} r={8} />
      <Joint x={knee.x} y={knee.y} r={8} />
      <Joint x={ankle.x} y={ankle.y} r={7} />

      {/* Zone muscolare */}
      <ellipse cx={148} cy={206} rx={16} ry={30} fill="#ff4d00" opacity={0.22} transform="rotate(-10 148 206)" />
      <ellipse cx={knee.x - 18} cy={knee.y - 6} rx={24} ry={13} fill="#ff4d00" opacity={phase === "up" ? 0.38 : 0.28} />

      {/* Piede */}
      <ellipse cx={footX} cy={footY} rx={26} ry={9} fill="#1a1a1a" stroke="#111" strokeWidth="2" />
      <ellipse cx={footX - 6} cy={footY - 2} rx={10} ry={3} fill="#444" opacity={0.5} />
    </g>
  );
}

function Limb({ from, to, width }: { from: { x: number; y: number }; to: { x: number; y: number }; width: number }) {
  return (
    <>
      <line x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke="#111" strokeWidth={width + 4} strokeLinecap="round" />
      <line x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke="url(#limbGrad)" strokeWidth={width} strokeLinecap="round" />
      <line x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke="#fff" strokeWidth={2} strokeLinecap="round" opacity={0.15} />
    </>
  );
}

function Joint({ x, y, r }: { x: number; y: number; r: number }) {
  return (
    <>
      <circle cx={x} cy={y} r={r + 1.5} fill="#111" />
      <circle cx={x} cy={y} r={r} fill="#f5f0ea" />
      <circle cx={x - 2} cy={y - 2} r={r / 3} fill="#fff" opacity={0.7} />
    </>
  );
}

function Callout({
  anchor,
  x,
  y,
  title,
  note,
  tone,
  align = "start",
}: {
  anchor: [number, number];
  x: number;
  y: number;
  title: string;
  note: string;
  tone: "dark" | "accent";
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
