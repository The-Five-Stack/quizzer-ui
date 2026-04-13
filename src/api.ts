// src/api.ts
export const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
  const defaultHeaders = {
    Authorization: "Basic dGVhY2hlcjp0ZWFjaGVyMTIz",
    "Content-Type": "application/json",
  };

  const res = await fetch(`http://localhost:8080${endpoint}`, {
    ...options,
    headers: { ...defaultHeaders, ...options.headers },
  });

  if (!res.ok) {
    throw new Error("API error");
  }

  return res.json();
};