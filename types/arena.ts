export type Verdict = 
  | 'IDLE' 
  | 'RUNNING' 
  | 'ACCEPTED' 
  | 'WRONG_ANSWER' 
  | 'TIME_LIMIT_EXCEEDED' 
  | 'RUNTIME_ERROR' 
  | 'COMPILATION_ERROR';

export type Language = 'javascript' | 'python' | 'cpp' | 'java';

export interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  isHidden: boolean;
}

export interface Problem {
  id: string;
  slug: string;
  title: string;
  difficulty: 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond' | 'Master' | 'Legend';
  description: string;
  timeLimit: number; // in ms
  memoryLimit: number; // in KB
  baseVictoPoints: number;
  testCases: TestCase[];
  initialCode: Record<Language, string>;
}
