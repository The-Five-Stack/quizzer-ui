import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  Alert
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchWithAuth } from '../api';
import './EditQuizPage.css';

const COURSE_CODE_PATTERN = /^[A-Z]{3}\d{3}[A-Z]{2}\d[A-Z]{2}$/;

function EditQuizPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [published, setPublished] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  // fetch quiz data
  useEffect(() => {
    if (!id) {
      setErrorMessage('Missing quiz id');
      setLoading(false);
      return;
    }

    fetchWithAuth(`/api/quizzes/${id}`)
      .then((data) => {
        setName(data.name || '');
        setDescription(data.description || '');
        setCourseCode(data.courseCode || '');
        setPublished(data.published || false);
        setErrorMessage(null);
      })
      .catch((error) => {
        setErrorMessage(error instanceof Error ? error.message : 'Cannot load quiz');
      })
      .finally(() => setLoading(false));
  }, [id]);

  // update
  const handleSubmit = async () => {
    const normalizedName = name.trim();
    const normalizedDescription = description.trim();
    const normalizedCourseCode = courseCode.trim().toUpperCase();

    if (!normalizedName || !normalizedCourseCode) {
      setErrorMessage('Name and Course Code are required');
      return;
    }

    if (!COURSE_CODE_PATTERN.test(normalizedCourseCode)) {
      setErrorMessage('Course code must follow format like SOF005AS3AE');
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage(null);

      await fetchWithAuth(`/api/quizzes/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          name: normalizedName,
          description: normalizedDescription,
          courseCode: normalizedCourseCode,
          published
        }),
      });

      navigate('/');
    } catch (error) {
      console.error(error);
      setErrorMessage(error instanceof Error ? error.message : 'Failed to update quiz');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return null;

  return (
    <Container maxWidth="sm" className="edit-quiz-page">
      <Button onClick={() => navigate('/')} disabled={isSubmitting}>
        Back
      </Button>

      <Typography variant="h5">
        Edit Quiz
      </Typography>

      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

      <Box className="edit-quiz-form">
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          required
        />

        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={3}
          fullWidth
          required
        />

        <TextField
          label="Course Code"
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
          fullWidth
          required
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
            />
          }
          label="Published"
        />

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={isSubmitting}
          fullWidth
        >
          Update Quiz
        </Button>
      </Box>
    </Container>
  );
}

export default EditQuizPage;