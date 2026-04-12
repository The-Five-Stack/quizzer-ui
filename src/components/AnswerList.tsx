import { Box, Typography, IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import type { Answer } from '../types/quiz';

interface Props {
  answers: Answer[];
}

function AnswerList({ answers }: Props) {
  return (
    <Box>
      {answers.map((answer) => (
        <Box
          key={answer.id}
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 1,
            mb: 1,
            bgcolor: '#f0f2f5',
            borderRadius: 1,
          }}
        >
          {answer.isCorrect ? (
            <CheckCircleIcon sx={{ color: '#4caf50', mr: 1 }} />
          ) : (
            <CancelIcon sx={{ color: '#f44336', mr: 1 }} />
          )}

          <Typography variant="body2" sx={{ flexGrow: 1 }}>
            {answer.answerContent}
          </Typography>

          <IconButton
            size="small"
            sx={{ bgcolor: '#ef9a9a', color: 'white', p: 0.5, borderRadius: 1 }}
          >
            <DeleteIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Box>
      ))}
    </Box>
  )
}

export default AnswerList