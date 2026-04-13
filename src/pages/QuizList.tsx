import { Button } from "@mui/material";
import "./QuizList.css";
import "../components/QuizCard.css";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router";
import QuizCard from "../components/QuizCard";
import type { QuizInfo } from "../types/quiz";
import { useEffect, useState } from "react";
import { fetchQuizzesWithAuth } from "../api";

export default function QuizList() {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState<QuizInfo[]>([]);

  useEffect(() => {
    fetchQuizzesWithAuth()
      .then((data) => {
        setQuizzes(data);
      })
      .catch((error) => {
        console.error("Failed to fetch quizzes:", error);
      });
  }, []);

  return (
    <>
      <div className="header">
        <div className="title">
          <h2>Quiz Management</h2>
          <p>Create and manage quizzes for your students</p>
        </div>
        <div>
          <Button
            className="manage-btn"
            onClick={() => navigate("/quiz-details")}
          >
            <FolderOpenIcon />
            <div>Manage Categories</div>
          </Button>
          <Button className="addquiz-btn">
            <AddIcon />
            <div>Add Quiz</div>
          </Button>
        </div>
      </div>

      <div className="qc-wrap">
        {quizzes.map((q, i) => (
          <QuizCard
            key={i}
            {...q}
            onManage={() => console.log("manage")}
            onToggleStatus={() => console.log("toggle")}
            onDelete={() => console.log("delete")}
          />
        ))}
      </div>
    </>
  );
}

