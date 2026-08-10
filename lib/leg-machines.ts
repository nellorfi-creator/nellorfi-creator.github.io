export type LegMachine = {
  id: string;
  number: string;
  name: string;
  shortName: string;
  brand: string;
  status: string;
  incoming?: boolean;
  image: string;
  alt: string;
  tagline: string;
  lead: string;
  focus: string;
  primaryMuscles: string[];
  secondaryMuscles: string[];
  trainingRole: string[];
  cues: string[];
  programming: string[];
  errors: string[];
  trainer: string;
  galleryNote: string;
};

export const legZone = {
  title: "Gambe",
  eyebrow: "Allenamento per zona · Arti inferiori",
  heroLead:
    "Forza, massa e controllo partono da qui: quattro postazioni professionali per costruire arti inferiori solidi, con tecnica da sala e progressione misurabile.",
  intro:
    "In Revenge Gym l’area gambe non è un angolo secondario. Pressa, hack squat e isolamento di quadricipiti e femorali permettono di allenare spinta, equilibrio muscolare e qualità del movimento — dal principiante guidato all’atleta esperto.",
};

export const muscleMap = [
  { code: "01", name: "Quadricipiti", role: "Estensione del ginocchio · spinta anteriore" },
  { code: "02", name: "Glutei", role: "Estensione dell’anca · potenza e stabilità" },
  { code: "03", name: "Femorali", role: "Flessione del ginocchio · catena posteriore" },
  { code: "04", name: "Polpacci", role: "Spinta plantare · chiusura della catena" },
];

export const sampleSession = [
  { step: "01", title: "Attivazione", detail: "5–8′ mobilità anche/ginocchia + 2 serie leggere di pressa o hack squat" },
  { step: "02", title: "Spinta primaria", detail: "Pressa orizzontale o Hack Squat · 3–4 serie × 6–10 ripetizioni controllate" },
  { step: "03", title: "Volume cosce", detail: "Leg Extension · 3 serie × 10–15 · focus sul vasto mediale e sul controllo" },
  { step: "04", title: "Catena posteriore", detail: "Leg Curl · 3 serie × 8–12 · ritorno lento, bacino stabile" },
  { step: "05", title: "Chiusura", detail: "Opzionale: seconda spinta leggera o lavoro polpacci · 2 serie tecniche" },
];

