import { useState } from "react";
import { submitAnswer } from "../api";
import {
  Box,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  Typography,
  Button,
  Snackbar,
  Alert
} from "@mui/material";
import type { Question } from "../types/quiz";
import "./StudentQuestionCard.css";

interface StudentQuestionCardProps {
  question: Question;
  index: number;
  selectedAnswerId: number | null;
  onSelectAnswer: (answerId: number) => void;
}

function difficultyColor(
  difficulty: string,
): "success" | "primary" | "error" | "default" {
  switch (difficulty.toUpperCase()) {
    case "EASY":
      return "success";
    case "HARD":
      return "error";
    case "NORMAL":
      return "primary";
    default:
      return "default";
  }
}

export default function StudentQuestionCard({
  question,
  index,
  selectedAnswerId,
  onSelectAnswer,
}: StudentQuestionCardProps) {
  const value = selectedAnswerId != null ? String(selectedAnswerId) : "";

  const [submitting, setSubmitting] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackSeverity, setFeedbackSeverity] = useState<"success" | "error">("success");

  const handleSubmit = async () => {
    if (!selectedAnswerId) return;
    setSubmitting(true);

    try {
      const response = await submitAnswer(selectedAnswerId);

      if (response.correct) {
        setIsCorrect(true);
        setFeedbackMessage("That is correct, good job!");
        setFeedbackSeverity("success");
      } else {
        setIsCorrect(false);
        setFeedbackMessage("That is not correct, try again")
        setFeedbackSeverity("error");
      }
      setFeedbackOpen(true);
    } catch (error) {
      console.error("Submission failed. Try again", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Paper elevation={2} className="student-question-card">
      <Box className="student-question-card__header-row">
        <Typography
          variant="subtitle1"
          component="span"
          className="student-question-card__index"
        >
          Q{index + 1}.
        </Typography>
        <Chip
          label={question.difficulty}
          size="small"
          color={difficultyColor(question.difficulty)}
        />
      </Box>

      <Typography variant="h6" component="h2" className="student-question-card__question">
        {question.questionContent}
      </Typography>

      <Divider className="student-question-card__divider" />

      <FormControl
        component="fieldset"
        variant="standard"
        fullWidth
        className="student-question-card__answers"
      >
        <FormLabel component="legend" className="student-question-card__answers-label">
          Choose an answer
        </FormLabel>
        <RadioGroup
          name={`student-question-${question.id}`}
          value={value}
          className="student-question-card__radio-group"
          onChange={(_, selectedValue) => {
            onSelectAnswer(Number(selectedValue));
          }}
        >
          {question.answers.map((answer) => (
            <FormControlLabel
              key={answer.id}
              value={String(answer.id)}
              control={<Radio size="small" className="student-question-card__radio" />}
              label={answer.content}
              className="student-question-card__answer-row"
              disabled={isCorrect === true}
            />
          ))}
        </RadioGroup>
      </FormControl>
      {question.answers.length > 0 && (
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleSubmit}
          disabled={submitting || !selectedAnswerId || isCorrect === true}
        >
          SUBMIT YOUR ANSWER
        </Button>
      )}
      {question.answers.length === 0 && (
        <Box className="student-question-card__empty-answers">
          <Typography variant="body2" color="text.secondary">
            No answers are available for this question yet.
          </Typography>
        </Box>
      )}
      <Snackbar
        open={feedbackOpen}
        autoHideDuration={4000}
        onClose={() => setFeedbackOpen(false)}
      >
        <Alert onClose={() => setFeedbackOpen(false)} severity={feedbackSeverity}>
          {feedbackMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
}
