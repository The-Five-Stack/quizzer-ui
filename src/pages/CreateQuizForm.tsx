import { useEffect, useState } from 'react';
import { Box, Button, Container, TextField, Typography, Checkbox, FormControlLabel, Alert, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createQuizWithAuth, fetchCategoriesWithAuth } from '../api';
import type { Category } from '../types/quiz';

/**
 * Regex pattern for course code validation.
 * Expected format: SOF005AS3AE (3 uppercase letters, 3 digits, 2 uppercase letters, 1 digit, 2 uppercase letters)
 */
const COURSE_CODE_PATTERN = /^[A-Z]{3}\d{3}[A-Z]{2}\d[A-Z]{2}$/;

/**
 * CreateQuizForm component for creating new quizzes.
 * Provides form fields for name, description, course code, and published status.
 */
function CreateQuizForm() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [courseCode, setCourseCode] = useState('');
    const [published, setPublished] = useState(false);
    const [categoryId, setCategoryId] = useState<number | ''>('');
    const [categories, setCategories] = useState<Category[]>([]);

    const [categoryLoadError, setCategoryLoadError] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const navigate = useNavigate();
    
    useEffect(() => {
        fetchCategoriesWithAuth()
            .then(data => {
                setCategories(data);
                setCategoryLoadError(null);
            })
            .catch(err => {
                console.error('Failed to fetch categories:', err);
                setCategoryLoadError('Failed to load categories. Please refresh the page or try again later.');
            });
    }, []);

    /**
     * Handle form submission with validation.
     * Validates required fields and course code format before sending to backend.
     */
    const handleSubmit = async () => {
        const normalizedName = name.trim();
        const normalizedDescription = description.trim();
        const normalizedCourseCode = courseCode.trim().toUpperCase();

        // Validate required fields
        if (!normalizedName || !normalizedCourseCode || categoryId === '') {
            setErrorMessage('Name, Course Code and Category are required');
            return;
        }

        // Validate course code format
        if (!COURSE_CODE_PATTERN.test(normalizedCourseCode)) {
            setErrorMessage('Course code must follow format like SOF005AS3AE');
            return;
        }

        try {
            setErrorMessage(null);

            // Create quiz via API
            await createQuizWithAuth({
                name: normalizedName,
                description: normalizedDescription,
                courseCode: normalizedCourseCode,
                published,
                categoryId: categoryId as number,
            });

            alert('Quiz created successfully!');

            navigate('/');
        } catch (error) {
            console.error('Failed to create quiz:', error);
            setErrorMessage(error instanceof Error ? error.message : 'Failed to create quiz');
        }
    };

    return (
        <Container maxWidth="sm" className="create-quiz-page">
            <Button className="create-quiz-back-btn" onClick={() => navigate('/')}>
                Back to Dashboard
            </Button>

            <Typography variant="h5" className="create-quiz-title">
                Create Quiz
            </Typography>
            
            {categoryLoadError && (
                <Alert severity="warning" sx={{ mb: 2 }} className="create-quiz-error">
                    {categoryLoadError}
                </Alert>
            )}
            {errorMessage && <Alert severity="error" className="create-quiz-error">{errorMessage}</Alert>}

            <Box className="create-quiz-form">
                <TextField
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
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
                    required
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

                <FormControl fullWidth sx={{ mt: 2 }} required>
                    <InputLabel id="category-select-label">Category</InputLabel>
                    <Select
                        labelId="category-select-label"
                        id="category-select"
                        value={categoryId}
                        label="Category *"
                        onChange={(e) => setCategoryId(e.target.value as number)}
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
                    fullWidth
                    disabled={!!categoryLoadError || categories.length === 0}
                >
                    Create Quiz
                </Button>
            </Box>
        </Container>
    );
}

export default CreateQuizForm;