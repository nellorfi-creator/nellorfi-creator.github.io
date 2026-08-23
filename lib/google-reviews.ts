export type GoogleReview = {
  id: string;
  author: string;
  rating: 4 | 5;
  text: string;
  relativeDate?: string;
};

/** Recensioni pubbliche Google Maps — PALESTRA Revenge GYM, Ladispoli. */
export const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/place/PALESTRA+Revenge+GYM/@41.9576599,12.085695,17z/data=!4m8!3m7!1s0x132f55238ac55763:0xff27476fde67d78!8m2!3d41.9576599!4d12.085695!9m1!1b1";

export const GOOGLE_REVIEW_COUNT = 29;
export const GOOGLE_REVIEW_AVERAGE = 4.8;

export const googleReviews: GoogleReview[] = [
  {
    id: "silvia-silvia",
    author: "Silvia Silvia",
    rating: 5,
    relativeDate: "7 mesi fa",
    text: "Palestra pulita, piena di macchinari nuovi e di qualità. Gino il proprietario/istruttore è una garanzia di professionalità e competenza! Me l'hanno consigliata e mi trovo davvero bene: la consiglio a chi deve ancora decidere in quale palestra fare sala pesi come si deve.",
  },
  {
    id: "enrico-picillo",
    author: "Enrico Picillo",
    rating: 5,
    relativeDate: "6 mesi fa",
    text: "Palestra attrezzatissima, con macchinari davvero top. Proprietari fantastici che amano quello che fanno: la passione si sente appena si entra. Zona relax vintage che da sola varrebbe il mensile.",
  },
  {
    id: "antonio-mancinelli",
    author: "Antonio Mancinelli",
    rating: 5,
    relativeDate: "5 mesi fa",
    text: "Personale dello staff serio, cordiale e professionale. Palestra fornitissima di macchinari: mi sono trovato sin da subito benissimo, seguito e consigliato nello svolgimento degli esercizi.",
  },
  {
    id: "alessio-dandrea",
    author: "Alessio D'Andrea",
    rating: 5,
    text: "Luogo pulito, professionale, macchinari top. Proprietà professionale e gentile.",
  },
  {
    id: "roberto-piscedda",
    author: "Roberto Piscedda",
    rating: 5,
    text: "Massima pulizia, macchinari di ultima generazione e professionalità di alto livello.",
  },
  {
    id: "fabianella",
    author: "Fabianella",
    rating: 5,
    text: "Una palestra davvero wow: attrezzatura super professionale.",
  },
  {
    id: "matteo-santarelli",
    author: "Matteo Santarelli",
    rating: 5,
    text: "Conosciuta grazie al suggerimento di un ragazzo. Palestra completa di ogni macchinario e con diverse marche, a mio avviso tra le migliori (Hammer, Panatta, Precor, Life Fitness ecc.). Si nota subito la professionalità e la cura nella gestione: pulizia e ordine quasi maniacali, ma necessari se si vuole una palestra che funzioni e un cliente soddisfatto. A completare il tutto la competenza tecnica del proprietario, ex campione di culturismo Gino Lauro, e della sua famiglia. Se siete a Ladispoli o nelle vicinanze, andate ad allenarvi alla Revenge!",
  },
  {
    id: "diego-monti",
    author: "Diego Monti",
    rating: 5,
    text: "Il momento più importante della giornata è quello che si dedica a sé stessi, alla cura del corpo e al benessere dell'anima. Quel breve momento, lontano dal caos e dallo stress quotidiano, ho scelto di passarlo alla Revenge Gym. L'ambiente è essenziale e pulito, gli attrezzi sono nuovissimi e sempre funzionanti, i proprietari sono cortesi e sempre disponibili. Insomma, davvero una gym! Consiglio.",
  },
  {
    id: "ilaria-marrani",
    author: "Ilaria Marrani",
    rating: 5,
    text: "Palestra molto accessoriata, personale cordiale e attento ai clienti. Le prime settimane mi hanno seguito passo passo per far sì che eseguissi al meglio tutti gli esercizi, poi mi hanno fornito una scheda mensile. Forse l'unica pecca è che è un po' difficile trovare il posto perché è nascosta in una viuzza, ma basta seguire le indicazioni. Anche gli spogliatoi sono molto belli e ampi. Mi piace soprattutto che non c'è troppa gente: puoi stare tranquillo per conto tuo. Consiglio caldamente l'iscrizione.",
  },
  {
    id: "danilo-pettinari",
    author: "Danilo Pettinari",
    rating: 5,
    text: "Palestra fantastica: professionalità, igiene, macchinari top. Un'eccellenza a Ladispoli.",
  },
  {
    id: "sebastiano-maltese",
    author: "Sebastiano Maltese",
    rating: 5,
    text: "Palestra eccellente a Ladispoli, dotata di attrezzature di ultima generazione e macchine uniche. Presente anche una scuola di boxe guidata dall'ottimo gestore Gino Lauro. Staff cordiale e sempre disponibile.",
  },
  {
    id: "paolo-toso",
    author: "Paolo Toso",
    rating: 5,
    text: "Grande Gino, palestra ben attrezzata e molto pulita. Macchine tutte nuove, buon ambiente. Palestra boxe fantastica. Complimenti Gino, te lo meriti.",
  },
  {
    id: "mauro-agostini",
    author: "Mauro Agostini",
    rating: 5,
    text: "Palestra molto attrezzata, ambiente amichevole. Gino e Stefania sono bravissimi e ti seguono sempre. Consigliatissima.",
  },
  {
    id: "francesca-ponzo",
    author: "Francesca Ponzo",
    rating: 5,
    text: "Mio figlio fa boxe e si trova benissimo.",
  },
  {
    id: "andrea-mignanti",
    author: "Andrea Mignanti",
    rating: 5,
    text: "Attrezzi Hammer di top qualità.",
  },
  {
    id: "giuseppe-talitro",
    author: "Giuseppe Talitro",
    rating: 5,
    text: "Una palestra molto attrezzata, con personale competente ed esperto nel settore che riesce a trasmettere la passione per il bodybuilding e la boxe.",
  },
  {
    id: "dima-voloshchuk",
    author: "Dima Voloshchuk",
    rating: 5,
    text: "Questa palestra è la migliore in assoluto.",
  },
  {
    id: "colonnelloperry",
    author: "Colonnelloperry_",
    rating: 4,
    text: "Sono iscritto ormai da diversi mesi e mi trovo bene: il personale è attento e cordiale. La palestra è ben attrezzata e non troppo affollata, quindi si riesce a stare abbastanza tranquilli. L'unica pecca è che, forse per le dimensioni della sala, è un po' satura di macchinari e lo spazio calpestabile è rimasto poco. La consiglio comunque.",
  },
];
