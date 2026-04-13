export const fetchQuiz = () => {
  //fetch call & response handling
  return fetch(import.meta.env.VITE_API_BASE_URL + "/api/quizzes").then((response) => {
    if (!response.ok) 
        throw new Error("Error when fetching quizzes.");
    return response.json();
  });
};

