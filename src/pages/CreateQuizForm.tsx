import { useState } from 'react';
import { Box, Button, Container, TextField, Typography, Checkbox, FormControlLabel, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createQuizWithAuth } from '../api';
import './CreateQuizForm.css';

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
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const navigate = useNavigate();

    /**
     * Handle form submission with validation.
     * Validates required fields and course code format before sending to backend.
     */
    const handleSubmit = async () => {
        const normalizedName = name.trim();
        const normalizedDescription = description.trim();
        const normalizedCourseCode = courseCode.trim().toUpperCase();

        // Validate required fields
        if (!normalizedName || !normalizedCourseCode) {
            setErrorMessage('Name and Course Code are required');
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

                <Button variant="contained" onClick={handleSubmit} fullWidth>
                    Create Quiz
                </Button>
            </Box>
        </Container>
    );
}

export default CreateQuizForm;