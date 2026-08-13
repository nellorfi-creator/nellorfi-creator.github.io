import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { tricepsMachines, getTricepsMachine } from "@/lib/triceps-machines";
import TricepsMachineDetail from "./machine-detail";

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
      images: [{ url: machine.image, alt: machine.alt }],
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
  return <TricepsMachineDetail machine={machine} prev={prev} next={next} />;
}
