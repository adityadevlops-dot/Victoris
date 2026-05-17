"use client";

import { useState, useEffect } from "react";
import { getRankByPoints, getNextRank, RANKS, BADGES } from "@/lib/ranking";
import { Trophy, Shield, Zap, Medal, Target, Users, Globe, Clock } from "lucide-react";

// Mock User Data
const MY_POINTS = 3850;
const MY_RANK = getRankByPoints(MY_POINTS);
const NEXT_RANK = getNextRank(MY_POINTS);
const MY_BADGES = [BADGES.FIRST_BLOOD, BADGES.SPEED_DEMON, BADGES.FLAWLESS_VICTORY];

// Mock Leaderboard Data
const GLOBAL_LEADERBOARD = [
  { rank: 1, username: "ZeroCool", points: 12500, rankTier: "Legend", isMe: false },
  { rank: 2, username: "AcidBurn", points: 11200, rankTier: "Legend", isMe: false },
  { rank: 3, username: "CrashOverride", points: 9800, rankTier: "Master", isMe: false },
  { rank: 4, username: "LordVader", points: 8400, rankTier: "Master", isMe: false },
  { rank: 5, username: "Neo", points: 7100, rankTier: "Diamond", isMe: false },
  { rank: 42, username: "Guest_1337", points: 3850, rankTier: "Platinum", isMe: true },
];

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState<"Global" | "Weekly" | "Friends" | "Topic">("Global");
  const [progressWidth, setProgressWidth] = useState(0);

  // Animated rank progression visual
  useEffect(() => {
    // Delay animation slightly for effect
    const timer = setTimeout(() => {
      if (NEXT_RANK) {
        const range = NEXT_RANK.minPoints - MY_RANK.minPoints;
        const currentProgress = MY_POINTS - MY_RANK.minPoints;
        const percentage = Math.max(5, Math.min(100, (currentProgress / range) * 100));
        setProgressWidth(percentage);
      } else {
        setProgressWidth(100); // Legend maxed
      }
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const getRankColor = (tier: string) => {
    return RANKS.find(r => r.name === tier)?.color || "#fafafa";
  };

  return (
    <div className="min-h-screen bg-[#000000] text-[#fafafa] p-8 font-['Rajdhani']">
      <div className="max-w-6xl mx-auto w-full flex flex-col gap-8">
        
        {/* Header */}
        <header className="border-b border-[#1a1a1a] pb-6 flex justify-between items-end">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <div className="font-['Orbitron'] font-black text-4xl tracking-widest text-[#fafafa]">
                RANKINGS <span className="text-[#dc2626]">& LEADERBOARDS</span>
              </div>
            </div>
            <p className="text-[#a1a1aa] text-lg font-['JetBrains_Mono'] uppercase tracking-widest text-xs">
              Ascend the tiers. Claim your title.
            </p>
          </div>
        </header>

        {/* Top Section: My Progress & Badges */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Animated Rank Progression */}
          <div className="lg:col-span-2 bg-[#080808] border border-[#1a1a1a] p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#dc2626]/5 to-transparent rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
            
            <h2 className="font-['Orbitron'] font-bold text-xl mb-6 text-[#a1a1aa]">COMBAT RECORD</h2>
            
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-6">
                <div 
                  className="w-20 h-20 border-2 flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)] bg-[#111111]"
                  style={{ borderColor: MY_RANK.color, boxShadow: `0 0 30px ${MY_RANK.color}30 inset` }}
                >
                  <Medal className="w-10 h-10" style={{ color: MY_RANK.color }} />
                </div>
                <div>
                  <div className="font-['Orbitron'] font-black text-3xl tracking-widest uppercase" style={{ color: MY_RANK.color, textShadow: `0 0 10px ${MY_RANK.color}80` }}>
                    {MY_RANK.name}
                  </div>
                  <div className="font-['JetBrains_Mono'] text-[#fafafa] text-sm mt-1">
                    {MY_POINTS} VICTO POINTS
                  </div>
                </div>
              </div>
              
              {NEXT_RANK && (
                <div className="text-right">
                  <div className="font-['Orbitron'] font-bold text-lg text-[#52525b] uppercase">{NEXT_RANK.name}</div>
                  <div className="font-['JetBrains_Mono'] text-xs text-[#52525b] mt-1">{NEXT_RANK.minPoints} PTS REQ</div>
                </div>
              )}
            </div>

            {/* Progress Bar Visual */}
            {NEXT_RANK && (
              <div className="relative pt-6">
                <div className="absolute top-0 left-0 text-[10px] font-['JetBrains_Mono'] text-[#a1a1aa] mb-1">
                  PROGRESS TO {NEXT_RANK.name.toUpperCase()}
                </div>
                <div className="h-2 w-full bg-[#111111] rounded-full overflow-hidden mt-2 relative">
                  <div 
                    className="h-full rounded-full transition-all duration-1500 ease-out relative"
                    style={{ width: `${progressWidth}%`, backgroundColor: NEXT_RANK.color, boxShadow: `0 0 10px ${NEXT_RANK.color}` }}
                  >
                    {/* Animated Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12 translate-x-[-150%] animate-[shimmer_2s_infinite]" />
                  </div>
                </div>
                <div className="flex justify-between mt-2 font-['JetBrains_Mono'] text-[10px] text-[#52525b]">
                  <span>{MY_RANK.minPoints}</span>
                  <span>{NEXT_RANK.minPoints}</span>
                </div>
              </div>
            )}
          </div>

          {/* Trophy & Badge System */}
          <div className="bg-[#080808] border border-[#1a1a1a] p-8">
            <h2 className="font-['Orbitron'] font-bold text-xl mb-6 text-[#a1a1aa] flex items-center gap-2">
              <Trophy className="w-5 h-5 text-[#f59e0b]" /> TROPHIES
            </h2>
            <div className="flex flex-col gap-4">
              {MY_BADGES.map((badge, idx) => (
                <div key={idx} className="flex items-start gap-4 p-3 bg-[#111111] border border-[#1a1a1a] hover:border-[#dc2626]/50 transition-colors group">
                  <div className="w-10 h-10 rounded bg-[#000000] border border-[#27272a] flex items-center justify-center shrink-0">
                    {/* Map badge icons to lucide icons (simplified mapping) */}
                    {badge.icon === 'drop' && <Target className="w-5 h-5" style={{ color: badge.color }} />}
                    {badge.icon === 'shield' && <Shield className="w-5 h-5" style={{ color: badge.color }} />}
                    {badge.icon === 'zap' && <Zap className="w-5 h-5" style={{ color: badge.color }} />}
                  </div>
                  <div>
                    <div className="font-['Orbitron'] font-bold text-sm text-[#fafafa] group-hover:text-[#dc2626] transition-colors">{badge.name}</div>
                    <div className="font-['Rajdhani'] text-xs text-[#a1a1aa] leading-tight mt-1">{badge.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Leaderboards */}
        <div className="bg-[#080808] border border-[#1a1a1a] flex flex-col">
          <div className="flex border-b border-[#1a1a1a]">
            {["Global", "Weekly", "Friends", "Topic"].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`flex-1 py-4 font-['Orbitron'] text-sm font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 ${
                  activeTab === tab 
                    ? "bg-[#111111] text-[#dc2626] border-b-2 border-[#dc2626]" 
                    : "text-[#52525b] hover:text-[#a1a1aa] hover:bg-[#0f0f0f]"
                }`}
              >
                {tab === "Global" && <Globe className="w-4 h-4" />}
                {tab === "Weekly" && <Clock className="w-4 h-4" />}
                {tab === "Friends" && <Users className="w-4 h-4" />}
                {tab === "Topic" && <Target className="w-4 h-4" />}
                {tab}
              </button>
            ))}
          </div>

          <div className="p-6">
            <table className="w-full text-left font-['JetBrains_Mono'] text-sm">
              <thead>
                <tr className="text-[#52525b] uppercase tracking-widest border-b border-[#1a1a1a]">
                  <th className="pb-4 font-normal w-20">Rank</th>
                  <th className="pb-4 font-normal pl-4">Combatant</th>
                  <th className="pb-4 font-normal text-center">Tier</th>
                  <th className="pb-4 font-normal text-right pr-4">Victo Points</th>
                </tr>
              </thead>
              <tbody>
                {GLOBAL_LEADERBOARD.map((user, i) => (
                  <tr 
                    key={i} 
                    className={`border-b border-[#1a1a1a]/50 hover:bg-[#111111] transition-colors ${
                      user.isMe ? "bg-[#dc2626]/10 border-l-2 border-l-[#dc2626]" : ""
                    }`}
                  >
                    <td className="py-4 text-[#a1a1aa]">
                      {user.rank <= 3 ? (
                        <span className={`font-['Orbitron'] font-black text-lg ${
                          user.rank === 1 ? "text-[#ffd700]" : 
                          user.rank === 2 ? "text-[#c0c0c0]" : 
                          "text-[#cd7f32]"
                        }`}>#{user.rank}</span>
                      ) : (
                        `#${user.rank}`
                      )}
                    </td>
                    <td className="py-4 pl-4 font-['Orbitron'] font-bold text-[#fafafa] flex items-center gap-2">
                      {user.username} {user.isMe && <span className="text-[10px] bg-[#dc2626] text-[#000] px-1 rounded-sm ml-2">(YOU)</span>}
                    </td>
                    <td className="py-4 text-center">
                      <span 
                        className="text-[10px] px-2 py-1 uppercase tracking-widest border border-[#1a1a1a] bg-[#000000]"
                        style={{ color: getRankColor(user.rankTier), borderColor: `${getRankColor(user.rankTier)}40` }}
                      >
                        {user.rankTier}
                      </span>
                    </td>
                    <td className="py-4 text-right pr-4 text-[#dc2626] font-bold">
                      {user.points.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
