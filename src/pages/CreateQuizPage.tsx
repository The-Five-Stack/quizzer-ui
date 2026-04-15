import { useState } from 'react';
import { Alert, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createQuizWithAuth } from '../api';
import QuizForm, { type QuizFormValues } from '../components/QuizForm';
import './CreateQuizPage.css';

function CreateQuizPage() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateQuiz = async (values: QuizFormValues) => {
    try {
      setErrorMessage(null);
      setIsSubmitting(true);

      await createQuizWithAuth(values);
      navigate('/');
    } catch (error) {
      console.error('Failed to create quiz:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Failed to create quiz');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm" className="create-quiz-page">
      <Button className="create-quiz-back-btn" onClick={() => navigate('/')} disabled={isSubmitting}>
        Back to Dashboard
      </Button>

      <Typography variant="h5" className="create-quiz-title">
        Create Quiz
      </Typography>

      {errorMessage && (
        <Alert severity="error" className="create-quiz-error">
          {errorMessage}
        </Alert>
      )}

      <QuizForm onSubmit={handleCreateQuiz} submitLabel="Create Quiz" disabled={isSubmitting} />
    </Container>
  );
}

export default CreateQuizPage;
