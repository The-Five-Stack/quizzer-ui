import type { Quiz } from '../types/quiz';
import type { Difficulty } from '../types/quiz';

type RawAnswer = {
  id: number;
  content: string;
  correct: boolean;
};

type RawQuestion = {
  id: number;
  questionContent: string;
  difficulty: Difficulty;
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
    id: data.id,
    name: data.name,
    description: data.description ,
    courseCode: data.courseCode,
    published: data.published,
    questions: Array.isArray(data.questions)
      ? data.questions.map((question) => ({
          id: question.id,
          questionContent: question.questionContent,
          difficulty: question.difficulty,
          answers: Array.isArray(question.answers)
            ? question.answers.map((answer) => ({
                id: answer.id,
                content: answer.content,
                correct: answer.correct,
              }))
            : [],
        }))
      : [],
  };
}
