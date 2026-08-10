import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import type { ReactNode } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { site, siteUrl } from "@/lib/site";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-bricolage",
  display: "swap",
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — end-to-end software development`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "software development company",
    "full-stack development",
    "Next.js development agency",
    "API development",
    "database design",
    "cloud and DevOps",
    "Solana development",
    "Web3 development",
    "custom software",
  ],
  applicationName: site.name,
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: site.name,
    title: `${site.name} — you bring the idea, Daddy handles the rest`,
    description: site.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — end-to-end software development`,
    description: site.description,
    creator: "@daddysolutions",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#08080a",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  legalName: site.legalName,
  url: siteUrl,
  slogan: site.tagline,
  description: site.description,
  foundingDate: site.founded,
  email: site.contact.email,
  telephone: site.contact.phone,
  areaServed: "Worldwide",
  knowsAbout: [
    "Full-stack web development",
    "API development",
    "Database architecture",
    "Cloud deployment and DevOps",
    "Solana and Web3 development",
    "Software maintenance and support",
  ],
  makesOffer: [
    "Full-stack development",
    "Backend and API development",
    "Frontend engineering",
    "Database architecture",
    "Cloud and DevOps",
    "Solana and Web3 development",
    "Maintenance and support",
    "Custom software",
  ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${instrument.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body className="grain relative min-h-dvh antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-brass focus:px-4 focus:py-2 focus:text-ink-950"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          // Structured data for rich results.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
