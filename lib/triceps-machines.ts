import type { Machine } from "./machines";

export const tricepsZone = {
  title: "Tricipiti",
  eyebrow: "Allenamento per gruppi muscolari · Estensori del gomito",
  heroTitle: ["COSTRUISCI", "I TUOI", "TRICIPITI."],
  heroLead:
    "Tre postazioni per sviluppare gli estensori del gomito: dip plate loaded Hammer, Total Arms Panatta in piedi e Multi Press per la spinta a presa stretta. Apri la scheda e scopri come usare ogni macchina.",
  manifestoTitle: ["SPINTA E CONTROLLO.", "FINO ALLA CHIUSURA."],
  manifesto: [
    "Tricipiti pieni e forti nascono da estensioni pulite, gomiti stabili e una progressione misurabile. Non basta spingere: servono assetti corretti, ampiezza controllata e un ritorno lento che tiene tensione fino all’ultimo centimetro.",
    "L’area tricipiti di Revenge Gym unisce Hammer Strength e Panatta. Tre strumenti diversi per allenare il tricipite brachiale in dip, a cavo e in spinta orizzontale, senza ripetere sempre lo stesso gesto.",
    "Ogni scheda raccoglie funzione, muscoli coinvolti, impostazione, programmazione ed errori comuni. Il risultato è un catalogo utile in sala, pensato per scegliere con consapevolezza e allenarsi con qualità.",
  ],
};

