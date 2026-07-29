import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Revenge Box | Functional Training a Ladispoli",
  description: "Functional training, weightlifting, open box e personal training a Ladispoli. Prenota la tua prova gratuita al Revenge Box.",
  keywords: ["palestra Ladispoli", "functional training Ladispoli", "Revenge Box", "weightlifting", "personal training"],
  openGraph: {
    title: "Revenge Box | La tua rivincita inizia oggi",
    description: "Functional training a Ladispoli. Allenati, evolvi, supera i tuoi limiti.",
    locale: "it_IT",
    type: "website",
    images: [{ url: "/og.png", width: 1728, height: 909, alt: "Revenge Box — La tua rivincita inizia oggi" }],
  },
  twitter: { card: "summary_large_image", title: "Revenge Box", description: "La tua rivincita inizia oggi.", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="it"><body>{children}</body></html>;
}
