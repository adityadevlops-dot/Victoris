import { create } from 'zustand';
import { Verdict, Language, Problem } from '../types/arena';

interface ArenaState {
  problem: Problem | null;
  code: string;
  language: Language;
  verdict: Verdict;
  isRunning: boolean;
  output: string;
  timeTakenMs: number | null;
  memoryTakenKb: number | null;
  startTime: number | null;
  
  setProblem: (problem: Problem) => void;
  setCode: (code: string) => void;
  setLanguage: (lang: Language) => void;
  setVerdict: (verdict: Verdict) => void;
  setOutput: (output: string) => void;
  startExecution: () => void;
  endExecution: (verdict: Verdict, timeTakenMs?: number, memoryTakenKb?: number) => void;
  resetState: () => void;
}

export const useArenaStore = create<ArenaState>((set) => ({
  problem: null,
  code: '',
  language: 'javascript',
  verdict: 'IDLE',
  isRunning: false,
  output: '',
  timeTakenMs: null,
  memoryTakenKb: null,
  startTime: null,

  setProblem: (problem) => set({ 
    problem, 
    code: problem.initialCode['javascript'], // Default to JS
    language: 'javascript',
    verdict: 'IDLE',
    output: '',
    timeTakenMs: null,
    memoryTakenKb: null,
    startTime: Date.now() // Track solve time
  }),

  setCode: (code) => set({ code }),
  
  setLanguage: (language) => set((state) => ({ 
    language,
    // If they haven't changed the initial code, swap to the new language's initial code
    code: state.problem?.initialCode[language] || state.code
  })),

  setVerdict: (verdict) => set({ verdict }),
  
  setOutput: (output) => set({ output }),
  
  startExecution: () => set({ 
    isRunning: true, 
    verdict: 'RUNNING',
    output: 'Executing in sandbox...',
    timeTakenMs: null,
    memoryTakenKb: null
  }),
  
  endExecution: (verdict, timeTakenMs, memoryTakenKb) => set({ 
    isRunning: false, 
    verdict,
    timeTakenMs: timeTakenMs ?? null,
    memoryTakenKb: memoryTakenKb ?? null
  }),

  resetState: () => set({
    problem: null,
    code: '',
    language: 'javascript',
    verdict: 'IDLE',
    isRunning: false,
    output: '',
    timeTakenMs: null,
    memoryTakenKb: null,
    startTime: null
  })
}));
