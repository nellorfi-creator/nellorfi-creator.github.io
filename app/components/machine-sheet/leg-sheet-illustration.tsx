import PressaOrizzontaleIllustration from "./pressa-orizzontale-illustration";
import {
  Callout,
  Floor,
  Foot,
  Head,
  Joint,
  legKinematics,
  Limb,
  MovementLabel,
  SeatedTorso,
  TwoPhaseSheet,
  WeightStack,
  type Phase,
  type Point,
} from "./sheet-illustration-shared";

export type LegIllustrationType =
  | "pressa-orizzontale"
  | "pressa-angolata"
  | "hack-squat"
  | "belt-squat"
  | "leg-extension"
  | "leg-curl-seated"
  | "leg-curl-standing"
  | "abductor"
  | "adductor"
  | "glute-machine"
  | "hip-thrust"
  | "hip-thrust-vertical"
  | "lunge-deadlift"
  | "sissy-squat"
  | "calf-machine"
  | "smith-rack";

type Props = { type: LegIllustrationType; machineName?: string };

export default function LegSheetIllustration({ type, machineName }: Props) {
  switch (type) {
    case "pressa-orizzontale":
      return <PressaOrizzontaleIllustration />;
    case "pressa-angolata":
      return <PressaAngolataIllustration name={machineName} />;
    case "hack-squat":
      return <HackSquatIllustration />;
    case "belt-squat":
      return <BeltSquatIllustration />;
    case "leg-extension":
      return <LegExtensionIllustration />;
    case "leg-curl-seated":
      return <LegCurlSeatedIllustration />;
    case "leg-curl-standing":
      return <LegCurlStandingIllustration />;
    case "abductor":
      return <AbductorIllustration />;
    case "adductor":
      return <AdductorIllustration />;
    case "glute-machine":
      return <GluteMachineIllustration />;
    case "hip-thrust":
      return <HipThrustIllustration vertical={false} />;
    case "hip-thrust-vertical":
      return <HipThrustIllustration vertical />;
    case "lunge-deadlift":
      return <LungeIllustration />;
    case "sissy-squat":
      return <SissySquatIllustration />;
    case "calf-machine":
      return <CalfIllustration />;
    case "smith-rack":
      return <SmithRackIllustration />;
    default:
      return null;
  }
}

function PressaAngolataIllustration({ name }: { name?: string }) {
  const title = name?.toUpperCase().includes("V-SQUAT") ? "V-SQUAT — GUIDA VISIVA" : "PRESSA INCLINATA — GUIDA VISIVA";
  return (
    <TwoPhaseSheet
      ariaLabel="Schema pressa inclinata o V-Squat"
      headerTitle={title}
      headerSubtitle="Schienale inclinato · spinta guidata su pedana"
      phaseA={{ title: "① DISCESA", subtitle: "Gambe piegate · controllo", headerFill: "#1a1a1a", phase: "down" }}
      phaseB={{ title: "② SPINTA", subtitle: "Gambe distese · spinta piena", headerFill: "#ff4d00", phase: "up" }}
      renderScene={(phase) => <AngledPressScene phase={phase} />}
    />
  );
}

