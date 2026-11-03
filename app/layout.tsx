import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Will-Scent Perfumery | Luxury You Can Smell",
  description:
    "Join the Will-Scent Perfumery waitlist and be among the first to discover a distinctive collection of perfumes.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  icons: {
    icon: "/logo1.png",
    shortcut: "/logo1.png",
    apple: "/logo1.png",
  },
  openGraph: {
    title: "Will-Scent Perfumery | Luxury You Can Smell",
    description:
      "Join the Will-Scent Perfumery waitlist and be among the first to discover a distinctive collection of perfumes.",
    type: "website",
    images: [
      {
        url: "/logo1.png",
        width: 1200,
        height: 630,
        alt: "Will-Scent Perfumery",
      },
    ],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#0A0A0A] text-[#F8F4EC]">{children}</body>
    </html>
  );
}
