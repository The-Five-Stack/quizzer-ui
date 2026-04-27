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
            />
          ))}
        </RadioGroup>
      </FormControl>

      {question.answers.length === 0 && (
        <Box className="student-question-card__empty-answers">
          <Typography variant="body2" color="text.secondary">
            No answers are available for this question yet.
          </Typography>
        </Box>
      )}
    </Paper>
  );
}
