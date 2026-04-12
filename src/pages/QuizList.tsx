import { Button } from "@mui/material";
import "./QuizList.css";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import AddIcon from "@mui/icons-material/Add";

export default function QuizList() {
  return (
    <>
      <div className="header">
        <div className="title">
          <h2>Quiz Management</h2>
          <p>Create and manage quizzs for your students</p>
        </div>
        <div>
          <Button className="manage-btn">
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
