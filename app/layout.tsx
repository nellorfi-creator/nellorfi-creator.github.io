import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-barlow",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://revenge-gym.github.io"),
  title: "Revenge Gym | Palestra e Sala Pesi a Ladispoli",
  description: "Revenge Gym è la palestra in Via Berna 8 a Ladispoli, con sala pesi, macchinari professionali, area boxe con ring e sacchi, e una sala relax con caffè e angolo retrò.",
  alternates: { canonical: "/" },
  icons: {
    icon: "/brand/revenge-gym-logo.png",
    apple: "/brand/revenge-gym-logo.png",
  },
  keywords: ["palestra Ladispoli", "sala pesi Ladispoli", "boxe Ladispoli", "sala relax palestra", "Revenge Gym", "Panatta", "Hammer Strength", "Life Fitness", "Precor", "Hoist Fitness", "Nautilus", "Star Trac", "Gymleco"],
  openGraph: {
    title: "Revenge Gym | La tua rivincita inizia oggi",
    description: "Palestra e sala pesi a Ladispoli. Allenati, evolvi, supera i tuoi limiti.",
    locale: "it_IT",
    type: "website",
    url: "/",
    siteName: "Revenge Gym",
    images: [{ url: "/media/sala-attrezzi.webp", alt: "Revenge Gym — La tua rivincita inizia oggi", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: "Revenge Gym", description: "La tua rivincita inizia oggi.", images: ["/media/sala-attrezzi.webp"] },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HealthClub",
  name: "Revenge Gym",
  url: "https://revenge-gym.github.io",
  telephone: "+393475368488",
  email: "laurogino@tiscali.it",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Via Berna 8",
    addressLocality: "Ladispoli",
    postalCode: "00055",
    addressRegion: "RM",
    addressCountry: "IT",
  },
  image: "https://revenge-gym.github.io/media/sala-attrezzi.webp",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it" className={`${inter.variable} ${barlow.variable}`}>
      <body>
        <a className="skip-link" href="#contenuto">Vai al contenuto</a>
        <div id="contenuto">{children}</div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
