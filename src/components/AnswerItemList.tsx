import {
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import type { Answer } from "../types/quiz";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";

interface AnswerItemProps {
  answer: Answer;
  onDelete?: (id: number) => void;
}

export default function AnswerItemList(props: AnswerItemProps) {
  const isCorrect = props.answer.correct;

  return (
    <ListItem
      sx={{
        mb: 1,
        borderRadius: 1,
        backgroundColor: isCorrect
          ? "rgba(46, 125, 50, 0.08)"
          : "rgba(211, 47, 47, 0.08)",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Left icon */}
      <ListItemIcon sx={{ minWidth: 40 }}>
        {isCorrect ? (
          <CheckCircleIcon sx={{ color: "success.main" }} />
        ) : (
          <CancelIcon sx={{ color: "error.main" }} />
        )}
      </ListItemIcon>

      {/* Content */}
      <ListItemText
        primary={props.answer.content}
        sx={{
          color: isCorrect ? "success.main" : "error.main",
        }}
      />

      <Box>
        <IconButton
          edge="end"
          color="error"
          onClick={() => props.onDelete?.(props.answer.id)}
          sx={{
            backgroundColor: "#fee2e2",
            "&:hover": { backgroundColor: "#fecaca" },
          }}
        >   
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>
    </ListItem>
  );
}
