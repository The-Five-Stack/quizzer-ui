import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Link,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import type { QuizInfo } from "../types/quiz";
import { fetchPublishedQuizzes } from "../api";

/**
 * Student-facing list of published quizzes from GET /api/quizzes/publishedquizz.
 */
export default function PublishedQuizList() {
  const [quizzes, setQuizzes] = useState<QuizInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchPublishedQuizzes()
      .then((data) => {
        if (!cancelled) {
          setQuizzes(data);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Failed to load quizzes.",
          );
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Published quizzes
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Browse available quizzes. Open a quiz for details or view your results.
      </Typography>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && quizzes.length === 0 && (
        <Alert severity="info">No published quizzes yet.</Alert>
      )}

      {!loading && quizzes.length > 0 && (
        <Box
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, minmax(0, 1fr))",
              md: "repeat(3, minmax(0, 1fr))",
            },
          }}
        >
          {quizzes
            .slice()
            .sort((a, b) => a.id - b.id)
            .map((q) => (
              <Card key={q.id} variant="outlined" sx={{ height: "100%" }}>
                <CardContent>
                  <Typography variant="subtitle1" component="div" gutterBottom>
                    <Link
                      component={RouterLink}
                      to={`/publishedquizz/${q.id}`}
                      underline="hover"
                      color="primary"
                      sx={{ fontWeight: 600 }}
                    >
                      {q.name}
                    </Link>
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1.5, minHeight: 40 }}
                  >
                    {q.description || "—"}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 0.5 }}>
                    <strong>Category:</strong>{" "}
                    {q.category?.name ?? "—"}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1.5 }}>
                    <strong>Date:</strong>{" "}
                    {new Date(q.createdAt).toLocaleDateString("en-GB")}
                  </Typography>
                  <Typography variant="body2">
                    <Link
                      component={RouterLink}
                      to={`/publishedquizz/${q.id}/results`}
                    >
                      View results
                    </Link>
                  </Typography>
                </CardContent>
              </Card>
            ))}
        </Box>
      )}
    </Container>
  );
}
