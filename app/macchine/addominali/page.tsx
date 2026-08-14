import type { Metadata } from "next";
import MachineHub from "@/app/components/machine-hub";
import { absMachines, absZone } from "@/lib/abs-machines";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Allenamento Addominali | 1 macchina | Revenge Gym Ladispoli",
  description:
    "Esplora la postazione addominali di Revenge Gym: Plate Loaded Abdominal Oblique Crunch Hammer Strength, con scheda completa.",
  alternates: { canonical: "/macchine/addominali/" },
  openGraph: {
    title: "Allenamento Addominali | Revenge Gym",
    description: "Catalogo dell’area addominali di Revenge Gym Ladispoli.",
    images: [{ url: "/photos/machines/addominali/abdominal-oblique-crunch-hammer.webp", alt: "Hammer Abdominal Oblique Crunch — Revenge Gym", width: 1200, height: 630 }],
  },
};

export default function AbsPage() {
  return (
    <MachineHub
      area="addominali"
      areaLabel="Addominali"
      machines={absMachines}
      zone={absZone}
      styles={styles}
      athleteSrc="/photos/athletes/addominali-athlete-hero.webp"
      athleteAlt="Atleta dedicato all’allenamento degli addominali"
      catalogIntro="Una postazione dedicata al core. Apri la scheda per scoprire funzione, muscoli coinvolti, impostazione, programmazione ed errori comuni."
      ctaEm="SPINGERE CAMBIA TUTTO."
      ctaText="Vieni a Revenge Gym e costruisci la tua progressione core con lo staff."
    />
  );
}
