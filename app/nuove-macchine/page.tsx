import type { Metadata } from "next";
import MachineShowcase from "./machine-showcase";

export const metadata: Metadata = {
  title: "Ultimi arrivi 2025–2026 · HOIST RS-1201 in arrivo | Revenge Gym Ladispoli",
  description: "Gli ultimi arrivi a Revenge Gym: otto macchine nuove già in sala e la HOIST Fitness RS-1201 Lat Pulldown ROC-IT in arrivo a fine dicembre con guida animata e simulatore biomeccanico.",
  alternates: { canonical: "/nuove-macchine/" },
};

export default function NewMachinesPage() {
  return <MachineShowcase />;
}
