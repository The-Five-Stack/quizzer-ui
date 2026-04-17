import { Button } from "@mui/material";
import "./QuizList.css";
import "../components/QuizCard.css";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import QuizCard from "../components/QuizCard";
import type { QuizInfo } from "../types/quiz";
import { useEffect, useState } from "react";
import { fetchQuizzesWithAuth, deleteQuiz, updateQuiz } from "../api";

/**
 * QuizList component displays all available quizzes from the backend.
 * Users can view quizzes, navigate to details, create new quizzes, and manage categories.
 */
export default function QuizList() {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState<QuizInfo[]>([]);

  /**
   * Fetch quizzes on component mount
   */
  useEffect(() => {
    fetchQuizzesWithAuth()
      .then((data) => {
        setQuizzes(data);
      })
      .catch((error) => {
        console.error("Failed to fetch quizzes:", error);
      });
  }, []);

  const handleToggleStatus = async (quizId: number) => {
    try {
      const quiz = quizzes.find((q) => q.id === quizId);
      if (!quiz) return;
      await updateQuiz(quizId, {
        ...quiz,
        published: !quiz.published,
      });

      const data = await fetchQuizzesWithAuth();
      setQuizzes(data);
    } catch (error) {
      console.error(error);
      alert("Failed to update quiz status");
    }
  };

  const handleDelete = async (quizId: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this quiz?",
    );

    if (!confirmDelete) return;

    try {
      await deleteQuiz(quizId);

      // Refresh list after delete
      await fetchQuizzesWithAuth()
        .then((data) => {
          setQuizzes(data);
          window.alert("Quiz was successfully deleted.");
        })
        .catch((error) => {
          console.error("Failed to fetch quizzes:", error);
        });
    } catch (error) {
      console.error(error);
      alert("Failed to delete quiz");
    }
  };

  return (
    <>
      <div className="header">
        <div className="title">
          <h2>Quiz Management</h2>
          <p>Create and manage quizzes for your students</p>
        </div>
        <div>
          {/* Manage categories button - currently navigates to quiz details */}
          <Button
            className="manage-btn"
            onClick={() => navigate("/quiz-details")}
          >
            <FolderOpenIcon />
            <div>Manage Categories</div>
          </Button>
          {/* Add new quiz button */}
          <Button
            className="addquiz-btn"
            onClick={() => navigate("/create-quiz")}
          >
            <AddIcon />
            <div>Add Quiz</div>
          </Button>
        </div>
      </div>

      {/* Quiz cards grid */}
      <div className="qc-wrap">
        {quizzes.sort((q1, q2) => q1.id - q2.id)
          .map((q, i) => (
            <QuizCard
              key={i}
              {...q}
              onManage={() => navigate(`/quizzes/${q.id}`)}
              onToggleStatus={() => handleToggleStatus(q.id)}
              onDelete={() => handleDelete(q.id)}
            />
          ))
        }
      </div>
    </>
  );
}