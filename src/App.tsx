import QuizDetailPage from './pages/QuizDetailPage'
import CreateQuizForm from './pages/CreateQuizForm'
import EditQuizPage from './pages/EditQuizPage'
import Container from "@mui/material/Container";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import QuizList from './pages/QuizList'
import CssBaseline from "@mui/material/CssBaseline";
import AddQuestionForm from "./pages/AddQuestionForm"
import AddAnswerForm from "./pages/AddAnswerForm";
import CategoryList from "./pages/CategoryList";
import CategoryListStudent from "./pages/CategoryListStudent";
import CreateCategoryForm from "./pages/CreateCategoryForm";
import PublishedQuizList from "./pages/PublishedQuizList";
import TakeQuizPage from "./pages/TakeQuizPage";
import QuizzesByCategory from './pages/QuizzesByCategory';
import TeacherNavbar from "./components/TeacherNavbar";
import StudentNavbar from "./components/StudentNavbar";
import { useLocation } from "react-router-dom";
import QuizResultsPage from "./pages/QuizResultsPage";
import AddReviewForm from "./review-forms/AddReviewForm";
import ReviewListPage from "./review-forms/ReviewListPage";
import EditReviewForm from './review-forms/EditReviewForm';
/**
 * Root App component that sets up the SPA routing structure.
 * Routes:
 * - / : Quiz list page
 * - /create-quiz : Create new quiz form
 * - /quizzes/:id : Quiz detail page
 * - /quizzes/:id/questions : Create new question form
 * - /publishedquizz : Student published quiz list (GET /api/quizzes/publishedquizz)
 */
function NavbarSwitcher() {
  const location = useLocation();
  const path = location.pathname;

  if (path.startsWith('/student') || path.startsWith('/publishedquizz')
  ) {
    return <StudentNavbar />;
  }
  return <TeacherNavbar />;
}

function App() {
  return (
    <Container>
      <BrowserRouter>
        <NavbarSwitcher />
        <Routes>
          <Route path="/" element={<QuizList />} />
          <Route path="/quizzes/:id" element={<QuizDetailPage />} />
          <Route path="/quizzes/:id/edit" element={<EditQuizPage />} />
          <Route path="/create-quiz" element={<CreateQuizForm />} />
          <Route path="/quizzes/:id/questions" element={<AddQuestionForm />} />
          <Route path="/questions/:questionId/answers" element={<AddAnswerForm />} />
          <Route path="/categories" element={<CategoryList />} />

          <Route path="/quizzes/:quizId/results" element={<QuizResultsPage />} />

          <Route path="/student" element={<PublishedQuizList />} />
          <Route path="/publishedquizz" element={<PublishedQuizList />} />
          <Route path="/student/categories" element={<CategoryListStudent />} />
          <Route path="/student/quizzes/:id/take" element={<TakeQuizPage />} />
          <Route path="/categories/new" element={<CreateCategoryForm />} />
          <Route path="/student/categories/:categoryId/published-quizzes" element={<QuizzesByCategory />} />
          <Route path="/publishedquizz/:quizId/results" element={<QuizResultsPage />} />

          
          <Route path="/publishedquizz/:quizId/reviews/new" element={<AddReviewForm />} />
          <Route path="/publishedquizz/:quizId/reviews" element={<ReviewListPage />} />
          <Route path="/publishedquizz/:quizId/reviews/:reviewId/edit" element={<EditReviewForm />} />
        </Routes>
      </BrowserRouter>
      <CssBaseline />
    </Container>
  )
}

export default App
