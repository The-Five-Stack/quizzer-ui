// src/api.ts
const API_BASE_URL = "http://localhost:8080";

async function requestJson(endpoint: string, options: RequestInit = {}) {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, options);

  if (!res.ok) {
    throw new Error("API error");
  }

  return res.json();
}

export const fetchQuiz = async (
  endpoint: string,
  options: RequestInit = {},
) => {
  return requestJson(endpoint, options);
};

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
    Authorization: "Basic dGVhY2hlcjp0ZWFjaGVyMTIz", // Tài khoản: teacher / Mật khẩu: teacher123
    "Content-Type": "application/json",
  };

  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/quizzes`,
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