export const legMachines: LegMachine[] = [
  {
    id: "pressa-life-fitness",
    number: "01",
    name: "Pressa Orizzontale",
    shortName: "Pressa",
    brand: "Life Fitness",
    status: "Disponibile",
    image: "/media/new-machines/life-fitness-leg-press.webp",
    alt: "Pressa orizzontale Axiom Life Fitness",
    tagline: "Spinta guidata, colonna protetta, carico serio.",
    lead: "La pressa orizzontale è il pilastro dell’allenamento arti inferiori in sala. Permette di lavorare forza e ipertrofia su quadricipiti, glutei e femorali con una traiettoria stabile, riducendo la richiesta di equilibrio rispetto allo squat libero e limitando la compressione diretta sulla colonna.",
    focus: "Forza e volume sugli arti inferiori",
    primaryMuscles: ["Quadricipite femorale", "Grande gluteo", "Bicipite femorale", "Semitendinoso / semimembranoso"],
    secondaryMuscles: ["Adduttori", "Gastrocnemio e soleo", "Core e lombari profondi"],
    trainingRole: [
      "Esercizio primario nelle sedute gambe",
      "Progressione di carico facile da misurare",
      "Alternativa o complemento allo squat quando serve più stabilità",
      "Ideale per accumulare volume senza perdere qualità tecnica",
    ],
    cues: [
      "Schiena e bacino aderenti allo schienale per tutta la serie",
      "Piedi stabili, ginocchia allineate alla direzione delle punte",
      "Scendi solo fino dove mantieni controllo e contatto lombare",
      "Spingi attraverso l’intero piede, non soltanto con le punte",
      "In alto evita il blocco violento delle ginocchia",
    ],
    programming: [
      "Forza: 4×5–8 con recupero completo e tecnica impeccabile",
      "Ipertrofia: 3–4×8–12, 2″ di ritorno eccentrico",
      "Volume controllato: 3×12–15 a carico moderato, zero rimbalzi",
      "Unilaterale assistito: serie alternate se serve correggere asimmetrie",
    ],
    errors: [
      "Sollevare il bacino o staccare la zona lombare",
      "Chiudere le ginocchia verso l’interno sotto carico",
      "Usare un’escursione più ampia della propria mobilità",
      "Accelerare la discesa o rimbalzare in fondo",
      "Inseguire il pacco pesi perdendo l’assetto",
    ],
    trainer:
      "Tratta la pressa come uno squat guidato, non come una gara al massimo peso. Quando la tecnica è stabile, il carico arriva da solo — e resta produttivo.",
    galleryNote: "Gallery in allenamento in arrivo: foto dedicate dal team Revenge.",
  },
  {
    id: "leg-curl-extension",
    number: "02",
    name: "Leg Curl / Leg Extension",
    shortName: "Curl · Extension",
    brand: "Panatta",
    status: "Disponibile",
    image: "/media/new-machines/panatta-dual-leg-extension-curl.webp",
    alt: "Dual Leg Extension e Seated Leg Curling Panatta 1SCD080",
    tagline: "Davanti e dietro la coscia, stessa postazione.",
    lead: "La Dual Panatta unisce Leg Extension e Seated Leg Curl: due gesti fondamentali per bilanciare quadricipiti e ischiocrurali. È lo strumento ideale per isolare, raffinare il controllo del ginocchio e chiudere una seduta gambe con qualità muscolare elevata.",
    focus: "Equilibrio anteriore / posteriore della coscia",
    primaryMuscles: ["Retto femorale e vasti (extension)", "Bicipite femorale (curl)", "Semitendinoso e semimembranoso"],
    secondaryMuscles: ["Gastrocnemio in assistenza nel curl", "Stabilizzatori del bacino e del tronco"],
    trainingRole: [
      "Accessorio di qualità dopo pressa o hack squat",
      "Correzione degli squilibri tra catena anteriore e posteriore",
      "Lavoro mirato in ipertrofia con carichi moderati",
      "Supporto al controllo articolare del ginocchio nel range controllabile",
    ],
    cues: [
      "Allinea il ginocchio all’asse di rotazione prima di caricare",
      "Regola schienale, sedile e rulli finché l’assetto è naturale",
      "Extension: estendi senza slancio e senza forzare il blocco",
      "Curl: bacino aderente, flessione guidata, ritorno lento",
      "Respira sulla fase di sforzo, non trattenere inutilmente",
    ],
    programming: [
      "Extension ipertrofia: 3×10–15, 1″ di pausa in alto controllata",
      "Curl forza-resistenza: 3×8–12 con eccentrica da 3″",
      "Superserie A/B: extension + curl, recupero 90–120″ tra le coppie",
      "Finisher: 2×15–20 leggere a fine seduta, tecnica prioritaria",
    ],
    errors: [
      "Usare lo slancio del busto per muovere il pacco pesi",
      "Disallineare ginocchio e perno della macchina",
      "Bloccare violentemente in estensione completa",
      "Sollevare il bacino durante il curl",
      "Abbandonare il peso nella fase di ritorno",
    ],
    trainer:
      "Qui non vince chi alza di più: vince chi sente il muscolo lavorare per tutta l’escursione. Regola, allinea, poi allena.",
    galleryNote: "Gallery in allenamento in arrivo: foto dedicate dal team Revenge.",
  },
  {
    id: "hack-squat",
    number: "03",
    name: "Hack Squat",
    shortName: "Hack Squat",
    brand: "Gymleco",
    status: "Disponibile",
    image: "/media/new-machines/gymleco-hacklift.webp",
    alt: "Hacklift 244 Gymleco",
    tagline: "Schema di squat, traiettoria guidata, spinta pura.",
    lead: "L’Hack Squat Gymleco riproduce lo schema dello squat su un carrello inclinato con schiena e spalle sostenute. È una macchina di spinta potente: permette di sovraccaricare quadricipiti e glutei mantenendo una base stabile, ideale per progressioni di forza e per chi vuole intensità senza gestire un bilanciere libero.",
    focus: "Spinta guidata stile squat",
    primaryMuscles: ["Quadricipite femorale", "Grande gluteo"],
    secondaryMuscles: ["Ischiocrurali", "Adduttori", "Gastrocnemio e soleo", "Muscolatura del tronco"],
    trainingRole: [
      "Secondo esercizio primario nelle sedute di spinta gambe",
      "Costruzione di forza vicino alla fatica con appoggi esterni",
      "Complemento allo squat libero, non rivale obbligato",
      "Ottimo per lavorare profondità controllata e assetto piedi",
    ],
    cues: [
      "Testa, schiena e bacino sempre a contatto con i supporti",
      "Piede intero in appoggio: niente sollevamento del tallone",
      "Ginocchia sulla linea delle punte, senza collasso interno",
      "Scendi solo fin dove resti compatto e stabile",
      "In alto resta una lieve flessione controllata prima di riagganciare",
    ],
    programming: [
      "Forza: 4×5–8, dischi equilibrati, recupero lungo",
      "Ipertrofia: 3–4×8–12, pausa 1″ in basso se la mobilità lo consente",
      "Tecnica: 3×10 con carico moderato e focus sull’appoggio",
      "Dopo pressa: 3×8 come secondo blocco di spinta",
    ],
    errors: [
      "Staccare schiena o bacino dal supporto",
      "Far collassare le ginocchia verso l’interno",
      "Perdere l’appoggio completo del piede",
      "Rimbalzare nel punto più basso",
      "Inseguire profondità o carico non controllabili",
    ],
    trainer:
      "La profondità si guadagna, non si forza. Riscalda, trova l’appoggio, poi costruisci il carico settimana dopo settimana.",
    galleryNote: "Gallery in allenamento in arrivo: foto dedicate dal team Revenge.",
  },
  {
    id: "super-vertical-leg-press",
    number: "04",
    name: "Super Vertical Leg Press",
    shortName: "Vertical Press",
    brand: "Panatta",
    status: "In arrivo",
    incoming: true,
    image: "/media/new-machines/panatta-super-vertical-leg-press.webp",
    alt: "Super Vertical Leg Press Panatta 1FW093",
    tagline: "La prossima protagonista dell’area gambe.",
    lead: "La Super Vertical Leg Press Panatta 1FW093 arriverà per ampliare le opzioni di spinta: traiettoria quasi verticale, caricamento a dischi, schienale e pedana regolabili. Non è un doppione della pressa orizzontale Life Fitness: cambia angolo, sensazione e tipo di progressione, offrendo un secondo strumento di alto livello per forza e volume.",
    focus: "Spinta verticale a dischi · in arrivo",
    primaryMuscles: ["Quadricipite femorale", "Grande gluteo"],
    secondaryMuscles: ["Ischiocrurali", "Adduttori", "Polpacci", "Stabilizzatori del tronco"],
    trainingRole: [
      "Futuro esercizio primario o secondario di spinta",
      "Progressioni a dischi con finecorsa di sicurezza",
      "Variazione di assetto rispetto alla pressa orizzontale",
      "Strumento per atleti che cercano carico elevato in traiettoria guidata",
    ],
    cues: [
      "Impara prima regolazioni, leva di sicurezza e finecorsa",
      "Bacino e schiena aderenti per tutta la corsa",
      "Scendi solo entro l’escursione controllabile",
      "Spingi con piede intero, ginocchia tracciate",
      "Riaggancia sempre prima di uscire dalla macchina",
    ],
    programming: [
      "Fase di ingresso: carichi educativi, focus su assetto e sicurezza",
      "Forza: 4×4–8 quando la tecnica è consolidata",
      "Volume: 3×8–12 come alternativa o complemento alla pressa orizzontale",
      "Non trattare il carico massimo dichiarato come obiettivo di allenamento",
    ],
    errors: [
      "Staccare bacino o schiena dal supporto",
      "Scendere oltre la mobilità controllabile",
      "Collasso delle ginocchia verso l’interno",
      "Rimbalzare in basso o bloccare violentemente in alto",
      "Inseguire numeri da catalogo invece della qualità",
    ],
    trainer:
      "Quando arriverà, la prima settimana non è per i record: è per conoscere la macchina. Sicurezza e assetto prima di ogni disco in più.",
    galleryNote: "Gallery e scatti in sala saranno aggiunti dopo installazione e briefing del team.",
  },
];
