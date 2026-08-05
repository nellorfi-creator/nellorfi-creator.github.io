import type { Metadata } from "next";
import MachineShowcase from "./machine-showcase";

export const metadata: Metadata = {
  title: "Nuove macchine 2025–2026 | Revenge Gym Ladispoli",
  description: "Scopri le nuove macchine arrivate a Revenge Gym da settembre 2025 e la Super Vertical Leg Press Panatta in arrivo.",
};

export default function NewMachinesPage() {
  return <MachineShowcase />;
}
