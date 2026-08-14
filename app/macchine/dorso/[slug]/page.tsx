import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { backMachines, getBackMachine } from "@/lib/back-machines";
import MachineDetailView from "@/app/components/machine-detail-view";
import styles from "../../machine-detail.module.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return backMachines.map((machine) => ({ slug: machine.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const machine = getBackMachine(slug);
  if (!machine) return { title: "Macchina non trovata | Revenge Gym" };
  return {
    title: `${machine.name} · ${machine.brand} | Dorso | Revenge Gym`,
    description: machine.lead[0]?.slice(0, 155) ?? machine.tagline,
    alternates: { canonical: `/macchine/dorso/${machine.id}/` },
    openGraph: { title: `${machine.name} · Revenge Gym`, description: machine.tagline, images: [{ url: machine.image, alt: machine.alt, width: 1200, height: 630 }] },
  };
}

export default async function BackMachinePage({ params }: Props) {
  const { slug } = await params;
  const machine = getBackMachine(slug);
  if (!machine) notFound();
  const index = backMachines.findIndex((item) => item.id === machine.id);
  const prev = backMachines[(index - 1 + backMachines.length) % backMachines.length];
  const next = backMachines[(index + 1) % backMachines.length];
  return (
    <MachineDetailView
      area="dorso"
      areaLabel="Dorso"
      leadLabel="DORSO"
      pagerHomeLabel="Tutto il dorso"
      machine={machine}
      prev={prev}
      next={next}
      styles={styles}
    />
  );
}
