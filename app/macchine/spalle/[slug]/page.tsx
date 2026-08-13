import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { shoulderMachines, getShoulderMachine } from "@/lib/shoulder-machines";
import ShoulderMachineDetail from "./machine-detail";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return shoulderMachines.map((machine) => ({ slug: machine.id })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; const machine = getShoulderMachine(slug); if (!machine) return { title: "Macchina non trovata | Revenge Gym" }; return { title: `${machine.name} · ${machine.brand} | Spalle | Revenge Gym`, description: machine.lead[0]?.slice(0, 155) ?? machine.tagline, alternates: { canonical: `/macchine/spalle/${machine.id}/` }, openGraph: { title: `${machine.name} · Revenge Gym`, description: machine.tagline, images: [{ url: machine.image, alt: machine.alt }] } }; }
export default async function ShoulderMachinePage({ params }: Props) { const { slug } = await params; const machine = getShoulderMachine(slug); if (!machine) notFound(); const index = shoulderMachines.findIndex((item) => item.id === machine.id); const prev = shoulderMachines[(index - 1 + shoulderMachines.length) % shoulderMachines.length]; const next = shoulderMachines[(index + 1) % shoulderMachines.length]; return <ShoulderMachineDetail machine={machine} prev={prev} next={next} />; }
