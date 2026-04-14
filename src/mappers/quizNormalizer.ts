import type { Quiz } from '../types/quiz';

type RawAnswer = {
  id: number;
  content: string;
  correct: boolean;
};

type RawQuestion = {
  id: number;
  questionContent: string;
  difficulty: 'NORMAL' | 'EASY' | 'HARD';
  answers: RawAnswer[] | null;
};

type RawQuiz = {
  id: number;
  name: string;
  description: string;
  courseCode: string;
  published: boolean;
  questions: RawQuestion[] | null;
};

export function normalizeQuiz(payload: unknown): Quiz {
  const data = payload as RawQuiz;

  return {
    id: data.id ?? 0,
    name: data.name ?? '',
    description: data.description ?? '',
    courseCode: data.courseCode ?? '',
    published: data.published ?? false,
    questions: Array.isArray(data.questions)
      ? data.questions.map((question) => ({
          id: question.id ?? 0,
          questionContent: question.questionContent ?? '',
          difficulty: question.difficulty ?? 'NORMAL',
          answers: Array.isArray(question.answers)
            ? question.answers.map((answer, index) => ({
                id: answer.id ?? index + 1,
                answerContent: answer.content ?? '',
                isCorrect: answer.correct ?? false,
              }))
            : [],
        }))
      : [],
  };
}
