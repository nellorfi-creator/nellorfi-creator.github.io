import type { Metadata } from "next";
import MachineShowcase from "./machine-showcase";

export const metadata: Metadata = {
  title: "Nuove macchine 2025–2026 | Revenge Gym Ladispoli",
  description: "Scopri le nuove macchine arrivate a Revenge Gym e la Super Vertical Leg Press Panatta in arrivo.",
  alternates: { canonical: "/nuove-macchine/" },
};

export default function NewMachinesPage() {
  return <MachineShowcase />;
}
