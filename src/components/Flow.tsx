export type FlowStep = string | { text: string; actor?: "auto" | "human"; branch?: string };

export default function Flow({ steps }: { steps: FlowStep[] }) {
  return (
    <ol className="flow">
      {steps.map((raw, i) => {
        const step = typeof raw === "string" ? { text: raw } : raw;
        return (
          <li key={i} className={`flow-step ${step.actor ?? ""}`}>
            <span className="flow-node">{String(i + 1).padStart(2, "0")}</span>
            <span className="flow-text">
              {step.branch && <span className="flow-branch">{step.branch}</span>}
              {step.text}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
