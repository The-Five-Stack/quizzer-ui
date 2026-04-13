import { useState } from 'react';
import { Box, Button, Chip, Container, Divider, Stack, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import type { Quiz } from '../types/quiz';
import { MOCK_QUIZ } from '../mocks/MOCK_QUIZ';
import QuestionCard from '../components/QuestionCard';

function QuizDetailPage() {
    const [quiz, setQuiz] = useState<Quiz>(MOCK_QUIZ);

    const handleDeleteQuestion = (questionId: number) => {
        if (!quiz) {
            return;
        }

        setQuiz({
            ...quiz,
            questions: quiz.questions.filter((question) => question.id !== questionId),
        });
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Button startIcon={<ArrowBackIcon />} sx={{ mb: 2 }}>
                Back to Quizzes
            </Button>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                <Box>
                    <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
                        {quiz.name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        {quiz.description}
                    </Typography>

                    <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                        <Chip label={quiz.courseCode} variant="outlined" />
                        <Chip
                            label={quiz.published ? 'Published' : 'Draft'}
                            color={quiz.published ? 'success' : 'default'}
                        />
                    </Stack>
                </Box>

                <Button variant="outlined" startIcon={<EditIcon />}>
                    Edit Quiz
                </Button>
            </Box>

            <Divider sx={{ my: 4 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 500 }}>
                    Questions
                </Typography>
                <Button variant="contained" color="primary">
                    + Add Question
                </Button>
            </Box>

            {quiz.questions.length === 0 ? (
                <Typography variant="body1" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                    No questions found. Please add some.
                </Typography>
            ) : (
                quiz.questions.map((question, index) => (
                    <QuestionCard
                        key={question.id}
                        question={question}
                        index={index}
                        onDelete={handleDeleteQuestion}
                    />
                ))
            )}
        </Container>
    );
}

export default QuizDetailPage;