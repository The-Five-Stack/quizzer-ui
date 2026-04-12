import {
    Box,
    Typography,
    Chip,
    IconButton,
    Paper,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Button,
    Divider,
    Stack,
    ListItemButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import AddIcon from '@mui/icons-material/Add';
import type { Question } from '../types/quiz';
import React from 'react';


interface QuestionCardProps {
    question: Question;
    index: number;
    onDelete?: (id: number) => void;
}

const QuestionCard = ({ question, index, onDelete }: QuestionCardProps) => {
    const [selectedAnswerId, setSelectedAnswerId] = React.useState<number | null>(null);

    // color for Difficulty Badge
    const getDifficultyColor = (difficulty: string): 'success' | 'primary' | 'error' | 'default' => {
        switch (difficulty.toUpperCase()) {
            case 'EASY': return 'success';
            case 'HARD': return 'error';
            case 'NORMAL': return 'primary';
            default: return 'default';
        }
    };

    return (
        <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2, position: 'relative' }}>
            {/* Header: Q number, Badge & Delete */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        Q{index + 1}.
                    </Typography>
                    <Chip
                        label={question.difficulty}
                        size="small"
                        color={getDifficultyColor(question.difficulty)}
                        sx={{ fontWeight: 'bold', textTransform: 'capitalize' }}
                    />
                </Stack>
                <IconButton
                    aria-label="delete"
                    color="error"
                    onClick={() => onDelete?.(question.id)}
                    sx={{ backgroundColor: '#fee2e2', '&:hover': { backgroundColor: '#fecaca' } }}
                >
                    <DeleteIcon />
                </IconButton>
            </Box>

            {/* Question Content */}
            <Typography variant="h6" sx={{ my: 3, fontWeight: 400, textAlign: "center" }}>
                {question.questionContent}
            </Typography>

            <Divider sx={{ mb: 2 }} />

            {/* Answer Options Section */}
            <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Answer Options ({question.answers.length})
                </Typography>

                <List>
                    {question.answers.map((answer) => {
                        // Kiểm tra xem đáp án này có đang được chọn không
                        const isSelected = selectedAnswerId === answer.id;

                        return (
                            <ListItem
                                key={answer.id}
                                disablePadding
                                sx={{
                                    mb: 1,
                                    borderRadius: 1,
                                    // Đổi màu nền nhẹ khi được chọn 
                                    backgroundColor: isSelected ? 'rgba(46, 125, 50, 0.08)' : 'transparent',
                                }}
                            >
                                <ListItemButton
                                    onClick={() => setSelectedAnswerId(answer.id)}
                                    sx={{ borderRadius: 1 }}
                                >
                                    <ListItemIcon sx={{ minWidth: 40 }}>
                                        {isSelected ? (
                                            // Nếu chọn thì hiện cục tròn xanh có dấu check
                                            <CheckCircleIcon sx={{ color: '#2e7d32' }} />
                                        ) : (
                                            // Nếu chưa chọn thì hiện cục tròn rỗng xám
                                            <RadioButtonUncheckedIcon sx={{ color: 'action.disabled' }} />
                                        )}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={answer.answerContent}
                                        sx={{ color: isSelected ? '#2e7d32' : 'inherit' }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            </Box>

            {/* Add Answer Button  */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                <Button startIcon={<AddIcon />} variant="outlined" size="small" sx={{ textTransform: 'none' }}>
                    Add Answer
                </Button>
            </Box>
        </Paper>
    );
};

export default QuestionCard;