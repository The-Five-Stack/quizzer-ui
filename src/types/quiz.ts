export type Difficulty = 'EASY' | 'NORMAL' | 'HARD';

export interface Answer {
  id: number;
  content: string;
  correct: boolean;
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

export interface QuizInfo {
  id: number;
  name: string;
  description: string;
  courseCode: string;
  // category: string;
  published: boolean;
}

export interface Category {
  id: number;
  name: string;
  description: string;
}