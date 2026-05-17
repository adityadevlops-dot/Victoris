"use client";

import Link from "next/link";
import { Trophy, Clock, Cpu } from "lucide-react";

const MOCK_PROBLEMS = [
  {
    id: "prob_1",
    slug: "two-sum",
    title: "1. Two Sum",
    difficulty: "Bronze",
    baseVictoPoints: 50,
    timeLimit: 2000,
    memoryLimit: 256,
    tags: ["Array", "Hash Table"],
  },
  {
    id: "prob_2",
    slug: "valid-parentheses",
    title: "20. Valid Parentheses",
    difficulty: "Silver",
    baseVictoPoints: 100,
    timeLimit: 1500,
    memoryLimit: 128,
    tags: ["String", "Stack"],
  },
  {
    id: "prob_3",
    slug: "lru-cache",
    title: "146. LRU Cache",
    difficulty: "Gold",
    baseVictoPoints: 250,
    timeLimit: 3000,
    memoryLimit: 512,
    tags: ["Design", "Hash Table", "Linked List"],
  }
];

export default function ArenaListingPage() {
  return (
    <div className="min-h-screen bg-[#000000] text-[#fafafa] p-8 font-['Rajdhani'] flex flex-col">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <header className="mb-12 border-b border-[#1a1a1a] pb-6">
          <div className="flex items-center gap-4 mb-2">
            <div className="font-['Orbitron'] font-black text-4xl tracking-widest text-[#fafafa]">
              THE <span className="text-[#dc2626]">ARENA</span>
            </div>
            <div className="h-6 w-[2px] bg-[#dc2626]" />
            <div className="font-['JetBrains_Mono'] text-[#a1a1aa] text-sm uppercase tracking-widest">
              SELECT YOUR COMBAT
            </div>
          </div>
          <p className="text-[#a1a1aa] text-lg max-w-2xl">
            Choose a challenge to test your skills. Earning Victo Points improves your rank on the global leaderboard.
          </p>
        </header>

        {/* Problem Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_PROBLEMS.map((prob) => (
            <Link href={`/arena/${prob.slug}`} key={prob.id} className="group">
              <div className="h-full bg-[#080808] border border-[#1a1a1a] p-6 relative overflow-hidden transition-all duration-300 group-hover:border-[#dc2626]/50 group-hover:-translate-y-1 group-hover:shadow-[0_10px_30px_rgba(220,38,38,0.1)] cursor-pointer flex flex-col">
                
                {/* Red accent line on hover */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-[#dc2626] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                
                <h3 className="font-['Orbitron'] font-bold text-xl mb-4 group-hover:text-[#dc2626] transition-colors">
                  {prob.title}
                </h3>
                
                <div className="flex items-center justify-between mb-6">
                  <span className="px-2 py-1 font-['JetBrains_Mono'] text-[10px] uppercase tracking-widest border border-[#1a1a1a] group-hover:border-[#dc2626]/30 text-[#a1a1aa] group-hover:text-[#dc2626] transition-colors rounded-[2px] bg-[#111111]">
                    {prob.difficulty}
                  </span>
                  <div className="flex items-center gap-1 font-['JetBrains_Mono'] text-xs text-[#a1a1aa]">
                    <Trophy className="w-3 h-3 text-[#f59e0b]" /> 
                    <span className="text-[#fafafa]">{prob.baseVictoPoints}</span> VICTO
                  </div>
                </div>

                <div className="mt-auto grid grid-cols-2 gap-4 border-t border-[#1a1a1a] pt-4">
                  <div className="flex flex-col gap-1">
                    <span className="font-['JetBrains_Mono'] text-[10px] text-[#52525b] uppercase tracking-widest">Time</span>
                    <span className="font-['JetBrains_Mono'] text-[#fafafa] text-xs flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#a1a1aa]" /> {prob.timeLimit}ms
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-['JetBrains_Mono'] text-[10px] text-[#52525b] uppercase tracking-widest">Memory</span>
                    <span className="font-['JetBrains_Mono'] text-[#fafafa] text-xs flex items-center gap-1">
                      <Cpu className="w-3 h-3 text-[#a1a1aa]" /> {prob.memoryLimit}MB
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
