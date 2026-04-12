export type Difficulty = 'EASY' | 'NORMAL' | 'HARD';

export const DifficultyValues = {
  EASY: 'EASY' as Difficulty,
  NORMAL: 'NORMAL' as Difficulty,
  HARD: 'HARD' as Difficulty
};

export interface Answer {
  id: number;
  answerContent: string;
  isCorrect: boolean;
}

export interface Question {
  id: number;
  questionContent: string;
  difficulty: Difficulty;
  answers: Answer[];
}

export interface Quiz {
  id: number;
  name: string;
  description: string;
  courseCode: string;
  published: boolean;
  questions: Question[];
}