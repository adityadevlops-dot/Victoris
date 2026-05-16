import type { ReactNode } from "react";

interface HintPanelProps {
  children?: ReactNode;
}

export default function HintPanel({ children }: HintPanelProps): JSX.Element {
  return (
    <div className="p-4 bg-neutral-900 rounded-lg border border-neutral-800">
      <h3 className="font-semibold mb-3">Hints</h3>
      <div className="space-y-2 text-sm text-neutral-400">
        {children || <p>No hints available yet.</p>}
      </div>
    </div>
  );
}
