import type { Metadata } from "next";
import MachineHub from "@/app/components/machine-hub";
import { chestMachines, chestZone } from "@/lib/chest-machines";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Allenamento Petto | 12 macchine | Revenge Gym Ladispoli",
  description: "Esplora le 12 postazioni per il petto di Revenge Gym: presse, panche, Pec Fly, Panatta, HOIST, Life Fitness e Precor, con schede complete.",
  alternates: { canonical: "/macchine/petto/" },
  openGraph: {
    title: "Allenamento Petto | Revenge Gym",
    description: "Catalogo completo dell’area petto di Revenge Gym Ladispoli.",
    images: [{ url: "/photos/machines/petto/super-horizontal-multi-press-panatta.jpg", alt: "Super Horizontal Multi Press Panatta — Revenge Gym", width: 1200, height: 630 }],
  },
};

export default function ChestPage() {
  return (
    <MachineHub
      area="petto"
      areaLabel="Petto"
      machines={chestMachines}
      zone={chestZone}
      styles={styles}
      athleteSrc="/photos/athletes/petto-athlete-hero.webp"
      athleteAlt="Atleta dedicato all’allenamento del petto"
      catalogIntro="Dodici postazioni per allenare il petto da angoli diversi. Apri ogni scheda per scoprire funzione, muscoli coinvolti, impostazione, programmazione ed errori comuni."
      ctaEm="SPINGERE CAMBIA TUTTO."
      ctaText="Vieni a Revenge Gym e costruisci la tua progressione petto con lo staff."
    />
  );
}
