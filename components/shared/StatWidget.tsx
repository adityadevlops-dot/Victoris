interface StatWidgetProps {
  label: string;
  value: string | number;
  icon?: string;
}

export default function StatWidget({
  label,
  value,
  icon,
}: StatWidgetProps): JSX.Element {
  return (
    <div className="p-4 bg-neutral-900 rounded-lg border border-neutral-800">
      {icon && <div className="text-2xl mb-2">{icon}</div>}
      <p className="text-neutral-400 text-sm mb-1">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
