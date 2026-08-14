import type { Metadata } from "next";
import MachineHub from "@/app/components/machine-hub";
import { shoulderMachines, shoulderZone } from "@/lib/shoulder-machines";
import styles from "../machine-area.module.css";

export const metadata: Metadata = {
  title: "Allenamento Spalle | 5 macchine | Revenge Gym Ladispoli",
  description: "Esplora le 5 postazioni per le spalle di Revenge Gym: Nautilus, Precor, Panatta, Life Fitness e Multi Flight, con schede complete.",
  alternates: { canonical: "/macchine/spalle/" },
  openGraph: { title: "Allenamento Spalle | Revenge Gym", description: "Catalogo completo dell’area spalle di Revenge Gym Ladispoli.", images: [{ url: "/photos/machines/spalle/nautilus-nitro-plus-lateral-raise.webp", alt: "Nautilus Lateral Raise — Revenge Gym", width: 1200, height: 630 }] },
};

export default function ShouldersPage() {
  return (
    <MachineHub
      area="spalle"
      areaLabel="Spalle"
      machines={shoulderMachines}
      zone={shoulderZone}
      styles={styles}
      athleteSrc="/photos/athletes/spalle-athlete-hero.webp"
      athleteAlt="Atleta dedicata all’allenamento delle spalle"
      catalogIntro="Cinque postazioni per allenare le spalle da traiettorie diverse. Apri ogni scheda per scoprire funzione, muscoli coinvolti, impostazione, programmazione ed errori comuni."
      ctaEm="SPINGERE CAMBIA TUTTO."
      ctaText="Vieni a Revenge Gym e costruisci la tua progressione spalle con lo staff."
    />
  );
}
