import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { tricepsMachines, getTricepsMachine } from "@/lib/triceps-machines";
import MachineDetailView from "@/app/components/machine-detail-view";
import styles from "../../machine-detail.module.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return tricepsMachines.map((machine) => ({ slug: machine.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const machine = getTricepsMachine(slug);
  if (!machine) return { title: "Macchina non trovata | Revenge Gym" };
  return {
    title: `${machine.name} · ${machine.brand} | Tricipiti | Revenge Gym`,
    description: machine.lead[0]?.slice(0, 155) ?? machine.tagline,
    alternates: { canonical: `/macchine/tricipiti/${machine.id}/` },
    openGraph: {
      title: `${machine.name} · Revenge Gym`,
      description: machine.tagline,
      images: [{ url: machine.image, alt: machine.alt, width: 1200, height: 630 }],
    },
  };
}

export default async function TricepsMachinePage({ params }: Props) {
  const { slug } = await params;
  const machine = getTricepsMachine(slug);
  if (!machine) notFound();
  const index = tricepsMachines.findIndex((item) => item.id === machine.id);
  const prev = tricepsMachines[(index - 1 + tricepsMachines.length) % tricepsMachines.length];
  const next = tricepsMachines[(index + 1) % tricepsMachines.length];
  return (
    <MachineDetailView
      area="tricipiti"
      areaLabel="Tricipiti"
      leadLabel="TRICIPITI"
      pagerHomeLabel="Tutti i tricipiti"
      machine={machine}
      prev={prev}
      next={next}
      styles={styles}
    />
  );
}
