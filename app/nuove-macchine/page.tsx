import type { Metadata } from "next";
import MachineShowcase from "./machine-showcase";

export const metadata: Metadata = {
  title: "Ultimi arrivi 2025–2026 | Revenge Gym Ladispoli",
  description: "Gli ultimi arrivi a Revenge Gym: otto macchine nuove già in sala, compresa la Super Vertical Leg Press Panatta. Il catalogo completo è nel menu Per gruppi muscolari.",
  alternates: { canonical: "/nuove-macchine/" },
};

export default function NewMachinesPage() {
  return <MachineShowcase />;
}