export const tricepsMachines: Machine[] = [
  {
    id: "seated-dip-hammer",
    number: "01",
    name: "Seated Dip",
    brand: "Hammer Strength",
    category: "Dip plate loaded",
    image: "/photos/machines/tricipiti/seated-dip-hammer.webp",
    alt: "Plate Loaded Seated Dip Hammer Strength nella sala Revenge Gym",
    tagline: "Dip da seduto a dischi: spinta verticale per tricipiti e petto basso.",
    brandNote: [
      "La Plate Loaded Seated Dip Hammer Strength è una macchina a dischi dedicata al gesto del dip da seduto. Targhette Hammer Strength, telaio arancione, seduta e schienale neri, maniglie orizzontali e corni per i dischi sui due lati.",
      "La posizione seduta e i supporti riducono la richiesta di equilibrio rispetto ai dip alle parallele, permettendo di concentrarsi su tricipiti e spinta controllata con carichi progressivi.",
    ],
    lead: [
      "Regola la seduta affinché il busto sia stabile sullo schienale e le maniglie partano in una posizione comoda con i gomiti piegati. Carica i due lati in modo identico e tieni i piedi saldi.",
      "Spingi le maniglie verso il basso estendendo i gomiti senza inarcare eccessivamente la schiena; ritorna lentamente fino a un’ampiezza controllabile. La qualità del ritorno vale quanto la spinta.",
    ],
    qualityEdge:
      "Una seated dip plate loaded rende semplici progressione e confronto tra sedute, mantenendo alta la tensione anche vicino alla fatica.",
    focus: "Estensione guidata in dip da seduto",
    primaryMuscles: ["Tricipite brachiale", "Grande pettorale, porzione inferiore"],
    secondaryMuscles: ["Deltoide anteriore", "Dentato anteriore", "Core in stabilizzazione"],
    trainingRole: [
      "Esercizio principale per i tricipiti in spinta",
      "Alternativa guidata ai dip alle parallele",
      "Progressione di forza a dischi",
    ],
    cues: ["Carico identico sui lati", "Schiena sostenuta", "Gomiti sotto controllo", "Eccentrica lenta e continua"],
    programming: ["Forza-ipertrofia: 4×6–10", "Ipertrofia: 3–4×8–12", "Volume: 3×12–15"],
    errors: ["Caricare i lati diversamente", "Inarcare eccessivamente la schiena", "Bloccare i gomiti con violenza", "Usare troppo carico"],
    trainer:
      "Trova prima seduta e ampiezza, poi i dischi. Se per chiudere devi dondolare il busto, il carico sta comandando te.",
  },
  {
    id: "standing-total-arms-panatta",
    number: "02",
    name: "Standing Total Arms",
    brand: "Panatta",
    category: "Estensioni in piedi a cavo",
    image: "/photos/machines/tricipiti/standing-total-arms-panatta.webp",
    alt: "Standing Total Arms Panatta per tricipiti nella sala Revenge Gym",
    tagline: "Stazione Panatta in piedi: estensioni a cavo con braccio regolabile.",
    brandNote: [
      "La Standing Total Arms Panatta è una stazione selectorized con pedana, braccio articolato regolabile e maniglie a cavo. Il logo Panatta e il pannello “Standing Total Arms” identificano il modello.",
      "Nella configurazione per i tricipiti consente estensioni in piedi a tensione continua, con regolazioni precise di altezza e angolo per adattare la partenza all’atleta.",
    ],
    lead: [
      "Posiziona i piedi sulla pedana, regola altezza e angolo del braccio con i pin e afferra le maniglie. Mantieni busto eretto, gomiti stabili e spalle basse.",
      "Estendi i gomiti senza dondolare, chiudi in basso o in avanti con controllo e ritorna lentamente fino a recuperare lunghezza. La regolazione del braccio deve far partire il movimento dalla lunghezza utile, non da una posizione forzata.",
    ],
    qualityEdge:
      "La Total Arms offre un lavoro a cavo diverso dalla seated dip: tensione continua, assetto in piedi e regolazioni rapide per isolare gli estensori.",
    focus: "Estensione in piedi a tensione continua",
    primaryMuscles: ["Tricipite brachiale"],
    secondaryMuscles: ["Deltoide anteriore in stabilizzazione", "Core", "Muscoli della presa"],
    trainingRole: [
      "Isolamento dei tricipiti dopo le spinte",
      "Finisher a tensione continua",
      "Lavoro tecnico con carico moderato",
    ],
    cues: ["Piedi stabili sulla pedana", "Gomiti fermi", "Busto dritto", "Ritorno lento senza slancio"],
    programming: ["Ipertrofia: 3–4×10–15", "Controllo: 3×12–18", "Finisher: 2×15–20"],
    errors: ["Dondolare con il busto", "Aprire i gomiti", "Regolare male il braccio", "Usare troppo carico"],
    trainer:
      "Prima regola il braccio, poi scegli il peso. Sui tricipiti la serie utile è quella che chiudi senza tradire i gomiti.",
  },
  {
    id: "super-horizontal-multi-press-panatta",
    number: "03",
    name: "Super Horizontal Multi Press",
    brand: "Panatta",
    category: "Spinta orizzontale multi-presa",
    image: "/photos/machines/tricipiti/super-horizontal-multi-press-panatta.webp",
    alt: "Super Horizontal Multi Press Panatta per tricipiti nella sala Revenge Gym",
    tagline: "Pressa plate loaded multi-presa: presa stretta per caricare i tricipiti.",
    brandNote: [
      "La Super Horizontal Multi Press Panatta è una pressa plate loaded con bracci indipendenti e più impugnature. Il pannello “Super Horizontal Multi Press” e il logo Panatta identificano chiaramente il modello.",
      "Nella seduta tricipiti si privilegiano le prese più strette o neutre, così la spinta orizzontale trasferisce più lavoro sugli estensori del gomito rispetto a una pressa a presa larga da petto.",
    ],
    lead: [
      "Scegli l’impugnatura più stretta o neutra compatibile con polsi e spalle. Posiziona il corpo simmetricamente sul cuscino, carica i due lati allo stesso modo e tieni i piedi stabili.",
      "Spingi senza bloccare violentemente i gomiti; scendi fin dove petto e spalle restano composti, mantenendo i gomiti più vicini al corpo rispetto a una pressa “petto”. Controlla i dischi in ogni centimetro.",
    ],
    qualityEdge:
      "La multi press Panatta permette di usare la stessa struttura del petto con un focus tricipiti: prese multiple, leve indipendenti e progressione a dischi.",
    focus: "Spinta orizzontale a presa stretta",
    primaryMuscles: ["Tricipite brachiale", "Grande pettorale"],
    secondaryMuscles: ["Deltoide anteriore", "Dentato anteriore"],
    trainingRole: [
      "Spinta pesante con enfasi sui tricipiti",
      "Complemento a dip e estensioni a cavo",
      "Progressione di forza a dischi",
    ],
    cues: ["Presa stretta o neutra", "Carico identico sui lati", "Gomiti più vicini al corpo", "Discesa fluida e controllata"],
    programming: ["Forza-ipertrofia: 4×6–10", "Ipertrofia: 3–4×8–12", "Back-off: 2×12–15"],
    errors: ["Presa troppo larga per l’obiettivo tricipiti", "Caricare i lati diversamente", "Rimbalzare in basso", "Bloccare i gomiti con violenza"],
    trainer:
      "Se vuoi i tricipiti, la presa e la traiettoria dei gomiti decidono più del carico. Chiudi sotto controllo, non a scatto.",
  },
];

export function getTricepsMachine(id: string) {
  return tricepsMachines.find((machine) => machine.id === id);
}
