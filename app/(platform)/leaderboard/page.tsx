export default function LeaderboardPage(): JSX.Element {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-4xl font-bold">Leaderboard</h1>
      <div className="bg-neutral-900 rounded-lg border border-neutral-800 overflow-hidden">
        <table className="w-full">
          <thead className="border-b border-neutral-800">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Rank
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Player
              </th>
              <th className="px-4 py-3 text-right text-sm font-semibold">
                Points
              </th>
              <th className="px-4 py-3 text-right text-sm font-semibold">
                Wins
              </th>
            </tr>
          </thead>
          <tbody>{/* Leaderboard rows */}</tbody>
        </table>
      </div>
    </div>
  );
}
