"use client";

import React, { useState } from "react";
import { useArenaStore } from "../../store/arenaStore";
import VerdictBanner from "./VerdictBanner";

export default function ChallengeLayout({
  problemPanel,
  editorPanel,
  testCasePanel,
  consolePanel,
}: {
  problemPanel: React.ReactNode;
  editorPanel: React.ReactNode;
  testCasePanel: React.ReactNode;
  consolePanel: React.ReactNode;
}) {
  const verdict = useArenaStore((state) => state.verdict);
  const [consoleOpen, setConsoleOpen] = useState(true);

  return (
    <div className="h-screen w-full bg-[#000000] text-[#fafafa] flex flex-col font-['Rajdhani'] overflow-hidden">
      {/* Top Navbar for Arena */}
      <header className="h-12 border-b border-[#1a1a1a] flex items-center justify-between px-4 shrink-0 bg-[#080808]">
        <div className="flex items-center gap-4">
          <div className="font-['Orbitron'] font-black text-xl tracking-widest text-[#fafafa]">
            VICT<span className="text-[#dc2626]">ORIS</span>
          </div>
          <div className="h-4 w-[1px] bg-[#1a1a1a]" />
          <div className="font-['JetBrains_Mono'] text-[#a1a1aa] text-xs uppercase tracking-widest">
            BATTLE CONSOLE
          </div>
        </div>
        
        {/* Placeholder for user stats/timer */}
        <div className="flex items-center gap-4">
          <div className="font-['JetBrains_Mono'] text-[#dc2626] text-xs animate-pulse flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#dc2626]" />
            LIVE COMBAT
          </div>
        </div>
      </header>

      {/* Main Grid Layout */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel: Problem */}
          <section className="w-[30%] border-r border-[#1a1a1a] flex flex-col relative group transition-colors hover:border-[#dc2626]/30 bg-[#080808]">
            <div className="h-6 border-b border-[#1a1a1a] flex items-center px-3 shrink-0">
              <span className="font-['JetBrains_Mono'] text-[10px] uppercase text-[#52525b] tracking-widest group-hover:text-[#dc2626] transition-colors">
                [01] PROBLEM_INTEL
              </span>
            </div>
            <div className="flex-1 overflow-hidden">
              {problemPanel}
            </div>
          </section>

          {/* Center Panel: Editor */}
          <section className="w-[45%] border-r border-[#1a1a1a] flex flex-col relative group transition-colors hover:border-[#dc2626]/30 bg-[#000000]">
            <div className="h-6 border-b border-[#1a1a1a] flex items-center justify-between px-3 shrink-0">
              <span className="font-['JetBrains_Mono'] text-[10px] uppercase text-[#52525b] tracking-widest group-hover:text-[#dc2626] transition-colors">
                [02] COMBAT_EDITOR
              </span>
            </div>
            <div className="flex-1 overflow-hidden relative">
              {editorPanel}
            </div>
          </section>

          {/* Right Panel: Test Cases */}
          <section className="w-[25%] flex flex-col relative group transition-colors hover:border-[#dc2626]/30 bg-[#080808]">
            <div className="h-6 border-b border-[#1a1a1a] flex items-center px-3 shrink-0">
              <span className="font-['JetBrains_Mono'] text-[10px] uppercase text-[#52525b] tracking-widest group-hover:text-[#dc2626] transition-colors">
                [03] VALIDATION_MATRIX
              </span>
            </div>
            <div className="flex-1 overflow-hidden">
              {testCasePanel}
            </div>
          </section>
        </div>

        {/* Bottom Panel: Console */}
        <section 
          className={`border-t border-[#1a1a1a] flex flex-col relative group transition-all duration-300 ease-in-out bg-[#080808] ${
            consoleOpen ? "h-[30%]" : "h-6"
          }`}
        >
          <div 
            className="h-6 border-b border-[#1a1a1a] flex items-center justify-between px-3 shrink-0 cursor-pointer hover:bg-[#111111]"
            onClick={() => setConsoleOpen(!consoleOpen)}
          >
            <span className="font-['JetBrains_Mono'] text-[10px] uppercase text-[#52525b] tracking-widest group-hover:text-[#dc2626] transition-colors flex items-center gap-2">
              [04] EXECUTION_CONSOLE
              {verdict === 'RUNNING' && <span className="text-[#f59e0b] animate-pulse">| EXECUTING...</span>}
            </span>
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#52525b]">
              {consoleOpen ? "▼ COLLAPSE" : "▲ EXPAND"}
            </span>
          </div>
          <div className="flex-1 overflow-hidden">
            {consolePanel}
          </div>
        </section>

        {/* Full-width Verdict Overlay */}
        <VerdictBanner verdict={verdict} />
      </main>
    </div>
  );
}
