import './App.css'
import QuizDetailPage from './pages/QuizDetailPage'
import Container from "@mui/material/Container";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
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
    </Routes>
  </BrowserRouter>
      <CssBaseline />
</Container>

  )
}

export default App