function AngledPressScene({ phase }: { phase: Phase }) {
  const platformY = phase === "down" ? 268 : 216;
  const hip = { x: 124, y: 228 };
  const { knee, ankle } = legKinematics(phase === "down" ? -32 : -6, phase === "down" ? 58 : 8, hip);
  const platX = 184;
  const platW = 142;

  return (
    <>
      <Floor />
      <WeightStack />
      <path d="M38 336 L38 80 L92 58" fill="none" stroke="#555" strokeWidth="5" strokeLinecap="round" />
      <path d="M38 336 L320 336" fill="none" stroke="#555" strokeWidth="5" />
      {/* Schienale più inclinato */}
      <path d="M78 318 L118 72 L178 58 L196 300 Z" fill="url(#padLeather)" stroke="#111" strokeWidth="1.8" />
      <path d="M92 304 L128 84 L168 74 L182 288 Z" fill="url(#padHighlight)" />
      <path d="M72 296 L200 296 L200 318 L72 318 Z" fill="#242424" stroke="#111" strokeWidth="1.8" />
      <rect x={platX - 6} y={platformY + 32} width={platW + 30} height={8} rx={4} fill="#aaa" />
      <rect x={platX} y={platformY} width={platW} height={16} rx={4} fill="url(#platformFace)" stroke="#222" strokeWidth="1.8" />
      <rect x={platX} y={platformY + 16} width={platW} height={26} rx={3} fill="#161616" stroke="#222" strokeWidth="1.5" />
      <Head cx={142} cy={108} />
      <SeatedTorso backX={178} topY={126} bottomY={248} />
      <Limb from={hip} to={knee} width={16} />
      <Limb from={knee} to={ankle} width={14} />
      <Joint x={hip.x} y={hip.y} r={8} />
      <Joint x={knee.x} y={knee.y} r={8} />
      <Joint x={ankle.x} y={ankle.y} r={7} />
      <Foot x={platX + platW * 0.45} y={platformY - 6} />
      <ellipse cx={knee.x - 16} cy={knee.y - 4} rx={22} ry={12} fill="#ff4d00" opacity={0.3} />
      <MovementLabel x={platX + platW / 2} y={platformY - 18} label={phase === "down" ? "DISCESA" : "SPINTA"} direction={phase === "down" ? "down" : "up"} />
      <Callout anchor={[178, 96]} x={12} y={68} title="SCHIENALE" note="Sempre a contatto" />
      <Callout anchor={[knee.x, knee.y]} x={knee.x + 34} y={knee.y - 30} title="QUADRICIPITE" note="Spingi da qui" tone="accent" />
    </>
  );
}

function HackSquatIllustration() {
  return (
    <TwoPhaseSheet
      ariaLabel="Schema Hack Squat"
      headerTitle="HACK SQUAT — GUIDA VISIVA"
      headerSubtitle="Spalle sugli appoggi · piedi avanti sulla pedana"
      phaseA={{ title: "① DISCESA", subtitle: "Ginocchia piegate · profondità controllata", headerFill: "#1a1a1a", phase: "down" }}
      phaseB={{ title: "② SPINTA", subtitle: "Gambe distese · spinta dal piede", headerFill: "#ff4d00", phase: "up" }}
      renderScene={(phase) => <HackSquatScene phase={phase} />}
    />
  );
}

function HackSquatScene({ phase }: { phase: Phase }) {
  const platY = phase === "down" ? 278 : 232;
  const hip = { x: 108, y: 210 };
  const { knee, ankle } = legKinematics(phase === "down" ? 18 : -8, phase === "down" ? 72 : 12, hip, 70, 62);

  return (
    <>
      <Floor />
      <WeightStack x={250} />
      {/* Pannello spalle verticale */}
      <rect x={68} y={68} width={28} height={250} rx={6} fill="url(#padLeather)" stroke="#111" strokeWidth="1.8" />
      <rect x={96} y={88} width={18} height={220} rx={4} fill="url(#padLeather)" stroke="#111" strokeWidth="1.5" />
      <path d="M250 336 L250 120 L120 120" fill="none" stroke="#555" strokeWidth="4" />
      <rect x={148} y={platY} width={130} height={14} rx={4} fill="url(#platformFace)" stroke="#222" strokeWidth="1.8" />
      <rect x={148} y={platY + 14} width={130} height={24} rx={3} fill="#161616" stroke="#222" strokeWidth="1.5" />
      <Head cx={108} cy={118} />
      <path d="M96 136 L96 200 L120 200 L120 136 Z" fill="url(#bodyGrad)" stroke="#111" strokeWidth="2" />
      <ellipse cx={108} cy={208} rx={22} ry={10} fill="#d93600" stroke="#111" strokeWidth="2" />
      <Limb from={hip} to={knee} width={15} />
      <Limb from={knee} to={ankle} width={13} />
      <Joint x={hip.x} y={hip.y} r={7} />
      <Joint x={knee.x} y={knee.y} r={7} />
      <Joint x={ankle.x} y={ankle.y} r={6} />
      <Foot x={210} y={platY - 4} />
      <MovementLabel x={210} y={platY - 20} label={phase === "down" ? "DISCESA" : "SPINTA"} direction={phase === "down" ? "down" : "up"} />
      <Callout anchor={[112, 130]} x={12} y={72} title="SPALLE" note="Appoggio stabile" />
      <Callout anchor={[210, platY]} x={188} y={platY + 38} title="PEDANA" note="Piede intero" align="middle" />
    </>
  );
}

