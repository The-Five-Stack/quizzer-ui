import {
  Container,
  Button,
  Typography,
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useParams } from "react-router-dom";
import "./AddAnswerForm.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import { addAnswer } from "../api";
import { useNavigate } from "react-router-dom";

export default function AddAnswerForm() {
  const navigate = useNavigate();
  const { questionId } = useParams();
  const [answer, setAnswer] = useState({
    content: "",
    correct: false,
  });

  const handleSubmit = async () => {
    if (answer.content.trim() === "") {
      alert("Answer content is required");
      return;
    }
    await addAnswer(Number(questionId), answer);
    alert("Answer is added");
    setAnswer({
      content: "",
      correct: false,
    });
  };

  return (
    <Container maxWidth="md" className="add-answer-container">
      <div className="add-answer-header">
        <Button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowBackIcon fontSize="small" />
          Back to Quizz
        </Button>
        <Typography variant="h5" className="title">
          Add new answer
        </Typography>{" "}
      </div>
      <Box className="form">
        <InputLabel className="label">Answer</InputLabel>
        <TextField
          className="add-answer-text-field"
          label="Type content of answer"
          value={answer.content}
          onChange={(e) => setAnswer({ ...answer, content: e.target.value })}
          required
          fullWidth
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={answer.correct}
              onChange={(e) =>
                setAnswer({ ...answer, correct: e.target.checked })
              }
            />
          }
          label="Correct"
        />
        <div className="btn">
          <Button variant="contained" onClick={handleSubmit} fullWidth>
            Add Answer
          </Button>
        </div>
      </Box>
    </Container>
  );
}
