import type { BattleParticipant } from "@/types";

interface ParticipantPanelProps {
  participants: BattleParticipant[];
}

export default function ParticipantPanel({
  participants,
}: ParticipantPanelProps): JSX.Element {
  return (
    <div className="space-y-2">
      {participants.map((participant) => (
        <div
          key={participant.id}
          className="flex items-center justify-between p-3 bg-neutral-800 rounded-md"
        >
          <span className="font-medium">{participant.user.username}</span>
          <span
            className={`text-xs font-medium px-2 py-1 rounded ${
              participant.status === "passed"
                ? "bg-green-500/20 text-green-400"
                : "bg-neutral-700 text-neutral-400"
            }`}
          >
            {participant.status}
          </span>
        </div>
      ))}
    </div>
  );
}
