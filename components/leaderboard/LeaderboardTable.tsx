import type { User } from "@/types";

interface LeaderboardTableProps {
  users: User[];
}

export default function LeaderboardTable({
  users,
}: LeaderboardTableProps): JSX.Element {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="border-b border-neutral-800">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold">Rank</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">
              Player
            </th>
            <th className="px-4 py-3 text-right text-sm font-semibold">
              Points
            </th>
            <th className="px-4 py-3 text-right text-sm font-semibold">
              Wins
            </th>
            <th className="px-4 py-3 text-right text-sm font-semibold">
              Losses
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-800">
          {users.map((user, index) => (
            <tr key={user.id} className="hover:bg-neutral-800/50 transition-colors">
              <td className="px-4 py-3 font-semibold">#{index + 1}</td>
              <td className="px-4 py-3">{user.displayName || user.username}</td>
              <td className="px-4 py-3 text-right text-accent font-medium">
                {user.victorisPoints}
              </td>
              <td className="px-4 py-3 text-right">{user.wins}</td>
              <td className="px-4 py-3 text-right">{user.losses}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
