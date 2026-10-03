"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import type { Project } from "@/data/site";

// Process list. On devices with a mouse, hovering a row shows the stack that
// process is built with, next to the cursor, in place of a thumbnail.
// `start` continues the numbering after the featured processes.
export default function Registry({ projects, start = 0 }: { projects: Project[]; start?: number }) {
  const [active, setActive] = useState<number | null>(null);
  const [finePointer, setFinePointer] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 30 });
  const sy = useSpring(y, { stiffness: 300, damping: 30 });

  useEffect(() => {
    setFinePointer(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  const preview = active === null ? null : projects[active];

  return (
    <div
      className="reg"
      onMouseMove={(e) => {
        x.set(e.clientX + 24);
        y.set(e.clientY + 24);
      }}
      onMouseLeave={() => setActive(null)}
    >
      <ol>
        {projects.map((p, i) => (
          <li key={p.slug}>
            <Link
              href={`/projects/${p.slug}`}
              className={`reg-row${active !== null && active !== i ? " dim" : ""}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(null)}
            >
              <span className="reg-idx mono">{String(start + i + 1).padStart(2, "0")}</span>
              <span className="reg-title">{p.title}</span>
              <span className="reg-meta mono">
                {p.kind} · {p.registry.trigger} · {p.registry.runs}
                {p.since ? ` · since ${p.since}` : ` · ${p.status.toLowerCase()}`}
              </span>
              <span className="reg-summary">{p.summary}</span>
              <span className="reg-result mono">{p.registry.result}</span>
            </Link>
          </li>
        ))}
      </ol>

      {finePointer && (
        <AnimatePresence>
          {preview && (
            <motion.div
              key="preview"
              className="reg-preview mono"
              style={{ left: sx, top: sy }}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              aria-hidden="true"
            >
              <p className="reg-preview-head">
                <span>{preview.title}</span>
                <span className={`status-${preview.status.toLowerCase()}`}>{preview.status}</span>
              </p>
              <table>
                <tbody>
                  {(preview.stackGroups ?? [{ group: "Stack", items: preview.stack }]).map((g) => (
                    <tr key={g.group}>
                      <td>{g.group}</td>
                      <td>{g.items.join(" · ")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