function BeltSquatIllustration() {
  return (
    <TwoPhaseSheet
      ariaLabel="Schema Belt Squat"
      headerTitle="BELT SQUAT — GUIDA VISIVA"
      headerSubtitle="Cintura al bacino · squat con carico guidato"
      phaseA={{ title: "① DISCESA", subtitle: "Ginocchia piegate · torso stabile", headerFill: "#1a1a1a", phase: "down" }}
      phaseB={{ title: "② SPINTA", subtitle: "Risalita · spinta dal pavimento", headerFill: "#ff4d00", phase: "up" }}
      renderScene={(phase) => <BeltSquatScene phase={phase} />}
    />
  );
}

function BeltSquatScene({ phase }: { phase: Phase }) {
  const hipY = phase === "down" ? 248 : 210;
  const kneeY = phase === "down" ? 298 : 262;
  const ankleY = phase === "down" ? 318 : 318;

  return (
    <>
      <Floor />
      <WeightStack />
      <rect x={160} y={40} width={12} height={296} fill="url(#chrome)" stroke="#666" strokeWidth="1" />
      <rect x={200} y={40} width={12} height={296} fill="url(#chrome)" stroke="#666" strokeWidth="1" />
      <rect x={168} y={hipY + 8} width={36} height={14} rx={4} fill="#222" stroke="#ff4d00" strokeWidth="2" />
      <path d={`M186 ${hipY + 15} L186 ${hipY + 60}`} stroke="#ff4d00" strokeWidth="3" />
      <Head cx={186} cy={hipY - 58} />
      <path d={`M168 ${hipY - 40} L168 ${hipY + 4} L204 ${hipY + 4} L204 ${hipY - 40} Z`} fill="url(#bodyGrad)" stroke="#111" strokeWidth="2" />
      <Limb from={{ x: 178, y: hipY + 4 }} to={{ x: 168, y: kneeY }} width={14} />
      <Limb from={{ x: 168, y: kneeY }} to={{ x: 172, y: ankleY }} width={12} />
      <Limb from={{ x: 204, y: hipY + 4 }} to={{ x: 214, y: kneeY }} width={14} />
      <Limb from={{ x: 214, y: kneeY }} to={{ x: 210, y: ankleY }} width={12} />
      <Foot x={172} y={318} />
      <Foot x={210} y={318} />
      <MovementLabel x={240} y={hipY - 10} label={phase === "down" ? "DISCESA" : "SPINTA"} direction={phase === "down" ? "down" : "up"} />
      <Callout anchor={[186, hipY + 8]} x={220} y={hipY - 20} title="CINTURA" note="Al bacino, non in vita" tone="accent" />
      <Callout anchor={[186, hipY - 30]} x={14} y={hipY - 50} title="TORSO" note="Petto alto e stabile" />
    </>
  );
}

function LegExtensionIllustration() {
  return (
    <TwoPhaseSheet
      ariaLabel="Schema Leg Extension"
      headerTitle="LEG EXTENSION — GUIDA VISIVA"
      headerSubtitle="Isolamento quadricipite · ginocchio allineato al fulcro"
      phaseA={{ title: "① PARTENZA", subtitle: "Ginocchia piegate · tensione iniziale", headerFill: "#1a1a1a", phase: "start" }}
      phaseB={{ title: "② ESTENSIONE", subtitle: "Gambe distese · contrazione pulita", headerFill: "#ff4d00", phase: "end" }}
      renderScene={(phase) => <LegExtensionScene phase={phase} />}
    />
  );
}

