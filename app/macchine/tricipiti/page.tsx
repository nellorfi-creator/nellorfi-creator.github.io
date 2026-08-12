import type { Metadata } from "next";
import TricepsHub from "./triceps-hub";

export const metadata: Metadata = {
  title: "Allenamento Tricipiti | 3 macchine | Revenge Gym Ladispoli",
  description:
    "Esplora le 3 postazioni per i tricipiti di Revenge Gym: Hammer Strength e Panatta, con schede complete.",
  openGraph: {
    title: "Allenamento Tricipiti | Revenge Gym",
    description: "Catalogo completo dell’area tricipiti di Revenge Gym Ladispoli.",
    images: [{ url: "/photos/machines/tricipiti/seated-dip-hammer.webp", alt: "Hammer Seated Dip — Revenge Gym" }],
  },
};

export default function TricepsPage() {
  return <TricepsHub />;
}
