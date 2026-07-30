import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nellorfi-creator.github.io"),
  title: "Revenge Gym | Palestra e Sala Pesi a Ladispoli",
  description: "Revenge Gym è la palestra in Via Berna 8 a Ladispoli, con sala pesi, macchinari professionali e area boxe con ring e sacchi.",
  keywords: ["palestra Ladispoli", "sala pesi Ladispoli", "boxe Ladispoli", "Revenge Gym", "Panatta", "Hammer Strength"],
  openGraph: {
    title: "Revenge Gym | La tua rivincita inizia oggi",
    description: "Palestra e sala pesi a Ladispoli. Allenati, evolvi, supera i tuoi limiti.",
    locale: "it_IT",
    type: "website",
    images: [{ url: "/media/sala-attrezzi.webp", alt: "Revenge Gym — La tua rivincita inizia oggi" }],
  },
  twitter: { card: "summary_large_image", title: "Revenge Gym", description: "La tua rivincita inizia oggi.", images: ["/media/sala-attrezzi.webp"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="it"><body>{children}</body></html>;
}
