import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
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
import { fetchPublishedQuizzes, submitReview } from "../api";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function AddReviewForm() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [quizName, setQuizName] = useState<string>("");
  const [nickname, setNickname] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const [review, setReview] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const safeQuizId = Number(quizId);
  const returnTo = location.state?.returnTo || `/publishedquizz/${safeQuizId}/reviews`;
  const effectiveQuizName = location.state?.quizName ?? quizName;

  useEffect(() => {
    // 1. INSTANT: Use location.state if available (no network)
    if (location.state?.quizName) {
      setQuizName(location.state.quizName);
      return;
    }

    // 2. FALLBACK: Fetch only for deep links/refresh
    if (isNaN(safeQuizId)) {
      setQuizName("Quiz");
      return;
    }

    fetchPublishedQuizzes()
      .then((quizzes) => {
        const found = quizzes.find((q) => q.id === safeQuizId);
        setQuizName(found?.name || "Quiz");
      })
      .catch(() => setQuizName("Quiz"));
  }, [safeQuizId, location.state?.quizName]);

  if (isNaN(safeQuizId)) {
    return (
      <Container maxWidth="md" sx={{ py: 3 }}>
        <Alert severity="error">
          Invalid quiz ID.
          <Button onClick={() => navigate('/')} variant="contained" size="small" sx={{ ml: 1 }}>
            Go Home
          </Button>
        </Alert>
      </Container>
    );
  }

  const handleSubmit = async () => {
    /* Validation check */
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

    /* Fetching */
    try {
      await submitReview(safeQuizId, {
        nickname: nickname.trim(),
        rating,
        review: review.trim(),
      });
      setSuccess(true);
      setTimeout(() =>
        navigate(returnTo, {
          state: {
            quizName: effectiveQuizName,
            returnTo: location.state?.originalReturn,  // preserve the original return path
            categoryName: location.state?.categoryName
          }
        }),
        1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      {/* Back Icon */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() =>
          navigate(returnTo, {
            state: {
              quizName: effectiveQuizName,
              returnTo: location.state?.originalReturn,
              categoryName: location.state?.categoryName,
            },
          })
        }
        sx={{ mb: 2 }}
      >
        Back
      </Button>

      {/* Header */}
      <Typography variant="h4" component="h1" gutterBottom>
        Add a review for "{quizName}"
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

      {/* Name */}
      <Box sx={{ mb: 3 }}>
        <TextField
          label="Name *"
          value={nickname} // its nickname to match backend but label it as name
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