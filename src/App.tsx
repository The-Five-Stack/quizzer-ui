import './App.css'
import QuizDetailPage from './pages/QuizDetailPage'
import CreateQuizForm from './pages/CreateQuizForm'
import Container from "@mui/material/Container";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import QuizList from './pages/QuizList'
import CssBaseline from "@mui/material/CssBaseline";


function App() {
  return (
<Container>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<QuizList/>}/>
      <Route path="/quiz-details" element={<QuizDetailPage />}/>
      <Route path="/quizzes/:id" element={<QuizDetailPage />} />
      <Route path="/create-quiz" element={<CreateQuizForm />} />
    </Routes>
  </BrowserRouter>
      <CssBaseline />
</Container>

  )
}

export default App
