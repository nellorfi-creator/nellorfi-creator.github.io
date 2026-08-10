import type { Metadata } from "next";
import LegsShowcase from "./legs-showcase";

export const metadata: Metadata = {
  title: "Allenamento Gambe | Macchine e metodo | Revenge Gym Ladispoli",
  description:
    "Area gambe Revenge Gym: Pressa Life Fitness, Leg Curl/Extension Panatta, Hack Squat Gymleco e Super Vertical Leg Press Panatta in arrivo. Cue tecnici e programmazione professionale.",
  openGraph: {
    title: "Allenamento Gambe | Revenge Gym",
    description: "Macchine, tecnica e programmazione per gli arti inferiori a Ladispoli.",
    images: [{ url: "/media/new-machines/life-fitness-leg-press.webp", alt: "Pressa Life Fitness — Revenge Gym" }],
  },
};

export default function LegsPage() {
  return <LegsShowcase />;
}
