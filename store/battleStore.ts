import { create } from 'zustand';
import { BattleRoom, Player } from '../types/battle';

interface BattleState {
  socketConnected: boolean;
  room: BattleRoom | null;
  me: Player | null;
  setSocketConnected: (connected: boolean) => void;
  setRoom: (room: BattleRoom) => void;
  setMe: (player: Player) => void;
  updatePlayer: (player: Player) => void;
  resetBattleState: () => void;
}

export const useBattleStore = create<BattleState>((set) => ({
  socketConnected: false,
  room: null,
  me: null,
  setSocketConnected: (socketConnected) => set({ socketConnected }),
  setRoom: (room) => set({ room }),
  setMe: (me) => set({ me }),
  updatePlayer: (player) => set((state) => {
    if (!state.room) return state;
    return {
      room: {
        ...state.room,
        players: state.room.players.map(p => p.id === player.id ? player : p)
      }
    };
  }),
  resetBattleState: () => set({ room: null, me: null, socketConnected: false })
}));
