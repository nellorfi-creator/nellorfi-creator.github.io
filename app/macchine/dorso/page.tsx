import type { Metadata } from "next";
import BackHub from "./back-hub";

export const metadata: Metadata = {
  title: "Allenamento Dorso | 10 macchine | Revenge Gym Ladispoli",
  description: "Esplora le 10 postazioni per il dorso di Revenge Gym: trazioni, rematori, pullover, T-Bar, Precor, Life Fitness e Technogym, con schede complete.",
  openGraph: {
    title: "Allenamento Dorso | Revenge Gym",
    description: "Catalogo completo dell’area dorso di Revenge Gym Ladispoli.",
    images: [{ url: "/photos/machines/dorso/linear-row.webp", alt: "Linear Row — Revenge Gym" }],
  },
};

export default function BackPage() {
  return <BackHub />;
}
