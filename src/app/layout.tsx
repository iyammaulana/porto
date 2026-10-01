import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, IBM_Plex_Sans_Condensed } from "next/font/google";
import Nav from "@/components/Nav";
import SmoothScroll from "@/components/SmoothScroll";
import { profile } from "@/data/site";
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

export const metadata: Metadata = {
  title: {
    default: `${profile.name}, ${profile.role}`,
    template: `%s · ${profile.name}`,
  },
  description: profile.summary.join(" "),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${condensed.variable} ${mono.variable}`}>
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
