interface ProblemSolvePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProblemSolvePage({
  params,
}: ProblemSolvePageProps): Promise<JSX.Element> {
  const { slug } = await params;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-4xl font-bold">Solving: {slug}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-neutral-900 rounded-lg border border-neutral-800 p-4">
          <h2 className="text-xl font-bold mb-4">Problem Description</h2>
          {/* Problem details */}
        </div>
        <div className="bg-neutral-900 rounded-lg border border-neutral-800 p-4">
          <h2 className="text-xl font-bold mb-4">Code Editor</h2>
          {/* Code editor */}
        </div>
      </div>
    </div>
  );
}
