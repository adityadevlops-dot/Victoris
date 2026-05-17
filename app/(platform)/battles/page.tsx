"use client";

import { useState } from "react";
import { useBattleSocket } from "@/hooks/useBattleSocket";
import { useBattleStore } from "@/store/battleStore";
import { useRouter } from "next/navigation";
import { Users, Lock, Unlock, Plus } from "lucide-react";

// Mock Active Rooms until we fetch them from server via HTTP or Socket
const MOCK_ROOMS = [
  { id: "A1B2C3", name: "Bronze Grinders", topic: "Arrays", difficulty: "Bronze", maxPlayers: 4, players: 2, isPrivate: false },
  { id: "X9Y8Z7", name: "DP Masters", topic: "Dynamic Programming", difficulty: "Diamond", maxPlayers: 2, players: 1, isPrivate: true },
];

export default function BattlesPage() {
  const { emit } = useBattleSocket();
  const socketConnected = useBattleStore((state) => state.socketConnected);
  const router = useRouter();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleJoinRoom = (roomId: string) => {
    emit("join_room", { roomId, username: "Guest_" + Math.floor(Math.random()*1000), rank: "Bronze" }, (res: any) => {
      if (res.success) {
        router.push(`/battles/${roomId}`);
      } else {
        alert("Failed to join room: " + res.error);
      }
    });
  };

  const handleCreateRoom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    emit("create_room", {
      name: formData.get("name") as string,
      topic: formData.get("topic") as string,
      difficulty: formData.get("difficulty") as string,
      timeLimit: parseInt(formData.get("timeLimit") as string, 10),
      isPrivate: formData.get("isPrivate") === "on",
      maxPlayers: parseInt(formData.get("maxPlayers") as string, 10),
      problemId: "prob_1" // Temporary hardcoded problem
    }, (res: any) => {
      if (res.success) {
        // Automatically join the room we just created
        emit("join_room", { roomId: res.roomId, username: "Host_" + Math.floor(Math.random()*1000), rank: "Silver" }, (joinRes: any) => {
          if (joinRes.success) {
            router.push(`/battles/${res.roomId}`);
          }
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#000000] text-[#fafafa] p-8 font-['Rajdhani']">
      <div className="max-w-6xl mx-auto w-full">
        <header className="mb-8 border-b border-[#1a1a1a] pb-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <div className="font-['Orbitron'] font-black text-4xl tracking-widest text-[#fafafa]">
                MULTIPLAYER <span className="text-[#dc2626]">BATTLES</span>
              </div>
            </div>
            <p className="text-[#a1a1aa] text-lg">
              {socketConnected ? "🟢 Connected to Battle Server" : "🔴 Disconnected from Server"}
            </p>
          </div>
          
          <button 
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3 bg-[#dc2626] hover:bg-[#ef4444] text-[#000000] font-['Orbitron'] font-bold text-sm uppercase tracking-widest transition-all flex items-center gap-2"
            style={{ clipPath: "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)" }}
          >
            <Plus className="w-5 h-5" /> CREATE ROOM
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_ROOMS.map((room) => (
            <div key={room.id} className="bg-[#080808] border border-[#1a1a1a] p-6 hover:border-[#dc2626]/50 transition-colors flex flex-col group">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-['Orbitron'] font-bold text-xl group-hover:text-[#dc2626] transition-colors">{room.name}</h3>
                {room.isPrivate ? <Lock className="w-4 h-4 text-[#52525b]" /> : <Unlock className="w-4 h-4 text-[#a1a1aa]" />}
              </div>
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2 py-1 font-['JetBrains_Mono'] text-[10px] uppercase tracking-widest border border-[#1a1a1a] text-[#a1a1aa] rounded-[2px] bg-[#111111]">
                  {room.difficulty}
                </span>
                <span className="px-2 py-1 font-['JetBrains_Mono'] text-[10px] uppercase tracking-widest border border-[#1a1a1a] text-[#a1a1aa] rounded-[2px] bg-[#111111]">
                  {room.topic}
                </span>
              </div>
              <div className="mt-auto flex items-center justify-between border-t border-[#1a1a1a] pt-4">
                <div className="flex items-center gap-2 text-[#a1a1aa] font-['JetBrains_Mono'] text-xs">
                  <Users className="w-4 h-4" /> {room.players}/{room.maxPlayers}
                </div>
                <button 
                  onClick={() => handleJoinRoom(room.id)}
                  className="px-4 py-1.5 border border-[#1a1a1a] hover:border-[#dc2626] hover:text-[#dc2626] font-['Orbitron'] text-xs uppercase tracking-widest transition-colors"
                >
                  JOIN MATCH
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-[#000000]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#080808] border border-[#1a1a1a] p-8 max-w-md w-full shadow-[0_0_50px_rgba(220,38,38,0.1)] relative">
            <button 
              onClick={() => setShowCreateModal(false)}
              className="absolute top-4 right-4 text-[#52525b] hover:text-[#fafafa]"
            >
              ✕
            </button>
            <h2 className="font-['Orbitron'] font-bold text-2xl mb-6">HOST A BATTLE</h2>
            
            <form onSubmit={handleCreateRoom} className="flex flex-col gap-4 font-['JetBrains_Mono'] text-sm">
              <label className="flex flex-col gap-1 text-[#a1a1aa]">
                Room Name
                <input name="name" type="text" required className="bg-[#000000] border border-[#1a1a1a] p-2 text-[#fafafa] focus:border-[#dc2626] outline-none" defaultValue="Code Grinders" />
              </label>
              
              <div className="grid grid-cols-2 gap-4">
                <label className="flex flex-col gap-1 text-[#a1a1aa]">
                  Topic
                  <select name="topic" className="bg-[#000000] border border-[#1a1a1a] p-2 text-[#fafafa] focus:border-[#dc2626] outline-none">
                    <option>Arrays</option>
                    <option>Strings</option>
                    <option>Dynamic Programming</option>
                  </select>
                </label>
                
                <label className="flex flex-col gap-1 text-[#a1a1aa]">
                  Difficulty
                  <select name="difficulty" className="bg-[#000000] border border-[#1a1a1a] p-2 text-[#fafafa] focus:border-[#dc2626] outline-none">
                    <option>Bronze</option>
                    <option>Silver</option>
                    <option>Gold</option>
                  </select>
                </label>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <label className="flex flex-col gap-1 text-[#a1a1aa]">
                  Time Limit (mins)
                  <input name="timeLimit" type="number" required min={5} max={60} defaultValue={15} className="bg-[#000000] border border-[#1a1a1a] p-2 text-[#fafafa] focus:border-[#dc2626] outline-none" />
                </label>
                
                <label className="flex flex-col gap-1 text-[#a1a1aa]">
                  Max Players
                  <input name="maxPlayers" type="number" required min={2} max={8} defaultValue={2} className="bg-[#000000] border border-[#1a1a1a] p-2 text-[#fafafa] focus:border-[#dc2626] outline-none" />
                </label>
              </div>

              <label className="flex items-center gap-2 text-[#a1a1aa] mt-2 cursor-pointer">
                <input name="isPrivate" type="checkbox" className="accent-[#dc2626]" />
                Private Room (Requires Invite Code)
              </label>

              <button 
                type="submit"
                className="mt-6 px-6 py-3 bg-[#fafafa] hover:bg-[#dc2626] text-[#000000] hover:text-[#fafafa] font-['Orbitron'] font-bold text-sm uppercase tracking-widest transition-colors w-full"
              >
                INITIALIZE BATTLE
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
