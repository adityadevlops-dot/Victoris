interface ArenaCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function ArenaCard({
  children,
  className = "",
}: ArenaCardProps): JSX.Element {
  return (
    <div className={`p-4 bg-neutral-900 rounded-lg border border-neutral-800 ${className}`}>
      {children}
    </div>
  );
}
