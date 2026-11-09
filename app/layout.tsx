import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Geist } from "next/font/google";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600"],
});

const description =
  "Discover Will-Scent Perfumery — premium perfume oils and distinctive designer and niche-inspired scent profiles. Join the waitlist for our upcoming launch.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Will-Scent Perfumery | Premium Perfume Oils",
  description,
  openGraph: {
    title: "Will-Scent Perfumery",
    description: "Premium perfume oils. Launching soon.",
    siteName: "Will-Scent Perfumery",
    type: "website",
    locale: "en_GB",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Will-Scent Perfumery",
    description: "Premium perfume oils. Launching soon.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${cormorant.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#0A0A0A] text-[#F8F4EC]">{children}</body>
    </html>
  );
}
