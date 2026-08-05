import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import LenisProvider from "../components/LenisProvider";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Sewali Musical Festival | Northeast Music Festival — Assam, September 2026",
  description:
    "An intimate evening of melodies and romance featuring the greatest Northeast singers. 4 PM to 10 PM, September 2026, Lokhra, Guwahati, Assam, Northeast India.",
  keywords: "Assam music festival, Northeast India, Bihu, Rito Riba, Sanko Raj, cultural event, Lokhra",
  openGraph: {
    title: "Sewali Musical Festival 2026",
    description: "An evening of melodies and romance in Lokhra, Guwahati, Assam",
    images: ["/brahmaputra.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
