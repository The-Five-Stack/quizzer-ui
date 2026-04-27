import "../index.css";
import { useNavigate } from "react-router-dom";
import type { QuizInfo } from "../types/quiz";
import { useEffect, useState } from "react";
import { fetchQuizzesByCateWithAuth } from "../api";
import StudentQuizCard from "../components/StudentQuizCard";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function QuizzesByCategory() {
  const navigate = useNavigate();
  const [quizzesByCate, setQuizzesByCate] = useState<QuizInfo[]>([]);
  const { categoryId } = useParams<{ categoryId: string }>();
  const location = useLocation();
  const categoryName = location.state?.categoryName;

  //Fetch quizzes on component mount
  useEffect(() => {
    if (!categoryId || isNaN(Number(categoryId))) return;

    fetchQuizzesByCateWithAuth(Number(categoryId))
      .then((data) => {
        setQuizzesByCate(data);
      })
      .catch((error) => {
        console.error("Failed to fetch quizzes:", error);
      });
    
  }, [categoryId]);

  return (
    <>
      <div className="quiz-list-header">
        <div className="quiz-list-title">
          <h2>{categoryName ?? "Category"}</h2>
          <p>List of quizzes in category</p>
        </div>
      </div>

      <div className="qc-wrap">
        {quizzesByCate
          .sort((q1, q2) => q1.id - q2.id)
          .map((q) => (
            <StudentQuizCard
              key={q.id}
              {...q}
              onAttempt={() => navigate(`/student/quizzes/${q.id}/take`)}
            />
          ))}
      </div>
    </>
  );
}
