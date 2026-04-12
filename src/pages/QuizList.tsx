import { Button } from "@mui/material";
import "./QuizList.css";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router";

export default function QuizList() {
  const navigate = useNavigate();
  return (
    <>
      <div className="header">
        <div className="title">
          <h2>Quiz Management</h2>
          <p>Create and manage quizzes for your students</p>
        </div>
        <div>
          <Button className="manage-btn" onClick={() => navigate("/quiz-details")}>
            <FolderOpenIcon />
            <div>Manage Categories</div>
          </Button>
          <Button className="addquiz-btn">
            <AddIcon />
            <div>Add Quiz</div>
          </Button>
        </div>
      </div>
    </>
  );
}
