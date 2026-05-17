export type Rank = 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond' | 'Master' | 'Legend';

export interface RankInfo {
  name: Rank;
  minPoints: number;
  maxPoints: number;
  color: string;
}

export const RANKS: RankInfo[] = [
  { name: 'Bronze', minPoints: 0, maxPoints: 499, color: '#cd7f32' },
  { name: 'Silver', minPoints: 500, maxPoints: 1499, color: '#c0c0c0' },
  { name: 'Gold', minPoints: 1500, maxPoints: 2999, color: '#ffd700' },
  { name: 'Platinum', minPoints: 3000, maxPoints: 4999, color: '#e5e4e2' },
  { name: 'Diamond', minPoints: 5000, maxPoints: 7499, color: '#b9f2ff' },
  { name: 'Master', minPoints: 7500, maxPoints: 9999, color: '#ff00ff' },
  { name: 'Legend', minPoints: 10000, maxPoints: Infinity, color: '#dc2626' }, // Red for Legend
];

export const getRankByPoints = (points: number): RankInfo => {
  return RANKS.find(r => points >= r.minPoints && points <= r.maxPoints) || RANKS[0];
};

export const getNextRank = (points: number): RankInfo | null => {
  const currentRankIndex = RANKS.findIndex(r => points >= r.minPoints && points <= r.maxPoints);
  if (currentRankIndex >= 0 && currentRankIndex < RANKS.length - 1) {
    return RANKS[currentRankIndex + 1];
  }
  return null;
};

// Victo Points Logic
export const PROBLEM_POINTS = {
  Easy: 10,
  Medium: 25,
  Hard: 50,
};

export const BATTLE_BONUS = 20;

export const HINT_PENALTIES = {
  HINT_1: 2,   // -2 points
  HINT_2: 5,   // -5 points
  HINT_3: 10,  // -10 points
};

export const calculatePoints = (
  difficulty: 'Easy' | 'Medium' | 'Hard',
  isBattleWin: boolean,
  hintsUsed: number
): number => {
  let points = PROBLEM_POINTS[difficulty];
  if (isBattleWin) points += BATTLE_BONUS;
  
  if (hintsUsed >= 1) points -= HINT_PENALTIES.HINT_1;
  if (hintsUsed >= 2) points -= HINT_PENALTIES.HINT_2;
  if (hintsUsed >= 3) points -= HINT_PENALTIES.HINT_3;
  
  return Math.max(0, points); // Prevents negative points on a single problem
};

// Badges System
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export const BADGES: Record<string, Badge> = {
  FIRST_BLOOD: { id: 'FIRST_BLOOD', name: 'First Blood', description: 'Solve your first problem', icon: 'drop', color: '#dc2626' },
  FLAWLESS_VICTORY: { id: 'FLAWLESS_VICTORY', name: 'Flawless Victory', description: 'Win a battle without taking damage (no wrong submissions)', icon: 'shield', color: '#ffd700' },
  SPEED_DEMON: { id: 'SPEED_DEMON', name: 'Speed Demon', description: 'Solve a Medium problem in under 3 minutes', icon: 'zap', color: '#3b82f6' },
  NIGHT_OWL: { id: 'NIGHT_OWL', name: 'Night Owl', description: 'Solve 3 problems between 12 AM and 4 AM', icon: 'moon', color: '#a855f7' },
  UNSTOPPABLE: { id: 'UNSTOPPABLE', name: 'Unstoppable', description: 'Win 5 battles in a row', icon: 'fire', color: '#f97316' },
};
