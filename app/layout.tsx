import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import Analytics from "@/app/components/analytics";
import { CONTACT_EMAIL, CONTACT_PHONE_TEL, LEGAL_ENTITY } from "@/lib/legal";
import { SITE_ORIGIN, SOCIAL_FACEBOOK, SOCIAL_INSTAGRAM } from "@/lib/site";
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
  metadataBase: new URL(SITE_ORIGIN),
  title: "Revenge Gym | Palestra e Sala Pesi a Ladispoli",
  description: "Revenge Gym è la palestra in Via Berna 8 a Ladispoli, con sala pesi, macchinari professionali, area boxe con ring e sacchi, e una sala relax con caffè e angolo retrò.",
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/brand/revenge-gym-logo.png", type: "image/png" },
    ],
    apple: "/brand/revenge-gym-logo.png",
  },
  manifest: "/manifest.webmanifest",
  keywords: ["palestra Ladispoli", "sala pesi Ladispoli", "boxe Ladispoli", "sala relax palestra", "Revenge Gym", "Panatta", "Hammer Strength", "Life Fitness", "Precor", "Hoist Fitness", "Nautilus", "Star Trac", "Gymleco", "Teca"],
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
  name: LEGAL_ENTITY.brand,
  legalName: LEGAL_ENTITY.legalName,
  taxID: LEGAL_ENTITY.taxId,
  url: SITE_ORIGIN,
  telephone: CONTACT_PHONE_TEL,
  email: CONTACT_EMAIL,
  sameAs: [SOCIAL_FACEBOOK, SOCIAL_INSTAGRAM],
  hasMap: "https://maps.google.com/?q=Via+Berna+8+00055+Ladispoli+RM",
  address: {
    "@type": "PostalAddress",
    streetAddress: LEGAL_ENTITY.street,
    addressLocality: LEGAL_ENTITY.city,
    postalCode: LEGAL_ENTITY.postalCode,
    addressRegion: LEGAL_ENTITY.province,
    addressCountry: LEGAL_ENTITY.country,
  },
  image: `${SITE_ORIGIN}/media/sala-attrezzi.webp`,
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "06:30", closes: "22:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "06:30", closes: "17:00" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it" className={`${inter.variable} ${barlow.variable}`}>
      <body>
        <a className="skip-link" href="#contenuto">Vai al contenuto</a>
        <div id="contenuto">{children}</div>
        <Analytics />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
