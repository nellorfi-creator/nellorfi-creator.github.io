import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { absMachines, getAbsMachine } from "@/lib/abs-machines";
import AbsMachineDetail from "./machine-detail";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return absMachines.map((machine) => ({ slug: machine.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const machine = getAbsMachine(slug);
  if (!machine) return { title: "Macchina non trovata | Revenge Gym" };
  return {
    title: `${machine.name} · ${machine.brand} | Addominali | Revenge Gym`,
    description: machine.lead[0]?.slice(0, 155) ?? machine.tagline,
    openGraph: {
      title: `${machine.name} · Revenge Gym`,
      description: machine.tagline,
      images: [{ url: machine.image, alt: machine.alt }],
    },
  };
}

export default async function AbsMachinePage({ params }: Props) {
  const { slug } = await params;
  const machine = getAbsMachine(slug);
  if (!machine) notFound();
  const index = absMachines.findIndex((item) => item.id === machine.id);
  const prev = absMachines[(index - 1 + absMachines.length) % absMachines.length];
  const next = absMachines[(index + 1) % absMachines.length];
  return <AbsMachineDetail machine={machine} prev={prev} next={next} />;
}
