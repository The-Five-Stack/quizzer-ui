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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { fetchReviews, editReview } from "../api";
import type { Review } from "../types/quiz";

export default function EditReviewForm() {
    const { quizId, reviewId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const [quizName] = useState<string>(location.state?.quizName || "Quiz");
    const [nickname, setNickname] = useState("");
    const [rating, setRating] = useState<number | null>(null);
    const [review, setReview] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);

    const safeQuizId = Number(quizId);
    const returnTo = location.state?.returnTo || `/publishedquizz/${safeQuizId}/reviews`;

    // Load review data
    useEffect(() => {
        if (!safeQuizId || !reviewId) return;

        fetchReviews(safeQuizId)
            .then((data) => {
                const reviewToEdit = data.reviews.find((r: Review) => r.id === Number(reviewId));
                if (reviewToEdit) {
                    setNickname(reviewToEdit.nickname);
                    setRating(reviewToEdit.rating);
                    setReview(reviewToEdit.review);
                }
            })
            .finally(() => setInitialLoading(false));
    }, [safeQuizId, reviewId]);

    const handleSubmit = async () => {
        if (!rating || !review.trim()) {
            setError("Rating and review text are required");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            await editReview(Number(reviewId), {
                rating,
                review: review.trim(),
            });

            setSuccess(true);
            setTimeout(() => {
                navigate(returnTo, { state: location.state });
            }, 1200);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to update review");
        } finally {
            setLoading(false);
        }
    };

    if (initialLoading) {
        return <Typography>Loading review...</Typography>;
    }

    return (
        <Container maxWidth="md" sx={{ py: 3 }}>
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate(returnTo, { state: location.state })}
                sx={{ mb: 2 }}
            >
                Back to Reviews
            </Button>

            <Typography variant="h4" component="h1" gutterBottom>
                Edit your review for "{quizName}"
            </Typography>

            {success && (
                <Alert severity="success" sx={{ mb: 2 }}>
                    Review updated successfully! Redirecting...
                </Alert>
            )}

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <Box sx={{ mb: 3 }}>
                <TextField
                    label="Name"
                    value={nickname}
                    disabled
                    fullWidth
                    variant="outlined"
                />
            </Box>

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

            <Box sx={{ mb: 3 }}>
                <TextField
                    label="Review *"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    fullWidth
                    multiline
                    rows={5}
                    variant="outlined"
                />
            </Box>

            {/* Submit Button */}
            <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={loading || !rating || !review.trim()}
                fullWidth
            >
                {loading ? "Updating Review..." : "UPDATE REVIEW"}
            </Button>
        </Container>
    );
}
