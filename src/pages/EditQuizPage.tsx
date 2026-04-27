import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  Alert,
  FormControl,
  Select,
  MenuItem,
  InputLabel
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchWithAuth, fetchCategoriesWithAuth } from '../api';
import type { Category } from '../types/quiz';

const COURSE_CODE_PATTERN = /^[A-Z]{3}\d{3}[A-Z]{2}\d[A-Z]{2}$/;

function EditQuizPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [published, setPublished] = useState(false);

  const [categoryId, setCategoryId] = useState<number | ''>('');
  const [categories, setCategories] = useState<Category[]>([]);

  const [categoryLoadError, setCategoryLoadError] = useState<string | null>(null);
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

    fetchCategoriesWithAuth()
      .then(cats => {
        setCategories(cats);
        setCategoryLoadError(null);
      })
      .catch(err => {
        console.error("Failed to fetch categories:", err)
        setCategoryLoadError('Failed to load categories. Please refresh the page or try again later.');
      });

    fetchWithAuth(`/api/quizzes/${id}`)
      .then((data) => {
        setName(data.name || '');
        setDescription(data.description || '');
        setCourseCode(data.courseCode || '');
        setPublished(data.published || false);
        setCategoryId(data.category ? data.category.id : '');
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

    if (!normalizedName || !normalizedCourseCode || categoryId === '') {
      setErrorMessage('Name, Course Code and Category are required');
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
          published,
          categoryId: categoryId as number,
        }),
      });

      alert('Quiz updated successfully!');

      navigate(`/quizzes/${id}`);
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
      <Button onClick={() => navigate(`/quizzes/${id}`)} disabled={isSubmitting}>
        Back
      </Button>

      <Typography variant="h5">
        Edit Quiz
      </Typography>

      {categoryLoadError && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          {categoryLoadError}
        </Alert>
      )}

      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

      <Box className="edit-quiz-form">
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
          multiline
          rows={3}
          fullWidth
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

        <FormControl fullWidth sx={{ mt: 2 }} required error={!!categoryLoadError}>
          <InputLabel id="category-select-label">Category</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            value={categoryId}
            label="Category *"
            onChange={(e) => setCategoryId(e.target.value as number)}
            disabled={!!categoryLoadError || categories.length === 0}
          >
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={isSubmitting || categoryId === ''}
          fullWidth
        >
          Update Quiz
        </Button>
      </Box>
    </Container>
  );
}

export default EditQuizPage;