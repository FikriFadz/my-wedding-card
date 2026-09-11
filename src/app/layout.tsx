import "./globals.css";

import type { Metadata } from "next";
import { activeTheme } from "../data/theme";

export const metadata: Metadata = {
  metadataBase: new URL("https://fikrihusna.example"),
  title: "Mohamad Fikri & Husna Syakirin | 13 March 2027",
  description: "Dengan penuh kesyukuran, kami menjemput anda ke majlis perkahwinan Mohamad Fikri dan Husna Syakirin pada 13 March 2027.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Mohamad Fikri & Husna Syakirin | 13 March 2027",
    description: "Jemputan perkahwinan Mohamad Fikri dan Husna Syakirin pada 13 March 2027.",
    type: "website",
    images: [{ url: "/og.svg", width: 1200, height: 630, alt: "Jemputan perkahwinan Mohamad Fikri dan Husna Syakirin" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohamad Fikri & Husna Syakirin | Jemputan Perkahwinan",
    description: "Dengan penuh kesyukuran, kami menjemput anda pada 13 March 2027.",
  },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ms" data-theme={activeTheme}>
      <body>{children}</body>
    </html>
  );
}
