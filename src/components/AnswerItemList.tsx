import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import type { Answer } from "../types/quiz";

interface AnswerItemProps {
  answer: Answer;
  isSelected: boolean;
  onSelect: (id: number) => void;
}

export default function AnswerItemList(props: AnswerItemProps){
  return (
    <ListItem
      disablePadding
      sx={{
        mb: 1,
        borderRadius: 1,
        backgroundColor: props.isSelected
          ? "rgba(46, 125, 50, 0.08)"
          : "transparent",
      }}
    >
      <ListItemButton
        onClick={() => props.onSelect(props.answer.id)}
        selected={props.isSelected}
        sx={{ borderRadius: 1 }}
      >
        <ListItemIcon sx={{ minWidth: 40 }}>
          {props.isSelected ? (
            <CheckCircleIcon sx={{ color: "#2e7d32" }} />
          ) : (
            <RadioButtonUncheckedIcon sx={{ color: "action.disabled" }} />
          )}
        </ListItemIcon>

        <ListItemText
          primary={props.answer.content}
          sx={{
            color: props.isSelected ? "#2e7d32" : "inherit",
          }}
        />
      </ListItemButton>
    </ListItem>
  );
};