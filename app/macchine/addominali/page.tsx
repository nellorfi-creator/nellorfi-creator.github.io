import type { Metadata } from "next";
import AbsHub from "./abs-hub";

export const metadata: Metadata = {
  title: "Allenamento Addominali | 1 macchina | Revenge Gym Ladispoli",
  description:
    "Esplora la postazione addominali di Revenge Gym: Plate Loaded Abdominal Oblique Crunch Hammer Strength, con scheda completa.",
  openGraph: {
    title: "Allenamento Addominali | Revenge Gym",
    description: "Catalogo dell’area addominali di Revenge Gym Ladispoli.",
    images: [{ url: "/photos/machines/addominali/abdominal-oblique-crunch-hammer.webp", alt: "Hammer Abdominal Oblique Crunch — Revenge Gym" }],
  },
};

export default function AbsPage() {
  return <AbsHub />;
}
