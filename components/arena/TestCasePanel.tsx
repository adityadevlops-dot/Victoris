"use client";

import { useState } from "react";
import { useArenaStore } from "../../store/arenaStore";

export default function TestCasePanel() {
  const problem = useArenaStore((state) => state.problem);
  const [activeTab, setActiveTab] = useState(0);

  if (!problem || !problem.testCases) {
    return (
      <div className="w-full h-full flex items-center justify-center text-[#52525b] font-['JetBrains_Mono'] text-xs tracking-widest uppercase">
        NO_MATRIX_DATA...
      </div>
    );
  }

  const visibleTests = problem.testCases.filter(t => !t.isHidden);

  return (
    <div className="w-full h-full flex flex-col">
      {/* Tabs */}
      <div className="flex border-b border-[#1a1a1a] shrink-0 overflow-x-auto custom-scrollbar">
        {visibleTests.map((test, idx) => (
          <button
            key={test.id}
            onClick={() => setActiveTab(idx)}
            className={`px-4 py-2 font-['JetBrains_Mono'] text-xs uppercase tracking-widest transition-colors whitespace-nowrap border-b-2 ${
              activeTab === idx 
                ? "border-[#dc2626] text-[#fafafa] bg-[#111111]" 
                : "border-transparent text-[#52525b] hover:text-[#a1a1aa] hover:bg-[#0f0f0f]"
            }`}
          >
            Case {idx + 1}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar bg-[#0a0a0a]">
        <style>{`
          .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: #1a1a1a; border-radius: 3px; }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #dc2626; }
        `}</style>
        
        {visibleTests.length > 0 && (
          <div className="flex flex-col gap-4">
            <div>
              <div className="font-['JetBrains_Mono'] text-[10px] text-[#52525b] uppercase tracking-widest mb-1">
                INPUT
              </div>
              <div className="bg-[#111111] border border-[#1a1a1a] rounded-[3px] p-3 font-['JetBrains_Mono'] text-sm text-[#fafafa] whitespace-pre-wrap">
                {visibleTests[activeTab].input}
              </div>
            </div>
            <div>
              <div className="font-['JetBrains_Mono'] text-[10px] text-[#52525b] uppercase tracking-widest mb-1">
                EXPECTED OUTPUT
              </div>
              <div className="bg-[#111111] border border-[#1a1a1a] rounded-[3px] p-3 font-['JetBrains_Mono'] text-sm text-[#fafafa] whitespace-pre-wrap">
                {visibleTests[activeTab].expectedOutput}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
