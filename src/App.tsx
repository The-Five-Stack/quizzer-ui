import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import QuizList from './pages/QuizList';
import QuizDetailPage from './pages/QuizDetailPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<QuizList />} />
        <Route path="/quizzes/:id" element={<QuizDetailPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
