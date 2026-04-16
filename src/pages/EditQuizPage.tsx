import { useEffect, useState } from 'react';
import {
  Box, Button, Container, TextField,
  Typography, Checkbox, FormControlLabel, Alert
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchWithAuth } from '../api';

const COURSE_CODE_PATTERN = /^[A-Z]{3}\d{3}[A-Z]{2}\d[A-Z]{2}$/;

function EditQuizPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [published, setPublished] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // load quiz
  useEffect(() => {
    fetchWithAuth(`/api/quizzes/${id}`)
      .then((data) => {
        setName(data.name);
        setDescription(data.description);
        setCourseCode(data.courseCode);
        setPublished(data.published);
      })
      .catch(() => setErrorMessage('Failed to load quiz'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async () => {
    const normalizedName = name.trim();
    const normalizedCourseCode = courseCode.trim().toUpperCase();

    if (!normalizedName || !normalizedCourseCode) {
      setErrorMessage('Name and Course Code are required');
      return;
    }

    if (!COURSE_CODE_PATTERN.test(normalizedCourseCode)) {
      setErrorMessage('Invalid course code format');
      return;
    }

    try {
      setErrorMessage(null);

      await fetchWithAuth(`/api/quizzes/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          name: normalizedName,
          description,
          courseCode: normalizedCourseCode,
          published,
        }),
      });

      navigate('/');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setErrorMessage('Failed to update quiz');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Container maxWidth="sm">
      <Typography variant="h5">Edit Quiz</Typography>

      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />

        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          multiline
        />

        <TextField
          label="Course Code"
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
          fullWidth
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

        <Button variant="contained" onClick={handleSubmit}>
          Update Quiz
        </Button>
      </Box>
    </Container>
  );
}

export default EditQuizPage;