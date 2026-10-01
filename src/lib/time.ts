import { useEffect, useState } from "react";

const QUARTER = 15 * 60 * 1000;

// Ticks every second. Null on the server and the first client render, so the
// markup never mismatches during hydration.
export function useNow() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

export function jakartaTime(d: Date, seconds = false) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Jakarta",
    hour: "2-digit",
    minute: "2-digit",
    second: seconds ? "2-digit" : undefined,
    hour12: false,
  }).format(d);
}

// Jakarta is UTC+7 with no DST, so quarter hours line up with UTC quarter hours.
export function nextQuarter(d: Date) {
  const next = new Date(Math.floor(d.getTime() / QUARTER) * QUARTER + QUARTER);
  const left = Math.max(0, Math.floor((next.getTime() - d.getTime()) / 1000));
  const mm = String(Math.floor(left / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");
  return { at: jakartaTime(next), in: `${mm}:${ss}` };
}