function LegExtensionScene({ phase }: { phase: Phase }) {
  const shinAngle = phase === "start" ? 88 : 8;
  const knee = { x: 200, y: 248 };
  const shinRad = (shinAngle * Math.PI) / 180;
  const ankle = { x: knee.x + Math.cos(shinRad) * 72, y: knee.y + Math.sin(shinRad) * 72 };

  return (
    <>
      <Floor />
      <WeightStack />
      <path d="M72 318 L220 318 L220 180" fill="none" stroke="#555" strokeWidth="4" />
      <rect x={72} y={268} width={120} height={50} rx={6} fill="url(#padLeather)" stroke="#111" strokeWidth="1.8" />
      <rect x={88} y={180} width={100} height={88} rx={6} fill="url(#padLeather)" stroke="#111" strokeWidth="1.8" />
      <circle cx={200} cy={248} r={14} fill="url(#chrome)" stroke="#666" strokeWidth="2" />
      <rect x={188} y={236} width={24} height={24} rx={4} fill="#333" stroke="#111" strokeWidth="1.5" />
      <Head cx={138} cy={208} />
      <SeatedTorso backX={168} topY={220} bottomY={292} />
      <Limb from={{ x: 168, y: 248 }} to={knee} width={16} />
      <Limb from={knee} to={ankle} width={14} />
      <Joint x={knee.x} y={knee.y} r={8} />
      <Joint x={ankle.x} y={ankle.y} r={7} />
      <ellipse cx={knee.x - 20} cy={knee.y - 8} rx={24} ry={14} fill="#ff4d00" opacity={phase === "end" ? 0.38 : 0.22} />
      <MovementLabel x={ankle.x + 10} y={knee.y - 30} label={phase === "start" ? "PARTENZA" : "ESTENDI"} direction={phase === "start" ? "down" : "up"} />
      <Callout anchor={[200, 248]} x={228} y={220} title="FULCRO" note="Ginocchio allineato" tone="accent" />
      <Callout anchor={[138, 240]} x={12} y={210} title="SCHIENALE" note="Bacino stabile" />
    </>
  );
}

function LegCurlSeatedIllustration() {
  return (
    <TwoPhaseSheet
      ariaLabel="Schema Leg Curl seduto"
      headerTitle="LEG CURL — GUIDA VISIVA"
      headerSubtitle="Isolamento femorali · bacino aderente alla seduta"
      phaseA={{ title: "① PARTENZA", subtitle: "Gambe distese · tensione iniziale", headerFill: "#1a1a1a", phase: "start" }}
      phaseB={{ title: "② FLESSIONE", subtitle: "Tira i talloni · ritorno lento", headerFill: "#ff4d00", phase: "end" }}
      renderScene={(phase) => <LegCurlSeatedScene phase={phase} />}
    />
  );
}

function LegCurlSeatedScene({ phase }: { phase: Phase }) {
  const shinAngle = phase === "start" ? 8 : 115;
  const knee = { x: 198, y: 252 };
  const shinRad = (shinAngle * Math.PI) / 180;
  const ankle = { x: knee.x + Math.cos(shinRad) * 68, y: knee.y + Math.sin(shinRad) * 68 };

  return (
    <>
      <Floor />
      <WeightStack />
      <rect x={76} y={180} width={104} height={88} rx={6} fill="url(#padLeather)" stroke="#111" strokeWidth="1.8" />
      <rect x={76} y={268} width={120} height={50} rx={6} fill="url(#padLeather)" stroke="#111" strokeWidth="1.8" />
      <circle cx={198} cy={252} r={14} fill="url(#chrome)" stroke="#666" strokeWidth="2" />
      <rect x={168} y={268} width={80} height={16} rx={4} fill="#444" stroke="#222" strokeWidth="1.5" />
      <Head cx={136} cy={210} />
      <SeatedTorso backX={166} topY={222} bottomY={294} />
      <Limb from={{ x: 166, y: 252 }} to={knee} width={16} />
      <Limb from={knee} to={ankle} width={14} />
      <Joint x={knee.x} y={knee.y} r={8} />
      <Joint x={ankle.x} y={ankle.y} r={7} />
      <ellipse cx={knee.x - 18} cy={knee.y + 12} rx={22} ry={12} fill="#ff4d00" opacity={phase === "end" ? 0.35 : 0.2} />
      <MovementLabel x={ankle.x} y={knee.y - 20} label={phase === "start" ? "PARTENZA" : "FLETTI"} direction={phase === "start" ? "up" : "down"} />
      <Callout anchor={[198, 252]} x={228} y={224} title="FULCRO" note="Ginocchio allineato" tone="accent" />
      <Callout anchor={[136, 278]} x={12} y={300} title="BACINO" note="Sempre appoggiato" />
    </>
  );
}

function LegCurlStandingIllustration() {
  return (
    <TwoPhaseSheet
      ariaLabel="Schema Standing Leg Curl"
      headerTitle="STANDING LEG CURL — GUIDA VISIVA"
      headerSubtitle="Un arto alla volta · bacino fermo"
      phaseA={{ title: "① PARTENZA", subtitle: "Gamba distesa · appoggio stabile", headerFill: "#1a1a1a", phase: "start" }}
      phaseB={{ title: "② FLESSIONE", subtitle: "Tallone verso il gluteo", headerFill: "#ff4d00", phase: "end" }}
      renderScene={(phase) => <LegCurlStandingScene phase={phase} />}
    />
  );
}

