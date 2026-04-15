import { useEffect, useState } from 'react';
import { Container, Typography, Button, Alert } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import QuizForm, { type QuizFormValues } from '../components/QuizForm';
import { fetchWithAuth } from '../api';
import './EditQuizPage.css';

type Quiz = {
  id: number;
  name: string;
  description: string;
  courseCode: string;
  published: boolean;
};

function EditQuizPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // fetch quiz detail
  useEffect(() => {
    fetchWithAuth(`/api/quizzes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setQuiz(data);
        setErrorMessage(null);
      })
      .catch(() => setErrorMessage('Cannot load quiz'));
  }, [id]);

  // handle update
  const handleUpdateQuiz = async (values: QuizFormValues) => {
    try {
      setIsSubmitting(true);
      setErrorMessage(null);

      await fetchWithAuth(`/api/quizzes/${id}`, {
        method: 'PUT',
        body: JSON.stringify(values),
      });

      navigate('/');
    } catch (error) {
      console.error('Failed to update quiz:', error);
      setErrorMessage('Failed to update quiz');
    } finally {
      setIsSubmitting(false);
    }
  };

  // error state
  if (errorMessage && !quiz) {
    return (
      <Container>
        <Alert severity="error">{errorMessage}</Alert>
      </Container>
    );
  }

  // loading state
  if (!quiz) return null;

  return (
    <Container maxWidth="sm" className="edit-quiz-page">
      <Button
        className="edit-quiz-back-btn"
        onClick={() => navigate('/')}
        disabled={isSubmitting}
      >
        Back
      </Button>

      <Typography variant="h5" className="edit-quiz-title">
        Edit Quiz
      </Typography>

      {errorMessage && (
        <Alert severity="error" className="edit-quiz-error">
          {errorMessage}
        </Alert>
      )}

      <QuizForm
        key={quiz.id} 
        initialValues={quiz}
        submitLabel="Update Quiz"
        disabled={isSubmitting}
        onSubmit={handleUpdateQuiz}
      />
    </Container>
  );
}

export default EditQuizPage;