import {
  Box,
  Typography,
  Chip,
  IconButton,
  Paper,
  List,
  Button,
  Divider,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import type { Question } from "../types/quiz";
import AnswerItemList from "./AnswerItemList";
import "./QuestionCard.css";

interface QuestionCardProps {
  question: Question;
  index: number;
  onDelete?: (id: number) => void;
}

const QuestionCard = ({ question, index, onDelete }: QuestionCardProps) => {
  const answers = question.answers ;
//   const [selectedAnswerId, setSelectedAnswerId] = React.useState<number | null>(
//     null,
//   );

  // Difficulty color mapping
  const getDifficultyColor = (
    difficulty: string,
  ): "success" | "primary" | "error" | "default" => {
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
  };

  return (
    <Paper elevation={2} className="question-card">
      <Box className="question-card__header">
        <Stack direction="row" spacing={1} className="question-card__title-row">
          <Typography variant="h6" className="question-card__index">
            Q{index + 1}.
          </Typography>
          <Chip
            label={question.difficulty}
            size="small"
            color={getDifficultyColor(question.difficulty)}
            className="question-card__difficulty"
          />
        </Stack>
        <IconButton
          aria-label="delete"
          color="error"
          onClick={() => onDelete?.(question.id)}
          className="question-card__delete"
        >
          <DeleteIcon />
        </IconButton>
      </Box>

      {/* Question Content */}
      <Typography variant="h6" className="question-card__content">
        {question.questionContent}
      </Typography>

      <Divider className="question-card__divider" />

      {/* Answer Options Section */}
      <Box>
        <Typography
          variant="subtitle2"
          color="text.secondary"
          gutterBottom
          className="question-card__answers-title"
        >
          Answer Options ({question.answers?.length || 0})
        </Typography>

        <List>
          {answers.map((answer) => (
            <AnswerItemList
              key={answer.id}
              answer={answer}
            />
          ))}
        </List>
      </Box>

      {/* Add Answer Button  */}
      <Box className="question-card__actions">
        <Button
          startIcon={<AddIcon />}
          variant="outlined"
          size="small"
          className="question-card__add-answer"
        >
          Add Answer
        </Button>
      </Box>
    </Paper>
  );
};

export default QuestionCard;
