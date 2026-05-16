import type { ReactNode } from "react";

interface PageShellProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export default function PageShell({
  title,
  subtitle,
  children,
}: PageShellProps): JSX.Element {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold">{title}</h1>
        {subtitle && <p className="text-neutral-400 mt-2">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}
