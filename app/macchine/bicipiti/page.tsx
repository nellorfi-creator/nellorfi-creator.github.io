import type { Metadata } from "next";
import BicepsHub from "./biceps-hub";

export const metadata: Metadata = {
  title: "Allenamento Bicipiti | 4 macchine | Revenge Gym Ladispoli",
  description:
    "Esplora le 4 postazioni per i bicipiti di Revenge Gym: Hammer, Star Trac, Precor e Panatta, con schede complete.",
  alternates: { canonical: "/macchine/bicipiti/" },
  openGraph: {
    title: "Allenamento Bicipiti | Revenge Gym",
    description: "Catalogo completo dell’area bicipiti di Revenge Gym Ladispoli.",
    images: [{ url: "/photos/machines/bicipiti/biceps-curl-star-trac.webp", alt: "Star Trac Biceps Curl — Revenge Gym" }],
  },
};

export default function BicepsPage() {
  return <BicepsHub />;
}
