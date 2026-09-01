import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ICONIC | Haute Alpine Hydration & Mineral Water",
  description:
    "Purest alpine mineral water sourced from 3,000m glacial peaks. Naturally filtered through ancient alpine rock for 15 years. Bottled at source in artisan recyclable glass.",
  keywords: ["mineral water", "luxury water", "Iconic", "alpine spring", "sommelier water", "sustainable glass"],
  openGraph: {
    title: "ICONIC | Haute Alpine Hydration",
    description: "Purest alpine mineral water sourced from 3,000m glacial peaks.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${outfit.variable} ${cormorant.variable}`}>
      <body className="bg-navy text-slate-100 font-sans antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
        <SmoothScroll>
          <CustomCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
