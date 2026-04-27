import {
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import type { Answer } from "../types/quiz";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";

interface AnswerItemProps {
  answer: Answer;
  onDelete?: (id: number) => void;
}

/**
 * Renders a single answer item with correct/wrong indication.
 * Used by QuestionCard to display answer options.
 */
export default function AnswerItemList(props: AnswerItemProps) {
  const isCorrect = props.answer.correct;

  return (
    <ListItem
      className={`answer-item ${isCorrect ? "answer-item--correct" : "answer-item--wrong"}`}
    >
      {/* Icon indicating if answer is correct */}
      <ListItemIcon className="answer-item__icon">
        {isCorrect ? (
          <CheckCircleIcon className="answer-item__icon--correct" />
        ) : (
          <CancelIcon className="answer-item__icon--wrong" />
        )}
      </ListItemIcon>

      {/* Answer text content */}
      <ListItemText
        primary={props.answer.content}
        className={`answer-item__content ${isCorrect ? "answer-item__content--correct" : "answer-item__content--wrong"}`}
      />

      {/* Delete button */}
      <IconButton
        edge="end"
        color="error"
        onClick={() => props.onDelete?.(props.answer.id)}
        className="answer-item__delete-btn"
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </ListItem>
  );
}
