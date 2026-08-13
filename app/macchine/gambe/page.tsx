import type { Metadata } from "next";
import LegsHub from "./legs-hub";

export const metadata: Metadata = {
  title: "Allenamento Gambe | 21 macchine | Revenge Gym Ladispoli",
  description:
    "Revenge Gym non compete sul prezzo più basso: compete sulla qualità delle macchine. Area gambe completa a Ladispoli — presse, hack squat, Panatta, Hammer Strength e molto altro.",
  alternates: { canonical: "/macchine/gambe/" },
  openGraph: {
    title: "Allenamento Gambe | Revenge Gym",
    description: "Catalogo completo arti inferiori con foto reali dalla sala di Ladispoli.",
    images: [{ url: "/photos/machines/gambe/pressa-orizzontale-life-fitness.webp", alt: "Pressa Life Fitness — Revenge Gym" }],
  },
};

export default function LegsPage() {
  return <LegsHub />;
}
