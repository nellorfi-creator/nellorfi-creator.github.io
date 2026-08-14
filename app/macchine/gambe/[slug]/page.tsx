import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLegMachine, legMachines } from "@/lib/leg-machines";
import MachineDetailView from "@/app/components/machine-detail-view";
import styles from "./page.module.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return legMachines.map((machine) => ({ slug: machine.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const machine = getLegMachine(slug);
  if (!machine) return { title: "Macchina non trovata | Revenge Gym" };
  return {
    title: `${machine.name} · ${machine.brand} | Gambe | Revenge Gym`,
    description: machine.lead[0]?.slice(0, 155) ?? machine.tagline,
    alternates: { canonical: `/macchine/gambe/${machine.id}/` },
    openGraph: {
      title: `${machine.name} · Revenge Gym`,
      description: machine.tagline,
      images: [{ url: machine.image, alt: machine.alt, width: 1200, height: 630 }],
    },
  };
}

export default async function LegMachinePage({ params }: Props) {
  const { slug } = await params;
  const machine = getLegMachine(slug);
  if (!machine) notFound();
  const index = legMachines.findIndex((item) => item.id === machine.id);
  const prev = legMachines[(index - 1 + legMachines.length) % legMachines.length];
  const next = legMachines[(index + 1) % legMachines.length];
  return (
    <MachineDetailView
      area="gambe"
      areaLabel="Gambe"
      leadLabel="GAMBE"
      pagerHomeLabel="Tutte le gambe"
      machine={machine}
      prev={prev}
      next={next}
      styles={styles}
      brandKicker="01 · IL MARCHIO"
      whyTitle="MACCHINA"
      figcaption="Foto dalla sala · Revenge Gym Ladispoli"
      showSheet
    />
  );
}
