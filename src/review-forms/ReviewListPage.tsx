import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Link,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link as RouterLink } from "react-router-dom";
import { fetchReviews } from "../api";
import type { ReviewSummary } from "../types/quiz";

export default function ReviewListPage() {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState<ReviewSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!quizId) return;
    let cancelled = false;

    fetchReviews(Number(quizId))
      .then((result) => {
        if (!cancelled) setData(result);
      })
      .catch((err: unknown) => {
        if (!cancelled)
          setError(
            err instanceof Error ? err.message : "Failed to load reviews.",
          );
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [quizId]);

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      {/* Back button */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/publishedquizz")}
        sx={{ mb: 2 }}
      >
        Back
      </Button>

      <Typography variant="h4" component="h1" gutterBottom>
        Reviews
      </Typography>

      {/* Loading */}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Error */}
      {error && <Alert severity="error">{error}</Alert>}

      {/* Summary and reviews */}
      {!loading && data && (
        <>
          <Typography variant="body1" sx={{ mb: 1 }}>
            {data.averageRating.toFixed(1)} rating average based on{" "}
            {data.totalReviews} reviews.
          </Typography>

          {/* Write review link */}
          <Link
            component={RouterLink}
            to={`/publishedquizz/${quizId}/reviews/new`}
            underline="hover"
            color="primary"
            sx={{ mb: 3, display: "block" }}
          >
            Write your review
          </Link>

          {data.reviews.length === 0 && (
            <Alert severity="info">
              No reviews yet. Be the first to review!
            </Alert>
          )}

          {/* Review cards */}
          {data.reviews.map((r) => (
            <Card key={r.id} variant="outlined" sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {r.nickname}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Rating: {r.rating}/5
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {r.review}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  Written on:{" "}
                  {new Date(r.createdAt).toLocaleDateString("en-GB")}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </>
      )}
    </Container>
  );
}