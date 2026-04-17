import { Container, Button, Typography, Box, TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import "./AddQuestionForm.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import type { SelectChangeEvent } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import { addQuestion } from "../api";

export default function AddQuestionForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [question, setQuestion] = useState({
    questionContent: "",
    difficulty: "",
  });

  const handleSubmit = async () => {
    await addQuestion(Number(id), question);
    alert("Question is added");
  };
  return (
    <Container maxWidth="md" className="add-question-container">
      <div className="add-question-header">
        <Button className="back-btn" onClick={() => navigate(`/quizzes/${id}`)}>
          <ArrowBackIcon fontSize="small" />
          Back to Quizz
        </Button>
        <Typography variant="h5" className="title">
          Add new question
        </Typography>{" "}
      </div>
      <Box className="form">
        <InputLabel className="label">Question</InputLabel>
        <TextField
          className="add-question-text-field"
          label="Type content of question"
          value={question.questionContent}
          onChange={(e) =>
            setQuestion({ ...question, questionContent: e.target.value })
          }
          required
          fullWidth
        />
        <InputLabel className="label">Difficulty</InputLabel>
        <Select
          value={question.difficulty}
          label="Difficulty"
          onChange={(e: SelectChangeEvent) =>
            setQuestion({ ...question, difficulty: e.target.value })
          }
          fullWidth
        >
          <MenuItem value={"EASY"}>EASY</MenuItem>
          <MenuItem value={"NORMAL"}>NORMAL</MenuItem>
          <MenuItem value={"HARD"}>HARD</MenuItem>
        </Select>
        <div className="btn">
          <Button variant="contained" onClick={handleSubmit} fullWidth>
            Add Question
          </Button>
        </div>
      </Box>
    </Container>
  );
}
