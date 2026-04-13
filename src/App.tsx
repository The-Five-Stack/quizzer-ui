import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import QuizDetailPage from './pages/QuizDetailPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/quizzes/:id" element={<QuizDetailPage />} />
        <Route path="/" element={<Navigate to="/quizzes/1" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
