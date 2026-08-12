export type SheetStep = {
  number: number;
  title: string;
  detail: string;
};

export type MachineSheet = {
  machineId: string;
  zone: "gambe";
  illustration: "pressa-orizzontale";
  steps: SheetStep[];
  setup: string[];
  avoid: string[];
};

const sheets: MachineSheet[] = [
  {
    machineId: "pressa-orizzontale-life-fitness",
    zone: "gambe",
    illustration: "pressa-orizzontale",
    setup: [
      "Regola lo schienale: zona lombare sempre a contatto",
      "Piedi sulla pedana, larghezza spalle o poco oltre",
      "Sblocca la sicura solo quando l’assetto è stabile",
    ],
    steps: [
      {
        number: 1,
        title: "Assetto",
        detail: "Seduto, schiena e bacino aderenti allo schienale per tutta la serie.",
      },
      {
        number: 2,
        title: "Piedi",
        detail: "Piedi stabili, punte leggermente verso l’esterno, ginocchia allineate alle punte.",
      },
      {
        number: 3,
        title: "Discesa",
        detail: "Scendi con controllo fino a dove mantieni contatto lombare — niente rimbalzi.",
      },
      {
        number: 4,
        title: "Spinta",
        detail: "Spingi attraverso l’intero piede. In alto non bloccare le ginocchia con violenza.",
      },
    ],
    avoid: [
      "Non staccare il bacino dallo schienale sotto carico",
      "Non far collassare le ginocchia verso l’interno",
      "Non inseguire escursioni che la tua mobilità non regge",
    ],
  },
];

export function getMachineSheet(machineId: string): MachineSheet | undefined {
  return sheets.find((sheet) => sheet.machineId === machineId);
}

export function hasMachineSheet(machineId: string): boolean {
  return sheets.some((sheet) => sheet.machineId === machineId);
}

export function getSheetSlugs(): string[] {
  return sheets.map((sheet) => sheet.machineId);
}

export function getSheetPath(zone: string, machineId: string): string {
  return `/macchine/${zone}/${machineId}/scheda`;
}
