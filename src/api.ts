





























export const fetchQuizzesWithAuth = async (options: RequestInit = {}) => {
  const defaultHeaders = {
    'Authorization': 'Basic dGVhY2hlcjp0ZWFjaGVyMTIz', // Tài khoản: teacher / Mật khẩu: teacher123
    'Content-Type': 'application/json',
  };

  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/quizzes`, {
    ...options,
    headers: { ...defaultHeaders, ...options.headers },
  }).then((response) => {
    if (!response.ok) 
        throw new Error("Error when fetching quizzes.");
    return response.json();
  });

  return response;
};
