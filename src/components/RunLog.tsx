"use client";

import { useEffect, useState } from "react";

const LINES: { t: string; text: string; kind?: "cmd" | "ok" }[] = [
  { t: "", text: "$ robot run bifast-recon --every 15m", kind: "cmd" },
  { t: "01", text: "pulling BI-Fast transactions from CIPortal" },
  { t: "02", text: "~3,000 transactions → staging" },
  { t: "03", text: "host data imported from SFTP → staging" },
  { t: "04", text: "reconciling host vs network" },
  { t: "05", text: "match → closed · unmatch → posting / automated refund" },
  { t: "", text: "✓ cycle complete — next pull in 15:00", kind: "ok" },
];

export default function RunLog() {
  const [shown, setShown] = useState(1);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(LINES.length);
      return;
    }
    const done = shown >= LINES.length;
    const id = setTimeout(() => setShown(done ? 1 : shown + 1), done ? 5000 : 800);
    return () => clearTimeout(id);
  }, [shown]);

  return (
    <div className="runlog" aria-label="Illustrative automation run log">
      <div className="runlog-bar">
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
        <span className="runlog-title">unattended-robot-01</span>
        <span className="runlog-tag">illustrative run</span>
      </div>
      <div className="runlog-body">
        {LINES.map((line, i) => (
          <div key={i} className={`runlog-line ${line.kind ?? ""} ${i < shown ? "on" : ""}`}>
            {line.t && <span className="runlog-time">[{line.t}]</span>}
            <span>{line.text}</span>
          </div>
        ))}
        <span className="cursor" aria-hidden="true" />
      </div>
    </div>
  );
}
