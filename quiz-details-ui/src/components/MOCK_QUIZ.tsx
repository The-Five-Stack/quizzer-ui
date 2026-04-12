import type { Quiz } from '../types/quiz';

export const MOCK_QUIZ: Quiz = {
  id: 1,
  name: "The Scrum Framework (Mock Data)",
  description: "Dữ liệu mẫu để làm UI",
  courseCode: "SOF005AS3AE",
  published: true,
  questions: [
    {
      id: 101,
      questionContent: "What is the purpose of the Sprint Retrospective?",
      difficulty: "NORMAL",
      answers: [
        { id: 1, answerContent: "To plan the work for the next Sprint", isCorrect: false },
        { id: 2, answerContent: "To inspect the last Sprint and create a plan for improvements", isCorrect: true },
        { id: 3, answerContent: "To present the increment to stakeholders", isCorrect: false }
      ]
    },
    {
      id: 102,
      questionContent: "Who is responsible for managing the Product Backlog?",
      difficulty: "EASY",
      answers: [
        { id: 4, answerContent: "The Product Owner", isCorrect: true },
        { id: 5, answerContent: "The Scrum Master", isCorrect: false }
      ]
    }
  ]
};