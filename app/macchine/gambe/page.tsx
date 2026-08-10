import type { Metadata } from "next";
import LegsHub from "./legs-hub";

export const metadata: Metadata = {
  title: "Allenamento Gambe | 21 macchine | Revenge Gym Ladispoli",
  description:
    "Allena le gambe a Revenge Gym: pressa, hack squat, leg curl, hip thrust, glute machine e molto altro. Scegli la macchina e apri la scheda tecnica.",
  openGraph: {
    title: "Allenamento Gambe | Revenge Gym",
    description: "Catalogo completo arti inferiori con foto reali dalla sala di Ladispoli.",
    images: [{ url: "/photos/machines/gambe/pressa-orizzontale-life-fitness.webp", alt: "Pressa Life Fitness — Revenge Gym" }],
  },
};

export default function LegsPage() {
  return <LegsHub />;
}
