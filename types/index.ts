export interface User {
  id: string;
  username: string;
  email: string;
  displayName?: string;
  avatar?: string;
  bio?: string;
  rank: number;
  victorisPoints: number;
  wins: number;
  losses: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Problem {
  id: string;
  slug: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  category: string;
  examples: Array<{
    input: string;
    output: string;
  }>;
  testCases: Array<{
    input: string;
    expected: string;
  }>;
  points: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Solution {
  id: string;
  code: string;
  language: string;
  passed: boolean;
  points: number;
  userId: string;
  problemId: string;
  createdAt: Date;
}

export interface Battle {
  id: string;
  roomId: string;
  status: "waiting" | "active" | "completed";
  problemId: string;
  startedAt?: Date;
  endedAt?: Date;
  createdAt: Date;
  participants: BattleParticipant[];
}

export interface BattleParticipant {
  id: string;
  battleId: string;
  userId: string;
  user: User;
  status: "joined" | "submitted" | "passed" | "failed";
  points: number;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
