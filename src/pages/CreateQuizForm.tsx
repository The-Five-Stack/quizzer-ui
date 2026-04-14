import { useState } from 'react';
import { Box, Button, Container, TextField, Typography, Checkbox, FormControlLabel, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { fetchWithAuth } from '../api';
import './CreateQuizForm.css';

function CreateQuizPage() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [courseCode, setCourseCode] = useState('');
    const [published, setPublished] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (!name || !courseCode) {
            setErrorMessage('Name and Course Code are required');
            return;
        }

        try {
            setErrorMessage(null);

            await fetchWithAuth('/api/quizzes', {
                method: 'POST',
                body: JSON.stringify({
                    name,
                    description,
                    courseCode,
                    published
                })
            });

            navigate('/');
        } catch (error) {
            console.error('Failed to create quiz:', error);
            setErrorMessage('Failed to create quiz');
        }
    };

    return (
        <Container maxWidth="sm" className="create-quiz-page">
            <Button className="create-quiz-back-btn" onClick={() => navigate('/')}>
                Back to Dashboard
            </Button>

            <Typography variant="h4" gutterBottom>
                Create Quiz
            </Typography>

            {errorMessage && <Alert severity="error" className="create-quiz-error">{errorMessage}</Alert>}

            <Box className="create-quiz-form">
                <TextField
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <TextField
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    multiline
                    rows={3}
                />

                <TextField
                    label="Course Code"
                    value={courseCode}
                    onChange={(e) => setCourseCode(e.target.value)}
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

                <Button variant="contained" onClick={handleSubmit}>
                    Create Quiz
                </Button>
            </Box>
        </Container>
    );
}

export default CreateQuizPage;