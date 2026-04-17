import QuizDetailPage from './pages/QuizDetailPage'
import CreateQuizForm from './pages/CreateQuizForm'
import EditQuizPage from './pages/EditQuizPage'
import Container from "@mui/material/Container";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import QuizList from './pages/QuizList'
import CssBaseline from "@mui/material/CssBaseline";
import AddQuestionForm from "./pages/AddQuestionForm"
/**
 * Root App component that sets up the SPA routing structure.
 * Routes:
 * - / : Quiz list page
 * - /create-quiz : Create new quiz form
 * - /quizzes/:id : Quiz detail page
 * - /quizzes/:id/questions : Create new question form
 */
function App() {
  return (
    <Container>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<QuizList/>}/>
          <Route path="/quizzes/:id" element={<QuizDetailPage />} />
          <Route path="/quizzes/:id/edit" element={<EditQuizPage />} />
          <Route path="/create-quiz" element={<CreateQuizForm />} />
          <Route path="/quizzes/:id/questions" element={<AddQuestionForm/>} />
        </Routes>
      </BrowserRouter>
      <CssBaseline />
    </Container>
  )
}

export default App
