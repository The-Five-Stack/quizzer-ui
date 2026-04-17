import { useEffect, useState } from 'react';
import { Alert, Box, Button, Chip, Container, Divider, Stack, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate, useParams } from 'react-router-dom';
import type { Quiz } from '../types/quiz';
import QuestionCard from '../components/QuestionCard';
import { fetchWithAuth } from '../api';
import { normalizeQuiz } from '../mappers/quizNormalizer';
import './QuizDetailPage.css';

function QuizDetailPage() {
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    const handleDeleteQuestion = (questionId: number) => {
        if (!quiz) {
            return;
        }

        setQuiz({
            ...quiz,
            questions: quiz.questions.filter((question) => question.id !== questionId),
        });
    };

    useEffect(() => {
        fetchWithAuth(`/api/quizzes/${id}`)
            .then((data) => {
                setQuiz(normalizeQuiz(data));
                setError(false);
            })
            .catch(() => setError(true));
    }, [id]);

    if (error) {
        return (
            <Container maxWidth="sm" className="quiz-detail-error-wrap">
                <Alert severity="error">Cannot load quiz details.</Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" className="quiz-detail-page">
            <Button startIcon={<ArrowBackIcon />} className="quiz-detail-back-btn" onClick={() => navigate('/')}>
                Back to Quizzes
            </Button>

            <Box className="quiz-detail-header">
                <Box>
                    <Typography variant="h3" gutterBottom className="quiz-detail-title">
                        {quiz?.name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        {quiz?.description}
                    </Typography>

                    <Stack direction="row" spacing={1} className="quiz-detail-meta">
                        <Chip label={quiz?.courseCode} variant="outlined" />
                        <Chip
                            label={quiz?.published ? 'Published' : 'Draft'}
                            color={quiz?.published ? 'success' : 'default'}
                        />
                    </Stack>
                </Box>

                <Button
                    variant="outlined"
                    startIcon={<EditIcon />}
                    onClick={() => id && navigate(`/quizzes/${id}/edit`)}
                    disabled={!id}
                >
                    Edit Quiz
                </Button>
            </Box>

            <Divider className="quiz-detail-divider" />

            <Box className="quiz-detail-questions-head">
                <Typography variant="h5" className="quiz-detail-questions-title">
                    Questions
                </Typography>
                <Button onClick={() => navigate(`/quizzes/${id}/questions`)} variant="contained" color="primary">
                    + Add Question
                </Button>
            </Box>

            {quiz?.questions.length === 0 ? (
                <Typography variant="body1" color="text.secondary" className="quiz-detail-empty">
                    No questions found. Please add some.
                </Typography>
            ) : (
                quiz?.questions.map((question, index) => (
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
