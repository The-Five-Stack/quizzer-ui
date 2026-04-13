import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import QuizDetailPage from "./pages/QuizDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/quizzes/:id" element={<QuizDetailPage />} />
        <Route path="/" element={<Navigate to="/quizzes/1" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
