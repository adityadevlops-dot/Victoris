export default function DashboardPage(): JSX.Element {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-neutral-900 rounded-lg border border-neutral-800">
          <p className="text-neutral-400 mb-2">Total Points</p>
          <p className="text-3xl font-bold">0</p>
        </div>
        <div className="p-4 bg-neutral-900 rounded-lg border border-neutral-800">
          <p className="text-neutral-400 mb-2">Wins</p>
          <p className="text-3xl font-bold">0</p>
        </div>
        <div className="p-4 bg-neutral-900 rounded-lg border border-neutral-800">
          <p className="text-neutral-400 mb-2">Rank</p>
          <p className="text-3xl font-bold">-</p>
        </div>
      </div>
    </div>
  );
}
