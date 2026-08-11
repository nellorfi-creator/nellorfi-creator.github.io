import type { Metadata } from "next";
import ChestHub from "./chest-hub";

export const metadata: Metadata = {
  title: "Allenamento Petto | 12 macchine | Revenge Gym Ladispoli",
  description: "Esplora le 12 postazioni per il petto di Revenge Gym: presse, panche, Pec Fly, Panatta, HOIST, Life Fitness e Precor, con schede complete.",
  openGraph: {
    title: "Allenamento Petto | Revenge Gym",
    description: "Catalogo completo dell’area petto di Revenge Gym Ladispoli.",
    images: [{ url: "/photos/machines/petto/super-horizontal-multi-press-panatta.jpg", alt: "Super Horizontal Multi Press Panatta — Revenge Gym" }],
  },
};

export default function ChestPage() {
  return <ChestHub />;
}
