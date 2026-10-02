"use client";

import { useEffect, useState } from "react";
import { THEME_KEY as KEY } from "@/lib/theme";

type Choice = "auto" | "light" | "dark";

const ORDER: Choice[] = ["auto", "light", "dark"];
const LABEL: Record<Choice, string> = { auto: "Auto", light: "Light", dark: "Dark" };

function saved(): Choice {
  const set = document.documentElement.dataset.theme;
  return set === "light" || set === "dark" ? set : "auto";
}

// Sits in the nav as "Theme: Auto". Each click moves Auto → Light → Dark → Auto.
// Auto follows the device; Light and Dark are remembered in this browser.
export default function ThemeToggle() {
  const [choice, setChoice] = useState<Choice | null>(null);

  useEffect(() => setChoice(saved()), []);

  const apply = (next: Choice) => {
    const root = document.documentElement;
    try {
      if (next === "auto") {
        delete root.dataset.theme;
        localStorage.removeItem(KEY);
      } else {
        root.dataset.theme = next;
        localStorage.setItem(KEY, next);
      }
    } catch {
      // Storage blocked: the switch still applies for this visit.
      if (next === "auto") delete root.dataset.theme;
      else root.dataset.theme = next;
    }
    setChoice(next);
  };

  const current = choice ?? "auto";
  const next = ORDER[(ORDER.indexOf(current) + 1) % ORDER.length];

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={() => apply(next)}
      aria-label={`Theme: ${LABEL[current]}. Switch to ${LABEL[next]}`}
    >
      Theme: {LABEL[current]}
    </button>
  );
}
