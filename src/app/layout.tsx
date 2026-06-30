import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "QR Dine Cloud | Next-Gen Restaurant Management Platform",
  description:
    "Transform your restaurant with QR Dine Cloud — India's most powerful QR ordering system. Dynamic menus, instant thermal printing, real-time staff notifications, zero commissions.",
  keywords:
    "QR ordering system, restaurant management, digital menu, thermal printing, KOT system, restaurant POS India, contactless ordering",
  openGraph: {
    title: "QR Dine Cloud | Next-Gen Restaurant Management",
    description:
      "The complete QR ordering system for modern restaurants. Beautiful menus, instant printing, zero commissions.",
    type: "website",
  },
};

import { LiveToasts } from "@/components/LiveToasts";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#08080a] text-white">
        {children}
        <LiveToasts />
      </body>
    </html>
  );
}
