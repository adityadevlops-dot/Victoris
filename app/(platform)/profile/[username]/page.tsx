interface ProfilePageProps {
  params: Promise<{
    username: string;
  }>;
}

export default async function ProfilePage({
  params,
}: ProfilePageProps): Promise<JSX.Element> {
  const { username } = await params;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-start gap-6">
        <div className="w-24 h-24 bg-neutral-900 rounded-lg border border-neutral-800" />
        <div>
          <h1 className="text-4xl font-bold">{username}</h1>
          <p className="text-neutral-400 mt-2">Rank: -</p>
          <p className="text-neutral-400">Points: 0</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-neutral-900 rounded-lg border border-neutral-800">
          <p className="text-neutral-400 text-sm">Total Points</p>
          <p className="text-2xl font-bold mt-2">0</p>
        </div>
        <div className="p-4 bg-neutral-900 rounded-lg border border-neutral-800">
          <p className="text-neutral-400 text-sm">Wins</p>
          <p className="text-2xl font-bold mt-2">0</p>
        </div>
        <div className="p-4 bg-neutral-900 rounded-lg border border-neutral-800">
          <p className="text-neutral-400 text-sm">Win Rate</p>
          <p className="text-2xl font-bold mt-2">-</p>
        </div>
      </div>
    </div>
  );
}
