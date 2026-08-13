import type { MetadataRoute } from "next";
import { absMachines } from "@/lib/abs-machines";
import { backMachines } from "@/lib/back-machines";
import { bicepsMachines } from "@/lib/biceps-machines";
import { chestMachines } from "@/lib/chest-machines";
import { legMachines } from "@/lib/leg-machines";
import { shoulderMachines } from "@/lib/shoulder-machines";
import { tricepsMachines } from "@/lib/triceps-machines";

export const dynamic = "force-static";

const origin = "https://revenge-gym.github.io";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "/",
    "/boxe/",
    "/nuove-macchine/",
    "/privacy/",
    "/macchine/gambe/",
    "/macchine/petto/",
    "/macchine/dorso/",
    "/macchine/spalle/",
    "/macchine/bicipiti/",
    "/macchine/tricipiti/",
    "/macchine/addominali/",
  ];
  const collections = [
    ["gambe", legMachines],
    ["petto", chestMachines],
    ["dorso", backMachines],
    ["spalle", shoulderMachines],
    ["bicipiti", bicepsMachines],
    ["tricipiti", tricepsMachines],
    ["addominali", absMachines],
  ] as const;
  const machinePaths = collections.flatMap(([area, machines]) =>
    machines.map((machine) => `/macchine/${area}/${machine.id}/`),
  );

  return [...staticPaths, ...machinePaths].map((path) => ({
    url: `${origin}${path}`,
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
