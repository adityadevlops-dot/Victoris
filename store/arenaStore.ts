import { create } from "zustand";
import type { Problem, Solution } from "@/types";

interface ArenaStore {
  problems: Problem[];
  selectedProblem: Problem | null;
  solutions: Solution[];
  isLoading: boolean;
  setProblems: (problems: Problem[]) => void;
  setSelectedProblem: (problem: Problem | null) => void;
  setSolutions: (solutions: Solution[]) => void;
  setIsLoading: (loading: boolean) => void;
}

export const useArenaStore = create<ArenaStore>((set) => ({
  problems: [],
  selectedProblem: null,
  solutions: [],
  isLoading: false,
  setProblems: (problems) => set({ problems }),
  setSelectedProblem: (selectedProblem) => set({ selectedProblem }),
  setSolutions: (solutions) => set({ solutions }),
  setIsLoading: (isLoading) => set({ isLoading }),
}));
