import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import type { QuizInfo } from "../types/quiz";
import { fetchPublishedQuizzes } from "../api";

/**
 * Results entry for a published quiz. Extend when a results API exists.
 */
export default function QuizResultsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<QuizInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const quizId = Number(id);
  const hasInvalidQuizId = !id || Number.isNaN(quizId);

  useEffect(() => {
    if (hasInvalidQuizId) {
      return;
    }

    let cancelled = false;
    fetchPublishedQuizzes()
      .then((list) => {
        if (cancelled) return;
        const found = list.find((q) => q.id === quizId) ?? null;
        if (!found) {
          setError("This quiz is not available or is no longer published.");
          setQuiz(null);
        } else {
          setQuiz(found);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Failed to load quiz.",
          );
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [hasInvalidQuizId, quizId]);

  return (
    <Container maxWidth="sm" sx={{ py: 3 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/publishedquizz")}
        sx={{ mb: 2 }}
      >
        Back
      </Button>

      {!hasInvalidQuizId && loading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {hasInvalidQuizId && <Alert severity="error">Invalid quiz.</Alert>}
      {error && !loading && !hasInvalidQuizId && (
        <Alert severity="error">{error}</Alert>
      )}

      {!loading && quiz && (
        <>
          <Typography variant="h5" component="h1" gutterBottom>
            Results: {quiz.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            component="p"
            sx={{ mb: 0 }}
          >
            Result details will appear here when your course connects a results
            API to this page.
          </Typography>
        </>
      )}
    </Container>
  );
}