function LegCurlStandingScene({ phase }: { phase: Phase }) {
  const shinAngle = phase === "start" ? 90 : 145;
  const knee = { x: 210, y: 220 };
  const shinRad = (shinAngle * Math.PI) / 180;
  const ankle = { x: knee.x + Math.cos(shinRad) * 64, y: knee.y + Math.sin(shinRad) * 64 };

  return (
    <>
      <Floor />
      <WeightStack x={40} />
      <rect x={170} y={80} width={20} height={240} rx={4} fill="url(#chrome)" stroke="#666" strokeWidth="1.5" />
      <rect x={188} y={200} width={48} height={12} rx={4} fill="#333" stroke="#111" strokeWidth="1.5" />
      <Head cx={160} cy={118} />
      <path d="M148 136 L148 228 L176 228 L176 136 Z" fill="url(#bodyGrad)" stroke="#111" strokeWidth="2" />
      <Limb from={{ x: 162, y: 228 }} to={{ x: 178, y: 318 }} width={14} />
      <Foot x={178} y={318} />
      <Limb from={{ x: 168, y: 228 }} to={knee} width={15} />
      <Limb from={knee} to={ankle} width={13} />
      <Joint x={knee.x} y={knee.y} r={7} />
      <Joint x={ankle.x} y={ankle.y} r={6} />
      <MovementLabel x={ankle.x + 8} y={knee.y - 16} label={phase === "start" ? "PARTENZA" : "FLETTI"} direction={phase === "start" ? "up" : "down"} />
      <Callout anchor={[162, 228]} x={12} y={240} title="BACINO" note="Fermo, zero oscillazioni" tone="accent" />
    </>
  );
}

function AbductorIllustration() {
  return (
    <TwoPhaseSheet
      ariaLabel="Schema Abductor"
      headerTitle="ABDUCTOR — GUIDA VISIVA"
      headerSubtitle="Apertura controllata delle anche"
      phaseA={{ title: "① CHIUSO", subtitle: "Posizione iniziale", headerFill: "#1a1a1a", phase: "start" }}
      phaseB={{ title: "② APERTO", subtitle: "Apri con controllo", headerFill: "#ff4d00", phase: "end" }}
      renderScene={(phase) => <HipSpreadScene phase={phase} spread={phase === "end"} label="GLUTEO MEDIO" />}
    />
  );
}

function AdductorIllustration() {
  return (
    <TwoPhaseSheet
      ariaLabel="Schema Adductor"
      headerTitle="ADDUCTOR — GUIDA VISIVA"
      headerSubtitle="Chiusura controllata · catena mediale"
      phaseA={{ title: "① APERTO", subtitle: "Posizione iniziale", headerFill: "#1a1a1a", phase: "start" }}
      phaseB={{ title: "② CHIUSO", subtitle: "Chiudi con controllo", headerFill: "#ff4d00", phase: "end" }}
      renderScene={(phase) => <HipSpreadScene phase={phase} spread={phase === "start"} label="ADDUTTORI" invert />}
    />
  );
}

function HipSpreadScene({ phase, spread, label, invert }: { phase: Phase; spread: boolean; label: string; invert?: boolean }) {
  const spreadAmt = spread ? 28 : 8;
  return (
    <>
      <Floor />
      <WeightStack />
      <rect x={80} y={190} width={100} height={80} rx={6} fill="url(#padLeather)" stroke="#111" strokeWidth="1.8" />
      <rect x={80} y={270} width={120} height={48} rx={6} fill="url(#padLeather)" stroke="#111" strokeWidth="1.8" />
      <Head cx={130} cy={218} />
      <SeatedTorso backX={162} topY={230} bottomY={298} />
      <Limb from={{ x: 148, y: 298 }} to={{ x: 148 - spreadAmt, y: 318 }} width={14} />
      <Limb from={{ x: 162, y: 298 }} to={{ x: 162 + spreadAmt, y: 318 }} width={14} />
      <rect x={118 - spreadAmt} y={306} width={24} height={12} rx={4} fill="#444" stroke="#222" strokeWidth="1.5" />
      <rect x={158 + spreadAmt - 12} y={306} width={24} height={12} rx={4} fill="#444" stroke="#222" strokeWidth="1.5" />
      <MovementLabel x={200} y={280} label={invert ? (spread ? "APERTO" : "CHIUDI") : spread ? "APERTO" : "APRI"} direction={spread ? "up" : "down"} />
      <Callout anchor={[130, 298]} x={210} y={250} title={label} note="Contrazione pulita" tone="accent" />
    </>
  );
}

