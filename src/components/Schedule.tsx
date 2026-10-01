"use client";

import { jakartaTime, nextQuarter, useNow } from "@/lib/time";
import Robot from "./Robot";

// Configured robot schedules, computed from the clock. Not live job data.
export default function Schedule() {
  const now = useNow();
  const pull = now ? nextQuarter(now) : null;

  return (
    <aside className="schedule mono" aria-label="Robot schedule">
      <Robot size={56} track className="schedule-robot" />
      <p className="schedule-head">
        <span>Schedule</span>
        <span>{now ? `${jakartaTime(now)} WIB` : "--:-- WIB"}</span>
      </p>
      <table>
        <tbody>
          <tr>
            <td>Dispute maker + checker</td>
            <td>24/7</td>
            <td className="status-running">RUNNING</td>
          </tr>
          <tr>
            <td>BI-Fast reconciliation</td>
            <td>every 15 min</td>
            <td>{pull ? `next ${pull.at}` : "next --:--"}</td>
          </tr>
          <tr>
            <td />
            <td />
            <td className="schedule-count">{pull ? `in ${pull.in}` : "in --:--"}</td>
          </tr>
          <tr>
            <td>Core banking robots</td>
            <td>on request</td>
            <td>API + queue</td>
          </tr>
          <tr>
            <td>Settlement &amp; journals</td>
            <td>daily</td>
            <td>incl. holidays</td>
          </tr>
        </tbody>
      </table>
      <p className="schedule-foot">As configured in Orchestrator. Not live job data.</p>
    </aside>
  );
}
