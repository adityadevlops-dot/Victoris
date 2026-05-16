export default function AdminPage(): JSX.Element {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-neutral-900 rounded-lg border border-neutral-800">
          <h3 className="font-semibold mb-2">Total Users</h3>
          <p className="text-3xl font-bold">0</p>
        </div>
        <div className="p-4 bg-neutral-900 rounded-lg border border-neutral-800">
          <h3 className="font-semibold mb-2">Total Problems</h3>
          <p className="text-3xl font-bold">0</p>
        </div>
      </div>
    </div>
  );
}
