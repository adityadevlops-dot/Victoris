import type { Battle } from "@/types";

interface RoomCardProps {
  battle: Battle;
}

export default function RoomCard({ battle }: RoomCardProps): JSX.Element {
  return (
    <div className="p-4 bg-neutral-900 rounded-lg border border-neutral-800 hover:border-accent transition-colors cursor-pointer">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">Room {battle.roomId}</h3>
        <span
          className={`text-xs font-medium px-2 py-1 rounded ${
            battle.status === "active"
              ? "bg-accent text-white"
              : "bg-neutral-800 text-neutral-400"
          }`}
        >
          {battle.status}
        </span>
      </div>
      <p className="text-sm text-neutral-400 mb-2">
        {battle.participants.length} players
      </p>
      <button className="w-full py-2 bg-accent hover:bg-accent-dark text-white rounded-md text-sm font-medium transition-colors">
        Join
      </button>
    </div>
  );
}
