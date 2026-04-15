import { useState } from 'react';
import { Box, Button, Checkbox, FormControlLabel, TextField, Alert } from '@mui/material';

export type QuizFormValues = {
  name: string;
  description: string;
  courseCode: string;
  published: boolean;
};

type QuizFormProps = {
  onSubmit: (values: QuizFormValues) => Promise<void> | void;
  initialValues?: Partial<QuizFormValues>;
  submitLabel?: string;
  disabled?: boolean;
};

/**
 * Regex pattern for course code validation.
 * Expected format: SOF001 (3 uppercase letters, 3 digits)
 */
const COURSE_CODE_PATTERN = /^[A-Z]{3}\d{3}$/;

function QuizForm({
  onSubmit,
  initialValues,
  submitLabel = 'Create Quiz',
  disabled = false,
}: QuizFormProps) {
  const [name, setName] = useState(initialValues?.name ?? '');
  const [description, setDescription] = useState(initialValues?.description ?? '');
  const [courseCode, setCourseCode] = useState(initialValues?.courseCode ?? '');
  const [published, setPublished] = useState(initialValues?.published ?? false);
  const [validationMessage, setValidationMessage] = useState<string | null>(null);

  const handleSubmit = async () => {
    const normalizedName = name.trim();
    const normalizedDescription = description.trim();
    const normalizedCourseCode = courseCode.trim();

    if (!normalizedName || !normalizedCourseCode) {
      setValidationMessage('Name and Course Code are required');
      return;
    }

    if (!COURSE_CODE_PATTERN.test(normalizedCourseCode)) {
      setValidationMessage('Course code must follow format like SOF001');
      return;
    }

    setValidationMessage(null);

    await onSubmit({
      name: normalizedName,
      description: normalizedDescription,
      courseCode: normalizedCourseCode,
      published,
    });
  };

  return (
    <Box className="create-quiz-form">
      {validationMessage && <Alert severity="error">{validationMessage}</Alert>}

      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        fullWidth
        disabled={disabled}
      />

      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        multiline
        rows={3}
        fullWidth
        disabled={disabled}
      />

      <TextField
        label="Course Code"
        value={courseCode}
        onChange={(e) => setCourseCode(e.target.value)}
        required
        fullWidth
        disabled={disabled}
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            disabled={disabled}
          />
        }
        label="Published"
      />

      <Button variant="contained" onClick={handleSubmit} fullWidth disabled={disabled}>
        {submitLabel}
      </Button>
    </Box>
  );
}

export default QuizForm;
