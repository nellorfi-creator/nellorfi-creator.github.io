import type { Metadata } from "next";
import MachineHub from "@/app/components/machine-hub";
import { backMachines, backZone } from "@/lib/back-machines";
import styles from "../machine-area.module.css";

export const metadata: Metadata = {
  title: "Allenamento Dorso | 10 macchine | Revenge Gym Ladispoli",
  description: "Esplora le 10 postazioni per il dorso di Revenge Gym: trazioni, rematori, pullover, T-Bar, Precor, Life Fitness e Technogym, con schede complete.",
  alternates: { canonical: "/macchine/dorso/" },
  openGraph: {
    title: "Allenamento Dorso | Revenge Gym",
    description: "Catalogo completo dell’area dorso di Revenge Gym Ladispoli.",
    images: [{ url: "/photos/machines/dorso/linear-row.webp", alt: "Linear Row — Revenge Gym", width: 1200, height: 630 }],
  },
};

export default function BackPage() {
  return (
    <MachineHub
      area="dorso"
      areaLabel="Dorso"
      machines={backMachines}
      zone={backZone}
      styles={styles}
      athleteSrc="/photos/athletes/dorso-athlete-hero.webp"
      athleteAlt="Atleta dedicato all’allenamento del dorso"
      catalogIntro="Dieci postazioni per allenare il dorso da traiettorie diverse. Apri ogni scheda per scoprire funzione, muscoli coinvolti, impostazione, programmazione ed errori comuni."
      ctaEm="TIRARE CAMBIA TUTTO."
      ctaText="Vieni a Revenge Gym e costruisci la tua progressione dorso con lo staff."
    />
  );
}
