import type { Metadata } from "next";
import MachineHub from "@/app/components/machine-hub";
import { tricepsMachines, tricepsZone } from "@/lib/triceps-machines";
import styles from "../machine-area.module.css";

export const metadata: Metadata = {
  title: "Allenamento Tricipiti | 3 macchine | Revenge Gym Ladispoli",
  description:
    "Esplora le 3 postazioni per i tricipiti di Revenge Gym: Hammer Strength e Panatta, con schede complete.",
  alternates: { canonical: "/macchine/tricipiti/" },
  openGraph: {
    title: "Allenamento Tricipiti | Revenge Gym",
    description: "Catalogo completo dell’area tricipiti di Revenge Gym Ladispoli.",
    images: [{ url: "/photos/machines/tricipiti/seated-dip-hammer.webp", alt: "Hammer Seated Dip — Revenge Gym", width: 1200, height: 630 }],
  },
};

export default function TricepsPage() {
  return (
    <MachineHub
      area="tricipiti"
      areaLabel="Tricipiti"
      machines={tricepsMachines}
      zone={tricepsZone}
      styles={styles}
      athleteSrc="/photos/athletes/tricipiti-athlete-hero.webp"
      athleteAlt="Atleta dedicato all’allenamento dei tricipiti"
      catalogIntro="Tre postazioni per allenare i tricipiti da traiettorie diverse. Apri ogni scheda per scoprire funzione, muscoli coinvolti, impostazione, programmazione ed errori comuni."
      ctaEm="SPINGERE CAMBIA TUTTO."
      ctaText="Vieni a Revenge Gym e costruisci la tua progressione tricipiti con lo staff."
    />
  );
}
