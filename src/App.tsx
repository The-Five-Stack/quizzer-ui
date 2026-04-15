import QuizDetailPage from './pages/QuizDetailPage'
import CreateQuizPage from './pages/CreateQuizPage'
import Container from "@mui/material/Container";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import QuizList from './pages/QuizList'
import CssBaseline from "@mui/material/CssBaseline";

/**
 * Root App component that sets up the SPA routing structure.
 * Routes:
 * - / : Quiz list page
 * - /create-quiz : Create new quiz form
 * - /quizzes/:id : Quiz detail page
 * - /quiz-details : Legacy route for quiz details (fallback)
 */
function App() {
  return (
    <Container>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<QuizList/>}/>
          <Route path="/quiz-details" element={<QuizDetailPage />}/>
          <Route path="/quizzes/:id" element={<QuizDetailPage />} />
          <Route path="/create-quiz" element={<CreateQuizPage />} />
        </Routes>
      </BrowserRouter>
      <CssBaseline />
    </Container>
  )
}

export default App
