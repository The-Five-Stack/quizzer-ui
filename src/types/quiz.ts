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

export interface Category {
  id: number;
  name: string;
  description: string;
}

export interface Quiz {
  id: number;
  name: string;
  description: string;
  courseCode: string;
  published: boolean;
  category: Category | null;
  createdAt: string;
  questions: Question[];
}

export interface QuizInfo {
  id: number;
  name: string;
  description: string;
  courseCode: string;
  category: Category | null;
  published: boolean;
  createdAt: string;
}
export interface QuestionResult {
  questionId: number;
  questionText: string;
  difficulty: string;
  totalAnswers: number;
  correctAnswerPercentage: number;
  correctCount: number;
  wrongCount: number;
}

export interface QuizResult {
  quizId: number;
  quizName: string;
  totalAnswers: number;
  totalQuestions: number;
  questions: QuestionResult[];
}

export interface Review {
  id: number;
  nickname: string;
  rating: number;
  review: string;
  createdAt: string;
}

export interface ReviewSummary {
  totalReviews: number;
  averageRating: number;
  reviews: Review[];
}