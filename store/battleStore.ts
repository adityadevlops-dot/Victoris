import { create } from "zustand";
import type { Battle, BattleParticipant } from "@/types";

interface BattleStore {
  currentBattle: Battle | null;
  participants: BattleParticipant[];
  isLoading: boolean;
  setCurrentBattle: (battle: Battle | null) => void;
  setParticipants: (participants: BattleParticipant[]) => void;
  setIsLoading: (loading: boolean) => void;
}

export const useBattleStore = create<BattleStore>((set) => ({
  currentBattle: null,
  participants: [],
  isLoading: false,
  setCurrentBattle: (currentBattle) => set({ currentBattle }),
  setParticipants: (participants) => set({ participants }),
  setIsLoading: (isLoading) => set({ isLoading }),
}));