function GluteMachineIllustration() {
  return (
    <TwoPhaseSheet
      ariaLabel="Schema Glute Machine"
      headerTitle="GLUTE MACHINE — GUIDA VISIVA"
      headerSubtitle="Estensione dell'anca · gluteo sotto tensione"
      phaseA={{ title: "① PARTENZA", subtitle: "Anca neutra", headerFill: "#1a1a1a", phase: "start" }}
      phaseB={{ title: "② ESTENSIONE", subtitle: "Spingi con il gluteo", headerFill: "#ff4d00", phase: "end" }}
      renderScene={(phase) => <GluteScene phase={phase} />}
    />
  );
}

function GluteScene({ phase }: { phase: Phase }) {
  const footX = phase === "end" ? 248 : 198;
  return (
    <>
      <Floor />
      <WeightStack />
      <rect x={72} y={248} width={110} height={36} rx={6} fill="url(#padLeather)" stroke="#111" strokeWidth="1.8" />
      <rect x={88} y={200} width={80} height={48} rx={6} fill="url(#padLeather)" stroke="#111" strokeWidth="1.8" />
      <Head cx={128} cy={218} />
      <SeatedTorso backX={152} topY={228} bottomY={278} />
      <Limb from={{ x: 148, y: 278 }} to={{ x: 168, y: 298 }} width={15} />
      <Limb from={{ x: 168, y: 298 }} to={{ x: footX, y: 308 }} width={13} />
      <Foot x={footX} y={312} />
      <ellipse cx={158} cy={286} rx={20} ry={12} fill="#ff4d00" opacity={phase === "end" ? 0.38 : 0.2} />
      <MovementLabel x={footX + 10} y={290} label={phase === "start" ? "PARTENZA" : "SPINGI"} direction={phase === "start" ? "down" : "up"} />
      <Callout anchor={[158, 286]} x={210} y={260} title="GLUTEO" note="Spingi con l'anca" tone="accent" />
    </>
  );
}

function HipThrustIllustration({ vertical }: { vertical: boolean }) {
  return (
    <TwoPhaseSheet
      ariaLabel="Schema Hip Thrust"
      headerTitle={vertical ? "HIP THRUST VERTICALE — GUIDA VISIVA" : "HIP THRUST — GUIDA VISIVA"}
      headerSubtitle="Spinta d'anca · glutei al centro"
      phaseA={{ title: "① BASSO", subtitle: "Bacino abbassato · controllo", headerFill: "#1a1a1a", phase: "down" }}
      phaseB={{ title: "② SPINTA", subtitle: "Chiudi i glutei in alto", headerFill: "#ff4d00", phase: "up" }}
      renderScene={(phase) => <HipThrustScene phase={phase} vertical={vertical} />}
    />
  );
}

function HipThrustScene({ phase, vertical }: { phase: Phase; vertical: boolean }) {
  const hipY = phase === "down" ? 268 : 228;
  const backAngle = vertical ? 62 : 28;
  return (
    <>
      <Floor />
      <WeightStack x={240} />
      <rect x={68} y={280 - backAngle} width={120} height={24} rx={6} fill="url(#padLeather)" stroke="#111" strokeWidth="1.8" transform={`rotate(${-backAngle} 68 ${280})`} />
      <rect x={160} y={hipY - 8} width={80} height={16} rx={4} fill="url(#platformFace)" stroke="#222" strokeWidth="1.8" />
      <Head cx={118} cy={hipY - 52} />
      <path d={`M100 ${hipY - 34} L100 ${hipY + 8} L136 ${hipY + 8} L136 ${hipY - 34} Z`} fill="url(#bodyGrad)" stroke="#111" strokeWidth="2" />
      <Limb from={{ x: 118, y: hipY + 8 }} to={{ x: 108, y: 318 }} width={14} />
      <Limb from={{ x: 130, y: hipY + 8 }} to={{ x: 140, y: 318 }} width={14} />
      <Foot x={108} y={318} />
      <Foot x={140} y={318} />
      <ellipse cx={128} cy={hipY} rx={24} ry={14} fill="#ff4d00" opacity={phase === "up" ? 0.4 : 0.22} />
      <MovementLabel x={210} y={hipY - 20} label={phase === "down" ? "BASSO" : "SPINGI"} direction={phase === "down" ? "down" : "up"} />
      <Callout anchor={[128, hipY]} x={210} y={hipY - 40} title="GLUTEO" note="Chiudi in alto" tone="accent" />
    </>
  );
}

