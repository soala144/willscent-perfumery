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
  title: "WILL-SCENT Perfumery | Discover Your Signature Scent",
  description:
    "Join the WILL-SCENT waitlist and be among the first to discover our upcoming collection of premium perfumes and fragrance oils.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  icons: {
    icon: "/logo1.png",
    shortcut: "/logo1.png",
    apple: "/logo1.png",
  },
  openGraph: {
    title: "WILL-SCENT Perfumery | Discover Your Signature Scent",
    description:
      "Join the WILL-SCENT waitlist and be among the first to discover our upcoming collection of premium perfumes and fragrance oils.",
    type: "website",
    images: [
      {
        url: "/logo1.png",
        width: 1200,
        height: 630,
        alt: "WILL-SCENT",
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
