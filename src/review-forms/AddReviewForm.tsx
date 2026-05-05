import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { submitReview } from "../api";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function AddReviewForm() {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const [nickname, setNickname] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const [review, setReview] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!nickname.trim()) {
      setError("Nickname is required");
      return;
    }
    if (!rating) {
      setError("Please select a rating");
      return;
    }
    if (!review.trim()) {
      setError("Review text is required");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await submitReview(Number(quizId), {
        nickname: nickname.trim(),
        rating,
        review: review.trim(),
      });
      setSuccess(true);
      setTimeout(() => navigate(`/publishedquizz/${quizId}/reviews`), 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(`/student`)}
        sx={{ mb: 2 }}
      >
        Back
      </Button>

      <Typography variant="h4" component="h1" gutterBottom>
        Add a review for quiz {quizId}
      </Typography>

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Review submitted successfully! Redirecting...
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Nickname */}
      <Box sx={{ mb: 3 }}>
        <TextField
          label="Nickname *"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          fullWidth
          variant="outlined"
        />
      </Box>

      {/* Rating */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="body1" sx={{ mb: 1 }}>
          Rating *
        </Typography>
        <RadioGroup
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        >
          <FormControlLabel value={1} control={<Radio />} label="1 - Useless" />
          <FormControlLabel value={2} control={<Radio />} label="2 - Poor" />
          <FormControlLabel value={3} control={<Radio />} label="3 - Ok" />
          <FormControlLabel value={4} control={<Radio />} label="4 - Good" />
          <FormControlLabel value={5} control={<Radio />} label="5 - Excellent" />
        </RadioGroup>
      </Box>

      {/* Review text */}
      <Box sx={{ mb: 3 }}>
        <TextField
          label="Review *"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          fullWidth
          multiline
          rows={4}
          variant="outlined"
        />
      </Box>

      {/* Submit button */}
      <Button
        variant="text"
        onClick={handleSubmit}
        disabled={loading}
        sx={{ color: "primary.main", fontWeight: 600 }}
      >
        {loading ? "Submitting..." : "SUBMIT YOUR REVIEW"}
      </Button>
    </Container>
  );
}