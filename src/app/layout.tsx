import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, IBM_Plex_Sans_Condensed } from "next/font/google";
import Nav from "@/components/Nav";
import SmoothScroll from "@/components/SmoothScroll";
import { profile } from "@/data/site";
import { themeScript } from "@/lib/theme";
import "lenis/dist/lenis.css";
import "./globals.css";

const sans = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-sans", display: "swap" });
const condensed = IBM_Plex_Sans_Condensed({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-display",
  display: "swap",
});
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-mono", display: "swap" });

// Absolute URL for link previews. Prefer the public production domain over the
// per-deployment URL, which can be protected and would break the preview image.
const host = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? (host ? `https://${host}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name}, ${profile.role}`,
    template: `%s · ${profile.name}`,
  },
  description: profile.description,
  openGraph: {
    type: "website",
    title: `${profile.name}, ${profile.role}`,
    description: "100+ UiPath robots in production at PT Bank Mega. Laravel systems, core banking integration, and the bank's AI gateway.",
    siteName: profile.name,
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: the theme script may set data-theme before React hydrates.
    <html lang="en" className={`${sans.variable} ${condensed.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <SmoothScroll />
        <Nav />
        {children}
        <footer className="footer">
          <div className="page footer-inner">
            <span>{profile.name}</span>
            <span>{profile.location}</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
