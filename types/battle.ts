export type RoomStatus = 'WAITING' | 'COUNTDOWN' | 'IN_PROGRESS' | 'FINISHED';

export interface Player {
  id: string; // Socket ID or User ID
  username: string;
  rank: string;
  status: 'JOINED' | 'READY' | 'PLAYING' | 'SUBMITTED' | 'DISCONNECTED';
  score: number;
  progress: number;
}

export interface BattleRoom {
  id: string; // Room code
  name: string;
  topic: string;
  difficulty: 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond';
  timeLimit: number;
  isPrivate: boolean;
  maxPlayers: number;
  players: Player[];
  status: RoomStatus;
  problemId?: string;
  winnerId?: string;
  startedAt?: number;
}

export interface ServerToClientEvents {
  room_updated: (room: BattleRoom) => void;
  player_joined: (player: Player) => void;
  player_left: (playerId: string) => void;
  countdown_started: () => void;
  battle_started: (problemId: string) => void;
  player_progress: (data: { playerId: string; progress: number }) => void;
  player_submitted: (data: { playerId: string; score: number }) => void;
  battle_ended: (data: { winnerId: string; rankings: Player[] }) => void;
  error: (message: string) => void;
}

export interface ClientToServerEvents {
  create_room: (data: { 
    name: string; 
    topic: string; 
    difficulty: string; 
    timeLimit: number; 
    isPrivate: boolean; 
    maxPlayers: number; 
    problemId: string 
  }) => void;
  join_room: (data: { roomId: string; username: string; rank: string }) => void;
  ready: (data: { roomId: string }) => void;
  submit_code: (data: { roomId: string; code: string; testResults: any }) => void;
  leave_room: (data: { roomId: string }) => void;
}
