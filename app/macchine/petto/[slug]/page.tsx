import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { chestMachines, getChestMachine } from "@/lib/chest-machines";
import ChestMachineDetail from "./machine-detail";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return chestMachines.map((machine) => ({ slug: machine.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const machine = getChestMachine(slug);
  if (!machine) return { title: "Macchina non trovata | Revenge Gym" };
  return {
    title: `${machine.name} · ${machine.brand} | Petto | Revenge Gym`,
    description: machine.lead[0]?.slice(0, 155) ?? machine.tagline,
    alternates: { canonical: `/macchine/petto/${machine.id}/` },
    openGraph: { title: `${machine.name} · Revenge Gym`, description: machine.tagline, images: [{ url: machine.image, alt: machine.alt }] },
  };
}

export default async function ChestMachinePage({ params }: Props) {
  const { slug } = await params;
  const machine = getChestMachine(slug);
  if (!machine) notFound();
  const index = chestMachines.findIndex((item) => item.id === machine.id);
  const prev = chestMachines[(index - 1 + chestMachines.length) % chestMachines.length];
  const next = chestMachines[(index + 1) % chestMachines.length];
  return <ChestMachineDetail machine={machine} prev={prev} next={next} />;
}