function LungeIllustration() {
  return (
    <TwoPhaseSheet
      ariaLabel="Schema Lunge Deadlift"
      headerTitle="LUNGE / DEADLIFT — GUIDA VISIVA"
      headerSubtitle="Passo guidato · bacino stabile"
      phaseA={{ title: "① AFFONDO", subtitle: "Ginocchio sulla linea del piede", headerFill: "#1a1a1a", phase: "down" }}
      phaseB={{ title: "② SPINTA", subtitle: "Risalita controllata", headerFill: "#ff4d00", phase: "up" }}
      renderScene={(phase) => <LungeScene phase={phase} />}
    />
  );
}

function LungeScene({ phase }: { phase: Phase }) {
  const frontKneeY = phase === "down" ? 278 : 298;
  return (
    <>
      <Floor />
      <WeightStack />
      <rect x={140} y={80} width={16} height={256} rx={4} fill="url(#chrome)" stroke="#666" strokeWidth="1.5" />
      <Head cx={150} cy={118} />
      <path d="M138 136 L138 228 L162 228 L162 136 Z" fill="url(#bodyGrad)" stroke="#111" strokeWidth="2" />
      <Limb from={{ x: 150, y: 228 }} to={{ x: 168, y: frontKneeY }} width={14} />
      <Limb from={{ x: 168, y: frontKneeY }} to={{ x: 172, y: 318 }} width={12} />
      <Limb from={{ x: 150, y: 228 }} to={{ x: 128, y: 298 }} width={14} />
      <Limb from={{ x: 128, y: 298 }} to={{ x: 120, y: 318 }} width={12} />
      <Foot x={172} y={318} />
      <Foot x={120} y={318} />
      <Callout anchor={[168, frontKneeY]} x={200} y={frontKneeY - 20} title="GINOCCHIO" note="Allineato al piede" tone="accent" />
    </>
  );
}

function SissySquatIllustration() {
  return (
    <TwoPhaseSheet
      ariaLabel="Schema Sissy Squat"
      headerTitle="SISSY SQUAT — GUIDA VISIVA"
      headerSubtitle="Enfasi quadricipite · controllo del ginocchio"
      phaseA={{ title: "① PARTENZA", subtitle: "In piedi · supporti regolati", headerFill: "#1a1a1a", phase: "start" }}
      phaseB={{ title: "② DISCESA", subtitle: "Inclina controllata", headerFill: "#ff4d00", phase: "end" }}
      renderScene={(phase) => <SissyScene phase={phase} />}
    />
  );
}

function SissyScene({ phase }: { phase: Phase }) {
  const lean = phase === "end" ? 24 : 0;
  return (
    <>
      <Floor />
      <rect x={120} y={100} width={16} height={80} rx={4} fill="url(#chrome)" stroke="#666" strokeWidth="1.5" />
      <rect x={200} y={100} width={16} height={80} rx={4} fill="url(#chrome)" stroke="#666" strokeWidth="1.5" />
      <Head cx={168 - lean} cy={128 + lean} />
      <path d={`M156 ${146 + lean} L156 ${228 + lean} L180 ${228 + lean} L180 ${146 + lean} Z`} fill="url(#bodyGrad)" stroke="#111" strokeWidth="2" />
      <Limb from={{ x: 168, y: 228 + lean }} to={{ x: 162, y: 278 }} width={14} />
      <Limb from={{ x: 162, y: 278 }} to={{ x: 158, y: 318 }} width={12} />
      <Foot x={158} y={318} />
      <ellipse cx={162} cy={278} rx={20} ry={12} fill="#ff4d00" opacity={0.32} />
      <Callout anchor={[162, 278]} x={200} y={260} title="QUADRICIPITE" note="Controllo totale" tone="accent" />
    </>
  );
}

