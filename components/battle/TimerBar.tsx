import type { ReactNode } from "react";

interface TimerBarProps {
  timeRemaining: number;
  totalTime: number;
  children?: ReactNode;
}

export default function TimerBar({
  timeRemaining,
  totalTime,
  children,
}: TimerBarProps): JSX.Element {
  const percentage = (timeRemaining / totalTime) * 100;
  const isLow = percentage < 25;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">Time Remaining</h3>
        <span className={isLow ? "text-accent font-bold" : "text-neutral-400"}>
          {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, "0")}
        </span>
      </div>
      <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all ${
            isLow ? "bg-accent" : "bg-blue-500"
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {children}
    </div>
  );
}
