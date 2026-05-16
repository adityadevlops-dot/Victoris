interface BattleRoomPageProps {
  params: Promise<{
    roomId: string;
  }>;
}

export default async function BattleRoomPage({
  params,
}: BattleRoomPageProps): Promise<JSX.Element> {
  const { roomId } = await params;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-4xl font-bold">Battle Room: {roomId}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-neutral-900 rounded-lg border border-neutral-800 p-4">
          <h2 className="text-xl font-bold mb-4">Problem</h2>
          {/* Problem display */}
        </div>
        <div className="bg-neutral-900 rounded-lg border border-neutral-800 p-4">
          <h2 className="text-xl font-bold mb-4">Participants</h2>
          {/* Participants list */}
        </div>
      </div>
    </div>
  );
}
