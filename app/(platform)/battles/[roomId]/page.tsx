"use client";

import { useEffect, useState } from "react";
import { useBattleSocket } from "@/hooks/useBattleSocket";
import { useBattleStore } from "@/store/battleStore";
import { useRouter } from "next/navigation";
import { Trophy } from "lucide-react";
import ChallengeLayout from "@/components/arena/ChallengeLayout";
import ProblemPanel from "@/components/arena/ProblemPanel";
import EditorPanel from "@/components/arena/EditorPanel";
import TestCasePanel from "@/components/arena/TestCasePanel";
import ConsolePanel from "@/components/arena/ConsolePanel";

export default function RoomLobbyPage() {
  const router = useRouter();
  const { emit, socket } = useBattleSocket();
  const room = useBattleStore((state) => state.room);
  
  // Local states for UI
  const [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => {
    if (!socket) return;

    socket.on("countdown_started", () => {
      setCountdown(5);
      const int = setInterval(() => {
        setCountdown(prev => {
          if (prev && prev > 1) return prev - 1;
          clearInterval(int);
          return null;
        });
      }, 1000);
    });

    return () => {
      socket.off("countdown_started");
    };
  }, [socket]);

  // If we arrive here directly and not connected to room, maybe wait or show loading
  if (!room) {
    return (
      <div className="h-screen w-full bg-[#000000] flex items-center justify-center font-['Orbitron'] text-[#fafafa] text-2xl animate-pulse">
        CONNECTING TO BATTLE NETWORK...
      </div>
    );
  }

  const handleReady = () => {
    emit("ready", { roomId: room.id });
  };

  const handleLeave = () => {
    emit("leave_room", { roomId: room.id });
    router.push("/battles");
  };

  const myPlayer = room.players.find(p => p.id === socket?.id);

  // 1. WAITING LOBBY
  if (room.status === "WAITING") {
    return (
      <div className="h-screen w-full bg-[#000000] text-[#fafafa] p-8 flex flex-col font-['Rajdhani']">
        <header className="flex justify-between items-start mb-12">
          <div>
            <h1 className="font-['Orbitron'] font-black text-4xl mb-2">
              ROOM <span className="text-[#dc2626]">#{room.id}</span>
            </h1>
            <div className="flex gap-4 font-['JetBrains_Mono'] text-xs text-[#a1a1aa] uppercase tracking-widest">
              <span>{room.name}</span>
              <span>•</span>
              <span>{room.topic}</span>
              <span>•</span>
              <span className="text-[#dc2626]">{room.difficulty}</span>
            </div>
          </div>
          <button 
            onClick={handleLeave}
            className="px-4 py-2 border border-[#1a1a1a] hover:border-[#dc2626] text-[#a1a1aa] hover:text-[#dc2626] font-['Orbitron'] text-xs uppercase tracking-widest transition-colors"
          >
            ABORT MISSION
          </button>
        </header>

        <div className="flex-1 flex gap-8 max-w-6xl mx-auto w-full">
          {/* Players List */}
          <div className="flex-1 bg-[#080808] border border-[#1a1a1a] p-6 relative">
            <div className="flex justify-between items-center mb-6 border-b border-[#1a1a1a] pb-4">
              <h2 className="font-['Orbitron'] font-bold text-xl">COMBATANTS</h2>
              <span className="font-['JetBrains_Mono'] text-xs text-[#52525b]">
                {room.players.length} / {room.maxPlayers}
              </span>
            </div>
            
            <div className="flex flex-col gap-4">
              {room.players.map(p => (
                <div key={p.id} className="flex items-center justify-between p-4 bg-[#111111] border border-[#1a1a1a]">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#1a1a1a] flex items-center justify-center font-['Orbitron'] font-bold">
                      {p.username.charAt(0)}
                    </div>
                    <div>
                      <div className="font-['Orbitron'] font-bold">{p.username} {p.id === socket?.id && "(YOU)"}</div>
                      <div className="font-['JetBrains_Mono'] text-[10px] text-[#dc2626] uppercase tracking-widest">{p.rank}</div>
                    </div>
                  </div>
                  <div className={`font-['JetBrains_Mono'] text-xs uppercase tracking-widest px-3 py-1 border ${
                    p.status === 'READY' ? 'border-[#22c55e] text-[#22c55e]' : 'border-[#52525b] text-[#52525b]'
                  }`}>
                    {p.status}
                  </div>
                </div>
              ))}
              
              {/* Empty slots */}
              {Array.from({ length: room.maxPlayers - room.players.length }).map((_, i) => (
                <div key={i} className="flex items-center justify-center p-4 bg-[#0a0a0a] border border-[#1a1a1a] border-dashed text-[#52525b] font-['JetBrains_Mono'] text-xs tracking-widest uppercase">
                  WAITING FOR PLAYER...
                </div>
              ))}
            </div>
          </div>

          {/* Action Panel */}
          <div className="w-80 flex flex-col gap-6">
            <div className="bg-[#080808] border border-[#1a1a1a] p-6">
              <h3 className="font-['Orbitron'] font-bold text-sm text-[#a1a1aa] mb-4">MATCH RULES</h3>
              <ul className="flex flex-col gap-3 font-['JetBrains_Mono'] text-xs text-[#52525b]">
                <li className="flex justify-between"><span>TIME LIMIT</span><span className="text-[#fafafa]">{room.timeLimit} MINS</span></li>
                <li className="flex justify-between"><span>HINTS</span><span className="text-[#dc2626]">DISABLED</span></li>
                <li className="flex justify-between"><span>VICTO REWARD</span><span className="text-[#f59e0b]">DYNAMIC</span></li>
              </ul>
            </div>
            
            <button 
              onClick={handleReady}
              disabled={myPlayer?.status === "READY"}
              className={`px-6 py-4 font-['Orbitron'] font-bold text-sm uppercase tracking-widest transition-all ${
                myPlayer?.status === "READY" 
                  ? "bg-[#111111] text-[#22c55e] border border-[#22c55e]/30"
                  : "bg-[#dc2626] hover:bg-[#ef4444] text-[#000000]"
              }`}
              style={{ clipPath: "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)" }}
            >
              {myPlayer?.status === "READY" ? "READY FOR COMBAT" : "LOCK IN"}
            </button>
          </div>
        </div>

        {/* Countdown Overlay */}
        {countdown !== null && (
          <div className="fixed inset-0 bg-[#000000]/90 backdrop-blur-md z-50 flex items-center justify-center flex-col">
            <div className="font-['Orbitron'] font-black text-9xl text-[#dc2626] animate-pulse">
              {countdown}
            </div>
            <div className="mt-8 font-['JetBrains_Mono'] text-[#a1a1aa] tracking-[0.5em] uppercase">
              PREPARE FOR BATTLE
            </div>
          </div>
        )}
      </div>
    );
  }

  // 2. IN PROGRESS (Active Battle UI)
  if (room.status === "IN_PROGRESS" || room.status === "COUNTDOWN") {
    // We reuse ChallengeLayout but we might want to overlay live rankings
    return (
      <div className="relative h-screen w-full">
        <ChallengeLayout 
          problemPanel={<ProblemPanel />}
          editorPanel={<EditorPanel />}
          testCasePanel={<TestCasePanel />}
          consolePanel={<ConsolePanel />}
        />
        
        {/* Live Ranking Overlay for Multiplayer */}
        <div className="absolute top-16 right-4 w-64 bg-[#080808]/90 backdrop-blur-sm border border-[#1a1a1a] p-4 z-40">
          <h3 className="font-['Orbitron'] font-bold text-xs text-[#a1a1aa] mb-3 uppercase tracking-widest flex items-center gap-2">
            <div className="w-2 h-2 bg-[#dc2626] rounded-full animate-pulse" /> LIVE STATUS
          </h3>
          <div className="flex flex-col gap-2">
            {room.players.map(p => (
              <div key={p.id} className="flex flex-col gap-1">
                <div className="flex justify-between items-center font-['JetBrains_Mono'] text-[10px]">
                  <span className={p.id === socket?.id ? "text-[#fafafa]" : "text-[#a1a1aa]"}>
                    {p.username}
                  </span>
                  <span className={p.status === "SUBMITTED" ? "text-[#22c55e]" : "text-[#52525b]"}>
                    {p.status}
                  </span>
                </div>
                <div className="h-1 w-full bg-[#111111] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#dc2626] transition-all duration-500" 
                    style={{ width: `${p.progress}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 3. FINISHED (End Screen)
  if (room.status === "FINISHED") {
    const isWinner = room.winnerId === socket?.id;
    return (
      <div className="h-screen w-full bg-[#000000] text-[#fafafa] flex flex-col items-center justify-center font-['Rajdhani'] p-8">
        <div className="max-w-2xl w-full flex flex-col items-center bg-[#080808] border border-[#1a1a1a] p-12 relative overflow-hidden">
          
          <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-transparent via-[#dc2626] to-transparent" />
          
          <Trophy className={`w-24 h-24 mb-6 ${isWinner ? "text-[#f59e0b]" : "text-[#52525b]"}`} />
          
          <h1 className="font-['Orbitron'] font-black text-5xl mb-2 text-center uppercase tracking-widest">
            {isWinner ? "VICTORY" : "DEFEAT"}
          </h1>
          <p className="text-[#a1a1aa] text-lg mb-12 font-['JetBrains_Mono'] uppercase tracking-widest">
            {isWinner ? "YOU CONQUERED THE ARENA" : "BETTER LUCK NEXT TIME"}
          </p>

          <div className="w-full bg-[#111111] border border-[#1a1a1a] p-6 mb-8">
            <h3 className="font-['Orbitron'] font-bold text-sm text-[#a1a1aa] mb-4 uppercase tracking-widest">FINAL STANDINGS</h3>
            <div className="flex flex-col gap-3">
              {room.players.sort((a,b) => b.score - a.score).map((p, i) => (
                <div key={p.id} className="flex justify-between items-center font-['JetBrains_Mono'] text-sm">
                  <div className="flex items-center gap-4">
                    <span className={`font-bold ${i === 0 ? "text-[#f59e0b]" : "text-[#52525b]"}`}>
                      #{i + 1}
                    </span>
                    <span className={p.id === socket?.id ? "text-[#fafafa]" : "text-[#a1a1aa]"}>
                      {p.username}
                    </span>
                  </div>
                  <span className="text-[#dc2626]">{p.score} PTS</span>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={() => router.push("/battles")}
            className="px-8 py-3 bg-[#fafafa] hover:bg-[#dc2626] text-[#000000] hover:text-[#fafafa] font-['Orbitron'] font-bold text-sm uppercase tracking-widest transition-colors"
          >
            RETURN TO LOBBY
          </button>
        </div>
      </div>
    );
  }

  return null;
}
