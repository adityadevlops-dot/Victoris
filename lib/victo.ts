export const POINTS_CONFIG = {
  easy: 10,
  medium: 25,
  hard: 50,
  bonus: 5,
} as const;

export function calculatePoints(
  difficulty: "easy" | "medium" | "hard",
  passed: boolean,
  time: number
): number {
  const basePoints = POINTS_CONFIG[difficulty];
  if (!passed) return 0;

  const timeBonus = Math.max(0, POINTS_CONFIG.bonus - Math.floor(time / 60));
  return basePoints + timeBonus;
}
