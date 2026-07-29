import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.GITHUB_PAGES === "true" ? "https://nellorfi-creator.github.io" : "https://revenge-box-ladispoli.nello-rfialt.chatgpt.site"),
  title: "Revenge Gym | Palestra e Sala Pesi a Ladispoli",
  description: "Revenge Gym è la palestra in Via Berna 8 a Ladispoli, con sala pesi, macchinari professionali e area boxe con ring e sacchi.",
  keywords: ["palestra Ladispoli", "sala pesi Ladispoli", "boxe Ladispoli", "Revenge Gym", "Panatta", "Hammer Strength"],
  openGraph: {
    title: "Revenge Gym | La tua rivincita inizia oggi",
    description: "Palestra e sala pesi a Ladispoli. Allenati, evolvi, supera i tuoi limiti.",
    locale: "it_IT",
    type: "website",
    images: [{ url: "/og.png", width: 1728, height: 909, alt: "Revenge Gym — La tua rivincita inizia oggi" }],
  },
  twitter: { card: "summary_large_image", title: "Revenge Gym", description: "La tua rivincita inizia oggi.", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="it"><body>{children}</body></html>;
}
