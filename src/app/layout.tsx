import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Nav from "@/components/Nav";
import { profile } from "@/data/site";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s — ${profile.name}`,
  },
  description: profile.summary,
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description: profile.summary,
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <Nav />
        {children}
        <footer className="footer">
          <div className="wrap footer-inner">
            <span>
              © {new Date().getFullYear()} {profile.name}
            </span>
            <span className="mono">Built with Next.js</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
