import type { Metadata } from "next";
import MachineHub from "@/app/components/machine-hub";
import { legMachines, legZone } from "@/lib/leg-machines";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Allenamento Gambe | 21 macchine | Revenge Gym Ladispoli",
  description:
    "Revenge Gym non compete sul prezzo più basso: compete sulla qualità delle macchine. Area gambe completa a Ladispoli — presse, hack squat, Panatta, Hammer Strength e molto altro.",
  alternates: { canonical: "/macchine/gambe/" },
  openGraph: {
    title: "Allenamento Gambe | Revenge Gym",
    description: "Catalogo completo arti inferiori con foto reali dalla sala di Ladispoli.",
    images: [{ url: "/photos/machines/gambe/pressa-orizzontale-life-fitness.webp", alt: "Pressa Life Fitness — Revenge Gym", width: 1200, height: 630 }],
  },
};

export default function LegsPage() {
  return (
    <MachineHub
      area="gambe"
      areaLabel="Gambe"
      machines={legMachines}
      zone={legZone}
      styles={styles}
      athleteSrc="/photos/athletes/gambe-athlete-hero.webp"
      athleteAlt="Atleta dedicata all’allenamento delle gambe"
      catalogIntro="Ventuno postazioni fotografate in sala per gli arti inferiori. Brand professionali, testi tecnici corposo, focus su chi allena per qualità — non per trovare l’abbonamento più basso della zona."
      ctaEm="SPINGERE CAMBIA TUTTO."
      ctaText="Vieni a Revenge Gym e costruisci la tua progressione gambe con lo staff."
    />
  );
}
