import type { Metadata, Viewport } from "next";
import { Archivo, Source_Serif_4 } from "next/font/google";
import { site } from "@/lib/content";
import { RevealObserver } from "@/components/RevealObserver";
import { Loader } from "@/components/Loader";
import "./globals.css";

// Two families only: condensed Archivo for headings and labels, Source Serif 4 for reading.
const head = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-head-face", display: "swap" });
const body = Source_Serif_4({ subsets: ["latin"], variable: "--font-body-face", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s | ${site.name}` },
  description: site.description,
  openGraph: { title: site.title, description: site.description, siteName: site.name, type: "website", locale: "en_IN" },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#F5F5DC",
  colorScheme: "light",
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${head.variable} ${body.variable}`} suppressHydrationWarning>
      <body>
        <Loader />
        <a className="skip" href="#main">Skip to content</a>
        {children}
        <RevealObserver />
      </body>
    </html>
  );
}
