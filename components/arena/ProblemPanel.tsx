"use client";

import { useArenaStore } from "../../store/arenaStore";
import { Clock, Cpu, Trophy } from "lucide-react";

export default function ProblemPanel() {
  const problem = useArenaStore((state) => state.problem);

  if (!problem) {
    return (
      <div className="w-full h-full flex items-center justify-center text-[#52525b] font-['JetBrains_Mono'] text-xs tracking-widest uppercase">
        AWAITING_PROBLEM_DATA...
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-y-auto p-6 flex flex-col gap-6 custom-scrollbar">
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1a1a1a; border-radius: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #dc2626; }
      `}</style>
      
      <div>
        <h1 className="font-['Orbitron'] font-black text-2xl text-[#fafafa] mb-2 uppercase tracking-wide">
          {problem.title}
        </h1>
        <div className="flex items-center gap-3 font-['JetBrains_Mono'] text-xs">
          <span className="px-2 py-1 border border-[#dc2626]/30 text-[#dc2626] bg-[#dc2626]/10 uppercase tracking-widest rounded-sm">
            {problem.difficulty}
          </span>
          <span className="flex items-center gap-1 text-[#a1a1aa]">
            <Trophy className="w-3 h-3 text-[#f59e0b]" /> {problem.baseVictoPoints} VICTO
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 border-y border-[#1a1a1a] py-4">
        <div className="flex flex-col gap-1">
          <span className="font-['JetBrains_Mono'] text-[10px] text-[#52525b] uppercase tracking-widest">Time Limit</span>
          <span className="font-['JetBrains_Mono'] text-[#fafafa] text-sm flex items-center gap-2">
            <Clock className="w-3 h-3 text-[#a1a1aa]" /> {problem.timeLimit}ms
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-['JetBrains_Mono'] text-[10px] text-[#52525b] uppercase tracking-widest">Memory Limit</span>
          <span className="font-['JetBrains_Mono'] text-[#fafafa] text-sm flex items-center gap-2">
            <Cpu className="w-3 h-3 text-[#a1a1aa]" /> {problem.memoryLimit}KB
          </span>
        </div>
      </div>

      <div className="font-['Rajdhani'] text-[#a1a1aa] text-base leading-relaxed whitespace-pre-wrap">
        {problem.description}
      </div>
    </div>
  );
}
