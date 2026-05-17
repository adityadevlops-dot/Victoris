"use client";

import { useArenaStore } from "../../store/arenaStore";
import { useBattleSocket } from "../../hooks/useBattleSocket";
import { useBattleStore } from "../../store/battleStore";
import { Play, Send } from "lucide-react";

export default function ConsolePanel() {
  const output = useArenaStore((state) => state.output);
  const isRunning = useArenaStore((state) => state.isRunning);
  const verdict = useArenaStore((state) => state.verdict);
  const startExecution = useArenaStore((state) => state.startExecution);
  const endExecution = useArenaStore((state) => state.endExecution);
  const code = useArenaStore((state) => state.code);

  const { emit } = useBattleSocket();
  const room = useBattleStore((state) => state.room);

  const handleRun = () => {
    startExecution();
    // Fake execution for UI preview
    setTimeout(() => {
      endExecution('ACCEPTED', 45, 1200);
      useArenaStore.setState({ output: "Compilation Successful.\\nExecuting Test Cases...\\n\\nTest Case 1: Passed (12ms)\\nTest Case 2: Passed (14ms)\\nTest Case 3: Passed (19ms)\\n\\nAll visible test cases passed. Ready for submission." });
    }, 2000);
  };

  const handleSubmit = () => {
    startExecution();
    // Fake full submission
    setTimeout(() => {
      endExecution('ACCEPTED', 45, 1200);
      useArenaStore.setState({ output: "Compilation Successful.\\nRunning Hidden Validation Matrix...\\n\\n[##########] 100%\\n\\nVerdict: ACCEPTED\\nTime: 45ms\\nMemory: 1.2MB\\nVicto Points Awarded: +50" });
      
      // If multiplayer battle, notify server
      if (room) {
        emit("submit_code", { roomId: room.id, code, testResults: { passed: true } });
      }
    }, 2500);
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#000000]">
      <div className="flex-1 p-4 font-['JetBrains_Mono'] text-sm overflow-y-auto whitespace-pre-wrap custom-scrollbar">
        {output ? (
          <span className={verdict === 'WRONG_ANSWER' || verdict === 'RUNTIME_ERROR' || verdict === 'COMPILATION_ERROR' ? "text-[#dc2626]" : "text-[#a1a1aa]"}>
            {output}
          </span>
        ) : (
          <span className="text-[#52525b] italic">Awaiting execution...</span>
        )}
      </div>

      <div className="border-t border-[#1a1a1a] p-3 flex justify-end gap-3 bg-[#080808]">
        <button
          onClick={handleRun}
          disabled={isRunning}
          className="px-6 py-2 bg-[#111111] hover:bg-[#1a1a1a] border border-[#1a1a1a] hover:border-[#dc2626]/50 text-[#fafafa] font-['Orbitron'] font-bold text-xs uppercase tracking-widest rounded-[3px] transition-all flex items-center gap-2 disabled:opacity-50"
        >
          <Play className="w-4 h-4" /> Run Code
        </button>
        <button
          onClick={handleSubmit}
          disabled={isRunning}
          className="px-6 py-2 bg-[#dc2626] hover:bg-[#ef4444] text-[#000000] font-['Orbitron'] font-bold text-xs uppercase tracking-widest rounded-[3px] transition-all flex items-center gap-2 disabled:opacity-50"
          style={{ clipPath: "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)" }}
        >
          <Send className="w-4 h-4" /> Submit
        </button>
      </div>
    </div>
  );
}
