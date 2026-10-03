import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/data/site";

// Preview card for links shared on LinkedIn, WhatsApp, and the like.
export const alt = `${profile.name}, ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// IBM Plex, read from files in the repo (src/app/fonts), so the image renders
// the same at build time on any machine, with no network needed.
async function font(file: string) {
  return readFile(path.join(process.cwd(), "src", "app", "fonts", file));
}

export default async function Image() {
  const [condensed, sans, mono] = await Promise.all([
    font("PlexSansCondensed-SemiBold.woff"),
    font("PlexSans-Regular.woff"),
    font("PlexMono-Regular.woff"),
  ]);
  const fonts = [
    { name: "Condensed", data: condensed, weight: 600 as const, style: "normal" as const },
    { name: "Sans", data: sans, weight: 400 as const, style: "normal" as const },
    { name: "Mono", data: mono, weight: 400 as const, style: "normal" as const },
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 64px",
          background: "#ffffff",
          color: "#000000",
          fontFamily: "Sans",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 30, fontFamily: "Condensed", fontWeight: 600 }}>
              {profile.name}
            </div>
            <div style={{ fontSize: 22, color: "#6e6e73", marginTop: 4 }}>{`${profile.role} · PT Bank Mega, Jakarta`}</div>
          </div>
          <svg width="56" height="56" viewBox="0 0 48 48" fill="none" stroke="#000000" strokeWidth="2">
            <line x1="24" y1="5" x2="24" y2="10" />
            <rect x="22" y="1" width="4" height="4" fill="#000000" stroke="none" />
            <rect x="7" y="10" width="34" height="28" />
            <rect x="3" y="19" width="4" height="10" />
            <rect x="41" y="19" width="4" height="10" />
            <rect x="15" y="19" width="6" height="7" fill="#000000" stroke="none" />
            <rect x="27" y="19" width="6" height="7" fill="#000000" stroke="none" />
            <line x1="18" y1="31" x2="30" y2="31" />
          </svg>
        </div>

        <div
          style={{
            fontSize: 92,
            lineHeight: 1,
            letterSpacing: "-0.02em",
            fontFamily: "Condensed",
            fontWeight: 600,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex" }}>
            I turn&nbsp;<span style={{ color: "#6e6e73", textDecoration: "line-through" }}>hours</span>&nbsp;of banking
          </div>
          <div style={{ display: "flex" }}>
            operations into&nbsp;<span style={{ textDecoration: "underline" }}>minutes</span>.
          </div>
        </div>

        <div style={{ display: "flex", borderTop: "1px solid #c6c6c8", paddingTop: 24 }}>
          {profile.facts.map((f, i) => (
            <div
              key={f.label}
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                paddingLeft: i ? 24 : 0,
                borderLeft: i ? "1px solid #c6c6c8" : "none",
              }}
            >
              <div style={{ fontSize: 44, fontFamily: "Condensed", fontWeight: 600 }}>{f.value}</div>
              <div style={{ fontSize: 20, color: "#6e6e73", marginTop: 4 }}>{f.label}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
