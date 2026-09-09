import "./globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://husnafikri.example"),
  title: "Husna & Fikri | Jemputan Perkahwinan",
  description: "Dengan penuh kesyukuran, kami menjemput anda meraikan hari bahagia Husna dan Fikri.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Husna & Fikri | 12 Disember 2026",
    description: "Jemputan perkahwinan Husna dan Fikri.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Husna & Fikri | Jemputan Perkahwinan",
    description: "12 Disember 2026 · Kuala Lumpur",
  },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ms">
      <body>{children}</body>
    </html>
  );
}
