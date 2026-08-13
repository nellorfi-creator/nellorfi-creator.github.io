import type { Metadata } from "next";
import ShouldersHub from "./shoulders-hub";

export const metadata: Metadata = {
  title: "Allenamento Spalle | 5 macchine | Revenge Gym Ladispoli",
  description: "Esplora le 5 postazioni per le spalle di Revenge Gym: Nautilus, Precor, Panatta, Life Fitness e Multi Flight, con schede complete.",
  alternates: { canonical: "/macchine/spalle/" },
  openGraph: { title: "Allenamento Spalle | Revenge Gym", description: "Catalogo completo dell’area spalle di Revenge Gym Ladispoli.", images: [{ url: "/photos/machines/spalle/nautilus-nitro-plus-lateral-raise.webp", alt: "Nautilus Lateral Raise — Revenge Gym" }] },
};

export default function ShouldersPage() { return <ShouldersHub />; }
