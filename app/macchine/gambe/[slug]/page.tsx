import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLegMachine, legMachines } from "@/lib/leg-machines";
import MachineDetail from "./machine-detail";

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
    openGraph: {
      title: `${machine.name} · Revenge Gym`,
      description: machine.tagline,
      images: [{ url: machine.image, alt: machine.alt }],
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
  return <MachineDetail machine={machine} prev={prev} next={next} />;
}