function CalfIllustration() {
  return (
    <TwoPhaseSheet
      ariaLabel="Schema Calf Machine"
      headerTitle="CALF MACHINE — GUIDA VISIVA"
      headerSubtitle="Escursione completa · chiusura netta"
      phaseA={{ title: "① ALLUNGAMENTO", subtitle: "Tallone giù · stretch", headerFill: "#1a1a1a", phase: "down" }}
      phaseB={{ title: "② SPINTA", subtitle: "Salita sulle punte", headerFill: "#ff4d00", phase: "up" }}
      renderScene={(phase) => <CalfScene phase={phase} />}
    />
  );
}

function CalfScene({ phase }: { phase: Phase }) {
  const heelY = phase === "down" ? 312 : 296;
  return (
    <>
      <Floor />
      <WeightStack />
      <rect x={100} y={240} width={140} height={20} rx={4} fill="url(#platformFace)" stroke="#222" strokeWidth="1.8" />
      <rect x={120} y={180} width={100} height={60} rx={6} fill="url(#padLeather)" stroke="#111" strokeWidth="1.8" />
      <Head cx={170} cy={208} />
      <SeatedTorso backX={198} topY={220} bottomY={268} />
      <Limb from={{ x: 148, y: 260 }} to={{ x: 148, y: heelY }} width={12} />
      <Limb from={{ x: 178, y: 260 }} to={{ x: 178, y: heelY }} width={12} />
      <ellipse cx={148} cy={heelY} rx={14} ry={6} fill="#222" />
      <ellipse cx={178} cy={heelY} rx={14} ry={6} fill="#222" />
      <MovementLabel x={210} y={270} label={phase === "down" ? "GIÙ" : "SU"} direction={phase === "down" ? "down" : "up"} />
      <Callout anchor={[163, heelY]} x={210} y={240} title="POLPACCI" note="ROM completo" tone="accent" />
    </>
  );
}

function SmithRackIllustration() {
  return (
    <TwoPhaseSheet
      ariaLabel="Schema Smith Machine e Rack"
      headerTitle="SMITH / RACK — GUIDA VISIVA"
      headerSubtitle="Squat guidato o libero · sicurezze regolate"
      phaseA={{ title: "① DISCESA", subtitle: "Ginocchia tracciate · controllo", headerFill: "#1a1a1a", phase: "down" }}
      phaseB={{ title: "② SPINTA", subtitle: "Risalita · brace attivo", headerFill: "#ff4d00", phase: "up" }}
      renderScene={(phase) => <SmithScene phase={phase} />}
    />
  );
}

function SmithScene({ phase }: { phase: Phase }) {
  const hipY = phase === "down" ? 228 : 210;
  const { knee, ankle } = legKinematics(phase === "down" ? -18 : -4, phase === "down" ? 55 : 10, { x: 168, y: hipY });

  return (
    <>
      <Floor />
      <rect x={120} y={40} width={10} height={296} fill="url(#chrome)" stroke="#666" strokeWidth="1" />
      <rect x={220} y={40} width={10} height={296} fill="url(#chrome)" stroke="#666" strokeWidth="1" />
      <rect x={128} y={phase === "down" ? 148 : 118} width={94} height={10} rx={3} fill="#888" stroke="#444" strokeWidth="1.5" />
      <rect x={60} y={180} width={8} height={156} fill="#555" stroke="#333" strokeWidth="1" />
      <rect x={282} y={180} width={8} height={156} fill="#555" stroke="#333" strokeWidth="1" />
      <rect x={56} y={248} width={238} height={6} rx={2} fill="#ff4d00" opacity={0.7} />
      <Head cx={168} cy={hipY - 58} />
      <path d={`M152 ${hipY - 40} L152 ${hipY + 6} L184 ${hipY + 6} L184 ${hipY - 40} Z`} fill="url(#bodyGrad)" stroke="#111" strokeWidth="2" />
      <rect x={152} y={hipY - 52} width={32} height={8} rx={2} fill="#666" />
      <Limb from={{ x: 168, y: hipY + 6 }} to={knee} width={15} />
      <Limb from={knee} to={ankle} width={13} />
      <Joint x={knee.x} y={knee.y} r={7} />
      <Foot x={ankle.x} y={318} />
      <Callout anchor={[168, hipY - 48]} x={210} y={hipY - 70} title="BARRA" note="Trapezio alto" tone="accent" />
      <Callout anchor={[160, 252]} x={14} y={230} title="SICUREZZE" note="Sempre regolate" />
    </>
  );
}
