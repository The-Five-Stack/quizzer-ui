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
    <Paper elevation={2} sx={{ p: 2, mb: 2, borderRadius: 1 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 1,
          mb: 1,
        }}
      >
        <Typography variant="subtitle1" component="span" sx={{ fontWeight: 600 }}>
          Q{index + 1}.
        </Typography>
        <Chip
          label={question.difficulty}
          size="small"
          color={difficultyColor(question.difficulty)}
        />
      </Box>

      <Typography variant="h6" component="h2" sx={{ mb: 2, fontSize: "1.05rem" }}>
        {question.questionContent}
      </Typography>

      <Divider sx={{ mb: 2 }} />

      <FormControl component="fieldset" variant="standard" fullWidth>
        <FormLabel component="legend" sx={{ mb: 1, fontWeight: 500 }}>
          Choose an answer
        </FormLabel>
        <RadioGroup
          name={`student-question-${question.id}`}
          value={value}
          onChange={(_, selectedValue) => {
            onSelectAnswer(Number(selectedValue));
          }}
        >
          {question.answers.map((answer) => (
            <FormControlLabel
              key={answer.id}
              value={String(answer.id)}
              control={<Radio />}
              label={answer.content}
              sx={{ alignItems: "flex-start", ml: 0 }}
            />
          ))}
        </RadioGroup>
      </FormControl>

      {question.answers.length === 0 && (
        <Box sx={{ mt: 1 }}>
          <Typography variant="body2" color="text.secondary">
            No answers are available for this question yet.
          </Typography>
        </Box>
      )}
    </Paper>
  );
}
