import type { Metadata } from "next";
import MachineHub from "@/app/components/machine-hub";
import { bicepsMachines, bicepsZone } from "@/lib/biceps-machines";
import styles from "../machine-area.module.css";

export const metadata: Metadata = {
  title: "Allenamento Bicipiti | 4 macchine | Revenge Gym Ladispoli",
  description:
    "Esplora le 4 postazioni per i bicipiti di Revenge Gym: Hammer, Star Trac, Precor e Panatta, con schede complete.",
  alternates: { canonical: "/macchine/bicipiti/" },
  openGraph: {
    title: "Allenamento Bicipiti | Revenge Gym",
    description: "Catalogo completo dell’area bicipiti di Revenge Gym Ladispoli.",
    images: [{ url: "/photos/machines/bicipiti/biceps-curl-star-trac.webp", alt: "Star Trac Biceps Curl — Revenge Gym", width: 1200, height: 630 }],
  },
};

export default function BicepsPage() {
  return (
    <MachineHub
      area="bicipiti"
      areaLabel="Bicipiti"
      machines={bicepsMachines}
      zone={bicepsZone}
      styles={styles}
      athleteSrc="/photos/athletes/bicipiti-athlete-hero.webp"
      athleteAlt="Atleta dedicato all’allenamento dei bicipiti"
      catalogIntro="Quattro postazioni per allenare i bicipiti da traiettorie diverse. Apri ogni scheda per scoprire funzione, muscoli coinvolti, impostazione, programmazione ed errori comuni."
      ctaEm="SPINGERE CAMBIA TUTTO."
      ctaText="Vieni a Revenge Gym e costruisci la tua progressione bicipiti con lo staff."
    />
  );
}
