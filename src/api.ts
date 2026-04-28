import type { Category, QuizInfo } from "./types/quiz";

type CreateQuizPayload = {
  name: string;
  description: string;
  courseCode: string;
  published: boolean;
  categoryId: number;
};

// type Answer = {
//   content: string;
//   correct: boolean;
// };

async function requestJson(endpoint: string, options: RequestInit = {}) {
  const baseUrl = import.meta.env.VITE_BACKEND_URL;

  if (!baseUrl) {
    throw new Error("Missing VITE_BACKEND_URL in .env");
  }

  const res = await fetch(`${baseUrl}${endpoint}`, options);

  if (!res.ok) {
    const raw = await res.text();
    let message = `API error: ${res.status}`;

    if (raw) {
      try {
        const parsed = JSON.parse(raw) as {
          message?: string;
          error?: string;
          path?: string;
        };
        message = parsed.message ?? parsed.error ?? raw;
      } catch {
        message = raw;
      }
    }

    throw new Error(`${message} (${endpoint})`);
  }

  if (res.status === 204) {
    return null;
  }

  return res.json();
}

export const fetchWithAuth = async (
  endpoint: string,
  options: RequestInit = {},
) => {
  const defaultHeaders = {
    Authorization: "Basic dGVhY2hlcjp0ZWFjaGVyMTIz",
    "Content-Type": "application/json",
  };

  return requestJson(endpoint, {
    ...options,
    headers: { ...defaultHeaders, ...options.headers },
  });
};

/**
 * Published quizzes for students.
 * Backend route: GET /api/quizzes/publishedquizz
 */
export const fetchPublishedQuizzes = async (
  options: RequestInit = {},
): Promise<QuizInfo[]> => {
  const data = await fetchWithAuth("/api/quizzes/publishedquizz", options);

  if (Array.isArray(data)) {
    return data as QuizInfo[];
  }

  if (data && typeof data === "object") {
    const singleQuiz = data as QuizInfo;
    if ("id" in singleQuiz && "name" in singleQuiz) {
      return [singleQuiz];
    }

    const quizzes = (data as { quizzes?: unknown }).quizzes;
    if (Array.isArray(quizzes)) {
      return quizzes as QuizInfo[];
    }
  }

  return [];
};

export const fetchQuizzesWithAuth = async (options: RequestInit = {}) => {
  const defaultHeaders = {
    Authorization: "Basic dGVhY2hlcjp0ZWFjaGVyMTIz", // Account: teacher / Password: teacher123
    "Content-Type": "application/json",
  };

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/quizzes`,
    {
      ...options,
      headers: { ...defaultHeaders, ...options.headers },
    },
  ).then((response) => {
    if (!response.ok) throw new Error("Error when fetching quizzes.");
    return response.json();
  });

  return response;
};

export const createQuizWithAuth = async (payload: CreateQuizPayload) => {
  return fetchWithAuth("/api/quizzes/create", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const deleteQuiz = async (
  quizId: number,
  options: RequestInit = {},
): Promise<void> => {
  const defaultHeaders: HeadersInit = {
    Authorization: "Basic dGVhY2hlcjp0ZWFjaGVyMTIz",
  };

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/quizzes/${quizId}`,
    {
      method: "DELETE",
      ...options,
      headers: {
        ...defaultHeaders,
        ...(options.headers || {}),
      },
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to delete quiz (status: ${response.status})`);
  }
};

export const addQuestion = async (
  quizId: number,
  question: {
    questionContent: string;
    difficulty: string;
  },
) => {
  try {
    const result = await fetchWithAuth(`/api/quizzes/${quizId}/questions`, {
      method: "POST",
      body: JSON.stringify(question),
    });

    return result;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }

    throw new Error("Failed to add question");
  }
};

export const updateQuiz = async (quizId: number, quiz: CreateQuizPayload) => {
  return fetchWithAuth(`/api/quizzes/${quizId}`, {
    method: "PUT",
    body: JSON.stringify(quiz),
  });
};

export const addAnswer = async (
  questionId: number,
  answer: {
    content: string;
    correct: boolean;
  },
) => {
  try {
    const result = await fetchWithAuth(`/api/questions/${questionId}/answers`, {
      method: "POST",
      body: JSON.stringify(answer),
    });

    return result;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }

    throw new Error("Failed to add answer");
  }
};

// export const fetchAnswers = async (questionId: number): Promise<Answer[]> => {
//   return fetchWithAuth(`/api/questions/${questionId}/answers`);
// };

export const deleteQuestion = async (
  quizId: number,
  questionId: number,
): Promise<void> => {
  await fetchWithAuth(`/api/quizzes/${quizId}/questions/${questionId}`, {
    method: "DELETE",
  });
};

export const deleteAnswer = async (
  questionId: number,
  answerId: number,
): Promise<void> => {
  await fetchWithAuth(`/api/questions/${questionId}/answers/${answerId}`, {
    method: "DELETE",
  });
};

export const fetchCategoriesWithAuth = async () => {
  return fetchWithAuth("/api/categories");
};

type CreateCategoryPayload = {
  name: string;
  description: string;
};

export const createCategory = async (
  payload: CreateCategoryPayload,
): Promise<Category> => {
  return fetchWithAuth("/api/categories", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const deleteCategory = async (categoryId: number): Promise<void> => {
  await fetchWithAuth(`/api/categories/${categoryId}`, {
    method: "DELETE",
  });
};

export const fetchQuizzesByCateWithAuth = async (categoryId: number) => {
  return fetchWithAuth(`/api/categories/${categoryId}/published-quizzes`)
};

export const submitAnswer = async (answerOptionId: number) => {
  return fetchWithAuth(`/api/student-answers`, {
    method: "POST",
    body: JSON.stringify({ answerOptionId }),
  });
};