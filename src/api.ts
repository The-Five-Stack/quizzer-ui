
type CreateQuizPayload = {
  name: string;
  description: string;
  courseCode: string;
  published: boolean;
};

type CreateQuizPayloadBase = Omit<CreateQuizPayload, 'published'>;

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
        const parsed = JSON.parse(raw) as { message?: string; error?: string; path?: string };
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
  const payloadWithoutPublished: CreateQuizPayloadBase = {
    name: payload.name,
    description: payload.description,
    courseCode: payload.courseCode,
  };

  const attempts: Array<{ body: CreateQuizPayload | CreateQuizPayloadBase }> = [
    { body: payload },
    { body: payloadWithoutPublished },
  ];

  let lastError: unknown;

  for (const attempt of attempts) {
    try {
      return await fetchWithAuth('/api/quizzes/create', {
        method: 'POST',
        body: JSON.stringify(attempt.body),
      });
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError;
};
