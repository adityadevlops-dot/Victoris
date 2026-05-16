interface RankBadgeProps {
  rank: number;
}

export default function RankBadge({ rank }: RankBadgeProps): JSX.Element {
  const getRankColor = (r: number): string => {
    if (r <= 10) return "bg-yellow-600";
    if (r <= 50) return "bg-gray-400";
    if (r <= 100) return "bg-orange-600";
    return "bg-neutral-700";
  };

  return (
    <div
      className={`w-12 h-12 ${getRankColor(rank)} rounded-full flex items-center justify-center text-white font-bold text-lg`}
    >
      #{rank}
    </div>
  );
}
