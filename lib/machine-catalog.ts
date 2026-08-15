import { absMachines } from "./abs-machines";
import { backMachines } from "./back-machines";
import { bicepsMachines } from "./biceps-machines";
import { chestMachines } from "./chest-machines";
import { legMachines } from "./leg-machines";
import type { Machine, MachineArea } from "./machines";
import { shoulderMachines } from "./shoulder-machines";
import { tricepsMachines } from "./triceps-machines";

export const MACHINE_SEARCH_MIN_CHARS = 3;

export type CatalogMachine = {
  key: string;
  id: string;
  name: string;
  brand: string;
  category: string;
  image: string;
  alt: string;
  area: MachineArea;
  areaLabel: string;
  href: string;
};

const areas: { area: MachineArea; label: string; machines: Machine[] }[] = [
  { area: "gambe", label: "Gambe", machines: legMachines },
  { area: "petto", label: "Petto", machines: chestMachines },
  { area: "dorso", label: "Dorso", machines: backMachines },
  { area: "spalle", label: "Spalle", machines: shoulderMachines },
  { area: "bicipiti", label: "Bicipiti", machines: bicepsMachines },
  { area: "tricipiti", label: "Tricipiti", machines: tricepsMachines },
  { area: "addominali", label: "Addominali", machines: absMachines },
];

export const machineCatalog: CatalogMachine[] = areas.flatMap(({ area, label, machines }) =>
  machines.map((machine) => ({
    key: `${area}-${machine.id}`,
    id: machine.id,
    name: machine.name,
    brand: machine.brand,
    category: machine.category,
    image: machine.image,
    alt: machine.alt,
    area,
    areaLabel: label,
    href: `/macchine/${area}/${machine.id}`,
  })),
);

export function foldSearchText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/['’]/g, "")
    .trim();
}

function tokens(value: string) {
  return foldSearchText(value).split(/[^a-z0-9]+/).filter(Boolean);
}

function prefixScore(value: string, query: string, exact: number, token: number) {
  const folded = foldSearchText(value);
  if (folded.startsWith(query)) return exact;
  if (tokens(value).some((part) => part.startsWith(query))) return token;
  return 0;
}

export function searchMachines(rawQuery: string, limit = 16): CatalogMachine[] {
  const query = foldSearchText(rawQuery);
  if (query.length < MACHINE_SEARCH_MIN_CHARS) return [];

  return machineCatalog
    .map((machine) => {
      const score = Math.max(
        prefixScore(machine.brand, query, 100, 95),
        prefixScore(machine.name, query, 80, 70),
        prefixScore(machine.category, query, 45, 40),
      );
      return score > 0 ? { machine, score } : null;
    })
    .filter((entry): entry is { machine: CatalogMachine; score: number } => entry !== null)
    .sort((a, b) => b.score - a.score || a.machine.name.localeCompare(b.machine.name, "it"))
    .slice(0, limit)
    .map((entry) => entry.machine);
}
