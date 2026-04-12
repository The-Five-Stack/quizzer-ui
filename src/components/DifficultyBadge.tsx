import { Chip } from '@mui/material';
import type { Difficulty } from '../types/quiz';

interface Props {
  difficulty: Difficulty;
}

const configByDifficulty: Record<Difficulty, { color: 'success' | 'primary' | 'error'; label: string }> = {
  EASY: { color: 'success', label: 'Easy' },
  NORMAL: { color: 'primary', label: 'Normal' },
  HARD: { color: 'error', label: 'Hard' },
};

function DifficultyBadge({ difficulty }: Props) {
  const config = configByDifficulty[difficulty] ?? { color: 'default', label: difficulty };

  return (
    <Chip
      label={config.label}
      color={config.color}
      size="small"
      sx={{ borderRadius: '6px', fontWeight: 'bold', ml: 1, height: 20 }}
    />
  )
}

export default DifficultyBadge;