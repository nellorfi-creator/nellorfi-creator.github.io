import type { Metadata } from "next";
import StatsView from "@/app/stats/stats-view";

export const metadata: Metadata = {
  title: "Revenge Gym",
  robots: { index: false, follow: false },
};

export default function StatsPage() {
  return <StatsView />;
}
