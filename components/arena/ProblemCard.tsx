import type { Problem } from "@/types";

interface ProblemCardProps {
  problem: Problem;
}

export default function ProblemCard({ problem }: ProblemCardProps): JSX.Element {
  const difficultyColors: Record<string, string> = {
    easy: "text-green-500",
    medium: "text-yellow-500",
    hard: "text-red-500",
  };

  return (
    <div className="p-4 bg-neutral-900 rounded-lg border border-neutral-800 hover:border-accent transition-colors cursor-pointer">
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-lg">{problem.title}</h3>
        <span className={`text-sm font-medium ${difficultyColors[problem.difficulty]}`}>
          {problem.difficulty}
        </span>
      </div>
      <p className="text-neutral-400 text-sm mb-3 line-clamp-2">
        {problem.description}
      </p>
      <div className="flex items-center justify-between">
        <span className="text-xs text-neutral-500">{problem.category}</span>
        <span className="text-accent font-medium">+{problem.points}</span>
      </div>
    </div>
  );
}
