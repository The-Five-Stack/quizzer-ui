import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createCategory } from "../api";
import "./CreateQuizForm.css";

export default function CreateCategoryForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const normalizedName = name.trim();
    const normalizedDescription = description.trim();

    setErrorMessage(null);
    setSuccessMessage(null);

    if (!normalizedName) {
      setErrorMessage("Name is required.");
      return;
    }

    setIsSubmitting(true);
    try {
      await createCategory({
        name: normalizedName,
        description: normalizedDescription,
      });
      setSuccessMessage("Category created successfully.");
      setName("");
      setDescription("");
    } catch (error) {
      console.error("Failed to create category:", error);
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to create category.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm" className="create-quiz-page">
      <Button
        className="create-quiz-back-btn"
        onClick={() => navigate("/categories")}
      >
        Back to categories
      </Button>

      <Typography variant="h5" className="create-quiz-title">
        Add category
      </Typography>

      {errorMessage && (
        <Alert severity="error" className="create-quiz-error">
          {errorMessage}
        </Alert>
      )}
      {successMessage && (
        <Alert severity="success" className="create-quiz-error">
          {successMessage}
        </Alert>
      )}

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

        <Button
          variant="contained"
          onClick={handleSubmit}
          fullWidth
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating…" : "Create category"}
        </Button>
      </Box>
    </Container>
  );
}
