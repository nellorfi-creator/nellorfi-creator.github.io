import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { bicepsMachines, getBicepsMachine } from "@/lib/biceps-machines";
import BicepsMachineDetail from "./machine-detail";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return bicepsMachines.map((machine) => ({ slug: machine.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const machine = getBicepsMachine(slug);
  if (!machine) return { title: "Macchina non trovata | Revenge Gym" };
  return {
    title: `${machine.name} · ${machine.brand} | Bicipiti | Revenge Gym`,
    description: machine.lead[0]?.slice(0, 155) ?? machine.tagline,
    openGraph: {
      title: `${machine.name} · Revenge Gym`,
      description: machine.tagline,
      images: [{ url: machine.image, alt: machine.alt }],
    },
  };
}

export default async function BicepsMachinePage({ params }: Props) {
  const { slug } = await params;
  const machine = getBicepsMachine(slug);
  if (!machine) notFound();
  const index = bicepsMachines.findIndex((item) => item.id === machine.id);
  const prev = bicepsMachines[(index - 1 + bicepsMachines.length) % bicepsMachines.length];
  const next = bicepsMachines[(index + 1) % bicepsMachines.length];
  return <BicepsMachineDetail machine={machine} prev={prev} next={next} />;
}
