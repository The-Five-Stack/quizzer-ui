import { useEffect, useState } from 'react';
import { Alert, Box, Button, Chip, Container, Divider, Stack, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate, useParams } from 'react-router-dom';
import type { Quiz } from '../types/quiz';
import QuestionCard from '../components/QuestionCard';
import { normalizeQuiz } from '../mappers/quizNormalizer';
import { deleteQuestion, deleteAnswer, fetchWithAuth } from '../api';


function QuizDetailPage() {
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    const handleDeleteQuestion = async (questionId: number) => {
        if (!quiz) return;

        const ok = window.confirm('Delete this question?');
        if (!ok) return;

        try {
            await deleteQuestion(quiz.id, questionId);

            setQuiz((prev) => {
                if (!prev) return prev;

                return {
                    ...prev,
                    questions: prev.questions.filter((q) => q.id !== questionId),
                };
            });

        } catch {
            alert('Failed to delete question');
        }
    };

    const handleDeleteAnswer = async (questionId: number, answerId: number) => {
        if (!quiz) return;

        const ok = window.confirm('Delete this answer?');
        if (!ok) return;

        try {
            await deleteAnswer(questionId, answerId);

            setQuiz((prev) => {
                if (!prev) return prev;

                return {
                    ...prev,
                    questions: prev.questions.map((q) =>
                        q.id === questionId
                            ? {
                                ...q,
                                answers: q.answers.filter(
                                    (a) => a.id !== answerId
                                ),
                            }
                            : q
                    ),
                };
            });
        } catch {
            alert('Failed to delete answer');
        }
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

    if (!quiz) {
        return (
            <Container maxWidth="sm">
                <Typography>Loading...</Typography>
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
                    <Typography
                        variant="h3"
                        gutterBottom
                        className="quiz-detail-title"
                        sx={{ wordBreak: 'break-all', overflowWrap: 'anywhere' }}
                    >
                        {quiz.name}
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        sx={{ mb: 1, wordBreak: 'break-word', overflowWrap: 'anywhere' }}
                    >
                        {quiz.description}
                    </Typography>

                    <Stack direction="row" spacing={1} className="quiz-detail-meta">
                        <Chip label={quiz.courseCode} variant="outlined" />
                        <Chip
                            label={quiz.published ? 'Published' : 'Draft'}
                            color={quiz.published ? 'success' : 'default'}
                        />

                        <Button
                            variant="outlined"
                            startIcon={<EditIcon />}
                            onClick={() => id && navigate(`/quizzes/${id}/edit`)}
                            disabled={!id}
                        >
                            Edit Quiz
                        </Button>
                    </Stack>
                </Box>
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

            {quiz.questions.length === 0 ? (
                <Typography variant="body1" color="text.secondary" className="quiz-detail-empty">
                    No questions found. Please add some.
                </Typography>
            ) : (
                quiz.questions.map((question, index) => (
                    <QuestionCard
                        key={question.id}
                        question={question}
                        index={index}
                        onDelete={handleDeleteQuestion}
                        onDeleteAnswer={handleDeleteAnswer}
                    />
                ))
            )}
        </Container>
    );
}

export default QuizDetailPage;
