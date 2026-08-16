import type { Machine } from "./machines";

export const absZone = {
  title: "Addominali",
  eyebrow: "Allenamento per gruppi muscolari · Core",
  heroTitle: ["COSTRUISCI", "IL TUO", "CORE."],
  heroLead:
    "Per ora una postazione dedicata: la Plate Loaded Abdominal Oblique Crunch Hammer Strength. Apri la scheda e scopri come usarla per crunch e lavoro obliquo con carico progressivo.",
  manifestoTitle: ["CONTROLLO DEL TRONCO.", "SENZA SLANCIO."],
  manifesto: [
    "Un core forte non nasce da serie infinite fatte di fretta. Nasce da un gesto pulito, da un carico gestibile e da un ritorno lento che tiene tensione sugli addominali e sugli obliqui.",
    "L’area addominali di Revenge Gym parte dalla Abdominal Oblique Crunch Hammer Strength: una macchina plate loaded che guida il crunch e permette di progredire con i dischi senza affidarsi soltanto al peso del corpo.",
    "Ogni scheda raccoglie funzione, muscoli coinvolti, impostazione, programmazione ed errori comuni. Il catalogo crescerà, ma lo standard resta lo stesso: qualità in sala e chiarezza nelle scelte.",
  ],
};

export const absMachines: Machine[] = [
  {
    id: "abdominal-oblique-crunch-hammer",
    number: "01",
    name: "Abdominal Oblique Crunch",
    brand: "Hammer Strength",
    category: "Crunch plate loaded",
    image: "/photos/machines/addominali/abdominal-oblique-crunch-hammer.webp",
    alt: "Plate Loaded Abdominal Oblique Crunch Hammer Strength nella sala Revenge Gym",
    tagline: "Crunch guidato a dischi per retto e obliqui, senza rimbalzi.",
    brandNote: [
      "La Plate Loaded Abdominal Oblique Crunch Hammer Strength è una macchina a dischi dedicata al crunch da seduto. Telaio arancione, cuscini neri, rulli per le gambe e leve con impugnatura per guidare la flessione del tronco.",
      "Il caricamento a dischi consente una progressione chiara, mentre gli appoggi riducono lo slancio tipico dei crunch a corpo libero e aiutano a concentrarsi su retto addominale e obliqui.",
    ],
    lead: [
      "Regola seduta e posizione dei rulli affinché bacino e gambe siano stabili. Afferra le maniglie, mantieni il collo allineato e parti con il tronco in posizione controllata.",
      "Fletti il tronco portando il petto verso le cosce senza tirare con le braccia; ritorna lentamente senza far sbattere la macchina. Il cartello in sala ricorda proprio questo: non sbattere.",
    ],
    qualityEdge:
      "Una crunch plate loaded rende misurabile il lavoro sul core e mantiene alta la qualità del gesto anche quando aumenti il carico.",
    focus: "Flessione del tronco guidata con carico",
    primaryMuscles: ["Retto dell’addome", "Obliqui esterni", "Obliqui interni"],
    secondaryMuscles: ["Flessori dell’anca in assistenza", "Core profondo in stabilizzazione"],
    trainingRole: [
      "Esercizio principale per addome e obliqui",
      "Progressione di carico sul crunch",
      "Complemento al lavoro di core a corpo libero",
    ],
    cues: ["Bacino stabile sui supporti", "Collo lungo, niente tirate di spalle", "Chiudi con gli addominali", "Ritorno lento senza far sbattere"],
    programming: ["Ipertrofia/core: 3–4×10–15", "Controllo: 3×12–18", "Finisher: 2×15–20"],
    errors: ["Tirare con le braccia", "Usare slancio del busto", "Far sbattere la macchina", "Carico eccessivo che spezza la traiettoria"],
    trainer:
      "Il carico serve solo se il crunch resta un crunch. Se le braccia fanno il lavoro o la macchina batte, togli dischi e riparti dal controllo.",
  },
];

export function getAbsMachine(id: string) {
  return absMachines.find((machine) => machine.id === id);
}
